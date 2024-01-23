import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "../auth/auth.guard";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolver } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routs:Routes=[
    
    {path:'',canActivate:[AuthGaurd],component:RecipesComponent,children:[
      {path:'',component:RecipeStartComponent},
      {path:'new',component:RecipeEditComponent},
      {path:':index',component:RecipeDetailsComponent,resolve:[RecipesResolver]},
      {path:':index/edit',component:RecipeEditComponent}
    ]},
]
@NgModule({
    imports:[RouterModule.forChild(routs)],
    exports:[RouterModule]
})
export class RecipeRoutingModule{}