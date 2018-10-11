import { ViewContainerRef, ElementRef, AfterContentChecked, OnDestroy, IterableDiffers, ChangeDetectorRef, OnInit, QueryList, TrackByFunction, Renderer2, EventEmitter } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { SlkRowDefDirective, SlkHeaderRowDefDirective, SlkFooterRowDefDirective } from './row';
import { SlkColumnDefDirective } from './cell';
/** Interface used to provide an outlet for rows to be inserted into. */
export interface RowOutlet {
    viewContainer: ViewContainerRef;
}
/** Provides a handle for the table to grab the view container's ng-container to insert data rows. */
export declare class DataRowOutletDirective implements RowOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
}
/** Provides a handle for the table to grab the view container's ng-container to insert the header */
export declare class HeaderRowOutletDirective implements RowOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
}
/** Provides a handle for the table to grab view container's ng-container to insert the footer. */
export declare class FooterRowOutletDirective implements RowOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
}
/**
 * The table template that can be used by slk-table
 */
export declare const SLK_TABLE_TEMPLATE = "\n    <ng-container slkHeaderRowOutlet></ng-container>\n    <ng-container slkRowOutlet></ng-container>\n    <ng-container slkFooterRowOutlet></ng-container>\n";
/**
 * Set of properties that represents the identity of a single rendered row.
 */
export interface RenderRow<T> {
    data: T;
    dataIndex: number;
    rowDef: SlkRowDefDirective<T>;
}
/**
 * A data table that can render a header row, data rows and a footer row.
 */
