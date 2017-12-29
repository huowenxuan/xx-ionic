import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {NoteDayTab} from "./note-day-tab";

@NgModule({
    declarations: [
      NoteDayTab,
    ],
    imports: [
        IonicPageModule.forChild(NoteDayTab),
    ],
    exports: [
      NoteDayTab
    ]
})
export class NoteDayTabModule {
}
