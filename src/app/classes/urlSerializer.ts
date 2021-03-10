import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import {EssentialOneComponent} from '../components/routes/essential-one/essential-one.component';

const partners = ['gruum', 'gousto', 'wh', 'mf', 'lw', 'inthestyle', 'fitness', 'elle', 'cosmo', 'sweatcoin', 'virgin', 'running-heroes', 'pact', 'bloom', 'investor', 'iknowj', 'we-are-tea', 'crowd', '360athletic', 'world-health-day', 'farmison'];

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {

        for (const partner of partners) {
            if (url.toLowerCase().indexOf(partner) !== -1) {
                return super.parse(url.toLowerCase());
            }
        }

        return super.parse(url);

    }
}
