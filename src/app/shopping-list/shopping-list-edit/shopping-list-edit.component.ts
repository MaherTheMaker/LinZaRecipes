import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  @ViewChild('amountInput',{static:true})amountInput!:ElementRef;
  @ViewChild('nameInput',{static:true})nameInput!:ElementRef;

  @Output() addIngToList = new EventEmitter<Ingredient>();


  addIngredients(){
  this.addIngToList.emit(new Ingredient(
    this.nameInput.nativeElement.value,
    this.amountInput.nativeElement.value
    ));


  }
}
