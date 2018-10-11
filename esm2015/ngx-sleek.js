import { Injectable, IterableDiffers, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, ViewEncapsulation, Component, Directive, Input, Renderer2, ElementRef, ContentChild, ContentChildren, ChangeDetectorRef, ViewChild, isDevMode, HostBinding, Output, EventEmitter, NgModule, Optional, HostListener, Inject, InjectionToken, Injector } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of, Subscription, merge, combineLatest } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { DataSource as DataSource$1 } from '@angular/cdk/table';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DirectiveService {
    constructor() {
        this.totalColumns = new BehaviorSubject(0);
        this.totalColumnsAsObservable = this.totalColumns.asObservable();
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    setTotalColumns(columns) {
        this.totalColumns.next(columns.length);
    }
}
DirectiveService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The row template that can be used by the slk-table.
 */
const /** @type {?} */ SLK_ROW_TEMPLATE = `<ng-container slkCellOutlet></ng-container>`;
/**
 * Base class for the SlkHeaderRowDef and SlkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
class BaseRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    constructor(template, _differs) {
        this.template = template;
        this._differs = _differs;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // console.log('this.columns from row', this.columns);
        // create a new columns differ if one does not yet exist. Initialize it based on initial value
        // of the columns property or an empty array if none is provided.
        if (!this._columnsDiffer) {
            const /** @type {?} */ columns = (changes['columns'] && changes['columns'].currentValue) || [];
            // console.log('columns from row', columns);
            this._columnsDiffer = this._differs.find(columns).create();
            this._columnsDiffer.diff(columns);
        }
    }
    /**
     * Returns the difference between the current columns and the columns from the last diff, or ull
     * if there is no difference.
     * @return {?}
     */
    getColumnsDiff() {
        return this._columnsDiffer.diff(this.columns);
    }
    /**
     * Gets this row def's relevant cell template from the provided column def.
     * @param {?} column
     * @return {?}
     */
    extractCellTemplate(column) {
        // console.log('column from row', column, this instanceof SlkHeaderRowDefDirective);
        return extractCellTemp(this, column);
    }
}
class SlkHeaderRowDefBase extends BaseRowDef {
}
/**
 * Header row definition for the slk table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
class SlkHeaderRowDefDirective extends SlkHeaderRowDefBase {
    /**
     * @param {?} template
     * @param {?} _differs
     * @param {?} directiveService
     */
    constructor(template, _differs, directiveService) {
        super(template, _differs);
        this.directiveService = directiveService;
        // console.log('appHeaderRowDef', this.appHeaderRowDef);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        this.columns = this.slkHeaderRowDef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.directiveService.setTotalColumns(this.columns);
    }
}
SlkHeaderRowDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkHeaderRowDef]',
            },] },
];
/** @nocollapse */
SlkHeaderRowDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
    { type: DirectiveService, },
];
SlkHeaderRowDefDirective.propDecorators = {
    "slkHeaderRowDef": [{ type: Input, args: ['slkHeaderRowDef',] },],
    "columns": [{ type: Input },],
};
class SlkFooterRowDefBase extends BaseRowDef {
}
/**
 * Footer row definition for the CDK table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
class SlkFooterRowDefDirective extends BaseRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    constructor(template, _differs) {
        super(template, _differs);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
    }
}
SlkFooterRowDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkFooterRowDef]'
            },] },
];
/** @nocollapse */
SlkFooterRowDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
];
/**
 * @param {?} that
 * @param {?} column
 * @return {?}
 */
function extractCellTemp(that, column) {
    if (that instanceof SlkHeaderRowDefDirective) {
        return column.headerCell.template;
    }
    if (that instanceof SlkFooterRowDefDirective) {
        return column.footerCell.template;
    }
    else {
        return column.cell.template;
    }
}
/**
 * Data row definition for the slk table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 * @template T
 */
class SlkRowDefDirective extends BaseRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     */
    constructor(template, _differs) {
        super(template, _differs);
        // console.log('appRowDefColumns', this.appRowDef);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        this.columns = this.slkRowDefColumns;
        // console.log('appRowDefColumns1', this.appRowDef);
    }
}
SlkRowDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkRowDef]'
            },] },
];
/** @nocollapse */
SlkRowDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
];
SlkRowDefDirective.propDecorators = {
    "slkRowDefColumns": [{ type: Input, args: ['slkRowDefColumns',] },],
    "columns": [{ type: Input },],
};
/**
 * Outlet for rendering cells inside of a row or header row.
 */
class SlkCellOutletDirective {
    /**
     * @param {?} _viewContainer
     */
    constructor(_viewContainer) {
        this._viewContainer = _viewContainer;
        // console.log('this this', this);
        SlkCellOutletDirective.mostRecentCellOutlet = this;
    }
}
/**
 * Static property containing the latest constructed instance of this class.
 * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
 * createEmbeddedView. After one of these components are created, this property will provide
 * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
 * construct the cells with the provided context.
 */
SlkCellOutletDirective.mostRecentCellOutlet = null;
SlkCellOutletDirective.decorators = [
    { type: Directive, args: [{ selector: '[slkCellOutlet]' },] },
];
/** @nocollapse */
SlkCellOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];
/**
 * Header template container that container the cell outlet.
 */
class SlkHeaderRowComponent {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, 'header-row');
    }
}
SlkHeaderRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-header-row, tr[slk-header-row]',
                template: SLK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}
    `]
            },] },
];
/** @nocollapse */
SlkHeaderRowComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
/**
 * Footer template container that contains the cell outlet.
 */
class SlkFooterRowComponent {
}
SlkFooterRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-footer-row, tr[slk-footer-row]',
                template: SLK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}
    `]
            },] },
];
/**
 * Data row template container that contains cell outlet.
 */
class SlkRowComponent {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, 'header-row');
    }
}
SlkRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-row, tr[slk-row]',
                template: SLK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}
    `]
            },] },
];
/** @nocollapse */
SlkRowComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Cell definition for a Slk Table.
 */
class SlkCellDefDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
SlkCellDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[slkCellDef]' },] },
];
/** @nocollapse */
SlkCellDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
];
/**
 * Header cell defintion for a Slk table.
 */
class SlkHeaderCellDefDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
SlkHeaderCellDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[slkHeaderCellDef]' },] },
];
/** @nocollapse */
SlkHeaderCellDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
];
/**
 * Footer cell defintion for a Slk table.
 */
class SlkFooterCellDefDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
SlkFooterCellDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[slkFooterCellDef]' },] },
];
/** @nocollapse */
SlkFooterCellDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
];
class SlkColumnDefBase {
}
/**
 * Column definition for the Slk table.
 */
class SlkColumnDefDirective extends SlkColumnDefBase {
    /**
     * Unique name for this column.
     * @return {?}
     */
    get name() { return this._name; }
    /**
     * @param {?} name
     * @return {?}
     */
    set name(name) {
        // If the directive is set without a name (updated programatically), then this setter will
        if (!name) {
            return;
        }
        this._name = name;
        this.cssClassFriendlyName = name;
    }
}
SlkColumnDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkColumnDef]'
            },] },
];
/** @nocollapse */
SlkColumnDefDirective.propDecorators = {
    "name": [{ type: Input, args: ['slkColumnDef',] },],
    "cell": [{ type: ContentChild, args: [SlkCellDefDirective,] },],
    "headerCell": [{ type: ContentChild, args: [SlkHeaderCellDefDirective,] },],
    "footerCell": [{ type: ContentChild, args: [SlkFooterCellDefDirective,] },],
};
/**
 * Base class for the cells. Adds a CSS classname that identifies the column it renders in.
 */
class BaseSlkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     */
    constructor(columnDef, elementRef) {
        const /** @type {?} */ columnClassName = `slk-column-${columnDef.cssClassFriendlyName}`;
        elementRef.nativeElement.classList.add(columnClassName);
    }
}
/**
 * Header cell template container.
 */
class SlkHeaderCellDirective extends BaseSlkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} directiveService
     * @param {?} renderer
     */
    constructor(columnDef, elementRef, directiveService, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.directiveService = directiveService;
        this.renderer = renderer;
        this.destroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.directiveService.totalColumnsAsObservable
            .pipe(takeUntil(this.destroy))
            .subscribe((cols) => {
            const /** @type {?} */ totalColumns = 100 / cols;
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${totalColumns}%`);
            this.destroy.next(true);
        });
    }
}
SlkHeaderCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'slkHeaderCell, th[slkHeaderCell]'
            },] },
];
/** @nocollapse */
SlkHeaderCellDirective.ctorParameters = () => [
    { type: SlkColumnDefDirective, },
    { type: ElementRef, },
    { type: DirectiveService, },
    { type: Renderer2, },
];
/**
 * Footer cell template container
 */
class SlkFooterCellDirective extends BaseSlkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     */
    constructor(columnDef, elementRef) {
        super(columnDef, elementRef);
    }
}
SlkFooterCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'slkFooterCell, th[slkFooterCell]'
            },] },
];
/** @nocollapse */
SlkFooterCellDirective.ctorParameters = () => [
    { type: SlkColumnDefDirective, },
    { type: ElementRef, },
];
/**
 * Cell template container
 */
