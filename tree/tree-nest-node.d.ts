import { OnInit, Renderer2, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActionsService } from './tree-service';
import { SlkTreeTextOutletDirective } from './tree-nest-outlet';
import { SlkNestedTreeNodeDirective } from './nested-node';
import { NestedTreeControl } from './control';
import { SlkTreeComponent } from './tree';
export declare class SlkContentActionContext {
    $implicit: any;
    appContentAction: any;
}
export declare class SlkTreeNodeTextComponent<T> extends SlkTreeTextOutletDirective<T> implements OnInit, OnDestroy {
    private actionService;
    nestedNode: SlkNestedTreeNodeDirective<T>;
    private treeComponent;
    private _onDestroy;
    isAction: boolean;
    nestedTreeControl: NestedTreeControl<T>;
    nodeMap: Map<any, any>;
    isExpandable: (node: any) => any;
    expand: boolean;
    collapse: boolean;
    constructor(actionService: ActionsService, nestedNode: SlkNestedTreeNodeDirective<T>, treeComponent: SlkTreeComponent<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onToggle(): void;
    onAdd(node?: any): void;
    onDestroy(): void;
    onEdit(): void;
    /** Drag and drop, have ViewContainers and move the view from one ViewContainer to other */
    drag(event: DragEvent): void;
}
/** Directive */
export declare class SlkAddActionDirective {
    renderer: Renderer2;
    templateRef: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    /** Context for the template. */
    private _context;
    /** Stores template ref condition is not true. */
    private _elseTemplateRef;
    /** Stores template ref condition is true. */
    private _thenTemplateRef;
    private _elseViewRef;
    private _thenViewRef;
    appContentAction: any;
    appContentActionElse: TemplateRef<SlkContentActionContext> | null;
    constructor(renderer: Renderer2, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    _updateView(): void;
}
