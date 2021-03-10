import {Image} from '../image';
import {Action} from '../lana/action';

export class KitStatus {
    label: string;
    items: Array<KitStatusItem>;
}

export class KitStatusItem {
    label: string;
    description: string;
    icon: Image;
    action: Action;
    current: boolean;
}
