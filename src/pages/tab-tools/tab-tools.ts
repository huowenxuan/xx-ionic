import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {MomsHolidayPage} from "../tools/moms-holiday/moms-holiday";

@IonicPage()
@Component({
  selector: 'page-tab-tools',
  templateUrl: 'tab-tools.html',
})
export class TabToolsPage {
  conversations = []

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService) {
  }

  async ionViewDidLoad() {
  }

  toMomsHoliday() {
    this.navCtrl.push(MomsHolidayPage)
  }

}

