import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[lazyload]'
})
export class LazyloadDirective implements OnInit {
	constructor(private elementRef: ElementRef) {}

	@Input('lazyload') file: string;
	@Input('size') size: number | string;

	ngOnInit() {
		let size = this.size || 50;

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			width: 'auto',
			height: typeof size === 'number' ? `${size}px` : size,
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
