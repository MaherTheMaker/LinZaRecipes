import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://linzarecipes-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      , recipes
    ).subscribe(resp => {
    });

  }

  fetchRecipes() {
     return this.http.get<Recipe[]>('https://linzarecipes-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients.length ? recipe.ingredients : []
            };
          });
        }
      ),
        tap(recipes=>{
          this.recipeService.setRecipe(recipes);
        })
      );


  }
}
