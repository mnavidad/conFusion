import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { resolve } from 'url';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes(): Observable<Dish[]> {
   // return Promise.resolve(DISHES);
    // return new Promise(resolve => {
    //   //simulate server latency with 2 second delay
    // setTimeout(()=> resolve(DISHES), 2000);
    // });

    // return new Promise(resolve => {
    //   //simulate server latency with 2 second delay
     return  of(DISHES).pipe(delay(2000));
    // });

  }
  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish)=>(dish.id===id))[0]).pipe(delay(2000));
 
  }
  getFeatureDish(): Observable<Dish> {
    return of(DISHES.filter((dish)=> dish.featured)[0]).pipe(delay(2000));
 
   // return Promise.resolve(DISHES.filter((dish)=> dish.featured)[0]);
  }
  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish=> dish.id));
  }
}
