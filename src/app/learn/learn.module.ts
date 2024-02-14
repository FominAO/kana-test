import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn.component';
import { LearnRoutingModule } from './learn-routing.module';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LearnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LearnRoutingModule
  ]
})
export class LearnModule { }
