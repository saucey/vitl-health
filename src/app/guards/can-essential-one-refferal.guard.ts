import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from '../services/api.service';
import {ReferralCodeExists} from '../queries/misc';
import {ModalService} from '../modules/modal/services/modal.service';

@Injectable({
    providedIn: 'root'
})
export class CanEssentialOneRefferalGuard implements CanActivate {

    constructor(
        private apiService: ApiService,
        private modalService: ModalService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return new Promise((resolve, reject) => {

            this.apiService.query(ReferralCodeExists, { code: next.params.code }).subscribe(({data : { referral } } ) => {
                if (referral) {
                    resolve(true);
                } else {
                    this.router.navigateByUrl('/');
                    this.modalService.alert('Referral code does not exist');
                    reject();
                }
            });

        });

    }

}
