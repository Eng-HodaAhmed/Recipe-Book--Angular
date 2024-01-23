import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { appReducer, AppState } from "../store/app.reducer";
import { User } from "./user.model";
import * as authActions from'./store/auth.action'
interface AuthResponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient,private router:Router,private store:Store<AppState>){}
    // user=new BehaviorSubject<User>(null);
    user=this.store.select('auth')
    private timeExpiration;
    signUp(email:string,password:string){
       return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_Y7pVqE4v55StSMcwRUiYtpPNSizaVyI',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(err=>{
            let errMsg="An Unknown Error Occered"
            if(!err.error||!err.error.error){
                return throwError(()=>errMsg);
            }
            switch(err.error.error.message){
                case 'EMAIL_EXISTS':
                    errMsg="this Email is already Exists"
            
            }
            return throwError(()=>errMsg)
        }),tap(response=>{
            this.handelAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)
        }))
    }

    logIn(email:string,password:string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_Y7pVqE4v55StSMcwRUiYtpPNSizaVyI',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(err=>{
            let errMsg="An Unknown Error Occered"
            if(!err.error||!err.error.error){
                return throwError(()=>errMsg);
            }
            switch(err.error.error.message){
                case 'EMAIL_EXISTS':
                    errMsg="this Email is already Exists"
            
            }
            return throwError(()=>errMsg)
        }),tap(response=>{
            this.handelAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)
        }))
    }

    private handelAuthentication(
        email:string,
        userId:string,
        token:string,
        expiresIn:number
    ){
        const expirationDate=new Date(new Date().getTime()+expiresIn*1000)
        const user=new User(email,userId,token,expirationDate);
        this.store.dispatch(new authActions.Login(user))
        // this.user.next(user);
        localStorage.setItem('userData',JSON.stringify(user));
        this.autoLogout(expiresIn*1000)
        
    }

    autoLogin(){
        const userData=JSON.parse(localStorage.getItem('userData'))
        console.log(userData)
        if(!userData){
            return;
        }
        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpiration))
        //console.log(loadedUser.token)
        if(loadedUser.token){
            console.log("loginData" + loadedUser)
            //this.user.next(loadedUser)
            this.store.dispatch(new authActions.Login(loadedUser))
           const expiresTime=new Date(userData._tokenExpiration).getTime()-new Date().getTime()
            this.autoLogout(expiresTime)
        }
    }

    logOut(){
        this.store.dispatch(new authActions.Logout())
        this.router.navigate(['./auth'])
        localStorage.removeItem('userData')
        if(this.timeExpiration){
            clearTimeout(this.timeExpiration)
        }
        this.timeExpiration=null
    }

    autoLogout(expirationDate:number){
        this.timeExpiration=setTimeout(() => {
            this.logOut();
        }, expirationDate);
    }
}