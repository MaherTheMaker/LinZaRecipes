import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  id!: any ;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = this.id != null && !isNaN(this.id);
        console.log(this.editMode)
      }
    )

  }


}
