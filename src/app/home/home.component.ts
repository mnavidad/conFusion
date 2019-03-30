import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader'
import { LeaderService } from '../services/leader.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  constructor(private dishService: DishService, private leaderService: LeaderService,
    private promotionService: PromotionService) { }

  ngOnInit() {
     this.dishService.getFeatureDish().then(dish =>  this.dish = dish);;

   // this.dishService.getDishes().then((dishes) =>  this.dishes = dishes);
     this.promotionService.getFeaturePromotion().then(promotion => this.promotion = promotion);

     this.leaderService.getFeatureLeader().then(leader => this.leader = leader );

  }

}
