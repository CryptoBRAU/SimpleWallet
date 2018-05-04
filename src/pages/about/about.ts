import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  mailto() {
    console.log('mailto');
    let Link="mailto:silva.marcel@gmail.com?subject=Simple Wallet App: Concerns/Suggestions";
    window.open(Link, "_system");
  }
}