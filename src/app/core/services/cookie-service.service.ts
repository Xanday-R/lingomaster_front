import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(token: string) {
    localStorage.setItem(
        'cookie',
        `jwt=${token}; Path=/; Max-Age=${86400000*60}`
      )
  }

  getCookie() {
    return localStorage.getItem('cookie') || ''
  }

  clearCookie() {
    localStorage.removeItem('cookie');
  }
}
