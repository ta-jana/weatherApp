import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { Storage } from '@capacitor/storage';
import { OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  ngOnInit() {
    // this.RedirectToPage();
  } 



  WeatherData: any;
  constructor(private weatherService: WeatherService
    ,private sharedService: SharedService
    ,public router:Router)
  { 
  
  }
 
  goToDetail(){
    this.router.navigateByUrl('/detail');
  }
 
  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log(" ViewWillEnter")
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log(" ViewWillLeave")
  }
  
  
   

}
