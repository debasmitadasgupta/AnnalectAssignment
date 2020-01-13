import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { MoviesComponent } from './movies/movies.component';



const routes: Routes = [
  {path:'',redirectTo:'actors',pathMatch:"full"},
  {path:'actors', component:ActorsComponent},
  {path:'movies', component:MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
