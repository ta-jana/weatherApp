import { Component } from '@angular/core';
import {Router } from '@angular/router'
import { initialize } from '@ionic/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router:Router
  ) {
    this.initializeApp;
  }
  
  
  initializeApp(){
  this.router.navigateByUrl('/splash');
}
}

