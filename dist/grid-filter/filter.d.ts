import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export declare class SlkGridFilterDirective implements OnInit, OnDestroy {
    /** Collection of all registered filters that this directive manages. */
    filterColumns: Map<string, any>;
    /** emit initialised value when directive is initialised. */
    initialised: BehaviorSubject<boolean>;
    selectedOptions: any[];
    key: string | number;
    /** The id of the most recently filtered column. */
    active: string | number;
    /** Event emitted when user types a keyword. */
    readonly slkFilterChange: EventEmitter<any>;
    constructor();
    /** Gets the word and the active column for filtering. */
    filter(selectedOptions: any[], columnId: string | number, key?: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
