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
  total = '0'

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public userService: UserService,
              public moneyService: MoneyService,
              public utils: UtilsProvider,
              public ctrls: ControllersService) {
  }

  get monthPicker() {
    return this._monthPicker
  }

  set monthPicker(newPicker) {
    this._monthPicker = newPicker
    this.onRefresh()
  }

  async ionViewDidLoad() {
    this.monthPicker = this.utils.dateToISO(this.date)
  }

  async onRefresh() {
    this.resetFooterHeight()
    this.selectedIndex = -1
    this.inputPrice = ''
    this.spendList = new Array(this.moneyService.spendTypes.length)
    let spends = await this.moneyService.getMonthSpends(this.userService.userId, this.utils.monthDateClear(this.utils.isoToDate(this.monthPicker)))
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
    this.total = total.toFixed(2)
    data = data.sort((v1, v2)=>v1.value-v2.value)

    // 获取到元素的css值
    let ele = document.getElementById("type-text");
    let style = window.getComputedStyle(ele);
    let textColor = style.getPropertyValue("color");

    echarts.init(document.getElementById('spend-edit-chart')).setOption({
      backgroundColor: 'transparent',
      roseType: false,
      // 根据最大最小值会改变颜色，min和max一定要设置对，否则是黑色
      visualMap: {
        show: false,
        min: 0,
        max: 1,
        inRange: {
          // 防止颜色显示纯白或者纯黑
          colorLightness: [0.3, 0.7]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          // 用百分比能更好的设置min和max值
          data: data.map((item)=>{return {name: item.name, value: item.value / total}}),
          roseType: false, // true: 南丁格尔, false: 圆饼
          minAngle: 30, // 最小区域角度，0-360，南丁格尔设置没用
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
              shadowColor: 'red'
            }
          }
        }
      ]
    });

    echarts.init(document.getElementById('spend-edit-chart2'), null, {renderer: 'svg'}).setOption({
      legend: {
        data:['对比']
      },
      tooltip: {
        trigger: 'axis',
        formatter: "{b} : <br/>￥{c}"
      },
      grid: {
        top: '0%',
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '￥{value}'
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {onZero: false},
        axisLabel: {
          formatter: '{value}'
        },
        boundaryGap: true,
        data: data.map((item)=>item.name)
      },

      series: [
        {
          name: '高度(km)与气温(°C)变化关系',
          type: 'bar',
          smooth: true,
          barCategoryGap: 25,
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'blue',
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          },
          data: data.map((item)=>item.value)
        }
      ]
    })
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
            this.utils.monthDateClear(this.utils.isoToDate(this.monthPicker)),
            this.moneyService.spendTypes[this.selectedIndex].type
          )
          toastText = '创建成功'
        } else {
          newSpend = await this.moneyService.updateSpend(
            selectedSpend.id,
            number,
            this.utils.monthDateClear(this.utils.isoToDate(this.monthPicker)),
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
}
