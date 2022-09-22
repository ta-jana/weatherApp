import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Injectable({ providedIn: 'root' })
export class SharedService {

  public myInput: String = "";
  tempC: String = "temperature in C";
  cityName: String = "City";
  feelsLikeC: String = "temperature in C";
  condition: String = "";
  isDay: String = "";
  isCondition: boolean = true;
  hour: String = "";
  html: string;
  img: String;
  humidity = "";
  wind_kph = "";
  wind_degree = "";

  fdate: String;
  fimg: String;
  ftempC: String;
  ftempCMax: String = "temperature in C";
  ftempCMin: String = "temperature in C";
  fcondition: String = "";
  fisDay: String = "";
  fisCondition: boolean = true;
  fhour: String = "";
  fhtml: string;
  fcity: String;


  FtempC: String = "temperature in C";
  FcityName: String = "City";
  FfeelsLikeC: String = "temperature in C";
  Fcondition: String = "";
  FisDay: String = "";
  FisCondition: boolean = true;
  Fhour: String = "";
  Fhtml: string;
  Fimg: String;

  favorites: String[] = new Array();
  some = "";
  newFavorite = "";
  oldFavorite = "";
  private storageKey = 'favorites';
  


  city: String;
  printFavString = "";
  htmlFav = "";

  wasTutorial = '0';
  private storageKeyTutorial = 'tutorial';
  wasBool = false;

  constructor(private weatherService: WeatherService,
    private router: Router,
    public alertController: AlertController) {

    this.WasTutorial();
    this.getFavorite();
    this.RedirectToPage2();
  }

  async WasTutorial() {
    const { value } = await Storage.get({
      key: this.storageKeyTutorial
    });
    if (value) {
      this.wasTutorial = value;
      if (value == "1") {
        this.wasBool = true;
      }
    }
  }

  async SetTutorialWas() {
    await Storage.set({
      key: this.storageKeyTutorial,
      value: "1",
    });
  }

  RedirectToPage1() {
    this.wasBool = true;
    this.SetTutorialWas();
    this.router.navigateByUrl('/');
  }

  RedirectToPage2() {
    this.router.navigateByUrl('/tabs/tab2');
  }
  RedirectToPage3() {
    this.router.navigateByUrl('/tabs/tab3');
    // this.router.navigateByUrl('/');
  }


  public async printFavorites() {
    this.htmlFav = "";
    const { value } = await Storage.get({
      key: this.storageKey
    });
    this.printFavString = value;
    this.favorites = this.printFavString.split(",");
    //this.favorites.push(value);
    console.log("saved cities" + this.favorites);
    let row = document.querySelector(".favCity");
    this.favorites.map((cities) => {
      console.log("City: " + cities);
      this.weatherService.getWeather(cities).subscribe((data) => {

        this.FtempC = data['current']['temp_c']
        this.FfeelsLikeC = data['current']['feelslike_c']
        this.FcityName = data['location']['name']
        this.Fcondition = data['current']['condition']['text']
        this.FisDay = data['current']['is_day']
        this.Fimg = data['current']['condition']['icon']
        console.log(data);
        this.htmlFav = this.htmlFav.concat(` <ion-card>
          <ion-card-content>
         <ion-item>${cities}</ion-item>
         <ion-item> <img class="image" src="${this.Fimg}"></ion-item>
         <ion-item>${this.Fcondition}</ion-item>
         <ion-item>${this.FtempC}°C</ion-item>
         <ion-item>Feels like: ${this.FfeelsLikeC}°C</ion-item>
          </ion-card-content>
    </ion-card> `);
        console.log(this.htmlFav);
        row.innerHTML = this.htmlFav;
        return this.htmlFav;
      })
    })
  }


  public async btnSearchClicked() {

    // this.RedirectToPages();
    if (this.myInput.length >= 2) {
      this.weatherService.getWeather(this.myInput).subscribe((data) => {

        this.tempC = data['current']['temp_c']
        this.feelsLikeC = data['current']['feelslike_c']
        this.cityName = data['location']['name']
        this.condition = data['current']['condition']['text']
        this.isDay = data['current']['is_day']
        this.hour = data['forecast']['forecastday'][0]['date']
        this.img = data['current']['condition']['icon']
        this.humidity = data['current']['humidity']
        this.wind_kph = data['current']['wind_kph']
        this.wind_degree = data['current']['wind_degree']



        if (this.isDay == "1") {
          this.isCondition = true;
        } else {
          this.isCondition = false;
        }

        

        console.log(data);
        let row = document.querySelector(".card");
        row.innerHTML = data['forecast']['forecastday']
          .map((day) => {
            this.fdate = day['date'];
            this.ftempCMax = day['day']['maxtemp_c']
            this.ftempCMin = day['day']['mintemp_c']
            this.ftempC = day['day']['avgtemp_c']
            this.fcondition = day['day']['condition']['text']
            this.fimg = day['day']['condition']['icon']
            this.fcity = data['location']['name']

            this.html = `<ion-card>
           <ion-card-content >
           <img style="margin: auto;
           //  width: 100%;
           //  padding: 10px;" src="${this.fimg}">
           <ion-item>Date: ${this.fdate}</ion-item>        
           <ion-item> ${this.fcondition}</ion-item>
           <ion-item>Average temperature: ${this.ftempC}</ion-item>
           <ion-item>Max temperature: ${this.ftempCMax}</ion-item>
           <ion-item>Min temperature: ${this.ftempCMin}</ion-item>
           <ion-item>Min temperature: ${this.fcity}</ion-item>
           </ion-card-content>
           </ion-card>`;

            return this.html;
          })
          .join(' ');
        console.log(data);
      },
      err => 
      this.NoSuchCity(),
      );
    }
  }



  public async getFavorite() {
    const { value } = await Storage.get({
      key: this.storageKey
    });
    this.oldFavorite = value;
    if (this.oldFavorite) {
      this.favorites.push(this.oldFavorite)
    }
  }

  isCitySaved:boolean = false;

  async onBtnClickSave() {
    this.isCitySaved = false;
    
    if(this.favorites.length == 0){
      this.favorites.push(this.myInput)
        await Storage.set({
          key: this.storageKey,
          value: this.favorites.toString(),
        });
        this.SavedAlert();
    }else{
      for (var i = 0; i < this.favorites.length; i++) {
      if (this.myInput == this.favorites[i]) {
        this.isCitySaved = true;
      }
    }
    if(this.isCitySaved){
      this.AlreadtSavedAlert();
    }else{
        this.favorites.push(this.myInput)
        await Storage.set({
          key: this.storageKey,
          value: this.favorites.toString(),
        }); 
        this.SavedAlert();      
      }
    }  
  };




  async AlreadtSavedAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hi :)',
      message: 'This city is already saved!',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async SavedAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hi :)',
      message: 'City is saved!',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async NoSuchCity() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hi :(',
      message: 'No such place was found',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
