import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoneyService} from "../../providers/money-service";
import {CalendarComponentOptions} from "ion2-calendar";

@IonicPage()
@Component({
  selector: 'page-tab-money',
  templateUrl: 'tab-money.html',
  providers: [MoneyService]
})
export class TabMoneyPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MoneyService) {
  }

  ionViewDidLoad() {
  }

}
