import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options,LabelType  } from 'ng5-slider';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService,UtilService,PincodeService,EnumdataService } from '../services';
import { Router} from '@angular/router';
import { MapsAPILoader } from '@agm/core';
// import {} from 'googlemaps';    // is mandatory pls don't remove
import { FormControl } from '@angular/forms';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
declare var $ :any;
import * as _ from 'lodash';
@Component({ 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  latitude: any;
  longitude: any;
  geolocationPosition:any; 
  google:any;
  _currentValues:any;
  searchControl:any;
  minValue:number;
  maxValue:number;
  place:any;
  zoom: number;
  propertiesimage:any;
  rawproperties:any;
  page:any;
 recentProperties:any;
 viewproperties:any;
 isLoading:any;
 marketupload:any;
 slideNo = 0;
 withAnim = true;     
 resetAnim = true;
 dappdata:any;
 
 @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
 carouselConfig: NguCarouselConfig = {
  grid: { xs: 1, sm: 2, md: 4, lg: 4, all: 0 },
    interval: {timing: 4000, initialDelay: 1000},
    loop: false,
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

 carouselConfig1: NguCarouselConfig = {
  grid: { xs: 1, sm: 2, md: 2, lg: 2, all: 0 },
    interval: {timing: 4000, initialDelay: 1000},
    loop: false,
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

 carouselItemsInventory =[];

 carouselresidItems =[];
 carouselcommercItems =[];
 carouselIndustrialItems  = [];

 carouselindusItems =[];
 carouselagricItems =[];
 carouselItems =[];
 carouseldappdata = [];
 carouselItemsView = [];
 carouselItemsraw= [];

  @ViewChild("search")
   public searchElementRef: ElementRef;
  propertyTypes:Array<string> = ["Area Unit", "BUY","RENT","CO-WORKING","CO-LIVING"];
  propertyFilter:Array<string> = ["TRENDING", "RECENT","HAND PICKED","BUDGET FILTER","FURNISHING TYPE"];
  constructor(private apiservice:ApiService, 
    private cdr: ChangeDetectorRef,
     private http: HttpClient,
     private router: Router,
      private utilService: UtilService,
      private dataservice:PincodeService,
      private mapsAPILoader: MapsAPILoader, 
      private enumservice:EnumdataService,
       private ngZone: NgZone,  ) { }
 
  
  options: Options = {
    floor: 0,
    showTicks: false,
    ceil: 50000000,
    step: 500000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> ₹' + value;
        case LabelType.High:
          return '<b>Max price:</b> ₹' + value;
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

  
  addtoheart(item)
  {

   $('#'+item.id).toggleClass('wishlist')
   
  }

  ngOnInit()
  {

      this.router.events.subscribe((data:any)=>{
        console.log('route');
        
      });

      


    $('.dropdown-menu').click(function(e) {
      // console.log('ksjdksd');
         e.stopPropagation();
      });
      
    this.dataservice.getFacilities().subscribe((data:any)=>
    {
      this.marketupload = data[35].MARKETUPLAD;
      console.log("property data",this.marketupload);
      // this.step1Section();

    });

    this.getDapproperty(30);
    this.loadashfunc();

  let ii = 0;
      _.times(5, function(){
        console.log("==>",ii++);
        // this.getRecentlyUploaded(0);
    });

  this.commercialUploadProperty(0);
  this.getRecentlyUploaded(0);
  this.getTopViewsUploaded();
  this.getTopRawLandUploaded();
  this.industrialUploadProperty();
  // $("#example_id").ionRangeSlider();
 
  this.minValue = 10000;
  this.maxValue = 50000000;
  
  // $(".js-range-slider").ionRangeSlider();
    $('#top_prop').click(function() {      // When arrow is clicked
      $('body,html').animate({
          scrollTop : 600             // Scroll to top of body
      }, 500);
  }); 


  $('#furnish').click(function() {      // When arrow is clicked
    $('.furniture-right').animate({
        scrollTop : 0             // Scroll to top of body
    }, 200);
}); 

$('#furniture').click(function() {      // When arrow is clicked
  $('.furniture-right').animate({
      scrollTop :120             // Scroll to top of body
  }, 200);
}); 

$('#home').click(function() {      // When arrow is clicked
  $('.furniture-right').animate({
      scrollTop : 280             // Scroll to top of body
  }, 200);
}); 


  $('#flat').click(function() {      // When arrow is clicked
    $('.layout-right').animate({
        scrollTop : 0             // Scroll to top of body
    }, 200);
}); 

$('#bedroom').click(function() {      // When arrow is clicked
  $('.layout-right').animate({
      scrollTop : 90             // Scroll to top of body
  }, 200);
}); 


  $('#bathroom').click(function() {      // When arrow is clicked
    $('.layout-right').animate({
        scrollTop : 320             // Scroll to top of body
    }, 500);
}); 

$('#kitchen').click(function() {      // When arrow is clicked
  $('.layout-right').animate({
      scrollTop : 400             // Scroll to top of body
  }, 500);
});

$('#gallery').click(function() {      // When arrow is clicked
  $('.layout-right').animate({
      scrollTop : 790             // Scroll to top of body
  }, 500);
});

$('#facing').click(function() {      // When arrow is clicked
  $('.layout-right').animate({
      scrollTop : 590             // Scroll to top of body
  }, 500);
});

$('#addroom').click(function() {      // When arrow is clicked
  $('.layout-right').animate({
      scrollTop : 200             // Scroll to top of body
  }, 500);
});

    
// $('.dropdown-menu').click(function(e) {
//     console.log('ksjdksd');
//        e.stopPropagation();
//     });

      
  
  $('.loop5').owlCarousel({
    loop: true,
    margin: 5,
    autoplay:false,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    // nav: true,
    //   navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 5,
        nav: true,
        loop: true,
      }
    }
  })
 

  $('.loop6').owlCarousel({
    loop: true,
    margin: 5,
    autoplay:false,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    // nav: true,
    //   navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: true
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 6,
        // nav: true,
        loop: true,
      }
    }
  })

    $('.loop1').owlCarousel({
      loop: true,
      margin: 10,
      autoplay:false,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 1,
          nav: false
        },
        1000: {
          items: 1,
          nav: true,
          loop: true,
        }
      }
    })
    $('.loop4').owlCarousel({
      loop: true,
      margin: 10,
      autoplay:false,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 4,
          nav: true,
          loop: true,
        }
      }
    })

    $('.loop3').owlCarousel({
      loop: true,
      margin: 10,
      autoplay:false,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 3,
          nav: true,
          loop: true,
        }
      }
    })


  ///////////// end ngoninit
  
  $(".farming-content").hide();
  $(".industrial-content").hide();
  $(".commercial-content").hide();
  $(".main-filter-section").hide();
  $(".filter_two_sec").hide();

