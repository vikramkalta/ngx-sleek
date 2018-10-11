import { SortDirection } from './sort-header';
import { OnChanges, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SortDirectiveService } from './sort-directive.service';
/** Interface for directive that holds sorting state consumed by SlkSortHeader */
export interface SlkSortable {
    /** The id of the column being sorted. */
    id: string;
    /** Sort direction. */
    start: 'asc' | 'desc';
}
/** Current sort state. */
export interface Sort {
    /** The id of the column being sorted. */
    active: string;
    /** The Sort Direction */
    direction: SortDirection;
    initial: boolean;
}
/** Container for SlkSortables to manage the sort state and provide default sort paramters. */
export declare class SlkSortDirective implements OnChanges, OnDestroy, OnInit {
    private sortDirService;
    /** Collection of all registered sortables that this directive manages. */
    sortables: Map<string, SlkSortable>;
    /** Used to notify any child components listening to state changes. */
    readonly _stateChanges: Subject<void>;
    /** Emit initialised value when directive is initialised. */
    initialised: BehaviorSubject<boolean>;
    /** The id of the most recently sorted SlkSortable. */
    active: string;
    /**
     * The direction to set when an SlkSortable is initially sorted.
     */
    start: 'asc' | 'desc';
    /** The sort direction of the currently active SlkSortable. */
    direction: SortDirection;
    private _direction;
    /** Event emiited when the user changes either the active sort or sort direction. */
    readonly slkSortChange: EventEmitter<Sort>;
    constructor(sortDirService: SortDirectiveService);
    /**
     * Register function to be used by the contained SlkSortables. Adds the SlkSortable to
     * the collection of SlkSortables.
     */
    register(sortable: SlkSortable): void;
    /**
     * Unregister function to be used by the container SlkSortables. Removes the SlkSortable from
     * the collection of contained SlkSortables.
     */
    deregister(sortable: SlkSortable): void;
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable: SlkSortable): void;
    /** Returns the next sort direction of the active sortable. */
    getNextSortDirection(sortable: SlkSortable): SortDirection;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
