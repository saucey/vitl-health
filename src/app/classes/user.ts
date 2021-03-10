import {KitStatus} from './kit/status';

export class User {
    id: number;
    email: string;
    firstName: string;
    firstNamePlural: string;
    lastName: string;
    type: string;
    deliveryAddresses: Array<any>;
    paymentMethods: Array<any>;
    goals: Array<any>;
    recommendations: Array<any>;
    dnaStatus: KitStatus;
}
