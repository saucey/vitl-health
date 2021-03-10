import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(private authService: AuthService) {}

    resolve() {

        return this.authService.loadUser();

    }

}