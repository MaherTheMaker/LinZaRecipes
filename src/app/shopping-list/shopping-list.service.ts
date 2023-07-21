import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {

  changeIngrediendtsList=new EventEmitter<Ingredient[]>();
  private ingrediendts: Ingredient[] = [
    new Ingredient('Meat', 1),
    new Ingredient('Pasta', 1),
    new Ingredient('Cheese', 10),
  ];

  getIngerdients() {
    return this.ingrediendts.slice();
  }

  addAnIngerdient(newIngrediendt: Ingredient) {
    this.ingrediendts.push(newIngrediendt);
    this.changeIngrediendtsList.emit(this.getIngerdients())
  }
  addMultipulIngs(ingredients:Ingredient[])
  {
        this.ingrediendts.push(...ingredients);
        this.changeIngrediendtsList.emit(this.getIngerdients());
  }
  constructor() {}
}
