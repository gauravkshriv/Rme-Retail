import { Component, OnInit,ChangeDetectorRef,ViewChild, ElementRef, NgZone } from '@angular/core';
import { Options,LabelType  } from 'ng5-slider';
import * as $ from 'jquery';
import {  } from '../services/pincode.service';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService,EnumdataService,PincodeService } from '../services';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  minValue:number;
  maxValue:number;
  isLoading=false;
  nearlocat:any;
  kitchentype:any;
  bathroom:any;
  furnishing:any;
  searchControl:FormControl
  flooring:any;
  ceiling:any;
  recentProperties:any;
  payconstructionphase:any;
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  spinner:any;
  rawproperties:any;
  page:any;
  name:any;
  mobileNo:any;
  email:any;
  city:any;
  statevalue:any;
  propertyId:any;
  statedata:any;
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
   grid: { xs: 1, sm: 1, md: 2, lg: 3, all: 0 },
     interval: {timing: 4000, initialDelay: 1000},
     loop: true,
     slide: 1,
     load: 2,
     easing: 'ease',
     animation: 'lazy',
     touch: true,
     velocity: 0.2,
     point: {
       visible: true,
       hideOnSingleSlide: true
     }
  }

  carouselItems =[];
  carouselItemsView = [];

  @ViewChild("search") searchElementRef: ElementRef;

  constructor(private enumservice:EnumdataService,private http: HttpClient,private router: Router,private route: ActivatedRoute, private cdr: ChangeDetectorRef,  private dataservice:PincodeService,private apiservice:ApiService) { }

  options: Options = {
    floor: 0,
    showTicks: false,
    ceil: 50000000,
    step: 500000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min:</b> ₹' + value;
        case LabelType.High:
          return '<b>Max:</b> ₹' + value;
        default:
          return '₹' + value;
      }
    }
  };


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

    this.getRecentlyUploaded(0);
    this.getTopRawLandUploaded();

    this.minValue = 10000;
    this.maxValue = 50000000;

    this.dataservice.getFacilities().subscribe((data:any)=>
    {
      this.nearlocat = data[13].NEARLOCATION;
      this.flooring = data[6].FLOORING;
      this.ceiling = data[7].CEILING;
      this.kitchentype = data[12].KITCHENTYPE;
      this.bathroom = data[11].BATHROOMTYPE;
      this.furnishing = data[1].FURNISHING;
      this.payconstructionphase = data[27].PAYCONSTRUCTIONPHASE;
      console.log("property Facilities data",this.nearlocat);
    });


    // var num = 150; //number of pixels before modifying styles

    // $(window).bind('scroll', function () {
    //     if ($(window).scrollTop() > num) {
    //         $('.buy-filter').addClass('fixed');
    //     } else {
    //         $('.buy-filter').removeClass('fixed');
    //     }
    // });


    this.searchControl = new FormControl();
  }

  recentview:ReplaySubject<Array<any>>= new ReplaySubject<Array<any>>()

   
getRecentlyUploaded(page)
{
  $('#pagsec .page-item a .page-link').removeClass('highlight')
  // $('#t5 :nth-child(3)')
  $('#pagsec .page-item a .page-link:nth-child('+ page +')').addClass('highlight')
  this.isLoading = true;
  this.page = page
  this.apiservice.gettoRecentpproperties(this.page,10)
  // this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/filter/show/res?page=0&size=10&sort=createdAt,des')
 .subscribe((data:any)=>
     {
      console.log("recent properties",data);
      if(data.successCode === "API_SUCCESS" && data.statusCode == 200)
      {
        $(window).scrollTop({scrollTop:0}, 5000);
        this.recentProperties = data.page.content;

        this.isLoading = false;
        console.log("recent properties",this.recentProperties);
       // let __crousel=[];
        this.recentProperties.forEach((data,i) => {
         this.propertyId = data.propertyId
         // console.log("===>",this.recentProperties[i].pricing.assetConstructionPhase);
 
         this.recentview.next(this.recentProperties)

         this.recentProperties[i].furnishing = data.furnishing.replace('_',' ');
 
         const str2 = data.createdAt;
         const arr2 = str2.split(/ (.*)/);
         this.recentProperties[i].createdAt = new Date(arr2[0]).toDateString();
         this.recentProperties[i].residentialStructuralDocument.propertyFacing = this.enumservice.kytname.get(this.recentProperties[i].residentialStructuralDocument.propertyFacing);

         this.recentProperties[i].prebuiltAssetType = this.enumservice.kytname.get(this.recentProperties[i].prebuiltAssetType);

         this.recentProperties[i].pricing.assetConstructionPhase = this.enumservice.kytname.get(this.recentProperties[i].pricing.assetConstructionPhase);
         if(this.recentProperties[i].residentialStructuralDocument.flats)
         {
           this.recentProperties[i].residentialStructuralDocument.flats.bhks = this.enumservice.kytname.get(this.recentProperties[i].residentialStructuralDocument.flats.bhks);
         }
        //  this.recentProperties[i].residentialStructuralDocument.flats.bhks = this.enumservice.kytname.get(this.recentProperties[i].residentialStructuralDocument.flats.bhks)
      });

     //  this.carouselItemsraw = __crousel;
      console.log("check======>?????????????", this.carouselItems);
      console.log("propertyId",this.propertyId)
      }
      else(data.exception === "NO_RECORDS_FOUND")
      {
       this.isLoading = false;
      }
   
     },
     (err) => {
       console.log("got error", err)
       //  self.serverDataLogin=err;
     } //For Error Response)
   
     )
    };

    // //////////////////////////////////////////



    getTopRawLandUploaded()
    {
      this.isLoading = true;
      this.apiservice.getrawlandproperty()
    .subscribe((data:any)=>
        {
          console.log("raw properties",data);
          this.rawproperties = data.rawLandPageableResponseDto.rawLandResponse;
          this.isLoading = false;
          console.log("raw properties",this.rawproperties);
         this.rawproperties.forEach((data,i) => {
          // this.rawproperties[i].marketplace = data.marketplace.replace('_',' ');
          // this.rawproperties[i].propertyType = data.propertyType.replace('_',' ');
           const str2 = data.createdAt;
          const arr2 = str2.split(/ (.*)/);
          this.rawproperties[i].createdAt = new Date(arr2[0]).toDateString();

       });
      //  this.carouselItems = __crousel;
       console.log("check======>?????????????", this.carouselItemsView);
        },
        (err) => {
          console.log("got error", err)
          //  self.serverDataLogin=err;
        } //For Error Response)
      
        )};


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

  numeric(e)
  {
    var k = e.which;
    var ok = (k >= 48 && k <= 57) ||  // 0-9
        k == 8 ||  // Backspaces
        k == 9 ||  //H Tab
        k == 11 ||  //V Tab
        k == 0 ||  // Tab for Firefox
        k == 127;   //Delete
    if (!ok) {
        e.preventDefault();
    }
  }


  togglestate(e)
  {
    this.statevalue = e.target.value;
    console.log("e",e.target.value);
  }

  ContactSubmit(pid)
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
  
    console.log(body,this.email);
    console.log("pid",pid);
    
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
    this.apiservice.postConatctForm(pid,body)
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
          }).then(()=>{
            $('#exampleModal').modal('toggle');
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
          }).then(()=>
          {
            $('#exampleModal').modal('toggle');
          })
      }
    },
    (err) => {
      console.log("got error", err)
      //  self.serverDataLogin=err;
    })
  }
  }


  ngOnDestroy()
  {
    console.log("this.recentview before",this.recentview);   
    this.recentview.next();
    console.log("this.recentview after",this.recentview);
    
  }


}
