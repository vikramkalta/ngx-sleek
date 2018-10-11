import { Injectable, IterableDiffers, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, ViewEncapsulation, Component, Directive, Input, Renderer2, ElementRef, ContentChild, EmbeddedViewRef, ContentChildren, ChangeDetectorRef, ViewChild, isDevMode, HostBinding, Output, EventEmitter, NgModule, Optional, HostListener, Inject, InjectionToken, Injector } from '@angular/core';
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
var DirectiveService = /** @class */ (function () {
    function DirectiveService() {
        this.totalColumns = new BehaviorSubject(0);
        this.totalColumnsAsObservable = this.totalColumns.asObservable();
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    DirectiveService.prototype.setTotalColumns = /**
     * @param {?} columns
     * @return {?}
     */
    function (columns) {
        this.totalColumns.next(columns.length);
    };
    DirectiveService.decorators = [
        { type: Injectable },
    ];
    return DirectiveService;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * The row template that can be used by the slk-table.
 */
var /** @type {?} */ SLK_ROW_TEMPLATE = "<ng-container slkCellOutlet></ng-container>";
/**
 * Base class for the SlkHeaderRowDef and SlkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
var  /**
 * Base class for the SlkHeaderRowDef and SlkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
BaseRowDef = /** @class */ (function () {
    function BaseRowDef(template, _differs) {
        this.template = template;
        this._differs = _differs;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseRowDef.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // console.log('this.columns from row', this.columns);
        // create a new columns differ if one does not yet exist. Initialize it based on initial value
        // of the columns property or an empty array if none is provided.
        if (!this._columnsDiffer) {
            var /** @type {?} */ columns = (changes['columns'] && changes['columns'].currentValue) || [];
            // console.log('columns from row', columns);
            this._columnsDiffer = this._differs.find(columns).create();
            this._columnsDiffer.diff(columns);
        }
    };
    /**
     * Returns the difference between the current columns and the columns from the last diff, or ull
     * if there is no difference.
     */
    /**
     * Returns the difference between the current columns and the columns from the last diff, or ull
     * if there is no difference.
     * @return {?}
     */
    BaseRowDef.prototype.getColumnsDiff = /**
     * Returns the difference between the current columns and the columns from the last diff, or ull
     * if there is no difference.
     * @return {?}
     */
    function () {
        return this._columnsDiffer.diff(this.columns);
    };
    /** Gets this row def's relevant cell template from the provided column def. */
    /**
     * Gets this row def's relevant cell template from the provided column def.
     * @param {?} column
     * @return {?}
     */
    BaseRowDef.prototype.extractCellTemplate = /**
     * Gets this row def's relevant cell template from the provided column def.
     * @param {?} column
     * @return {?}
     */
    function (column) {
        // console.log('column from row', column, this instanceof SlkHeaderRowDefDirective);
        return extractCellTemp(this, column);
    };
    return BaseRowDef;
}());
var SlkHeaderRowDefBase = /** @class */ (function (_super) {
    __extends(SlkHeaderRowDefBase, _super);
    function SlkHeaderRowDefBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SlkHeaderRowDefBase;
}(BaseRowDef));
/**
 * Header row definition for the slk table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var SlkHeaderRowDefDirective = /** @class */ (function (_super) {
    __extends(SlkHeaderRowDefDirective, _super);
    function SlkHeaderRowDefDirective(template, _differs, directiveService) {
        var _this = _super.call(this, template, _differs) || this;
        _this.directiveService = directiveService;
        // console.log('appHeaderRowDef', this.appHeaderRowDef);
        return _this;
    }
    // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
    // Explicitly define it so that the method is called as part of the Angular lifecycle.
    /**
     * @param {?} changes
     * @return {?}
     */
    SlkHeaderRowDefDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        this.columns = this.slkHeaderRowDef;
    };
    /**
     * @return {?}
     */
    SlkHeaderRowDefDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.directiveService.setTotalColumns(this.columns);
    };
    SlkHeaderRowDefDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkHeaderRowDef]',
                },] },
    ];
    /** @nocollapse */
    SlkHeaderRowDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: IterableDiffers, },
        { type: DirectiveService, },
    ]; };
    SlkHeaderRowDefDirective.propDecorators = {
        "slkHeaderRowDef": [{ type: Input, args: ['slkHeaderRowDef',] },],
        "columns": [{ type: Input },],
    };
    return SlkHeaderRowDefDirective;
}(SlkHeaderRowDefBase));
var SlkFooterRowDefBase = /** @class */ (function (_super) {
    __extends(SlkFooterRowDefBase, _super);
    function SlkFooterRowDefBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SlkFooterRowDefBase;
}(BaseRowDef));
/**
 * Footer row definition for the CDK table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
var SlkFooterRowDefDirective = /** @class */ (function (_super) {
    __extends(SlkFooterRowDefDirective, _super);
    function SlkFooterRowDefDirective(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
    // Explicitly define it so that the method is called as part of the Angular lifecycle.
    /**
     * @param {?} changes
     * @return {?}
     */
    SlkFooterRowDefDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
    };
    SlkFooterRowDefDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkFooterRowDef]'
                },] },
    ];
    /** @nocollapse */
    SlkFooterRowDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: IterableDiffers, },
    ]; };
    return SlkFooterRowDefDirective;
}(BaseRowDef));
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
var SlkRowDefDirective = /** @class */ (function (_super) {
    __extends(SlkRowDefDirective, _super);
    function SlkRowDefDirective(template, _differs) {
        var _this = _super.call(this, template, _differs) || this;
        // console.log('appRowDefColumns', this.appRowDef);
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    SlkRowDefDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        this.columns = this.slkRowDefColumns;
        // console.log('appRowDefColumns1', this.appRowDef);
    };
    SlkRowDefDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkRowDef]'
                },] },
    ];
    /** @nocollapse */
    SlkRowDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: IterableDiffers, },
    ]; };
    SlkRowDefDirective.propDecorators = {
        "slkRowDefColumns": [{ type: Input, args: ['slkRowDefColumns',] },],
        "columns": [{ type: Input },],
    };
    return SlkRowDefDirective;
}(BaseRowDef));
/**
 * Outlet for rendering cells inside of a row or header row.
 */
var SlkCellOutletDirective = /** @class */ (function () {
    function SlkCellOutletDirective(_viewContainer) {
        this._viewContainer = _viewContainer;
        // console.log('this this', this);
        SlkCellOutletDirective.mostRecentCellOutlet = this;
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
    SlkCellOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return SlkCellOutletDirective;
}());
/**
 * Header template container that container the cell outlet.
 */
var SlkHeaderRowComponent = /** @class */ (function () {
    function SlkHeaderRowComponent(renderer, elementRef) {
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, 'header-row');
    }
    SlkHeaderRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-header-row, tr[slk-header-row]',
                    template: SLK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}\n    "]
                },] },
    ];
    /** @nocollapse */
    SlkHeaderRowComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    return SlkHeaderRowComponent;
}());
/**
 * Footer template container that contains the cell outlet.
 */
var SlkFooterRowComponent = /** @class */ (function () {
    function SlkFooterRowComponent() {
    }
    SlkFooterRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-footer-row, tr[slk-footer-row]',
                    template: SLK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}\n    "]
                },] },
    ];
    return SlkFooterRowComponent;
}());
/**
 * Data row template container that contains cell outlet.
 */
var SlkRowComponent = /** @class */ (function () {
    function SlkRowComponent(renderer, elementRef) {
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, 'header-row');
    }
    SlkRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-row, tr[slk-row]',
                    template: SLK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}\n    "]
                },] },
    ];
    /** @nocollapse */
    SlkRowComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    return SlkRowComponent;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Cell definition for a Slk Table.
 */
var SlkCellDefDirective = /** @class */ (function () {
    function SlkCellDefDirective(template) {
        this.template = template;
    }
    SlkCellDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[slkCellDef]' },] },
    ];
    /** @nocollapse */
    SlkCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return SlkCellDefDirective;
}());
/**
 * Header cell defintion for a Slk table.
 */
var SlkHeaderCellDefDirective = /** @class */ (function () {
    function SlkHeaderCellDefDirective(template) {
        this.template = template;
    }
    SlkHeaderCellDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[slkHeaderCellDef]' },] },
    ];
    /** @nocollapse */
    SlkHeaderCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return SlkHeaderCellDefDirective;
}());
/**
 * Footer cell defintion for a Slk table.
 */
var SlkFooterCellDefDirective = /** @class */ (function () {
    function SlkFooterCellDefDirective(template) {
        this.template = template;
    }
    SlkFooterCellDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[slkFooterCellDef]' },] },
    ];
    /** @nocollapse */
    SlkFooterCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return SlkFooterCellDefDirective;
}());
var SlkColumnDefBase = /** @class */ (function () {
    function SlkColumnDefBase() {
    }
    return SlkColumnDefBase;
}());
/**
 * Column definition for the Slk table.
 */
var SlkColumnDefDirective = /** @class */ (function (_super) {
    __extends$1(SlkColumnDefDirective, _super);
    function SlkColumnDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SlkColumnDefDirective.prototype, "name", {
        get: /**
         * Unique name for this column.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            // If the directive is set without a name (updated programatically), then this setter will
            if (!name) {
                return;
            }
            this._name = name;
            this.cssClassFriendlyName = name;
        },
        enumerable: true,
        configurable: true
    });
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
    return SlkColumnDefDirective;
}(SlkColumnDefBase));
/**
 * Base class for the cells. Adds a CSS classname that identifies the column it renders in.
 */
var  /**
 * Base class for the cells. Adds a CSS classname that identifies the column it renders in.
 */
BaseSlkCell = /** @class */ (function () {
    function BaseSlkCell(columnDef, elementRef) {
        var /** @type {?} */ columnClassName = "slk-column-" + columnDef.cssClassFriendlyName;
        elementRef.nativeElement.classList.add(columnClassName);
    }
    return BaseSlkCell;
}());
/**
 * Header cell template container.
 */
var SlkHeaderCellDirective = /** @class */ (function (_super) {
    __extends$1(SlkHeaderCellDirective, _super);
    function SlkHeaderCellDirective(columnDef, elementRef, directiveService, renderer) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.elementRef = elementRef;
        _this.directiveService = directiveService;
        _this.renderer = renderer;
        _this.destroy = new Subject();
        return _this;
    }
    /**
     * @return {?}
     */
    SlkHeaderCellDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.directiveService.totalColumnsAsObservable
            .pipe(takeUntil(this.destroy))
            .subscribe(function (cols) {
            var /** @type {?} */ totalColumns = 100 / cols;
            _this.renderer.setStyle(_this.elementRef.nativeElement, 'width', totalColumns + "%");
            _this.destroy.next(true);
        });
    };
    SlkHeaderCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'slkHeaderCell, th[slkHeaderCell]'
                },] },
    ];
    /** @nocollapse */
    SlkHeaderCellDirective.ctorParameters = function () { return [
        { type: SlkColumnDefDirective, },
        { type: ElementRef, },
        { type: DirectiveService, },
        { type: Renderer2, },
    ]; };
    return SlkHeaderCellDirective;
}(BaseSlkCell));
/**
 * Footer cell template container
 */
var SlkFooterCellDirective = /** @class */ (function (_super) {
    __extends$1(SlkFooterCellDirective, _super);
    function SlkFooterCellDirective(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    SlkFooterCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'slkFooterCell, th[slkFooterCell]'
                },] },
    ];
    /** @nocollapse */
    SlkFooterCellDirective.ctorParameters = function () { return [
        { type: SlkColumnDefDirective, },
        { type: ElementRef, },
    ]; };
    return SlkFooterCellDirective;
}(BaseSlkCell));
/**
 * Cell template container
 */
var SlkCellDirective = /** @class */ (function (_super) {
    __extends$1(SlkCellDirective, _super);
    function SlkCellDirective(columnDef, elementRef, directiveService, renderer) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.elementRef = elementRef;
        _this.directiveService = directiveService;
        _this.renderer = renderer;
        _this.destroy = new Subject();
        return _this;
    }
    /**
     * @return {?}
     */
    SlkCellDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.directiveService.totalColumnsAsObservable
            .pipe(takeUntil(this.destroy))
            .subscribe(function (cols) {
            var /** @type {?} */ totalColumns = 100 / cols;
            _this.renderer.setStyle(_this.elementRef.nativeElement, 'width', totalColumns + "%");
            _this.destroy.next(true);
        });
    };
    SlkCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'slkCell, td[slkCell]'
                },] },
    ];
    /** @nocollapse */
    SlkCellDirective.ctorParameters = function () { return [
        { type: SlkColumnDefDirective, },
        { type: ElementRef, },
        { type: DirectiveService, },
        { type: Renderer2, },
    ]; };
    return SlkCellDirective;
}(BaseSlkCell));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 */
var DataRowOutletDirective = /** @class */ (function () {
    function DataRowOutletDirective(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    DataRowOutletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkRowOutlet]'
                },] },
    ];
    /** @nocollapse */
    DataRowOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ElementRef, },
    ]; };
    return DataRowOutletDirective;
}());
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header
 */
