import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  @ViewChild('amountInput',{static:true})amountInput!:ElementRef;
  @ViewChild('nameInput',{static:true})nameInput!:ElementRef;

constructor(private shoppinglistService:ShoppingListService){

}


  addIngredients(){
        const newIngrediendt=new Ingredient(
          this.nameInput.nativeElement.value,
          this.amountInput.nativeElement.value
        );
  this.shoppinglistService.addAnIngredient(newIngrediendt);


  }
}
