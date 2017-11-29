import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as showdown from 'showdown'

/**
 * Generated class for the MarkdownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-markdown',
  templateUrl: 'markdown.html',
})
export class MarkdownPage {
  html = ''

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let markdown = navParams.get('markdown')
    let converter = new showdown.Converter()
    this.html = converter.makeHtml(markdown);
  }

  ionViewDidLoad() {
  }

}