var HeaderRowOutletDirective = /** @class */ (function () {
    function HeaderRowOutletDirective(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    HeaderRowOutletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkHeaderRowOutlet]'
                },] },
    ];
    /** @nocollapse */
    HeaderRowOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ElementRef, },
    ]; };
    return HeaderRowOutletDirective;
}());
/**
 * Provides a handle for the table to grab view container's ng-container to insert the footer.
 */
var FooterRowOutletDirective = /** @class */ (function () {
    function FooterRowOutletDirective(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    FooterRowOutletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkFooterRowOutlet]'
                },] },
    ];
    /** @nocollapse */
    FooterRowOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ElementRef, },
    ]; };
    return FooterRowOutletDirective;
}());
/**
 * The table template that can be used by slk-table
 */
var /** @type {?} */ SLK_TABLE_TEMPLATE = "\n    <ng-container slkHeaderRowOutlet></ng-container>\n    <ng-container slkRowOutlet></ng-container>\n    <ng-container slkFooterRowOutlet></ng-container>\n";
/**
 * Class used to conveniently type the embedded view ref for rows with a context
 * @abstract
 * @template T
 */
var /**
 * Class used to conveniently type the embedded view ref for rows with a context
 * @abstract
 * @template T
 */
RowViewRef = /** @class */ (function (_super) {
    __extends$2(RowViewRef, _super);
    function RowViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowViewRef;
}(EmbeddedViewRef));
/**
 * A data table that can render a header row, data rows and a footer row.
 * @template T
 */