class SlkCellDirective extends BaseSlkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} directiveService
     * @param {?} renderer
     */
    constructor(columnDef, elementRef, directiveService, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.directiveService = directiveService;
        this.renderer = renderer;
        this.destroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.directiveService.totalColumnsAsObservable
            .pipe(takeUntil(this.destroy))
            .subscribe((cols) => {
            const /** @type {?} */ totalColumns = 100 / cols;
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${totalColumns}%`);
            this.destroy.next(true);
        });
    }
}
SlkCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'slkCell, td[slkCell]'
            },] },
];
/** @nocollapse */
SlkCellDirective.ctorParameters = () => [
    { type: SlkColumnDefDirective, },
    { type: ElementRef, },
    { type: DirectiveService, },
    { type: Renderer2, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 */
class DataRowOutletDirective {
    /**
     * @param {?} viewContainer
     * @param {?} elementRef
     */
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
DataRowOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkRowOutlet]'
            },] },
];
/** @nocollapse */
DataRowOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ElementRef, },
];
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header
 */
class HeaderRowOutletDirective {
    /**
     * @param {?} viewContainer
     * @param {?} elementRef
     */
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
HeaderRowOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkHeaderRowOutlet]'
            },] },
];
/** @nocollapse */
HeaderRowOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ElementRef, },
];
/**
 * Provides a handle for the table to grab view container's ng-container to insert the footer.
 */
class FooterRowOutletDirective {
    /**
     * @param {?} viewContainer
     * @param {?} elementRef
     */
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
FooterRowOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkFooterRowOutlet]'
            },] },
];
/** @nocollapse */
FooterRowOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ElementRef, },
];
/**
 * The table template that can be used by slk-table
 */
const /** @type {?} */ SLK_TABLE_TEMPLATE = `
    <ng-container slkHeaderRowOutlet></ng-container>
    <ng-container slkRowOutlet></ng-container>
    <ng-container slkFooterRowOutlet></ng-container>
`;
/**
 * A data table that can render a header row, data rows and a footer row.
 * @template T
 */
class SlkTableComponent {
    /**
     * @param {?} _differs
     * @param {?} _changeDetectorRef
     * @param {?} _elementRef
     * @param {?} renderer
     */
    constructor(_differs, _changeDetectorRef, _elementRef, renderer) {
        // this.renderer.setStyle(_elementRef.nativeElement, 'overflow', 'auto');
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this.renderer = renderer;
        /**
         * Subject that emits when the component has been destoryed.
         */
        this._onDestroy = new Subject();
        /**
         * Map of all the user's defined columns (header, data, and footer cell template) identified by
         * name. Collection populated by the column definitions gathered by `ContentChildren` as well as
         * any custom column definitions added to `_customColumnDefs`.
         */
        this._columnDefsByName = new Map();
        /**
         * Column definitions that were defined outside of the direct content children of the table.
         * These will be defined when, e.g., creating a wrapper around the cdkTable that has
         * column definitions as *it's* content child.
         */
        this._customColumnDefs = new Set();
        /**
         * Data row definitions that were defined outside of the direct content children of the table.
         * These will be defined when, e.g., creating a wrapper around the cdkTable that has
         * built-in data rows as *it's* content child.
         */
        this._customRowDefs = new Set();
        /**
         * Header row definitions that were defined outside of the direct content children of the table.
         * These will be defined when, e.g., creating a wrapper around the cdkTable that has
         * built-in header rows as *it's* content child.
         */
        this._customHeaderRowDefs = new Set();
        /**
         * Footer row definitions that were defined outside of the direct content children of the table.
         * These will be defined when, e.g., creating a wrapper around the cdkTable that has a
         * built-in footer row as *it's* content child.
         */
        this._customFooterRowDefs = new Set();
        /**
         * Page Index.
         */
        this.pageIndex = 1;
        /**
         * Emits an event when scroll has reached the bottom.
         */
        this.scrollToBottom = new EventEmitter();
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        /**
         * Set class for the host element
         */
        this.class = 'table-slk-grid';
    }
    /**
     * Gets the total number of rows that has to be displayed.
     * @return {?}
     */
    get length() { return this._length; }
    /**
     * @param {?} value
     * @return {?}
     */
    set length(value) {
        this._length = value;
    }
    /**
     * Tracking function that will be used to check the differences in data changes. Used similarly
     * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
     * relative to the function to know if a row should be added/removed/moved.
     * Accepts a function that takes two parameters, `index` and `item`.
     * @return {?}
     */
    get trackBy() { return this._trackByFn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    set trackBy(fn) {
        if (isDevMode() &&
            fn != null && typeof fn !== 'function' && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
            console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._trackByFn = fn;
    }
    /**
     * The table's source of data, which can be provided in three ways (in order of complexity):
     *   - Simple data array (each object represents one table row)
     *   - Stream that emits a data array each time the array changes
     *   - `DataSource` object that implements the connect/disconnect interface.
     *
     * @return {?}
     */
    get dataSource() { return this._dataSource; }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this._switchDataSource(dataSource);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._elementRef.nativeElement.nodeName === 'TABLE') {
            this._applyNativeTableSections();
        }
        // Set up the trackBy function so that it uses the `RenderRow` as its identity by default. If
        // the user has provided a custom trackBy, return the result of that function as evaluated
        // with the values of the `RenderRow`'s data and index.
        this._dataDiffer = this._differs.find([]).create((_i, dataRow) => {
            // console.log('_i', _i, dataRow);
            return this.trackBy ? this.trackBy(dataRow.dataIndex, dataRow.data) : dataRow;
        });
        // console.log('data differ', this._dataDiffer);
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // Cache the row and column definitions gathered by ContentChildren and programmatic injection.
        this._cacheRowDefs();
        this._cacheColumnDefs();
        // Render updates if the list of columns have been changed for the header, row, or footer defs.
        this._renderUpdatedColumns();
        if (this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription) {
            this._observeRenderChanges();
        }
        // add a class to give styling to the host element
        this.renderer.addClass(this._elementRef.nativeElement, 'slk-grid');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._rowOutlet.viewContainer.clear();
        this._headerRowOutlet.viewContainer.clear();
        this._footerRowOutlet.viewContainer.clear();
        // this._cachedRenderRowsMap.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource instanceof DataSource) {
            this.dataSource.disconnect(this);
        }
    }
    /**
     * Render rows based on the table's latest set of data which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary changes
     * @return {?}
     */
    renderRows() {
        this._renderRows = this._getAllRenderRows();
        // console.log('renderRows', this._renderRows);
        // console.log('this._dataDiffer', this._dataDiffer);
        const /** @type {?} */ changes = this._dataDiffer.diff(this._renderRows);
        // console.log('changes', changes);
        if (!changes) {
            return;
        }
        const /** @type {?} */ viewContainer = this._rowOutlet.viewContainer;
        changes.forEachOperation((record, prevIndex, currentIndex) => {
            // console.log('record', record, prevIndex, currentIndex);
            if (record.previousIndex === null) {
                this._insertRow(record.item, currentIndex);
            }
            else if (currentIndex === null) {
                viewContainer.remove(prevIndex);
            }
            else {
                const /** @type {?} */ view = /** @type {?} */ (viewContainer.get(prevIndex));
                viewContainer.move(view, currentIndex);
            }
            if (currentIndex === this._data.length - 1) {
                this._addScrollEvent();
            }
        });
    }
    /**
     * @return {?}
     */
    _getAllRenderRows() {
        const /** @type {?} */ renderRows = [];
        // console.log('this_Data', this._data);
        // for each data object, get the list of rows that should be rendered, represented by the
        // respective 'RenderRow' object which is the pair of data and slkrowDef
        for (let /** @type {?} */ i = 0; i < this._data.length; i++) {
            // console.log('this._data i', i);
            const /** @type {?} */ data = this._data[i];
            const /** @type {?} */ renderRowsForData = this._getRenderRowsForData(data, i);
            // console.log('render rows for data', renderRowsForData);
            for (let /** @type {?} */ j = 0; j < renderRowsForData.length; j++) {
                const /** @type {?} */ renderRow = renderRowsForData[j];
                // console.log('j', j, renderRow);
                renderRows.push(renderRow);
            }
        }
        return renderRows;
    }
    /**
     * Gets a list of 'RenderRow<T>' for the provided data object and any 'CdkRowDef' objects that
     * should be rendered for this data. Reuses the cached RenderRow objecst if they match the same
     * (T, SlkRowDef) pair.
     * @param {?} data
     * @param {?} dataIndex
     * @return {?}
     */
    _getRenderRowsForData(data, dataIndex) {
        const /** @type {?} */ rowDefs = this._getRowDefs(data, dataIndex);
        return rowDefs.map((rowDef) => {
            return { data, rowDef, dataIndex };
        });
    }
    /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    _cacheColumnDefs() {
        this._columnDefsByName.clear();
        const /** @type {?} */ columnDefs = mergeQueryListAndSet(this._contentColumnDefs, this._customColumnDefs);
        columnDefs.forEach(columnDef => {
            // if (this._columnDefsByName.has(columnDef.name)) {
            //     throw getTableDuplicateColumnNameError(columnDef.name);
            // }
            this._columnDefsByName.set(columnDef.name, columnDef);
        });
    }
    /**
     * Update the list of all available row definitions that can be used.
     * @return {?}
     */
    _cacheRowDefs() {
        this._headerRowDefs =
            mergeQueryListAndSet(this._contentHeaderRowDefs, this._customHeaderRowDefs);
        this._footerRowDefs =
            mergeQueryListAndSet(this._contentFooterRowDefs, this._customFooterRowDefs);
        this._rowDefs =
            mergeQueryListAndSet(this._contentRowDefs, this._customRowDefs);
        // After all row definitions are determined, find the row definition to be considered default.
        const /** @type {?} */ defaultRowDefs = this._rowDefs.filter(def => !def.when);
        // if (defaultRowDefs.length > 1) {
        //     throw getTableMultipleDefaultRowDefsError();
        // }
        this._defaultRowDef = defaultRowDefs[0];
    }
    /**
     * Check if the header, data, or footer rows have changed what columns they want to display or
     * whether the sticky states have changed for the header or footer. If there is a diff, then
     * re-render that section.
     * @return {?}
     */
    _renderUpdatedColumns() {
        const /** @type {?} */ columnsDiffReducer = (acc, def) => acc || !!def.getColumnsDiff();
        // console.log('this.-rowDefs', this._rowDefs);
        // Force re-render data rows if the list of column definitions have changed.
        if (this._rowDefs.reduce(columnsDiffReducer, false)) {
            this._forceRenderDataRows();
        }
        // Force re-render header/footer rows if the list of column definitions have changed..
        if (this._headerRowDefs.reduce(columnsDiffReducer, false)) {
            this._forceRenderHeaderRows();
        }
        if (this._footerRowDefs.reduce(columnsDiffReducer, false)) {
            this._forceRenderFooterRows();
        }
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row outlet. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    _switchDataSource(dataSource) {
        this._data = [];
        if (this.dataSource instanceof DataSource) {
            this.dataSource.disconnect(this);
        }
        // Stop listening for data from the previous data source.
        if (this._renderChangeSubscription) {
            this._renderChangeSubscription.unsubscribe();
            this._renderChangeSubscription = null;
        }
        if (!dataSource) {
            if (this._dataDiffer) {
                this._dataDiffer.diff([]);
            }
            this._rowOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
    }
    /**
     * Sets up a subscription for the data provided by the data source.
     * @return {?}
     */
    _observeRenderChanges() {
        // If no data source has been set, there is nothing to observe for changes.
        if (!this.dataSource) {
            return;
        }
        let /** @type {?} */ dataStream;
        // Check if the datasource is a DataSource object by observing if it has a connect function.
        // Cannot check this.dataSource['connect'] due to potential property renaming, nor can it
        // checked as an instanceof DataSource<T> since the table should allow for data sources
        // that did not explicitly extend DataSource<T>.
        if ((/** @type {?} */ (this.dataSource)).connect instanceof Function) {
            dataStream = (/** @type {?} */ (this.dataSource)).connect(this);
            // console.log('dataSteam', dataStream);
        }
        else if (this.dataSource instanceof Observable) {
            dataStream = this.dataSource;
            // console.log('dataStream1', dataStream);
        }
        else if (Array.isArray(this.dataSource)) {
            dataStream = of(this.dataSource);
            // console.log('dataStream2', dataStream);
        }
        // if (dataStream === undefined) {
        //     throw getTableUnknownDataSourceError();
        // }
        this._renderChangeSubscription = dataStream
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
            this._data = data || [];
            this.copyOfData = this._data.slice();
            this.renderRows();
        });
    }
    /**
     * Clears any existing content in the header row outlet and creates a new embedded view
     * in the outlet using the header row definition.
     * @return {?}
     */
    _forceRenderHeaderRows() {
        // Clear the header row outlet if any content exists.
        if (this._headerRowOutlet.viewContainer.length > 0) {
            this._headerRowOutlet.viewContainer.clear();
        }
        this._headerRowDefs.forEach((def, i) => this._renderRow(this._headerRowOutlet, def, i));
    }
    /**
     * Clears any existing content in the footer row outlet and creates a new embedded view
     * in the outlet using the footer row definition.
     * @return {?}
     */
    _forceRenderFooterRows() {
        // Clear the footer row outlet if any content exists.
        if (this._footerRowOutlet.viewContainer.length > 0) {
            this._footerRowOutlet.viewContainer.clear();
        }
        this._footerRowDefs.forEach((def, i) => this._renderRow(this._footerRowOutlet, def, i));
    }
    /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row defintion, it is returned. otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none reutrn true, retun thedefault row
     * definition
     * @param {?} data
     * @param {?} dataIndex
     * @return {?}
     */
    _getRowDefs(data, dataIndex) {
        if (this._rowDefs.length === 1) {
            return [this._rowDefs[0]];
        }
        const /** @type {?} */ rowDefs = [];
        const /** @type {?} */ rowDef = this._rowDefs.find(def => def.when && def.when(dataIndex, data)) || this._defaultRowDef;
        if (rowDef) {
            rowDefs.push(rowDef);
        }
        return rowDefs;
    }
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} renderRow
     * @param {?} renderIndex
     * @return {?}
     */
    _insertRow(renderRow, renderIndex) {
        // console.log('render row', renderRow);
        const /** @type {?} */ rowDef = renderRow.rowDef;
        const /** @type {?} */ context = { $implicit: renderRow.data };
        // console.log('context', context);
        this._renderRow(this._rowOutlet, rowDef, renderIndex, context);
    }
    /**
     * Creates a new row template in the outlet and fills it with the set of cell templates.
     * Optionally takes a context to provide to the row and cells, as well as an optional index
     * of where to place the new row template in the outlet
     * @param {?} outlet
     * @param {?} rowDef
     * @param {?} index
     * @param {?=} context
     * @return {?}
     */
    _renderRow(outlet, rowDef, index, context = {}) {
        // console.log('outlet', outlet, rowDef, index, context);
        outlet.viewContainer.createEmbeddedView(rowDef.template, context, index);
        for (let /** @type {?} */ _a = 0, /** @type {?} */ _b = this._getCellTemplates(rowDef); _a < _b.length; _a++) {
            const /** @type {?} */ cellTemplate = _b[_a];
            // console.log('cell template', SlkCellOutletDirective.mostRecentCellOutlet, cellTemplate);
            if (SlkCellOutletDirective.mostRecentCellOutlet) {
                // console.log('create embedded view');
                SlkCellOutletDirective.mostRecentCellOutlet._viewContainer.createEmbeddedView(cellTemplate, context);
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Gets the column definitions for the provided row def.
     * @param {?} rowDef
     * @return {?}
     */
    _getCellTemplates(rowDef) {
        // console.log('row def', rowDef);
        if (!rowDef || !rowDef.columns) {
            return [];
        }
        // console.log('!rowdef pass', rowDef.columns);
        return Array.from(rowDef.columns, columnId => {
            // console.log('columnId', columnId, this._columnDefsByName);
            const /** @type {?} */ column = this._columnDefsByName.get(columnId);
            // console.log('column', column);
            // if (!column) {
            //     throw getTableUnknownColumnError(columnId);
            // }
            return rowDef.extractCellTemplate(column);
        });
    }
    /**
     * Adds native table sections (e.g tbody) and moves the router outlets into them.
     * @return {?}
     */
    _applyNativeTableSections() {
        const /** @type {?} */ sections = [
            { tag: 'thead', outlet: this._headerRowOutlet },
            { tag: 'tbody', outlet: this._rowOutlet },
            { tag: 'tfoot', outlet: this._footerRowOutlet }
        ];
        for (let /** @type {?} */ _a = 0, /** @type {?} */ sections_1 = sections; _a < sections_1.length; _a++) {
            const /** @type {?} */ section = sections_1[_a];
            const /** @type {?} */ element = document.createElement(section.tag);
            element.appendChild(section.outlet.elementRef.nativeElement);
            this._elementRef.nativeElement.appendChild(element);
        }
    }
    /**
     * TODO: Move this to a new scroll module later.
     * Adds a scroll event on the grid.
     * @return {?}
     */
    _addScrollEvent() {
        const /** @type {?} */ tbody = document.getElementsByTagName('tbody');
        tbody[0].addEventListener('scroll', (event) => {
            // Avoids scroll event to get fired twice.
            event.stopImmediatePropagation();
            this.onScroll(event);
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        const /** @type {?} */ tbodyViewHeight = event.target.offsetHeight;
        const /** @type {?} */ tbodyScrollHeight = event.target.scrollHeight;
        const /** @type {?} */ scrollLocation = event.target.scrollTop;
        // If the user has scrolled to the bottom, send signal via output binding.
        const /** @type {?} */ limit = tbodyScrollHeight - tbodyViewHeight;
        // get total pages.
        const /** @type {?} */ totalPages = this.length / this._data.length;
        if (scrollLocation === limit) {
            this.pageIndex++;
            if (totalPages >= this.pageIndex) {
                this.scrollToBottom.emit({
                    pageIndex: this.pageIndex,
                    totalRows: this._length
                });
            }
            else {
                return;
            }
        }
    }
    /**
     * Forces a re-render of the data rows. Should be called in cases where there has been an input
     * change that affects the evaluation of which should be rendered adding/removing row definitions
     * @return {?}
     */
    _forceRenderDataRows() {
        this._dataDiffer.diff([]);
        this._rowOutlet.viewContainer.clear();
        this.renderRows();
    }
}
SlkTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-table, table[slk-table]',
                exportAs: 'slkTable',
                template: SLK_TABLE_TEMPLATE,
                styles: [`
      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SlkTableComponent.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
    { type: ElementRef, },
    { type: Renderer2, },
];
SlkTableComponent.propDecorators = {
    "scrollToBottom": [{ type: Output, args: ['scrollToBottom',] },],
    "length": [{ type: Input },],
    "trackBy": [{ type: Input },],
    "dataSource": [{ type: Input },],
    "_rowOutlet": [{ type: ViewChild, args: [DataRowOutletDirective,] },],
    "_headerRowOutlet": [{ type: ViewChild, args: [HeaderRowOutletDirective,] },],
    "_footerRowOutlet": [{ type: ViewChild, args: [FooterRowOutletDirective,] },],
    "_contentColumnDefs": [{ type: ContentChildren, args: [SlkColumnDefDirective,] },],
    "_contentRowDefs": [{ type: ContentChildren, args: [SlkRowDefDirective,] },],
    "_contentHeaderRowDefs": [{ type: ContentChildren, args: [SlkHeaderRowDefDirective,] },],
    "_contentFooterRowDefs": [{ type: ContentChildren, args: [SlkFooterRowDefDirective,] },],
    "class": [{ type: HostBinding, args: ['class',] },],
};
/**
 * Utility function that gets a merged list of the entries in a QueryList and values of a Set.
 * @template T
 * @param {?} queryList
 * @param {?} set
 * @return {?}
 */
function mergeQueryListAndSet(queryList, set) {
    // console.log('query list', queryList, set);
    return queryList.toArray().concat(Array.from(set));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ EXPORTED_DECLARATIONS = [
    SlkTableComponent,
    SlkRowDefDirective,
    SlkCellDefDirective,
    SlkCellOutletDirective,
    SlkHeaderCellDefDirective,
    SlkFooterCellDefDirective,
    SlkColumnDefDirective,
    SlkCellDirective,
    SlkRowComponent,
    SlkHeaderCellDirective,
    SlkFooterCellDirective,
    SlkHeaderRowComponent,
    SlkHeaderRowDefDirective,
    SlkFooterRowComponent,
    SlkFooterRowDefDirective,
    DataRowOutletDirective,
    HeaderRowOutletDirective,
    FooterRowOutletDirective,
];
class SlkGridModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: SlkGridModule
        };
    }
}
SlkGridModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: EXPORTED_DECLARATIONS,
                declarations: EXPORTED_DECLARATIONS,
                providers: [DirectiveService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ _finalDataSet = [];
/**
 * @param {?} dataSet
 * @param {?} left
 * @param {?} right
 * @return {?}
 */
function swap(dataSet, left, right) {
    // create a temporary reference to swap the object
    const /** @type {?} */ temp = dataSet[left];
    dataSet[left] = dataSet[right];
    dataSet[right] = temp;
}
/**
 * @param {?} dataSet
 * @param {?} column
 * @param {?} low
 * @param {?} high
 * @return {?}
 */
function quickSort(dataSet, column, low, high) {
    let /** @type {?} */ j;
    if (high > low) {
        j = partition(dataSet, column, low, high);
        if (low < j - 1) {
            quickSort(dataSet, column, low, j - 1);
        }
        if (j < high) {
            quickSort(dataSet, column, j, high);
        }
        _finalDataSet = dataSet;
    }
}
/**
 * @param {?} dataSet
 * @param {?} column
 * @param {?} low
 * @param {?} high
 * @return {?}
 */
function partition(dataSet, column, low, high) {
    const /** @type {?} */ pivot = dataSet[Math.floor((low + high) / 2)][column].split('')[0].toLowerCase();
    let /** @type {?} */ i = low, /** @type {?} */ j = high;
    while (i <= j) {
        while (dataSet[i][column].split('')[0].toLowerCase() < pivot) {
            i++;
        }
        while (dataSet[j][column].split('')[0].toLowerCase() > pivot) {
            j--;
        }
        if (i <= j) {
            swap(dataSet, i, j);
            i++;
            j--;
        }
    }
    return i;
}
/**
 * @param {?} dataSet
 * @param {?} column
 * @return {?}
 */
function shellSortAsc(dataSet, column) {
    const /** @type {?} */ length = dataSet.length;
    // calculating the gap
    let /** @type {?} */ gap = Math.floor(length / 2);
    // loop through the array till the gap is less than 0
    while (gap > 0) {
        // decoy
        let /** @type {?} */ j = 0;
        // start the looping at gap and end at length
        for (let /** @type {?} */ i = gap; i < length; i++) {
            // store current dataSet value in temp
            const /** @type {?} */ temp = dataSet[i];
            // j = i;
            let /** @type {?} */ currentStr;
            if (i - gap >= 0) {
                currentStr = dataSet[i - gap][column].split('')[0].toLowerCase();
            }
            else {
                // in comparison will always return false hence skip the loop
                currentStr = 0;
            }
            for (j = i; j >= gap && currentStr > temp[column].split('')[0].toLowerCase(); j -= gap) {
                dataSet[j] = dataSet[j - gap];
            }
            // if condition is not met then no change in array
            dataSet[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    // console.log('dataset', dataSet);
    return dataSet;
}
/**
 * @param {?} dataSet
 * @param {?} column
 * @return {?}
 */
function shellSortDesc(dataSet, column) {
    let /** @type {?} */ i, /** @type {?} */ temp, /** @type {?} */ flag = 1;
    const /** @type {?} */ numLength = dataSet.length;
    let /** @type {?} */ d = numLength;
    while (flag || (d > 1)) {
        // boolean flag (true when not equal to 0)
        flag = 0; // reset flag to 0 to check for future swaps
        d = Math.floor((d + 1) / 2);
        for (i = 0; i < (numLength - d); i++) {
            if (dataSet[i + d][column].split('')[0].toLowerCase() > dataSet[i][column].split('')[0].toLowerCase()) {
                temp = dataSet[i + d]; // swap positions i+d and i
                dataSet[i + d] = dataSet[i];
                dataSet[i] = temp;
                flag = 1; // tells swap has occurred
            }
        }
    }
    return dataSet;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class SlkGridDataSource extends DataSource$1 {
    /**
     * @param {?=} initialData
     */
    constructor(initialData = []) {
        super();
        /**
         * Stream emitting render data to the table (depends on ordered data changes).
         */
        this._renderData = new BehaviorSubject([]);
        /**
         * Subscription to the changes that should trigger an update to table's rendered row, such
         * as sorting, pagination or base data changes.
         */
        this._renderChangesSubscription = Subscription.EMPTY;
        /**
         * Gets a sorted copy of the data array based on the state of the SlkSortDirective.
         */
        this.sortData = (data, sort, initial) => {
            const /** @type {?} */ active = sort.active;
            const /** @type {?} */ direction = sort.direction;
            if (direction === '') {
                return data;
            }
            if (initial) {
                quickSort(data, active, 0, data.length - 1);
                data = _finalDataSet;
                return data;
            }
            switch (direction) {
                case 'asc':
                    return shellSortAsc(data, active);
                case 'desc':
                    return shellSortDesc(data, active);
                default: return data;
            }
        };
        this._data = new BehaviorSubject(initialData);
        this._updateChangeSubscription();
    }
    /**
     * Array of data that should be rendered by the table
     * @return {?}
     */
    get data() { return this._data.value; }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) { this._data.next(data); }
    /**
     * Instance of the SlkSortDirective used by the table to control its sort
     * @return {?}
     */
    get sort() { return this._sort; }
    /**
     * @param {?} sort
     * @return {?}
     */
    set sort(sort) {
        this._sort = sort;
        this._updateChangeSubscription();
    }
    /**
     * @return {?}
     */
    get paginator() { return this._paginator; }
    /**
     * @param {?} paginator
     * @return {?}
     */
    set paginator(paginator) {
        // console.log('paginator', paginator);
        this._paginator = paginator;
        this._updateChangeSubscription();
    }
    /**
     * @return {?}
     */
    get filter() { return this._filter; }
    /**
     * @param {?} filter
     * @return {?}
     */
    set filter(filter) {
        console.log('filter', filter);
        this._filter = filter;
        this._updateChangeSubscription();
    }
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows.
     * @return {?}
     */
    _updateChangeSubscription() {
        const /** @type {?} */ sortChange = this._sort ?
            merge(this._sort.slkSortChange, this._sort.initialised) :
            of(null);
        const /** @type {?} */ pageChange = this._paginator ?
            merge(this._paginator.page, this._paginator.initialised) :
            of(null);
        const /** @type {?} */ filterChange = this._filter ?
            merge(this._filter.slkFilterChange, this._filter.initialised) :
            of(null);
        const /** @type {?} */ dataStream = this._data;
        // Watch for sort changes to provide ordered data
        const /** @type {?} */ orderedData = combineLatest(dataStream, sortChange)
            .pipe(map(([data]) => this._orderData(data)));
        const /** @type {?} */ paginatedData = combineLatest(orderedData, pageChange)
            .pipe(map(([data]) => this._pageData(data)));
        const /** @type {?} */ filteredData = combineLatest(paginatedData, filterChange)
            .pipe(map(([data]) => this._filterData(data)));
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = filteredData.subscribe(data => this._renderData.next(data));
    }
    /**
     * Returns a sorted copy of the data if SlkSortDirective has a sort applied, otherwise just returns the
     * data array as provided.
     * @param {?} data
     * @return {?}
     */
    _orderData(data) {
        // If there is no active sort or direction then return data.
        if (!this.sort) {
            return data;
        }
        return this.sortData(data.slice(), this.sort, false);
    }
    /**
     * Returns a paged splice of the provided array according to the SlkPaginatorComponent's page
     * index and length;
     * @param {?} data
     * @return {?}
     */
    _pageData(data) {
        if (!this.paginator) {
            return data;
        }
        const /** @type {?} */ startIndex = (this.paginator.pageIndex - 1) * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _filterData(data) {
        if (!this.filter) {
            return data;
        }
        // Write following lines in separate function.
        // Takes the new filtered array.
        const /** @type {?} */ filteredDataArray = [];
        if (this._filter.active) {
            console.log('1', this._filter.selectedOptions);
            const /** @type {?} */ key = this._filter.key ? this._filter.key : this._filter.active;
            for (let /** @type {?} */ i = 0; i < data.length; i++) {
                for (let /** @type {?} */ j = 0; j < this._filter.selectedOptions.length; j++) {
                    if (data[i][key] === this._filter.selectedOptions[j]) {
                        console.log('enter');
                        filteredDataArray.push(data[i]);
                    }
                }
            }
            console.log('filteredDataArray', filteredDataArray);
            return filteredDataArray;
        }
        else {
            return data;
        }
    }
    /**
     * Used by the SlkTable. Called when it connects to the data source.
     * @return {?}
     */
    connect() { return this._renderData; }
    /**
     * Used by SlkTable, Called when it is destroyed.
     * @return {?}
     */
    disconnect() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SortDirectiveService {
    constructor() {
        this.direction = new BehaviorSubject('');
        this.finalDir = this.direction.asObservable();
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    catchFinalDir(dir) {
        this.direction.next(dir);
    }
}
SortDirectiveService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Container for SlkSortables to manage the sort state and provide default sort paramters.
 */
class SlkSortDirective {
    /**
     * @param {?} sortDirService
     */
    constructor(sortDirService) {
        this.sortDirService = sortDirService;
        /**
         * Collection of all registered sortables that this directive manages.
         */
        this.sortables = new Map();
        /**
         * Used to notify any child components listening to state changes.
         */
        this._stateChanges = new Subject();
        /**
         * Emit initialised value when directive is initialised.
         */
        this.initialised = new BehaviorSubject(false);
        /**
         * The direction to set when an SlkSortable is initially sorted.
         */
        this.start = 'asc';
        this._direction = '';
        /**
         * Event emiited when the user changes either the active sort or sort direction.
         */
        this.slkSortChange = new EventEmitter();
    }
    /**
     * The sort direction of the currently active SlkSortable.
     * @return {?}
     */
    get direction() { return this._direction; }
    /**
     * @param {?} direction
     * @return {?}
     */
    set direction(direction) {
        this._direction = direction;
    }
    /**
     * Register function to be used by the contained SlkSortables. Adds the SlkSortable to
     * the collection of SlkSortables.
     * @param {?} sortable
     * @return {?}
     */
    register(sortable) {
        this.sortables.set(sortable.id, sortable);
    }
    /**
     * Unregister function to be used by the container SlkSortables. Removes the SlkSortable from
     * the collection of contained SlkSortables.
     * @param {?} sortable
     * @return {?}
     */
    deregister(sortable) {
        this.sortables.delete(sortable.id);
    }
    /**
     * Sets the active sort id and determines the new sort direction.
     * @param {?} sortable
     * @return {?}
     */
    sort(sortable) {
        let /** @type {?} */ initial = true;
        if (this.active !== sortable.id) {
            initial = false;
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortDirService.catchFinalDir(this.direction);
        this.slkSortChange.emit({
            active: this.active,
            direction: this.direction,
            initial: initial
        });
    }
    /**
     * Returns the next sort direction of the active sortable.
     * @param {?} sortable
     * @return {?}
     */
    getNextSortDirection(sortable) {
        // Get the sort direction cycle.
        const /** @type {?} */ sortDirectionCycle = getSortDirectionCycle(sortable.start);
        // Get and return the next direction in the cycle.
        let /** @type {?} */ nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialised.next(true);
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this._stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._stateChanges.complete();
        this.initialised.complete();
    }
}
SlkSortDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkSort]',
                exportAs: 'slkSort'
            },] },
];
/** @nocollapse */
SlkSortDirective.ctorParameters = () => [
    { type: SortDirectiveService, },
];
SlkSortDirective.propDecorators = {
    "active": [{ type: Input, args: ['slkSortActive',] },],
    "start": [{ type: Input, args: ['slkSortStart',] },],
    "direction": [{ type: Input, args: ['slkSortDirection',] },],
    "slkSortChange": [{ type: Output, args: ['slkSortChange',] },],
};
/**
 * Returns the sort direction cycle to use given the provided parameters of order and clear.
 * @param {?} start
 * @return {?}
 */
function getSortDirectionCycle(start) {
    const /** @type {?} */ sortOrder = ['asc', 'desc'];
    if (start === 'desc') {
        sortOrder.reverse();
    }
    return sortOrder;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkSortHeaderComponent {
    /**
     * @param {?} _sort
     * @param {?} _slkColumnDef
     * @param {?} renderer
     * @param {?} sortDirService
     */
    constructor(
    // changeDetectorRef: ChangeDetectorRef,
    _sort, _slkColumnDef, renderer, sortDirService) {
        this._sort = _sort;
        this._slkColumnDef = _slkColumnDef;
        this.renderer = renderer;
        this.sortDirService = sortDirService;
    }
    /**
     * Click event. When clicked will sort the data passing reference of this component to sort directive.
     * @return {?}
     */
    onSort() {
        this._sort.sort(this);
        this.sortDirService.finalDir
            .pipe(take(1))
            .subscribe((direction) => {
            switch (direction) {
                case 'asc':
                    this.renderer.removeClass(this.sortBtn.nativeElement, 'slk-sort-header-pointer-down');
                    this.renderer.addClass(this.sortBtn.nativeElement, 'slk-sort-header-pointer-up');
                    return;
                case 'desc':
                    this.renderer.removeClass(this.sortBtn.nativeElement, 'slk-sort-header-pointer-up');
                    this.renderer.addClass(this.sortBtn.nativeElement, 'slk-sort-header-pointer-down');
                    return;
                default:
                    this.renderer.addClass(this.sortBtn.nativeElement, 'slk-sort-header-pointer-down');
                    return;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.id && this._slkColumnDef) {
            this.id = this._slkColumnDef.name;
        }
        this._sort.register(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sort.deregister(this);
        // this._rerenderSubscription.unsubscribe();
    }
    /**
     * Returns the animation state for the arrow direction.
     * @return {?}
     */
    _isSorted() {
        return this._sort.active === this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc');
    }
}
SlkSortHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: '[slk-sort-header]',
                exportAs: 'sortHeader',
                template: `
      <div class="slk-sort-header-container">

          <button (click)="onSort()" class="slk-sort-header-button" type="button"> 

              <ng-content></ng-content>

              <div class="slk-sort-header-pointer">
                  <div #sortBtn class="slk-sort-header-pointer-design">
                
                  </div>
              </div>
          </button>

          <div class="filter-header-wrapper">
              <ng-content select="slk-filter-header"></ng-content>
          </div>
    
      </div>
    `,
                styles: [`
      .slk-sort-header-container{display:flex;cursor:pointer;align-items:center}.slk-sort-header-disabled .slk-sort-header-container{cursor:default}.slk-sort-header-button{margin:auto!important;border:none;background:0 0;display:flex;align-items:center;padding:0;cursor:inherit;outline:0;font:inherit;color:currentColor}.slk-sort-header-pointer{height:12px;width:12px;position:relative;display:flex}.slk-sort-header-pointer-down{border-top:5px solid #555}.slk-sort-header-pointer-down,.slk-sort-header-pointer-up{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;margin:auto;display:flex;align-items:center}.slk-sort-header-pointer-up{border-bottom:5px solid #000}.sort-header-wrapper{align-content:center}
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SlkSortHeaderComponent.ctorParameters = () => [
    { type: SlkSortDirective, decorators: [{ type: Optional },] },
    { type: SlkColumnDefDirective, decorators: [{ type: Optional },] },
    { type: Renderer2, },
    { type: SortDirectiveService, },
];
SlkSortHeaderComponent.propDecorators = {
    "id": [{ type: Input, args: ['slk-sort-header',] },],
    "start": [{ type: Input },],
    "sortBtn": [{ type: ViewChild, args: ['sortBtn',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkSortModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: SlkSortModule
        };
    }
}
SlkSortModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [SlkSortDirective, SlkSortHeaderComponent],
                declarations: [SlkSortDirective, SlkSortHeaderComponent],
                providers: [SortDirectiveService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class SlkTreeNodeOutletContext {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.$implicit = data;
    }
}
/**
 * Data node defintion for the SlkTreeComponent.
 * Captures the node's template
 * @template T
 */
class SlkTreeNodeDefDirective {
    /**
     * @param {?} template
     * @param {?} viewContainer
     */
    constructor(template, viewContainer) {
        this.template = template;
        this.viewContainer = viewContainer;
    }
}
SlkTreeNodeDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkTreeNodeDef]',
                inputs: [
                    'when: slkTreeNodeDefWhen'
                ]
            },] },
];
/** @nocollapse */
SlkTreeNodeDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkTreeNodeOutletDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
SlkTreeNodeOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkTreeNodeOutlet]'
            },] },
];
/** @nocollapse */
SlkTreeNodeOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class SlkTreeTextOutletDirective {
    constructor() {
        SlkTreeTextOutletDirective.mostRecentTreeTextOutlet = /** @type {?} */ (this);
    }
    /**
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data = value;
    }
    /**
     * @return {?}
     */
    get context() { return this._context; }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
    }
}
SlkTreeTextOutletDirective.mostRecentTreeTextOutlet = null;
SlkTreeTextOutletDirective.decorators = [
    { type: Directive, args: [{ selector: '[slkTreeTextOutlet]' },] },
];
/** @nocollapse */
SlkTreeTextOutletDirective.ctorParameters = () => [];
class SlkTreeActionDirective {
    /**
     * @param {?} viewContainer
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(viewContainer, elementRef, renderer) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
        this.renderer = renderer;
        renderer.setStyle(elementRef.nativeElement, 'backgroundColor', '#e2e0e0');
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        const /** @type {?} */ el = this.elementRef.nativeElement.querySelector('.actions');
        this.renderer.setStyle(el, 'visibility', 'visible');
    }
    /**
     * @return {?}
     */
    onMouseOut() {
        const /** @type {?} */ el = this.elementRef.nativeElement.querySelector('.actions');
        this.renderer.setStyle(el, 'visibility', 'hidden');
    }
}
SlkTreeActionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkAction]',
            },] },
];
/** @nocollapse */
SlkTreeActionDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: Renderer2, },
];
SlkTreeActionDirective.propDecorators = {
    "on": [{ type: Input },],
    "onMouseOver": [{ type: HostListener, args: ['mouseover',] },],
    "onMouseOut": [{ type: HostListener, args: ['mouseout',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Tree node for SlkTreeComponent.
 * @template T
 */
class SlkTreeNodeDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _tree
     */
    constructor(_elementRef, _tree) {
        this._elementRef = _elementRef;
        this._tree = _tree;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._destroyed = new Subject();
        /**
         * The role of the node should be group if its an internal node
         * and treeitem if its a leaf node.
         */
        this.role = 'treeitem';
        SlkTreeNodeDirective.mostRecentTreeNode = /** @type {?} */ (this);
    }
    /**
     * The tree node's data.
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        // console.log('value', value);
        this._data = value;
        this._setRoleFromData();
    }
    /**
     * @return {?}
     */
    get isExpanded() {
        return this._tree.treeControl.isExpanded(this._data);
    }
    /**
     * @return {?}
     */
    get level() {
        return this._tree.treeControl.getLevel ? this._tree.treeControl.getLevel(this._data) : 0;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * @return {?}
     */
    _setRoleFromData() {
        if (this._tree.treeControl.isExpandable) {
            this.role = this._tree.treeControl.isExpandable(this._data) ? 'group' : 'treeitem';
        }
        else {
            if (!this._tree.treeControl.getChildren) ;
            this._tree.treeControl.getChildren(this._data).pipe(takeUntil(this._destroyed))
                .subscribe((children) => {
                this.role = children && children.length ? 'group' : 'treeitem';
            });
        }
    }
}
/**
 * The most recently created SlkTreeNode. We save it in static variable so we can retreive it
 * in 'SlkTreeComponent' and set the data to it.
 */
SlkTreeNodeDirective.mostRecentTreeNode = null;
SlkTreeNodeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'slk-tree-node',
                exportAs: 'slkTreeNode'
            },] },
];
/** @nocollapse */
SlkTreeNodeDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: SlkTreeComponent, },
];
SlkTreeNodeDirective.propDecorators = {
    "role": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Slk tree component that connects with a data source to retrieve data of type T and
 * renders dataNodes with heirarchy.
 * @template T
 */
class SlkTreeComponent {
    /**
     * @param {?} _differs
     * @param {?} _changeDetectorRef
     */
    constructor(_differs, _changeDetectorRef) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._onDestroy = new Subject();
        /**
         * Level of nodes
         */
        this._levels = new Map();
        this.cacheEmbeddedViewRef = [];
        this.viewContainerRef = [];
        this.class = 'slk-tree';
        /**
         * Sends the re-ordered array on drop.
         */
        this.reorderData = new EventEmitter();
        /**
         * Stream containing the latest info on what rows are being displayed on screen.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
    }
    /**
     * Provides a stream containing the latest data array to render. Influenced
     * by the tree's stream of view window.
     * @return {?}
     */
    get dataSource() {
        return this._dataSource;
    }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    set dataSource(dataSource) {
        // console.log('dataSource', dataSource);
        if (this._dataSource !== dataSource) {
            this._switchDataSource(dataSource);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._dataDiffer = this._differs.find([]).create(this.trackBy);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._nodeOutlet.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this._dataSource && typeof (/** @type {?} */ (this._dataSource)).disconnect === 'function') {
            (/** @type {?} */ (this.dataSource)).disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        const /** @type {?} */ defaultNodeDefs = this._nodeDefs.filter(def => !def.when);
        // console.log('defaultnodedef', defaultNodeDefs);
        this._defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this._nodeDefs && !this._dataSubscription) {
            // console.log('enter');
            this._observeRenderChanges();
        }
    }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    _switchDataSource(dataSource) {
        if (this._dataSource && typeof (/** @type {?} */ (this._dataSource)).disconnect === 'function') {
            (/** @type {?} */ (this.dataSource)).disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        // Remove all dataNodes if there is now no data source
        if (!dataSource) {
            this._nodeOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
        if (this._nodeDefs) {
            this._observeRenderChanges();
        }
    }
    /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    _observeRenderChanges() {
        let /** @type {?} */ dataStream;
        if (typeof (/** @type {?} */ (this._dataSource)).connect === 'function') {
            dataStream = (/** @type {?} */ (this._dataSource)).connect(this);
        }
        else if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = of(this._dataSource);
        }
        // console.log('dataStream', dataStream);
        if (dataStream) {
            this._dataSubscription = dataStream.pipe(takeUntil(this._onDestroy))
                .subscribe(data => this._renderNodeChanges(data));
        }
    }
    /**
     * Check for changes made in the data nd render each change.
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    _renderNodeChanges(data, dataDiffer = this._dataDiffer, viewContainer = this._nodeOutlet.viewContainer, parentData) {
        const /** @type {?} */ changes = dataDiffer.diff(data);
        // console.log('changes', changes);
        if (!changes) {
            return;
        }
        changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            // console.log('tes', item, adjustedPreviousIndex, currentIndex);
            // console.log('currentIndex', currentIndex);
            if (item.previousIndex === null) {
                this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex === null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                const /** @type {?} */ view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this._changeDetectorRef.detectChanges();
    }
    /**
     * finds the matchin node defintion that should be used for this node data
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    _getNodeDef(data, i) {
        if (this._nodeDefs.length === 1) {
            return this._nodeDefs.first;
        }
        const /** @type {?} */ nodeDef = this._nodeDefs.find(def => def.when && def.when(i, data)) || this._defaultNodeDef;
        return nodeDef;
    }
    /**
     * Create the embedded view for the data node template and place it in the correct index
     * within the data node view container.
     * @param {?} nodeData
     * @param {?} index
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    insertNode(nodeData, index, viewContainer, parentData) {
        const /** @type {?} */ node = this._getNodeDef(nodeData, index);
        /** Gets all the view container ref to check the index of view ref for drag and drop. */
        this.viewContainerRef.push(viewContainer);
        // Node context that will be provided to created embedded view
        const /** @type {?} */ context = new SlkTreeNodeOutletContext(nodeData);
        // If tree is flat tree, then use the getLevel function in flat tree control
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else if (typeof parentData !== 'undefined' && this._levels.has(parentData)) {
            context.level = this._levels.get(parentData) + 1;
        }
        else {
            context.level = 0;
        }
        this._levels.set(nodeData, context.level);
        // Use default tree nodeOutlet, or nested node;s nodeOutlet
        const /** @type {?} */ container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
        /** Returns a view ref and store it in property. */
        this.embeddedViewRef = container.createEmbeddedView(node.template, context, index);
        /** Gets all the view ref to check with the view container ref for drag and drop. */
        this.cacheEmbeddedViewRef.push(this.embeddedViewRef);
        if (SlkTreeNodeDirective.mostRecentTreeNode) {
            SlkTreeNodeDirective.mostRecentTreeNode.data = nodeData;
        }
        if (SlkTreeTextOutletDirective.mostRecentTreeTextOutlet) {
            SlkTreeTextOutletDirective.mostRecentTreeTextOutlet.data = nodeData;
            SlkTreeTextOutletDirective.mostRecentTreeTextOutlet.context = this.embeddedViewRef.context;
        }
    }
    /**
     * Emits a event for re ordered data.
     * @param {?} data
     * @return {?}
     */
    reorderedData(data) {
        this.reorderData.emit(data);
    }
}
SlkTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-tree',
                exportAs: 'slkTree',
                template: '<ng-container slkTreeNodeOutlet></ng-container>',
                styles: [`
      .tree-node-wrapper{cursor:pointer;position:relative;margin-top:20px;width:100%;height:35px;border:1px solid #e2e0e0}.actions{width:70px;position:absolute;display:flex;flex-direction:row;justify-content:space-between;bottom:0;right:0;padding-bottom:20px;padding-right:20px}.icon-plus:after{width:8px;height:2px;top:7px;left:4px}.icon-plus:after,.icon-plus:before{flex:1;background-color:#7e3232;border-radius:1px;-webkit-border-radius:1px;-moz-border-radius:1px;position:absolute;content:""}.icon-plus:before{width:2px;height:8px;top:4px;left:7px}.edit.icon{flex:1;color:#000;position:absolute;margin-left:4px;margin-top:7px;width:14px;height:2px;border-radius:1px;border:1px solid #7e3232;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.edit.icon:before{flex:1;content:"";position:absolute;left:-12px;top:-1px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid currentColor;border-top:2px solid transparent;border-bottom:2px solid transparent}.trash.icon{flex:1;color:#000;position:absolute;margin-left:5px;margin-top:7px;width:9px;height:10px;border-left:1px solid #7e3232;border-right:1px solid #7e3232;border-bottom:1px solid #7e3232;border-radius:0 0 2px 2px}.trash.icon:before{flex:1;content:"";position:absolute;left:-4px;top:-2px;width:17px;height:1px;background-color:#7e3232}.trash.icon:after{flex:1;content:"";position:absolute;left:0;top:-5px;width:7px;height:2px;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor;border-radius:4px 4px 0 0}.toggle{float:left;padding-top:15px;margin-right:10px}.toggle-wrapper{border:solid #000;border-width:0 3px 3px 0;display:inline-block;padding:3px}.expand{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.collapse{transform:rotate(45deg);-webkit-transform:rotate(45deg)}
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SlkTreeComponent.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
];
SlkTreeComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "dataSource": [{ type: Input },],
    "treeControl": [{ type: Input },],
    "trackBy": [{ type: Input },],
    "reorderData": [{ type: Output, args: ['reorderData',] },],
    "_nodeOutlet": [{ type: ViewChild, args: [SlkTreeNodeOutletDirective,] },],
    "_nodeDefs": [{ type: ContentChildren, args: [SlkTreeNodeDefDirective,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ viewRefKey = 'view-ref';
const /** @type {?} */ viewRefContainer = 'view-ref-container';
const /** @type {?} */ dataNode = 'dataNode';
class ActionsService {
    constructor() {
        this.cache = new Map();
        this.inFlightObseravbles = new Map();
        this.DEFAULT_MAX_AGE = 300000;
        this.addAction = new BehaviorSubject(false);
        this.onAdd = this.addAction.asObservable();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    onActChange(changes) {
        this.addAction.next(changes);
    }
    /**
     * Gets the value from the cache if the key is provided.
     * If no value exists in cache, then chcek if the call exists
     * in flight, if so return the subejct, If not create a new
     * Subject inFlightObservble and return the source obseravble.
     * @param {?} key
     * @param {?=} fallback
     * @param {?=} maxAge
     * @return {?}
     */
    get(key, fallback, maxAge) {
        if (this.hasValidCachedValue(key)) {
            return of(this.cache.get(key).data);
        }
        if (!maxAge) {
            maxAge = this.DEFAULT_MAX_AGE;
        }
        if (this.inFlightObseravbles.has(key)) {
            return this.inFlightObseravbles.get(key);
        }
        else {
            return Observable.throw('Requested key is not available in the Cache');
        }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} maxAge
     * @return {?}
     */
    set(key, value, maxAge = this.DEFAULT_MAX_AGE) {
        this.cache.set(key, { data: value, expiry: Date.now() + maxAge });
        this.notifyInFlightObservers(key, value);
    }
    /**
     * Checks if the key exists in cache
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this.cache.has(key);
    }
    /**
     * Publishes the value to all observers of the given
     * in progress observables if observers exist.
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    notifyInFlightObservers(key, value) {
        if (this.inFlightObseravbles.has(key)) {
            const /** @type {?} */ inFlight = this.inFlightObseravbles.get(key);
            const /** @type {?} */ observersCount = inFlight.observers.length;
            if (observersCount) {
                inFlight.next(value);
            }
            inFlight.complete();
            this.inFlightObseravbles.delete(key);
        }
    }
    /**
     * Checks if key exists and has not expired
     * @param {?} key
     * @return {?}
     */
    hasValidCachedValue(key) {
        if (this.cache.has(key)) {
            if (this.cache.get(key).expiry < Date.now()) {
                this.cache.delete(key);
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
}
ActionsService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class SlkNestedTreeNodeDirective extends SlkTreeNodeDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _tree
     * @param {?} _differs
     * @param {?} _viewContainer
     * @param {?} renderer
     * @param {?} actionService
     */
    constructor(_elementRef, _tree, _differs, _viewContainer, renderer, actionService) {
        super(_elementRef, _tree);
        this._elementRef = _elementRef;
        this._tree = _tree;
        this._differs = _differs;
        this._viewContainer = _viewContainer;
        this.renderer = renderer;
        this.actionService = actionService;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        event.preventDefault();
        event.stopPropagation();
        /**
         * after drop event is fired get a reference of parent view container ref and its data
         */
        const /** @type {?} */ nodeContext = JSON.parse(event.dataTransfer.getData('nodeContext'));
        /** Embeds the view when dropped to the dropped view container ref. */
        this._embedView(nodeContext, this._viewContainer.injector);
        /** Removes the dragged view ref from view container ref */
        // this._removeView();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.renderer.setStyle(this._elementRef.nativeElement, 'display', 'block');
        this.renderer.setStyle(this._elementRef.nativeElement, 'padding-left', '40px');
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
        // data coming from the parent class as mostRecentDataNode
        this._tree.treeControl.getChildren(this.data)
            .pipe(takeUntil(this._destroyed))
            .subscribe((result) => {
            // console.log('result', result);
            this._children = result;
            this.updateChildrenNodes();
        });
        this.nodeOutlet.changes.pipe(takeUntil(this._destroyed))
            .subscribe((_) => this.updateChildrenNodes());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._clear();
        super.ngOnDestroy();
    }
    /**
     * Add children dataNodes to the NodeOutlet
     * @return {?}
     */
    updateChildrenNodes() {
        if (this.nodeOutlet.length && this._children) {
            const /** @type {?} */ viewContainer = this.nodeOutlet.first.viewContainer;
            this._tree._renderNodeChanges(this._children, this._dataDiffer, viewContainer, this._data);
        }
        else {
            // Reset the data differ if theres no children nodes displated
            this._dataDiffer.diff([]);
        }
    }
    /**
     * Embeds a view at the drop point
     * @param {?} context
     * @return {?}
     */
    _embbedView(context) {
        this._viewContainer.createEmbeddedView(this._tree._defaultNodeDef.template, context);
        SlkTreeNodeDirective.mostRecentTreeNode.data = context.$implicit;
    }
    /**
     * Embeds a view at the drop point
     * @param {?} context
     * @param {?} containerRef
     * @return {?}
     */
    _embedView(context, containerRef) {
        /**
         * Finds the dropped container view ref from the collected embedded view ref.
         */
        let /** @type {?} */ containerRefToEmbed;
        for (let /** @type {?} */ i = 0; i < this._tree.viewContainerRef.length; i++) {
            // Check for the embedded view ref inside the array to match with context
            for (let /** @type {?} */ j = 0; j < this._tree.viewContainerRef[i]._embeddedViews.length; j++) {
                // test purpose remove it later
                if (this._tree.viewContainerRef[i]._embeddedViews[j].context ===
                    containerRef.view.context) {
                    containerRefToEmbed = this._tree.viewContainerRef[i];
                    break;
                }
            }
        }
        /**
         * Finds the dropped view ref.
         */
        let /** @type {?} */ droppedViewRef;
        for (let /** @type {?} */ i = 0; i < this._tree.cacheEmbeddedViewRef.length; i++) {
            if (this._tree.cacheEmbeddedViewRef[i].context === containerRef.view.context) {
                droppedViewRef = this._tree.cacheEmbeddedViewRef[i];
            }
        }
        /** Gets the view ref of the dragged object. */
        this.actionService.get(viewRefKey)
            .pipe(takeUntil(this._destroyed))
            .subscribe((_viewRef) => {
            // Get index of dropped view ref
            const /** @type {?} */ index = containerRefToEmbed.indexOf(droppedViewRef);
            /** Moves the view ref into the view container ref of drop point. */
            containerRefToEmbed.move(_viewRef, index);
            /** Emits a event for re ordered data. */
            this.reorderData(containerRefToEmbed._embeddedViews);
        });
    }
    /**
     * Removes the view from the drag point
     * @return {?}
     */
    _removeView() {
        // let currentViewRef: EmbeddedViewRef<any>,
        let /** @type {?} */ currentViewContainerRef;
        this.actionService.get(viewRefContainer)
            .pipe(takeUntil(this._destroyed))
            .subscribe((_viewContainerRef) => {
            currentViewContainerRef = _viewContainerRef;
            const /** @type {?} */ index = currentViewContainerRef.indexOf(this._droppedViewRef);
            currentViewContainerRef.remove(index);
        });
    }
    /**
     * Sends data back to the user to re order the data.
     * @param {?} viewRef
     * @return {?}
     */
    reorderData(viewRef) {
        const /** @type {?} */ _reorderData = [];
        for (let /** @type {?} */ i = 0; i < viewRef.length; i++) {
            _reorderData.push(viewRef[i].context.$implicit);
        }
        /** Sends a signal to tree component re order data method. */
        this._tree.reorderedData(_reorderData);
    }
    /**
     * Clear the children dataNodes
     * @return {?}
     */
    _clear() {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this._dataDiffer.diff([]);
        }
    }
}
SlkNestedTreeNodeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'slk-nested-tree-node',
                exportAs: 'slkNestedTreeNode',
                providers: [
                    { provide: SlkTreeNodeDirective, useExisting: SlkNestedTreeNodeDirective },
                ]
            },] },
];
/** @nocollapse */
SlkNestedTreeNodeDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: SlkTreeComponent, },
    { type: IterableDiffers, },
    { type: ViewContainerRef, },
    { type: Renderer2, },
    { type: ActionsService, decorators: [{ type: Optional },] },
];
SlkNestedTreeNodeDirective.propDecorators = {
    "nodeOutlet": [{ type: ContentChildren, args: [SlkTreeNodeOutletDirective,] },],
    "drop": [{ type: HostListener, args: ['drop', ['$event'],] },],
    "onDragOver": [{ type: HostListener, args: ['dragover', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class BaseTreeControl {
    constructor() {
        /**
         * A Selection model with multi-selection to track expansion status.
         */
        this.expansionModel = new SelectionModel(true);
    }
    /**
     * Toggles one single data node;s expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    toggle(dataNode) {
        this.expansionModel.toggle(dataNode);
    }
    /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    expand(dataNode) {
        this.expansionModel.select(dataNode);
    }
    /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    collapse(dataNode) {
        this.expansionModel.deselect(dataNode);
    }
    /**
     * Whether a given data node is expanded or not.
     * @param {?} dataNode
     * @return {?}
     */
    isExpanded(dataNode) {
        return this.expansionModel.isSelected(dataNode);
    }
    /**
     * Toggles a subtree rooted at node recursively
     * @param {?} dataNode
     * @return {?}
     */
    toggleDescendants(dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    }
    /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    collapseAll() {
        this.expansionModel.clear();
    }
    /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    expandDescendants(dataNode) {
        const /** @type {?} */ toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.select(...toBeProcessed);
    }
    /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    collapseDescendants(dataNode) {
        const /** @type {?} */ toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.deselect(...toBeProcessed);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class NestedTreeControl extends BaseTreeControl {
    /**
     * @param {?} getChildren
     */
    constructor(getChildren) {
        super();
        this.getChildren = getChildren;
    }
    /**
     * Expands all dataNodes in the tree.
     * @return {?}
     */
    expandAll() {
        this.expansionModel.clear();
        const /** @type {?} */ allNodes = this.dataNodes.reduce((accumulator, dataNode) => [...accumulator, ...this.getDescendants(dataNode), dataNode], []);
        this.expansionModel.select(...allNodes);
    }
    /**
     * Get a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    getDescendants(dataNode) {
        const /** @type {?} */ descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    }
    /**
     * A helper function to get descendants recursively.
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    _getDescendants(descendants, dataNode) {
        descendants.push(dataNode);
        this.getChildren(dataNode).pipe(take(1)).subscribe(children => {
            if (children && children.length > 0) {
                children.forEach((child) => this._getDescendants(descendants, child));
            }
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkContentActionContext {
    constructor() {
        this.$implicit = null;
        this.appContentAction = null;
    }
}
/**
 * @template T
 */
class SlkTreeNodeTextComponent extends SlkTreeTextOutletDirective {
    /**
     * @param {?} actionService
     * @param {?} nestedNode
     * @param {?} treeComponent
     */
    constructor(actionService, nestedNode, treeComponent) {
        super();
        this.actionService = actionService;
        this.nestedNode = nestedNode;
        this.treeComponent = treeComponent;
        this._onDestroy = new Subject();
        this.isAction = false;
        this.nodeMap = new Map();
        this.isExpandable = (node) => node.expandable;
        this.collapse = false;
        this.nestedTreeControl = new NestedTreeControl(this.isExpandable);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.actionService.onAdd
            .pipe(takeUntil(this._onDestroy))
            .subscribe(result => {
            this.isAction = result;
        });
        if (this.data && this.data.hasOwnProperty('children')) {
            this.expand = true;
        }
        else {
            this.expand = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    onToggle() {
        this.treeComponent.treeControl.toggle(this.data);
        this.actionService.set(dataNode, this.data);
        // console.log('this.toggle', this.toggleDirective);
        if (this.data && this.data.hasOwnProperty('children')) {
            this.expand = false;
            this.collapse = true;
        }
        else {
            this.expand = false;
            this.collapse = false;
        }
    }
    /**
     * @param {?=} node
     * @return {?}
     */
    onAdd(node = this.data) {
        // send a signal to the parent directive and make the directive
        // aware about type of action.
        // internally update dataSource as well
        const /** @type {?} */ parentNode = this.nodeMap.get(node);
        node.children.push({});
        const /** @type {?} */ tree = this.treeComponent.dataSource;
        tree.push(node);
        this.treeComponent.dataSource = [...tree];
        console.log('tree', tree);
        this.nestedTreeControl.expand(node);
    }
    /**
     * @return {?}
     */
    onDestroy() {
        console.log('on destroy');
        this.actionService.onActChange(false);
    }
    /**
     * @return {?}
     */
    onEdit() {
        console.log('on edit');
        this.actionService.onActChange(true);
    }
    /**
     * Drag and drop, have ViewContainers and move the view from one ViewContainer to other
     * @param {?} event
     * @return {?}
     */
    drag(event) {
        let /** @type {?} */ currentViewContainerRef;
        for (let /** @type {?} */ i = 0; i < this.treeComponent.viewContainerRef.length; i++) {
            for (let /** @type {?} */ j = 0; j < this.treeComponent.viewContainerRef[i]._embeddedViews.length; j++) {
                if (this.treeComponent.viewContainerRef[i]._embeddedViews[j].context === this.context) {
                    currentViewContainerRef = this.treeComponent.viewContainerRef[i];
                    break;
                }
            }
        }
        let /** @type {?} */ currentViewRef;
        for (let /** @type {?} */ i = 0; i < this.treeComponent.cacheEmbeddedViewRef.length; i++) {
            if (this.treeComponent.cacheEmbeddedViewRef[i].context === this.context) {
                currentViewRef = this.treeComponent.cacheEmbeddedViewRef[i];
                break;
            }
        }
        event.dataTransfer.setData('nodeContext', JSON.stringify(this.context));
        /** Sets the current view ref and view container ref in the cache. */
        this.actionService.set(viewRefKey, currentViewRef);
        this.actionService.set(viewRefContainer, currentViewContainerRef);
    }
}
SlkTreeNodeTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-tree-nest-text',
                template: `
      <div class="tree-node-wrapper" appAction draggable="true" (dragstart)="drag($event)">

          <div class="toggle" (click)="onToggle()">

              <i [ngClass]="{'expand' : expand, 'toggle-wrapper' : expand}"></i>

              <i [ngClass]="{'collapse' : collapse, 'toggle-wrapper' : collapse}"></i>

          </div>

          <!-- <ng-container *appContentAction="isAction; else noAction"> -->
          <!-- <input type="text"> -->
          <!-- </ng-container> -->

          <!-- <ng-template #noAction> -->
          <ng-content></ng-content>
          <!-- </ng-template> -->

          <div class="actions" [style.visibility]="'hidden'">

              <div (click)="onAdd()">
                  <div class="icon icon-plus"></div>
              </div>

              <div (click)="onDestroy()">
                  <div class="trash icon"></div>
              </div>

              <div (click)="onEdit()">
                  <div class="edit icon"></div>
              </div>

          </div>

      </div>
    `,
                // template: ` <ng-container [ngTemplateOutlet]="template"></ng-container>`,
                // take the reference of child and pass it to ng-container
                styles: [`
      .tree-node-wrapper{cursor:pointer;position:relative;margin-top:20px;width:100%;height:35px;border:1px solid #e2e0e0}.actions{width:70px;position:absolute;display:flex;flex-direction:row;justify-content:space-between;bottom:0;right:0;padding-bottom:20px;padding-right:20px}.icon-plus:after{width:8px;height:2px;top:7px;left:4px}.icon-plus:after,.icon-plus:before{flex:1;background-color:#7e3232;border-radius:1px;-webkit-border-radius:1px;-moz-border-radius:1px;position:absolute;content:""}.icon-plus:before{width:2px;height:8px;top:4px;left:7px}.edit.icon{flex:1;color:#000;position:absolute;margin-left:4px;margin-top:7px;width:14px;height:2px;border-radius:1px;border:1px solid #7e3232;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.edit.icon:before{flex:1;content:"";position:absolute;left:-12px;top:-1px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid currentColor;border-top:2px solid transparent;border-bottom:2px solid transparent}.trash.icon{flex:1;color:#000;position:absolute;margin-left:5px;margin-top:7px;width:9px;height:10px;border-left:1px solid #7e3232;border-right:1px solid #7e3232;border-bottom:1px solid #7e3232;border-radius:0 0 2px 2px}.trash.icon:before{flex:1;content:"";position:absolute;left:-4px;top:-2px;width:17px;height:1px;background-color:#7e3232}.trash.icon:after{flex:1;content:"";position:absolute;left:0;top:-5px;width:7px;height:2px;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor;border-radius:4px 4px 0 0}.toggle{float:left;padding-top:15px;margin-right:10px}.toggle-wrapper{border:solid #000;border-width:0 3px 3px 0;display:inline-block;padding:3px}.expand{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.collapse{transform:rotate(45deg);-webkit-transform:rotate(45deg)}
    `],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SlkTreeNodeTextComponent.ctorParameters = () => [
    { type: ActionsService, },
    { type: SlkNestedTreeNodeDirective, },
    { type: SlkTreeComponent, },
];
/**
 * Directive
 */
class SlkAddActionDirective {
    /**
     * @param {?} renderer
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    constructor(renderer, templateRef, viewContainer) {
        this.renderer = renderer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        /**
         * Context for the template.
         */
        this._context = new SlkContentActionContext();
        /**
         * Stores template ref condition is not true.
         */
        this._elseTemplateRef = null;
        /**
         * Stores template ref condition is true.
         */
        this._thenTemplateRef = null;
        this._elseViewRef = null;
        this._thenViewRef = null;
        this._thenTemplateRef = templateRef;
    }
    /**
     * @param {?} condition
     * @return {?}
     */
    set appContentAction(condition) {
        this._context.$implicit = this._context.appContentAction = condition;
        this._updateView();
    }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set appContentActionElse(templateRef) {
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null;
        this._updateView();
    }
    /**
     * @return {?}
     */
    _updateView() {
        if (this._context.$implicit) {
            if (!this._thenViewRef) {
                this.viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef = this.viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                }
            }
        }
        else {
            if (!this._elseViewRef) {
                this.viewContainer.clear();
                this._thenViewRef = null;
                if (this._elseTemplateRef) {
                    this._elseViewRef =
                        this.viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                    /** Tested to check remove method. */
                    // const index = this.viewContainer.indexOf(this._elseViewRef);
                    // this.viewContainer.remove(index);
                }
            }
        }
    }
}
SlkAddActionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkContentAction]'
            },] },
];
/** @nocollapse */
SlkAddActionDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
SlkAddActionDirective.propDecorators = {
    "appContentAction": [{ type: Input },],
    "appContentActionElse": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ EXPORTED_DECLARATIONS$1 = [
    SlkTreeComponent,
    SlkTreeNodeDirective,
    SlkTreeNodeDefDirective,
    SlkNestedTreeNodeDirective,
    SlkTreeNodeOutletDirective,
    SlkTreeNodeTextComponent,
    SlkTreeTextOutletDirective,
    SlkTreeActionDirective,
    SlkAddActionDirective
];
class SlkTreeModule {
}
SlkTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: EXPORTED_DECLARATIONS$1,
                declarations: EXPORTED_DECLARATIONS$1,
                providers: [
                    SlkTreeNodeDefDirective,
                    ActionsService
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkNavDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
SlkNavDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkNavigator]'
            },] },
];
/** @nocollapse */
SlkNavDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];
class SlkPageIndexDirective {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
SlkPageIndexDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkPageIndex]'
            },] },
];
/** @nocollapse */
SlkPageIndexDirective.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Reference code
 */
