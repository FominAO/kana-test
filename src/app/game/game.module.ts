import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: ':alph',
    component: GameComponent 
  }
]

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GameRoutingModule
  ]
})
export class GameModule { }