var SlkTableComponent = /** @class */ (function () {
    function SlkTableComponent(_differs, _changeDetectorRef, _elementRef, renderer) {
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
    Object.defineProperty(SlkTableComponent.prototype, "length", {
        get: /**
         * Gets the total number of rows that has to be displayed.
         * @return {?}
         */
        function () { return this._length; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._length = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkTableComponent.prototype, "trackBy", {
        get: /**
         * Tracking function that will be used to check the differences in data changes. Used similarly
         * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
         * relative to the function to know if a row should be added/removed/moved.
         * Accepts a function that takes two parameters, `index` and `item`.
         * @return {?}
         */
        function () { return this._trackByFn; },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            if (isDevMode() &&
                fn != null && typeof fn !== 'function' && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
                console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._trackByFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkTableComponent.prototype, "dataSource", {
        get: /**
         * The table's source of data, which can be provided in three ways (in order of complexity):
         *   - Simple data array (each object represents one table row)
         *   - Stream that emits a data array each time the array changes
         *   - `DataSource` object that implements the connect/disconnect interface.
         *
         * @return {?}
         */
        function () { return this._dataSource; },
        set: /**
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlkTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._elementRef.nativeElement.nodeName === 'TABLE') {
            this._applyNativeTableSections();
        }
        // Set up the trackBy function so that it uses the `RenderRow` as its identity by default. If
        // the user has provided a custom trackBy, return the result of that function as evaluated
        // with the values of the `RenderRow`'s data and index.
        this._dataDiffer = this._differs.find([]).create(function (_i, dataRow) {
            // console.log('_i', _i, dataRow);
            return _this.trackBy ? _this.trackBy(dataRow.dataIndex, dataRow.data) : dataRow;
        });
        // console.log('data differ', this._dataDiffer);
    };
    /**
     * @return {?}
     */
    SlkTableComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    SlkTableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._rowOutlet.viewContainer.clear();
        this._headerRowOutlet.viewContainer.clear();
        this._footerRowOutlet.viewContainer.clear();
        // this._cachedRenderRowsMap.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource instanceof DataSource) {
            this.dataSource.disconnect(this);
        }
    };
    /**
     * Render rows based on the table's latest set of data which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary changes
     */
    /**
     * Render rows based on the table's latest set of data which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary changes
     * @return {?}
     */
    SlkTableComponent.prototype.renderRows = /**
     * Render rows based on the table's latest set of data which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary changes
     * @return {?}
     */
    function () {
        var _this = this;
        this._renderRows = this._getAllRenderRows();
        // console.log('renderRows', this._renderRows);
        // console.log('this._dataDiffer', this._dataDiffer);
        var /** @type {?} */ changes = this._dataDiffer.diff(this._renderRows);
        // console.log('changes', changes);
        if (!changes) {
            return;
        }
        var /** @type {?} */ viewContainer = this._rowOutlet.viewContainer;
        changes.forEachOperation(function (record, prevIndex, currentIndex) {
            // console.log('record', record, prevIndex, currentIndex);
            if (record.previousIndex === null) {
                _this._insertRow(record.item, currentIndex);
            }
            else if (currentIndex === null) {
                viewContainer.remove(prevIndex);
            }
            else {
                var /** @type {?} */ view = /** @type {?} */ (viewContainer.get(prevIndex));
                viewContainer.move(view, currentIndex);
            }
            if (currentIndex === _this._data.length - 1) {
                _this._addScrollEvent();
            }
        });
    };
    /**
     * @return {?}
     */
    SlkTableComponent.prototype._getAllRenderRows = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ renderRows = [];
        // console.log('this_Data', this._data);
        // for each data object, get the list of rows that should be rendered, represented by the
        // respective 'RenderRow' object which is the pair of data and slkrowDef
        for (var /** @type {?} */ i = 0; i < this._data.length; i++) {
            // console.log('this._data i', i);
            var /** @type {?} */ data = this._data[i];
            var /** @type {?} */ renderRowsForData = this._getRenderRowsForData(data, i);
            // console.log('render rows for data', renderRowsForData);
            for (var /** @type {?} */ j = 0; j < renderRowsForData.length; j++) {
                var /** @type {?} */ renderRow = renderRowsForData[j];
                // console.log('j', j, renderRow);
                renderRows.push(renderRow);
            }
        }
        return renderRows;
    };
    /**
     * Gets a list of 'RenderRow<T>' for the provided data object and any 'CdkRowDef' objects that
     * should be rendered for this data. Reuses the cached RenderRow objecst if they match the same
     * (T, SlkRowDef) pair.
     * @param {?} data
     * @param {?} dataIndex
     * @return {?}
     */
    SlkTableComponent.prototype._getRenderRowsForData = /**
     * Gets a list of 'RenderRow<T>' for the provided data object and any 'CdkRowDef' objects that
     * should be rendered for this data. Reuses the cached RenderRow objecst if they match the same
     * (T, SlkRowDef) pair.
     * @param {?} data
     * @param {?} dataIndex
     * @return {?}
     */
    function (data, dataIndex) {
        var /** @type {?} */ rowDefs = this._getRowDefs(data, dataIndex);
        return rowDefs.map(function (rowDef) {
            return { data: data, rowDef: rowDef, dataIndex: dataIndex };
        });
    };
    /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    SlkTableComponent.prototype._cacheColumnDefs = /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    function () {
        var _this = this;
        this._columnDefsByName.clear();
        var /** @type {?} */ columnDefs = mergeQueryListAndSet(this._contentColumnDefs, this._customColumnDefs);
        columnDefs.forEach(function (columnDef) {
            // if (this._columnDefsByName.has(columnDef.name)) {
            //     throw getTableDuplicateColumnNameError(columnDef.name);
            // }
            // if (this._columnDefsByName.has(columnDef.name)) {
            //     throw getTableDuplicateColumnNameError(columnDef.name);
            // }
            _this._columnDefsByName.set(columnDef.name, columnDef);
        });
    };
    /**
     * Update the list of all available row definitions that can be used.
     * @return {?}
     */
    SlkTableComponent.prototype._cacheRowDefs = /**
     * Update the list of all available row definitions that can be used.
     * @return {?}
     */
    function () {
        this._headerRowDefs =
            mergeQueryListAndSet(this._contentHeaderRowDefs, this._customHeaderRowDefs);
        this._footerRowDefs =
            mergeQueryListAndSet(this._contentFooterRowDefs, this._customFooterRowDefs);
        this._rowDefs =
            mergeQueryListAndSet(this._contentRowDefs, this._customRowDefs);
        // After all row definitions are determined, find the row definition to be considered default.
        var /** @type {?} */ defaultRowDefs = this._rowDefs.filter(function (def) { return !def.when; });
        // if (defaultRowDefs.length > 1) {
        //     throw getTableMultipleDefaultRowDefsError();
        // }
        this._defaultRowDef = defaultRowDefs[0];
    };
    /**
     * Check if the header, data, or footer rows have changed what columns they want to display or
     * whether the sticky states have changed for the header or footer. If there is a diff, then
     * re-render that section.
     * @return {?}
     */
    SlkTableComponent.prototype._renderUpdatedColumns = /**
     * Check if the header, data, or footer rows have changed what columns they want to display or
     * whether the sticky states have changed for the header or footer. If there is a diff, then
     * re-render that section.
     * @return {?}
     */
    function () {
        var /** @type {?} */ columnsDiffReducer = function (acc, def) { return acc || !!def.getColumnsDiff(); };
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
    };
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row outlet. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    SlkTableComponent.prototype._switchDataSource = /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row outlet. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
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
    };
    /**
     * Sets up a subscription for the data provided by the data source.
     * @return {?}
     */
    SlkTableComponent.prototype._observeRenderChanges = /**
     * Sets up a subscription for the data provided by the data source.
     * @return {?}
     */
    function () {
        var _this = this;
        // If no data source has been set, there is nothing to observe for changes.
        if (!this.dataSource) {
            return;
        }
        var /** @type {?} */ dataStream;
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
            .subscribe(function (data) {
            _this._data = data || [];
            _this.copyOfData = _this._data.slice();
            _this.renderRows();
        });
    };
    /**
     * Clears any existing content in the header row outlet and creates a new embedded view
     * in the outlet using the header row definition.
     * @return {?}
     */
    SlkTableComponent.prototype._forceRenderHeaderRows = /**
     * Clears any existing content in the header row outlet and creates a new embedded view
     * in the outlet using the header row definition.
     * @return {?}
     */
    function () {
        var _this = this;
        // Clear the header row outlet if any content exists.
        if (this._headerRowOutlet.viewContainer.length > 0) {
            this._headerRowOutlet.viewContainer.clear();
        }
        this._headerRowDefs.forEach(function (def, i) { return _this._renderRow(_this._headerRowOutlet, def, i); });
    };
    /**
     * Clears any existing content in the footer row outlet and creates a new embedded view
     * in the outlet using the footer row definition.
     * @return {?}
     */
    SlkTableComponent.prototype._forceRenderFooterRows = /**
     * Clears any existing content in the footer row outlet and creates a new embedded view
     * in the outlet using the footer row definition.
     * @return {?}
     */
    function () {
        var _this = this;
        // Clear the footer row outlet if any content exists.
        if (this._footerRowOutlet.viewContainer.length > 0) {
            this._footerRowOutlet.viewContainer.clear();
        }
        this._footerRowDefs.forEach(function (def, i) { return _this._renderRow(_this._footerRowOutlet, def, i); });
    };
    /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row defintion, it is returned. otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none reutrn true, retun thedefault row
     * definition
     */
    /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row defintion, it is returned. otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none reutrn true, retun thedefault row
     * definition
     * @param {?} data
     * @param {?} dataIndex
     * @return {?}
     */
    SlkTableComponent.prototype._getRowDefs = /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row defintion, it is returned. otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none reutrn true, retun thedefault row
     * definition
     * @param {?} data
     * @param {?} dataIndex
     * @return {?}
     */
    function (data, dataIndex) {
        if (this._rowDefs.length === 1) {
            return [this._rowDefs[0]];
        }
        var /** @type {?} */ rowDefs = [];
        var /** @type {?} */ rowDef = this._rowDefs.find(function (def) { return def.when && def.when(dataIndex, data); }) || this._defaultRowDef;
        if (rowDef) {
            rowDefs.push(rowDef);
        }
        return rowDefs;
    };
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} renderRow
     * @param {?} renderIndex
     * @return {?}
     */
    SlkTableComponent.prototype._insertRow = /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} renderRow
     * @param {?} renderIndex
     * @return {?}
     */
    function (renderRow, renderIndex) {
        // console.log('render row', renderRow);
        var /** @type {?} */ rowDef = renderRow.rowDef;
        var /** @type {?} */ context = { $implicit: renderRow.data };
        // console.log('context', context);
        this._renderRow(this._rowOutlet, rowDef, renderIndex, context);
    };
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
    SlkTableComponent.prototype._renderRow = /**
     * Creates a new row template in the outlet and fills it with the set of cell templates.
     * Optionally takes a context to provide to the row and cells, as well as an optional index
     * of where to place the new row template in the outlet
     * @param {?} outlet
     * @param {?} rowDef
     * @param {?} index
     * @param {?=} context
     * @return {?}
     */
    function (outlet, rowDef, index, context) {
        if (context === void 0) { context = {}; }
        // console.log('outlet', outlet, rowDef, index, context);
        outlet.viewContainer.createEmbeddedView(rowDef.template, context, index);
        for (var /** @type {?} */ _a = 0, /** @type {?} */ _b = this._getCellTemplates(rowDef); _a < _b.length; _a++) {
            var /** @type {?} */ cellTemplate = _b[_a];
            // console.log('cell template', SlkCellOutletDirective.mostRecentCellOutlet, cellTemplate);
            if (SlkCellOutletDirective.mostRecentCellOutlet) {
                // console.log('create embedded view');
                SlkCellOutletDirective.mostRecentCellOutlet._viewContainer.createEmbeddedView(cellTemplate, context);
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Gets the column definitions for the provided row def.
     * @param {?} rowDef
     * @return {?}
     */
    SlkTableComponent.prototype._getCellTemplates = /**
     * Gets the column definitions for the provided row def.
     * @param {?} rowDef
     * @return {?}
     */
    function (rowDef) {
        var _this = this;
        // console.log('row def', rowDef);
        if (!rowDef || !rowDef.columns) {
            return [];
        }
        // console.log('!rowdef pass', rowDef.columns);
        return Array.from(rowDef.columns, function (columnId) {
            // console.log('columnId', columnId, this._columnDefsByName);
            var /** @type {?} */ column = _this._columnDefsByName.get(columnId);
            // console.log('column', column);
            // if (!column) {
            //     throw getTableUnknownColumnError(columnId);
            // }
            return rowDef.extractCellTemplate(column);
        });
    };
    /**
     * Adds native table sections (e.g tbody) and moves the router outlets into them.
     */
    /**
     * Adds native table sections (e.g tbody) and moves the router outlets into them.
     * @return {?}
     */
    SlkTableComponent.prototype._applyNativeTableSections = /**
     * Adds native table sections (e.g tbody) and moves the router outlets into them.
     * @return {?}
     */
    function () {
        var /** @type {?} */ sections = [
            { tag: 'thead', outlet: this._headerRowOutlet },
            { tag: 'tbody', outlet: this._rowOutlet },
            { tag: 'tfoot', outlet: this._footerRowOutlet }
        ];
        for (var /** @type {?} */ _a = 0, /** @type {?} */ sections_1 = sections; _a < sections_1.length; _a++) {
            var /** @type {?} */ section = sections_1[_a];
            var /** @type {?} */ element = document.createElement(section.tag);
            element.appendChild(section.outlet.elementRef.nativeElement);
            this._elementRef.nativeElement.appendChild(element);
        }
    };
    /**
     * TODO: Move this to a new scroll module later.
     * Adds a scroll event on the grid.
     */
    /**
     * TODO: Move this to a new scroll module later.
     * Adds a scroll event on the grid.
     * @return {?}
     */
    SlkTableComponent.prototype._addScrollEvent = /**
     * TODO: Move this to a new scroll module later.
     * Adds a scroll event on the grid.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ tbody = document.getElementsByTagName('tbody');
        tbody[0].addEventListener('scroll', function (event) {
            // Avoids scroll event to get fired twice.
            event.stopImmediatePropagation();
            _this.onScroll(event);
        });
    };
    // Later change the logic.
    /**
     * @param {?} event
     * @return {?}
     */
    SlkTableComponent.prototype.onScroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ tbodyViewHeight = event.target.offsetHeight;
        var /** @type {?} */ tbodyScrollHeight = event.target.scrollHeight;
        var /** @type {?} */ scrollLocation = event.target.scrollTop;
        // If the user has scrolled to the bottom, send signal via output binding.
        var /** @type {?} */ limit = tbodyScrollHeight - tbodyViewHeight;
        // get total pages.
        var /** @type {?} */ totalPages = this.length / this._data.length;
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
    };
    /**
     * Forces a re-render of the data rows. Should be called in cases where there has been an input
     * change that affects the evaluation of which should be rendered adding/removing row definitions
     * @return {?}
     */
    SlkTableComponent.prototype._forceRenderDataRows = /**
     * Forces a re-render of the data rows. Should be called in cases where there has been an input
     * change that affects the evaluation of which should be rendered adding/removing row definitions
     * @return {?}
     */
    function () {
        this._dataDiffer.diff([]);
        this._rowOutlet.viewContainer.clear();
        this.renderRows();
    };
    SlkTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-table, table[slk-table]',
                    exportAs: 'slkTable',
                    template: SLK_TABLE_TEMPLATE,
                    styles: ["\n      .slk-grid{width:100%}.header-row{background:#fff;text-align:center;min-height:5vh;overflow:hidden;margin:0;padding:0;border-bottom:.1vh solid #e2d9d9}.table-slk-grid{display:block;table-layout:fixed;height:90%;width:96%;margin:2%;border-collapse:collapse;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .3s cubic-bezier(.25,.8,.25,1);background-color:#f3f3f3}.table-slk-grid tbody{height:calc(100% - 5vh);overflow-y:auto;width:100%}.table-slk-grid tbody,.table-slk-grid td,.table-slk-grid th,.table-slk-grid thead,.table-slk-grid tr{display:block}.table-slk-grid tbody td,.table-slk-grid thead th{float:left;align-items:baseline}\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SlkTableComponent.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
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
    return SlkTableComponent;
}());
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
var /** @type {?} */ EXPORTED_DECLARATIONS = [
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
var SlkGridModule = /** @class */ (function () {
    function SlkGridModule() {
    }
    /**
     * @return {?}
     */
    SlkGridModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SlkGridModule
        };
    };
    SlkGridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                    providers: [DirectiveService]
                },] },
    ];
    return SlkGridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ _finalDataSet = [];
/**
 * @param {?} dataSet
 * @param {?} left
 * @param {?} right
 * @return {?}
 */
function swap(dataSet, left, right) {
    // create a temporary reference to swap the object
    var /** @type {?} */ temp = dataSet[left];
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
    var /** @type {?} */ j;
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
    var /** @type {?} */ pivot = dataSet[Math.floor((low + high) / 2)][column].split('')[0].toLowerCase();
    var /** @type {?} */ i = low, /** @type {?} */ j = high;
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
    var /** @type {?} */ length = dataSet.length;
    // calculating the gap
    var /** @type {?} */ gap = Math.floor(length / 2);
    // loop through the array till the gap is less than 0
    while (gap > 0) {
        // decoy
        var /** @type {?} */ j = 0;
        // start the looping at gap and end at length
        for (var /** @type {?} */ i = gap; i < length; i++) {
            // store current dataSet value in temp
            var /** @type {?} */ temp = dataSet[i];
            // j = i;
            var /** @type {?} */ currentStr = void 0;
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
    var /** @type {?} */ i, /** @type {?} */ temp, /** @type {?} */ flag = 1;
    var /** @type {?} */ numLength = dataSet.length;
    var /** @type {?} */ d = numLength;
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

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @template T
 */
var  /**
 * @template T
 */
SlkGridDataSource = /** @class */ (function (_super) {
    __extends$3(SlkGridDataSource, _super);
    function SlkGridDataSource(initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        /**
         * Stream emitting render data to the table (depends on ordered data changes).
         */
        _this._renderData = new BehaviorSubject([]);
        /**
         * Subscription to the changes that should trigger an update to table's rendered row, such
         * as sorting, pagination or base data changes.
         */
        _this._renderChangesSubscription = Subscription.EMPTY;
        /**
         * Gets a sorted copy of the data array based on the state of the SlkSortDirective.
         */
        _this.sortData = function (data, sort, initial) {
            var /** @type {?} */ active = sort.active;
            var /** @type {?} */ direction = sort.direction;
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
        _this._data = new BehaviorSubject(initialData);
        _this._updateChangeSubscription();
        return _this;
    }
    Object.defineProperty(SlkGridDataSource.prototype, "data", {
        /** Array of data that should be rendered by the table */
        get: /**
         * Array of data that should be rendered by the table
         * @return {?}
         */
        function () { return this._data.value; },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) { this._data.next(data); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkGridDataSource.prototype, "sort", {
        /**
         * Instance of the SlkSortDirective used by the table to control its sort
         */
        get: /**
         * Instance of the SlkSortDirective used by the table to control its sort
         * @return {?}
         */
        function () { return this._sort; },
        set: /**
         * @param {?} sort
         * @return {?}
         */
        function (sort) {
            this._sort = sort;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkGridDataSource.prototype, "paginator", {
        get: /**
         * @return {?}
         */
        function () { return this._paginator; },
        set: /**
         * @param {?} paginator
         * @return {?}
         */
        function (paginator) {
            // console.log('paginator', paginator);
            this._paginator = paginator;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkGridDataSource.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () { return this._filter; },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            console.log('filter', filter);
            this._filter = filter;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    /** Subscribe to changes that should trigger an update to the table's rendered rows. */
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows.
     * @return {?}
     */
    SlkGridDataSource.prototype._updateChangeSubscription = /**
     * Subscribe to changes that should trigger an update to the table's rendered rows.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ sortChange = this._sort ?
            merge(this._sort.slkSortChange, this._sort.initialised) :
            of(null);
        var /** @type {?} */ pageChange = this._paginator ?
            merge(this._paginator.page, this._paginator.initialised) :
            of(null);
        var /** @type {?} */ filterChange = this._filter ?
            merge(this._filter.slkFilterChange, this._filter.initialised) :
            of(null);
        var /** @type {?} */ dataStream = this._data;
        // Watch for sort changes to provide ordered data
        var /** @type {?} */ orderedData = combineLatest(dataStream, sortChange)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this._orderData(data);
        }));
        var /** @type {?} */ paginatedData = combineLatest(orderedData, pageChange)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this._pageData(data);
        }));
        var /** @type {?} */ filteredData = combineLatest(paginatedData, filterChange)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this._filterData(data);
        }));
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = filteredData.subscribe(function (data) { return _this._renderData.next(data); });
    };
    /**
     * Returns a sorted copy of the data if SlkSortDirective has a sort applied, otherwise just returns the
     * data array as provided.
     */
    /**
     * Returns a sorted copy of the data if SlkSortDirective has a sort applied, otherwise just returns the
     * data array as provided.
     * @param {?} data
     * @return {?}
     */
    SlkGridDataSource.prototype._orderData = /**
     * Returns a sorted copy of the data if SlkSortDirective has a sort applied, otherwise just returns the
     * data array as provided.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // If there is no active sort or direction then return data.
        if (!this.sort) {
            return data;
        }
        return this.sortData(data.slice(), this.sort, false);
    };
    /**
    * Returns a paged splice of the provided array according to the SlkPaginatorComponent's page
    * index and length;
    */
    /**
     * Returns a paged splice of the provided array according to the SlkPaginatorComponent's page
     * index and length;
     * @param {?} data
     * @return {?}
     */
    SlkGridDataSource.prototype._pageData = /**
     * Returns a paged splice of the provided array according to the SlkPaginatorComponent's page
     * index and length;
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!this.paginator) {
            return data;
        }
        var /** @type {?} */ startIndex = (this.paginator.pageIndex - 1) * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SlkGridDataSource.prototype._filterData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!this.filter) {
            return data;
        }
        // Write following lines in separate function.
        // Takes the new filtered array.
        var /** @type {?} */ filteredDataArray = [];
        if (this._filter.active) {
            console.log('1', this._filter.selectedOptions);
            var /** @type {?} */ key = this._filter.key ? this._filter.key : this._filter.active;
            for (var /** @type {?} */ i = 0; i < data.length; i++) {
                for (var /** @type {?} */ j = 0; j < this._filter.selectedOptions.length; j++) {
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
    };
    /** Used by the SlkTable. Called when it connects to the data source. */
    /**
     * Used by the SlkTable. Called when it connects to the data source.
     * @return {?}
     */
    SlkGridDataSource.prototype.connect = /**
     * Used by the SlkTable. Called when it connects to the data source.
     * @return {?}
     */
    function () { return this._renderData; };
    /** Used by SlkTable, Called when it is destroyed. */
    /**
     * Used by SlkTable, Called when it is destroyed.
     * @return {?}
     */
    SlkGridDataSource.prototype.disconnect = /**
     * Used by SlkTable, Called when it is destroyed.
     * @return {?}
     */
    function () { };
    return SlkGridDataSource;
}(DataSource$1));

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
var SortDirectiveService = /** @class */ (function () {
    function SortDirectiveService() {
        this.direction = new BehaviorSubject('');
        this.finalDir = this.direction.asObservable();
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    SortDirectiveService.prototype.catchFinalDir = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        this.direction.next(dir);
    };
    SortDirectiveService.decorators = [
        { type: Injectable },
    ];
    return SortDirectiveService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Container for SlkSortables to manage the sort state and provide default sort paramters.
 */
var SlkSortDirective = /** @class */ (function () {
    function SlkSortDirective(sortDirService) {
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
    Object.defineProperty(SlkSortDirective.prototype, "direction", {
        get: /**
         * The sort direction of the currently active SlkSortable.
         * @return {?}
         */
        function () { return this._direction; },
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register function to be used by the contained SlkSortables. Adds the SlkSortable to
     * the collection of SlkSortables.
     */
    /**
     * Register function to be used by the contained SlkSortables. Adds the SlkSortable to
     * the collection of SlkSortables.
     * @param {?} sortable
     * @return {?}
     */
    SlkSortDirective.prototype.register = /**
     * Register function to be used by the contained SlkSortables. Adds the SlkSortable to
     * the collection of SlkSortables.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        this.sortables.set(sortable.id, sortable);
    };
    /**
     * Unregister function to be used by the container SlkSortables. Removes the SlkSortable from
     * the collection of contained SlkSortables.
     */
    /**
     * Unregister function to be used by the container SlkSortables. Removes the SlkSortable from
     * the collection of contained SlkSortables.
     * @param {?} sortable
     * @return {?}
     */
    SlkSortDirective.prototype.deregister = /**
     * Unregister function to be used by the container SlkSortables. Removes the SlkSortable from
     * the collection of contained SlkSortables.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        this.sortables.delete(sortable.id);
    };
    /** Sets the active sort id and determines the new sort direction. */
    /**
     * Sets the active sort id and determines the new sort direction.
     * @param {?} sortable
     * @return {?}
     */
    SlkSortDirective.prototype.sort = /**
     * Sets the active sort id and determines the new sort direction.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        var /** @type {?} */ initial = true;
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
    };
    /** Returns the next sort direction of the active sortable. */
    /**
     * Returns the next sort direction of the active sortable.
     * @param {?} sortable
     * @return {?}
     */
    SlkSortDirective.prototype.getNextSortDirection = /**
     * Returns the next sort direction of the active sortable.
     * @param {?} sortable
     * @return {?}
     */
    function (sortable) {
        // Get the sort direction cycle.
        var /** @type {?} */ sortDirectionCycle = getSortDirectionCycle(sortable.start);
        // Get and return the next direction in the cycle.
        var /** @type {?} */ nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    };
    /**
     * @return {?}
     */
    SlkSortDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initialised.next(true);
    };
    /**
     * @return {?}
     */
    SlkSortDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._stateChanges.next();
    };
    /**
     * @return {?}
     */
    SlkSortDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._stateChanges.complete();
        this.initialised.complete();
    };
    SlkSortDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkSort]',
                    exportAs: 'slkSort'
                },] },
    ];
    /** @nocollapse */
    SlkSortDirective.ctorParameters = function () { return [
        { type: SortDirectiveService, },
    ]; };
    SlkSortDirective.propDecorators = {
        "active": [{ type: Input, args: ['slkSortActive',] },],
        "start": [{ type: Input, args: ['slkSortStart',] },],
        "direction": [{ type: Input, args: ['slkSortDirection',] },],
        "slkSortChange": [{ type: Output, args: ['slkSortChange',] },],
    };
    return SlkSortDirective;
}());
/**
 * Returns the sort direction cycle to use given the provided parameters of order and clear.
 * @param {?} start
 * @return {?}
 */
