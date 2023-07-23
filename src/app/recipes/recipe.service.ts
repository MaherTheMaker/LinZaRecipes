import {  Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  changeRecipesList=new Subject<Recipe[]>();
 // private recipes : Recipe[] =[
 //    new Recipe("Burger", "The best Burger in Madrid",
 //    'https://th.bing.com/th/id/OIP.Xpa7p1XJIYLs4HX5jjkHmwHaGJ?pid=ImgDet&rs=1',
 //    [new Ingredient("Bun",2),
 //  new Ingredient("Meat",1),
 //  new Ingredient("cheese",10)
 //  ]),
 //    new Recipe('Pasta','Alfredo pasta','https://th.bing.com/th/id/OIP.wteWK2kTyO2Co5GUQO7YJQHaE7?pid=ImgDet&rs=1',
 //    [
 //      new Ingredient("Pasta",0.5),
 //      new Ingredient("Chicken breast",0.4),
 //      new Ingredient("Cooking Cream",.5)
 //    ])
 //  ];
private recipes:Recipe[]=[];

  constructor(private shopListService:ShoppingListService){

  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.changeRecipesList.next(this.getRecipes());
  }
  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index]=recipe;
    this.changeRecipesList.next(this.getRecipes());

  }
  setRecipe(recipes:Recipe[])
  {
    this.recipes=recipes;
    this.changeRecipesList.next(this.getRecipes());

  }
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(i:number){
  return this.recipes[i];
  }

  addToShoppingList(ingredients:Ingredient[])
  {
    this.shopListService.addMultipleIns(ingredients);
  }
  deleteRecipe(index:number)
  {
    this.recipes.splice(index,1);
    this.changeRecipesList.next(this.getRecipes());


  }

}
