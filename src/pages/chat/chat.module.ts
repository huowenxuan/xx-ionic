import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import {ChatService} from "../../providers/chat-service";
import {RelativeTime} from "../../pipes/relative-time";
import {EmojiPickerComponentModule} from "../../components/emoji-picker/emoji-picker.module";
import {EmojiProvider} from "../../providers/emoji";
import {KeyboardAttachDirective} from "../../directives/keyboard-attach.directive";
import {ChatInputModule} from "../../components/ChatInput/chat-input.module";

@NgModule({
  declarations: [
    ChatPage,
    RelativeTime,
    KeyboardAttachDirective
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(ChatPage),
    ChatInputModule
  ],
  exports: [
    ChatPage
  ],
  providers:[
    ChatService,
    EmojiProvider
  ]
})
export class ChatModule {}
