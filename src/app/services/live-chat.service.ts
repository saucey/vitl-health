import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {GlobalService} from './global.service';
import {WindowRef} from './windowref.service';

@Injectable({
    providedIn: 'root'
})
export class LiveChatService {

    private appId = 'zumiegqg';
    private intercomElem;
    private booted = false;

    constructor(
        private globalService: GlobalService,
        private authService: AuthService,
        private windowRef: WindowRef
    ) {

        if (this.globalService.isBrowser()) {

            this.bootChat();

            this.globalService.events.filter(event => event.type === 'hideLiveChat').subscribe(() => this.hideChat());

            this.globalService.events.filter(event => event.type === 'initLiveChat').subscribe(() => this.bootChat());

            this.globalService.events.filter(event => event.type === 'showLiveChat').subscribe(() => this.showChat());

            this.globalService.events.filter(event => event.type === 'logout').subscribe(() => this.reloadChat());

        }

    }

    bootChat() {
        this.windowRef.nativeWindow.Intercom('boot', {app_id: this.appId});

        if (!this.booted) {
            this.authService.getUser().subscribe((user) => {
                if (user && user.type === 'user') {
                    this.windowRef.nativeWindow.Intercom('update', {
                        name: user.firstName,
                        email: user.email
                    });
                }
            });
            this.booted = true;
        }


    }

    showChat() {
        this.windowRef.nativeWindow.Intercom('boot', {app_id: this.appId});
        this.intercomElem.style.display = 'block';
    }

    hideChat() {
        if (!this.intercomElem) {
            this.intercomElem = document.getElementById('intercom-container');
        }

        this.windowRef.nativeWindow.Intercom('shutdown');
        this.intercomElem.style.display = 'none';
    }

    reloadChat() {
        this.windowRef.nativeWindow.Intercom('shutdown');
        this.windowRef.nativeWindow.Intercom('boot', {app_id: this.appId});
    }

}
