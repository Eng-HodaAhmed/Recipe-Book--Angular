import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule, HTTP_INTERCEPTORS}from'@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

import { ShoppingList } from './shopping-list/shopping-list.service';
import { AppRoutes } from './app-Routes.module';
import { Recipes } from './recipes/recipes.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipesResolver } from './recipes/recipes-resolver.service';
import { AuthInterceptorService } from './auth/auth-intercetor.service';
import { AuthGaurd } from './auth/auth.guard';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutes,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [ShoppingList,Recipes,DataStorageService,RecipesResolver,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
