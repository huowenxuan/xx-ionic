import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { User } from '../../models/User'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toUser: Object

  constructor(public navCtrl: NavController) {
    this.toUser = {
      toUserId: '2',
      toUserName: 'Hancock'
    }
  }
}
