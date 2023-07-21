import {  Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {


 private recipes : Recipe[] =[
    new Recipe("Burger", "The best Burger in Madrid",
    'https://th.bing.com/th/id/OIP.Xpa7p1XJIYLs4HX5jjkHmwHaGJ?pid=ImgDet&rs=1',
    [new Ingredient("Bun",2),
  new Ingredient("Meat",1),
  new Ingredient("cheese",10)
  ]),
    new Recipe('Pasta','Alfredo pasta','https://th.bing.com/th/id/OIP.wteWK2kTyO2Co5GUQO7YJQHaE7?pid=ImgDet&rs=1',
    [
      new Ingredient("Pasta",0.5),
      new Ingredient("Chicken breast",0.4),
      new Ingredient("Cooking Cream",.5)
    ])
  ];


  constructor(private shopListService:ShoppingListService){

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

}
