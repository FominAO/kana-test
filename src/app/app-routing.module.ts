import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiraganaComponent } from './hiragana/hiragana.component';

const routes: Routes = [
    {
        path:'',
        component: HiraganaComponent
    },
    {
        path: 'game/:id',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
