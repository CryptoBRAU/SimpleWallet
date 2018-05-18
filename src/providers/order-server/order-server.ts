import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsProvider } from '../settings/settings';

@Injectable()
export class OrderServerProvider {

  private serverUrl : string;

  constructor(public http: HttpClient, private settings: SettingsProvider) {
    this.serverUrl = "http://13.57.204.17:3000";
  }

  async executeBtcOrder(order: any) {
    let orderUrl = this.serverUrl + '/order';
    let settings = await this.settings.getSettings();
    if(!settings.username) {
      return Promise.resolve({
        code: 1,
        msg: 'Invalid username or not setted.'
      });
    }
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
