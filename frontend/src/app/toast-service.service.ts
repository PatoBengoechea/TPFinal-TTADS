import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private iziToast: Ng2IzitoastService,
  ) { }
  success(msg = '', title = '¡Datos guardados correctamente!') {
    this.iziToast.success({
      title,
      message: msg,
      position: 'topRight',
      transitionIn: 'bounceInDown',
      transitionOut: 'fadeOutRight'
    });
  }
  info(msg = '', title = '') {
    this.iziToast.info({
      title,
      message: msg,
      position: 'topRight',
      transitionIn: 'bounceInDown',
      transitionOut: 'fadeOutRight'
    });
  }
  danger(msg = '', title = 'ERROR') {
    this.iziToast.error({
      title,
      message: msg,
      position: 'topRight',
      transitionIn: 'bounceInDown',
      transitionOut: 'fadeOutRight'
    });
  }
}