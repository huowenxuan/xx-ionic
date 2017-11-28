import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from '@ionic/storage';

// common third-party
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Clipboard } from '@ionic-native/clipboard';

// tab container
import {TabsPage} from '../pages/tabs/tabs';
import {TabMoneyPage} from "../pages/tab-money/tab-money";
import {TabChatPage} from "../pages/tab-chat/tab-chat";
import {TabNotePage} from "../pages/tab-note/tab-note";

// service/provider
import {EmojiProvider} from "../providers/emoji";
import {MoneyService} from '../providers/money-service/money-service';
import {ChatService} from "../providers/chat-service";

// components
import {MoneyListRow} from "../components/money-list-row/money-list-row";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,
    TabNotePage,

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
    TabChatPage,
    TabNotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    MoneyService,
    ChatService
  ]
})
export class AppModule {
}
