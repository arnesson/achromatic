import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[lazyload]'
})
export class LazyloadDirective implements OnInit {
	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer
	) {}

	@Input('lazyload') file: string;
	@Input('placeholder') placeholder: string;
	@Input('width') width: number | string;
	@Input('height') height: number | string;

	private loaded: boolean = false;

	ngOnInit() {
		let width = this.width || 'auto';
		let height = this.height || 'auto';

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			width: typeof width === 'number' ? `${width}px` : width,
			height: typeof height === 'number' ? `${height}px` : height,
			display: 'block',
			overflow: 'hidden',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
		});

		if (this.placeholder) {
			this.blur(this.placeholder);
		}
		if (this.file) {
			this.lazyload(this.file);
		}
	}

	private blur(file: string) {
        let img = new Image();
		img.onload = () => {
			let svg = btoa(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
<filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feGaussianBlur stdDeviation="5 5" edgeMode="duplicate" />
<feComponentTransfer>
  <feFuncA type="discrete" tableValues="1 1" />
</feComponentTransfer>
</filter>
<image filter="url(#blur)" xlink:href="${img.src}" x="0" y="0" height="100%" width="100%"/>
</svg>`);

			if (!this.loaded) {
				(<any>Object).assign(this.elementRef.nativeElement.style, {
					backgroundImage: `url(data:image/svg+xml;charset=utf-8;base64,${svg})`
				});
			}
		};
		img.src = this.base64(file);
	}

	private in_viewport(element: any) {
	  let rect = element.getBoundingClientRect();
	  return (
	    rect.top < ((<any>window).innerHeight || (<any>document).documentElement.clientHeight) &&
	    rect.bottom > 0
	  );
	}

	private lazyload(file: string) {
		let load = () => {
	        let img = new Image();
			img.onload = () => {
				this.loaded = true;
				(<any>Object).assign(this.elementRef.nativeElement.style, {
					backgroundImage: `url(${img.src})`
				});
				this.renderer.setElementClass(this.elementRef.nativeElement, 'loaded', true);
			};
			img.src = this.base64(file);
		}
		if (this.in_viewport(this.elementRef.nativeElement)) {
			load();
		} else {
			let scroll = ((<any>document).querySelector('[scroll]') || (<any>window));
			let listener = () => {
				if (this.in_viewport(this.elementRef.nativeElement)) {
					load();
					scroll.removeEventListener("scroll", listener);
				}
			};
			scroll.addEventListener("scroll", listener);
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

	public update(file?: string): void {
		this.file = file;
		if (file) {
			this.lazyload(file);
		} else {
			(<any>Object).assign(this.elementRef.nativeElement.style, {
				backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
			});
		}
	}
}
