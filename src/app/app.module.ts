import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from '@ionic/storage';

// common third-party
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Clipboard} from '@ionic-native/clipboard';
import {CalendarModule} from "ion2-calendar";

// container
import {TabsPage} from '../pages/tabs/tabs';
import {TabMoneyPage} from "../pages/tab-money/tab-money";
import {TabChatPage} from "../pages/tab-chat/tab-chat";
import {TabNotePage} from "../pages/tab-note/tab-note";
import {LoginPage} from "../pages/login/login";
import {NoteEditPage} from "../pages/note-edit/note-edit";
import {MarkdownPageModule} from "../pages/markdown/markdown.module";

// service/provider
import {EmojiProvider} from "../providers/emoji";
import {MoneyService} from '../providers/money-service';
import {ChatService} from "../providers/chat-service";
import {UserService} from "../providers/user-service";
import {ControllersService} from "../providers/controllers-service";

// component
import {MoneyListRowModule} from "../components/money-list-row/money-list-row.module";
import {Keyboard} from "@ionic-native/keyboard";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,
    TabNotePage,

    LoginPage,
    NoteEditPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: '返回',
      tabsLayout: 'ion-left',
    }),
    IonicStorageModule.forRoot(),

    // container
    MarkdownPageModule,

    // 组件声明
    CalendarModule,
    MoneyListRowModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,
    TabNotePage,
    LoginPage,
    NoteEditPage,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "zh-CN" },
    StatusBar,
    SplashScreen,
    Clipboard,
    Keyboard,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ControllersService,
    EmojiProvider,
    MoneyService,
    ChatService,
    UserService,
  ]
})
export class AppModule {
}
