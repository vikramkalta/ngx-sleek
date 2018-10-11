import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SlkSortDirective } from '../sort/sort';
import { SlkPaginatorComponent } from '../paginator';
import { SlkGridFilterDirective } from '../grid-filter';
export declare class SlkGridDataSource<T> extends DataSource<T> {
    /** Stream that emits when a new data array is set on the data source. */
    private readonly _data;
    /** Stream emitting render data to the table (depends on ordered data changes). */
    private readonly _renderData;
    /**
     * Subscription to the changes that should trigger an update to table's rendered row, such
     * as sorting, pagination or base data changes.
     */
    _renderChangesSubscription: Subscription;
    /** Array of data that should be rendered by the table */
    data: T[];
    /**
     * Instance of the SlkSortDirective used by the table to control its sort
     */
    sort: SlkSortDirective | null;
    private _sort;
    paginator: SlkPaginatorComponent | null;
    private _paginator;
    filter: SlkGridFilterDirective | null;
    private _filter;
    /**
     * Gets a sorted copy of the data array based on the state of the SlkSortDirective.
     */
    sortData: ((data: T[], sort: SlkSortDirective, initial: boolean) => T[]);
    constructor(initialData?: T[]);
    /** Subscribe to changes that should trigger an update to the table's rendered rows. */
    _updateChangeSubscription(): void;
    /**
     * Returns a sorted copy of the data if SlkSortDirective has a sort applied, otherwise just returns the
     * data array as provided.
     */
    _orderData(data: T[]): T[];
    /**
    * Returns a paged splice of the provided array according to the SlkPaginatorComponent's page
    * index and length;
    */
    _pageData(data: T[]): T[];
    _filterData(data: T[]): T[];
    /** Used by the SlkTable. Called when it connects to the data source. */
    connect(): BehaviorSubject<T[]>;
    /** Used by SlkTable, Called when it is destroyed. */
    disconnect(): void;
}
