import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  private chars: any = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  constructor() { }

  generateRandomString(length: any = 10) {
    let _randomUserId = "";

    while (length > 0) {
      _randomUserId += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
      length--;
    }
    return _randomUserId.replace(/^(.{4})(.{6})(.*)$/, "$1-$2-$3");
  }
}
