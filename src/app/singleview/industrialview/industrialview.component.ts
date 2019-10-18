import { Component, OnInit,ChangeDetectorRef, Input } from '@angular/core';
import * as $ from 'jquery';
declare var $ :any;
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { ApiService,UtilService,PincodeService,EnumdataService } from '../../services';
import { TopViewProperty } from '../../services/model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject,Subscription } from 'rxjs';
@Component({
  selector: 'app-industrialview',
  templateUrl: './industrialview.component.html',
  styleUrls: ['./industrialview.component.scss']
})
export class IndustrialviewComponent implements OnInit {
  pid:number;
  statedata:any;
  zoom:number;
  lat:any;
  lng:any;
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  isLoading=false;
  currentUrl:any;
  locshowcontact:any;
  showcontacts:any;

 @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
 carouselConfig: NguCarouselConfig = {
  grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
 }
 carouselItems =[];


  constructor(private utilservice:UtilService, private toastr: ToastrService,private router: Router,private enumservice:EnumdataService, private apiservice:ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute,private _lightbox: Lightbox, private mapsAPILoader: MapsAPILoader,  private ngZone: NgZone, private http: HttpClient)
  { 
    this.locshowcontact = localStorage.getItem('showcontact');

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
 
  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }
 
  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }

  ngOnInit() {
    this.showcontacts = this.utilservice.routedsellproperty;   
    this.http.get('./assets/state.json')
    .subscribe((data:any)=>
    {
      this.statedata = data;
      console.log("data",data);
    })

    this.zoom = 15;

    this.route.params.subscribe(params => {
      this.pid = params['pid'];
    })

    this.IndustrialSinglePage();
  }


  homefurniture=[];
  homeappliance=[];

    other:any;
    railway:any;
    airport:any;
    metro:any;
    bus_stand:any;
    industrialdata:any;
    
  IndustrialSinglePage()
  {
    this.apiservice.getIndustrialSinglePage(this.pid)
    .subscribe((data:any)=>{
      
      this.industrialdata = data.extraData.industrialAsset
      console.log('data',this.industrialdata);


      let homappl = this.industrialdata.industrialStructuralDocument.facilities;
      
      let furnit = this.industrialdata.industrialStructuralDocument.furniture;
     
      if(furnit)
     {
     let array_furn = [];
      Object.keys(furnit).forEach((fun,i)=>{
  console.log('fun',fun,i,furnit);
     array_furn.push(fun+' : '+furnit[fun]);
      })
     this.homefurniture = array_furn;
     }

    if(homappl)
    {
    let array_appl = [];
     Object.keys(homappl).forEach((fun,i)=>{
     console.log('fun',fun,i,homappl);
     array_appl.push(fun+' : '+homappl[fun]);
     })
    this.homeappliance = array_appl;
    }

    if(this.industrialdata.nearByLocation.RAILWAY)
    {
     this.railway = this.industrialdata.nearByLocation.RAILWAY;
    }

   if(this.industrialdata.nearByLocation.AIRPORT)
   {
     this.airport = this.industrialdata.nearByLocation.AIRPORT;
  }
   
  if(this.industrialdata.nearByLocation.METRO)
   {
     this.metro = this.industrialdata.nearByLocation.METRO;
   }
  
  if(this.industrialdata.nearByLocation.BUS_STAND)
   {
     this.bus_stand = this.industrialdata.nearByLocation.BUS_STAND;
  }

    if(this.industrialdata.nearByLocation.OTHER)
    {
      this.other = this.industrialdata.nearByLocation.OTHER;
      // console.log("chec OTHER value",this.bus_stand);
    }

    var tempArray=[];
    this.industrialdata.industrialStructuralDocument.floorAndCeiling.ceiling.forEach(v => {
      tempArray.push(this.enumservice.kytname.get(v))
      // console.log("v",v);
    });
    this.industrialdata.industrialStructuralDocument.floorAndCeiling.ceiling = tempArray;

    var tempArray=[];
    this.industrialdata.industrialStructuralDocument.floorAndCeiling.flooring.forEach(v => {
      tempArray.push(this.enumservice.kytname.get(v))
      // console.log("v",v);
    });
    this.industrialdata.industrialStructuralDocument.floorAndCeiling.flooring = tempArray;
 
    this.industrialdata.industrialStructuralDocument.propertyFacing = this.enumservice.kytname.get(this.industrialdata.industrialStructuralDocument.propertyFacing);

    this.industrialdata.pricing.finalizeInvestment = this.enumservice.kytname.get(this.industrialdata.pricing.finalizeInvestment);

   //  this.industrialdata.furnishing = this.enumservice.kytname.get(this.industrialdata.furnishing);

    this.industrialdata.pricing.assetConstructionPhase = this.enumservice.kytname.get(this.industrialdata.pricing.assetConstructionPhase)
 
    this.industrialdata.pricing.layoutApprovalType = this.enumservice.kytname.get(this.industrialdata.pricing.layoutApprovalType)
   


     // this.homeappliance
     this.lat = parseFloat(this.industrialdata.locationDetails.latitude);
     this.lng =  parseFloat(this.industrialdata.locationDetails.longitude);
     this.zoom =15;
   
     this.carouselItems = this.industrialdata.propertyImages;

    }),
    (error)=>{
      console.log('error',error);
      
    }
  }


  GetIpAddress(cb)
  {
      this.http.get('https://jsonip.com')
         .subscribe((data:any)=>{
           cb(null,data.ip);
         },
           (err) => {
             console.log("got error", err)
             cb(err,null);
             //  self.serverDataLogin=err;
           } //
         )
   }



   PropertyView()
   {
    this.GetIpAddress((err,res)=>{
       console.log(err,res);
       var ip = res;
       let body = {
        "propertyId": this.pid,
        "ipAddress": ip
        }
        // console.log('ip',body)
        this.apiservice.getAddViewsproperties(body)
        // this.http.post('http://ec2-3-80-207-138.compute-1.amazonaws.com/api/addviewcount',body,httpOptions)
        .subscribe(async(data:any)=>
        {
         await this.IndustrialSinglePage();
        console.log("check view data",data);
        },
        (err) => {
          console.log("got error", err)
          //  self.serverDataLogin=err;
        })
     })
   
   }


}
