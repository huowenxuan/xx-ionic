import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {
  toUser: Object

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toUser = {
      toUserId: '2',
      toUserName: 'Hancock'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabChatPage');
  }

}

