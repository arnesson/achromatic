import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[avatar]'
})
export class AvatarDirective implements OnInit {
	constructor(private elementRef: ElementRef) {}

	@Input('avatar') avatar: string;
	@Input('size') size: number | string;

	ngOnInit() {
		let size = this.size || 50;

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			width: typeof size === 'number' ? `${size}px` : size,
			height: typeof size === 'number' ? `${size}px` : size,
			display: 'block',
			borderRadius: '50%',
			backgroundColor: 'rgba(0,0,0,.1)',
			backgroundSize: 'cover',
			backgroundImage: `url(${this.url()})`
		});
	}

	private url(): string {
		let base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

		if (!this.avatar) {
			return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
		}
		if (base64.test(this.avatar)) {
			return 'data:application/octet-stream;base64,' + this.avatar;
		} else {
			return this.avatar;
		}
	}

	public update(avatar: string): void {
		this.avatar = avatar;

		(<any>Object).assign(this.elementRef.nativeElement.style, {
			backgroundImage: `url(${this.url()})`
		});
	}
}
