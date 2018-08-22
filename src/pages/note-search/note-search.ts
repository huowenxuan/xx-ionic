import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NoteService} from "../../providers/note-service";
import {UtilsProvider} from "../../providers/utils";
import {MarkdownPage} from "../markdown/markdown";
import {UserService} from "../../providers/user-service";

/**
 * Generated class for the NoteSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-search',
  templateUrl: 'note-search.html',
})
export class NoteSearchPage {
  results = []
  searchText = ''
  offset = 0
  limit = 20

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public userService: UserService,
    public noteService: NoteService,) {
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      let elem: any = document.querySelector('.searchbar input')
      if (elem) {
        elem.focus();
      }
    }, 1000)
  }

  async onSearchInput(ev) {
    let val = ev.target.value;
    this.offset = 0
    this.searchText = val

    if (!val) {
      this.results = []
      return
    }

    this.results = await this.noteService.searchNote(val, this.userService.userId, this.offset, this.limit)
  }

  showTime(item) {
    const {end, text} = item
    return this.utils.formatDate(end)
  }

  showItem(item) {
    const {end, text} = item
    return `  ${text}`
  }

  toMarkdown(note) {
    this.navCtrl.push(MarkdownPage, {
      note: note,
      markdown: note.text,
      title: this.utils.formatDate(note.end),
    })
  }

  async loadMore(infiniteScroll) {
    if (!this.searchText) return

    this.offset += this.limit
    let note = await this.noteService.searchNote(this.searchText, this.userService.userId, this.offset, this.limit)
    if (note) {
      this.results.push(...note)
    }

    infiniteScroll.complete()
  }
}
