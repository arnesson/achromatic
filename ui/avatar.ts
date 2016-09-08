import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[avatar]'
})
export class AvatarDirective implements OnInit {
	constructor(private elementRef: ElementRef) {}

	@Input('avatar') avatar: string;
	@Input('size') size: number;

	ngOnInit() {
		Object.assign(this.elementRef.nativeElement.style, {
			width: `${this.size || 50}px`,
			height: `${this.size || 50}px`,
			display: 'block',
			borderRadius: '50%',
			backgroundColor: 'rgba(0,0,0,.1)',
			backgroundSize: 'cover',
			backgroundImage: `url(${this.avatar || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'})`
		});
	}

	public update(avatar: string): void {
		this.avatar = avatar;

		Object.assign(this.elementRef.nativeElement.style, {
			backgroundImage: `url(${this.avatar || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'})`
		});
	}
}
