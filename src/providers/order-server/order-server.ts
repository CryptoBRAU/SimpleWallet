import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class OrderServerProvider {

  private settings : any;
  private serverUrl : string;

  constructor(public http: HttpClient, private storage: Storage, private toast: ToastController) {
    this.serverUrl = "http://13.57.204.17:3000";
  }

  // TODO set to a provider
  async getSettings() {
    this.settings = await this.storage.get('settings');
    if(!this.settings || !this.settings.username) {
      this.toast.create({
        message: "Username not setted.",
        duration: 2000
      }).present();
      return null;
    }
    if(!this.settings || !this.settings.key || !this.settings.secret) {
      this.toast.create({
        message: "Binance key/secret wasn't setted.",
        duration: 2000
      }).present();
      return null;
    }
    return this.settings;
  }

  async executeBtcOrder(order: any) {
    let orderUrl = this.serverUrl + '/order';
    let settings = await this.getSettings();
    let orderData = {
      coin: order.coinName,
      btcAmount: order.btcAmount,
      stopLoss: order.percentToSell,
      sellTarget: order.percentToStopLoss,
      sellOrderType: order.orderType,
      apiKey: settings.key,
      secretKey: settings.secret,
      username: settings.username,
      exchange: 'binance'
    };
    return new Promise(resolve => {
      this.http.post(orderUrl, orderData).subscribe(data => {
        resolve(data);
      });
    });
  }
}
