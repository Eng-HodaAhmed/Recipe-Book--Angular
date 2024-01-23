import { Component, Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    constructor(private authService: AuthService, private router: Router) { }
    isLogin = true;
    isLoading = false;
    error: string = null;
    onSwitch() {
        this.isLogin = !this.isLogin
    }
    onSubmit(form: NgForm) {
        const email = form.value.email
        const password = form.value.password
        if (!form.valid) {
            return;
        }
        if (this.isLogin) {
            this.isLoading = true;
            this.authService.logIn(email, password).subscribe
                ({
                    next: (res) => {
                        this.isLoading = false;
                        this.router.navigate(['./recipe'])
                    }
                    , error: (e) => this.error = e
                })
                this.isLoading = false;

            form.reset()
        }
        else {
            this.isLoading = true;
            this.authService.signUp(email, password).subscribe({
                next: (res) => {
                    this.isLoading = false;
                    this.router.navigate(['./recipe'])
                }, error: (e) => this.error = e
            })
            this.isLoading = false;
            form.reset()

        }

    }

    onHandelError(){
        this.error=null
    }
}