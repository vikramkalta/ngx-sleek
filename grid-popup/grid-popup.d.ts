import { OnInit, OnDestroy } from '@angular/core';
import { ActionsService } from '../tree';
export declare const selectedOptions = "selected-options";
export declare class SlkGridPopupComponent<T> implements OnInit, OnDestroy {
    data: any[];
    protected cacheService: ActionsService;
    protected collectedVal: T[];
    constructor(data: any[], cacheService: ActionsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onInputChange(value: any): void;
}
