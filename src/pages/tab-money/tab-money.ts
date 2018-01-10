import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoneyService} from "../../providers/money-service";
import {CalendarComponentOptions} from "ion2-calendar";
import {SpendEditPage} from "../spend-edit/spend-edit";

@IonicPage()
@Component({
  selector: 'page-tab-money',
  templateUrl: 'tab-money.html',
})
export class TabMoneyPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: MoneyService) {
  }

  ionViewDidLoad() {
    this.navCtrl.push(SpendEditPage)
  }

  toEditSpend() {
    this.navCtrl.push(SpendEditPage)
  }
}
