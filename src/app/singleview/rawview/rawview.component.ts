import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
declare var $ :any;
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import {ActivatedRoute, Router} from '@angular/router';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import Swal from 'sweetalert2';
import { ApiService,EnumdataService } from '../../services';
@Component({
  selector: 'app-rawview',
  templateUrl: './rawview.component.html',
  styleUrls: ['./rawview.component.scss']
})
export class RawviewComponent implements OnInit {
  ipaddress:any;
  singleview:any;
  name:any;
  email:any;
  mobileNo:any;
  city:any;
  spinner:boolean;
  statedata:any;
  lat:any ='';
  lng:any ='';
  zoom: number;
  _album = [];
  pid:any;
  sub:any
  uuid:any;
  jwttoken:any;
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  isLoading=false;
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


  constructor(private enumservice:EnumdataService, private apiservice:ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute,private _lightbox: Lightbox, private mapsAPILoader: MapsAPILoader,  private ngZone: NgZone, private http: HttpClient)
   { 
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
   
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

    this.http.get('./assets/state.json')
    .subscribe((data:any)=>
    {
      this.statedata = data;
      console.log("data",data);
    })
    
    $(window).scrollTop({scrollTop:0}, 5000);

    this.sub = this.route.params.subscribe(params => {
      this.pid = params['pid'];
    })
    console.log("pid",this.pid);
    //////////////////////////
    this.getSinglePage(this.pid);
    this.setCurrentPosition();
    this.PropertyView();
    this.GetIpAddress();
  }

  other:any;
    railway:any;
    airport:any;
    metro:any;
    bus_stand:any;
  pricings:any;
  propertiesimage:any;
  getSinglePage(pid)
  {
    this.isLoading = true;
    this.apiservice.getSingleRawPage(pid)
    //  this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/product/prebuilt?pid='+this.pid)
     .subscribe((data:any)=>
     {

      if(data.statusCode == 200)
      {
        this.isLoading = false;
        this.singleview = data.extraData.landDoc;
 
        this.carouselItems = this.singleview.dimentionDocument.landMap;
 
        this.singleview.marketplace = this.enumservice.kytname.get(this.singleview.marketplace);
 
        this.singleview.propertyType = this.enumservice.kytname.get(this.singleview.propertyType);
 
        console.log("this.carouselItems",this.carouselItems)
        console.log("singleview",this.singleview);
      }
      else{
        this.isLoading = false;
      }
     },
     (err) => {
       console.log("got error", err)
       //  self.serverDataLogin=err;
     } //For Error Response)
   
     )};


     numeric(e)
     {
       var k = e.which;
       var ok = (k >= 48 && k <= 57) ||  // 0-9
           k == 8 ||  // Backspaces
           k == 9 ||  //H Tab
           k == 11 ||  //V Tab
           k == 0 ||  // Tab for Firefox
           k == 46 ||  // for use dot
           k == 127;   //Delete
       if (!ok) {
           e.preventDefault();
       }
     }
    
     GetIpAddress()
     {
       return new Promise((resolve,reject)=>{
         this.http.get('https://jsonip.com')
            .subscribe((data:any)=>{
              resolve(data.ip);
            },
              (err) => {
                console.log("got error", err)
                reject(err);
                //  self.serverDataLogin=err;
              } //
            )
       })
      }

     async PropertyView()
     {
       var ip = await this.GetIpAddress()
      let body = {
    	"propertyId": this.pid,
	    "ipAddress": ip
      }
      // console.log('ip',body)
      this.apiservice.getAddViewsproperties(body)
      // this.http.post('http://ec2-3-80-207-138.compute-1.amazonaws.com/api/addviewcount',body,httpOptions)
      .subscribe((data:any)=>
      {
        this.getSinglePage(this.pid);
      console.log("check view data",data);
      },
      (err) => {
        console.log("got error", err)
        //  self.serverDataLogin=err;
      })
     }

     

     setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 13;
        });
      }
    }

    alphabet(e)
    {
      var k = e.which;
     var ok = (k >= 65 && k <= 90) || // A-Z(capital letter alpahabets)
         k >= 97 && k <= 122 || // a-z(small letter alpahabets)
         k == 8 ||  // Backspaces
         k == 9 ||  //H Tab
         k == 0 ||  //H Tab
         k == 11 ||  //V Tab
         k == 32 ||  // Space
         k == 127;   //Delete
     if (!ok) {
     // prevent user to press key
         e.preventDefault();
     }
    }
 
 statevalue:any;
   togglestate(e)
   {
     this.statevalue = e.target.value;
     console.log("e",e.target.value);
   }
 
 ContactSubmit()
 {
   this.spinner = true;
   let body = {
     "name": this.name,
      "mobileNo" : this.mobileNo,
     "email" : this.email,
     "city" : this.city,
     "state":  this.statevalue
   }
 
   var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
 
   console.log(body);
   if(this.name == undefined || this.mobileNo == undefined || this.email == undefined || this.city == undefined || this.statevalue == undefined)
   {
     this.spinner = false;
     Swal.fire({
       title: "Info",
       text: "Please Complete Form !!",
       type: "info",
       allowEscapeKey: false,
       allowOutsideClick: false,
       })
   }
   else if(!reg.test(this.email))
   {
     this.spinner = false;
     Swal.fire({
       title: "Info",
       text: "Invalid Email Address !!",
       type: "info",
       allowEscapeKey: false,
       allowOutsideClick: false,
       })
   }
   else{
   this.apiservice.postConatctForm(this.pid,body)
   .subscribe((data:any)=>
   {
     this.spinner = false;
     console.log("data",data);
     if(data.successCode == "API_SUCCESS")
     {
       Swal.fire({
         title: "Success",
         text: "Your Form has been Submit Successfully !!",
         type: "info",
         allowEscapeKey: false,
         allowOutsideClick: false,
         })
     }
     else if(data.exception == 'USER_ALREADY_EXISTS')
     {
       Swal.fire({
         title: "User Info",
         text: "User has been already exists !!",
         type: "info",
         allowEscapeKey: false,
         allowOutsideClick: false,
         })
     }
   },
   (err) => {
     console.log("got error", err)
     //  self.serverDataLogin=err;
   })
 }
 }


}