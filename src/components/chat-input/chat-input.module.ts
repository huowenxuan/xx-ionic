import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChatInputComponent} from './chat-input';

@NgModule({
  declarations: [
    ChatInputComponent,
  ],
  imports: [
    IonicPageModule.forChild(ChatInputComponent),
  ],
  exports: [
    ChatInputComponent
  ]
})
export class ChatInputModule {
}
