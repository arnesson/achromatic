import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
	private el: HTMLElement;

    public start(): void {
    	if (!this.el) {
    		this.el = document.createElement('loading');
    		document.body.appendChild(this.el);
    	}
    	if (this.el) {
    		this.el.style.display = 'block';
    	}
    }
    public stop(): void {
    	if (this.el) {
    		this.el.style.display = 'none';
    	}
    }
}
