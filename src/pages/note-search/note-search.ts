import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NoteService} from "../../providers/note-service";
import {UtilsProvider} from "../../providers/utils";
import {MarkdownPage} from "../markdown/markdown";

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
  skip = 0
  limit = 20

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public noteService: NoteService,) {
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      let elem = document.querySelector('.searchbar input')
      if (elem) {
        elem.focus();
      }
    }, 1000)
  }

  async onSearchInput(ev) {
    let val = ev.target.value;
    this.skip = 0
    this.searchText = val

    if (!val) {
      this.results = []
      return
    }

    console.log('search: ', val)
    this.results = await this.noteService.searchNote(val, this.skip, this.limit)
  }

  showItem(item) {
    const {end, text} = item.attributes
    return `${this.utils.formatDate(end)} | ${text}`
  }

  toMarkdown(note) {
    this.navCtrl.push(MarkdownPage, {
      note: note,
      markdown: note.attributes.text
    })
  }

  async loadMore(infiniteScroll) {
    if (!this.searchText) return

    this.skip += this.limit
    let note = await this.noteService.searchNote(this.searchText, this.skip, this.limit)
    if (note) {
      this.results.push(...note)
    }

    infiniteScroll.complete()
  }
}
