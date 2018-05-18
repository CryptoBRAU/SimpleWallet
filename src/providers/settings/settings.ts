import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  private settings : any;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async getSettings() {
    this.settings = await this.storage.get('settings');
    if(!this.settings || !this.settings.key || !this.settings.secret) {
      throw new Error("Binance key/secret wasn't setted.");
    }
    return this.settings;
  }
}
