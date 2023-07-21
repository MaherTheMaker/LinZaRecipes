import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingrediendts: Ingredient[]=[];

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingrediendts=this.shoppinglistService.getIngerdients();
    this.shoppinglistService.changeIngrediendtsList.subscribe(
      (ingrediendts:Ingredient[])=>{
        this.ingrediendts=ingrediendts;
      }
    )
  }
}
