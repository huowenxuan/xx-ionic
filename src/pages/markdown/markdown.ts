import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as showdown from 'showdown'
import {Clipboard} from "@ionic-native/clipboard";

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
  convertedHtml: string // 转换后的英文
  originText: string // 转换前的文字
  isConverted: boolean // 是否转换

  constructor(public navCtrl: NavController,
              public clipboard: Clipboard,
              public navParams: NavParams) {
    this.originText = navParams.get('markdown')
    let converter = new showdown.Converter()
    this.convertedHtml = converter.makeHtml(this.originText);
    this.isConverted = true

    // 输出供web端复制
    console.log(this.originText)
  }

  ionViewDidLoad() {
  }

  copy() {
    this.clipboard.copy(this.originText)
  }

  change() {
    this.isConverted = !this.isConverted
  }
}
