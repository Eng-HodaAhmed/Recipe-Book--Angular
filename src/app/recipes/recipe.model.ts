import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
   public name:string;
   public description:string;
   public imgPath:string;
   public ingredient:Ingredient[]
   
   constructor(name:string,desc:string,imgPath:string,ingr:Ingredient[]){
     this.name=name;
     this.description=desc;
     this.imgPath=imgPath;
     this.ingredient=ingr;
   }

}