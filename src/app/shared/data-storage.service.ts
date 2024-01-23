import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Recipes } from "../recipes/recipes.service";
@Injectable()
export class DataStorageService{
    constructor(private http:HttpClient,private recipes:Recipes){
    }
    storeData(){
        const recipes=this.recipes.recipes
        this.http.put('https://recipe-book-56d5e-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(recipes=>{})
        
    }
    fechRecipes(){
        return  this.http.get<Recipe[]>('https://recipe-book-56d5e-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients:recipe.ingredient?recipe.ingredient:[]}
            })
        }),tap(
            recipes=>{this.recipes.setRecipes(recipes)}
            )
        )
    }    
    
}