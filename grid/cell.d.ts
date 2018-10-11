import { TemplateRef, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DirectiveService } from './directive-service';
/** Base interface for a cell definition. */
export interface SlkCellDef {
    template: TemplateRef<any>;
}
/**
 * Cell definition for a Slk Table.
 */
export declare class SlkCellDefDirective implements SlkCellDef {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
/**
 * Header cell defintion for a Slk table.
 */
export declare class SlkHeaderCellDefDirective implements SlkCellDef {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
/**
 * Footer cell defintion for a Slk table.
 */
export declare class SlkFooterCellDefDirective implements SlkCellDef {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
export declare class SlkColumnDefBase {
}
/**
 * Column definition for the Slk table.
 */
export declare class SlkColumnDefDirective extends SlkColumnDefBase {
    /** Unique name for this column. */
    name: string;
    _name: string;
    cell: SlkCellDef;
    headerCell: SlkHeaderCellDefDirective;
    footerCell: SlkFooterCellDefDirective;
    /**
     * Transformed version of the column name that can be used a part of css classname.
     */
    cssClassFriendlyName: string;
}
/** Base class for the cells. Adds a CSS classname that identifies the column it renders in. */
export declare class BaseSlkCell {
    constructor(columnDef: SlkColumnDefDirective, elementRef: ElementRef);
}
/** Header cell template container. */
export declare class SlkHeaderCellDirective extends BaseSlkCell implements OnInit {
    private elementRef;
    private directiveService;
    private renderer;
    destroy: Subject<boolean>;
    constructor(columnDef: SlkColumnDefDirective, elementRef: ElementRef, directiveService: DirectiveService, renderer: Renderer2);
    ngOnInit(): void;
}
/** Footer cell template container */
export declare class SlkFooterCellDirective extends BaseSlkCell {
    constructor(columnDef: SlkColumnDefDirective, elementRef: ElementRef);
}
/** Cell template container */
export declare class SlkCellDirective extends BaseSlkCell implements OnInit {
    private elementRef;
    private directiveService;
    private renderer;
    destroy: Subject<boolean>;
    constructor(columnDef: SlkColumnDefDirective, elementRef: ElementRef, directiveService: DirectiveService, renderer: Renderer2);
    ngOnInit(): void;
}
