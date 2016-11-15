import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Directive({
	selector: '[lazyload]'
})
export class LazyloadDirective implements OnInit {
	constructor(private elementRef: ElementRef) {}

	@Input('lazyload') file: string;
	@Input('placeholder') placeholder: string;
	@Input('width') width: number | string;
	@Input('height') height: number | string;

	ngOnInit() {
		let width = this.width || 'auto';
		let height = this.height || 'auto';
		// TODO: maybe have a nicer placeholder that looks cool with the blur filter
		let placeholder = this.placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			width: typeof width === 'number' ? `${width}px` : width,
			height: typeof height === 'number' ? `${height}px` : height,
			display: 'block',
			backgroundColor: 'rgba(0,0,0,.1)',
			backgroundSize: 'cover',
			backgroundImage: `url(${this.base64(placeholder)})`,
			webkitFilter: 'blur(15px)',
			mozFilter: 'blur(15px)',
			oFilter: 'blur(15px)',
			msFilter: 'blur(15px)',
			filter: 'blur(15px)'
		});

		if (this.file) {
			this.lazyload(this.file);
		}
	}

	private lazyload(file: string) {
        let img = new Image();
		img.onload = () => {
			(<any>Object).assign(this.elementRef.nativeElement.style, {
				backgroundImage: `url(${file})`
			});
		};
		img.src = file;
	}

	private base64(url: string): string {
		let base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

		if (base64.test(this.file)) {
			return 'data:application/octet-stream;base64,' + this.file;
		} else {
			return this.file;
		}
	}

	public update(file: string): void {
		this.file = file;
		this.lazyload(this.file);
	}
}
