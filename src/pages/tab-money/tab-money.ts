import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoneyService} from "../../providers/money-service";
import {CalendarComponentOptions} from "ion2-calendar";
import {SpendEditPage} from "../spend-edit/spend-edit";
import * as echarts from 'echarts'
import {UserService} from "../../providers/user-service";
import {UtilsProvider} from "../../providers/utils";
import * as moment from 'moment'
import {SpendPage} from "../spend/spend";
import {SuperTabsController} from "ionic2-super-tabs";

@IonicPage()
@Component({
  selector: 'page-tab-money',
  templateUrl: 'tab-money.html',
})
export class TabMoneyPage {
  tab1: any = SpendPage;
  tab2: any = SpendPage;
  tab3: any = SpendPage;
  _currentTabIndex = '0'

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public utils: UtilsProvider,
              public superTabsCtrl: SuperTabsController,
              public userService: UserService,
              public moneyService: MoneyService) {
  }

  set currentTabIndex(index: string) {
    if (index !== this._currentTabIndex) {
      this._currentTabIndex = index
      this.superTabsCtrl.slideTo(parseInt(index))
    }
  }

  get currentTabIndex() {
    return this._currentTabIndex
  }

  onTabSelect(tab) {
    this.currentTabIndex = tab.index.toString()
  }
}
