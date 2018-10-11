import { AfterContentInit, OnDestroy, ElementRef, IterableDiffers, QueryList, Renderer2, EventEmitter, ViewContainerRef, OnInit, EmbeddedViewRef } from '@angular/core';
import { SlkTreeComponent } from './tree';
import { SlkTreeNodeOutletDirective } from './outlet';
import { ActionsService } from './tree-service';
import { Observable } from 'rxjs';
import { SlkTreeNodeDirective } from './node-directive';
export declare class SlkNestedTreeNodeDirective<T> extends SlkTreeNodeDirective<T> implements OnInit, AfterContentInit, AfterContentInit, OnDestroy {
    protected _elementRef: ElementRef;
    protected _tree: SlkTreeComponent<T>;
    protected _differs: IterableDiffers;
    _viewContainer: ViewContainerRef;
    private renderer;
    private actionService;
    /** Differ used to find the changes in the data provided by the data source. */
    private _dataDiffer;
    /** The children data dataNodes of current node. they will be placed in SlkTreeNodeOutletDirective */
    protected _children: T[];
    addEvent: EventEmitter<any>;
    cachedData: Observable<any>;
    /** Embedded view ref to be dropped in the container. */
    _droppedViewRef: EmbeddedViewRef<any>;
    /** The children node placeholder. */
    nodeOutlet: QueryList<SlkTreeNodeOutletDirective>;
    drop(event: DragEvent): void;
    onDragOver(event: DragEvent): void;
    constructor(_elementRef: ElementRef, _tree: SlkTreeComponent<T>, _differs: IterableDiffers, _viewContainer: ViewContainerRef, renderer: Renderer2, actionService: ActionsService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Add children dataNodes to the NodeOutlet */
    protected updateChildrenNodes(): void;
    /** Embeds a view at the drop point */
    protected _embbedView(context: any): void;
    /** Embeds a view at the drop point */
    protected _embedView(context: any, containerRef: any): void;
    /** Removes the view from the drag point */
    protected _removeView(): void;
    /** Sends data back to the user to re order the data. */
    private reorderData(viewRef);
    /** Clear the children dataNodes */
    protected _clear(): void;
}
