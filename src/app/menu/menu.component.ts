import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES} from '../shared/dishes'; I need this 
import { flyInOut, expand }  from '../animations/app.animations';

import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
   '[@flyInOut]': 'true',
   'style': 'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
 
  dishes: Dish[];
  errMess: string;

 // selectedDish: Dish;

  constructor(private dishService: DishService, @Inject("BaseURL") private BaseURL) { }

  ngOnInit() {

   this.dishService.getDishes().subscribe((dishes) =>  this.dishes = dishes,
   errmess => this.errMess = <any> errmess);
  }
  // onSelect(dish: Dish){
  //   this.selectedDish = dish;
  // }

}