const /** @type {?} */ PAGINATOR_CHILD_TEMPLATE = `<ng-container slkNavigator></ng-container>`;
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
class PageEvent {
}
/**
 * @template T
 */
class PaginatorContext {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.$implicit = data;
    }
}
let /** @type {?} */ count = 0;
let /** @type {?} */ actualCount = 0;
const /** @type {?} */ viewContainerRef = 'view-container-ref';
/**
 * TODO:- Put Comments After every line
 */
class SlkPaginatorChildComponent {
    /**
     * @param {?} _differs
     * @param {?} cacheService
     */
    constructor(_differs, cacheService) {
        this._differs = _differs;
        this.cacheService = cacheService;
        this.viewRefCollection = [];
    }
    /**
     * Gets the 'length' from parent component.
     * @return {?}
     */
    get length() { return this._length; }
    /**
     * @param {?} value
     * @return {?}
     */
    set length(value) {
        this._length = value;
    }
    /**
     * Gets the 'pageSize' from parent component.
     * @return {?}
     */
    get pageSize() { return this._pageSize; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageSize(value) {
        this._pageSize = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._dataDiffer = this._differs.find([]).create();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.renderIndex();
    }
    /**
     * Inserts buttons as per total pages
     * @return {?}
     */
    renderIndex() {
        // Get the count of pages to be displayed by the user.
        count = Math.ceil(this.length / this.pageSize);
        actualCount = count;
        // Makes a array to iterate over the total pages needed. Should not be more than 5 buttons.
        if (count > 5) {
            count = 7;
        }
        else {
            count = count + 2;
        }
        // console.log('count', count);
        const /** @type {?} */ array = Array.from(Array(count).keys());
        // Gets the context in a array and the template to be inserted.
        this._pages = this._getAllIndexes(array);
        // Captures the changes in dataDiffer.
        const /** @type {?} */ changes = this._dataDiffer.diff(this._pages);
        changes.forEachOperation((record, prevIndex, currenIndex) => {
            if (record.previousIndex === null) {
                this.insertButtons(record.item);
            }
        });
        this.cacheService.set(viewContainerRef, this.viewRefCollection);
    }
    /**
     * @param {?} indices
     * @return {?}
     */
    _getAllIndexes(indices) {
        return indices.map((_, i) => {
            let /** @type {?} */ pageNo, /** @type {?} */ disabled;
            switch (i) {
                case 0:
                    pageNo = '<';
                    disabled = true;
                    break;
                case 1:
                    pageNo = i.toString();
                    disabled = true;
                    break;
                case indices.length - 1:
                    pageNo = '>';
                    disabled = false;
                    break;
                default:
                    pageNo = i.toString();
                    disabled = false;
                    break;
            }
            return {
                page: pageNo,
                temp: this.pageBtnTemplate,
                index: i,
                disabled: disabled
            };
        });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    insertButtons(data) {
        const /** @type {?} */ ctxData = { page: data.page, index: data.index, disabled: data.disabled };
        const /** @type {?} */ context = new PaginatorContext(ctxData);
        const /** @type {?} */ collectionViewRef = this.nav.viewContainer.createEmbeddedView(data.temp, context, data.index);
        this.viewRefCollection.push(collectionViewRef);
        // console.log('this.view', this.viewRefCollection);
    }
}
SlkPaginatorChildComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-paginator-child',
                template: PAGINATOR_CHILD_TEMPLATE,
                styles: [`
      .page-controller{background:#fff;border-radius:3px;width:27px;height:27px;cursor:pointer;margin-left:10px}
    `],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SlkPaginatorChildComponent.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: ActionsService, },
];
SlkPaginatorChildComponent.propDecorators = {
    "length": [{ type: Input },],
    "pageSize": [{ type: Input },],
    "nav": [{ type: ViewChild, args: [SlkNavDirective,] },],
    "pageBtnTemplate": [{ type: ContentChild, args: [SlkPageIndexDirective, { read: TemplateRef },] },],
};
class SlkPaginatorComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} cacheService
     */
    constructor(_changeDetectorRef, cacheService) {
        this._changeDetectorRef = _changeDetectorRef;
        this.cacheService = cacheService;
        this.initialised = new BehaviorSubject(false);
        /**
         * Notifies when the component is destroyed.
         */
        this._onDestroy = new Subject();
        /**
         * Gets the view ref collection.
         */
        this.collectedViewRef = [];
        this._pageIndex = 1;
        this._length = 0;
        this._pageSizeOptions = [];
        /**
         * Event emitted when page changes.
         */
        this.page = new EventEmitter();
    }
    /**
     * Index of the page to be displayed.
     * @return {?}
     */
    get pageIndex() { return this._pageIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageIndex(value) {
        this._pageIndex = value;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Length of total number of items that are being paginated.
     * @return {?}
     */
    get length() { return this._length; }
    /**
     * @param {?} value
     * @return {?}
     */
    set length(value) {
        this._length = value;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Number of items to be displayed on a page. Set a default value.
     * @return {?}
     */
    get pageSize() { return this._pageSize; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageSize(value) {
        this._pageSize = value;
    }
    /**
     * The set of provided page size options to display to the user.
     * @return {?}
     */
    get pageSizeOptions() { return this._pageSizeOptions; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageSizeOptions(value) {
        this._pageSizeOptions = (value || []).map(p => p);
    }
    /**
     * @return {?}
     */
    ngOnInit() { this.initialised.next(true); }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.initialised.complete();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} index
     * @param {?=} page
     * @return {?}
     */
    onPaged(index, page) {
        // Increment or decrement 'pageIndex' as the user clicks on the buttons.
        if (index === 0) {
            this.pageIndex--;
        }
        else if (index === count - 1) {
            this.pageIndex++;
        }
        else {
            this.pageIndex = index;
        }
        // console.log('index', index);
        if (actualCount > count) {
            if (index === count - 1) {
                // Check if the pageIndex has reached the last button.
                if (this.pageIndex >= 5) {
                    // Now Change the context of currently available buttons
                    this.incrementButtonContext();
                    return;
                }
            }
            if (index === 0) {
                console.log(0);
                // Now Change the context of currently available buttons.
                this.decrementButtonContext(page);
                return;
            }
            if (index === 1) {
                console.log(1);
                this.collectedViewRef[1].context.$implicit.disabled = true;
                this._onPaged();
                return;
            }
        }
        /** Emits a event to update the data source. */
        this._onPaged();
        /** Changes contexts of button. */
        this.changeContextOfButtons(this.pageIndex);
    }
    /**
     * Changes the context on reaching last index.
     * @return {?}
     */
    incrementButtonContext() {
        // Increase the page number by 1 to display.
        // Disable the right arrow if pageIndex has exceeded.
        if (this.pageIndex >= actualCount) {
            this.collectedViewRef[6].context.$implicit.disabled = true;
        }
        if (this.pageIndex === 5) {
            this.collectedViewRef[5].context.$implicit.disabled = true;
            this.collectedViewRef[4].context.$implicit.disabled = false;
        }
        // Not to be incremented if the last pageIndex is 5
        if (this.pageIndex !== 5) {
            for (let /** @type {?} */ i = 0; i < this.collectedViewRef.length; i++) {
                // Increase the number of page by 1.
                if (i !== 0 && i !== 6) {
                    this.collectedViewRef[i].context.$implicit.page =
                        (parseInt(this.collectedViewRef[i].context.$implicit.page, 10) + 1).toString();
                    // Disable the currenlty selected pageIndex.
                    if (parseInt(this.collectedViewRef[i].context.$implicit.page, 10) === this.pageIndex) {
                        this.collectedViewRef[i].context.$implicit.disabled = true;
                    }
                    else {
                        this.collectedViewRef[i].context.$implicit.disabled = false;
                    }
                }
            }
        }
        /** Emits a event to update the data source. */
        this._onPaged();
    }
    /**
     * Changes the context on reaching previous index.
     * @param {?} page
     * @return {?}
     */
    decrementButtonContext(page) {
        // console.log('pageIndex', page);
        if (parseInt(page, 10) === 0) {
            // console.log('disabled decrement');
            this.collectedViewRef[0].context.$implicit.disabled = true;
        }
        for (let /** @type {?} */ i = 0; i < this.collectedViewRef.length; i++) {
            // Decrease the number of page by 1.
            if (i !== 0 && i !== 6) {
                this.collectedViewRef[i].context.$implicit.page =
                    (parseInt(this.collectedViewRef[i].context.$implicit.page, 10) - 1).toString();
                // Disable the currently selected pageIndex.
                if (parseInt(this.collectedViewRef[i].context.$implicit.page, 10) === this.pageIndex) {
                    this.collectedViewRef[i].context.$implicit.disabled = true;
                }
                else {
                    this.collectedViewRef[i].context.$implicit.disabled = false;
                }
            }
        }
        /** Emits a event to update the data source. */
        this._onPaged();
    }
    /**
     * @return {?}
     */
    _onPaged() {
        /** Emits a event to notify dataSource and update the page with right data. */
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length
        });
    }
    /**
     * Disables the page buttons as per selected index desired by the user.
     * @param {?} pageInd
     * @return {?}
     */
    changeContextOfButtons(pageInd) {
        // console.log('pageInd', pageInd);
        this.cacheService.get(viewContainerRef)
            .pipe(takeUntil(this._onDestroy))
            .subscribe((viewRef) => {
            // Store the viewRef in a property to be used by this class.
            this.collectedViewRef = viewRef;
            // Check if the currently selected page index is less than 1 and disable start 2 index page buttons
            // Check if the currently selected page index is equal or greater than the highest page index.
            // Check if the currently selected page index is in the middle or none or above
            if (pageInd === 5) {
                for (let /** @type {?} */ i = 0; i < viewRef.length; i++) {
                    if (i === 5) {
                        viewRef[i].context.$implicit.disabled = true;
                    }
                    else {
                        viewRef[i].context.$implicit.disabled = false;
                    }
                }
            }
            if (pageInd !== 5) {
                if (pageInd > 1 && pageInd < viewRef.length - 2) {
                    this.enableAll(viewRef, pageInd);
                }
                else if (pageInd >= viewRef.length - 2) {
                    this.disableEndIndex(viewRef);
                }
                else {
                    this.disableStartIndex(viewRef);
                }
            }
        });
    }
    /**
     * Disables the button at the start indices.
     * @param {?} viewRef
     * @return {?}
     */
    disableStartIndex(viewRef) {
        for (let /** @type {?} */ i = 0; i < viewRef.length; i++) {
            if (i < 2) {
                viewRef[i].context.$implicit.disabled = true;
            }
            else {
                viewRef[i].context.$implicit.disabled = false;
            }
        }
    }
    /**
     * Disables the button at the end indices.
     * @param {?} viewRef
     * @return {?}
     */
    disableEndIndex(viewRef) {
        for (let /** @type {?} */ i = 0; i < viewRef.length; i++) {
            if (i >= viewRef.length - 2) {
                viewRef[i].context.$implicit.disabled = true;
            }
            else {
                viewRef[i].context.$implicit.disabled = false;
            }
        }
    }
    /**
     * Enables all the button.
     * @param {?} viewRef
     * @param {?} pageInd
     * @return {?}
     */
    enableAll(viewRef, pageInd) {
        for (let /** @type {?} */ i = 0; i < viewRef.length; i++) {
            if (viewRef[i].context.$implicit.index === pageInd) {
                viewRef[i].context.$implicit.disabled = true;
            }
            else {
                viewRef[i].context.$implicit.disabled = false;
            }
        }
    }
}
SlkPaginatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-paginator',
                template: `
      <slk-paginator-child 
          [length]="_length" 
          [pageSize]="_pageSize">

          <ng-container *slkPageIndex="let item">

              <button 
                  [disabled]="item.disabled"
                  class="page-controller" 
                  (click)="onPaged(item.index, item.page)">
                  {{ item.page }}
              </button>

          </ng-container>

      </slk-paginator-child>
    `,
                styles: [`
      .page-controller{background:#fff;border-radius:3px;width:27px;height:27px;cursor:pointer;margin-left:10px}
    `],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SlkPaginatorComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: ActionsService, },
];
SlkPaginatorComponent.propDecorators = {
    "pageIndex": [{ type: Input },],
    "length": [{ type: Input },],
    "pageSize": [{ type: Input },],
    "pageSizeOptions": [{ type: Input },],
    "page": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkPaginatorModule {
}
SlkPaginatorModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [
                    SlkPaginatorComponent,
                    SlkPaginatorChildComponent,
                    SlkNavDirective,
                    SlkPageIndexDirective
                ],
                declarations: [
                    SlkPaginatorComponent,
                    SlkPaginatorChildComponent,
                    SlkNavDirective,
                    SlkPageIndexDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkGridFilterDirective {
    constructor() {
        /**
         * Collection of all registered filters that this directive manages.
         */
        this.filterColumns = new Map();
        /**
         * emit initialised value when directive is initialised.
         */
        this.initialised = new BehaviorSubject(false);
        this.selectedOptions = [];
        /**
         * Event emitted when user types a keyword.
         */
        this.slkFilterChange = new EventEmitter();
    }
    /**
     * Gets the word and the active column for filtering.
     * @param {?} selectedOptions
     * @param {?} columnId
     * @param {?=} key
     * @return {?}
     */
    filter(selectedOptions, columnId, key) {
        if (key) {
            this.key = key;
        }
        this.selectedOptions = selectedOptions;
        this.active = columnId;
        this.slkFilterChange.emit({ data: selectedOptions });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialised.next(true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.initialised.complete();
    }
}
SlkGridFilterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slkFilter]',
                exportAs: 'slkFilter'
            },] },
];
/** @nocollapse */
SlkGridFilterDirective.ctorParameters = () => [];
SlkGridFilterDirective.propDecorators = {
    "active": [{ type: Input, args: ['slkFilterActive',] },],
    "slkFilterChange": [{ type: Output, args: ['slkFilterChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ selectedOptions = 'selected-options';
/**
 * @template T
 */
class SlkGridPopupComponent {
    /**
     * @param {?} data
     * @param {?} cacheService
     */
    constructor(data, cacheService) {
        this.data = data;
        this.cacheService = cacheService;
        // protected _onDestroy: Subject<any> = new Subject();
        this.collectedVal = [];
        this.data.unshift({ name: 'Select All', checked: false });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // this._onDestroy.next();
        // this._onDestroy.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onInputChange(value) {
        // Select all
        if (parseInt(value, 10) === 0) {
            const /** @type {?} */ updatedData = this.data.map((obj) => {
                if (this.data[0].checked) {
                    return Object.assign({}, obj, { checked: false });
                }
                else {
                    return Object.assign({}, obj, { checked: true });
                }
            });
            this.data = updatedData;
            const /** @type {?} */ cachedData = updatedData.map((obj) => {
                return obj.name;
            });
            this.cacheService.set(selectedOptions, cachedData);
        }
        else {
            this.collectedVal.push(this.data[value].name);
            // Cache the selected values.
            this.cacheService.set(selectedOptions, this.collectedVal);
        }
    }
}
SlkGridPopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-filter-popup',
                template: `
      <div class="dropdown">

          <div class="dropdown-button">
              Please Select
          </div>

          <ul class="dropdown-selection">

              <!-- later create these tags dynamically -->

              <li class="container" *ngFor="let d of data;let i = index;">

                  <div class="checkmark">
                      <span>{{ d.name }}</span>
                  </div>

                  <div class="checkbox">
                      <input type="checkbox" [checked]="d.checked" [value]="i" (input)="onInputChange($event.target.value)">
                  </div>

              </li>

          </ul>

      </div>
    `,
                styles: [`
      .dropdown{display:inline-block;position:relative;font-size:16px;font-family:Arial}.dropdown-button{background:#3498db;min-width:100px;color:#fff;letter-spacing:.025rem;box-sizing:border-box;padding:10px 30px 10px 20px;position:relative;cursor:pointer;transition:background .3s ease}.dropdown-button:hover{background:#2980b9;transition:background .3s ease}.dropdown ul{direction:ltr;padding:0;list-style:none;box-shadow:0 2px 6px 0 rgba(0,0,0,.2);position:absolute;left:0;margin-top:2px;top:100%;min-width:100%;max-height:250px;overflow:auto}.dropdown li{background:#fff;padding:8px 10px 8px 15px;box-sizing:border-box;cursor:pointer;transition:background .2s ease;overflow:hidden}.dropdown li:hover{background:#f6f6f6;transition:background .2s ease}.checkmark{float:left;height:3vh}.checkbox{float:right;width:20%;height:3vh}.container{position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container .checkbox input{position:absolute;cursor:pointer}
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SlkGridPopupComponent.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [OPTIONS_DIALOG_DATA,] },] },
    { type: ActionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkGridPopupModule {
}
SlkGridPopupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [SlkGridPopupComponent],
                declarations: [SlkGridPopupComponent],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkGridFilterRef {
    /**
     * @param {?} overlayRef
     */
    constructor(overlayRef) {
        this.overlayRef = overlayRef;
    }
    /**
     * @return {?}
     */
    close() {
        this.overlayRef.dispose();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ OPTIONS_DIALOG_DATA = new InjectionToken('OPTIONS_DIALOG_DATA');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const ɵ0 = [];
const /** @type {?} */ DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'no-style-backdrop',
    panelClass: 'slk-options-dialog-panel',
    data: ɵ0
};
class DomService {
    /**
     * @param {?} injector
     * @param {?} overlay
     */
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
        this.onClose = new BehaviorSubject(false);
        // onCloseBehavior = observableOf(this.onClose);
        this.onCloseBehavior = this.onClose.asObservable();
    }
    /**
     * @param {?} elementRef
     * @param {?=} config
     * @return {?}
     */
    open(elementRef, config = {}) {
        // Over ride default configuration
        const /** @type {?} */ dialogConfig = Object.assign({}, DEFAULT_CONFIG, config);
        // Returns an OverlayRef (which is a PortalHost)
        const /** @type {?} */ overlayRef = this.createOverlay(dialogConfig, elementRef);
        // Instantiate remote control
        const /** @type {?} */ dialogRef = new SlkGridFilterRef(overlayRef);
        const /** @type {?} */ overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);
        overlayRef.backdropClick().subscribe(_ => {
            this.onClose.next(true);
            dialogRef.close();
        });
        return dialogRef;
    }
    /**
     * @param {?} config
     * @param {?} elementRef
     * @return {?}
     */
    createOverlay(config, elementRef) {
        const /** @type {?} */ overlayConfig = this.getOverlayConfig(config, elementRef);
        return this.overlay.create(overlayConfig);
    }
    /**
     * @param {?} overlayRef
     * @param {?} config
     * @param {?} dialogRef
     * @return {?}
     */
    attachDialogContainer(overlayRef, config, dialogRef) {
        const /** @type {?} */ injector = this.createInjector(config, dialogRef);
        const /** @type {?} */ containerPortal = new ComponentPortal(SlkGridPopupComponent, null, injector);
        const /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    /**
     * @param {?} config
     * @param {?} dialogRef
     * @return {?}
     */
    createInjector(config, dialogRef) {
        // Instantiate new WeakMap for our custom injection tokens
        const /** @type {?} */ injectionTokens = new WeakMap();
        // Set customs injection tokens
        injectionTokens.set(SlkGridFilterRef, dialogRef);
        injectionTokens.set(OPTIONS_DIALOG_DATA, config.data);
        // Instantiate new PortalInjector
        return new PortalInjector(this.injector, injectionTokens);
    }
    /**
     * @param {?} config
     * @param {?} elementRef
     * @return {?}
     */
    getOverlayConfig(config, elementRef) {
        // const positionStrategy = this.overlay.position()
        //     .global()
        //     .centerHorizontally()
        //     .centerVertically();
        const /** @type {?} */ positionStrategy = this._getPosition(elementRef);
        // debugger;
        const /** @type {?} */ overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.backdropClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
        // debugger;
        return overlayConfig;
    }
    /**
     * @param {?} elementRef
     * @return {?}
     */
    _getPosition(elementRef) {
        const /** @type {?} */ origin = {
            topLeft: /** @type {?} */ ({ originX: 'start', originY: 'top' }),
            topRight: /** @type {?} */ ({ originX: 'end', originY: 'top' }),
            bottomLeft: /** @type {?} */ ({ originX: 'start', originY: 'bottom' }),
            bottomRight: /** @type {?} */ ({ originX: 'end', originY: 'bottom' }),
            topCenter: /** @type {?} */ ({ originX: 'center', originY: 'top' }),
            bottomCenter: /** @type {?} */ ({ originX: 'center', originY: 'bottom' }),
        };
        const /** @type {?} */ overlay = {
            topLeft: /** @type {?} */ ({ overlayX: 'start', overlayY: 'top' }),
            topRight: /** @type {?} */ ({ overlayX: 'end', overlayY: 'top' }),
            bottomLeft: /** @type {?} */ ({ overlayX: 'start', overlayY: 'bottom' }),
            bottomRight: /** @type {?} */ ({ overlayX: 'end', overlayY: 'bottom' }),
            topCenter: /** @type {?} */ ({ overlayX: 'center', overlayY: 'top' }),
            bottomCenter: /** @type {?} */ ({ overlayX: 'center', overlayY: 'bottom' }),
        };
        return this.overlay.position()
            .connectedTo(elementRef, origin.bottomLeft, overlay.topLeft)
            .withOffsetY(10)
            .withDirection('rtl')
            .withFallbackPosition(origin.bottomRight, overlay.topRight)
            .withFallbackPosition(origin.topLeft, overlay.bottomLeft)
            .withFallbackPosition(origin.topRight, overlay.bottomRight)
            .withFallbackPosition(origin.topCenter, overlay.bottomCenter)
            .withFallbackPosition(origin.bottomCenter, overlay.topCenter);
    }
}
DomService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomService.ctorParameters = () => [
    { type: Injector, },
    { type: Overlay, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ actualData = 'actual-data';
/**
 * The max height of the filter's overlay panel
 */
const /** @type {?} */ FILTER_PANEL_MAX_HEIGHT = 256;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
const /** @type {?} */ FILTER_PANEL_VIEWPORT_PADDING = 8;
/**
 * @template T
 */
class SlkGridFilterComponent {
    /**
     * @param {?} _filter
     * @param {?} _slkColumnDef
     * @param {?} viewContainerRef
     * @param {?} _elementRef
     * @param {?} domService
     * @param {?} _grid
     * @param {?} cacheService
     */
    constructor(_filter, _slkColumnDef, viewContainerRef, _elementRef, domService, _grid, cacheService) {
        this._filter = _filter;
        this._slkColumnDef = _slkColumnDef;
        this.viewContainerRef = viewContainerRef;
        this._elementRef = _elementRef;
        this.domService = domService;
        this._grid = _grid;
        this.cacheService = cacheService;
        /**
         * When this component is initialised.
         */
        this.initialised = new BehaviorSubject(false);
        /**
         * Destroy.
         */
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    onFilterChange() {
        // Get the id of the selected filter and filter all unique values.
        // Then pass the data to the popup component
        let /** @type {?} */ uniqueOptions;
        if (!this.initialData) {
            uniqueOptions = this._filterUniqueValues(this.id, this._grid.copyOfData);
            this.initialData = this._grid.copyOfData.slice();
            this.cacheService.set(actualData, this.initialData);
            this.openPopup(uniqueOptions);
            return;
        }
        else {
            this.cacheService.get(actualData)
                .pipe(takeUntil(this._onDestroy))
                .subscribe((data) => {
                uniqueOptions = this._filterUniqueValues(this.id, data);
                this.openPopup(uniqueOptions);
                return;
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialised.next(true);
        // Sets the id for every column name
        this.id = this._slkColumnDef.name;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.initialised.complete();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Opens the popup filter.
     * @param {?} uniqueOptions
     * @return {?}
     */
    openPopup(uniqueOptions) {
        // Opens a dialog and injects data in the entryComponent.
        const /** @type {?} */ overlayOptionsRef = this.domService.open(this._elementRef, { data: uniqueOptions });
        // Subscribes to on close behavior
        this._filterClose();
    }
    /**
     * Subscribes to the on closed behavior.
     * @return {?}
     */
    _filterClose() {
        // When the filter popup is closed.
        this.domService.onCloseBehavior
            .pipe(takeUntil(this._onDestroy))
            .subscribe((isClosed) => {
            if (isClosed) {
                this._getSelectedValues();
            }
        });
    }
    /**
     * Gets the selected values in the unique filter drop down.
     * @return {?}
     */
    _getSelectedValues() {
        this.cacheService.get(selectedOptions)
            .pipe(takeUntil(this._onDestroy))
            .subscribe((selectedValues) => {
            // Send the selected values to filter data in the grid.
            this._filter.filter(selectedValues, this.id, this.key);
        });
    }
    /**
     * Filters the unique values in the column.
     * @param {?} columnId
     * @param {?} data
     * @return {?}
     */
    _filterUniqueValues(columnId, data) {
        // Stores the unique filters value in an array.
        const /** @type {?} */ uniqueValuesInTheColumn = [];
        let /** @type {?} */ uniqueValues = [];
        let /** @type {?} */ options = [];
        if (this.metadata) {
            for (let /** @type {?} */ i = 0; i < this.metadata.length; i++) {
                if (this.metadata[i].name === this.id) {
                    // has to be id or a specific format supported
                    this.key = this.metadata[i].reference_id;
                    break;
                }
            }
            for (let /** @type {?} */ i = 0; i < data.length; i++) {
                uniqueValuesInTheColumn.push(data[i][this.key]);
            }
            // remove duplicates
            uniqueValues = this._removeDuplicates(uniqueValuesInTheColumn);
            options = this._options(uniqueValues);
            return options;
        }
        else {
            for (let /** @type {?} */ i = 0; i < data.length; i++) {
                uniqueValuesInTheColumn.push(data[i][columnId]);
            }
            uniqueValues = this._removeDuplicates(uniqueValuesInTheColumn);
            options = this._options(uniqueValues);
            return options;
        }
    }
    /**
     * Removes duplicates.
     * @param {?} uniqueValuesInTheColumn
     * @return {?}
     */
    _removeDuplicates(uniqueValuesInTheColumn) {
        return uniqueValuesInTheColumn.filter((element, pos) => {
            return uniqueValuesInTheColumn.indexOf(element) === pos;
        });
    }
    /**
     * @param {?} uniqueValues
     * @return {?}
     */
    _options(uniqueValues) {
        return uniqueValues.map((eachEl, index) => {
            return {
                name: eachEl,
                checked: false
            };
        });
    }
}
SlkGridFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'slk-filter-header',
                template: `
      <div class="triangle-down"></div>
    `,
                styles: [`
      .triangle-down{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:20px solid #555;float:right}
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SlkGridFilterComponent.ctorParameters = () => [
    { type: SlkGridFilterDirective, decorators: [{ type: Optional },] },
    { type: SlkColumnDefDirective, decorators: [{ type: Optional },] },
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: DomService, },
    { type: SlkTableComponent, },
    { type: ActionsService, },
];
SlkGridFilterComponent.propDecorators = {
    "metadata": [{ type: Input, args: ['metadata',] },],
    "id": [{ type: Input, args: ['slk-filter-header',] },],
    "onFilterChange": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlkFilterModule {
}
SlkFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SlkGridPopupModule,
                    OverlayModule
                ],
                exports: [SlkGridFilterComponent, SlkGridFilterDirective],
                declarations: [SlkGridFilterComponent, SlkGridFilterDirective],
                entryComponents: [
                    SlkGridPopupComponent
                ],
                providers: [DomService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DataRowOutletDirective, HeaderRowOutletDirective, FooterRowOutletDirective, SLK_TABLE_TEMPLATE, SlkTableComponent, SLK_ROW_TEMPLATE, BaseRowDef, SlkHeaderRowDefBase, SlkHeaderRowDefDirective, SlkFooterRowDefBase, SlkFooterRowDefDirective, SlkRowDefDirective, SlkCellOutletDirective, SlkHeaderRowComponent, SlkFooterRowComponent, SlkRowComponent, SlkCellDefDirective, SlkHeaderCellDefDirective, SlkFooterCellDefDirective, SlkColumnDefBase, SlkColumnDefDirective, BaseSlkCell, SlkHeaderCellDirective, SlkFooterCellDirective, SlkCellDirective, SlkGridModule, SlkGridDataSource, DirectiveService, SlkSortModule, SlkSortHeaderComponent, SlkSortDirective, SlkTreeComponent, SlkTreeModule, SlkNestedTreeNodeDirective, NestedTreeControl, SlkTreeNodeOutletDirective, SlkTreeNodeOutletContext, SlkTreeNodeDefDirective, SlkTreeNodeDirective, SlkTreeTextOutletDirective, SlkTreeActionDirective, SlkContentActionContext, SlkTreeNodeTextComponent, SlkAddActionDirective, viewRefKey, viewRefContainer, dataNode, ActionsService, SlkNavDirective, SlkPageIndexDirective, PAGINATOR_CHILD_TEMPLATE, PageEvent, PaginatorContext, viewContainerRef, SlkPaginatorChildComponent, SlkPaginatorComponent, SlkPaginatorModule, SlkGridFilterDirective, actualData, FILTER_PANEL_MAX_HEIGHT, FILTER_PANEL_VIEWPORT_PADDING, SlkGridFilterComponent, SlkGridFilterRef, DomService, OPTIONS_DIALOG_DATA, SlkFilterModule, selectedOptions, SlkGridPopupComponent, SlkGridPopupModule };
//# sourceMappingURL=ngx-sleek.js.map
