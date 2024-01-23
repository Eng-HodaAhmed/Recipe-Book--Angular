import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { Recipe } from '../recipe.model';
import { Recipes } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes:Recipe[];
 constructor(private recipe:Recipes,private router:Router,private rout:ActivatedRoute){}
 ngOnInit() {
   this.recipe.checkedRecipe.subscribe(
    (rcp:Recipe[])=>{
    this.recipes=rcp;
    
  })
   this.recipes=this.recipe.recipes;
 }
 newRecipe(){
  this.router.navigate(['new'],{relativeTo:this.rout})
 }
}
