import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from'./shopping-list.actions'

export interface State{
    ingredients:Ingredient[],
    editIngredientIndex:number,
    editIngredient:Ingredient
}

const initialState={
    ingredients:[new Ingredient("apple",5),new Ingredient("orange",9)],
    editIngredientIndex:-1,
    editIngredient:null
}
export function shoppingListReducer(state=initialState,action:any){
  
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
        return{
            ...state,
            ingredients:[...state.ingredients,action.payload]
        }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient=state.ingredients[action.payload.index]
            const updateIng={
                ...ingredient,
                ...action.payload.ingredient
            }
            const updatedIngredients=[...state.ingredients]
            updatedIngredients[action.payload.index]=updateIng
            return{
                ...state,
                ingredients:updatedIngredients
            }

        case ShoppingListActions.DELETE_INGREDIENT:
            return{
                ...state,
                ...state.ingredients.filter((ing,ingindex)=>{
                    return ingindex!==action.payload
                })
            }
        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editIngredientIndex:action.payload,
                editIngredient:{...state.ingredients[action.payload]}
            }
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editIngredientIndex:-1,
                editIngredient:null
            }
        default:
            return state;
    }
}