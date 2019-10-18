import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService,EnumdataService,PincodeService, UtilService } from '../../services';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {BehaviorSubject, Observable, Subject, timer,ReplaySubject} from 'rxjs';
import * as $ from 'jquery';
declare var $ :any;
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  pid:any;
  isLoading=false;
  dappdata$:any;
  lat:any;
  lng:any;
  public pieChartLabels: Label[] = ['Total Inventory','Booked Inventory','Availability Inventory','Sold Inventory','Unit Price'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { 
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };


  
  constructor(private utilService:UtilService, private toastr: ToastrService, private enumservice:EnumdataService,private http: HttpClient,private router: Router,private route: ActivatedRoute, private apiservice:ApiService) { }

  // private productObservale  =  new Observable<any[]>;

  ngOnInit() {

    $(window).scrollTop({scrollTop:0}, 5000);

    this.route.params.subscribe(params => {
      this.pid = params['pid'];
    })
    this.getdaappinventory()
  }


  public productsObservable : Observable<any[]>; 


  // private subject : Subject<any> = new Subject<any>();

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  nearbylocationdata:any;
  getdaappinventory()
  {
    this.apiservice.getsingledapproperty(this.pid)
    .subscribe((data:any)=>{
      this.dappdata$ = data.extraData.AllInv;
       console.log('data',this.dappdata$);

       this.dappdata$.propertyType = this.enumservice.kytname.get(this.dappdata$.propertyType);

      var tempArray=[];
      this.dappdata$.facilites.forEach(v => {
        tempArray.push(this.enumservice.kytname.get(v))
        // console.log("v",v);
      });
      this.dappdata$.facilites = tempArray;
    this.lat = parseFloat(this.dappdata$.location.latitude);
    this.lng = parseFloat(this.dappdata$.location.longitude);
    this.pieChartData.push(this.dappdata$.inventory.totalInventoryCount,this.dappdata$.inventory.bookedInventoryCount,this.dappdata$.inventory.availableInventoryCount,this.dappdata$.inventory.soldInventoryCount);
    console.log('ok',this.pieChartData);

    let nearlocat = this.dappdata$.nearByLocation;

    let neardata= Object.keys(nearlocat);

    console.log('near<<',neardata);
    
    neardata.forEach((data)=>{
     console.log('near>>',data);
    this.nearbylocationdata = data; 
    })
    

    }),
    ((error)=>{
      console.log('error',error);
    })
  }

  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   legend: {
  //     position: 'top',
  //   },
  //   plugins: {
  //     datalabels: {
  //       formatter: (value, ctx) => {
  //         const label = ctx.chart.data.labels[ctx.dataIndex];
  //         return label;
  //       },
  //     },
  //   }
  // };


}
