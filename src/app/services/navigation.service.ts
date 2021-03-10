import { Injectable } from '@angular/core';

const FOOTER_LINKS_PAGES = [
    {
        label: 'Vitl Life blog',
        route: '/blog'
    },
    {
        label: 'Science',
        route: '/science'
    },
    {
        label: 'My Vitl',
        route: '/myvitl'
    },
    {
        label: 'Contact us & FAQs',
        route: '/contact'
    },
    {
        label: 'Careers',
        url: 'https://vitl.workable.com/'
    },
    {
        label: 'About us',
        route: '/about'
    }
];

const FOOTER_LINKS_PRODUCTS = [
    {
        label: 'Vitamins',
        route: '/products/vitamins'
    },
    {
        label: 'DNA',
        route: '/product/dna'
    },
    {
        label: 'Blood',
        route: '/product/blood'
    }
];

@Injectable()
export class NavigationService {

    constructor() {

    }

    getFooterLinksPages() { return FOOTER_LINKS_PAGES; }

    getFooterLinksProducts() { return FOOTER_LINKS_PRODUCTS; }

}
