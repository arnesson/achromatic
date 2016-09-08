import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetComponent } from './ui/actionsheet';
import { AvatarDirective } from './ui/avatar';
import { LoadingService } from './ui/loading';
import { NotifyComponent } from './ui/notify';
import { ScrollDirective } from './ui/scroll';
import { CarouselComponent } from './ui/carousel';
import { SwitchComponent } from './ui/switch';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionSheetComponent,
    AvatarDirective,
    NotifyComponent,
    ScrollDirective,
    CarouselComponent,
    SwitchComponent
  ],
  providers: [
    LoadingService
  ],
  exports: [
    ActionSheetComponent,
    AvatarDirective,
    NotifyComponent,
    ScrollDirective,
    CarouselComponent,
    SwitchComponent
  ]
})
export class UIModule { }
