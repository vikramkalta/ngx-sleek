import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class SlkTreeNodeOutletContext<T> {
    /** Data for the node. */
    $implicit: T;
    /** Depth of the node. */
    level: number;
    /** Index location of node. */
    index?: number;
    /** Length of the number of total dataNodes */
    count?: number;
    constructor(data: T);
}
/**
 * Data node defintion for the SlkTreeComponent.
 * Captures the node's template
 */
export declare class SlkTreeNodeDefDirective<T> {
    template: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    when: (index: number, nodeData: T) => boolean;
    constructor(template: TemplateRef<any>, viewContainer: ViewContainerRef);
}
