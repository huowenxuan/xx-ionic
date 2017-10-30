import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoneyListRow } from './money-list-row';

@NgModule({
    declarations: [
      MoneyListRow,
    ],
    imports: [
        IonicPageModule.forChild(MoneyListRow),
    ],
    exports: [
      MoneyListRow
    ]
})
export class MoneyListRowModule {
}
