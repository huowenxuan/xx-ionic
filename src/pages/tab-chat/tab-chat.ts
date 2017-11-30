import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ChatService} from "../../providers/chat-service";
import {UserService} from "../../providers/user-service";

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {
  conversations = []

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService,
              public chatService: ChatService) {
  }

  async ionViewDidLoad() {
    this.conversations = await this.chatService.getHistoryConversations(10)
  }

  toChat(members) {
    for(let member of members) {
      if (member !== this.userService.userId) {
        return {
          toUserId: member,
          userId: this.userService.userId
        }
      }
    }
  }
}