$('.filter_cross').click(()=>
{
  console.log("check click");
  
   $('.main-filter-section').hide();
})


}

gaurav = "gaurav";
  
 loadashfunc()
 { 

var ok = this.gaurav.split('').reverse();

console.log("==> reverse",ok);

  var ownerArr = [{
    "owner": "Colin",
    "pets": [{"name":"dog1"}, {"name": "dog2"}]
}, {
    "owner": "John",
    "pets": [{"name":"dog3"}, {"name": "dog4"}]
}];


let words = ['sky', 'wood', 'forest', 'falcon', 
    'pear', 'ocean', 'universe'];

    let fel = _.first(words);
    let fel1 = _.last(words);

    let chunk = _.chunk(words,2);
    console.log("chunk",chunk);
    

    console.log("fel",fel,fel1)


 var arr1 = [50,60,65,90];
 var arr2 = [25,35,50,90];

  var arr3 = arr1.concat(arr2);
  var arr4 = _.intersectionWith(arr1,arr2,_.isEqual);

  console.log("arr3 ===>",arr3,arr4);
  

   ownerArr.map((data)=>{
    console.log('====>',data);
     return data.pets[0].name;
    //  console.log("==>",)
   })

   var ball_ = ["ball_0","ball_1","ball_2","ball_3","ball_4","ball_5"];

 

   Array.apply(null, Array(6)).map(function(item, index){
    return "ball_" + index;
  });

  _.times(6, _.uniqueId.bind(null, 'ball_'));


   _.map(ownerArr,'pets[0].name');
   console.log('lodas',ownerArr);
   
     
 }

