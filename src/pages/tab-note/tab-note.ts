import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage, MenuController,
  ModalController,
  NavController,
  NavParams, Platform, Tabs,
} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {ControllersService} from "../../providers/controllers-service";
import {NoteHourTab} from "../../components/note-hour-tab/note-hour-tab";
import {UtilsProvider} from "../../providers/utils";
import {NoteDayTab} from "../../components/note-day-tab/note-day-tab";
import {SuperTabsController} from "ionic2-super-tabs";
import {NoteService} from "../../providers/note-service";

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  tab1: any = NoteHourTab;
  tab2: any = NoteDayTab;
  tab3: any = NoteDayTab;
  _currentTabIndex = '0'

  constructor(public navCtrl: NavController,
              public superTabsCtrl: SuperTabsController,
              public navParams: NavParams,
              public utils: UtilsProvider,
              public userService: UserService,) {
  }

  async ionViewDidLoad() {
    setTimeout(()=>this.superTabsCtrl.enableTabsSwipe(false), 1000)
  }

  set currentTabIndex(index: string) {
    this._currentTabIndex = index
    this.superTabsCtrl.slideTo(parseInt(index))
  }

  get currentTabIndex() {
    return this._currentTabIndex
  }

  changeTabs(tab) {

  }
}
