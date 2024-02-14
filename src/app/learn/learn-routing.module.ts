import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './learn.component';

const routes: Routes = [
  {
    path: ':alph',
    component: LearnComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