// setCurrentPosition() {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       this.latitude = position.coords.latitude;
//       this.longitude = position.coords.longitude;
//       this.zoom = 12;
//     });
//   }
// }
/////////////////


private selectedLink: string="";        
  
setradio(e: string): void   
{  
  this.selectedLink = e;       
}  

  isSelected(name: string): boolean   
{  

      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
}  

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
} 
///////////////////////

residential()
{
  $('.resid-tab').addClass('circle-prop');
  $('.comm-tab').removeClass('circle-prop');
  $('.ind-tab').removeClass('circle-prop');
  $('.farm-tab').removeClass('circle-prop');

  $(".industrial-content").hide();
  $(".residential-content").show();
  $(".commercial-content").hide();
  $(".farming-content").hide();
  console.log("check residential");
}

commercial()
{
  $('.comm-tab').addClass('circle-prop');
  $('.resid-tab').removeClass('circle-prop');
  $('.ind-tab').removeClass('circle-prop');
  $('.farm-tab').removeClass('circle-prop');

  $(".industrial-content").hide();
  $(".residential-content").hide();
  $(".commercial-content").show();
  $(".farming-content").hide();
  console.log("check residential");
}

industrial()
{
  $('.ind-tab').addClass('circle-prop');
  $('.comm-tab').removeClass('circle-prop');
  $('.resid-tab').removeClass('circle-prop');
  $('.farm-tab').removeClass('circle-prop');
  
  $(".residential-content").hide();
  $(".commercial-content").hide();
  $(".industrial-content").show();
  $(".farming-content").hide();
  console.log("check industrial");
}

  farming()
  {
    $('.farm-tab').addClass('circle-prop');
    $('.ind-tab').removeClass('circle-prop');
    $('.comm-tab').removeClass('circle-prop');
    $('.resid-tab').removeClass('circle-prop');
    

    $(".residential-content").hide();
    $(".commercial-content").hide();
    $(".industrial-content").hide();
    $(".farming-content").show();
    console.log("check farming")
  }



  Flat()
  {
    console.log("chek flat")
    $(".main-filter-section").show();
    $(".filter_two_sec").hide();
    
  }

  Villa()
  {
    console.log("villa flat")
    $(".filter_two_sec").show();
    $(".main-filter-section").hide();
    
  }

  House()
  {


  }


  CoWorking()
  {

  }


  CoLiving()
  {

  }

values = '';