function getSortDirectionCycle(start) {
    var /** @type {?} */ sortOrder = ['asc', 'desc'];
    if (start === 'desc') {
        sortOrder.reverse();
    }
    return sortOrder;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlkSortHeaderComponent = /** @class */ (function () {
    function SlkSortHeaderComponent(
    // changeDetectorRef: ChangeDetectorRef,
    _sort, _slkColumnDef, renderer, sortDirService) {
        this._sort = _sort;
        this._slkColumnDef = _slkColumnDef;
        this.renderer = renderer;
        this.sortDirService = sortDirService;
    }
    /** Click event. When clicked will sort the data passing reference of this component to sort directive. */
    /**
     * Click event. When clicked will sort the data passing reference of this component to sort directive.
     * @return {?}
     */
    SlkSortHeaderComponent.prototype.onSort = /**
     * Click event. When clicked will sort the data passing reference of this component to sort directive.
     * @return {?}
     */
    function () {
        var _this = this;
        this._sort.sort(this);
        this.sortDirService.finalDir
            .pipe(take(1))
            .subscribe(function (direction) {
            switch (direction) {
                case 'asc':
                    _this.renderer.removeClass(_this.sortBtn.nativeElement, 'slk-sort-header-pointer-down');
                    _this.renderer.addClass(_this.sortBtn.nativeElement, 'slk-sort-header-pointer-up');
                    return;
                case 'desc':
                    _this.renderer.removeClass(_this.sortBtn.nativeElement, 'slk-sort-header-pointer-up');
                    _this.renderer.addClass(_this.sortBtn.nativeElement, 'slk-sort-header-pointer-down');
                    return;
                default:
                    _this.renderer.addClass(_this.sortBtn.nativeElement, 'slk-sort-header-pointer-down');
                    return;
            }
        });
    };
    /**
     * @return {?}
     */
    SlkSortHeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.id && this._slkColumnDef) {
            this.id = this._slkColumnDef.name;
        }
        this._sort.register(this);
    };
    /**
     * @return {?}
     */
    SlkSortHeaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._sort.deregister(this);
        // this._rerenderSubscription.unsubscribe();
    };
    /** Returns the animation state for the arrow direction. */
    /**
     * Returns the animation state for the arrow direction.
     * @return {?}
     */
    SlkSortHeaderComponent.prototype._isSorted = /**
     * Returns the animation state for the arrow direction.
     * @return {?}
     */
    function () {
        return this._sort.active === this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc');
    };
    SlkSortHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: '[slk-sort-header]',
                    exportAs: 'sortHeader',
                    template: "\n      <div class=\"slk-sort-header-container\">\n\n          <button (click)=\"onSort()\" class=\"slk-sort-header-button\" type=\"button\"> \n\n              <ng-content></ng-content>\n\n              <div class=\"slk-sort-header-pointer\">\n                  <div #sortBtn class=\"slk-sort-header-pointer-design\">\n                \n                  </div>\n              </div>\n          </button>\n\n          <div class=\"filter-header-wrapper\">\n              <ng-content select=\"slk-filter-header\"></ng-content>\n          </div>\n    \n      </div>\n    ",
                    styles: ["\n      .slk-sort-header-container{display:flex;cursor:pointer;align-items:center}.slk-sort-header-disabled .slk-sort-header-container{cursor:default}.slk-sort-header-button{margin:auto!important;border:none;background:0 0;display:flex;align-items:center;padding:0;cursor:inherit;outline:0;font:inherit;color:currentColor}.slk-sort-header-pointer{height:12px;width:12px;position:relative;display:flex}.slk-sort-header-pointer-down{border-top:5px solid #555}.slk-sort-header-pointer-down,.slk-sort-header-pointer-up{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;margin:auto;display:flex;align-items:center}.slk-sort-header-pointer-up{border-bottom:5px solid #000}.sort-header-wrapper{align-content:center}\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SlkSortHeaderComponent.ctorParameters = function () { return [
        { type: SlkSortDirective, decorators: [{ type: Optional },] },
        { type: SlkColumnDefDirective, decorators: [{ type: Optional },] },
        { type: Renderer2, },
        { type: SortDirectiveService, },
    ]; };
    SlkSortHeaderComponent.propDecorators = {
        "id": [{ type: Input, args: ['slk-sort-header',] },],
        "start": [{ type: Input },],
        "sortBtn": [{ type: ViewChild, args: ['sortBtn',] },],
    };
    return SlkSortHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlkSortModule = /** @class */ (function () {
    function SlkSortModule() {
    }
    /**
     * @return {?}
     */
    SlkSortModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SlkSortModule
        };
    };
    SlkSortModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [SlkSortDirective, SlkSortHeaderComponent],
                    declarations: [SlkSortDirective, SlkSortHeaderComponent],
                    providers: [SortDirectiveService]
                },] },
    ];
    return SlkSortModule;
}());

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
var  /**
 * @template T
 */
SlkTreeNodeOutletContext = /** @class */ (function () {
    function SlkTreeNodeOutletContext(data) {
        this.$implicit = data;
    }
    return SlkTreeNodeOutletContext;
}());
/**
 * Data node defintion for the SlkTreeComponent.
 * Captures the node's template
 * @template T
 */
var SlkTreeNodeDefDirective = /** @class */ (function () {
    function SlkTreeNodeDefDirective(template, viewContainer) {
        this.template = template;
        this.viewContainer = viewContainer;
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
    SlkTreeNodeDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    return SlkTreeNodeDefDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlkTreeNodeOutletDirective = /** @class */ (function () {
    function SlkTreeNodeOutletDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    SlkTreeNodeOutletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkTreeNodeOutlet]'
                },] },
    ];
    /** @nocollapse */
    SlkTreeNodeOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return SlkTreeNodeOutletDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var SlkTreeTextOutletDirective = /** @class */ (function () {
    function SlkTreeTextOutletDirective() {
        SlkTreeTextOutletDirective.mostRecentTreeTextOutlet = /** @type {?} */ (this);
    }
    Object.defineProperty(SlkTreeTextOutletDirective.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkTreeTextOutletDirective.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () { return this._context; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    SlkTreeTextOutletDirective.mostRecentTreeTextOutlet = null;
    SlkTreeTextOutletDirective.decorators = [
        { type: Directive, args: [{ selector: '[slkTreeTextOutlet]' },] },
    ];
    /** @nocollapse */
    SlkTreeTextOutletDirective.ctorParameters = function () { return []; };
    return SlkTreeTextOutletDirective;
}());
var SlkTreeActionDirective = /** @class */ (function () {
    function SlkTreeActionDirective(viewContainer, elementRef, renderer) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
        this.renderer = renderer;
        renderer.setStyle(elementRef.nativeElement, 'backgroundColor', '#e2e0e0');
    }
    /**
     * @return {?}
     */
    SlkTreeActionDirective.prototype.onMouseOver = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ el = this.elementRef.nativeElement.querySelector('.actions');
        this.renderer.setStyle(el, 'visibility', 'visible');
    };
    /**
     * @return {?}
     */
    SlkTreeActionDirective.prototype.onMouseOut = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ el = this.elementRef.nativeElement.querySelector('.actions');
        this.renderer.setStyle(el, 'visibility', 'hidden');
    };
    SlkTreeActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkAction]',
                },] },
    ];
    /** @nocollapse */
    SlkTreeActionDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    SlkTreeActionDirective.propDecorators = {
        "on": [{ type: Input },],
        "onMouseOver": [{ type: HostListener, args: ['mouseover',] },],
        "onMouseOut": [{ type: HostListener, args: ['mouseout',] },],
    };
    return SlkTreeActionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Tree node for SlkTreeComponent.
 * @template T
 */
var SlkTreeNodeDirective = /** @class */ (function () {
    function SlkTreeNodeDirective(_elementRef, _tree) {
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
    Object.defineProperty(SlkTreeNodeDirective.prototype, "data", {
        /** The tree node's data. */
        get: /**
         * The tree node's data.
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // console.log('value', value);
            this._data = value;
            this._setRoleFromData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkTreeNodeDirective.prototype, "isExpanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tree.treeControl.isExpanded(this._data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkTreeNodeDirective.prototype, "level", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tree.treeControl.getLevel ? this._tree.treeControl.getLevel(this._data) : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlkTreeNodeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /**
     * @return {?}
     */
    SlkTreeNodeDirective.prototype._setRoleFromData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._tree.treeControl.isExpandable) {
            this.role = this._tree.treeControl.isExpandable(this._data) ? 'group' : 'treeitem';
        }
        else {
            if (!this._tree.treeControl.getChildren) ;
            this._tree.treeControl.getChildren(this._data).pipe(takeUntil(this._destroyed))
                .subscribe(function (children) {
                _this.role = children && children.length ? 'group' : 'treeitem';
            });
        }
    };
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
    SlkTreeNodeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: SlkTreeComponent, },
    ]; };
    SlkTreeNodeDirective.propDecorators = {
        "role": [{ type: Input },],
    };
    return SlkTreeNodeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Slk tree component that connects with a data source to retrieve data of type T and
 * renders dataNodes with heirarchy.
 * @template T
 */
