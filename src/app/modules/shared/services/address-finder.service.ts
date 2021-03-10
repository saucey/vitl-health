import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../../services/global.service';
import {ConfigService} from '../../../services/config.service';
import {ModalService, ModalTypes} from '../../modal/services/modal.service';
import {ModalComponent} from '../../modal/components/modal.component';

@Injectable({
  providedIn: 'root'
})
export class AddressFinderService {

  constructor(
      private globalService: GlobalService,
      private configService: ConfigService,
      private modalService: ModalService,
      private http: HttpClient
  ) { }

  findAddress(postcode: string) {
    return new Promise(resolve => {
      if (postcode) {
        this.searchForAddress(resolve, postcode);
      }
    });
  }

  searchForAddress(resolve, postcode: string) {
    this.loadAddresses(postcode).then(addresses => {
      this.displayAddresses(addresses, resolve);
    });
  }

  displayAddresses(addresses, resolve) {
    this.modalService.create(ModalTypes.AddressFinder, {
      title: 'Select your address',
      data: {
        addresses: addresses
      },
      ctas: [
        { label: 'Can\'t find your address?', type: 'link', callback: ((modal: ModalComponent) => {
            modal.close();
            resolve(false);
          })
        }
      ],
      callback: (modal: ModalComponent, value: any) => {

        if (value.Type === 'Address') {
          this.callAddressRetrieveApi(value.Id).then((address) => {
            modal.close();
            this.displayAddress(addresses, address, resolve);
          });
        } else {
          this.loadAddresses('', value.Id).then((items) => {
            modal.close();
            this.displayAddresses(items, resolve);
          });
        }

      }
    });
  }

  displayAddress(addresses, address, resolve) {
    this.modalService.create(ModalTypes.AddressConfirm, {
      title: 'Confirm address',
      data: {
        address: address
      },
      ctaStyle: 'stacked',
      ctas: [
        { label: 'Confirm', callback: ((modal: ModalComponent) => {
          modal.close();
          resolve(address);
        }) },
        { label: 'Edit address manually', type: 'link', preText: 'Not correct?', callback: ((modal: ModalComponent) => {
          modal.close();
          resolve(false);
        }) }
      ]
    });
  }

  loadAddresses(postcode: string, container: string = null) {
    return new Promise((resolve, reject) => {
      this.callAddressFinderApi(resolve, reject, postcode, container);
    });
  }

  callAddressRetrieveApi(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('https://api.addressy.com/Capture/Interactive/Retrieve/v1.1/json3.ws', {
        params: {
          'Key': 'XR29-WW28-CA59-NN99',
          'Id': id
        }
      }).subscribe((data: any) => {
        const newAddress = data.Items[0];
        resolve({
          address: this.formatAddress(newAddress),
          town: newAddress.City,
          county: newAddress.Province,
          postcode: newAddress.PostalCode,
          country: newAddress.CountryIso2
        });
      });
    });
  }

  formatAddress(address) {
    const arr = [];
    for (const key of ['Company', 'Line1', 'Line2', 'Line3', 'Line4', 'Line5']) {
      if (address[key]) {
        arr.push(address[key]);
      }
    }
    return arr.join(', ');
  }

  callAddressFinderApi(resolve, reject, postcode: string, container: string = null) {

    this.configService.getConfig().subscribe((config) => {
      this.http.get('https://api.addressy.com/Capture/Interactive/Find/v1.1/json3.ws', {
        params: {
          'Key': 'XR29-WW28-CA59-NN99',
          'Text': postcode,
          'Origin': config.country,
          'Countries': config.country,
          'Container': container
        }
      }).subscribe((data: any) => {
        this.parseAddressFinderResult(resolve, reject, postcode, data.Items);
      });

    });

  }

  parseAddressFinderResult(resolve, reject, postcode: string, items: Array<any>) {
    if (items.length === 0) {
      reject();
    } else if (items.length === 1 && items[0].Type !== 'Address') {
      this.callAddressFinderApi(resolve, reject, postcode, items[0].Id);
    } else {
      resolve(items);
    }
  }

}
