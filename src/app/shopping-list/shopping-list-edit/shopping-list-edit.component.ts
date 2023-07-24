import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from 'src/app/shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) shoppingForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }


  OnAddIngredients(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(
      value.name, value.amount
    );

    if (!this.editMode) {

      this.shoppingListService.addAnIngredient(newIngredient);
    } else {
      this.shoppingListService.editAnIngredient(newIngredient, this.editedItemIndex);

    }
    this.OnResetClick();

  }

  OnResetClick() {
    this.shoppingForm.reset();
    this.editMode = false;

  }

  OnDeleteItem() {
    this.shoppingListService.deleteAnIngredient(this.editedItemIndex);
    this.OnResetClick();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
