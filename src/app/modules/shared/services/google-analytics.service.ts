import {Injectable} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {Angulartics2GoogleAnalyticsEnhancedEcommerce} from 'angulartics2/ga-enhanced-ecom';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {TrackingEvent} from '../../../classes/trackingEvent';

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {

    constructor(
        private angulartics2GoogleAnalyticsEnhandedEcom: Angulartics2GoogleAnalyticsEnhancedEcommerce,
        private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
    ) {
        this.angulartics2GoogleAnalytics.startTracking();
    }

    /**
     * Set user
     * @param event
     */

    setUser(event: TrackingEvent) {

        this.angulartics2GoogleAnalytics.setUsername(event.data.id);

    }

    /**
     * Custom tracking event
     * @param event
     */

    customEvent(event: TrackingEvent) {

        this.sendCustomEvent(event.type, event.data.category, event.data.label);

    }

    /**
     * Track product view
     * @param event
     */

    trackProductView(event: TrackingEvent) {

        this.angulartics2GoogleAnalyticsEnhandedEcom.ecAddProduct({
            'id': event.data.id,
            'name': event.data.name,
            'category': event.data.grouping
        });

        this.angulartics2GoogleAnalyticsEnhandedEcom.ecSetAction('detail', {});

        this.sendCustomEvent('view', 'product', event.data.grouping);

    }

    /**
     * Add to cart
     * @param event
     */

    trackAddToCart(event: TrackingEvent) {

        this.angulartics2GoogleAnalyticsEnhandedEcom.ecAddProduct({
            'id': event.data.plan.product.id,
            'name': event.data.plan.product.name,
            'category': event.data.plan.product.grouping,
            'variant': event.data.plan.name,
            'price': event.data.plan.price,
            'quantity': event.data.quantity
        });

        this.angulartics2GoogleAnalyticsEnhandedEcom.ecSetAction('add', {});

        this.sendCustomEvent('add', 'product', event.data.plan.product.grouping);

    }

    /**
     * Track checkout progress
     * @param event
     */

    trackCheckoutProgress(event: TrackingEvent) {

        for (const item of event.data.cart.items) {

            this.angulartics2GoogleAnalyticsEnhandedEcom.ecAddProduct({
                'id': item.plan.product.id,
                'name': item.plan.product.name,
                'category': item.plan.product.grouping,
                'variant': item.plan.name,
                'price': item.plan.price,
                'quantity': item.quantity
            });

        }

        this.angulartics2GoogleAnalyticsEnhandedEcom.ecSetAction('checkout', {
            step: event.data.step
        });

        this.sendCustomEvent('progress', 'checkout', event.data.step);

    }

    /**
     * Track cart purchase
     * @param event
     */

    trackPurchase(event: TrackingEvent) {

        for (const item of event.data.items) {

            this.angulartics2GoogleAnalyticsEnhandedEcom.ecAddProduct({
                'id': item.plan.product.id,
                'name': item.plan.product.name,
                'category': item.plan.product.grouping,
                'variant': item.plan.name,
                'price': item.plan.price,
                'quantity': item.quantity
            });

        }

        this.angulartics2GoogleAnalyticsEnhandedEcom.ecSetAction('purchase', {
            'id': event.data.id,
            'revenue': event.data.total,
            'coupon': event.data.couponCode,
            'affiliation': event.data.awinCode,
            'shipping': event.data.shippingCost
        });

        this.sendCustomEvent('purchase', 'cart', '');

    }

    /**
     * Send custom event
     * @param type
     * @param category
     * @param label
     */

    sendCustomEvent(type: string, category: string, label: string) {

        this.angulartics2GoogleAnalytics.eventTrack(type, {
            category: category,
            label: label
        });

    }

}
