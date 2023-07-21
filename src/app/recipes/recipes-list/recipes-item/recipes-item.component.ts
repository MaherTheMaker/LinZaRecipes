import { Component, EventEmitter, Input ,OnInit, Output} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css'],
})
export class RecipesItemComponent implements OnInit {

  @Input() rec!: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
  selectRecipe() {
  this.recipeService.recipeSelected.emit(this.rec);
  }
}
