import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BinanceProvider } from '../../providers/binance/binance';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  private coinsPrice: any;
  private accountInfo: any;
  public binanceBtcBalance: number;
  public binanceUsdBalance: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, private toast: ToastController, private binance: BinanceProvider) {
    this.binanceBtcBalance = 0;
    this.binanceUsdBalance = 0;
  }

  ionViewDidEnter() {
    this.refresh();
  }

  async refresh() {
    let loader = this.loading.create({
      content: "Loading balances",
      showBackdrop: false
    });
    loader.present();
    await this.loadBinanceBalance();
    loader.dismiss();
  }

  async loadBinanceBalance() {
    try {
      this.coinsPrice = await this.binance.getPrice();
      this.accountInfo = await this.binance.accountInfo();
      if (this.accountInfo) {
        let balances = this.getBalances(this.accountInfo.balances);
        let binanceBtcBalance = 0;
        let binanceUsdBalance = 0;
        balances.forEach(coin => {
          let btcUsdValue = this.getBtcAndUsdValue(coin);
          binanceBtcBalance += btcUsdValue.btcAmount;
          binanceUsdBalance += btcUsdValue.usdAmount;
        });
        this.binanceBtcBalance = binanceBtcBalance;
        this.binanceUsdBalance = binanceUsdBalance;
      }
    } catch (error){
      let errorMessage = error;
      //TODO To create an ErrorHandling Provider
      if (errorMessage instanceof Error) {
        errorMessage = errorMessage.message;
      }
      this.toast.create({
        message: errorMessage,
        duration: 2000
      }).present();
    }
  }

  getBalances(balances) {
    return balances.filter(item => {
      if(parseFloat(item.free) > 0 || parseFloat(item.locked) > 0) {
        return item;
      }
    });
  }

  getPrice(symbol) {
    return this.coinsPrice.find(coinPrice => {
      return coinPrice.symbol === symbol;
    });
  }

  getBtcAndUsdValue(coin) {
    let btcAndUsdValues = {
      btcAmount: 0,
      usdAmount: 0
    }
    if (coin.asset === 'BTC') {
      btcAndUsdValues.btcAmount = (parseFloat(coin.free) + parseFloat(coin.locked));
      btcAndUsdValues.usdAmount = btcAndUsdValues.btcAmount * parseFloat(this.getPrice('BTCUSDT').price);
      return btcAndUsdValues;
    }
    if (coin.asset === 'USDT') {
      btcAndUsdValues.usdAmount = (parseFloat(coin.free) + parseFloat(coin.locked));
      btcAndUsdValues.btcAmount = btcAndUsdValues.usdAmount / parseFloat(this.getPrice('USDTBTC').price);
      return btcAndUsdValues;
    }
    let btcPrice = parseFloat(this.getPrice(coin.asset + 'BTC').price);
    btcAndUsdValues.btcAmount = (parseFloat(coin.free) + parseFloat(coin.locked)) * btcPrice;
    btcAndUsdValues.usdAmount = btcAndUsdValues.btcAmount * parseFloat(this.getPrice('BTCUSDT').price);
    return btcAndUsdValues;
  }

}
