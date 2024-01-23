import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, ViewChild,Output, ElementRef, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingList } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
@ViewChild("f")form:NgForm
index:number;
editMode=false
editIng:Ingredient
subscribtion:Subscription
constructor(private ing:ShoppingList,private store:Store<{shoppingList:fromShoppingList.State}>){}
ngOnInit(): void {

 this.subscribtion= this.ing.startedEditing.subscribe((i:number)=>{
    this.index=i;
    //const ing=this.store.select('shoppingList')
   //this.editIng=this.ing.getIngredient(i)
   this.store.dispatch(new ShoppingListActions.StartEdit(this.index))
   this.store.select('shoppingList').subscribe(store=>{
    if(store.editIngredientIndex>-1){
      this.editMode=true
      this.editIng=store.editIngredient
      this.form.form.patchValue({
        name:this.editIng.name,
        amount:this.editIng.amount,
      })
    }
   })
  
  })
}
addIngredient(){
  const newingredient=new Ingredient(this.form.value.name,this.form.value.amount)
  if(this.editMode==true){
   // this.ing.editIngredient(newingredient,this.index)
   this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient:newingredient,index:this.index}))
   this.store.dispatch(new ShoppingListActions.StopEdit())
  }
  else{
    this.store.dispatch(new ShoppingListActions.addIngredient(newingredient))
    //this.ing.addIngredient(newingredient)
  }
  this.form.reset()
  this.editMode=false

}
onClear(){
  this.form.reset();
  this.editMode=false
  this.store.dispatch(new ShoppingListActions.StopEdit())
}
onDelete(){
  //console.log(this.index)
  //this.ing.deleteIngredient(this.index)
  this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.index))
  this.onClear()
}

}
