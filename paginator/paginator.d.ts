import { OnInit, OnDestroy, EventEmitter, ChangeDetectorRef, TemplateRef, AfterContentInit, IterableDiffers, EmbeddedViewRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SlkNavDirective } from './page-nav';
import { ActionsService } from '../tree/tree-service';
/** Reference code */
export declare const PAGINATOR_CHILD_TEMPLATE = "<ng-container slkNavigator></ng-container>";
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export declare class PageEvent {
    /** Current page index. */
    pageIndex: number;
    /** The current page size. */
    pageSize: number;
    /** The current total number of items being paged. */
    length: number;
}
export declare class PaginatorContext<T> {
    $implicit: T;
    constructor(data: T);
}
export declare const viewContainerRef = "view-container-ref";
/** TODO:- Put Comments After every line */
export declare class SlkPaginatorChildComponent implements OnInit, AfterContentInit {
    private _differs;
    private cacheService;
    /** Total pages. */
    private _pages;
    /** Watches for the change. */
    private _dataDiffer;
    viewRefCollection: EmbeddedViewRef<any>[];
    /** Gets the 'length' from parent component. */
    length: number;
    private _length;
    /** Gets the 'pageSize' from parent component. */
    pageSize: number;
    private _pageSize;
    /** Queries 'SlkNavDirective' Gets the view container ref from 'SlkNavDirective'. */
    nav: SlkNavDirective;
    /** Queries whenever ContentChild changes. Read as TemplateRef. */
    pageBtnTemplate: TemplateRef<any>;
    constructor(_differs: IterableDiffers, cacheService: ActionsService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /** Inserts buttons as per total pages */
    private renderIndex();
    private _getAllIndexes(indices);
    private insertButtons(data);
}
export declare class SlkPaginatorComponent implements OnInit, OnDestroy {
    _changeDetectorRef: ChangeDetectorRef;
    cacheService: ActionsService;
    initialised: BehaviorSubject<boolean>;
    /** Notifies when the component is destroyed. */
    _onDestroy: Subject<boolean>;
    /** Gets the view ref collection. */
    collectedViewRef: EmbeddedViewRef<any>[];
    /** Index of the page to be displayed. */
    pageIndex: number;
    private _pageIndex;
    /** Length of total number of items that are being paginated. */
    length: number;
    private _length;
    /** Number of items to be displayed on a page. Set a default value. */
    pageSize: number;
    private _pageSize;
    /** The set of provided page size options to display to the user. */
    pageSizeOptions: number[];
    private _pageSizeOptions;
    /** Event emitted when page changes. */
    readonly page: EventEmitter<PageEvent>;
    /** Displayed set of page size options. */
    _displayedPageSizeOptions: number[];
    constructor(_changeDetectorRef: ChangeDetectorRef, cacheService: ActionsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onPaged(index: number, page?: string): void;
    /** Changes the context on reaching last index. */
    incrementButtonContext(): void;
    /** Changes the context on reaching previous index. */
    decrementButtonContext(page: string): void;
    _onPaged(): void;
    /**
     * Disables the page buttons as per selected index desired by the user.
     */
    changeContextOfButtons(pageInd: number): void;
    /** Disables the button at the start indices. */
    disableStartIndex(viewRef: EmbeddedViewRef<any>[]): void;
    /** Disables the button at the end indices. */
    disableEndIndex(viewRef: EmbeddedViewRef<any>[]): void;
    /** Enables all the button. */
    enableAll(viewRef: EmbeddedViewRef<any>[], pageInd: number): void;
}
