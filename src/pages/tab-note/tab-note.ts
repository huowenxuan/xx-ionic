import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage, MenuController,
  ModalController,
  NavController,
  NavParams, Platform,
} from 'ionic-angular';
import * as moment from 'moment';
import {Clipboard} from '@ionic-native/clipboard';
import {UserService} from "../../providers/user-service";
import {NoteEditPage} from "../note-edit/note-edit";
import {CalendarModal, CalendarModalOptions, DayConfig} from "ion2-calendar";
import {MarkdownPage} from "../markdown/markdown";
import {ControllersService} from "../../providers/controllers-service";
import {SettingsProvider} from "../../providers/settings";
import {LCStorageProvider} from "../../providers/lc-storage";
import {CalendarComponentOptions} from 'ion2-calendar'
import {TabChatPage} from "../tab-chat/tab-chat";
import {TabMoneyPage} from "../tab-money/tab-money";
import {NoteHourTab} from "../../components/note-hour-tab/note-hour-tab";
import {UtilsProvider} from "../../providers/utils";
import {NoteDayTab} from "../../components/note-day-tab/note-day-tab";
import {SuperTabsController} from "ionic2-super-tabs";

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {

  tab1: any = NoteHourTab;
  tab2: any = NoteDayTab;
  tab3: any = NoteDayTab;

  constructor(public navCtrl: NavController,
              public superTabsCtrl: SuperTabsController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public menu: MenuController,
              public lcStorage: LCStorageProvider,
              public utils: UtilsProvider,
              public ctrls: ControllersService,
              public userService: UserService,) {
  }

  async ionViewDidLoad() {
    this.superTabsCtrl.enableTabsSwipe(false)
  }
}
