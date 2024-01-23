import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner/loading-spinner.component";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
        AuthComponent,
        
        
    ],
    imports:[
        FormsModule,
        CommonModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild([{path:'',component:AuthComponent}]),
    ],
    exports:[]
})
export class AuthModule{

}