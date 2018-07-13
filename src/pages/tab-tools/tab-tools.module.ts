import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabToolsPage } from './tab-tools';

@NgModule({
  declarations: [
    TabToolsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabToolsPage),
  ],
  exports: [
    TabToolsPage
  ],
  providers: [
  ]
})
export class TabToolsPageModule {}
