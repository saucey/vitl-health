import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as kitQueries from '../../../queries/kit';
import {ApiService} from '../../../services/api.service';
import {GlobalService} from '../../../services/global.service';
import {ModalService} from '../../modal/services/modal.service';
import * as miscQueries from '../../../queries/misc';
import {AccountService} from '../../../services/account.service';

@Injectable({
    providedIn: 'root'
})

export class KitRegistrationService {
    public kit;
    public barcode;
    public account;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private globalService: GlobalService,
        private accountService: AccountService,
        private modalService: ModalService,
    ) {
        this.accountService.getAccount().subscribe((account) => this.account = account);
    }

    public onKitSelect(kit) {
        this.kit = kit;
        this.barcode = null;
        this.router.navigateByUrl('/kit/barcode');
    }

    private _kitExists(barcode) {
        return this.apiService.query(kitQueries.KitExists, {type: this.kit.code, barcode: barcode}).map(({data}) => data.kit_canRegister);
    }

    public submitBarcodeForm(barcode) {
        this.globalService.startLoading();

        this._kitExists(barcode).subscribe((isKitUnregistered) => {
            if (isKitUnregistered) {
                this.barcode = barcode;
                this.router.navigateByUrl('/kit/account');
            } else {
                this.modalService.alert('Submitted barcode is invalid');
            }
            this.globalService.stopLoading();
        });
    }

    public submitUserDetailsForm(userDetails) {
        const data = userDetails.value;

        data.type = this.kit.code;
        data.typeLabel = this.kit.label;
        data.barcode = this.barcode;

        const startSubmit = Date.now();
        this.globalService.startLoading();
        this.apiService.mutate(miscQueries.RegisterKit, data).subscribe(() => {
            const submitDuration = Date.now() - startSubmit;
            const timeout = submitDuration < 1000 ? 1500 - submitDuration : 0;

            setTimeout(_ => {
                this.globalService.stopLoading();
                window.scrollTo(0, 0);
                this.router.navigateByUrl('/kit/confirmation');
            }, timeout);

        }, () => this.globalService.stopLoading());
    }

    public resetState() {
        this.kit = null;
        this.barcode = null;
    }
}
