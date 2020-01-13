import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DemoMaterialModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActorsComponent } from './actors/actors.component';
import { MoviesComponent } from './movies/movies.component';
import { MatDialogModule } from '@angular/material/dialog';
import {AddActorComponent} from './actors/add-actor/add-actor.component'
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataServiceService} from './services/data-service.service';
import { DatePipe } from '@angular/common';
import {AddMovieComponent} from './movies/add-movie/add-movie.component';


@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    MoviesComponent,
    AddActorComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataServiceService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddActorComponent,AddMovieComponent],
})
export class AppModule { }
