import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpendEditPage} from './spend-edit';

@NgModule({
  declarations: [
    SpendEditPage,
  ],
  imports: [
    IonicPageModule.forChild(SpendEditPage),
  ],
})

export class NoteEditModule {}
