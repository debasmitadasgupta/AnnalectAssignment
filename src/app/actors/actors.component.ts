import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddActorComponent } from './add-actor/add-actor.component'
import { MatTableDataSource } from '@angular/material/table';
import {DataServiceService} from './../services/data-service.service';
import {Subscription} from 'rxjs';


export interface Actors {
  id: number;
  full_name: string;
  date_of_birth: string;
  biography: string;
}


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  displayedColumns: string[] = ['full_name', 'date_of_birth', 'biography'];
  subscription: Subscription;
  datasource:any;
  actors:Actors[]
  constructor(private matDialog: MatDialog, private dataServiceService:DataServiceService) { 
    this.subscription = this.dataServiceService.getActor().subscribe(actor =>{
      console.log(actor)
      if(actor){
        this.actors.push(actor)
        this.datasource=new MatTableDataSource(this.actors)
      }
    })
  }


  ngOnInit() {
    this.dataServiceService.getActors().subscribe(res=>{
      console.log("res",res)
      this.actors=res
      this.datasource=new MatTableDataSource(this.actors)
    })
  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(AddActorComponent, {
      width: '640px', disableClose: true
    });
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
