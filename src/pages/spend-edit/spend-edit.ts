import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {ControllersService} from "../../providers/controllers-service";
import {LCStorageProvider} from "../../providers/lc-storage";
import {NoteService, Note} from "../../providers/note-service";
import {UtilsProvider} from "../../providers/utils";
import {MoneyService, Spend} from "../../providers/money-service";
import {IonDigitKeyboardOptions} from "../../components/ion-digit-keyboard";
import * as _ from 'lodash'
import * as echarts from 'echarts'

@IonicPage()
@Component({
  selector: 'page-spend-edit',
  templateUrl: 'spend-edit.html',
})
export class SpendEditPage {
  @ViewChild('content') content: any;
  title = '新建'
  date = new Date()
  _monthPicker
  footerHeight = 0

  keyboardThemes = ['light', 'dark', 'ionic', 'opaque-black', 'opaque-white', 'dusk', 'nepal', 'alihossein', 'messenger']
  public keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    visible: true,
    leftActionOptions: {text: '.', fontSize: '1.3em'},
    rightActionOptions: {iconName: 'ios-trash-outline', fontSize: '0.8em'},
    roundButtons: false,
    showLetters: false,
    swipeToHide: false,
    theme: this.keyboardThemes[7]
  };

  inputPrice
  selectedIndex
  spendList: Array<any> = []
  total = 0

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public userService: UserService,
              public moneyService: MoneyService,
              public utils: UtilsProvider,
              public ctrls: ControllersService) {
    this.monthPicker = this.utils.dateToISO(this.date)
  }

  get monthPicker() {
    return this._monthPicker
  }

  set monthPicker(newPicker) {
    this._monthPicker = newPicker
    this.onRefresh()
  }

  async ionViewDidLoad() {
    this.onRefresh()
  }

  async onRefresh() {
    this.resetFooterHeight()
    this.selectedIndex = -1
    this.inputPrice = ''
    this.spendList = new Array(this.moneyService.spendTypes.length)
    let spends = await this.moneyService.getMonthSpend(this.userService.userId, this.getMonthDateClear())
    // 排序，spend的顺序和type一致，放在对应的位置上
    spends.forEach(item => {
      this.moneyService.spendTypes.some((type, index) => {
        let same = type.type === item.attributes.type
        if (same) {
          this.spendList[index] = item
        }
        return same
      })
    });
    this.updateTotal()
  }

  updateTotal() {
    if (!document.getElementById('chart')) return

    let data = []
    let total = 0
    this.spendList.forEach((item)=>{
      if (item) {
        let attr = item.attributes
        for (let type of this.moneyService.spendTypes) {
          if (type.type === attr.type) {
            let price = parseFloat(attr.price)
            data.push({value: price, name: type.text})
            total += price
          }
        }
      }
    })
    this.total = total

    // 获取到元素的css值
    let ele = document.getElementById("type-text");
    let style = window.getComputedStyle(ele);
    let textColor = style.getPropertyValue("color");

    echarts.init(document.getElementById('chart')).setOption({
      backgroundColor: 'transparent',
      // 根据最大最小值会改变颜色，min和max一定要设置对，否则是黑色
      visualMap: {
        show: false,
        min: Math.min(...data.map((item)=>item.value)),
        max: Math.max(...data.map((item)=>item.value)),
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: data,
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: textColor
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: textColor
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 100,
              shadowColor: 'blue'
            }
          }
        }
      ]
    });
  }

  resetFooterHeight() {
    setTimeout(() => {
      this.footerHeight = document.getElementById("footer").offsetHeight
    }, 300)
  }

  onKeyboardNumberClick(key) {
    this.inputPrice = `${this.inputPrice}${key}`
  }

  onKeyboardDotClick() {
    this.inputPrice += '.'
  }

  onKeyboardDeleteClick() {
    // let length = this.inputPrice.length
    // this.inputPrice = this.inputPrice.substring(0, length - 1)
    this.inputPrice = ''
  }

  selectSpend(index) {
    this.selectedIndex = index
    this.ctrls.toast(this.moneyService.spendTypes[index].description, 'top').present()

    let spend = this.spendList[index]
    this.inputPrice = spend ? spend.attributes.price : ''
    this.resetFooterHeight()
  }

  getMonthDateClear() {
    let monthDate = this.utils.isoToDate(this.monthPicker)
    monthDate.setDate(1)
    monthDate.setHours(0)
    monthDate.setMinutes(0)
    monthDate.setSeconds(0)
    monthDate.setMilliseconds(0)
    return monthDate
  }

  async saveInputPrice() {
    let selectedSpend = this.spendList[this.selectedIndex]
    if (!this.inputPrice) {
      // 删除
      if (selectedSpend) {
        try {
          await this.moneyService.deleteSpend(selectedSpend.id)
          this.spendList[this.selectedIndex] = null
          this.ctrls.toast('删除成功').present()
        } catch (e) {
          this.ctrls.toast('删除失败').present()
        }
      }
    } else {
      try {
        let number: any = parseFloat(this.inputPrice)
        if (isNaN(number)) throw ''
        number = number.toFixed(2)
        this.inputPrice = number

        let newSpend, toastText
        if (!selectedSpend) {
          newSpend = await this.moneyService.createSpend(
            this.userService.userId,
            number,
            this.getMonthDateClear(),
            this.moneyService.spendTypes[this.selectedIndex].type
          )
          toastText = '创建成功'
        } else {
          newSpend = await this.moneyService.updateSpend(
            selectedSpend.id,
            number,
            this.getMonthDateClear(),
            this.moneyService.spendTypes[this.selectedIndex].type
          )
          toastText = '更新成功'
        }
        this.spendList[this.selectedIndex] = newSpend
        this.ctrls.toast(toastText).present()

      } catch (e) {
        this.ctrls.toast('价格输入错误').present()
      }
    }
    this.selectedIndex = -1
    this.resetFooterHeight()
    this.updateTotal()
  }

  toEditType() {
    this.alertCtrl.create({
      title: '编辑类别会丢失本页数据，去？',
      message: '',
      buttons: [
        {text: '不去', role: 'cancel'},
        {
          text: '我去', handler: () => {
          }
        }
      ]
    }).present()
  }
}