export declare class SlkTableComponent<T> implements AfterContentChecked, CollectionViewer, OnDestroy, OnInit {
    protected readonly _differs: IterableDiffers;
    protected readonly _changeDetectorRef: ChangeDetectorRef;
    protected readonly _elementRef: ElementRef;
    private renderer;
    /** Latest data provided by the data source. */
    protected _data: T[];
    copyOfData: T[];
    /** Subject that emits when the component has been destoryed. */
    private _onDestroy;
    /** List of the rendered rows as identified by their `RenderRow` object. */
    private _renderRows;
    /** Subscription that listens for the data provided by the data source. */
    private _renderChangeSubscription;
    /**
     * Map of all the user's defined columns (header, data, and footer cell template) identified by
     * name. Collection populated by the column definitions gathered by `ContentChildren` as well as
     * any custom column definitions added to `_customColumnDefs`.
     */
    private _columnDefsByName;
    /**
     * Set of all row definitions that can be used by this table. Populated by the rows gathered by
     * using `ContentChildren` as well as any custom row definitions added to `_customRowDefs`.
     */
    private _rowDefs;
    /**
     * Set of all header row definitions that can be used by this table. Populated by the rows
     * gathered by using 'ContentChildren' as well as any custom row defintions added to
     * '_customHeaderRowDefs'.
     */
    private _headerRowDefs;
    /**
     * Set of all footer row definitions that can be used by this table. Populated by the rows
     * gathered by using 'ContentChildren' as well as any custom row defintions added to
     * '_customFooterRowDefs'.
     */
    private _footerRowDefs;
    /** _Differ used to find the changes in the data provided by the data source. */
    private _dataDiffer;
    /** Stores the row definition that does not have a when predicate. */
    private _defaultRowDef;
    /**
     * Column definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has
     * column definitions as *it's* content child.
     */
    private _customColumnDefs;
    /**
     * Data row definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has
     * built-in data rows as *it's* content child.
     */
    private _customRowDefs;
    /**
     * Header row definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has
     * built-in header rows as *it's* content child.
     */
    private _customHeaderRowDefs;
    /**
     * Footer row definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has a
     * built-in footer row as *it's* content child.
     */
    private _customFooterRowDefs;
    /** Page Index. */
    pageIndex: number;
    /** Emits an event when scroll has reached the bottom. */
    scrollToBottom: EventEmitter<any>;
    /** Gets the total number of rows that has to be displayed. */
    length: number;
    private _length;
    /**
     * Tracking function that will be used to check the differences in data changes. Used similarly
     * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
     * relative to the function to know if a row should be added/removed/moved.
     * Accepts a function that takes two parameters, `index` and `item`.
     */
    trackBy: TrackByFunction<T>;
    private _trackByFn;
    /**
     * The table's source of data, which can be provided in three ways (in order of complexity):
     *   - Simple data array (each object represents one table row)
     *   - Stream that emits a data array each time the array changes
     *   - `DataSource` object that implements the connect/disconnect interface.
     *
     */
    dataSource: DataSource<T> | Observable<T[]> | T[];
    private _dataSource;
    /**
     * Stream containing the latest information on what rows are being displayed on screen.
     * Can be used by the data source to as heuristic of what data should be provided.
     */
    viewChange: BehaviorSubject<{
        start: number;
        end: number;
    }>;
    _rowOutlet: DataRowOutletDirective;
    _headerRowOutlet: HeaderRowOutletDirective;
    _footerRowOutlet: FooterRowOutletDirective;
    /**
     * The column definitions provided by the user that contain what the header, data, and footer
     * cells should render for each column.
     */
    _contentColumnDefs: QueryList<SlkColumnDefDirective>;
    /** Set of data row definitions that were provided to the table as content children. */
    _contentRowDefs: QueryList<SlkRowDefDirective<T>>;
    /** Set of header row definitions that were provided to the table as content children. */
    _contentHeaderRowDefs: QueryList<SlkHeaderRowDefDirective>;
    /** Set of footer row definitions that were provided to the table as content children. */
    _contentFooterRowDefs: QueryList<SlkFooterRowDefDirective>;
    /** Set class for the host element */
    class: string;
    constructor(_differs: IterableDiffers, _changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Render rows based on the table's latest set of data which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary changes
     */
    renderRows(): void;
    private _getAllRenderRows();
    /**
     * Gets a list of 'RenderRow<T>' for the provided data object and any 'CdkRowDef' objects that
     * should be rendered for this data. Reuses the cached RenderRow objecst if they match the same
     * (T, SlkRowDef) pair.
     */
    private _getRenderRowsForData(data, dataIndex);
    /** Update the map containing the content's column definitions. */
    private _cacheColumnDefs();
    /** Update the list of all available row definitions that can be used. */
    private _cacheRowDefs();
    /**
     * Check if the header, data, or footer rows have changed what columns they want to display or
     * whether the sticky states have changed for the header or footer. If there is a diff, then
     * re-render that section.
     */
    private _renderUpdatedColumns();
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row outlet. Otherwise start listening for new data.
     */
    private _switchDataSource(dataSource);
    /** Sets up a subscription for the data provided by the data source. */
    private _observeRenderChanges();
    /**
     * Clears any existing content in the header row outlet and creates a new embedded view
     * in the outlet using the header row definition.
     */
    private _forceRenderHeaderRows();
    /**
     * Clears any existing content in the footer row outlet and creates a new embedded view
     * in the outlet using the footer row definition.
     */
    private _forceRenderFooterRows();
    /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row defintion, it is returned. otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none reutrn true, retun thedefault row
     * definition
     */
    _getRowDefs(data: T, dataIndex: number): SlkRowDefDirective<T>[];
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     */
    private _insertRow(renderRow, renderIndex);
    /**
     * Creates a new row template in the outlet and fills it with the set of cell templates.
     * Optionally takes a context to provide to the row and cells, as well as an optional index
     * of where to place the new row template in the outlet
     */
    private _renderRow(outlet, rowDef, index, context?);
    /** Gets the column definitions for the provided row def. */
    private _getCellTemplates(rowDef);
    /**
     * Adds native table sections (e.g tbody) and moves the router outlets into them.
     */
    _applyNativeTableSections(): void;
    /**
     * TODO: Move this to a new scroll module later.
     * Adds a scroll event on the grid.
     */
    _addScrollEvent(): void;
    onScroll(event: any): void;
    /**
     * Forces a re-render of the data rows. Should be called in cases where there has been an input
     * change that affects the evaluation of which should be rendered adding/removing row definitions
     */
    private _forceRenderDataRows();
}
