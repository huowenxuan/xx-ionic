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
import { SuperTabsModule } from 'ionic2-super-tabs';
import { FormsModule } from '@angular/forms';

// container
import {TabsPage} from '../pages/tabs/tabs';
import {TabMoneyPage} from "../pages/tab-money/tab-money";
import {TabToolsPage} from "../pages/tab-tools/tab-tools";
import {TabNotePage} from "../pages/tab-note/tab-note";
import {LoginPage} from "../pages/login/login";
import {NoteEditPage} from "../pages/note-edit/note-edit";
import {MarkdownPageModule} from "../pages/markdown/markdown.module";

// service/provider
import {EmojiProvider} from "../providers/emoji";
import {MoneyService} from '../providers/money-service';
import {UserService} from "../providers/user-service";
import {ControllersService} from "../providers/controllers-service";
import {SettingsProvider} from "../providers/settings";
import {UtilsProvider} from "../providers/utils";

// component
import {MoneyListRowModule} from "../components/money-list-row/money-list-row.module";
import {Keyboard} from "@ionic-native/keyboard";
import {KeyboardAttachDirective} from "../directives/keyboard-attach.directive";
import {RelativeTime} from "../pipes/relative-time";
import {EmojiPickerComponentModule} from "../components/emoji-picker/emoji-picker.module";
import {NoteService} from "../providers/note-service";
import {SpendEditPage} from "../pages/spend-edit/spend-edit";
import {SpendPage} from "../pages/spend/spend";
import {IonDigitKeyboard} from "../components/ion-digit-keyboard/ion-digit-keyboard.module";
import {SpendPageModule} from "../pages/spend/spend.module";
import {TestPage} from "../pages/test/test";
import {NoteSearchPage} from "../pages/note-search/note-search";
import {MomsHolidayPage} from "../pages/tools/moms-holiday/moms-holiday";
import {PhotoLibrary} from "@ionic-native/photo-library";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabToolsPage,
    TabNotePage,

    LoginPage,
    NoteEditPage,
    NoteSearchPage,
    SpendEditPage,
    TestPage,
    MomsHolidayPage,

    KeyboardAttachDirective,
    RelativeTime
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      tabsHideOnSubPages: true,
      backButtonText: '',
      tabsLayout: 'ion-center',
      iconMode: "ios",
      // modalEnter: "modal-md-slide-in",
      // modalLeave: "modal-md-slide-out",
      pageTransition: "ios",
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
    SuperTabsModule.forRoot(),

    // container
    MarkdownPageModule,

    // 组件声明
    CalendarModule,
    MoneyListRowModule,
    EmojiPickerComponentModule,
    SpendPageModule,

    IonDigitKeyboard
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabMoneyPage,
    TabToolsPage,
    TabNotePage,
    LoginPage,
    NoteEditPage,
    NoteSearchPage,
    SpendEditPage,
    SpendPage,
    TestPage,
    MomsHolidayPage,
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
    UserService,
    SettingsProvider,
    UtilsProvider,
    NoteService,
    PhotoLibrary,
    InAppBrowser
  ]
})
export class AppModule {
}
