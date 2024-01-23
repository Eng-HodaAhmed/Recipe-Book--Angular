import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import * as shoppingListActions from "./store/shopping-list.actions"
import * as fromShoppingList from "./store/shopping-list.reducer"
@Injectable()
export class ShoppingList{
  constructor(private store:Store<{shoppinglist:fromShoppingList.State}>){}
    startedEditing=new Subject<number>();
   // private ingredients:Ingredient[]=[new Ingredient("apple",5),new Ingredient("orange",9)];
    
    addIngredient(ingredient:Ingredient){
      // this.ingredients.push(ingredient)
      this.store.dispatch(new shoppingListActions.addIngredient(ingredient))
    }
    editIngredient(ingredient:Ingredient,i:number){
       // this.ingredients[i]=ingredient
    }

    deleteIngredient(index:number){
        //this.ingredients.splice(index,1)
        
    }

    getIngredients(){
      //  return this.ingredients.slice();
    }
    getIngredient(i:number){
       // return this.ingredients[i]
    }
    
}