import { Component, OnInit, ViewChild} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from  '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { fromEventPattern } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {

  commentForm: FormGroup;
  comment: Comment;
  today: any = Date.now();
  @ViewChild('fform') commentFormDirective;
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  formErrors = {
    "author": "",
    "comment": "",
    "rating": 1
    
  };
  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
     'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    },

    'rating': {
      'required':      'Rating is required.'
      
    },
    
    
  };



    constructor( private dishService: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder ) {
      this.createForm();
     }
    
    ngOnInit() {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }

    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        rating: ['', [Validators.required] ]
      });
      this.commentForm.valueChanges
      .subscribe(data=> this.onValueChanged(data));
      this.onValueChanged();
    }


    setPrevNext(dishId: string){
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)% this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)% this.dishIds.length];


    }

       

  goBack(): void {
    this.location.back();
  }


  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = " " + this.today.toString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author: "",
      comment: "",
      rating: 5
     
   
    
   
    });
    this.commentFormDirective.resetForm();

  }
  

}
