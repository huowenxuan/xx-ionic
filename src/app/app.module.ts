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

// container
import {TabsPage} from '../pages/tabs/tabs';
import {TabMoneyPage} from "../pages/tab-money/tab-money";
import {TabChatPage} from "../pages/tab-chat/tab-chat";
import {TabNotePage} from "../pages/tab-note/tab-note";
import {LoginPage} from "../pages/login/login";
import {NoteEditPage} from "../pages/note-edit/note-edit";

// service/provider
import {EmojiProvider} from "../providers/emoji";
import {MoneyService} from '../providers/money-service';
import {ChatService} from "../providers/chat-service";
import {UserService} from "../providers/user-service";

// components
import {MoneyListRow} from "../components/money-list-row/money-list-row";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,
    TabNotePage,
    // 除了tab外的其他container也必须声明，否则无法通过类push，只能通过类名的字符串push
    LoginPage,
    NoteEditPage,

    // 组件必须声明
    MoneyListRow
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: '返回',
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
    TabNotePage,
    LoginPage,
    NoteEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    MoneyService,
    ChatService,
    UserService
  ]
})
export class AppModule {
}