var SlkTreeComponent = /** @class */ (function () {
    function SlkTreeComponent(_differs, _changeDetectorRef) {
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
    Object.defineProperty(SlkTreeComponent.prototype, "dataSource", {
        get: /**
         * Provides a stream containing the latest data array to render. Influenced
         * by the tree's stream of view window.
         * @return {?}
         */
        function () {
            // console.log('_dataSource', this._dataSource);
            return this._dataSource;
        },
        set: /**
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            // console.log('_______dataSource', dataSource);
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlkTreeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._dataDiffer = this._differs.find([]).create(this.trackBy);
    };
    /**
     * @return {?}
     */
    SlkTreeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    SlkTreeComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultNodeDefs = this._nodeDefs.filter(function (def) { return !def.when; });
        // console.log('defaultnodedef', defaultNodeDefs);
        this._defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this._nodeDefs && !this._dataSubscription) {
            // console.log('enter');
            this._observeRenderChanges();
        }
    };
    /**
     * @param {?} dataSource
     * @return {?}
     */
    SlkTreeComponent.prototype._switchDataSource = /**
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
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
    };
    /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    SlkTreeComponent.prototype._observeRenderChanges = /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ dataStream;
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
                .subscribe(function (data) { return _this._renderNodeChanges(data); });
        }
    };
    /** Check for changes made in the data nd render each change. */
    /**
     * Check for changes made in the data nd render each change.
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    SlkTreeComponent.prototype._renderNodeChanges = /**
     * Check for changes made in the data nd render each change.
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    function (data, dataDiffer, viewContainer, parentData) {
        var _this = this;
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
        var /** @type {?} */ changes = dataDiffer.diff(data);
        // console.log('changes', changes);
        if (!changes) {
            return;
        }
        changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
            // console.log('tes', item, adjustedPreviousIndex, currentIndex);
            // console.log('currentIndex', currentIndex);
            if (item.previousIndex === null) {
                _this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex === null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                var /** @type {?} */ view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this._changeDetectorRef.detectChanges();
    };
    /**
     * finds the matchin node defintion that should be used for this node data
     */
    /**
     * finds the matchin node defintion that should be used for this node data
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    SlkTreeComponent.prototype._getNodeDef = /**
     * finds the matchin node defintion that should be used for this node data
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    function (data, i) {
        if (this._nodeDefs.length === 1) {
            return this._nodeDefs.first;
        }
        var /** @type {?} */ nodeDef = this._nodeDefs.find(function (def) { return def.when && def.when(i, data); }) || this._defaultNodeDef;
        return nodeDef;
    };
    /**
     * Create the embedded view for the data node template and place it in the correct index
     * within the data node view container.
     */
    /**
     * Create the embedded view for the data node template and place it in the correct index
     * within the data node view container.
     * @param {?} nodeData
     * @param {?} index
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    SlkTreeComponent.prototype.insertNode = /**
     * Create the embedded view for the data node template and place it in the correct index
     * within the data node view container.
     * @param {?} nodeData
     * @param {?} index
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    function (nodeData, index, viewContainer, parentData) {
        var /** @type {?} */ node = this._getNodeDef(nodeData, index);
        /** Gets all the view container ref to check the index of view ref for drag and drop. */
        this.viewContainerRef.push(viewContainer);
        // Node context that will be provided to created embedded view
        var /** @type {?} */ context = new SlkTreeNodeOutletContext(nodeData);
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
        var /** @type {?} */ container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
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
    };
    /**
     * Emits a event for re ordered data.
     * @param {?} data
     * @return {?}
     */
    SlkTreeComponent.prototype.reorderedData = /**
     * Emits a event for re ordered data.
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.reorderData.emit(data);
    };
    SlkTreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-tree',
                    exportAs: 'slkTree',
                    template: '<ng-container slkTreeNodeOutlet></ng-container>',
                    styles: ["\n      .tree-node-wrapper{cursor:pointer;position:relative;margin-top:20px;width:100%;height:35px;border:1px solid #e2e0e0}.actions{width:70px;position:absolute;display:flex;flex-direction:row;justify-content:space-between;bottom:0;right:0;padding-bottom:20px;padding-right:20px}.icon-plus:after{width:8px;height:2px;top:7px;left:4px}.icon-plus:after,.icon-plus:before{flex:1;background-color:#7e3232;border-radius:1px;-webkit-border-radius:1px;-moz-border-radius:1px;position:absolute;content:\"\"}.icon-plus:before{width:2px;height:8px;top:4px;left:7px}.edit.icon{flex:1;color:#000;position:absolute;margin-left:4px;margin-top:7px;width:14px;height:2px;border-radius:1px;border:1px solid #7e3232;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.edit.icon:before{flex:1;content:\"\";position:absolute;left:-12px;top:-1px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid currentColor;border-top:2px solid transparent;border-bottom:2px solid transparent}.trash.icon{flex:1;color:#000;position:absolute;margin-left:5px;margin-top:7px;width:9px;height:10px;border-left:1px solid #7e3232;border-right:1px solid #7e3232;border-bottom:1px solid #7e3232;border-radius:0 0 2px 2px}.trash.icon:before{flex:1;content:\"\";position:absolute;left:-4px;top:-2px;width:17px;height:1px;background-color:#7e3232}.trash.icon:after{flex:1;content:\"\";position:absolute;left:0;top:-5px;width:7px;height:2px;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor;border-radius:4px 4px 0 0}.toggle{float:left;padding-top:15px;margin-right:10px}.toggle-wrapper{border:solid #000;border-width:0 3px 3px 0;display:inline-block;padding:3px}.expand{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.collapse{transform:rotate(45deg);-webkit-transform:rotate(45deg)}\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SlkTreeComponent.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
    ]; };
    SlkTreeComponent.propDecorators = {
        "class": [{ type: HostBinding, args: ['class',] },],
        "dataSource": [{ type: Input },],
        "treeControl": [{ type: Input },],
        "trackBy": [{ type: Input },],
        "reorderData": [{ type: Output, args: ['reorderData',] },],
        "_nodeOutlet": [{ type: ViewChild, args: [SlkTreeNodeOutletDirective,] },],
        "_nodeDefs": [{ type: ContentChildren, args: [SlkTreeNodeDefDirective,] },],
    };
    return SlkTreeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ viewRefKey = 'view-ref';
var /** @type {?} */ viewRefContainer = 'view-ref-container';
var /** @type {?} */ dataNode = 'dataNode';
var ActionsService = /** @class */ (function () {
    function ActionsService() {
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
    ActionsService.prototype.onActChange = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.addAction.next(changes);
    };
    /**
     * This method is an observables based in-memory cache implementation
     * Keeps track of in flight observablesand sets a default expory for cached values
     */
    /**
     * Gets the value from the cache if the key is provided.
     * If no value exists in cache, then chcek if the call exists
     * in flight, if so return the subejct, If not create a new
     * Subject inFlightObservble and return the source obseravble.
     */
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
    ActionsService.prototype.get = /**
     * Gets the value from the cache if the key is provided.
     * If no value exists in cache, then chcek if the call exists
     * in flight, if so return the subejct, If not create a new
     * Subject inFlightObservble and return the source obseravble.
     * @param {?} key
     * @param {?=} fallback
     * @param {?=} maxAge
     * @return {?}
     */
    function (key, fallback, maxAge) {
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
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} maxAge
     * @return {?}
     */
    ActionsService.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} maxAge
     * @return {?}
     */
    function (key, value, maxAge) {
        if (maxAge === void 0) { maxAge = this.DEFAULT_MAX_AGE; }
        this.cache.set(key, { data: value, expiry: Date.now() + maxAge });
        this.notifyInFlightObservers(key, value);
    };
    /**
     * Checks if the key exists in cache
     */
    /**
     * Checks if the key exists in cache
     * @param {?} key
     * @return {?}
     */
    ActionsService.prototype.has = /**
     * Checks if the key exists in cache
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.cache.has(key);
    };
    /**
     * Publishes the value to all observers of the given
     * in progress observables if observers exist.
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    ActionsService.prototype.notifyInFlightObservers = /**
     * Publishes the value to all observers of the given
     * in progress observables if observers exist.
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        if (this.inFlightObseravbles.has(key)) {
            var /** @type {?} */ inFlight = this.inFlightObseravbles.get(key);
            var /** @type {?} */ observersCount = inFlight.observers.length;
            if (observersCount) {
                inFlight.next(value);
            }
            inFlight.complete();
            this.inFlightObseravbles.delete(key);
        }
    };
    /**
     * Checks if key exists and has not expired
     * @param {?} key
     * @return {?}
     */
    ActionsService.prototype.hasValidCachedValue = /**
     * Checks if key exists and has not expired
     * @param {?} key
     * @return {?}
     */
    function (key) {
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
    };
    ActionsService.decorators = [
        { type: Injectable },
    ];
    return ActionsService;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @template T
 */
var SlkNestedTreeNodeDirective = /** @class */ (function (_super) {
    __extends$4(SlkNestedTreeNodeDirective, _super);
    function SlkNestedTreeNodeDirective(_elementRef, _tree, _differs, _viewContainer, renderer, actionService) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this._differs = _differs;
        _this._viewContainer = _viewContainer;
        _this.renderer = renderer;
        _this.actionService = actionService;
        return _this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        /**
         * after drop event is fired get a reference of parent view container ref and its data
         */
        var /** @type {?} */ nodeContext = JSON.parse(event.dataTransfer.getData('nodeContext'));
        /** Embeds the view when dropped to the dropped view container ref. */
        this._embedView(nodeContext, this._viewContainer.injector);
        /** Removes the dragged view ref from view container ref */
        // this._removeView();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this._elementRef.nativeElement, 'display', 'block');
        this.renderer.setStyle(this._elementRef.nativeElement, 'padding-left', '40px');
    };
    /**
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
        // data coming from the parent class as mostRecentDataNode
        this._tree.treeControl.getChildren(this.data)
            .pipe(takeUntil(this._destroyed))
            .subscribe(function (result) {
            // console.log('result', result);
            // console.log('result', result);
            _this._children = result;
            _this.updateChildrenNodes();
        });
        this.nodeOutlet.changes.pipe(takeUntil(this._destroyed))
            .subscribe(function (_) { return _this.updateChildrenNodes(); });
    };
    /**
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._clear();
        _super.prototype.ngOnDestroy.call(this);
    };
    /** Add children dataNodes to the NodeOutlet */
    /**
     * Add children dataNodes to the NodeOutlet
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.updateChildrenNodes = /**
     * Add children dataNodes to the NodeOutlet
     * @return {?}
     */
    function () {
        if (this.nodeOutlet.length && this._children) {
            var /** @type {?} */ viewContainer = this.nodeOutlet.first.viewContainer;
            this._tree._renderNodeChanges(this._children, this._dataDiffer, viewContainer, this._data);
        }
        else {
            // Reset the data differ if theres no children nodes displated
            this._dataDiffer.diff([]);
        }
    };
    /** Embeds a view at the drop point */
    /**
     * Embeds a view at the drop point
     * @param {?} context
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype._embbedView = /**
     * Embeds a view at the drop point
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this._viewContainer.createEmbeddedView(this._tree._defaultNodeDef.template, context);
        SlkTreeNodeDirective.mostRecentTreeNode.data = context.$implicit;
    };
    /** Embeds a view at the drop point */
    /**
     * Embeds a view at the drop point
     * @param {?} context
     * @param {?} containerRef
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype._embedView = /**
     * Embeds a view at the drop point
     * @param {?} context
     * @param {?} containerRef
     * @return {?}
     */
    function (context, containerRef) {
        var _this = this;
        /**
         * Finds the dropped container view ref from the collected embedded view ref.
         */
        var /** @type {?} */ containerRefToEmbed;
        for (var /** @type {?} */ i = 0; i < this._tree.viewContainerRef.length; i++) {
            // Check for the embedded view ref inside the array to match with context
            for (var /** @type {?} */ j = 0; j < this._tree.viewContainerRef[i]._embeddedViews.length; j++) {
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
        var /** @type {?} */ droppedViewRef;
        for (var /** @type {?} */ i = 0; i < this._tree.cacheEmbeddedViewRef.length; i++) {
            if (this._tree.cacheEmbeddedViewRef[i].context === containerRef.view.context) {
                droppedViewRef = this._tree.cacheEmbeddedViewRef[i];
            }
        }
        /** Gets the view ref of the dragged object. */
        this.actionService.get(viewRefKey)
            .pipe(takeUntil(this._destroyed))
            .subscribe(function (_viewRef) {
            // Get index of dropped view ref
            var /** @type {?} */ index = containerRefToEmbed.indexOf(droppedViewRef);
            /** Moves the view ref into the view container ref of drop point. */
            containerRefToEmbed.move(_viewRef, index);
            /** Emits a event for re ordered data. */
            /** Emits a event for re ordered data. */
            _this.reorderData(containerRefToEmbed._embeddedViews);
        });
    };
    /** Removes the view from the drag point */
    /**
     * Removes the view from the drag point
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype._removeView = /**
     * Removes the view from the drag point
     * @return {?}
     */
    function () {
        var _this = this;
        // let currentViewRef: EmbeddedViewRef<any>,
        var /** @type {?} */ currentViewContainerRef;
        this.actionService.get(viewRefContainer)
            .pipe(takeUntil(this._destroyed))
            .subscribe(function (_viewContainerRef) {
            currentViewContainerRef = _viewContainerRef;
            var /** @type {?} */ index = currentViewContainerRef.indexOf(_this._droppedViewRef);
            currentViewContainerRef.remove(index);
        });
    };
    /**
     * Sends data back to the user to re order the data.
     * @param {?} viewRef
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype.reorderData = /**
     * Sends data back to the user to re order the data.
     * @param {?} viewRef
     * @return {?}
     */
    function (viewRef) {
        var /** @type {?} */ _reorderData = [];
        for (var /** @type {?} */ i = 0; i < viewRef.length; i++) {
            _reorderData.push(viewRef[i].context.$implicit);
        }
        /** Sends a signal to tree component re order data method. */
        this._tree.reorderedData(_reorderData);
    };
    /** Clear the children dataNodes */
    /**
     * Clear the children dataNodes
     * @return {?}
     */
    SlkNestedTreeNodeDirective.prototype._clear = /**
     * Clear the children dataNodes
     * @return {?}
     */
    function () {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this._dataDiffer.diff([]);
        }
    };
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
    SlkNestedTreeNodeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: SlkTreeComponent, },
        { type: IterableDiffers, },
        { type: ViewContainerRef, },
        { type: Renderer2, },
        { type: ActionsService, decorators: [{ type: Optional },] },
    ]; };
    SlkNestedTreeNodeDirective.propDecorators = {
        "nodeOutlet": [{ type: ContentChildren, args: [SlkTreeNodeOutletDirective,] },],
        "drop": [{ type: HostListener, args: ['drop', ['$event'],] },],
        "onDragOver": [{ type: HostListener, args: ['dragover', ['$event'],] },],
    };
    return SlkNestedTreeNodeDirective;
}(SlkTreeNodeDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
BaseTreeControl = /** @class */ (function () {
    function BaseTreeControl() {
        /**
         * A Selection model with multi-selection to track expansion status.
         */
        this.expansionModel = new SelectionModel(true);
    }
    /** Toggles one single data node;s expanded/collapsed state. */
    /**
     * Toggles one single data node;s expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.toggle = /**
     * Toggles one single data node;s expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        this.expansionModel.toggle(dataNode);
    };
    /** Expands one single data node. */
    /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.expand = /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        this.expansionModel.select(dataNode);
    };
    /** Collapses one single data node. */
    /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.collapse = /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        this.expansionModel.deselect(dataNode);
    };
    /** Whether a given data node is expanded or not. */
    /**
     * Whether a given data node is expanded or not.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.isExpanded = /**
     * Whether a given data node is expanded or not.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        return this.expansionModel.isSelected(dataNode);
    };
    /** Toggles a subtree rooted at node recursively */
    /**
     * Toggles a subtree rooted at node recursively
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.toggleDescendants = /**
     * Toggles a subtree rooted at node recursively
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    };
    /** Collapse all dataNodes in the tree. */
    /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    BaseTreeControl.prototype.collapseAll = /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    function () {
        this.expansionModel.clear();
    };
    /** Expands a subtree rooted at given data node recursively. */
    /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.expandDescendants = /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        var /** @type {?} */ toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).select.apply(_a, toBeProcessed);
        var _a;
    };
    /** Collapses a subtree rooted at given data node recursively. */
    /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.collapseDescendants = /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        var /** @type {?} */ toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).deselect.apply(_a, toBeProcessed);
        var _a;
    };
    return BaseTreeControl;
}());

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @template T
 */
