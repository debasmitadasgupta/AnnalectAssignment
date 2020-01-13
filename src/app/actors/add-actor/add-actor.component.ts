import { Component, OnInit, VERSION, ViewChild ,Output,EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {DataServiceService} from './../../services/data-service.service';
import { Observable ,Subject} from 'rxjs';



@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss'],
  providers:[DatePipe]
})

export class AddActorComponent implements OnInit {
  @Output() onActorSave: EventEmitter<any> = new EventEmitter<any>();

 
  public data ={
    full_name:"",
    date_of_birth:"",
    biography:""
  }

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private dataServiceService:DataServiceService
  ) { }

  public ngOnInit(): void {
    
  }

  onaddactor(){
    this.data['date_of_birth']=this.datePipe.transform(this.data.date_of_birth,'MMM d, y')
    console.log(this.data)
    this.dataServiceService.saveActor(this.data).subscribe(res=>
      {
        if(res.status == 200){
          this.dialog.closeAll()
          this.dataServiceService.sendActor()
      }
      })

  }
  public openDialog(): void{
    this.dialog.closeAll();
  }
 

}