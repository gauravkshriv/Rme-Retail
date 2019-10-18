import { Component,OnInit } from '@angular/core';
import {UtilService} from './services/util.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rme-realbeatswap';
  constructor(private utilservice:UtilService, private router:Router) {
  }
   

  ngOnInit()
  {
      this.utilservice.setCurrentPosition(); 

      // this.router.events.subscribe((data:any)=>{
      //   console.log('route');
        
      // });

  }

 
}
