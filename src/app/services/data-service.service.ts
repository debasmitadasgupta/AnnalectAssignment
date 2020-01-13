import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private subject = new Subject<any>();
  actor:any;
  movie: any;
  constructor(private http: HttpClient) { }

  getActors():Observable<any>{
    return this.http.get("http://127.0.0.1:5000/api/listActors")
  }

  saveActor(params):Observable<any>{
    this.actor=params
    return this.http.post("http://127.0.0.1:5000/api/saveActor",params)
  }

  sendActor(){
    this.subject.next(this.actor)
  }
  getActor(): Observable<any> {
    return this.subject.asObservable();
}

getMovies():Observable<any>{
  return this.http.get("http://127.0.0.1:5000/api/listMovies")
}

saveMovie(params):Observable<any>{
  this.movie=params
  return this.http.post("http://127.0.0.1:5000/api/saveMovie",params)
}

sendMovie(){
  this.subject.next(this.movie)
}
getMovie(): Observable<any> {
  return this.subject.asObservable();
}
}
