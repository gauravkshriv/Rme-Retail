import { Component, OnInit,ChangeDetectorRef, Input,ViewChild, ElementRef, NgZone } from '@angular/core';
import * as $ from 'jquery';
declare var $ :any;
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Lightbox } from 'ngx-lightbox';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { ApiService,UtilService,PincodeService,EnumdataService } from '../../services';
import { TopViewProperty } from '../../services/model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject,Subscription } from 'rxjs';
@Component({
  selector: 'app-residentialview',
  templateUrl: './residentialview.component.html',
  styleUrls: ['./residentialview.component.scss']
})
export class ResidentialviewComponent implements OnInit {

  ipaddress:any;
  singleview:any;
  lat:any;
  lng:any;
  name:any;
  email:any;
  mobileNo:any;
  city:any;
  spinner:boolean;
  statedata:any;
  zoom:number; 
  _album = [];
  pid:any;
  sub:any
  uuid:any;
  jwttoken:any;
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  isLoading=false;
  currentUrl:any;
  locshowcontact:any;
  showcontacts:any;
  myUserSub: Subscription;

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
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.locshowcontact = localStorage.getItem('showcontact')
    let data =  localStorage.getItem("routetosell");

    toastr.toastrConfig.preventDuplicates=true;
  //  this.getPromise().then(v=>this.getSinglePage(this.pid))
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
   
     console.log('=> showcontacts',this.showcontacts);
     
    
    this.http.get('./assets/state.json')
    .subscribe((data:any)=>
    {
      this.statedata = data;
      console.log("data",data);
    })

    this.zoom = 15;        
    // this.router.events.subscribe(
    //   (event: any) => {
    //     if (event instanceof NavigationEnd) {
    //       console.log('this.router.url', this.router.url);
    //     }
    //   }
    // );

    // this.router.events.subscribe((event: any) => {
    //   console.log(event);
    //   if (event instanceof NavigationEnd ) {
    //     this.currentUrl = event.url;
    //     console.log('this.router.url', this.currentUrl);
    //   }
    // });

    // console.log('this.router.url',this.router.url);
    // if(this.router.url === '/property/view/RME-INV-HOUSINGWORQCCOZGR6OFL')
    // {
    //   swal('property/view/RME-INV-HOUSINGWORQCCOZGR6OFL');
    // }

    // this.router.events.subscribe((event: Event) => {
    //   console.log(event);
    //   if (event instanceof NavigationEnd ) {
    //     currentUrl = event.url;
    //   }
    // });


    $(window).scrollTop({scrollTop:0}, 5000);

