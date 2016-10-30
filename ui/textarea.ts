import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea:not([rows])'
})
export class TextareaDirective {

  @HostListener('input') input() {
    this.renderer.setElementStyle(this.element.nativeElement, 'overflow', 'hidden');
    this.renderer.setElementStyle(this.element.nativeElement, 'height', 'auto');

    let scrollHeight = this.element.nativeElement.scrollHeight;

    if (scrollHeight > 0) {
      this.renderer.setElementStyle(this.element.nativeElement, 'height', scrollHeight + 'px');
    }
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer
  ) {
    this.renderer.setElementAttribute(this.element.nativeElement, 'rows', '1');
  }
}
