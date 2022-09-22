import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient
    ) { }
  

  public getWeather(text: String) 
  {
    var url ='http://api.weatherapi.com/v1/forecast.json?key=fab312725bd24e1db81182658212010&q='
            +text+'&days=7&aqi=no&alerts=no';
     return this.http.get(url);
  }

}