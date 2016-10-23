import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetComponent } from './ui/actionsheet';
import { AvatarDirective } from './ui/avatar';
import { CoverDirective } from './ui/cover';
import { LoadingComponent } from './ui/loading';
import { NotifyComponent } from './ui/notify';
import { ScrollDirective } from './ui/scroll';
import { CarouselComponent } from './ui/carousel';
import { SwitchComponent } from './ui/switch';
import { StatusbarComponent } from './ui/statusbar';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionSheetComponent,
    AvatarDirective,
    CoverDirective,
    LoadingComponent,
    NotifyComponent,
    ScrollDirective,
    CarouselComponent,
    SwitchComponent,
    StatusbarComponent
  ],
  exports: [
    ActionSheetComponent,
    AvatarDirective,
    CoverDirective,
    LoadingComponent,
    NotifyComponent,
    ScrollDirective,
    CarouselComponent,
    SwitchComponent,
    StatusbarComponent
  ]
})
export class UIModule {}
