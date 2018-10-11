import { Injector, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { SlkGridFilterRef } from './grid-filter-ref';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class DomService {
    private injector;
    private overlay;
    onClose: BehaviorSubject<boolean>;
    onCloseBehavior: Observable<any>;
    constructor(injector: Injector, overlay: Overlay);
    open(elementRef: ElementRef, config?: any): SlkGridFilterRef;
    private createOverlay(config, elementRef);
    private attachDialogContainer(overlayRef, config, dialogRef);
    private createInjector(config, dialogRef);
    private getOverlayConfig(config, elementRef);
    _getPosition(elementRef: ElementRef): any;
}
