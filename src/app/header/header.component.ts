import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription, take} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub!:Subscription;

  isAuthed=false;

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  ngOnInit(): void {
  this.userSub=this.authService.user.subscribe(user=>
  {
    this.isAuthed= !!user.token;
  });
  }


  constructor(private dataStorageService:DataStorageService,private authService:AuthService) {
  }
  onFetchData()
  {
    this.dataStorageService.fetchRecipes().subscribe();

  }
  onSaveData()
  {
    this.dataStorageService.storeRecipes();
  }

  logout() {
  this.authService.logout()
  }
}
