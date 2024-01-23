import { User } from "../user.model";
import * as AuthActions from './auth.action'
export interface State{
    user:User
}
const initialState={
    user:null
}
export function authReducer (state=initialState,action:any){
    switch(action.type){
        case AuthActions.LOG_IN:
           
            return{
                ...state,
                user:action.payload
            }

        case AuthActions.LOG_OUT:
            return{
                ...state,
                user:null
            }
        default:
        return state;
    }
   
}