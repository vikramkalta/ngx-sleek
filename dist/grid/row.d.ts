import { IterableDiffer, IterableDiffers, TemplateRef, SimpleChanges, OnChanges, IterableChanges, ViewContainerRef, Renderer2, ElementRef, OnInit } from '@angular/core';
import { SlkColumnDefDirective, SlkCellDef } from './cell';
import { DirectiveService } from './directive-service';
/**
 * The row template that can be used by the slk-table.
 */
export declare const SLK_ROW_TEMPLATE = "<ng-container slkCellOutlet></ng-container>";
/**
 * Base class for the SlkHeaderRowDef and SlkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 */
export declare abstract class BaseRowDef implements OnChanges {
    template: TemplateRef<any>;
    protected _differs: IterableDiffers;
    /** The columns to be displayed on this row. */
    columns: Iterable<string>;
    /** Differ used to check if any changes were made to the columns. */
    protected _columnsDiffer: IterableDiffer<any>;
    constructor(template: TemplateRef<any>, _differs: IterableDiffers);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Returns the difference between the current columns and the columns from the last diff, or ull
     * if there is no difference.
     */
    getColumnsDiff(): IterableChanges<any> | null;
    /** Gets this row def's relevant cell template from the provided column def. */
    extractCellTemplate(column: SlkColumnDefDirective): TemplateRef<any>;
}
export declare class SlkHeaderRowDefBase extends BaseRowDef {
}
/**
 * Header row definition for the slk table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
export declare class SlkHeaderRowDefDirective extends SlkHeaderRowDefBase implements OnChanges, OnInit {
    private directiveService;
    slkHeaderRowDef: any;
    columns: any;
    constructor(template: TemplateRef<any>, _differs: IterableDiffers, directiveService: DirectiveService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
export declare class SlkFooterRowDefBase extends BaseRowDef {
}
/**
 * Footer row definition for the CDK table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
export declare class SlkFooterRowDefDirective extends BaseRowDef implements OnChanges {
    constructor(template: TemplateRef<any>, _differs: IterableDiffers);
    ngOnChanges(changes: SimpleChanges): void;
}
/**
 * Data row definition for the slk table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
export declare class SlkRowDefDirective<T> extends BaseRowDef implements OnChanges {
    slkRowDefColumns: any;
    columns: any;
    /**
     * Function that should return true if this row template should be used for the provided index
     * and row data. If left undefined, this row will be considered the default row template to use
     * when no other when functions return true for the data.
     * For every row, there must be at least one when function that passes or undedined to default.
     */
    when: (index: number, rowDatA: T) => boolean;
    constructor(template: TemplateRef<any>, _differs: IterableDiffers);
    ngOnChanges(changes: SimpleChanges): void;
}
/** Context provided to the row cells */
export interface SlkCellOutletRowContext<T> {
    /** Data for the row that this cell is located within. */
    $implicit?: T;
    /** Index of the data object in the provided data array. */
    index?: number;
    /** Length of the number of total rows. */
    count?: number;
    /** True if this cell is contained in the first row. */
    first?: boolean;
    /** True if this cell is contained in the last row. */
    last?: boolean;
    /** true if this is containeed in a row with even-numbered index. */
    even?: boolean;
    /** True if this cell is contained in a row with an odd-numbered index. */
    odd?: boolean;
}
/**
 * Outlet for rendering cells inside of a row or header row.
 */
export declare class SlkCellOutletDirective {
    _viewContainer: ViewContainerRef;
    /**
     * Static property containing the latest constructed instance of this class.
     * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
     * createEmbeddedView. After one of these components are created, this property will provide
     * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
     * construct the cells with the provided context.
     */
    static mostRecentCellOutlet: SlkCellOutletDirective | null;
    /** The ordered list of cells to render within this outlet's view container */
    cells: SlkCellDef[];
    /** the data context to be provided to each cell. */
    context: any;
    constructor(_viewContainer: ViewContainerRef);
}
/** Header template container that container the cell outlet. */
export declare class SlkHeaderRowComponent {
    private renderer;
    constructor(renderer: Renderer2, elementRef: ElementRef);
}
/** Footer template container that contains the cell outlet. */
export declare class SlkFooterRowComponent {
}
/** Data row template container that contains cell outlet. */
export declare class SlkRowComponent {
    private renderer;
    constructor(renderer: Renderer2, elementRef: ElementRef);
}
