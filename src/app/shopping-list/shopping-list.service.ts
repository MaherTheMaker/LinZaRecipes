import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from "rxjs";

@Injectable()
export class ShoppingListService {

  changeIngredientsList = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  // private ingredients: Ingredient[] = [
  //   new Ingredient('Meat', 1),
  //   new Ingredient('Pasta', 1),
  //   new Ingredient('Cheese', 10),
  // ];
  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return this.ingredients.slice()[i];
  }

  addAnIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.changeIngredientsList.next(this.getIngredients())
  }

  addMultipleIns(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.changeIngredientsList.next(this.getIngredients());
  }

  editAnIngredient(newIngredient: Ingredient, index: number) {
    this.ingredients[index] = newIngredient;
    this.changeIngredientsList.next(this.getIngredients())
  }

  deleteAnIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.changeIngredientsList.next(this.getIngredients())
  }

  constructor() {
  }
}
