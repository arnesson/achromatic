interface IScroll {
    new (scroller: HTMLElement, wrapper: HTMLElement, options: Object): IScroll;
    refresh (): void;
    on (event: string, fn: Function): void;
    destroy (): void;
    goToPage (x: number, y: number, time?: number, easing?: any): void;
    scrollTo (x: number, y: number, time?: number, easing?: any): void;
    currentPage: any;
    pages: any;
	x: number;
    y: number;
    maxScrollX: number;
    maxScrollY: number;
}

export var IScroll: IScroll;
