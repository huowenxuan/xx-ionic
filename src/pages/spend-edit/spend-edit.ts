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
    rightActionOptions: {iconName: 'md-arrow-back', fontSize: '0.8em'},
    roundButtons: false,
    showLetters: false,
    swipeToHide: false,
    theme: this.keyboardThemes[7]
  };

  inputPrice
  selectedIndex
  spendList: Array<any> = []

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
    this.footerHeight = document.getElementById("footer").offsetHeight
    this.onRefresh()
  }

  async onRefresh() {
    this.selectedIndex = 0
    this.inputPrice = ''
    this.spendList = new Array(this.moneyService.spendTypes.length)    
    let spends = await this.moneyService.getMonthSpend(this.userService.userId, this.getMonthDateClear())
    // 排序，spend的顺序和type一致，放在对应的位置上
    spends.forEach(item => {
      let had = this.moneyService.spendTypes.some((type, index)=>{
        let same = type.type === item.attributes.type
        if (same) {
          this.spendList[index] = item
        }
        return same
      })
      if(!had) {
        // TODO 把没有的类别也要列出来
      }
    });
  }

  onKeyboardNumberClick(key) {
    this.inputPrice = `${this.inputPrice}${key}`
  }

  onKeyboardDotClick() {
    this.inputPrice += '.'
  }

  onKeyboardDeleteClick() {
    let length = this.inputPrice.length
    this.inputPrice = this.inputPrice.substring(0, length - 1)
  }

  selectSpend(index) {
    this.selectedIndex = index
    this.ctrls.toast(this.moneyService.spendTypes[index].description, 'top').present()

    let spend = this.spendList[index]
    this.inputPrice = spend ? spend.attributes.price : ''
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
        } catch(e) {
          this.ctrls.toast('删除失败').present()
        }
      }
      return
    }
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

  toEditType() {
    this.alertCtrl.create({
      title: '编辑类别会丢失本页数据，去？',
      message: '',
      buttons: [
        {text: '不去', role: 'cancel'},
        {text: '我去', handler: () => {}}
      ]
    }).present()
  }
}
