import { Component, OnInit, VERSION, ViewChild ,Output,EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {DataServiceService} from './../../services/data-service.service';
import { Observable ,Subject} from 'rxjs';



@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  providers:[DatePipe]
})

export class AddMovieComponent implements OnInit {
  @Output() onActorSave: EventEmitter<any> = new EventEmitter<any>();

 
  public data ={
    title:"",
    release_date:"",
    description:""
  }

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private dataServiceService:DataServiceService
  ) { }

  public ngOnInit(): void {
    
  }

  onaddmovie(){
    this.data['release_date']=this.datePipe.transform(this.data.release_date,'MMM d, y')
    console.log(this.data)
    this.dataServiceService.saveMovie(this.data).subscribe(res=>
      {
        if(res.status == 200){
          this.dialog.closeAll()
          this.dataServiceService.sendMovie()
      }
      })

  }
  public openDialog(): void{
    this.dialog.closeAll();
  }
 

}