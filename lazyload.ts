import { Directive, ElementRef, Input, OnInit } from '@angular/core';

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
			backgroundSize: 'cover',
			backgroundColor: 'rgba(0,0,0,0.05)'
		});

		this.blur(this.placeholder);
		this.lazyload(this.file);
	}

	private blur(file: string) {
		if (file) {
	        let img = new Image();
			img.onload = () => {
				let svg = btoa(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
  <filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feGaussianBlur stdDeviation="20 20" edgeMode="duplicate" />
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="1 1" />
    </feComponentTransfer>
  </filter>
  <image filter="url(#blur)" xlink:href="${img.src}" x="0" y="0" height="100%" width="100%"/>
</svg>`);

				(<any>Object).assign(this.elementRef.nativeElement.style, {
					backgroundImage: `url(data:image/svg+xml;charset=utf-8,${svg})`
				});
			};
			img.src = this.base64(file);
		}
	}

	private lazyload(file: string) {
		if (file) {
	        let img = new Image();
			img.onload = () => {
				(<any>Object).assign(this.elementRef.nativeElement.style, {
					backgroundImage: `url(${img.src})`
				});
			};
			img.src = this.base64(file);
		}
	}

	private base64(url: string): string {
		let base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

		if (base64.test(url)) {
			return 'data:application/octet-stream;base64,' + url;
		} else {
			return url;
		}
	}

	public update(file: string): void {
		this.file = file;
		this.lazyload(file);
	}
}
