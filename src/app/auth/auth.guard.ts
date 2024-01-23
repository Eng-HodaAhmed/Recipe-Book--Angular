import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { AuthService } from "./auth.service";
// @Injectable({providedIn:"root"})
@Injectable()
export class AuthGaurd implements CanActivate{
    constructor(private authService:AuthService,private router:Router,private store:Store<AppState>){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //return this.authService.user.pipe(take(1),map(user=>{
            return this.store.select('auth').pipe(take(1),map(authState=>{
            const isAuth=!!authState.user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth'])
        }))
    }

}