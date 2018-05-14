import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private settingsForm : FormGroup;
  private settings : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private toast: ToastController) {
    this.settings = {
      username: '',
      key: '',
      secret: '',
      defaultBtcAmount: 0,
      defaultPercentToSell: 3,
      defaultPercentToStopLoss: 2
    };
    this.buildForm();
    this.storage.get('settings').then((val) => {
      if (val) {
        this.settings = val;
        this.buildForm();
      }
    });
  }

  buildForm() {
    this.settingsForm = this.formBuilder.group({
      username: [this.settings.username, Validators.required],
      key: [this.settings.key, Validators.required],
      secret: [this.settings.secret, Validators.required],
      defaultBtcAmount: [this.settings.defaultBtcAmount],
      defaultPercentToSell: [this.settings.defaultPercentToSell],
      defaultPercentToStopLoss: [this.settings.defaultPercentToStopLoss]
    });
  }

  save() {
    this.storage.set('settings', this.settingsForm.value);
    this.toast.create({
      message: 'Setiings successfully saved',
      duration: 2000
    }).present();
  }
}
