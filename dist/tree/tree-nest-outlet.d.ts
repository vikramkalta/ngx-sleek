import { ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
export declare class SlkTreeTextOutletDirective<T> {
    static mostRecentTreeTextOutlet: SlkTreeTextOutletDirective<{}> | null;
    data: T;
    protected _data: T;
    context: any;
    protected _context: any;
    constructor();
}
export declare class SlkTreeActionDirective {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    renderer: Renderer2;
    on: boolean;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef, renderer: Renderer2);
    onMouseOver(): void;
    onMouseOut(): void;
}
