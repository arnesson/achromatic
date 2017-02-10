// http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

import { Component, forwardRef, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {};

@Component({
  selector: 'switch',
  template: `
    <div class="scroller" style="position:absolute;height:28px;width:62px;top:0;left:0">
      <div style="height:28px;width:17px;top:0;left:0;position:absolute;"></div>
      <div class="handle" style="height:28px;width:28px;background: #fff;border:1px solid #ddd;border-radius: 100px;top:0;left:17px;position:absolute;"></div>
      <div style="height:28px;width:17px;top:0;left:45px;position:absolute;"></div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private innerValue: any;
  private cleanup: any;

  constructor(private elementRef: ElementRef) {}

  // Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  };

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;

      if (v) {
        this.elementRef.nativeElement.classList.add('active');
      } else {
        this.elementRef.nativeElement.classList.remove('active');
      }
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit() {
    let fn = () => {
      if (this.value) {
        this.elementRef.nativeElement.classList.add('active');
      } else {
        this.elementRef.nativeElement.classList.remove('active');
      }
    };
    this.elementRef.nativeElement.addEventListener('click', fn);
    this.cleanup = () => {
      this.elementRef.nativeElement.removeEventListener('click', fn);
    };
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}
