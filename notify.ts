import { Component } from '@angular/core';

@Component({
  selector: 'notify',
  template: `
    <div *ngFor="let notification of queue" [ngClass]="{active: notification.active}" class="notify alert {{notification.classname}}">{{notification.message}}</div>
  `
})
export class NotifyComponent {
  public queue: any[] = [];

  private publish(message: string, options?: any, default_classname?: string) {
      let max_slots = 5;
      let slot = 0;
      let expires = options && options.expires || 0;
      let notification = {
          message: message,
          active: true,
          classname: options && options.classname || default_classname,
          timeout: 0
      };

      if (expires) {
        notification.timeout = setTimeout(() => {
          notification.active = false;
        }, (expires) + 500);
      }

      for (slot = 0; slot < max_slots; slot++) {
          if (this.queue[slot] && this.queue[slot].active && this.queue[slot].message === notification.message) {
              return;  // duplicate notification
          }
      }

      for (slot = 0; slot < max_slots; slot++) {
          if (!this.queue[slot] || !this.queue[slot].active) {
              this.queue[slot] = notification;
              return this.queue[slot];
          }
      }
  }

  public success(message: string, options?: any) {
    this.publish(message, options, "btn-block");
  }

  public info(message: string, options?: any) {
    this.publish(message, options, "btn-block");
  }

  public warning(message: string, options?: any) {
    this.publish(message, options, "btn-block");
  }

  public error(message: string, options?: any) {
    this.publish(message, options, "btn-block");
  }

  public clear() {
    this.queue = [];
  }
}
