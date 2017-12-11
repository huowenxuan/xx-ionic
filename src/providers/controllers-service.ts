import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Loading, LoadingController, Toast, ToastController} from "ionic-angular";

@Injectable()
export class ControllersService {

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  toast(message, position='bottom', duration=2000): Toast {
    return this.toastCtrl.create({message, position, duration})
  }

  loading(content='Please wait...'): Loading {
    return this.loadingCtrl.create({content})
  }
}
