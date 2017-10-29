import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoneyService} from "../../providers/money-service/money-service";

@IonicPage()
@Component({
  selector: 'page-tab-money',
  templateUrl: 'tab-money.html',
  providers: [MoneyService]
})
export class TabMoneyPage {
  fund: Object

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MoneyService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabMoneyPage');
  }

}
