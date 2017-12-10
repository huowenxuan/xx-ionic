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
import {SettingsProvider} from "../providers/settings";

// component
import {MoneyListRowModule} from "../components/money-list-row/money-list-row.module";
import {Keyboard} from "@ionic-native/keyboard";
import {ChatPage} from "../pages/chat/chat";
import {KeyboardAttachDirective} from "../directives/keyboard-attach.directive";
import {RelativeTime} from "../pipes/relative-time";
import {ChatInputModule} from "../components/ChatInput/chat-input.module";
import {EmojiPickerComponentModule} from "../components/emoji-picker/emoji-picker.module";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,
    TabNotePage,

    LoginPage,
    ChatPage,
    NoteEditPage,

    KeyboardAttachDirective,
    RelativeTime
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: '返回',
      tabsLayout: 'ion-left',
      iconMode: "md",
      // modalEnter: "modal-md-slide-in",
      // modalLeave: "modal-md-slide-out",
      pageTransition: "md",
      // backButtonIcon: "ios-arrow-back",
      // iconMode: "ios",
      // modalEnter: "modal-ios-slide-in",
      // modalLeave: "modal-ios-slide-out",
      // pageTransition: "ios",

      // scrollPadding: false,
      // scrollAssist: true,
      // autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),

    // container
    MarkdownPageModule,

    // 组件声明
    CalendarModule,
    MoneyListRowModule,
    ChatInputModule,
    EmojiPickerComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabChatPage,
    TabNotePage,
    LoginPage,
    ChatPage,
    NoteEditPage
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
    SettingsProvider
  ]
})
export class AppModule {
}
