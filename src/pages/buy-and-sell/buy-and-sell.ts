import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buy-and-sell',
  templateUrl: 'buy-and-sell.html',
})
export class BuyAndSellPage {

  private buyAndSell : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.buyAndSell = this.formBuilder.group({
      coinName: ['', Validators.required],
      btcAmount: ['', Validators.required],
      percentToSell: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyAndSellPage');
    //TODO Load here the predefined user settings
  }

  execute() {
    console.log(this.buyAndSell.value)
  }
}