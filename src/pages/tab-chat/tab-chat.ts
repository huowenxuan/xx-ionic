import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AlertController} from 'ionic-angular';
import {ChatService} from "../../providers/chat-service";

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {
  conversations = []
  userId: string

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public alertCtrl: AlertController,
              public chatService: ChatService) {
    // this.logout()
  }

  async ionViewDidLoad() {
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

  async login(userId) {
    this.userId = userId
    this.chatService.loginIM(userId)
    this.conversations = await this.chatService.getHistoryConversations(10)
    // id creator _updatedAt _lastMessageAt lastMessageAt lastMessage: Message members
  }

  logout() {
    this.storage.clear()
  }

  toChat(members) {
    for(let member of members) {
      if (member !== this.userId) {
        return {
          toUserId: member,
          userId: this.userId
        }
      }
    }
  }
}

