import { Component, EventEmitter, Input ,OnInit, Output} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent  implements OnInit{
  @Output() selectedRecipe = new EventEmitter<void>();
  @Input() rec!: Recipe;

  ngOnInit(): void {

  }
  selectRecipe(){
this.selectedRecipe.emit();
  }
}
