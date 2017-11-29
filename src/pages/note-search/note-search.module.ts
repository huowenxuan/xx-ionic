import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteSearchPage } from './note-search';

@NgModule({
  declarations: [
    NoteSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteSearchPage),
  ],
})
export class NoteSearchPageModule {}
