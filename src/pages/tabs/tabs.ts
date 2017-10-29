import { Component } from '@angular/core';

import { TabMoneyPage } from "../tab-money/tab-money";
import { TabChatPage } from "../tab-chat/tab-chat";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TabMoneyPage;
  tab2Root = TabChatPage;

  constructor() {

  }
}
