import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SlkColumnDefDirective } from '../grid';
import { SlkSortDirective } from './sort';
import { SortDirectiveService } from './sort-directive.service';
import { ElementRef } from '@angular/core';
export declare type SortDirection = 'asc' | 'desc' | '';
export declare class SlkSortHeaderComponent implements OnDestroy, OnInit {
    _sort: SlkSortDirective;
    _slkColumnDef: SlkColumnDefDirective;
    private renderer;
    private sortDirService;
    /** The direction the pointer should face as per sorted direction */
    pointerDirection: SortDirection;
    /** ID of the sort-header. When used with slkColumnDef, will default to column's name. */
    id: string;
    /** Overrides the sort start value of the containing SlkSort for this SlkSortable. */
    start: 'asc' | 'desc';
    sortBtn: ElementRef;
    constructor(_sort: SlkSortDirective, _slkColumnDef: SlkColumnDefDirective, renderer: Renderer2, sortDirService: SortDirectiveService);
    /** Click event. When clicked will sort the data passing reference of this component to sort directive. */
    onSort(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Returns the animation state for the arrow direction. */
    _isSorted(): boolean;
}
