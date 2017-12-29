import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {NoteHourTab} from "./note-hour-tab";

@NgModule({
    declarations: [
      NoteHourTab,
    ],
    imports: [
        IonicPageModule.forChild(NoteHourTab),
    ],
    exports: [
      NoteHourTab
    ]
})
export class NoteHourTabModule {
}
