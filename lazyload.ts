import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[lazyload]'
})
export class LazyloadDirective implements OnInit {
	constructor(private elementRef: ElementRef) {}

	@Input('lazyload') file: string;
	@Input('preview') preview: string;
	@Input('width') width: number | string;
	@Input('height') height: number | string;

	ngOnInit() {
		let width = this.width || 'auto';
		let height = this.height || 'auto';

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			width: typeof width === 'number' ? `${width}px` : width,
			height: typeof height === 'number' ? `${height}px` : height,
			display: 'block',
			backgroundColor: 'rgba(0,0,0,.1)',
			backgroundSize: 'cover',
			backgroundImage: `url(${this.url()})`
		});
	}

	private url(): string {
		let base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

		if (!this.file) {
			return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
		}
		if (base64.test(this.file)) {
			return 'data:application/octet-stream;base64,' + this.file;
		} else {
			return this.file;
		}
	}

	public update(file: string): void {
		this.file = file;

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			backgroundImage: `url(${this.url()})`
		});
	}
}
