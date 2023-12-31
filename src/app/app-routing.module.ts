import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Recipe} from "./recipes/recipe.model";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipesDetailComponent} from "./recipes/recipes-detail/recipes-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";


const appRoutes: Routes = [
  {path: '', redirectTo: 'Recipes', pathMatch: 'full'},
  {path: 'Auth', component: AuthComponent},
  {
    path: 'Recipes', component: RecipesComponent,
    canActivate:[AuthGuard],
    children:
      [
        {path: '', component: RecipeStartComponent},
        {
          path: 'new', component: RecipeEditComponent
          // , resolve: [RecipesResolverService]
        },
        {
          path: ':id', component: RecipesDetailComponent
          , resolve: [RecipesResolverService]

        },
        {path: ':id/edit', component: RecipeEditComponent},


      ],
    // resolve: [RecipesResolverService]
  }
  ,
  {path: 'ShoppingList', component: ShoppingListComponent},

];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
