import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // some = "";
  // newFavorite = "";
  // oldFavorite = "";
  // private storageKey = 'favorites';
  // favorites:string[]= new Array();

  constructor(private sharedService: SharedService) {
    
  }

  // public async getFavorite() {
  //   const { value } = await Storage.get({
  //     key: this.storageKey
  //   });
  //   this.oldFavorite = value;
  // }

  // async onBtnClickSave() {
  //   if(this.oldFavorite){
  //     this.favorites.push(this.oldFavorite)
  //   }
  //   this.favorites.push(this.newFavorite)
  //   await Storage.set({
  //     key: this.storageKey,
  //     value: this.favorites.toString(),
  //   });
  // };

}
