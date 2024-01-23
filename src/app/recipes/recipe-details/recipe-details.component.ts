
import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingList } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { Recipes } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{
recipe:Recipe;
index:number;
constructor(private rec:Recipes,private shoppinglist:ShoppingList,private rout:ActivatedRoute,
  private router:Router){}
ngOnInit(){
  this.rout.params.subscribe((param:Params)=>{this.index=+param['index']
  this.recipe=this.rec.getRecipe(this.index)
})
 
}
editRecipe(){
this.router.navigate(['edit'],{relativeTo:this.rout})
}

Addtoshopping(ingredients:Ingredient[]){
  ingredients.forEach(element => {
    this.shoppinglist.addIngredient(element)
  });
}
onDelete(){
this.rec.deleteRecipe(this.index)
this.router.navigate(['/recipe']);
}
}
