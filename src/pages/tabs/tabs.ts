import { Component } from '@angular/core';

import { TabMoneyPage } from "../tab-money/tab-money";
import { TabChatPage } from "../tab-chat/tab-chat";
import {TabNotePage} from "../tab-note/tab-note";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  chat = TabChatPage;
  money = TabMoneyPage;
  note = TabNotePage

  constructor() {

  }
}
