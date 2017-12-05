import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import LCStorage, {Note} from "../../utils/LCStorage";
import {UserService} from "../../providers/user-service";
import {ControllersService} from "../../providers/controllers-service";

@IonicPage()
@Component({
  selector: 'page-note-edit',
  templateUrl: 'note-edit.html',
})
export class NoteEditPage {
  @ViewChild('content') content: any;
  title = '新建'
  time = new Date()
  input = ''
  oldNote: Note
  timePicker

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService,
              public ctrls: ControllersService) {
    this.oldNote = this.navParams.get('note')
    if (this.oldNote) {
      this.title = '编辑'
      this.input = this.oldNote.attributes.text
      this.time = this.oldNote.attributes.time
    }

    this.timePicker = this.dateToISO(this.time)
  }

  ionViewDidLoad() {

  }

  isoToDate(isoString: string): Date {
    return new Date(new Date(isoString).getTime() - 8*3600*1000)
  }

  dateToISO(date: Date): string {
    return new Date(date.getTime() + 8*3600*1000).toISOString()
  }

  async save() {
    this.time = this.isoToDate(this.timePicker)
    if (!this.input) return

    let onSuccess = this.navParams.get('onSuccess')
    let loader = this.ctrls.loading()
    loader.present()

    try {
      let noteId
      if (this.oldNote) {
        noteId = await LCStorage.updateNote(this.oldNote.id, this.input, this.time)
      } else {
        noteId = await LCStorage.createNote(this.userService.userId, this.time, this.input)
      }
      loader.dismiss()
      onSuccess && onSuccess(noteId)
      this.ctrls.toast('保存成功').present()
      this.navCtrl.pop()
    } catch (e) {
      loader.dismiss()
      this.ctrls.toast('保存失败').present()
    }
  }

  command(cmd) {
    this.input += cmd
  }
}
