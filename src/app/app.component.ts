import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LinZaRecipes';
  showRecipes:boolean=true;
currentpage:string='recipes';
  /**
   * ShowRecOrShop
isRec:boolean   */
  public   onNavigate(page:string) {
  this.currentpage=page;
  }


}