var  /**
 * @template T
 */
NestedTreeControl = /** @class */ (function (_super) {
    __extends$5(NestedTreeControl, _super);
    function NestedTreeControl(getChildren) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        return _this;
    }
    /** Expands all dataNodes in the tree. */
    /**
     * Expands all dataNodes in the tree.
     * @return {?}
     */
    NestedTreeControl.prototype.expandAll = /**
     * Expands all dataNodes in the tree.
     * @return {?}
     */
    function () {
        var _this = this;
        this.expansionModel.clear();
        var /** @type {?} */ allNodes = this.dataNodes.reduce(function (accumulator, dataNode) {
            return accumulator.concat(_this.getDescendants(dataNode), [dataNode]);
        }, []);
        (_a = this.expansionModel).select.apply(_a, allNodes);
        var _a;
    };
    /** Get a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    /**
     * Get a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    NestedTreeControl.prototype.getDescendants = /**
     * Get a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        var /** @type {?} */ descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    };
    /** A helper function to get descendants recursively. */
    /**
     * A helper function to get descendants recursively.
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    NestedTreeControl.prototype._getDescendants = /**
     * A helper function to get descendants recursively.
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    function (descendants, dataNode) {
        var _this = this;
        descendants.push(dataNode);
        this.getChildren(dataNode).pipe(take(1)).subscribe(function (children) {
            if (children && children.length > 0) {
                children.forEach(function (child) { return _this._getDescendants(descendants, child); });
            }
        });
    };
    return NestedTreeControl;
}(BaseTreeControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SlkContentActionContext = /** @class */ (function () {
    function SlkContentActionContext() {
        this.$implicit = null;
        this.appContentAction = null;
    }
    return SlkContentActionContext;
}());
/**
 * @template T
 */
var SlkTreeNodeTextComponent = /** @class */ (function (_super) {
    __extends$6(SlkTreeNodeTextComponent, _super);
    function SlkTreeNodeTextComponent(actionService, nestedNode, treeComponent) {
        var _this = _super.call(this) || this;
        _this.actionService = actionService;
        _this.nestedNode = nestedNode;
        _this.treeComponent = treeComponent;
        _this._onDestroy = new Subject();
        _this.isAction = false;
        _this.nodeMap = new Map();
        _this.isExpandable = function (node) { return node.expandable; };
        _this.collapse = false;
        _this.nestedTreeControl = new NestedTreeControl(_this.isExpandable);
        return _this;
    }
    /**
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.actionService.onAdd
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (result) {
            _this.isAction = result;
        });
        if (this.data && this.data.hasOwnProperty('children')) {
            this.expand = true;
        }
        else {
            this.expand = false;
        }
    };
    /**
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.onToggle = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?=} node
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.onAdd = /**
     * @param {?=} node
     * @return {?}
     */
    function (node) {
        if (node === void 0) { node = this.data; }
        // send a signal to the parent directive and make the directive
        // aware about type of action.
        // internally update dataSource as well
        var /** @type {?} */ parentNode = this.nodeMap.get(node);
        node.children.push({});
        var /** @type {?} */ tree = this.treeComponent.dataSource;
        tree.push(node);
        this.treeComponent.dataSource = tree.slice();
        console.log('tree', tree);
        this.nestedTreeControl.expand(node);
    };
    /**
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.onDestroy = /**
     * @return {?}
     */
    function () {
        console.log('on destroy');
        this.actionService.onActChange(false);
    };
    /**
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.onEdit = /**
     * @return {?}
     */
    function () {
        console.log('on edit');
        this.actionService.onActChange(true);
    };
    /** Drag and drop, have ViewContainers and move the view from one ViewContainer to other */
    /**
     * Drag and drop, have ViewContainers and move the view from one ViewContainer to other
     * @param {?} event
     * @return {?}
     */
    SlkTreeNodeTextComponent.prototype.drag = /**
     * Drag and drop, have ViewContainers and move the view from one ViewContainer to other
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ currentViewContainerRef;
        for (var /** @type {?} */ i = 0; i < this.treeComponent.viewContainerRef.length; i++) {
            for (var /** @type {?} */ j = 0; j < this.treeComponent.viewContainerRef[i]._embeddedViews.length; j++) {
                if (this.treeComponent.viewContainerRef[i]._embeddedViews[j].context === this.context) {
                    currentViewContainerRef = this.treeComponent.viewContainerRef[i];
                    break;
                }
            }
        }
        var /** @type {?} */ currentViewRef;
        for (var /** @type {?} */ i = 0; i < this.treeComponent.cacheEmbeddedViewRef.length; i++) {
            if (this.treeComponent.cacheEmbeddedViewRef[i].context === this.context) {
                currentViewRef = this.treeComponent.cacheEmbeddedViewRef[i];
                break;
            }
        }
        event.dataTransfer.setData('nodeContext', JSON.stringify(this.context));
        /** Sets the current view ref and view container ref in the cache. */
        this.actionService.set(viewRefKey, currentViewRef);
        this.actionService.set(viewRefContainer, currentViewContainerRef);
    };
    SlkTreeNodeTextComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-tree-nest-text',
                    template: "\n      <div class=\"tree-node-wrapper\" appAction draggable=\"true\" (dragstart)=\"drag($event)\">\n\n          <div class=\"toggle\" (click)=\"onToggle()\">\n\n              <i [ngClass]=\"{'expand' : expand, 'toggle-wrapper' : expand}\"></i>\n\n              <i [ngClass]=\"{'collapse' : collapse, 'toggle-wrapper' : collapse}\"></i>\n\n          </div>\n\n          <!-- <ng-container *appContentAction=\"isAction; else noAction\"> -->\n          <!-- <input type=\"text\"> -->\n          <!-- </ng-container> -->\n\n          <!-- <ng-template #noAction> -->\n          <ng-content></ng-content>\n          <!-- </ng-template> -->\n\n          <div class=\"actions\" [style.visibility]=\"'hidden'\">\n\n              <div (click)=\"onAdd()\">\n                  <div class=\"icon icon-plus\"></div>\n              </div>\n\n              <div (click)=\"onDestroy()\">\n                  <div class=\"trash icon\"></div>\n              </div>\n\n              <div (click)=\"onEdit()\">\n                  <div class=\"edit icon\"></div>\n              </div>\n\n          </div>\n\n      </div>\n    ",
                    // template: ` <ng-container [ngTemplateOutlet]="template"></ng-container>`,
                    // take the reference of child and pass it to ng-container
                    styles: ["\n      .tree-node-wrapper{cursor:pointer;position:relative;margin-top:20px;width:100%;height:35px;border:1px solid #e2e0e0}.actions{width:70px;position:absolute;display:flex;flex-direction:row;justify-content:space-between;bottom:0;right:0;padding-bottom:20px;padding-right:20px}.icon-plus:after{width:8px;height:2px;top:7px;left:4px}.icon-plus:after,.icon-plus:before{flex:1;background-color:#7e3232;border-radius:1px;-webkit-border-radius:1px;-moz-border-radius:1px;position:absolute;content:\"\"}.icon-plus:before{width:2px;height:8px;top:4px;left:7px}.edit.icon{flex:1;color:#000;position:absolute;margin-left:4px;margin-top:7px;width:14px;height:2px;border-radius:1px;border:1px solid #7e3232;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.edit.icon:before{flex:1;content:\"\";position:absolute;left:-12px;top:-1px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid currentColor;border-top:2px solid transparent;border-bottom:2px solid transparent}.trash.icon{flex:1;color:#000;position:absolute;margin-left:5px;margin-top:7px;width:9px;height:10px;border-left:1px solid #7e3232;border-right:1px solid #7e3232;border-bottom:1px solid #7e3232;border-radius:0 0 2px 2px}.trash.icon:before{flex:1;content:\"\";position:absolute;left:-4px;top:-2px;width:17px;height:1px;background-color:#7e3232}.trash.icon:after{flex:1;content:\"\";position:absolute;left:0;top:-5px;width:7px;height:2px;border-left:1px solid currentColor;border-right:1px solid currentColor;border-top:1px solid currentColor;border-radius:4px 4px 0 0}.toggle{float:left;padding-top:15px;margin-right:10px}.toggle-wrapper{border:solid #000;border-width:0 3px 3px 0;display:inline-block;padding:3px}.expand{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.collapse{transform:rotate(45deg);-webkit-transform:rotate(45deg)}\n    "],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SlkTreeNodeTextComponent.ctorParameters = function () { return [
        { type: ActionsService, },
        { type: SlkNestedTreeNodeDirective, },
        { type: SlkTreeComponent, },
    ]; };
    return SlkTreeNodeTextComponent;
}(SlkTreeTextOutletDirective));
/**
 * Directive
 */
var SlkAddActionDirective = /** @class */ (function () {
    function SlkAddActionDirective(renderer, templateRef, viewContainer) {
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
    Object.defineProperty(SlkAddActionDirective.prototype, "appContentAction", {
        set: /**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            this._context.$implicit = this._context.appContentAction = condition;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkAddActionDirective.prototype, "appContentActionElse", {
        set: /**
         * @param {?} templateRef
         * @return {?}
         */
        function (templateRef) {
            this._elseTemplateRef = templateRef;
            this._elseViewRef = null;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlkAddActionDirective.prototype._updateView = /**
     * @return {?}
     */
    function () {
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
    };
    SlkAddActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkContentAction]'
                },] },
    ];
    /** @nocollapse */
    SlkAddActionDirective.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    SlkAddActionDirective.propDecorators = {
        "appContentAction": [{ type: Input },],
        "appContentActionElse": [{ type: Input },],
    };
    return SlkAddActionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ EXPORTED_DECLARATIONS$1 = [
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
var SlkTreeModule = /** @class */ (function () {
    function SlkTreeModule() {
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
    return SlkTreeModule;
}());

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
var SlkNavDirective = /** @class */ (function () {
    function SlkNavDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    SlkNavDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkNavigator]'
                },] },
    ];
    /** @nocollapse */
    SlkNavDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return SlkNavDirective;
}());
var SlkPageIndexDirective = /** @class */ (function () {
    function SlkPageIndexDirective(templateRef) {
        this.templateRef = templateRef;
    }
    SlkPageIndexDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkPageIndex]'
                },] },
    ];
    /** @nocollapse */
    SlkPageIndexDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return SlkPageIndexDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Reference code
 */
