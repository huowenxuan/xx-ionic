import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  idInput = ''

  constructor(
    public userService: UserService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  async login() {
    await this.userService.login(this.idInput)
    this.navCtrl.setRoot(TabsPage) // 设置根栈，类似reset
  }
}
