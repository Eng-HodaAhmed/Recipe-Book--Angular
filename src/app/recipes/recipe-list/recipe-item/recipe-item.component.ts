import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Recipes } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
@Input() rec:Recipe;
@Input() index;
constructor(private recipe:Recipes){}


onselected(){
this.recipe.selectedRecipe.next(this.rec);
}

}
