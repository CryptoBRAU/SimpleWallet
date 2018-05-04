import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyAndSellPage } from './buy-and-sell';

@NgModule({
  declarations: [
    BuyAndSellPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyAndSellPage),
  ],
})
export class BuyAndSellPageModule {}
