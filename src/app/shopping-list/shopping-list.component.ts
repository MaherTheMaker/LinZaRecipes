import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingrediendts: Ingredient[] = [
    new Ingredient('Meat', 1),
    new Ingredient('Pasta', 1),
    new Ingredient('Cheese', 10),
  ];


  addToIngrediendts(newIngrediendt: Ingredient) {
    this.ingrediendts.push(newIngrediendt);
  }


}