    this.sub = this.route.params.subscribe(params => {
      this.pid = params['pid'];
    })

    
    console.log("pid",this.pid);
    //////////////////////////
    this.getSinglePage(this.pid);
  // this.setCurrentPosition();
    this.PropertyView();
    // this.GetIpAddress();
  }


  recentView:ReplaySubject<any> =new ReplaySubject<any>()

  homefurniture=[];
  homeappliance=[];
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
   this.myUserSub =  this.apiservice.getResidentialSinglePage(pid)
    //  this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/product/prebuilt?pid='+this.pid)
     .subscribe((data:any)=>
     {
      //  console.log("data",data);
       if(data.successCode == "RESEDENTIAL_PROPERTY_RETRIVED" && data.statusCode == "200")
       {
      this.isLoading = false;
       this.singleview = data.residentialProducts;
       this.recentView.next(this.singleview);
       
       let homappl = this.singleview.residentialStructuralDocument.homeAppliances;
      
       let furnit = this.singleview.residentialStructuralDocument.furniture;
      
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
     
      // this.homeappliance
      
       this.carouselItems = this.singleview.propertyImages;

       console.log("singleview",this.singleview);

      this.pricings = this.singleview.pricing;

      this.lat = parseFloat(this.singleview.locationDetails.latitude);
      this.lng =  parseFloat(this.singleview.locationDetails.longitude);
      this.zoom =15;
      console.log("----->",this.lat, this.lng);
     
     this.propertiesimage = this.singleview.propertyImages;
      //  console.log("=>",this.lat,this.lng);
      
      let datapricing = this.singleview.nearByLocation;

      let keys  = Object.keys(datapricing)

      keys.forEach(data => {
        // console.log("data keys",datapricing[data]);
      });

       if(this.singleview.nearByLocation.RAILWAY)
        {
         this.railway = this.singleview.nearByLocation.RAILWAY;
        //  console.log("chec RAILWAY value",this.railway);
       }

       if(this.singleview.nearByLocation.AIRPORT)
       {
         this.airport = this.singleview.nearByLocation.AIRPORT;
        // console.log("chec AIRPORT value",this.airport);
      }
       if(this.singleview.nearByLocation.METRO)
       {
         this.metro = this.singleview.nearByLocation.METRO;
        // console.log("chec METRO value",this.metro);
      }
      
      if(this.singleview.nearByLocation.BUS_STAND)
       {
         this.bus_stand = this.singleview.nearByLocation.BUS_STAND;
        // console.log("chec BUS_STAND value",this.bus_stand);
      }

      if(this.singleview.nearByLocation.OTHER)
       {
         this.other = this.singleview.nearByLocation.OTHER;
        // console.log("chec OTHER value",this.bus_stand);
      }

      var tempArray=[];
      this.singleview.facilitySpec.forEach(v => {
        tempArray.push(this.enumservice.kytname.get(v))
        // console.log("v",v);
      });
      this.singleview.facilitySpec = tempArray;

      var tempArray=[];
      this.singleview.residentialStructuralDocument.floorAndCeiling.ceiling.forEach(v => {
        tempArray.push(this.enumservice.kytname.get(v))
        // console.log("v",v);
      });
      this.singleview.residentialStructuralDocument.floorAndCeiling.ceiling = tempArray;

      var tempArray=[];
      this.singleview.residentialStructuralDocument.floorAndCeiling.flooring.forEach(v => {
        tempArray.push(this.enumservice.kytname.get(v))
        // console.log("v",v);
      });
      this.singleview.residentialStructuralDocument.floorAndCeiling.flooring = tempArray;

      var tempArray=[];
      this.singleview.residentialStructuralDocument.kitchen.forEach((v,i) => {
        this.singleview.residentialStructuralDocument.kitchen[i].kitchencategory = this.enumservice.kytname.get(v.kitchencategory)
        // console.log("v",v);
      });

     
        if(this.singleview.residentialStructuralDocument.flats)
        {
          this.singleview.residentialStructuralDocument.flats.bhks = this.enumservice.kytname.get(this.singleview.residentialStructuralDocument.flats.bhks);
        }
     
      this.singleview.residentialStructuralDocument.propertyFacing = this.enumservice.kytname.get(this.singleview.residentialStructuralDocument.propertyFacing);


       this.singleview.pricing.finalizeInvestment = this.enumservice.kytname.get(this.singleview.pricing.finalizeInvestment);

     this.singleview.furnishing = this.enumservice.kytname.get(this.singleview.furnishing);

     this.singleview.pricing.assetConstructionPhase = this.enumservice.kytname.get(this.singleview.pricing.assetConstructionPhase)
  
     this.singleview.pricing.layoutApprovalType = this.enumservice.kytname.get(this.singleview.pricing.layoutApprovalType)
    }
    else if(data.exception == "FATAL_EXCEPTION")
    {
      this.toastr.error('Something Went Wrong','Server Error');
    }
    },
     (err) => {
       console.log("got error", err);
       this.apiservice.handleNetworkException(err);
       //  self.serverDataLogin=err;
     } //For Error Response)
   
     )};

  



  //    initAutocomplete() {
  //     var lat = this.singleview.locationDetails.latitude;
  //     var lng = this.singleview.locationDetails.longitude;
  
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //         center: {
  //             lat: lat,
  //             lng: lng
  //         },
  //         zoom: 13,
  //         // mapTypeId: 'roadmap'
  //     });
  // }

  getPromise()
    {
      return new Promise((resolve,reject)=>
      {
    setTimeout(() => {
      resolve ("promise completed")
    }, 1000);
      })
    };


    ////////////////////////////////////  get ip address by promise (resolve, reject)

    // GetIpAddress()
    // {
    //   return new Promise((resolve,reject)=>{
    //     this.http.get('https://jsonip.com')
    //        .subscribe((data:any)=>{
    //          resolve(data.ip);
    //        },
    //          (err) => {
    //            console.log("got error", err)
    //            reject(err);
    //            //  self.serverDataLogin=err;
    //          } //
    //        )
    //   })
      
    //  }

    
    // async PropertyView()
    // {
    //   var ip = await this.GetIpAddress()
    //  let body = {
    //  "uuid": this.uuid,
    //  "propertyId": this.pid,
    //  "ipAddress": ip
    //  }
    //  // console.log('ip',body)
    //  this.apiservice.getAddViewsproperties(body)
    //  // this.http.post('http://ec2-3-80-207-138.compute-1.amazonaws.com/api/addviewcount',body,httpOptions)
    //  .subscribe((data:any)=>
    //  {
    //    this.getSinglePage(this.pid);
    //  console.log("check view data",data);
    //  },
    //  (err) => {
    //    console.log("got error", err)
    //    //  self.serverDataLogin=err;
    //  })
    // }


   
    // setCurrentPosition() {
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.lat = position.coords.latitude;
    //       this.lng = position.coords.longitude;
    //       this.zoom = 13;
    //     });
    //   }
    // }

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
           await this.getSinglePage(this.pid);
          console.log("check view data",data);
          },
          (err) => {
            console.log("got error", err)
            //  self.serverDataLogin=err;
          })
       })
     
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

  console.log(body,this.email);
  if(!this.name || !this.mobileNo || !this.email || !this.city || !this.statevalue)
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


ngOnDestroy()
{
  console.log('before',this.myUserSub);
  
this.myUserSub.unsubscribe();
console.log('after',this.myUserSub);

localStorage.removeItem('showcontact')
}


}

