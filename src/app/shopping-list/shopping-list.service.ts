import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from "rxjs";

@Injectable()
export class ShoppingListService {

  changeIngredientsList=new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Meat', 1),
    new Ingredient('Pasta', 1),
    new Ingredient('Cheese', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addAnIngredient(newIngrediendt: Ingredient) {
    this.ingredients.push(newIngrediendt);
    this.changeIngredientsList.next(this.getIngredients())
  }
  addMultipleIns(ingredients:Ingredient[])
  {
        this.ingredients.push(...ingredients);
        this.changeIngredientsList.next(this.getIngredients());
  }
  constructor() {}
}
