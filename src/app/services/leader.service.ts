import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
//import { delay } from 'q';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
    
   // return Promise.resolve(LEADERS);
  }
  getLeader(id: string): Observable<Leader> {

    return of(LEADERS.filter((leader)=>(leader.id===id))[0]).pipe(delay(2000));


  // return Promise.resolve(LEADERS.filter((leader)=>(leader.id===id))[0]);
  }
  getFeatureLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader)=> leader.featured)[0]).pipe(delay(2000));
 

   // return Promise.resolve(LEADERS.filter((leader)=> leader.featured)[0]);
  }

  constructor() { }
}



