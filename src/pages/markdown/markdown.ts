import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import * as showdown from 'showdown'
import {Clipboard} from "@ionic-native/clipboard";
import {ControllersService} from "../../providers/controllers-service";
import {UtilsProvider} from "../../providers/utils";

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
              public utils: UtilsProvider,
              public ctrls: ControllersService,
              public navParams: NavParams) {
    this.originText = navParams.get('markdown')
    let converter = new showdown.Converter()
    this.convertedHtml = converter.makeHtml(this.originText);
    this.isConverted = true
  }

  copy() {
    this.utils.copy(this.originText)
      .then(()=>this.ctrls.toast('复制成功').present())
      .catch(()=>this.ctrls.toast('复制失败').present())
  }

  change() {
    this.isConverted = !this.isConverted
  }
}
