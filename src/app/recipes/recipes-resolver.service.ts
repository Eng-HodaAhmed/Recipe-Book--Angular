import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { Recipes } from "./recipes.service";
@Injectable()
export class RecipesResolver implements Resolve<Recipe[]>{
    constructor(private storageData:DataStorageService,private recipeServise:Recipes){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes=this.recipeServise.recipes
        if(recipes.length===0){
            return this.storageData.fechRecipes()
        }
        else{
            return recipes
        }
    }

}