import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {LanaService} from '../services/lana.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {

    constructor(private lanaService: LanaService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {

        return this.lanaService.getDashboard();

    }

}