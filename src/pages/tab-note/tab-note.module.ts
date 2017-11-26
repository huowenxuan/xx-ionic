import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabNotePage } from './tab-note';

@NgModule({
  declarations: [
    TabNotePage,
  ],
  imports: [
    IonicPageModule.forChild(TabNotePage),
  ],
})
export class TabNotePageModule {}
