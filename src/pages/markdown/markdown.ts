import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import * as showdown from 'showdown'
import {Clipboard} from "@ionic-native/clipboard";
import {ControllersService} from "../../providers/controllers-service";
import {UtilsProvider} from "../../providers/utils";
import {NoteEditPage} from "../note-edit/note-edit";

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
  title = 'Markdown'
  convertedHtml: string // 转换后的英文
  originText: string // 转换前的文字
  isConverted: boolean // 是否转换

  note

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public utils: UtilsProvider,
              public ctrls: ControllersService,
              public navParams: NavParams) {
    this.title = navParams.get('title')
    this.note = navParams.get('note') // 用来跳转到编辑页
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

  toEdit() {
    let onEdit = this.navParams.get('onEdit')
    // 类似replace效果，先push禁用动画，再把上一页删除掉
    this.navCtrl
      .push(NoteEditPage, {note: this.note, onSuccess: onEdit}, {animate: false})
      .then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
  }
}
