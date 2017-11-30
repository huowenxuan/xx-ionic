import { Component } from '@angular/core';

import { TabMoneyPage } from "../tab-money/tab-money";
import { TabChatPage } from "../tab-chat/tab-chat";
import {TabNotePage} from "../tab-note/tab-note";
import {UserService} from "../../providers/user-service";
import {LoadingController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  private ready = false

  chat = TabChatPage;
  money = TabMoneyPage;
  note = TabNotePage

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public userService: UserService) {
    // this.userService.logout()
  }

  async ionViewDidLoad() {
    let loader = this.loadingCtrl.create({content: "Please wait...",})
    loader.present()

    if (!await this.userService.storageGet()) {
      this.navCtrl.push(LoginPage)
    } else {
      this.ready = true
    }

    loader.dismiss()
  }
}