var /** @type {?} */ PAGINATOR_CHILD_TEMPLATE = "<ng-container slkNavigator></ng-container>";
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
var  /**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
PageEvent = /** @class */ (function () {
    function PageEvent() {
    }
    return PageEvent;
}());
/**
 * @template T
 */
var  /**
 * @template T
 */
PaginatorContext = /** @class */ (function () {
    function PaginatorContext(data) {
        this.$implicit = data;
    }
    return PaginatorContext;
}());
var /** @type {?} */ count = 0;
var /** @type {?} */ actualCount = 0;
var /** @type {?} */ viewContainerRef = 'view-container-ref';
/**
 * TODO:- Put Comments After every line
 */
var SlkPaginatorChildComponent = /** @class */ (function () {
    function SlkPaginatorChildComponent(_differs, cacheService) {
        this._differs = _differs;
        this.cacheService = cacheService;
        this.viewRefCollection = [];
    }
    Object.defineProperty(SlkPaginatorChildComponent.prototype, "length", {
        get: /**
         * Gets the 'length' from parent component.
         * @return {?}
         */
        function () { return this._length; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._length = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkPaginatorChildComponent.prototype, "pageSize", {
        get: /**
         * Gets the 'pageSize' from parent component.
         * @return {?}
         */
        function () { return this._pageSize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageSize = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlkPaginatorChildComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._dataDiffer = this._differs.find([]).create();
    };
    /**
     * @return {?}
     */
    SlkPaginatorChildComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.renderIndex();
    };
    /**
     * Inserts buttons as per total pages
     * @return {?}
     */
    SlkPaginatorChildComponent.prototype.renderIndex = /**
     * Inserts buttons as per total pages
     * @return {?}
     */
    function () {
        var _this = this;
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
        var /** @type {?} */ array = Array.from(Array(count).keys());
        // Gets the context in a array and the template to be inserted.
        this._pages = this._getAllIndexes(array);
        // Captures the changes in dataDiffer.
        var /** @type {?} */ changes = this._dataDiffer.diff(this._pages);
        changes.forEachOperation(function (record, prevIndex, currenIndex) {
            if (record.previousIndex === null) {
                _this.insertButtons(record.item);
            }
        });
        this.cacheService.set(viewContainerRef, this.viewRefCollection);
    };
    /**
     * @param {?} indices
     * @return {?}
     */
    SlkPaginatorChildComponent.prototype._getAllIndexes = /**
     * @param {?} indices
     * @return {?}
     */
    function (indices) {
        var _this = this;
        return indices.map(function (_, i) {
            var /** @type {?} */ pageNo, /** @type {?} */ disabled;
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
                temp: _this.pageBtnTemplate,
                index: i,
                disabled: disabled
            };
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SlkPaginatorChildComponent.prototype.insertButtons = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ ctxData = { page: data.page, index: data.index, disabled: data.disabled };
        var /** @type {?} */ context = new PaginatorContext(ctxData);
        var /** @type {?} */ collectionViewRef = this.nav.viewContainer.createEmbeddedView(data.temp, context, data.index);
        this.viewRefCollection.push(collectionViewRef);
        // console.log('this.view', this.viewRefCollection);
    };
    SlkPaginatorChildComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-paginator-child',
                    template: PAGINATOR_CHILD_TEMPLATE,
                    styles: ["\n      .page-controller{background:#fff;border-radius:3px;width:27px;height:27px;cursor:pointer;margin-left:10px}\n    "],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SlkPaginatorChildComponent.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: ActionsService, },
    ]; };
    SlkPaginatorChildComponent.propDecorators = {
        "length": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "nav": [{ type: ViewChild, args: [SlkNavDirective,] },],
        "pageBtnTemplate": [{ type: ContentChild, args: [SlkPageIndexDirective, { read: TemplateRef },] },],
    };
    return SlkPaginatorChildComponent;
}());
var SlkPaginatorComponent = /** @class */ (function () {
    function SlkPaginatorComponent(_changeDetectorRef, cacheService) {
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
    Object.defineProperty(SlkPaginatorComponent.prototype, "pageIndex", {
        get: /**
         * Index of the page to be displayed.
         * @return {?}
         */
        function () { return this._pageIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageIndex = value;
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkPaginatorComponent.prototype, "length", {
        get: /**
         * Length of total number of items that are being paginated.
         * @return {?}
         */
        function () { return this._length; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._length = value;
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkPaginatorComponent.prototype, "pageSize", {
        get: /**
         * Number of items to be displayed on a page. Set a default value.
         * @return {?}
         */
        function () { return this._pageSize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlkPaginatorComponent.prototype, "pageSizeOptions", {
        get: /**
         * The set of provided page size options to display to the user.
         * @return {?}
         */
        function () { return this._pageSizeOptions; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageSizeOptions = (value || []).map(function (p) { return p; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlkPaginatorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { this.initialised.next(true); };
    /**
     * @return {?}
     */
    SlkPaginatorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.initialised.complete();
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} index
     * @param {?=} page
     * @return {?}
     */
    SlkPaginatorComponent.prototype.onPaged = /**
     * @param {?} index
     * @param {?=} page
     * @return {?}
     */
    function (index, page) {
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
    };
    /** Changes the context on reaching last index. */
    /**
     * Changes the context on reaching last index.
     * @return {?}
     */
    SlkPaginatorComponent.prototype.incrementButtonContext = /**
     * Changes the context on reaching last index.
     * @return {?}
     */
    function () {
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
            for (var /** @type {?} */ i = 0; i < this.collectedViewRef.length; i++) {
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
    };
    /** Changes the context on reaching previous index. */
    /**
     * Changes the context on reaching previous index.
     * @param {?} page
     * @return {?}
     */
    SlkPaginatorComponent.prototype.decrementButtonContext = /**
     * Changes the context on reaching previous index.
     * @param {?} page
     * @return {?}
     */
    function (page) {
        // console.log('pageIndex', page);
        if (parseInt(page, 10) === 0) {
            // console.log('disabled decrement');
            this.collectedViewRef[0].context.$implicit.disabled = true;
        }
        for (var /** @type {?} */ i = 0; i < this.collectedViewRef.length; i++) {
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
    };
    /**
     * @return {?}
     */
    SlkPaginatorComponent.prototype._onPaged = /**
     * @return {?}
     */
    function () {
        /** Emits a event to notify dataSource and update the page with right data. */
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length
        });
    };
    /**
     * Disables the page buttons as per selected index desired by the user.
     */
    /**
     * Disables the page buttons as per selected index desired by the user.
     * @param {?} pageInd
     * @return {?}
     */
    SlkPaginatorComponent.prototype.changeContextOfButtons = /**
     * Disables the page buttons as per selected index desired by the user.
     * @param {?} pageInd
     * @return {?}
     */
    function (pageInd) {
        var _this = this;
        // console.log('pageInd', pageInd);
        this.cacheService.get(viewContainerRef)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (viewRef) {
            // Store the viewRef in a property to be used by this class.
            // Store the viewRef in a property to be used by this class.
            _this.collectedViewRef = viewRef;
            // Check if the currently selected page index is less than 1 and disable start 2 index page buttons
            // Check if the currently selected page index is equal or greater than the highest page index.
            // Check if the currently selected page index is in the middle or none or above
            if (pageInd === 5) {
                for (var /** @type {?} */ i = 0; i < viewRef.length; i++) {
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
                    _this.enableAll(viewRef, pageInd);
                }
                else if (pageInd >= viewRef.length - 2) {
                    _this.disableEndIndex(viewRef);
                }
                else {
                    _this.disableStartIndex(viewRef);
                }
            }
        });
    };
    /** Disables the button at the start indices. */
    /**
     * Disables the button at the start indices.
     * @param {?} viewRef
     * @return {?}
     */
    SlkPaginatorComponent.prototype.disableStartIndex = /**
     * Disables the button at the start indices.
     * @param {?} viewRef
     * @return {?}
     */
    function (viewRef) {
        for (var /** @type {?} */ i = 0; i < viewRef.length; i++) {
            if (i < 2) {
                viewRef[i].context.$implicit.disabled = true;
            }
            else {
                viewRef[i].context.$implicit.disabled = false;
            }
        }
    };
    /** Disables the button at the end indices. */
    /**
     * Disables the button at the end indices.
     * @param {?} viewRef
     * @return {?}
     */
    SlkPaginatorComponent.prototype.disableEndIndex = /**
     * Disables the button at the end indices.
     * @param {?} viewRef
     * @return {?}
     */
    function (viewRef) {
        for (var /** @type {?} */ i = 0; i < viewRef.length; i++) {
            if (i >= viewRef.length - 2) {
                viewRef[i].context.$implicit.disabled = true;
            }
            else {
                viewRef[i].context.$implicit.disabled = false;
            }
        }
    };
    /** Enables all the button. */
    /**
     * Enables all the button.
     * @param {?} viewRef
     * @param {?} pageInd
     * @return {?}
     */
    SlkPaginatorComponent.prototype.enableAll = /**
     * Enables all the button.
     * @param {?} viewRef
     * @param {?} pageInd
     * @return {?}
     */
    function (viewRef, pageInd) {
        for (var /** @type {?} */ i = 0; i < viewRef.length; i++) {
            if (viewRef[i].context.$implicit.index === pageInd) {
                viewRef[i].context.$implicit.disabled = true;
            }
            else {
                viewRef[i].context.$implicit.disabled = false;
            }
        }
    };
    SlkPaginatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-paginator',
                    template: "\n      <slk-paginator-child \n          [length]=\"_length\" \n          [pageSize]=\"_pageSize\">\n\n          <ng-container *slkPageIndex=\"let item\">\n\n              <button \n                  [disabled]=\"item.disabled\"\n                  class=\"page-controller\" \n                  (click)=\"onPaged(item.index, item.page)\">\n                  {{ item.page }}\n              </button>\n\n          </ng-container>\n\n      </slk-paginator-child>\n    ",
                    styles: ["\n      .page-controller{background:#fff;border-radius:3px;width:27px;height:27px;cursor:pointer;margin-left:10px}\n    "],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SlkPaginatorComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: ActionsService, },
    ]; };
    SlkPaginatorComponent.propDecorators = {
        "pageIndex": [{ type: Input },],
        "length": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "pageSizeOptions": [{ type: Input },],
        "page": [{ type: Output },],
    };
    return SlkPaginatorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlkPaginatorModule = /** @class */ (function () {
    function SlkPaginatorModule() {
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
    return SlkPaginatorModule;
}());

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
var SlkGridFilterDirective = /** @class */ (function () {
    function SlkGridFilterDirective() {
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
    SlkGridFilterDirective.prototype.filter = /**
     * Gets the word and the active column for filtering.
     * @param {?} selectedOptions
     * @param {?} columnId
     * @param {?=} key
     * @return {?}
     */
    function (selectedOptions, columnId, key) {
        if (key) {
            this.key = key;
        }
        this.selectedOptions = selectedOptions;
        this.active = columnId;
        this.slkFilterChange.emit({ data: selectedOptions });
    };
    /**
     * @return {?}
     */
    SlkGridFilterDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initialised.next(true);
    };
    /**
     * @return {?}
     */
    SlkGridFilterDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.initialised.complete();
    };
    SlkGridFilterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[slkFilter]',
                    exportAs: 'slkFilter'
                },] },
    ];
    /** @nocollapse */
    SlkGridFilterDirective.ctorParameters = function () { return []; };
    SlkGridFilterDirective.propDecorators = {
        "active": [{ type: Input, args: ['slkFilterActive',] },],
        "slkFilterChange": [{ type: Output, args: ['slkFilterChange',] },],
    };
    return SlkGridFilterDirective;
}());

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var /** @type {?} */ selectedOptions = 'selected-options';
/**
 * @template T
 */
var SlkGridPopupComponent = /** @class */ (function () {
    function SlkGridPopupComponent(data, cacheService) {
        this.data = data;
        this.cacheService = cacheService;
        // protected _onDestroy: Subject<any> = new Subject();
        this.collectedVal = [];
        this.data.unshift({ name: 'Select All', checked: false });
    }
    /**
     * @return {?}
     */
    SlkGridPopupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    SlkGridPopupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // this._onDestroy.next();
        // this._onDestroy.complete();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SlkGridPopupComponent.prototype.onInputChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        // Select all
        if (parseInt(value, 10) === 0) {
            var /** @type {?} */ updatedData = this.data.map(function (obj) {
                if (_this.data[0].checked) {
                    return __assign({}, obj, { checked: false });
                }
                else {
                    return __assign({}, obj, { checked: true });
                }
            });
            this.data = updatedData;
            var /** @type {?} */ cachedData = updatedData.map(function (obj) {
                return obj.name;
            });
            this.cacheService.set(selectedOptions, cachedData);
        }
        else {
            this.collectedVal.push(this.data[value].name);
            // Cache the selected values.
            this.cacheService.set(selectedOptions, this.collectedVal);
        }
    };
    SlkGridPopupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-filter-popup',
                    template: "\n      <div class=\"dropdown\">\n\n          <div class=\"dropdown-button\">\n              Please Select\n          </div>\n\n          <ul class=\"dropdown-selection\">\n\n              <!-- later create these tags dynamically -->\n\n              <li class=\"container\" *ngFor=\"let d of data;let i = index;\">\n\n                  <div class=\"checkmark\">\n                      <span>{{ d.name }}</span>\n                  </div>\n\n                  <div class=\"checkbox\">\n                      <input type=\"checkbox\" [checked]=\"d.checked\" [value]=\"i\" (input)=\"onInputChange($event.target.value)\">\n                  </div>\n\n              </li>\n\n          </ul>\n\n      </div>\n    ",
                    styles: ["\n      .dropdown{display:inline-block;position:relative;font-size:16px;font-family:Arial}.dropdown-button{background:#3498db;min-width:100px;color:#fff;letter-spacing:.025rem;box-sizing:border-box;padding:10px 30px 10px 20px;position:relative;cursor:pointer;transition:background .3s ease}.dropdown-button:hover{background:#2980b9;transition:background .3s ease}.dropdown ul{direction:ltr;padding:0;list-style:none;box-shadow:0 2px 6px 0 rgba(0,0,0,.2);position:absolute;left:0;margin-top:2px;top:100%;min-width:100%;max-height:250px;overflow:auto}.dropdown li{background:#fff;padding:8px 10px 8px 15px;box-sizing:border-box;cursor:pointer;transition:background .2s ease;overflow:hidden}.dropdown li:hover{background:#f6f6f6;transition:background .2s ease}.checkmark{float:left;height:3vh}.checkbox{float:right;width:20%;height:3vh}.container{position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container .checkbox input{position:absolute;cursor:pointer}\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SlkGridPopupComponent.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [OPTIONS_DIALOG_DATA,] },] },
        { type: ActionsService, },
    ]; };
    return SlkGridPopupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlkGridPopupModule = /** @class */ (function () {
    function SlkGridPopupModule() {
    }
    SlkGridPopupModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [SlkGridPopupComponent],
                    declarations: [SlkGridPopupComponent],
                },] },
    ];
    return SlkGridPopupModule;
}());

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
var SlkGridFilterRef = /** @class */ (function () {
    function SlkGridFilterRef(overlayRef) {
        this.overlayRef = overlayRef;
    }
    /**
     * @return {?}
     */
    SlkGridFilterRef.prototype.close = /**
     * @return {?}
     */
    function () {
        this.overlayRef.dispose();
    };
    return SlkGridFilterRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ OPTIONS_DIALOG_DATA = new InjectionToken('OPTIONS_DIALOG_DATA');

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ɵ0 = [];
var /** @type {?} */ DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'no-style-backdrop',
    panelClass: 'slk-options-dialog-panel',
    data: ɵ0
};
var DomService = /** @class */ (function () {
    function DomService(injector, overlay) {
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
    DomService.prototype.open = /**
     * @param {?} elementRef
     * @param {?=} config
     * @return {?}
     */
    function (elementRef, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        // Over ride default configuration
        var /** @type {?} */ dialogConfig = __assign$1({}, DEFAULT_CONFIG, config);
        // Returns an OverlayRef (which is a PortalHost)
        var /** @type {?} */ overlayRef = this.createOverlay(dialogConfig, elementRef);
        // Instantiate remote control
        var /** @type {?} */ dialogRef = new SlkGridFilterRef(overlayRef);
        var /** @type {?} */ overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);
        overlayRef.backdropClick().subscribe(function (_) {
            _this.onClose.next(true);
            dialogRef.close();
        });
        return dialogRef;
    };
    /**
     * @param {?} config
     * @param {?} elementRef
     * @return {?}
     */
    DomService.prototype.createOverlay = /**
     * @param {?} config
     * @param {?} elementRef
     * @return {?}
     */
    function (config, elementRef) {
        var /** @type {?} */ overlayConfig = this.getOverlayConfig(config, elementRef);
        return this.overlay.create(overlayConfig);
    };
    /**
     * @param {?} overlayRef
     * @param {?} config
     * @param {?} dialogRef
     * @return {?}
     */
    DomService.prototype.attachDialogContainer = /**
     * @param {?} overlayRef
     * @param {?} config
     * @param {?} dialogRef
     * @return {?}
     */
    function (overlayRef, config, dialogRef) {
        var /** @type {?} */ injector = this.createInjector(config, dialogRef);
        var /** @type {?} */ containerPortal = new ComponentPortal(SlkGridPopupComponent, null, injector);
        var /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * @param {?} config
     * @param {?} dialogRef
     * @return {?}
     */
    DomService.prototype.createInjector = /**
     * @param {?} config
     * @param {?} dialogRef
     * @return {?}
     */
    function (config, dialogRef) {
        // Instantiate new WeakMap for our custom injection tokens
        var /** @type {?} */ injectionTokens = new WeakMap();
        // Set customs injection tokens
        injectionTokens.set(SlkGridFilterRef, dialogRef);
        injectionTokens.set(OPTIONS_DIALOG_DATA, config.data);
        // Instantiate new PortalInjector
        return new PortalInjector(this.injector, injectionTokens);
    };
    /**
     * @param {?} config
     * @param {?} elementRef
     * @return {?}
     */
    DomService.prototype.getOverlayConfig = /**
     * @param {?} config
     * @param {?} elementRef
     * @return {?}
     */
    function (config, elementRef) {
        // const positionStrategy = this.overlay.position()
        //     .global()
        //     .centerHorizontally()
        //     .centerVertically();
        var /** @type {?} */ positionStrategy = this._getPosition(elementRef);
        // debugger;
        var /** @type {?} */ overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.backdropClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: positionStrategy
        });
        // debugger;
        return overlayConfig;
    };
    /**
     * @param {?} elementRef
     * @return {?}
     */
    DomService.prototype._getPosition = /**
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        var /** @type {?} */ origin = {
            topLeft: /** @type {?} */ ({ originX: 'start', originY: 'top' }),
            topRight: /** @type {?} */ ({ originX: 'end', originY: 'top' }),
            bottomLeft: /** @type {?} */ ({ originX: 'start', originY: 'bottom' }),
            bottomRight: /** @type {?} */ ({ originX: 'end', originY: 'bottom' }),
            topCenter: /** @type {?} */ ({ originX: 'center', originY: 'top' }),
            bottomCenter: /** @type {?} */ ({ originX: 'center', originY: 'bottom' }),
        };
        var /** @type {?} */ overlay = {
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
    };
    DomService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomService.ctorParameters = function () { return [
        { type: Injector, },
        { type: Overlay, },
    ]; };
    return DomService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ actualData = 'actual-data';
/**
 * The max height of the filter's overlay panel
 */
var /** @type {?} */ FILTER_PANEL_MAX_HEIGHT = 256;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
var /** @type {?} */ FILTER_PANEL_VIEWPORT_PADDING = 8;
/**
 * @template T
 */
var SlkGridFilterComponent = /** @class */ (function () {
    function SlkGridFilterComponent(_filter, _slkColumnDef, viewContainerRef, _elementRef, domService, _grid, cacheService) {
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
    SlkGridFilterComponent.prototype.onFilterChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Get the id of the selected filter and filter all unique values.
        // Then pass the data to the popup component
        var /** @type {?} */ uniqueOptions;
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
                .subscribe(function (data) {
                uniqueOptions = _this._filterUniqueValues(_this.id, data);
                _this.openPopup(uniqueOptions);
                return;
            });
        }
    };
    /**
     * @return {?}
     */
    SlkGridFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initialised.next(true);
        // Sets the id for every column name
        this.id = this._slkColumnDef.name;
    };
    /**
     * @return {?}
     */
    SlkGridFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.initialised.complete();
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * Opens the popup filter.
     * @param {?} uniqueOptions
     * @return {?}
     */
    SlkGridFilterComponent.prototype.openPopup = /**
     * Opens the popup filter.
     * @param {?} uniqueOptions
     * @return {?}
     */
    function (uniqueOptions) {
        // Opens a dialog and injects data in the entryComponent.
        var /** @type {?} */ overlayOptionsRef = this.domService.open(this._elementRef, { data: uniqueOptions });
        // Subscribes to on close behavior
        this._filterClose();
    };
    /** Subscribes to the on closed behavior. */
    /**
     * Subscribes to the on closed behavior.
     * @return {?}
     */
    SlkGridFilterComponent.prototype._filterClose = /**
     * Subscribes to the on closed behavior.
     * @return {?}
     */
    function () {
        var _this = this;
        // When the filter popup is closed.
        this.domService.onCloseBehavior
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (isClosed) {
            if (isClosed) {
                _this._getSelectedValues();
            }
        });
    };
    /** Gets the selected values in the unique filter drop down. */
    /**
     * Gets the selected values in the unique filter drop down.
     * @return {?}
     */
    SlkGridFilterComponent.prototype._getSelectedValues = /**
     * Gets the selected values in the unique filter drop down.
     * @return {?}
     */
    function () {
        var _this = this;
        this.cacheService.get(selectedOptions)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (selectedValues) {
            // Send the selected values to filter data in the grid.
            // Send the selected values to filter data in the grid.
            _this._filter.filter(selectedValues, _this.id, _this.key);
        });
    };
    /**  Filters the unique values in the column. */
    /**
     * Filters the unique values in the column.
     * @param {?} columnId
     * @param {?} data
     * @return {?}
     */
    SlkGridFilterComponent.prototype._filterUniqueValues = /**
     * Filters the unique values in the column.
     * @param {?} columnId
     * @param {?} data
     * @return {?}
     */
    function (columnId, data) {
        // Stores the unique filters value in an array.
        var /** @type {?} */ uniqueValuesInTheColumn = [];
        var /** @type {?} */ uniqueValues = [];
        var /** @type {?} */ options = [];
        if (this.metadata) {
            for (var /** @type {?} */ i = 0; i < this.metadata.length; i++) {
                if (this.metadata[i].name === this.id) {
                    // has to be id or a specific format supported
                    this.key = this.metadata[i].reference_id;
                    break;
                }
            }
            for (var /** @type {?} */ i = 0; i < data.length; i++) {
                uniqueValuesInTheColumn.push(data[i][this.key]);
            }
            // remove duplicates
            uniqueValues = this._removeDuplicates(uniqueValuesInTheColumn);
            options = this._options(uniqueValues);
            return options;
        }
        else {
            for (var /** @type {?} */ i = 0; i < data.length; i++) {
                uniqueValuesInTheColumn.push(data[i][columnId]);
            }
            uniqueValues = this._removeDuplicates(uniqueValuesInTheColumn);
            options = this._options(uniqueValues);
            return options;
        }
    };
    /** Removes duplicates. */
    /**
     * Removes duplicates.
     * @param {?} uniqueValuesInTheColumn
     * @return {?}
     */
    SlkGridFilterComponent.prototype._removeDuplicates = /**
     * Removes duplicates.
     * @param {?} uniqueValuesInTheColumn
     * @return {?}
     */
    function (uniqueValuesInTheColumn) {
        return uniqueValuesInTheColumn.filter(function (element, pos) {
            return uniqueValuesInTheColumn.indexOf(element) === pos;
        });
    };
    /**
     * @param {?} uniqueValues
     * @return {?}
     */
    SlkGridFilterComponent.prototype._options = /**
     * @param {?} uniqueValues
     * @return {?}
     */
    function (uniqueValues) {
        return uniqueValues.map(function (eachEl, index) {
            return {
                name: eachEl,
                checked: false
            };
        });
    };
    SlkGridFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slk-filter-header',
                    template: "\n      <div class=\"triangle-down\"></div>\n    ",
                    styles: ["\n      .triangle-down{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:20px solid #555;float:right}\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SlkGridFilterComponent.ctorParameters = function () { return [
        { type: SlkGridFilterDirective, decorators: [{ type: Optional },] },
        { type: SlkColumnDefDirective, decorators: [{ type: Optional },] },
        { type: ViewContainerRef, },
        { type: ElementRef, },
        { type: DomService, },
        { type: SlkTableComponent, },
        { type: ActionsService, },
    ]; };
    SlkGridFilterComponent.propDecorators = {
        "metadata": [{ type: Input, args: ['metadata',] },],
        "id": [{ type: Input, args: ['slk-filter-header',] },],
        "onFilterChange": [{ type: HostListener, args: ['click',] },],
    };
    return SlkGridFilterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlkFilterModule = /** @class */ (function () {
    function SlkFilterModule() {
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
    return SlkFilterModule;
}());

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
//# sourceMappingURL=ngx-sleek.es5.js.map
