import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteEditPage } from './note-edit';
import {KeyboardAttachDirective} from "../../directives/keyboard-attach.directive";

@NgModule({
  declarations: [
    NoteEditPage,
    KeyboardAttachDirective
  ],
  imports: [
    IonicPageModule.forChild(NoteEditPage),
  ],
})

export class NoteEditModule {}
