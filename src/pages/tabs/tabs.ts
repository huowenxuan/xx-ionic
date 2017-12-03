import {Component} from '@angular/core';

import {TabMoneyPage} from "../tab-money/tab-money";
import {TabChatPage} from "../tab-chat/tab-chat";
import {TabNotePage} from "../tab-note/tab-note";
import {UserService} from "../../providers/user-service";
import {LoadingController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

// ion-tabs外面不能套ion-content，会滚动
// 也不能用ngIf控制它的显示，会导致切换的一瞬间因为没有渲染出来而变黑
// 只能用代码控制
let _userId = ''

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  chat = TabChatPage;
  money = TabMoneyPage;
  note = TabNotePage

  constructor(public navCtrl: NavController,
              public userService: UserService) {
    // this.userService.logout()
    this.getLogin()
  }

  async ionViewDidLoad() {
  }

  async getLogin() {
    let userId = await this.userService.storageGet()
    if (!userId) {
      this.navCtrl.push(LoginPage)
    }

    // 避免setRoot后再进来会重复执行，并且兼容退出后再登录
    if (userId !== _userId) {
      _userId = userId

      if (userId) {
        this.navCtrl.setRoot(TabsPage)
      }
    }
  }

}
