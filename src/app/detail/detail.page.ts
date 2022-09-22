import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/api/weather.service';
import { Storage } from '@capacitor/storage';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private storageKey = 'lastCityName';
  lastCityName: String = "";

  WeatherData: any;
  constructor(private weatherService: WeatherService,
     private router: Router,
     private sharedService: SharedService) {

  }

  

  ngOnInit() {
  }

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log("DetailPage - ViewWillEnter")
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log("DetailPage - ViewWillLeave")
  }

}
