import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  notes

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notes = [
      {
        id: '',
        userId: '1',
        createAt: new Date(),
        content: '哈哈哈哈'
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabNotePage');
  }

  alertMsg() {
    alert('s')
  }
}
