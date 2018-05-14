import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BuyAndSellPage } from '../pages/buy-and-sell/buy-and-sell';
import { StatusPage } from '../pages/status/status';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { BinanceProvider } from '../providers/binance/binance';
import { OrderServerProvider } from '../providers/order-server/order-server';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BuyAndSellPage,
    StatusPage,
    SettingsPage,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BuyAndSellPage,
    StatusPage,
    SettingsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BinanceProvider,
    OrderServerProvider
  ]
})
export class AppModule {}
