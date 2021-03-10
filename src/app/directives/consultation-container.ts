import { Directive, ElementRef, OnInit, DoCheck, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appConsultationContainer]'
})
export class ConsultationContainerDirective implements OnInit, DoCheck {

    constructor(private el: ElementRef, private render: Renderer2) { }

    ngOnInit() {

    }

    ngDoCheck() {

        let consultationMessages = this.el.nativeElement.children.namedItem('consultationMessages');
        let lastMessage = consultationMessages.lastElementChild;

        if (lastMessage) {
            this.render.setStyle(consultationMessages, 'transform', 'translateY(' + ((0 - lastMessage.offsetTop) + 65) + 'px)');
        }

        // let consultationMessages = this.el.nativeElement.children.namedItem('consultationMessages');
        // let consultationResponses = this.el.nativeElement.children.namedItem('consultationResponses');
        //
        // if ((consultationMessages.scrollHeight + consultationResponses.scrollHeight) > this.el.nativeElement.scrollHeight) {
        //     const offset = (0 - consultationMessages.scrollHeight) + consultationResponses.scrollHeight;
        //     this.render.setStyle(consultationMessages, 'transform', 'translateY(' + offset + 'px)');
        // }
    }

}
