import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsheetComponent } from './actionsheet';
import { LazyloadDirective } from './lazyload';
import { LoadingComponent } from './loading';
import { NotifyComponent } from './notify';
import { ScrollDirective } from './scroll';
import { CarouselComponent } from './carousel';
import { SwitchComponent } from './switch';
import { StatusbarComponent } from './statusbar';
import { TextareaDirective } from './textarea';
import { DayPipe } from './day';
import { NamePipe } from './name';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionsheetComponent,
    LazyloadDirective,
    LoadingComponent,
    NotifyComponent,
    ScrollDirective,
    CarouselComponent,
    SwitchComponent,
    StatusbarComponent,
    TextareaDirective,
    DayPipe,
    NamePipe
  ],
  exports: [
    ActionsheetComponent,
    LazyloadDirective,
    LoadingComponent,
    NotifyComponent,
    ScrollDirective,
    CarouselComponent,
    SwitchComponent,
    StatusbarComponent,
    TextareaDirective,
    DayPipe,
    NamePipe
  ]
})
export class AchromaticModule {}
