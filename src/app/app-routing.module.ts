import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { ScoreBoardComponent } from './score-board/score-board.component';

const routes: Routes = [
    {
        path:'',
        component: ScoreBoardComponent
    },
    {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule)
    },
    {
        path: 'learn',
        loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
