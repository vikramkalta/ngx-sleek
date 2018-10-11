import { OnDestroy, AfterContentChecked, OnInit, IterableDiffer, TrackByFunction, IterableDiffers, ChangeDetectorRef, ViewContainerRef, QueryList, EmbeddedViewRef, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { SlkTreeNodeDefDirective } from './node';
import { SlkTreeNodeOutletDirective } from './outlet';
import { TreeControl } from './control/tree-control';
/**
 * Slk tree component that connects with a data source to retrieve data of type T and
 * renders dataNodes with heirarchy.
 */
export declare class SlkTreeComponent<T> implements AfterContentChecked, CollectionViewer, OnDestroy, OnInit {
    private _differs;
    private _changeDetectorRef;
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy;
    /** Differ used to find the changes in the data provided by the data source. */
    private _dataDiffer;
    /** Stores the node definition that does not have a when predicate. */
    _defaultNodeDef: SlkTreeNodeDefDirective<T> | null;
    /** Data subscription */
    private _dataSubscription;
    /** Level of nodes */
    private _levels;
    embeddedViewRef: EmbeddedViewRef<any>;
    cacheEmbeddedViewRef: EmbeddedViewRef<any>[];
    viewContainerRef: Array<any>;
    class: string;
    /**
     * Provides a stream containing the latest data array to render. Influenced
     * by the tree's stream of view window.
     */
    dataSource: DataSource<T> | Observable<T[]> | T[];
    private _dataSource;
    /** the tree controller. */
    treeControl: TreeControl<T>;
    /**
     * Tracking function will be used to check differences in data changes.
     */
    trackBy: TrackByFunction<T>;
    /** Sends the re-ordered array on drop. */
    reorderData: EventEmitter<any>;
    _nodeOutlet: SlkTreeNodeOutletDirective;
    /** The tree node template for the tree. */
    _nodeDefs: QueryList<SlkTreeNodeDefDirective<T>>;
    /** Stream containing the latest info on what rows are being displayed on screen. */
    viewChange: BehaviorSubject<{
        start: number;
        end: number;
    }>;
    constructor(_differs: IterableDiffers, _changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    private _switchDataSource(dataSource);
    /** Set up a subscription for the data provided by the data source. */
    private _observeRenderChanges();
    /** Check for changes made in the data nd render each change. */
    _renderNodeChanges(data: T[], dataDiffer?: IterableDiffer<T>, viewContainer?: ViewContainerRef, parentData?: T): void;
    /**
     * finds the matchin node defintion that should be used for this node data
     */
    _getNodeDef(data: T, i: number): SlkTreeNodeDefDirective<T>;
    /**
     * Create the embedded view for the data node template and place it in the correct index
     * within the data node view container.
     */
    insertNode(nodeData: T, index: number, viewContainer?: ViewContainerRef, parentData?: T): void;
    /** Emits a event for re ordered data. */
    reorderedData(data: any[]): void;
}
