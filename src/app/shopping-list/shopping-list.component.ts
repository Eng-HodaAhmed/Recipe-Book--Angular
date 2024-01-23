import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingList } from './shopping-list.service';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit,DoCheck{
ingredients:Observable<{ingredients:Ingredient[]}>
constructor(private ingredientService:ShoppingList,private store:Store<fromApp.AppState>){}
ngOnInit(){
  // this.ingredients=this.ingredient.getIngredients();
  this.ingredients=this.store.select('shoppingList')
  //console.log(this.ingredients)

}
ngDoCheck(){


}
editItem(i:number){
this.ingredientService.startedEditing.next(i);

}

}
