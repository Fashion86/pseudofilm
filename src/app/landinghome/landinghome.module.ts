import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandinghomeComponent } from './landinghome.component';
import { LandinghomeRoutingModule } from './landinghome-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LandinghomeRoutingModule
  ],
  declarations: [LandinghomeComponent]
})
export class LandinghomeModule { }
