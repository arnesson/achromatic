import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsheetComponent } from './actionsheet';
import { LazyloadDirective } from './lazyload';
import { LoadingComponent } from './loading';
import { ScrollDirective } from './scroll';
import { SwitchComponent } from './switch';
import { StatusbarComponent } from './statusbar';
import { TextareaDirective } from './textarea';
import { DayPipe } from './day';
import { NamePipe } from './name';
import { DistancePipe } from './distance';
import { Tooltip, TooltipContent } from './tooltip';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionsheetComponent,
    LazyloadDirective,
    LoadingComponent,
    ScrollDirective,
    SwitchComponent,
    StatusbarComponent,
    TextareaDirective,
    DayPipe,
    NamePipe,
    DistancePipe,
    Tooltip,
    TooltipContent
  ],
  exports: [
    ActionsheetComponent,
    LazyloadDirective,
    LoadingComponent,
    ScrollDirective,
    SwitchComponent,
    StatusbarComponent,
    TextareaDirective,
    DayPipe,
    NamePipe,
    DistancePipe,
    Tooltip,
    TooltipContent
  ]
})
export class AchromaticModule {}
