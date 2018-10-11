import { OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SlkTreeComponent } from './tree';
/**
 * Tree node for SlkTreeComponent.
 */
export declare class SlkTreeNodeDirective<T> implements OnDestroy {
    protected _elementRef: ElementRef;
    protected _tree: SlkTreeComponent<T>;
    /**
     * The most recently created SlkTreeNode. We save it in static variable so we can retreive it
     * in 'SlkTreeComponent' and set the data to it.
     */
    static mostRecentTreeNode: SlkTreeNodeDirective<{}> | null;
    /** Subject that emits when the component has been destroyed. */
    protected _destroyed: Subject<void>;
    /** The tree node's data. */
    data: T;
    protected _data: T;
    readonly isExpanded: boolean;
    readonly level: number;
    /**
     * The role of the node should be group if its an internal node
     * and treeitem if its a leaf node.
     */
    role: 'treeitem' | 'group';
    constructor(_elementRef: ElementRef, _tree: SlkTreeComponent<T>);
    ngOnDestroy(): void;
    private _setRoleFromData();
}
