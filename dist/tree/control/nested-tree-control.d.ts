import { BaseTreeControl } from './base-tree-control';
import { Observable } from 'rxjs';
export declare class NestedTreeControl<T> extends BaseTreeControl<T> {
    getChildren: (dataNode: T) => Observable<T[]>;
    constructor(getChildren: (dataNode: T) => Observable<T[]>);
    /** Expands all dataNodes in the tree. */
    expandAll(): void;
    /** Get a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    getDescendants(dataNode: T): T[];
    /** A helper function to get descendants recursively. */
    protected _getDescendants(descendants: T[], dataNode: T): void;
}
