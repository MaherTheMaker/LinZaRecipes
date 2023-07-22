import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
// import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit ,OnDestroy{


  recipes! : Recipe[] ;
  sub!:Subscription;

  constructor(private recipeService:RecipeService,private router:Router,private route :ActivatedRoute){  }

  ngOnInit(): void {

    this.recipes=this.recipeService.getRecipes();

    this.sub=this.recipeService.changeRecipesList.subscribe((recipes)=>{
      this.recipes=recipes;


    })
  }


  onNewRecipe() {
  this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
