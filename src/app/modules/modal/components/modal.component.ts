import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver, ElementRef,
    EventEmitter,
    HostBinding,
    Injector,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styles: [],
    animations: [
        trigger('fadeOut', [
            state('*', style( {
                opacity: 1
            })),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('500ms ease', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

    @HostBinding('@fadeOut')

    @ViewChild('dynamic', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    @ViewChild('modalInner') modalInner: ElementRef;

    @ViewChild('dummyFocus') dummyFocus;

    @Output() onViewInit: EventEmitter<any> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    private ngUnsubscribe$ = new Subject();

    options = {
        title: null,
        subtitle: null,
        titleDivider: true,
        data: null,
        ctaStyle: 'grid',
        ctas: [],
        callback: (modal: ModalComponent, value: any) => {}
    };

    style: string;
    styles: Array<string> = [];

    constructor(
        private injector: Injector,
        private componentFactory: ComponentFactoryResolver,
    ) {
    }
    ngOnInit() {
        this.dummyFocus.nativeElement.focus({
            preventScroll: true
        });
    }

    ngAfterViewInit() {
        this.onViewInit.emit(this.modalInner);
    }

    setOptions(options) {
        this.options = Object.assign(this.options, options);
    }

    close() {
        this.onClose.emit();
    }

    loadConfig(config: any) {
        if (config.component) {
            this.loadComponent(config.component);
        }
        if (config.style) {
            this.setStyle(config.style);
        }
        if (config.styles) {
            this.setStyles(config.styles);
        }
    }

    loadComponent(token: any) {
        const component = this.injector.get(token);
        const factory = this.componentFactory.resolveComponentFactory(component);
        const c = factory.create(this.viewContainerRef.injector);
        c.instance['data'] = this.options.data;
        if (c.instance['callback']) {
            c.instance['callback'].pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value: any) => this.callback(value));
        }
        if (c.instance['close']) {
            c.instance['close'].pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => this.close());
        }
        this.viewContainerRef.insert(c.hostView);
    }

    setStyle(style: string) {
        this.style = style;
    }

    setStyles(styles: Array<string>) {
        this.styles = styles;
    }

    getStyles() {
        return this.styles.map((style: string) => `modal2--${style}`).join(' ');
    }

    callback(value: any) {
        this.options.callback(this, value);
    }

    ctaCallback(cta) {
        if (cta.callback) {
            cta.callback(this, this.options.data);
        } else {
            this.callback(this.options.data.value);
        }
    }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
