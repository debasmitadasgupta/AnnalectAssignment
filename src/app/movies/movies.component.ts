import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MatTableDataSource } from '@angular/material/table';
import {DataServiceService} from './../services/data-service.service';
import {Subscription} from 'rxjs';

export interface Movies {
  id: number;
  title: string;
  release_date: string;
  description: string;
}


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'release_date', 'description'];
  subscription: Subscription;
  datasource:any;
  movies:Movies[]
  constructor(private matDialog: MatDialog, private dataServiceService:DataServiceService) { 
    this.subscription = this.dataServiceService.getMovie().subscribe(movie =>{
      console.log(movie)
      if(movie){
        this.movies.push(movie)
        this.datasource=new MatTableDataSource(this.movies)
      }
    })
  }


  ngOnInit() {
    this.dataServiceService.getMovies().subscribe(res=>{
      console.log("res",res)
      this.movies=res
      this.datasource=new MatTableDataSource(this.movies)
    })
  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(AddMovieComponent, {
      width: '640px', disableClose: true
    });
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}

