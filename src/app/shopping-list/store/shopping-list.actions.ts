import { Action } from "@ngrx/store/src";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT='ADD_INGREDIENT'
export const UPDATE_INGREDIENT='UPDATE_INGREDIENT'
export const DELETE_INGREDIENT='DELETEINGREDIENT'
export const START_EDIT='START_EDIT'
export const STOP_EDIT='STOP_EDIT'

export class  addIngredient implements Action{
    type= ADD_INGREDIENT;
    constructor(public payload:Ingredient){}
}

export class  UpdateIngredient implements Action{
    type=UPDATE_INGREDIENT;
    constructor(public payload:{ingredient:Ingredient,index:number}){}
}

export class DeleteIngredient implements Action{
    type= DELETE_INGREDIENT;
    constructor(public payload:number){}
    
}

export class StartEdit implements Action{
    type=START_EDIT;
    constructor(public payload:number){}
}

export class StopEdit implements Action{
    type=STOP_EDIT
}
export type shoppingListActions= addIngredient|UpdateIngredient