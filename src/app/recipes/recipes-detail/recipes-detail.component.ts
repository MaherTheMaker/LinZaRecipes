import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit , OnDestroy{
  @Input() recipe!: Recipe;
  id!:number;
  subscription!:Subscription

  constructor(private recipeS:RecipeService,private route:ActivatedRoute,private router:Router){}
  addToSL(){
    this.recipeS.addToShoppingList(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.subscription=this.route.params.subscribe(
      (param:Params)=>{
    this.id =+this.route.snapshot.params['id'];
    this.recipe=this.recipeS.getRecipes()[this.id];

      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.recipeS.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route})


  }
}
