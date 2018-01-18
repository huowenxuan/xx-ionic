import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpendPage } from './spend';
import {MoneyListRowModule} from "../../components/money-list-row/money-list-row.module";

@NgModule({
  declarations: [
    SpendPage,
  ],
  imports: [
    MoneyListRowModule,
    IonicPageModule.forChild(SpendPage),
  ],
})
export class SpendPageModule {}
