import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from '@ionic/storage';

import {TabsPage} from '../pages/tabs/tabs';
import {TabMoneyPage} from "../pages/tab-money/tab-money";
import {TabChatPage} from "../pages/tab-chat/tab-chat";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {EmojiProvider} from "../providers/emoji";
import {MoneyService} from '../providers/money-service/money-service';

import {MoneyListRow} from "../components/money-list-row/money-list-row";
import {ChatService} from "../providers/chat-service";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,

    // 组件必须声明
    MoneyListRow
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      tabsLayout: 'ion-left',
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    MoneyService,
    ChatService
  ]
})
export class AppModule {
}
