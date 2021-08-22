import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  {path:'', component: BoardComponent},
  {path:'board', component: BoardComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})



export class RoutingModule { }