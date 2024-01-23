import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { Recipes } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy{
  
  editMode=false;
  editForm:FormGroup;
  id:number;
  subscription:Subscription
  
  constructor(private rout:ActivatedRoute,private recipeService:Recipes,private router:Router){}
  ngOnInit() {
   // this.initForm();
    this.subscription=this.rout.params.subscribe((param:Params)=>{
      this.editMode=param['index']!=null;
      this.id=+param['index']
      this.initForm();
      
    });
  
  }

  private initForm(){
    let recipeName=''
    let recipeImg=''
    let recipeDesc=''
    let recipeIng=new FormArray([])
    
    if(this.editMode){
      const recService=this.recipeService.getRecipe(this.id)
      recipeName=recService.name
      recipeImg=recService.imgPath
      recipeDesc=recService.description
      if(recService['ingredient']){
        recService['ingredient'].forEach(element => {
          recipeIng.push(new FormGroup({
            'name':new FormControl(element.name,Validators.required),
            'amount':new FormControl(element.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        });
      }
    }
    this.editForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imgPath':new FormControl(recipeImg,Validators.required),
      'description':new FormControl(recipeDesc,Validators.required),
      'ingredient':recipeIng
    
    })
    
  }
  get controls(){
    return (<FormArray>this.editForm.get('ingredient')).controls;
  }
  onSubmit(){
    if(this.editMode){
      //console.log(this.editForm.value)
      this.recipeService.editRecipe(this.editForm.value,this.id)
    }
    else{
      this.recipeService.addRecipe(this.editForm.value)
      this.editForm.reset()
    }
    this.onCancel()
    
  }
  
  addIng(){
    (<FormArray>this.editForm.get('ingredient')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
     })
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.rout})
  }
onDeleteIng(index:number){
 (<FormArray>this.editForm.get('ingredient')).removeAt(index)
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
