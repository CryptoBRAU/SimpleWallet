import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as Crypto from 'crypto-js';

@Injectable()
export class BinanceProvider {

  private settings : any;
  private binanceUrl : string;

  constructor(public http: HttpClient, private storage: Storage, private toast: ToastController) {
    this.binanceUrl = "https://api.binance.com";
  }

  // TODO Set to a provider
  async getSettings(force?: Boolean) {
    if(this.settings && !force) {
      return this.settings;
    }
    this.settings = await this.storage.get('settings');
    if(!this.settings || !this.settings.key || !this.settings.secret) {
      this.toast.create({
        message: "Binance key/secret wasn't setted.",
        duration: 2000
      }).present();
      return null;
    }
    return this.settings;
  }

  async getSignature(secret: string, params: string) {
    return Crypto.enc.Hex.stringify(Crypto.HmacSHA256(params, secret));
  }

  async accountInfo() {
    let settings = await this.getSettings();
    let httpParams = new HttpParams()
      .set('timestamp', Date.now().toString())
      .set('recvWindow', "5000");

    let signature = await this.getSignature(settings.secret, httpParams.toString());

    let headers = new HttpHeaders()
      .set('X-MBX-APIKEY', settings.key);
    let options = {
      headers: headers,
      params: httpParams.append('signature', signature)
    }
    let accountInfoUrl = this.binanceUrl + '/api/v3/account';

    return new Promise(resolve => {
      this.http.get(accountInfoUrl, options).subscribe(data => {
        resolve(data);
      });
    });
  }

  async getPrice(symbol?: string) {
    let priceUrl = this.binanceUrl + '/api/v3/ticker/price';
    if (symbol) {
      priceUrl += '?symbol=' + symbol;
    }
    return new Promise(resolve => {
      this.http.get(priceUrl).subscribe(data => {
        resolve(data);
      });
    });
  }
}