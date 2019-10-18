import { Component, OnInit} from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './dashboard.layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {

  breadcrumbs: any;
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];

  data:any[] = ["gaurav",",anand","ragghu","rohit","shivam"];
    constructor(  private route:Router,private menuService:MenuService,private http:HttpClient) {
     }
  
    ngOnInit() {
      this.listenRouting();
    }
  
    listenRouting() {
      console.log('==>',this.menuService.getMenu());

      // this.route.events.subscribe()

      
      let routerUrl: string, routerList: Array<any>, target: any;
      console.log('->',this.route.url);
      this.route.events.subscribe((router:any)=>{
        console.log('data',router);
        routerUrl = router.urlAfterRedirects;  

        console.log('routerurl',routerUrl);
        
        if (routerUrl && typeof routerUrl === 'string') {
          target = this.menuService.getMenu();
          console.log('target',target);
          this.breadcrumbList.length = 0;
          routerList = routerUrl.slice(1).split('/');
          routerList.forEach((router, i) => {
            console.log('target',target);
            
            target = target.find(page => page.route === router);
            this.breadcrumbList.push({
              name: target.name, path: (i === 0) ? target.path : `${this.breadcrumbList[i-1].path}/${target.path.slice(2)}`
            });
            if (i+1 !== routerList.length)  target = target.children;
          });
        }
        })
      // console.log('-->',this.breadcrumbList);
      
    }

  }
  