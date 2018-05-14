import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OrderServerProvider } from '../../providers/order-server/order-server';

@IonicPage()
@Component({
  selector: 'page-buy-and-sell',
  templateUrl: 'buy-and-sell.html',
})
export class BuyAndSellPage {

  private buyAndSellForm: FormGroup;
  private btcAmount = '';
  private percentToSell = '';
  private percentToStopLoss = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private orderServer: OrderServerProvider, private toast: ToastController) {
    this.buildForm();
  }

  ionViewDidEnter() {
    this.loadSettings();
  }

  async loadSettings() {
    let settings = await this.storage.get('settings');

    if (settings) {
      if (settings.defaultBtcAmount) {
        this.btcAmount = settings.defaultBtcAmount;
      }
      if (settings.defaultPercentToSell) {
        this.percentToSell = settings.defaultPercentToSell;
      }
      if (settings.defaultPercentToStopLoss) {
        this.percentToStopLoss = settings.defaultPercentToStopLoss;
      }
    }
    this.buildForm();
  }

  buildForm() {
    this.buyAndSellForm = this.formBuilder.group({
      coinName: ['', Validators.required],
      btcAmount: [this.btcAmount, Validators.required],
      percentToSell: [this.percentToSell],
      percentToStopLoss: [this.percentToStopLoss],
      orderType: ['MARKET']
    });
  }

  execute() {
    this.orderServer.executeBtcOrder(this.buyAndSellForm.value).then((val: any) => {
      let message = 'Order successfully placed!';
      if (val) {
        if (val.code) {
          message = val.msg;
        }
      } else {
        message = 'An unespected error occurred!';
      }
      this.toast.create({
        message: message,
        duration: 2000
      }).present();
    });
  }
}