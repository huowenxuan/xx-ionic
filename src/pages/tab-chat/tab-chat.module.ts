import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabChatPage } from './tab-chat';

@NgModule({
  declarations: [
    TabChatPage,
  ],
  imports: [
    IonicPageModule.forChild(TabChatPage),
  ],
  exports: [
    TabChatPage
  ],
  providers: [
  ]
})
export class TabChatPageModule {}