onKeyUp(event: any) {
  this.values += event.target.value + ' : ';
}

 
getRecentlyUploaded(page)
{
  this.isLoading = true;
  this.page  = page
  this.apiservice.gettoRecentpproperties(this.page,20)
  // this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/filter/show/res?page=0&size=10&sort=createdAt,des')
 .subscribe((data:any)=>
     {
      console.log("recent data",data);
      if(data.successCode === "API_SUCCESS" && data.statusCode == 200 )
      {
       this.recentProperties = data.page.content;
       this.isLoading = false;
       console.log("recent properties",this.recentProperties);
       this.carouselresidItems =  this.recentProperties;
      this.recentProperties.forEach((data,i) => {
      this.propertiesimage = data.propertyImages;
      this.recentProperties[i].pricing.expectedPrice = Math.round(data.pricing.expectedPrice);
        this.recentProperties[i].furnishing = data.furnishing.replace('_',' ');

         const str2 = data.createdAt;
        const arr2 = str2.split(/ (.*)/);
        this.recentProperties[i].createdAt = new Date(arr2[0]).toDateString();
     });
     console.log("check======>?????????????", this.carouselresidItems);
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
   
     )};



  commercialprop:any;

  commercialUploadProperty(page)
  {
    this.isLoading = true;
    this.page = page;
    this.apiservice.getCommecialProperty(this.page,10)
    // this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/filter/show/res?page=0&size=10&sort=createdAt,des')
  .subscribe((data:any)=>
      {
  this.commercialprop = data.extraData.commercialAsset.content;
  console.log('commercial',this.commercialprop);
      
  this.commercialprop.forEach((data,i) => {
    const str2 = data.createdAt;
    const arr2 = str2.split(/ (.*)/);
    this.commercialprop[i].createdAt = new Date(arr2[0]).toDateString();
  });
  this.carouselcommercItems =  this.commercialprop;
   console.log('commercial carousel',this.carouselcommercItems);

      });
  }



  indusproperties:any;

  industrialUploadProperty()
  {
    this.isLoading = true;
    this.apiservice.getTopIndustrialProperties()
    // this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/filter/show/res?page=0&size=10&sort=createdAt,des')
  .subscribe((data:any)=>
      {
        console.log('ind data',data);
        
  this.indusproperties = data.extraData.commercialAsset.content;
  // console.log('commercial',this.commercialprop);
      
  this.indusproperties.forEach((data,i) => {
    const str2 = data.createdAt;
    const arr2 = str2.split(/ (.*)/);
    this.indusproperties[i].createdAt = new Date(arr2[0]).toDateString();
  });
  this.carouselIndustrialItems =  this.indusproperties;
   console.log('commercial carousel',this.carouselcommercItems);

      });
  }

  getTopViewsUploaded()
  {
    this.isLoading = true;
    this.apiservice.getTopProperties()
  // this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/filter/show/res?page=0&size=10&sort=views,desc')
  .subscribe((data:any)=>
      {
        console.log("view data",data);
        if(data.successCode === "API_SUCCESS" && data.statusCode == 200 )
        {
        this.viewproperties = data.page.content;
        this.isLoading = false;
        console.log("views properties",this.viewproperties);
        this.carouselItemsView =  this.viewproperties;

       this.viewproperties.forEach((data,i) => {
        this.propertiesimage = data.propertyImages;
   
        this.viewproperties[i].furnishing = data.furnishing.replace('_',' ');

         const str2 = data.createdAt;
        const arr2 = str2.split(/ (.*)/);
        this.viewproperties[i].createdAt = new Date(arr2[0]).toDateString();

     });
    //  this.carouselItems = __crousel;
     console.log("check======>?????????????", this.carouselItemsView);
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
    
      )};


  getTopRawLandUploaded()
  {
    this.isLoading = true;
    this.apiservice.getrawlandproperty()
  .subscribe((data:any)=>
      {
        console.log("raw data",data);
        if(data.successCode === "API_SUCCESS" && data.statusCode == 200)
    {
        this.rawproperties = data.rawLandPageableResponseDto.rawLandResponse;
        this.isLoading = false;
        console.log("raw properties",this.rawproperties);
        this.carouselItemsraw =  this.rawproperties;       
        this.rawproperties.forEach((data,i) => {
        // this.rawproperties[i].marketplace = data.marketplace.replace('_',' ');
        // this.rawproperties[i].propertyType = data.propertyType.replace('_',' ');
        this.rawproperties[i].marketplace = this.enumservice.kytname.get(this.rawproperties[i].marketplace);
          const str2 = data.createdAt;
        const arr2 = str2.split(/ (.*)/);
        this.rawproperties[i].createdAt = new Date(arr2[0]).toDateString();
      });
    }
    //  this.carouselItems = __crousel;
      console.log("check======>?????????????", this.carouselItemsraw);
      },
      (err) => {
        console.log("got error", err)
        //  self.serverDataLogin=err;
      } //For Error Response)
    
      )};





  getDapproperty(size)
  {
    this.isLoading = true;
    this.apiservice.getdapproperty(size)
    .subscribe((data:any)=>
    {
      this.isLoading = false;
    if(data.successCode = "API_SUCCESS" && data.statusCode == 200)
    {
      this.dappdata = data.extraData.ProjectInfo;
      this.carouseldappdata = this.dappdata;
      console.log('ok',this.dappdata);
    }

    })
  };
  
  

  fromdashboard(pid)
  {
    console.log('ok');
    this.utilService.routedsellproperty = true;
    this.utilService.pid = pid;
    localStorage.setItem("showcontact","true");
  }      

}

