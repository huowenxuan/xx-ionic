import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {
  toUser: Object

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public alertCtrl: AlertController) {
    this.toUser = {
      toUserId: '2',
      toUserName: 'Hancock'
    }
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad TabChatPage');

    let userId = await this.storage.get("userId")
    if (userId) {
      this.login(userId)
    } else {
      this.showLoginAlert()
    }
  }

  showLoginAlert() {
    this.alertCtrl.create({
      title: 'ID',
      subTitle: '1 or 2',
      inputs: [{name: 'userId', placeholder: 'user id'}],
      buttons: [{
        text: 'Save', handler: ({userId}) => {
          this.storage.set("userId", userId)
          this.login(userId)
        }
      }]
    }).present()
  }

  login(userId) {

  }
}

