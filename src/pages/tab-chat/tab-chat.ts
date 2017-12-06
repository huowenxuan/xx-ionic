import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ChatService} from "../../providers/chat-service";
import {UserService} from "../../providers/user-service";
import {ChatPage} from "../chat/chat";

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
    let params = {}
    for (let member of members)
      if (member !== this.userService.userId)
        params = {toUserId: member, userId: this.userService.userId}

    this.navCtrl.push(ChatPage, params)
  }
}

