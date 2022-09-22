import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { WeatherService } from '../api/weather.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

  

export class Tab2Page {
 
  constructor(
    private sharedService: SharedService,
    private weatherService: WeatherService
    ,public router:Router
  ) {
    this.RedirectToPage1();
  }

  // ngOnInit() {
  //   this.RedirectToPage1();
  // } 

  RedirectToPage1(){
    this.router.navigateByUrl('/');
  }
 
  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log("Tab2 - ViewWillEnter")
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log("Tab2 - ViewWillLeave")
  }
  
}

