import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from  '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { fromEventPattern } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
   },
   animations:[
     flyInOut(),
     visibility(),
     expand()
   ]
  
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
  errMess: string;
  dishcopy: Dish;
  visibility = 'shown';

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



    constructor( private dishService: DishService, 
      private location: Location, 
      private route: ActivatedRoute, 
      private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL, ) {
      this.createForm();
     }
    
    ngOnInit() {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
      .pipe(switchMap((params: Params) =>{this.visibility = 'hidden'; return this.dishService.getDish(params['id']);}))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility ='shown'; }, errmess => this.errMess = <any> errmess);
    // this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    //.subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
     // errmess => this.errMess = <any>errmess);

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
  //  this.dish.comments.push(this.comment);
  this.dishcopy.comments.push(this.comment);
  this.dishService.putDish(this.dishcopy).subscribe(dish =>{
    this.dish = dish; this.dishcopy = dish;
  }, errmess => {
    this.dish = null; this.dishcopy = null; this.errMess =<any>errmess;
  });
    console.log(this.comment);
    this.commentForm.reset({
      author: "",
      comment: "",
      rating: 5
     
   
    
   
    });
    this.commentFormDirective.resetForm();

  }
  

}
