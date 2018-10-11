import { OnInit, OnDestroy, ViewContainerRef, ElementRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SlkGridFilterDirective } from './filter';
import { SlkColumnDefDirective, SlkTableComponent } from '../grid';
import { DomService } from './grid-filter-service';
import { SlkGridPopupComponent } from '../grid-popup';
import { ActionsService } from '../tree/tree-service';
export declare const actualData = "actual-data";
/** The max height of the filter's overlay panel */
export declare const FILTER_PANEL_MAX_HEIGHT = 256;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export declare const FILTER_PANEL_VIEWPORT_PADDING = 8;
export declare class SlkGridFilterComponent<T> implements OnInit, OnDestroy {
    _filter: SlkGridFilterDirective;
    _slkColumnDef: SlkColumnDefDirective;
    viewContainerRef: ViewContainerRef;
    private _elementRef;
    private domService;
    private _grid;
    protected cacheService: ActionsService;
    /** When this component is initialised. */
    initialised: BehaviorSubject<boolean>;
    /** Destroy. */
    _onDestroy: Subject<any>;
    _popup: SlkGridPopupComponent<T>;
    private initialData;
    /** Gets the metadata if provided by the user.
     * Has to Follow a format,
     * TODO:- Get the format final
     */
    metadata: any[];
    key: string | number;
    /** ID of the filter-header. When used with slkColumndef, will default to column's name. */
    id: string;
    onFilterChange(): void;
    constructor(_filter: SlkGridFilterDirective, _slkColumnDef: SlkColumnDefDirective, viewContainerRef: ViewContainerRef, _elementRef: ElementRef, domService: DomService, _grid: SlkTableComponent<any>, cacheService: ActionsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Opens the popup filter. */
    private openPopup(uniqueOptions);
    /** Subscribes to the on closed behavior. */
    _filterClose(): void;
    /** Gets the selected values in the unique filter drop down. */
    _getSelectedValues(): void;
    /**  Filters the unique values in the column. */
    _filterUniqueValues(columnId: string, data: T[]): T[];
    /** Removes duplicates. */
    _removeDuplicates(uniqueValuesInTheColumn: any[]): any[];
    _options(uniqueValues: any[]): {
        name: any;
        checked: boolean;
    }[];
}
