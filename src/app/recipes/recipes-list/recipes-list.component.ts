import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
// import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  recipes : Recipe[] =[
    new Recipe("Buger", "The best Burger in Madrid",'https://th.bing.com/th/id/OIP.Xpa7p1XJIYLs4HX5jjkHmwHaGJ?pid=ImgDet&rs=1'),
    new Recipe('Pasta','alferedo pasta','https://th.bing.com/th/id/OIP.wteWK2kTyO2Co5GUQO7YJQHaE7?pid=ImgDet&rs=1')
  ];
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  selectRecipe(rec:Recipe){
    this.selectedRecipe.emit(rec);
      }
}
