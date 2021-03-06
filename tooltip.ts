import {
    Component, Directive, HostListener, ComponentRef, ElementRef, ChangeDetectorRef, ViewContainerRef, Input, ComponentFactoryResolver,
    ComponentFactory, AfterViewInit
} from "@angular/core";

@Component({
    selector: "tooltip-content",
    template: `
<div class="tooltip tooltip-{{ placement }}"
     [style.top]="top + 'px'"
     [style.left]="left + 'px'"
     [class.show]="isShow"
     [class.fade]="isFade"
     role="tooltip">
    <div class="tooltip-inner">
        <ng-content></ng-content>
        {{ content }}
    </div> 
</div>
`
})
export class TooltipContent implements AfterViewInit {

    // -------------------------------------------------------------------------
    // Inputs / Outputs 
    // -------------------------------------------------------------------------

    @Input()
    hostElement: any;

    @Input()
    content: string;

    @Input()
    placement: "top"|"bottom"|"left"|"right" = "bottom";

    @Input()
    animation: boolean = true;

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    top: number = -100000;
    left: number = -100000;
    isShow: boolean = false;
    isFade: boolean = true;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private element: ElementRef,
                private cdr: ChangeDetectorRef) {
    }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    ngAfterViewInit(): void {
        this.show();
        this.cdr.detectChanges();
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    
    show(): void {
        if (!this.hostElement)
            return;

        const p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.isShow = true;
        if (this.animation)
            this.isFade = true;
    }

    hide(): void {
        this.top = -100000;
        this.left = -100000;
        this.isShow = false;
        if (this.animation)
            this.isFade = false;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private positionElements(hostEl: any, targetEl: any, positionStr: string, appendToBody: boolean = false): { top: number, left: number } {
        let positionStrParts = positionStr.split("-");
        let pos0 = positionStrParts[0];
        let pos1 = positionStrParts[1] || "center";
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;
        let shiftWidth: any = {
            center: function (): number {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function (): number {
                return hostElPos.left;
            },
            right: function (): number {
                return hostElPos.left + hostElPos.width;
            }
        };

        let shiftHeight: any = {
            center: function (): number {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function (): number {
                return hostElPos.top;
            },
            bottom: function (): number {
                return hostElPos.top + hostElPos.height;
            }
        };

        let targetElPos: { top: number, left: number };
        switch (pos0) {
            case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            
            case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            
            case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }

        return targetElPos;
    }

    private position(nativeEl: any): { width: number, height: number, top: number, left: number } {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }

    private offset(nativeEl:any): { width: number, height: number, top: number, left: number } {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }

    private getStyle(nativeEl: any, cssProp: string): string {
        if ((nativeEl as any).currentStyle) // IE
            return (nativeEl as any).currentStyle[cssProp];

        if (window.getComputedStyle)
            return (window.getComputedStyle(nativeEl) as any)[cssProp];
        
        // finally try and get inline style
        return (nativeEl.style as any)[cssProp];
    }

    private isStaticPositioned(nativeEl: any): boolean {
        return (this.getStyle(nativeEl, "position") || "static" ) === "static";
    }

    private parentOffsetEl(nativeEl: any): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

}

@Directive({
    selector: "[tooltip]"
})
export class Tooltip {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private tooltip: ComponentRef<TooltipContent>;
    private visible: boolean;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private viewContainerRef: ViewContainerRef,
                private resolver: ComponentFactoryResolver) {
    }

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input("tooltip")
    content: string|TooltipContent;

    @Input()
    tooltipDisabled: boolean;

    @Input()
    tooltipAnimation: boolean = true;

    @Input()
    tooltipPlacement: "top"|"bottom"|"left"|"right" = "bottom";

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    @HostListener("focusin")
    @HostListener("mouseenter")
    show(): void {
        if (this.tooltipDisabled || this.visible)
            return;

        this.visible = true;
        if (typeof this.content === "string") {
            const factory = this.resolver.resolveComponentFactory(TooltipContent);
            if (!this.visible)
                return;

            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = this.content as string;
            this.tooltip.instance.placement = this.tooltipPlacement;
            this.tooltip.instance.animation = this.tooltipAnimation;
        } else {
            const tooltip = this.content as TooltipContent;
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    }

    @HostListener("focusout")
    @HostListener("mouseleave")
    hide(): void {
        if (!this.visible)
            return;

        this.visible = false;
        if (this.tooltip)
            this.tooltip.destroy();

        if (this.content instanceof TooltipContent)
            (this.content as TooltipContent).hide();
    }

}

