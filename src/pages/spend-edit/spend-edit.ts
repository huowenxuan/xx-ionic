import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {ControllersService} from "../../providers/controllers-service";
import {LCStorageProvider} from "../../providers/lc-storage";
import {NoteService, Note} from "../../providers/note-service";
import {UtilsProvider} from "../../providers/utils";
import {MoneyService, Spend, SpendType} from "../../providers/money-service";
import {IonDigitKeyboardOptions} from "../../components/ion-digit-keyboard";

@IonicPage()
@Component({
  selector: 'page-spend-edit',
  templateUrl: 'spend-edit.html',
})
export class SpendEditPage {
  @ViewChild('content') content: any;
  title = '新建'
  oldSpend: Note
  date = new Date()
  monthPicker
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

  inputPrice = ''
  selectedIndex = 0
  spendList: Array<any> = []

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public userService: UserService,
              public moneyService: MoneyService,
              public utils: UtilsProvider,
              public ctrls: ControllersService) {
    this.oldSpend = this.navParams.get('spend')
    if (this.oldSpend) {
      this.title = '编辑'
    }
    this.monthPicker = this.utils.dateToISO(this.date)
  }

  async ionViewDidLoad() {
    this.footerHeight = document.getElementById("footer").offsetHeight

    let spendTypes = await this.moneyService.getAllSpendTypes()
    this.spendList = spendTypes.map((item)=>item.attributes)
  }

  async save() {
    this.date = this.utils.isoToDate(this.monthPicker)

    let onSuccess = this.navParams.get('onSuccess')
    // let loader = this.ctrls.loading()
    // loader.present()
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

  selectSpend(spend, index) {
    this.selectedIndex = index
    this.inputPrice = this.spendList[this.selectedIndex].price || ''
  }

  saveInputPrice() {
    if (!this.inputPrice) return
    try {
      let number: any = parseFloat(this.inputPrice)
      if (isNaN(number)) throw ''
      number = number.toFixed(2)
      this.spendList[this.selectedIndex].price = number
      this.inputPrice = number
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
