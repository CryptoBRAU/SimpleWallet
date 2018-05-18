import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';
import { SettingsProvider } from '../settings/settings';

@Injectable()
export class BinanceProvider {

  private binanceUrl : string;

  constructor(public http: HttpClient, private settings: SettingsProvider) {
    this.binanceUrl = "https://api.binance.com";
  }

  async getSignature(secret: string, params: string) {
    return Crypto.enc.Hex.stringify(Crypto.HmacSHA256(params, secret));
  }

  async accountInfo() {
    let settings = await this.settings.getSettings();
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

    return new Promise((resolve, reject) => {
      this.http.get(accountInfoUrl, options).subscribe(data => { resolve(data); }, err => { reject(this.getErrorMessage(err)); });
    });
  }

  async getPrice(symbol?: string) {
    let priceUrl = this.binanceUrl + '/api/v3/ticker/price';
    if (symbol) {
      priceUrl += '?symbol=' + symbol;
    }
    return new Promise((resolve, reject) => {
      this.http.get(priceUrl).subscribe(data => { resolve(data); }, err => { reject(this.getErrorMessage(err)); });
    });
  }

  getErrorMessage(error) {
    if (error instanceof String) {
      return error;
    }
    if (error.error) {
      switch (error.error.code) {
        case -2015:
          return 'Invalid API-key/Secret.';
      }
      return error.error.message;
    }
    return 'Binance server is not responding, please try later.';
  }
}