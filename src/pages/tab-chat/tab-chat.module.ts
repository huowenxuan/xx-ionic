import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabChatPage } from './tab-chat';
import {ChatService} from "../../providers/chat-service";

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
