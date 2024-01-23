import { EventEmitter } from "@angular/core"
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model"
export class Recipes {
    selectedRecipe = new Subject <Recipe>();
    checkedRecipe=new Subject<Recipe[]>();
    recipes: Recipe[]
    // recipes: Recipe[] = [
    //     new Recipe("name1", "test descripthion",
    //         "https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg",
    //         [new Ingredient("meat", 1)]),
    //     new Recipe("name2", "test descripthion2",
    //         "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
    //         [new Ingredient("meat", 1), new Ingredient("fish", 2)])]
    getRecipe(index: number) {
        return this.recipes[index]
    }
    addRecipe(receipe:Recipe){
        this.recipes.push(receipe)
        this.checkedRecipe.next(this.recipes.slice())
       
    }
    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.checkedRecipe.next(this.recipes.slice())
        
    }
    editRecipe(recipe:Recipe,index){
        this.recipes[index]=recipe;
        this.checkedRecipe.next(this.recipes.slice())
        //console.log(this.recipes)
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.checkedRecipe.next(this.recipes.slice())
    }
}