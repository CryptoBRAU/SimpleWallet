import { Component } from '@angular/core';

import { BuyAndSellPage } from '../buy-and-sell/buy-and-sell';
import { StatusPage } from '../status/status';
import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BuyAndSellPage;
  tab2Root = StatusPage;
  tab3Root = SettingsPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
