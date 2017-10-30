import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabMoneyPage } from './tab-money';
import {MoneyListRowModule} from "../../components/money-list-row/money-list-row.module";

@NgModule({
  declarations: [
    TabMoneyPage,
  ],
  imports: [
    MoneyListRowModule,
    IonicPageModule.forChild(TabMoneyPage),
  ],
})
export class TabMoneyPageModule {}
