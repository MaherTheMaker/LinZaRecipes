import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  id!: number;
  subscription!: Subscription;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private router:Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = this.id != null && !isNaN(this.id);
        this.initForm();
      }
    )

  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          // @ts-ignore
          recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required
              ),
              'amount': new FormControl(ingredient.amount, [Validators.required,
                Validators.pattern(/^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)$/)
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients


    });

  }

  getIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onSubmit() {
    const value=this.recipeForm.value;
    const newRecipe=new Recipe(
      value['name'],
      value['description'],
      value['imagePath'],
      value['ingredients'])
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      console.log(newRecipe);
      this.recipeService.updateRecipe(this.id,newRecipe);
      this.editMode=false;

    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);

    }
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onAddIng() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,
        [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
    }))

  }
  onDeleteAnIngredient(index :number){

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})

  }
}
