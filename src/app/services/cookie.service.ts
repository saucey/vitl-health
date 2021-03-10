import { Injectable, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { CookieService as BrowserCookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    cookies = {};

    constructor(
        private browserCookieService: BrowserCookieService,
        private injector: Injector,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {

        if (isPlatformBrowser(platformId) === false) {
            this.cookies = injector.get(REQUEST).cookies;
        }

    }

    setCookies(cookies) {
        this.cookies = cookies;
    }

    getCookie(key) {
        if (isPlatformBrowser(this.platformId)) {
            return this.browserCookieService.get(key);
        } else {
            return this.cookies[key];
        }
    }

    setCookie(key, value, expires = null) {
        if (isPlatformBrowser(this.platformId)) {
            this.browserCookieService.set(key, value, expires, '/', 'vitl.com');
        } else {
            this.injector.get(RESPONSE).cookie(key, value, {
                path: '/',
                domain: 'vitl.com'
            });
        }
    }

    clearCookie(key) {
        if (isPlatformBrowser(this.platformId)) {
            this.browserCookieService.delete(key, '/', 'vitl.com');
        } else {
            this.injector.get(RESPONSE).clearCookie(key, {
                path: '/',
                domain: 'vitl.com'
            });
        }
    }

    setExpirableCookie(key, value, expirestAt) {
        if (isPlatformBrowser(this.platformId)) {
            this.browserCookieService.set(key, value, expirestAt, '/', 'vitl.com');
        }
    }

}
