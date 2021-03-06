   /// <reference types="@types/googlemaps" />
   import { Component, OnInit ,ViewChild, ElementRef, NgZone, ChangeDetectorRef} from '@angular/core';
   import * as $ from 'jquery';
   declare var $ :any; 
   import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
   import { HttpClient, HttpHeaders, } from '@angular/common/http';
   import {ActivatedRoute, Router,NavigationEnd} from '@angular/router';
   declare let google: any;
   import { ToastrService } from 'ngx-toastr';
   // import { } from '@types/googlemaps'; // is mandatory pls don't remove
   import { FormControl } from '@angular/forms'; 
   import { MapsAPILoader } from '@agm/core';
   import { NgForm } from '@angular/forms';
   import {User} from '../services/user.model';
   import { LocationStrategy } from '@angular/common';
   import { Pipe, PipeTransform } from '@angular/core';
   import { PincodeService,LocalDataService,ApiService } from '../services';	
   import Swal from 'sweetalert2';
   import { Options,LabelType  } from 'ng5-slider';
   @Component({
    selector: 'app-needanalysis',
    templateUrl: './needanalysis.component.html',
    styleUrls: ['./needanalysis.component.scss']
  })
  export class NeedanalysisComponent implements OnInit {
    registrationForm:FormGroup; 
    latitude: number;
    longitude: number;  
    public searchControl: FormControl;
    public searchControl1: FormControl;
    zoom: number=1
    place:any;
    facilities:any;
    taluk:any;
    district:any;
    appliance:any;
    furniture:any;
    residential:any;
    commercial:any;
    industrial:any;
    agriculture:any;
    furnishview=false;
    utilities:any=[];
   stepper1:any;
   stepper2:any;
   stepper3 :any;
   market:any;
   ceiling:any;
   flooring:any;
   asset:any;
   rooms:any;
   bathroom:any;
   city:any;
   kitchen:any;
   area:number = 0;
   homewares:any;
   kitchentype:any;
   nearlocat=[];
   bhk:any;
   kitchenware:any;
   furnishing:any;
   faciliytytype:any;
   community:any;
   constructionphase:any;
   cookingunit:any;
   washingmachine:any;
   fullfurnished:any;
   firstformcomplete=false;
   twoformcomplete=false;
   threeformcomplete=false;
   fourformcomplete=false;
   fiveformcomplete=false;
   sixformcomplete=false;
   sevenformcomplete=false;
   reviewupdate = false;
   otherapproval:any;
   backyardlength:any;
   backyardbreadth:any;
   frontyardlength:any;
   frontyardbreadth:any;
   localfirststep:any;
   localsecondstep:any;
   localthirdstep:any;
   localfourstep:any;
   localfivestep:any;
   localsixstep:any;
   localsevenstep:any;
  locationlayout = [];
  propertystyle = [];
  facilitymanagement = [];
  furnishingstatus = [];
  propertiesgallery = [];
  payments = [];
  propertyfloor:any;
  statedata:any;
  builtUpArea:number;
  carpetArea:number;
  superBuiltUpArea:number=0;
  statedatashow:any;
  length:any;
  breadth:any;
   bathroomlocation:any;
  
   progressbarinitstepone=0;
   progressbarstepone=20;
  
   progressbarinitsteptwo=0;
   progressbarsteptwo=7.5;
  
   progressbarinitstepthree=0;
   progressbarstepthree=50;
  
   progressbarinitstepfour=0;
   progressbarstepfour=16.5;
  
   progressbarinitstepfive=0;
   progressbarstepfive=20;
  
   progressbarinitstepsix=0;
   progressbarstepsix=50;
  
   progressbarinitstepseven=0;
   progressbarstepseven=25;

   progressbarinitstepeight=33;
   progressbarstepeight=6;
   showdimvalue:any=0;
   showfloorvalue:any;
   propertydimension:any;
    user = new User();
    propertyTypes:any= [];
    uuid:any;
    jwttoken:any;
    maplacelocat:any;
    mandatfield =false;
    payconstructionphase:any;
    payfinalize:any;
    payapproval:any;
    parkinginformation:any;
    propertyfor:any;
    bathroomlocat:any;
    facingside:any;
    parkingavailablity:any;
    localmaplocation:any;
    jfrontyardavail:any;
    jbalconyavail:any;
    profession:any;
    maketcategory:any;
    rawlandfacility:any;
    minValue:number;
    maxValue:number;
   bathroomstylearray = [];
   slideNo = 0;
   username:any;
   email:any;
   // prebuiltroom = {
   //   "Type":0,
   //   "Count":0,
   //   "size":[]
   // }

    bathroomstyleok= {
      "id":"",
     "length":"",
     "breadth":"",
     "bathroomStyle":"",
     "bathroomplace":""
   }
   
    propertyFloor:Array<string> = ["1", "2","3","4","5","6","7","8","9","10","Select"];	     @ViewChild("search") searchElementRef: ElementRef;
   //  @ViewChild("rawsearch", {read: ElementRef}) rawsearch: ElementRef;
   @ViewChild('abcd') 
   private abcd: ElementRef;
   
    constructor(private apiservice:ApiService,
      private localdataservice: LocalDataService, 
      private toastr: ToastrService,location: LocationStrategy,
      public fb: FormBuilder, private cd: ChangeDetectorRef,
       private dataservice:PincodeService, 
       private mapsAPILoader: MapsAPILoader, 
        private ngZone: NgZone,private http: HttpClient,
         private router: Router) {
        this.uuid = localStorage.getItem("uuid");
      this.jwttoken = localStorage.getItem("jwttoken");
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");

      toastr.toastrConfig.preventDuplicates=true;
 
     }

     options: Options = {
      floor: 0,
      showTicks: false,
      ceil: 50000000,
      step: 500000,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:  
            // return '<b>Min:</b> ₹' + value; 
           
          case LabelType.High: 
            // return '<b>Max:</b> ₹' + value;
          default:
            return '₹' + value;
            
        }
      }
      
    };

     pleasebathroomstyle:any;
    ngOnInit() {
      this.minValue = 10000;
      this.maxValue = 50000000;

      $('.dropdown-menu').click(function(e) {
        // console.log('ksjdksd');
           e.stopPropagation();
        });
    
      console.log('rawlandapi',this.rawlandapi,this.localmarket,this.uuid);

     // this.localStorageClear();
     // $('#property-locat').val('please choose catrogories');
     //  this.pleasebathroomstyle = 'bathstyle';
     // $('#neardisab').prop('disabled',true).css('cursor','not-allowed');

     this.hidedata();
     
   this.http.get('./assets/state.json')
   .subscribe((data:any)=>
   {
     this.statedata = data;
     console.log("data",data);
   })
       this.showStepFormOnload();

     this.localstoragevalue();
      console.log("localflooringtype",this.localceilingtype,this.localflooringtype);
  
      history.pushState(null, null, location.href);
     window.onpopstate = function () {
         history.go(1);
     };
     $(window).scrollTop({scrollTop:0}, 5000);
  
     // this.stepNotAllowed();
  
      this.propertyTypes = this.getpropertytypes();
      
  
      this.dataservice.getFacilities().subscribe((data:any)=>
    {
      this.furniture = data[0].FURNITURE;
      this.furnishing = data[1].FURNISHING;
      this.residential = data[2].RESIDENTIAL;
      this.commercial = data[3].COMMERCIAL;
      this.industrial = data[4].INDUSTRIAL;
      this.agriculture = data[5].FARMING;
      this.flooring = data[6].FLOORING;
      this.ceiling = data[7].CEILING;
      this.market = data[41].RAWMARKET;
      this.asset = data[9].ASSET;
      this.rooms = data[10].ROOMS;
      this.bathroom = data[11].BATHROOMTYPE;
      this.kitchentype = data[12].KITCHENTYPE;
      this.nearlocat = data[13].NEARLOCATION;
      this.bhk = data[14].BHK;
      this.utilities = data[15].UTILITIES;
      this.community = data[16].COMMMUNITY;
      this.faciliytytype = data[17].FACILITYTYPE;
      this.kitchenware = data[18].KITCHENWARE;
      this.homewares = data[19].HOMEWARES;
      this.appliance = data[20].APPLIANCE;
      this.constructionphase = data[21].CONSTRUCTIONPHASE;
      this.cookingunit = data[22].COOKINGUNIT;
      this.washingmachine = data[23].WASHINGMACHINE;
      this.fullfurnished = data[24].FULLYFURNISHEDKITCHEN;
      this.propertydimension = data[25].PROPERTYDIMENSION;
      this.propertyfloor = data[26].PROPERTYFLOOR;
      this.payconstructionphase = data[27].PAYCONSTRUCTIONPHASE;
      this.payfinalize = data[28].PAYFINALIZE;
      this.payapproval = data[29].PAYAPPROVAL;
      this.parkinginformation = data[30].PARKINGINFORMATION
      this.parkingavailablity = data[31].PARKINGAVAILABILITY
      this.propertyfor = data[32].PROPERTYFOR
      this.bathroomlocat = data[36].BATHROOMLOCATION
      this.facingside = data[37].FACING
      this.jfrontyardavail = data[38].FONTBACKYARDAVAILABILITY
      this.jbalconyavail = data[39].BALCONYAVAILABILITY
      this.profession = data[42].PROFESSION;
      this.maketcategory = data[43].MARKETCATEGORY
      this.rawlandfacility = data[40].RAWLANDFACILITIES
      
      console.log("property bathroomlocat data",this.parkingavailablity);
    });
    
  //////////////////////////////////
   
   //set google maps defaults
   this.zoom = 4;
   this.latitude = 39.8282;
   this.longitude = -98.5795;
  
   //create search FormControl  
   //set current position
   this.setCurrentPosition();
  
   //load Places Autocomplete
   $('a[rel=popover]').popover({
    html: true,
    trigger: 'hover',
    placement: 'bottom',
    content: function(){return '<img src="'+$(this).data('img') + '" />';}
  });
  
    }   
   pricingapi:any; 
  // ngOnInit End here /////////////////////////////////////////
  
  
  check(e)
  {
    this.pricingapi = e.target.value
    $('#words').text(this.inWords( this.pricingapi)) ;
    console.log("e.target.value", this.pricingapi);
  }
   inWords (num) {
     var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  
    var n = num.split('');
      if ((num = num.toString()).length > 9) return 'overflow';
      n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
      return str;
  }
  
   getpropertytypes()
   {
   return   ["1", "2","3","4","5","6","7","8","9","10"];
   }
  
    setCurrentPosition() {
      console.log("check setCurrentPosition");
      if ("geolocation" in navigator) {
        
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("getCurrentPosition");
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        this.getCurrentLocation();
        });
      }
    }
  
   
    currentLocation:any;
    addresslocation:any;
    getCurrentLocation() {
      console.log("check getCurrentLocation");
      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder;
        let latlng = {lat: this.latitude, lng: this.longitude};
        console.log("latlng",latlng);
        localStorage.setItem('latitude',JSON.stringify(this.latitude));
        localStorage.setItem('longitude',JSON.stringify(this.longitude));
        // let that = this;
        geocoder.geocode({'location': latlng}, function(results) {
            if (results[0]) {
              //formatted address
              console.log("formatted_address",results);
              console.log("place",results[0].formatted_address);
              localStorage.setItem("maplocation",results[0].formatted_address);
              $('#dataloccs').val(results[0].formatted_address)
              //find country name
                  for (var i=0; i<results[0].address_components.length; i++) {
                 for (var b=0;b<results[0].address_components[i].types.length;b++) {
                  
                   if (results[0].address_components[i].types[b] == "locality") {		                  //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                     this.city= results[0].address_components[i].long_name;		                      // if (results[0].address_components[i].types[b] == "locality") {
                     localStorage.setItem('city',this.city);		                      //     this.city= results[0].address_components[i].long_name;
                     break;		                      //     localStorage.setItem('city',this.city);
                 }		                      //     break;
                     // }
                 if (results[0].address_components[i].types[b] == "country") {		
                  this.country= results[0].address_components[i];		
                  break;		
              }		
              if (results[0].address_components[i].types[b] == "administrative_area_level_1") {		
                this.state= results[0].address_components[i].long_name;		
                localStorage.setItem('state',this.state);		
                break;		
            }
  
                 }
             }
             //city data
           
            //  console.log(this.state.short_name + " " + this.state.long_name);
            //  console.log(this.country.short_name + " " + this.country.long_name);
     
             } else {
               alert("No results found");
             }
        });
      });
    }
    
  
    country:any;
    state:any;
  
  ////////////////////////////
  


    localstoragevalue()
    {
    let storagevalupath = this.localdataservice.localStorageValue()
    this.localmarket = storagevalupath.localmarketv;
    this.localpropfor = storagevalupath.locpropforv;
    this.localprofession = storagevalupath.locprofessionv;

    this.localasset = storagevalupath.localassetv;
    this.localprebuilt = storagevalupath.localprebuiltv;
    this.localceilingtype = storagevalupath.localceilingtypev;
    this.localflooringtype = storagevalupath.localflooringtypev;
    this.localutilities = storagevalupath.localutilitiesv;
    this.localrawfacility = storagevalupath.locrawfacilityv;

    this.localcommunity =storagevalupath.localcommunityv;
    this.localecofacility = storagevalupath.localecofacilityv;
    this.localparkingtype = storagevalupath.localparkingtypev;
    this.localbalconyavail = storagevalupath.locbalconyavailv;

    this.localfrontbackyardavail = storagevalupath.locfrontbackyardavailv;

    this.localfurnshingstatus = storagevalupath.localfurnishstatusv;
    this.localhomeware = storagevalupath.lochomewarev;
    this.localkitchenware = storagevalupath.lockitchenwarev;
    this.localappliance = storagevalupath.locappliancev;
    this.localfuruniture = storagevalupath.locfurniturewarev;
    this.localconstruction = storagevalupath.locconstuctionphasev;
    this.localfinalizeinventory = storagevalupath.locfinalizeinventoryv;
    this.localapprovaltype = storagevalupath.locapprovaltypev;

    this.localdistrict = storagevalupath.locdistrictv;

    

    this.localrawfacvalue = storagevalupath.locfacingvaluev;
    this.localrawfacfield = storagevalupath.locfacingfieldv;

    this.localacresarea = storagevalupath.locacresareav;
    this.localacres = storagevalupath.locacresv;

    this.localownerdata = storagevalupath.locownerdatav;
    this.localyeardoc = storagevalupath.locyeardocv;

    this.localpincodedata = storagevalupath.pincodedatav;
    this.localdimunit = storagevalupath.locdimunitv;
    this.localsuperarea = storagevalupath.locsuperareav;
    this.localbuitarea = storagevalupath.builtareav;


    this.locallocat1 = storagevalupath.localocat1v;

    this.localfacing =  storagevalupath.facingareav;
    this.localcarpet =  storagevalupath.carpetareav;
    this.localkitchen = storagevalupath.lockitchenv;
    this.localkitchentype = storagevalupath.lockitchentypev;
    this.localbathroom =  storagevalupath.locbathroomv;
    this.localbathroomtype =  storagevalupath.locbathroomtypev;

    this.localothervalue = storagevalupath.othervaluev;

    this.localbedroom = storagevalupath.locbedroomv;
    this.localivingroom = storagevalupath.loclivingroomv;
    this.localstudyroom = storagevalupath.locstudyroomv;
    this.localpoojaroom = storagevalupath.locpoojaroomv;
    this.localdiningroom = storagevalupath.locdiningroomv;
    this.localservantroom = storagevalupath.locservantroomv;
    this.localstoreroom = storagevalupath.locstoreroomv;
    this.localbasementroom = storagevalupath.locbasementroomv;

    this.localkitchencountypeapi = storagevalupath.lockitchentypeapiv;
    this.localbathroomcountypeapi = storagevalupath.locbathtypeapiv;

    



    this.otherapproval = storagevalupath.localothertypev
    this.localbalcony = storagevalupath.balconyv;
    this.loccalparkinginfo = storagevalupath.locparkinginfov;
    this.localestimated = storagevalupath.locestimatedv;
    this.localexpected = storagevalupath.locexpectedv;
    this.localcity = storagevalupath.loccity1v;
    this.localstate = storagevalupath.locstate1v;     
    this.localbhkflat = storagevalupath.locbhkflatv;
    this.localfloor = storagevalupath.locfloorv;
    this.localaddress = storagevalupath.addressv;
    this.localdescription = storagevalupath.descrv;
    this.localvillage = storagevalupath.villagev;
    this.localroomcount = storagevalupath.locroomcountv;
    this.localroomtype = storagevalupath.locroomtypev;
    this.localfrontyard = storagevalupath.frontyardv;
    this.localbackyard = storagevalupath.backyardv;

    this.localprojname = storagevalupath.locprojnamev;
    this.localminarea = storagevalupath.locminrawareav;
    this.localmaxarea = storagevalupath.locemaxrawareav;
    this.localminbuilt = storagevalupath.loceminbuiltv;
    this.localmaxbuilt = storagevalupath.locemaxbuiltv;
    this.localmincarpet = storagevalupath.locemincarpetv;
    this.localmaxcarpet= storagevalupath.locemaxcarpetv;



    this.localpprofname = storagevalupath.locprofnamev;
    this.localname = storagevalupath.locnamev;
    this.localcontact = storagevalupath.locontactv;
    this.localreferal = storagevalupath.locrefferalv;
    this.localemail = storagevalupath.locemailv;

    this.localminprice = storagevalupath.locminpricev;
    this.localmaxprice = storagevalupath.locemaxpricev;

    this.localmcategory = storagevalupath.locmcategoryv;
    

    

    this.localprojdesc = storagevalupath.locprojdescv;
    this.localfirststep = storagevalupath.firststepv;
    this.localsecondstep = storagevalupath.secondstepv;
    this.localthirdstep = storagevalupath.thirdstepv;
    this.localfourstep = storagevalupath.fourstepv;
    this.localfivestep = storagevalupath.fivestepv;
    this.localsixstep = storagevalupath.sixstepv;
    this.localsevenstep = storagevalupath.sevenstepv;
    this.squareareafeet = storagevalupath.squarefeetv;
    this.localecother = storagevalupath.locecotherv;

    this.localmaplocation = storagevalupath.locmaplocationv;
    if(this.localmaplocation === undefined) this.localmaplocation = "";
    if(this.localacresarea === undefined) this.localacresarea = "";
    if(this.localacres === undefined) this.localacres = "";
    if(this.localreferal === undefined) this.localreferal = "";

    if(this.localminprice === undefined) this.localminprice = [];
    if(this.localmaxprice === undefined) this.localmaxprice = [];
    if(this.localprebuilt === undefined) this.localprebuilt = [];
    if(this.localbhkflat === undefined) this.localbhkflat = [];
    if(this.localpincodedata === undefined) this.localpincodedata = "";
    if(this.localecofacility === undefined) this.localecofacility = [];
    if(this.localappliance === undefined) this.localappliance = [];
    if(this.localfuruniture === undefined) this.localfuruniture = [];
    if(this.localestimated === undefined) this.localestimated = "";
    if(this.localexpected === undefined) this.localexpected = "";
    if(this.localfacing === undefined) this.localfacing = "";
    if(this.localprojname === undefined) this.localprojname = "";
    if(this.localprojdesc === undefined) this.localprojdesc = "";
    if(this.loccalparkinginfo === undefined) this.loccalparkinginfo = "";
    if(this.localsuperarea === undefined) this.localsuperarea = "";
    if(this.localfrontyard === undefined) this.localfrontyard = [];
    if(this.localbackyard === undefined) this.localbackyard = [];
    if(this.localkitchen === undefined) this.localkitchen = "";
    if(this.localkitchentype === undefined) this.localkitchentype = "";
    if(this.localbathroom === undefined) this.localbathroom = [];
    if(this.localbathroomtype === undefined) this.localbathroomtype = "";
    if(this.localivingroom === undefined) this.localivingroom = ""; 
    if(this.localstudyroom === undefined) this.localstudyroom = "";
    if(this.localpoojaroom === undefined)  this.localpoojaroom = "";
    if(this.localservantroom === undefined)  this.localservantroom = "";
    if(this.localstoreroom === undefined)  this.localstoreroom = "";
    if(this.localdiningroom === undefined)this.localdiningroom = ""; 
    if(this.localbalcony === undefined)  this.localbalcony = ""; 
    if(this.localkitchen === undefined)  this.localkitchen = ""; 
    console.log("CHECK localstate",this.localstate);
  
  }
  
 

  showStepFormOnload(){
 //   if(this.router.url === '/sell-property#step1')
 //   {
 //     if($('.stepone').is(":hidden"))
 //     {
 //      console.log("show");
 //      $('.market').show();
 //     }
 //     $('.overall-progress').hide();
 //   }

 //   if(this.router.url == '/sell-property#step2')
 //   {
 //     if($('.steptwo').is(":hidden"))
 //     {
 //      console.log("show");
 //     this.step2();
 //     }
 //     $('.overall-progress').hide();
 //   }

   
 //   if(this.router.url === '/sell-property#step3')
 //    {
 //      console.log("this.router.url",this.router.url);
 //      if($('.stepthree').is(":hidden"))
 //      {
 //       console.log("show");
 //      this.step3();
 //      }
 //      $('.overall-progress').hide();
 //    }

 //    if(this.router.url == '/sell-property#step4')
 //    {
 //      console.log("this.router.url",this.router.url);
 //      if($('.stepfour').is(":hidden"))
 //      {
 //       console.log("show");
 //      this.step4();
 //      }
 //      $('.overall-progress').hide();
 //    }

 //    if(this.router.url == '/sell-property#step5')
 //    {
 //      console.log("this.router.url",this.router.url);
 //      if($('.stepfive').is(":hidden"))
 //      {
 //       console.log("show");
 //      this.step5();
 //      }
 //      $('.overall-progress').hide();
 //    }

 //    if(this.router.url == '/sell-property#step6')
 //    {
 //      console.log("this.router.url",this.router.url);

 //      if($('.stepsix').is(":hidden"))
 //      {
 //       console.log("show");
 //      this.step6();
 //      }
 //      $('.overall-progress').hide();
 //    }

 //    if(this.router.url === '/sell-property#step7')
 //    {
 //      console.log("this.router.url",this.router.url);
 //      if($('.stepseven').is(":hidden"))
 //      {
 //       // $(".overall-progress").click()
 //       console.log("show")
 //         this.step7(); 
 //      }
 //      $('.overall-progress').hide();
 //    }


    if(this.router.url === '/sell-property#resoverview')
    {
      console.log("this.router.url",this.router.url);
      $('#overviweformedit').show();
      $('.overall-progress').hide();
    }

   }  


   minPrice:any;
   maxPrice:any;
 
   ApiDataResponse(e)
   {
     // console.log("max",e);
   this.minPrice = e.value;
  //  console.log("Min",this.minPrice);
 
   this.maxPrice = e.highValue;
  //  console.log("Max",this.maxPrice);

   localStorage.setItem('minprice',this.minPrice);

   localStorage.setItem('maxprice',this.maxPrice);


   }

   propertylistPreview = 0;
   checkpropertylist(e)
   {
      if(e.target.value == "confirm")
     {
   this.propertylistPreview = 1;
     }

     console.log("ok",this.propertylistPreview);

   }
  
// upload image gallery

/////////////////////////



// upload image blue print gallery
o
/////////////////////////


facingvalue=[];
  
  facingcheck(facev,e)
  {

    this.facingside.forEach((needfac,i) => {
  
      if(needfac.id === facev.id)
      {
         if(!needfac.isSelected)
         {
          this.facingside[i].isSelected = true;
          this.firstformcomplete=true;
          localStorage.setItem('firststep','true');
         }
         else
         {
          this.facingside[i].isSelected = false;
         }
      }
    });
    localStorage.setItem('facing',JSON.stringify(this.facingside.filter(x=>x.isSelected == true)));
    $('#'+e.target.id).parent().parent().parent().addClass('buttoncolor');
    this.localstoragevalue();	    
  }

    
  
  indicator=true;
  row:any;
  pincode:any;
  pinload = false;
   pincodesubmit(e)
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
 
 if(e.target.value.length==6)
 {
   this.pinload = true;
   this.dataservice.getPincode(this.pincode)
   .subscribe((data:any)=>
   {
    this.pinload = false;
      console.log("data pincode",data);
        
      if(data.status && data.statusCode == 200){
        let row;
        row = data.extraData.PinInfo.find(x=>x.pinCode == e.target.value)
        if(row){
        this.district = row.district;
        this.taluk = row.taluka;
       this.indicator = true;
       console.log("found",this.row);
       localStorage.setItem("pincode",JSON.stringify(row));
        } else {
          // data not found
        }
      } 
      else if(data.exception == "DATA_NOT_FOUND")
     {
       this.taluk=""
       this.district=""
       this.indicator = false
     }
   })
 }
 if(e.target.value.length=="")
 {
   this.taluk=""
   this.district=""
   this.pinload = false;
   this.indicator = true;
   localStorage.removeItem('pincode');
 }
 }
 
  
   
  
  
  setradiov:any;
  marketdataapi:any;
  rawlandapi=false;
  
    setradio(marketdata,target)
    {    
      console.log('rawlandapi',this.rawlandapi,this.localmarket);
      
      $('.default_bg').removeClass('buttoncolor')
      this.market.forEach((mark,i)=> {
        if(mark.id== marketdata.id){
          this.market[i].isSelected = true;
       $('#'+target.id).parent().parent().addClass('buttoncolor');
       this.setradiov = target.value;
     this.marketdataapi = marketdata.value;
     if(this.marketdataapi == 4)
     {
      console.log('rawlandapi',this.rawlandapi);
      this.rawlandapi = true;
      this.firstformcomplete=true;
      $('.progressone').hide();
          localStorage.setItem('firststep','true');
     }
       console.log('marketvalue',this.marketdataapi,this.setradiov);
      localStorage.setItem('market',JSON.stringify(marketdata));
      this.marketnext();
        } 
       else{
        this.market[i].isSelected = false;
       }
      });
    }


    setpropertyv:any;
    setproperty(propdata,e)
      {
      this.propertyfor.forEach((mark,i) => {
          if(mark.id === propdata.id){
            if(!mark.isSelected){
              // console.log('111111111111111111111');
              this.propertyfor[i].isSelected = true;
            }
            else{
              this.propertyfor[i].isSelected = false;
            }
          }
        });
        localStorage.setItem('propertyfor',JSON.stringify(this.propertyfor.filter(x=>x.isSelected == true)));
        $('.ceilingtype-step').prop('disabled',false).css('cursor','pointer');
        var toogleceilingvalue = this.propertyfor.filter(s=>s.isSelected == true);
        this.setpropertyv = toogleceilingvalue.map(v=>v.value);
       console.log('toogleceilingvalue', this.setpropertyv);
        $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    
      }


    mcategoryapi:any;
    setmarketcategory(mcategorydata,e)
      {
      this.maketcategory.forEach((mcdata,i) => {
          if(mcdata.id === mcategorydata.id){
            if(!mcdata.isSelected){
              // console.log('111111111111111111111');
              this.maketcategory[i].isSelected = true;
            }
            else{
              this.maketcategory[i].isSelected = false;
            }
          }
        });
        localStorage.setItem('marketcategory',JSON.stringify(this.maketcategory.filter(x=>x.isSelected == true)));
        $('.ceilingtype-step').prop('disabled',false).css('cursor','pointer');
        var toogleceilingvalue = this.maketcategory.filter(s=>s.isSelected == true);
        this.mcategoryapi = toogleceilingvalue.map(v=>v.value);
       console.log('toogleceilingvalue', this.mcategoryapi);
        $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    
      }


  
    prebuiltflat=false;
    prebuiltselect:any;
    prebuiltvalue:any;
    prebuiltvalueapi:any;
    setresprebuiltmarket(datapresbuilt,e)
    {
      this.prebuiltselect = datapresbuilt.value;
      this.prebuiltvalue = e.target.value;
      console.log('datapresbuilt',datapresbuilt);
    this.residential.forEach((needres,i) => {
      if(needres.id === datapresbuilt.id)
      {
         if(!needres.isSelected)
         {
          this.residential[i].isSelected = true;
          this.firstformcomplete=true;
          localStorage.setItem('firststep','true');

         }
         else
         {
          this.residential[i].isSelected = false;
         }
      }
    });
     if(this.prebuiltvalue == "Flat")
    {
      this.prebuiltflat=true;
      console.log("check prebuiltflat",this.prebuiltflat);
    }
    localStorage.setItem('prebuilt',JSON.stringify(this.residential.filter(x=>x.isSelected == true)));
    $('#'+e.target.id).parent().parent().addClass('buttoncolor');
    let toggleprebuiltvalue = this.residential.filter(s=>s.isSelected == true);
    this.prebuiltvalueapi = toggleprebuiltvalue.map(v=>v.value);	
      }

      setcommprebuiltmarket(datapcommbuilt,e)
       {
      this.commercial.forEach((needcomm,i) => {
        if(needcomm.id === datapcommbuilt.id)
        {
           if(!needcomm.isSelected)
           {
            this.commercial[i].isSelected = true;
            this.firstformcomplete=true;
            localStorage.setItem('firststep','true');
           }
           else
           {
            this.commercial[i].isSelected = false;
           }
        }
      });
      localStorage.setItem('prebuilt',JSON.stringify(this.commercial.filter(x=>x.isSelected == true)));
      $('#'+e.target.id).parent().parent().addClass('buttoncolor');
      let toggleprebuiltvalue = this.commercial.filter(s=>s.isSelected == true);
      this.prebuiltvalueapi = toggleprebuiltvalue.map(v=>v.value);

      }

      setindprebuiltmarket(datapindbuilt,e)
       {
      this.industrial.forEach((needind,i) => {
        if(needind.id === datapindbuilt.id)
        {
           if(!needind.isSelected)
           {
            this.industrial[i].isSelected = true;
            this.firstformcomplete=true;
            localStorage.setItem('firststep','true');
           }
           else
           {
            this.industrial[i].isSelected = false;
           }
        }
      });
      localStorage.setItem('prebuilt',JSON.stringify(this.industrial.filter(x=>x.isSelected == true)));
      $('#'+e.target.id).parent().parent().addClass('buttoncolor');
      let toggleprebuiltvalue = this.industrial.filter(s=>s.isSelected == true);
      this.prebuiltvalueapi = toggleprebuiltvalue.map(v=>v.value);
      }
  
      setagrprebuiltmarket(datapagrbuilt,e)
       {
      this.agriculture.forEach((needagr,i) => {
  
        if(needagr.id === datapagrbuilt.id)
        {
           if(!needagr.isSelected)
           {
            this.agriculture[i].isSelected = true;
            this.firstformcomplete=true;
            localStorage.setItem('firststep','true');
           }
           else
           {
            this.agriculture[i].isSelected = false;
           }
        }
      });
      localStorage.setItem('prebuilt',JSON.stringify(this.agriculture.filter(x=>x.isSelected == true)));
      $('#'+e.target.id).parent().parent().addClass('buttoncolor');
      let toggleprebuiltvalue = this.agriculture.filter(s=>s.isSelected == true);
    this.prebuiltvalueapi = toggleprebuiltvalue.map(v=>v.value);	
      }
  
  
    // setrooms(e)
    // {
    //   console.log("chekck",e.target.value);
    //   $('.default_bg').removeClass('buttoncolor')
    //   // if(e.target.value)
    //   $('#'+e.target.id).parent().parent().addClass('buttoncolor');
  
    // }
  
  
    setfurnishvalue:any;
    setfurnishapi:any;
  
    setfurnish(furnishingdata,e)
    {
      // this.furnishnext();
      this.setfurnishvalue = e.target.value;
      this.setfurnishapi = furnishingdata.value;
      if(this.setfurnishvalue == 'Unfurnished')
      {
       console.log("")
      }
      this.fiveformcomplete = true;
      localStorage.setItem('fivestep','true');
      localStorage.setItem('furnishstatus',JSON.stringify(furnishingdata));
      $('.furnishstatus-step').prop('disabled',false).css('cursor','pointer');
      console.log("chekck",this.setfurnishapi);
      $('.default_bg').removeClass('buttoncolor')
      // if(e.target.value)
      $('#'+e.target.id).parent().parent().addClass('buttoncolor');
    }
  
  
  kitchentypeevalue:any;
  kitchentypeapi:any;
    tooglekitchentype(kitchentypedata,e)
    {
  console.log("kitchentypedata",this.kitchentypeapi);
  this.kitchentypeevalue = e.target.value;
  this.kitchentypeapi = kitchentypedata.value;
  
  this.kitchendimension.forEach((dm,i) => {
   this.kitchendimension[i].kitchencategory = this.kitchentypeapi;
  });
  console.log("kitchentypedata",this.kitchentypeapi);
  localStorage.setItem('kitchentype',JSON.stringify(kitchentypedata));
  $('.kitchentype-step').prop('disabled',false).css('cursor','pointer');
  $('.default_bg').removeClass('buttoncolor')
  $('#'+e.target.id).parent().parent().addClass('buttoncolor');
  this.kitchentypenext();
    }
  
  
  
  
  
  
    flooringapi:any;
    flooringvalue:any;
    tooglebflooring(flooringdata,e)
    {
      console.log('flooringvalue',this.flooring); 
      this.flooring.forEach((flooring,i) => {
        if(flooring.id === flooringdata.id){
          if(!flooring.isSelected){
            // console.log('111111111111111111111');
            this.flooring[i].isSelected = true;
     
          }
          else{
            this.flooring[i].isSelected = false;
          }
        }
      });
      localStorage.setItem('flooringtype',JSON.stringify(this.flooring.filter(x=>x.isSelected == true)));
  
      $('.floortype-step').prop('disabled',false).css('cursor','pointer');
      this.flooringvalue = this.flooring.filter(s=>s.isSelected == true);
      this.flooringapi = this.flooringvalue.map(v=>v.value);
     console.log('flooringvalue',this.flooringapi);
         console.log('flooringvalue',this.flooringvalue); 
  
      // localStorage.setItem("utilities",JSON.stringify(this.flooringapi));
      $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  
    }
  
  
  
    toogleceilingvalue:any;
  ceilingapi:any;
    toogleceiling(ceilingdata,e)
    {
    this.ceiling.forEach((ceil,i) => {
        if(ceil.id === ceilingdata.id){
          if(!ceil.isSelected){
            // console.log('111111111111111111111');
            this.ceiling[i].isSelected = true;
          }
          else{
            this.ceiling[i].isSelected = false;
          }
        }
      });
      localStorage.setItem('ceilingtype',JSON.stringify(this.ceiling.filter(x=>x.isSelected == true)));
      $('.ceilingtype-step').prop('disabled',false).css('cursor','pointer');
      this.toogleceilingvalue = this.ceiling.filter(s=>s.isSelected == true);
      this.ceilingapi = this.toogleceilingvalue.map(v=>v.value);
     console.log('toogleceilingvalue', this.ceilingapi);
         console.log('toogleceilingvalue',this.toogleceilingvalue);
      $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  
    }


    rawfacilityapi=[];

    tooglerawfacility(rawfacdata,e)
    {

      this.rawlandfacility.forEach((rawfac,i) => {
        if(rawfac.id === rawfacdata.id){
          if(!rawfac.isSelected){
            // console.log('111111111111111111111');
            this.rawlandfacility[i].isSelected = true;
            this.fourformcomplete = true;
            localStorage.setItem('fourstep','true');
          }
          else{
            this.rawlandfacility[i].isSelected = false;
          }
        }
      });
      localStorage.setItem('rawfacilities',JSON.stringify(this.rawlandfacility.filter(x=>x.isSelected == true)));
  
      var rawfacvalue = this.rawlandfacility.filter(s=>s.isSelected == true);
      this.rawfacilityapi = rawfacvalue.map(v=>v.value);
     console.log('flooringvalue',this.rawfacilityapi);
  
      // localStorage.setItem("utilities",JSON.stringify(this.flooringapi));
      $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  
    }



  
    ecoother = false;
    utilititesvalue=[];  
    utilitiesapi=[];
    toogleutilities(utilitiesdata,e)
    {
      this.utilities.forEach((util,i) => {
        if(util.id === utilitiesdata.id){
          if(!util.isSelected){
            // console.log('111111111111111111111');
            this.utilities[i].isSelected = true;
            this.fourformcomplete = true;
            localStorage.setItem('fourstep','true');
          }
          else{
            this.utilities[i].isSelected = false;
          }
        }
      });
      localStorage.setItem('utilitiestype',JSON.stringify(this.utilities.filter(x=>x.isSelected == true)));
      this.utilititesvalue = this.utilities.filter(s=>s.isSelected == true);
      this.utilitiesapi = this.utilititesvalue.map(v=>v.value);
     console.log('fil',this.utilitiesapi);
        //  console.log('data',this.utilititesvalue);
      $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    }
    
  
    communitiesvalue=[];  
    communitiesapi=[];
    tooglecommunity(communitydata,e)
    {
      this.community.forEach((comm,i) => {
        if(comm.id === communitydata.id){
          if(!comm.isSelected){
            // console.log('111111111111111111111');
            this.community[i].isSelected = true;
            this.fourformcomplete = true;
            localStorage.setItem('fourstep','true');
          }
          else{
            this.community[i].isSelected = false;
          }
        }
      });
      localStorage.setItem('communitytype',JSON.stringify(this.community.filter(x=>x.isSelected == true)));
      this.communitiesvalue = this.community.filter(s=>s.isSelected == true);
      this.communitiesapi = this.communitiesvalue.map(v=>v.value);
     console.log('fil',this.communitiesapi);
        //  console.log('data',this.utilititesvalue);
  
      $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    }
  
  
    toogleformselected:any;
  
    facilitiesvalue=[];
    facilityapi=[];

    array = [];
    i = 1;
    tooglefacility(faciliytytypedata,e)
    {
      console.log('ok',faciliytytypedata);
      console.log("e.target.value",e.target.value);
      if(e.target.value == "Other")
      {
         this.ecoother = this.ecoother == true ?  false : true;
         console.log("ok",this.ecoother);

         if(this.ecoother){
           this.array=[];
           this.pushData()
         } 

      }
      this.faciliytytype.forEach((fac,i) => {
        if(fac.id === faciliytytypedata.id){
          if(!fac.isSelected){
            // console.log('111111111111111111111');
            this.faciliytytype[i].isSelected = true;
          this.fourformcomplete = true;
          localStorage.setItem('fourstep','true');
          }
          else {
            this.faciliytytype[i].isSelected = false;
          }
        }
      });
      localStorage.setItem('ecofacilitytype',JSON.stringify(this.faciliytytype.filter(x=>x.isSelected == true)));
      $('.facilitytype-step').prop('disabled',false).css('cursor','pointer');
      this.facilitiesvalue = this.faciliytytype.filter(s=>s.isSelected == true);
      this.facilityapi = this.facilitiesvalue.map(v=>v.value);
     console.log('fil',this.facilityapi);
        //  console.log('data',this.utilititesvalue);

      $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    }
 
    otherfacilitiesdata=[];

    pushData() {
     this.i++;
     this.array.push({
       id:this.i,
       value:""
     })
     console.log('==>',this.array);
     console.log('otherfacilitiesdata',this.otherfacilitiesdata);
   }

   addMore(){
   // console.log("dfdsfsdf");
   // // var a = `<input type="text" name="name" #app onclick="myfunction($event)"/>`;
   // $('#dynamicInput').append('.checkdunamic');
   //   console.log("i am here")
   this.pushData()
 }

   myfunction(e)
   {
     console.log("funcion",e.target.value);
   }

   remove(obj){
     let index = this.array.indexOf(obj)
     if(index > -1){
       this.array.splice(index,1)
       // if(!this.array.length){
       //   this.ecoother = false;
       // }
     }
   }
  
  
  
  
  
  
    // ////////////////////////   home wares add count
  
    addCounthome(homewaresdata){
      console.log('addCount(homewaresdata)',homewaresdata);
     this.homewares.forEach((app,i) => {
      if(this.homewares[i].id == homewaresdata.id){
         // console.log("check count",this.homewares[i].count++);
         this.homewares[i].count++;
         localStorage.setItem('homewares',JSON.stringify(this.homewares.filter(x=>x.isSelected == true)));
         this.tooglehomevalue = this.homewares.filter(s=>s.isSelected == true);
         this.tooglehomeapi = this.tooglehomevalue.map(v=>v.value);
         this.homewarecountapi = this.tooglehomevalue.map(v=>v.count);
        console.log('fil',this.tooglehomeapi);
            console.log('data',this.tooglehomevalue);
            console.log('data count',this.homewarecountapi); 
      }
    }); 
    }
  
    subCounthome(homewaresdata){
      console.log('addCount(homewaresdata)',homewaresdata);
     this.homewares.forEach((app,i) => {
      if(this.homewares[i].id == homewaresdata.id){
         // console.log();
         if(this.homewares[i].count == 0){} 
                  else {
                   this.homewares[i].count--;
                   localStorage.setItem('homewares',JSON.stringify(this.homewares.filter(x=>x.isSelected == true)));
                   this.tooglehomevalue = this.homewares.filter(s=>s.isSelected == true);
                   this.tooglehomeapi = this.tooglehomevalue.map(v=>v.value);
                   this.homewarecountapi = this.tooglehomevalue.map(v=>v.count);
                  console.log('fil',this.tooglehomeapi);
                      console.log('data',this.tooglehomevalue);
                      console.log('data count',this.homewarecountapi);
                  }
                 }
               });
             }
  
  
    addCountkitchen(kitchenwaredata){
      console.log('addCount(homewaresdata)',kitchenwaredata);
     this.kitchenware.forEach((app,i) => {
      if(this.kitchenware[i].id == kitchenwaredata.id){
        this.kitchenware[i].count++;
        localStorage.setItem('kitchenwares',JSON.stringify(this.kitchenware.filter(x=>x.isSelected == true)));
        this.kitchnwarevalue = this.kitchenware.filter(s=>s.isSelected == true);
        this.kitchnwareapi = this.kitchnwarevalue.map(v=>v.value);
        this.kitchenwarecountapi = this.kitchnwarevalue.map(v=>v.count);
      
       console.log('fil',this.kitchnwareapi);
           console.log('data',this.kitchnwarevalue);
           console.log('count data',this.kitchenwarecountapi);
      }
    }); 
    }
  
    subCountkitchen(kitchenwaredata){
      console.log('addCount(homewaresdata)',kitchenwaredata);
     this.kitchenware.forEach((app,i) => {
      if(this.kitchenware[i].id == kitchenwaredata.id){
       if(this.kitchenware[i].count == 0){} 
       else {
        this.kitchenware[i].count--;
        localStorage.setItem('homewares',JSON.stringify(this.kitchenware.filter(x=>x.isSelected == true)));
        this.kitchnwarevalue = this.kitchenware.filter(s=>s.isSelected == true);
        this.kitchnwareapi = this.kitchnwarevalue.map(v=>v.value);
        this.kitchenwarecountapi = this.kitchnwarevalue.map(v=>v.count);
      
       console.log('fil',this.kitchnwareapi);
           console.log('data',this.kitchnwarevalue);
           console.log('count data',this.kitchenwarecountapi);
      }
     }
    }); 
    }
  
    addCountkitchenfully(fullfurnishedata){
      console.log('addCount(homewaresdata)',fullfurnishedata);
     this.fullfurnished.forEach((app,i) => {
      if(this.fullfurnished[i].id == fullfurnishedata.id){
        this.fullfurnished[i].count++;
        localStorage.setItem('kitchenfullywares',JSON.stringify(this.fullfurnished.filter(x=>x.isSelected == true)));
        this.kitchnwarevaluefully = this.fullfurnished.filter(s=>s.isSelected == true);
        this.kitchnwarefullyapi = this.kitchnwarevaluefully.map(v=>v.value);
        this.kitchenfullywarecountapi = this.kitchnwarevaluefully.map(v=>v.count)
       console.log('fil',this.kitchnwarefullyapi);
           console.log('data',this.kitchnwarevaluefully);
           console.log('data',this.kitchenfullywarecountapi);
      
      }
    }); 
    }
  
    subCountkitchenfully(fullfurnishedata){
      console.log('addCount(homewaresdata)',fullfurnishedata);
     this.fullfurnished.forEach((app,i) => {
      if(this.fullfurnished[i].id == fullfurnishedata.id){
       if(this.fullfurnished[i].count == 0){} 
       else {
        this.fullfurnished[i].count--;
        this.kitchnwarevaluefully = this.fullfurnished.filter(s=>s.isSelected == true);
        this.kitchnwarefullyapi = this.kitchnwarevaluefully.map(v=>v.value);
        this.kitchenfullywarecountapi = this.kitchnwarevaluefully.map(v=>v.count)
       console.log('fil',this.kitchnwarefullyapi);
           console.log('data',this.kitchnwarevaluefully);
           console.log('data',this.kitchenfullywarecountapi);
       }
      }
    }); 
    }
  
  
    addCountappliance(appliancedata){
      console.log('addCount(homewaresdata)',appliancedata);
     this.appliance.forEach((app,i) => {
      if(this.appliance[i].id == appliancedata.id){
        this.appliance[i].count++;
        localStorage.setItem('appliance',JSON.stringify(this.appliance.filter(x=>x.isSelected == true)));
        this.applicancevalue = this.appliance.filter(s=>s.isSelected == true);
        this.applianceapi = this.applicancevalue.map(v=>v.value);
        this.appliancecountapi = this.applicancevalue.map(v=>v.count);
       console.log('fil',this.applianceapi);
           console.log('data',this.applicancevalue);
           console.log('data',this.appliancecountapi);
      }
    }); 
    }
  
    subCountappliance(appliancedata){
      console.log('addCount(homewaresdata)',appliancedata);
     this.appliance.forEach((app,i) => {
      if(this.appliance[i].id == appliancedata.id){
       if(this.appliance[i].count == 0){} 
       else {
        this.appliance[i].count--;
        this.applicancevalue = this.appliance.filter(s=>s.isSelected == true);
        this.applianceapi = this.applicancevalue.map(v=>v.value);
        this.appliancecountapi = this.applicancevalue.map(v=>v.count);
       console.log('fil',this.applianceapi);
           console.log('data',this.applicancevalue);
           console.log('data',this.appliancecountapi);
       }
      
      }
    }); 
    }
  
    addCountfurniture(furnituredata){
      console.log('addCount(homewaresdata)',furnituredata);
     this.furniture.forEach((app,i) => {
      if(this.furniture[i].id == furnituredata.id){
        this.furniture[i].count++;
        localStorage.setItem('furnitureware',JSON.stringify(this.furniture.filter(x=>x.isSelected == true)));
        this.furniturevalue = this.furniture.filter(s=>s.isSelected == true);
    this.furnitureapi = this.furniturevalue.map(v=>v.value);
    this.furniturecountapi = this.furniturevalue.map(v=>v.count);
   console.log('fil',this.furnitureapi);
       console.log('data',this.furniturevalue);
       console.log('data',this.furniturecountapi);
      }
    }); 
    }
  
    subCountfurniture(furnituredata){
      console.log('addCount(homewaresdata)',furnituredata);
     this.furniture.forEach((app,i) => {
      if(this.furniture[i].id == furnituredata.id){
       if(this.furniture[i].count == 0){} 
       else {
        this.furniture[i].count--;
        this.furniturevalue = this.furniture.filter(s=>s.isSelected == true);
    this.furnitureapi = this.furniturevalue.map(v=>v.value);
    this.furniturecountapi = this.furniturevalue.map(v=>v.count);
   console.log('fil',this.furnitureapi);
       console.log('data',this.furniturevalue);
       console.log('data',this.furniturecountapi);
      }
     }
    }); 
    }
  
  
  tooglehomevalue = [];
  tooglehomeapi = [];
  homewarecountapi = [];
  tooglehome(homewaresdata,e)
  {
    this.homewares.forEach((homew,i) => {
      if(homew.id === homewaresdata.id){
        if(!homew.isSelected){
          // console.log('111111111111111111111');
          this.homewares[i].isSelected = true;
          this.addCounthome(homewaresdata);
        }
        else{
          this.homewares[i].isSelected = false;
          this.subCounthome(homewaresdata);
        }
      }
    });
    $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  }
  
  
  kitchnwarevalue = [];
  kitchnwareapi = [];
  kitchenwarecountapi = [];
  tooglekitchen(kitchenwaredata,e)
  {
    this.kitchenware.forEach((kitchenw,i) => {
      if(kitchenw.id === kitchenwaredata.id){
        if(!kitchenw.isSelected){
          // console.log('111111111111111111111');
          this.kitchenware[i].isSelected = true;
          this.addCountkitchen(kitchenwaredata);
        }
        else{
          this.kitchenware[i].isSelected = false;
          this.subCountkitchen(kitchenwaredata);
        }
      }
    });
    
    $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  }
  
  
  kitchnwarevaluefully = [];
  kitchnwarefullyapi = [];
  kitchenfullywarecountapi = [];
  tooglekitchenfullyfurnished(fullfurnishedata,e)
  {
    this.fullfurnished.forEach((kitchenw,i) => {
      if(kitchenw.id === fullfurnishedata.id){
        if(!kitchenw.isSelected){
          // console.log('111111111111111111111');
          this.fullfurnished[i].isSelected = true;
          this.addCountkitchenfully(fullfurnishedata);
        }
        else{
          this.fullfurnished[i].isSelected = false;
          this.subCountkitchenfully(fullfurnishedata);
        }
      }
    });
    
    $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  }
  
  
  applother:any;
  applicancevalue = [];
  applianceapi = [];
  appliancecountapi = []
  toogleappliance(appliancedata,e)
  {
   this.applother = false;
  console.log("e",e.target.value);
  if(e.target.value == "Other")
  {
    this.applother = this.applother == true ?  false : true;
    console.log("ok",this.applother);
  }
    this.appliance.forEach((appl,i) => {
      if(appl.id === appliancedata.id){
        if(!appl.isSelected){
          // console.log('111111111111111111111');
          this.appliance[i].isSelected = true;
          this.addCountappliance(appliancedata);
        }
        else{
          this.appliance[i].isSelected = false;
          this.subCountappliance(appliancedata);
        }
      }
    });
   
    $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  }
  
  appliancenext()
  {
    $('.appliance').hide();
    $('.furniturehome').show();
    this.progressplus('furnishnext');
  }
  
  
  furniturevalue = [];
  furnitureapi = [];
  furniturecountapi = [];
  tooglefurniture(furnituredata,e)
  {
    this.furniture.forEach((appl,i) => {
      if(appl.id === furnituredata.id){
        if(!appl.isSelected){
          // console.log('111111111111111111111');
          this.furniture[i].isSelected = true;
          this.fiveformcomplete = true;
          this.addCountfurniture(furnituredata);
        }
        else{
          this.furniture[i].isSelected = false;
          this.subCountfurniture(furnituredata);
        }
      }
    });
   
    $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  }
  
  landother= false;
  locationmark:any;
  nearlocationvalue:any;
  nearlocationData:any;
  tooglelandmark(nearlocation,e)
  {
  
    this.locationmark = nearlocation.name;

  console.log("landmark=====>",nearlocation);
  
  if(nearlocation.isSelected)
  {
    let i = this.nearlocat.indexOf(nearlocation)
    if(i > -1)
    { this.nearlocat[i].isSelected = false;

    }
    let selectedlocation = this.nearlocat.filter(x=>x.isSelected)
    localStorage.setItem('nearlocat',JSON.stringify(selectedlocation)) 
  } 
  else
  {
    $('#nearlocat').val('')
    $('#distancelocat').val('')
    this.nearLocation.name = nearlocation.name;
    $("#myLocation").modal({
     backdrop: 'static',
     keyboard: false
 });
   //  this.nearlocat.forEach((locat,i)=> {
   //    if(locat.id== nearlocation.id)
   //    {
   //      this.nearlocat[i].isSelected = true;
   //      console.log("this.nearlocat",this.nearlocat[i],i);
        
   //    }
   //  });
    this.nearlocationData = nearlocation.name;
   
  }
  
  
  // $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
  }


  railwaydimension = [];
  airportdimension = [];
  metrodimension=[];
  bustandimension = [];
  otherdimension = [];
  
  nearestapi:any;
  distanceapi:any;
  locationdetail:any;
  nearLocation = {
    name:"",
    nearlocat:"",
    nearestdis:""
  }
  submitlandmarkdistance (nearlocation)
  {
   let location = this.nearlocat.find(x=>x.name == nearlocation.name)
   if(location)
   {
     let index = this.nearlocat.indexOf(location)
     this.nearlocat[index].isSelected = true;
     this.nearlocat[index].nearlocat = nearlocation.nearlocat;
     this.nearlocat[index].nearestdis = nearlocation.nearestdis;
   }
   $('#myLocation').modal('hide');
   let selectedlocation = this.nearlocat.filter(x=>x.isSelected)
   localStorage.setItem('nearlocat',JSON.stringify(selectedlocation))   
   this.localstoragevalue(); 
    
  }
  
  selectedbathroom:any;
  noofbathroom =[];
  bathroomcount = [];
  valuebathPoped = false;
  tooglbathroom(value)
   {
     this.bathroomstylearray = [];
     this.selectedbathroom = value;

     if(this.valuebathPoped){
       this.bathroomcount.pop();
      } else this.valuebathPoped = true;
 
     this.bathroomcount.push(parseInt(this.selectedbathroom))

     console.log("e.value",value);
    console.log("e.value",this.noofbathroom);

    for (let index = 0; index < value; index++) {
     // this.bathroomstyleok.id = index.toString();
      this.bathroomstylearray.push( {
      "length":"",
      "breadth":"",
      "bathroomStyle":"",
      "bathroomplace":"",
      "noOfbathroom":this.selectedbathroom,
    })
      
    }
   }
  
   bathroomdetail:any;
   bathroomdimension = [];
   toalbathroomarea = 0;
   bathroomcountapi = [];

   bathroomcountypeapi = [1];

  bathroomtotaltypeapi = [];


   bathroomnext()
   {
    
       this.bathroomtotaltypeapi = this.kitchentotaltypeapi.concat(this.bathroomcountypeapi);
       localStorage.setItem('roomtype',JSON.stringify(this.bathroomtotaltypeapi));
       localStorage.setItem('bathroomtypeapis',JSON.stringify(this.bathroomtotaltypeapi));
     
  this.bathroomcountapi = this.kitchencountapi.concat(this.bathroomcount);
  localStorage.setItem('roomcount',JSON.stringify(this.bathroomcountapi));
 //  localStorage.setItem()
   console.log('bathroomstylearray',this.bathroomstylearray);
   
    console.log("this.totalarea sub",this.totalarea,this.toalbathroomarea);
    this.totalarea +=  this.toalbathroomarea;
    console.log("check kitchen bedroom living",this.totalkitchenarea,this.toalbathroomarea, this.totallivingroomarea);
    console.log("this.totalarea",this.totalarea);
      console.log("bedroomdetail",this.bathroomdetail);
      localStorage.setItem('bathroom',JSON.stringify(this.bathroomstylearray));
      localStorage.setItem('carpetarea',JSON.stringify(this.totalarea));
     
      $('.bathroom').hide();
      $('.balconyavail').show();
      this.progressplus('locationnext');
     // }
   // }
   }


   bathroomtypeapi:any;
  
   tooglebathroomtype(e)
   {
      let ourdata = e.target.value;
     this.bathroomtypeapi =  this.bathroom.find(x=>x.name == ourdata);
  }


  
   bathlocationselected:any;
   bathroomseledarray = [];
   bathroomlocationv(e)
   {
     let ourdata = e.target.value;
   
     let data1 = this.bathroomlocat.find(x=>x.name == ourdata);
     
     let i = this.bathroomlocat.indexOf(data1)
     // if(i>-1){
     //   this.bathroomlocat[i]=
     // }
  

   console.log("bathlocationvalue",this.bathlocationselected);
  //  $('.default_bg').removeClass('buttoncolor')
  // 
   }
   
  
  
  
  
  Selectedkitchen:any;
  noofkitchen = [];
  kitchencount = [];
  valuekitPoped = false;
  tooglkitchen(value)
  {
    this.noofkitchen = [];
    this.Selectedkitchen = value;
    for (let index = 0; index < value; index++) {
      this.noofkitchen.push(index)
    }
    console.log('this.valuePoped',this.valuekitPoped);
    if(this.valuekitPoped){
     this.kitchencount.pop();
    } else this.valuekitPoped = true;

     this.kitchencount.push(parseInt(this.Selectedkitchen));
   //  console.log();
    console.log("value",value);
    

    console.log("e.value",value);
  //  this.noofbedroom =  Array(value).fill(value).map((x,i)=>i);
   console.log("e.value",this.noofkitchen);
  }
  
  kitchendetail:any;
  kitchendimension = [];
  totalkitchenarea = 0;
  totalarea = 0;
  kitchencountypeapi = [3];

  kitchentotaltypeapi = [];

  kitchencountapi = [];
  kitchenvaluenext()
  {
    console.log(' this.noofkitchen',this.kitchencount);
    console.log('localkitchencountypeapi',this.localkitchencountypeapi);
   
     this.kitchentotaltypeapi = this.roomtypeapi.concat(this.kitchencountypeapi);
    localStorage.setItem('roomtype',JSON.stringify(this.kitchentotaltypeapi));
    localStorage.setItem('kitchentypeapis',JSON.stringify(this.kitchencountypeapi));
   
   this.kitchencountapi = this.totalroomcountapi.concat(this.kitchencount)
   localStorage.setItem('roomcount',JSON.stringify(this.kitchencountapi));
   // this.localstoragevalue();
   console.log("===>",this.Selectedkitchen);

   if(this.localkitchen){
     $('.kitchenvalue').hide();
     $('.kitchentype').show();
     this.progressplus('locationnext');
   }
  else if(this.Selectedkitchen == undefined)
  {
   Swal.fire({
     title: "Missing Field",
     text: "Please select field !!",
     type: "info",
    });
  }
  else{
  console.log("this.totalarea sub",this.totalarea,this.totalkitchenarea);
  console.log("this.totalkitchenarea",this.totalkitchenarea,);
    for (let i = 0; i < this.Selectedkitchen; i++) {
      console.log("$('#kitchenlength'+this.Selectedkitchen).val()",$('#kitchenbreadth'+i).val());
     var length =  $('#kitchenlength'+i).val()
     var breadth =  $('#kitchenbreadth'+i).val()
     this.totalkitchenarea += (length*breadth)
    this.kitchendimension.push({
      length:length,
      breadth:breadth
     })
    }
  
    console.log("check kitchen bedroom living",this.totalkitchenarea,this.toalbathroomarea, this.totallivingroomarea);
    console.log("")
    this.totalarea +=  this.totalkitchenarea;
    console.log("this.totalarea",this.totalarea,this.totalkitchenarea,this.builtUpArea);
  
     console.log("dewqeqwewqeqwe",this.kitchendimension)
       this.kitchendetail = {
       noOfkitchen:this.Selectedkitchen,
       kitchendimension:this.kitchendimension
     }
     console.log("bedroomdetail",this.kitchendetail)
     // $('#myModal').modal('hide');
  localStorage.setItem('kitchen',JSON.stringify(this.kitchendetail));
  $('.kitchenvalue').hide();
       $('.kitchentype').show();
       this.progressplus('locationnext');
  
 } 
  }
  
  
  
  
  Selectedbalcony:any;
  noofbalcony = [];
  tooglebalconyvalue(value)
  {
    this.noofbalcony = [];
    this.Selectedbalcony = value;
    for (let index = 0; index < value; index++) {
      this.noofbalcony.push(index)
    }
  
    console.log("e.value",value);
  //  this.noofbedroom =  Array(value).fill(value).map((x,i)=>i);
  $('.kitchenvalue-step').prop('disabled',false).css('cursor','pointer');
   console.log("e.value",this.noofbalcony);
  }
  
  
  
  
  balconydetail:any;
  balconydimension = [];
  totalbalconyarea = 0;
  baclonynext()
  {
    console.log("this.totalarea sub",this.totalarea,this.totalkitchenarea,this.totalbalconyarea);
    console.log("this.totalkitchenarea",this.totalkitchenarea,);
    for (let i = 0; i < this.Selectedbalcony; i++) {
      console.log("$('#roomlength'+this.Selectedbalcony).val()",$('#balconybreadth'+i).val());
     var length =  parseInt($('#balconylength'+i).val())
     var breadth =  parseInt($('#balconybreadth'+i).val())
     this.totalbalconyarea += (length*breadth)
     this.balconydimension.push({
       length:length,
       breadth:breadth
     }) 
    }
    this.totalarea +=  this.totalbalconyarea;
    console.log("this.totalarea",this.totalarea,this.totalbalconyarea,this.builtUpArea);
    //  if(this.totalarea > this.sqfeet2)
    //  {
    //    this.totalarea = this.totalarea-this.totalbalconyarea;
    //    this.totalbalconyarea = 0;
   
    //    console.log("this.totalarea",this.totalarea);
    //    this.toastr.info("Balcony dimension should be less than builtup area","Info");
    //  }
    //  else{
         console.log("dewqeqwewqeqwe",this.balconydimension)
         this.balconydetail = {
         noofbalcony:this.Selectedbalcony,
         balconydimension:this.balconydimension
       }
       console.log("bedroomdetail",this.balconydetail)
       // $('#myModal').modal('hide');
      localStorage.setItem('carpetarea',JSON.stringify(this.totalarea));
      localStorage.setItem('balconyarea',JSON.stringify(this.balconydetail));
      $('.balcony').hide();
      this.progressplus('locationnext');
     if( this.localprebuilt.find(x=>x.name == "Flat") || this.prebuiltvalue == "Flat")
      { 
        $('.frontbackyardavail').show(); 
      }
      else{
       $('.overall-progress').show();
       $('.progresstwo').hide();
      }
    
  }
  

  frontyardback()
  {
     this.progresssub('locationback');
    $('.frontbackyardavail').show();
  $('.frontyardlawn').hide();
  }
 
  frontyardimension = [];

  frontyardnext()
  {
   console.log("frontyardlength",this.frontyardlength);
   if(this.frontyardlength == undefined && this.frontyardbreadth == undefined)
   {
    console.log("frontyardlength",this.frontyardlength);
   }
   else{
     this.frontyardimension.push
     ({
       'length':this.frontyardlength,
       'breadth':this.frontyardbreadth,
     });
   console.log('this.backyardlength', this.frontyardimension);
  localStorage.setItem('frontyard',JSON.stringify(this.frontyardimension));
   }    
   $('.backyardlawn').show();
   $('.frontyardlawn').hide();
   this.progressplus('locationnext');

  }

  backyardback()
  {
   this.progresssub('locationback');
    $('.frontyardlawn').show();
  $('.backyardlawn').hide();
  }

  backyardimension = [];
  backyardnext()
 {
   $('.progresstwo').hide();
   if(this.backyardlength == undefined && this.backyardbreadth == undefined)
   {
    console.log("frontyardlength",this.frontyardlength);
   }
   else{
   this.backyardimension.push
   ({
     'length':this.backyardlength,
     'breadth':this.backyardbreadth,
   });
   console.log("backyardimension",this.backyardimension);
   localStorage.setItem('backyard',JSON.stringify(this.backyardimension));
 }
   $('.overall-progress').show();
   $('.backyardlawn').hide();
   this.progressplus('locationnext');
 }


  roomlengthcheck(room,e)
  {
    console.log("room",room);
    console.log("room.target.value",e.target.value);
  }
  
  
  
  roomtypeapi = [];

  roomsData:any;
  roomdatavalue:any;
  roomdatatype:any;
  tooglerooms(roomsdata,e)
  {
    this.Selectedroom = null;
    console.log(" this.selectedanimal", this.Selectedroom)
    this.nooroomscheck =[];
    // this.Selectedroom = [];
    this.propertyTypes = this.getpropertytypes();
    // this.propertyTypes = this.propertyTypes;
    this.roomdatavalue = e.target.value;
    this.roomdatatype = roomsdata.value
    console.log("ceilingdata",roomsdata.value);
    if(roomsdata.isSelected)
    {
      this.roomtypeapi.splice(this.roomtypeapi.indexOf(roomsdata.value),1)
      this.rooms.forEach((room,i)=> {
        console.log('room',this.rooms);
        
        if(room.id== roomsdata.id)
        {
          this.rooms[i].isSelected = false;
          console.log("this.rooms",this.rooms[i],i);
          localStorage.removeItem(this.rooms[i].id);

          if(this.roomdatavalue == "Bed Rooms")
          {
           this.localbedroom.roomdimension = [];
          }

          if(this.roomdatavalue == "Living Room")
          {
           this.localivingroom.livingroomdimension = [];
          }

          if(this.roomdatavalue == "Study Room")
          {
           this.localstudyroom.studyroomdimension = [];
          }

          if(this.roomdatavalue == "Pooja Room")
          {
           this.localpoojaroom.poojaroomdimension = [];
          }

          if(this.roomdatavalue == "Servant Room")
          {
           this.localservantroom.servantroomdimension = [];
          }

          if(this.roomdatavalue == "Dining Room")
          {
           this.localdiningroom.diningroomdimension = [];
          }
          if(this.roomdatavalue == "Store Room")
          {
           this.localstoreroom.storeroomdimension = [];
          }

          if(this.roomdatavalue == "Basement")
          {
           this.localbasementroom.basementroomdimension = [];
          }
        
        }
      });
     console.log("")
    } 
    else
    {
      $("#myModal").modal({
       backdrop: 'static',
       keyboard: false
   });
   //    this.rooms.forEach((room,i)=> {
   //      if(room.id== roomsdata.id)
   //      {
   //        this.rooms[i].isSelected = true;
   //        console.log("this.rooms",this.rooms[i],i);
  
   //      }
   //    });
      console.log("rooms",this.rooms);
      console.log("this.roomtypeapi",this.roomtypeapi);
      this.roomsData = roomsdata.name;
      $('.room-step').prop('disabled',false).css('cursor','pointer');
    }
   
  }
  
  bedroomcountapi = [];
  livingroomcountapi = [];
  studyroomcountapi = [];
  Diningroomcountapi = [];
  Poojaroomcountapi = [];
  Servantroomcountapi = [];
  Storeroomcountapi = [];
  basementroomcountapi = [];

  Selectedroom:any;
  nooroomscheck = [];
  roomselectchange(value,type)
    {
      // this.selectedanimal = value;
      console.log("type",type)
      this.Selectedroom =value;
      this.nooroomscheck = [];
      for (let index = 0; index < value; index++) {
        this.nooroomscheck.push(index)
      }
      $('.notehide').show();
    if(type == "Bed Rooms")
    {
    var index =  this.bedroomcountapi.indexOf(value)
    index > -1 ? "" : this.bedroomcountapi.splice(index,1);
    this.bedroomcountapi.push(parseInt(this.Selectedroom));

    } 
    else if(type == "Living Room")
    {
    var index =  this.livingroomcountapi.indexOf(value)
    index > -1 ? "" : this.livingroomcountapi.splice(index,1);
    this.livingroomcountapi.push(parseInt(this.Selectedroom));
    } 
    else if(type == "Study Room")
    {
    var index =  this.studyroomcountapi.indexOf(value)
    index > -1 ? "" : this.studyroomcountapi.splice(index,1);
    this.studyroomcountapi.push(parseInt(this.Selectedroom));
    }
    else if(type == "Pooja Room")
    {
    var index =  this.Poojaroomcountapi.indexOf(value)
    index > -1 ? "" : this.Poojaroomcountapi.splice(index,1);
    this.Poojaroomcountapi.push(parseInt(this.Selectedroom));
    }
    else if(type == "Dining Room")
    {
    var index =  this.Diningroomcountapi.indexOf(value)
    index > -1 ? "" : this.Diningroomcountapi.splice(index,1);
    this.Diningroomcountapi.push(parseInt(this.Selectedroom));
    }
    else if(type == "Servant Room")
    {
    var index =  this.Servantroomcountapi.indexOf(value)
    index > -1 ? "" : this.Servantroomcountapi.splice(index,1);
    this.Servantroomcountapi.push(parseInt(this.Selectedroom));
    }
    else if(type == "Store Room")
    {
    var index =  this.Storeroomcountapi.indexOf(value)
    index > -1 ? "" : this.Storeroomcountapi.splice(index,1);
    this.Storeroomcountapi.push(parseInt(this.Selectedroom));
    }

    else if(type == "Basement")
    {
    var index =  this.basementroomcountapi.indexOf(value)
    index > -1 ? "" : this.basementroomcountapi.splice(index,1);
    this.basementroomcountapi.push(parseInt(this.Selectedroom));
    }
      console.log("e.value",parseInt(this.Selectedroom));
  
 //  this.roomcountapi.push(parseInt(this.Selectedroom));
  
  console.log("this.roomcountapi",this.bedroomcountapi,this.livingroomcountapi, this.studyroomcountapi);
    //  this.noofbedroom =  Array(value).fill(value).map((x,i)=>i);
     
     console.log("e.value",this.nooroomscheck);
    }
  
  
  
  

  bedroomdimension = [];
  livingroomdimension = [];
  diningroomdimension=[];
  poojaroomdimension = [];
  studyroomdimension = [];
  servantroomdimension = [];
  storeroomdimension=[];
  basementroomdimension = [];
  roombathroomdimension = [];
  roomkitchenroomdimension = [];



  
  totalbedroomarea = 0;
  totallivingroomarea = 0;
  totalstudyroomarea = 0;
  totalpoojaroomarea = 0;
  totaldiningroomarea = 0;
  totalstoreroomarea = 0;
  totalservantroomarea = 0;
  totalbasementarea = 0;
  submitrooms()
  {
    console.log("length x breadth",this.Selectedroom);
    $('.notehide').hide();
    ////////////////////////////////////////////////////////////////////
    console.log('roomsData',this.roomsData);
    
    if(this.roomsData == 'Bed Rooms')
    {
      if(!this.Selectedroom)
     {
       this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
     }
     else
     {
      this.bedroomdimension = [];
     for (let i = 0; i < this.Selectedroom; i++) {
      console.log("$('#roomlength'+this.Selectedroom).val()", this.totalbedroomarea);
     var length =  $('#roomlength'+i).val()
     var breadth =  $('#roombreadth'+i).val()  
      this.totalbedroomarea +=(length*breadth);
      this.bedroomdimension.push({
        length:length,
        breadth:breadth,
       })
      }
      this.totalarea += this.totalbedroomarea
      console.log("$('#roomlength'+this.Selectedroom).val()", this.totalarea);
       console.log("dewqeqwewqeqwe",this.bedroomdimension)
     var bedroomdetail = {
       id:"room1",
       noOfRoom:this.Selectedroom,
     roomdimension:this.bedroomdimension
     }

    let data = this.rooms.find(x=>x.id == 'room1')
    let i = this.rooms.indexOf(data);
     this.rooms[i].isSelected = true;
     this.roomtypeapi.push(this.roomdatatype);
   localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

     localStorage.setItem("room1",JSON.stringify(bedroomdetail));
     console.log("bedroomdetail",bedroomdetail);
      $('#myModal').modal('hide');

  this.localstoragevalue();  
 } 
    }
  
  
    ///////////////////////////////////////////////////////////////////
    
    if(this.roomsData == 'Living Room')
    {
     if(!this.Selectedroom)
     {
       this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
     }
     else
     {
      // var roomdimension = [];
    for (let i = 0; i < this.Selectedroom; i++) {
      console.log("$('#roomlength'+this.Selectedroom).val()",this.totallivingroomarea);
     var length =  $('#roomlength'+i).val();
     var breadth =  $('#roombreadth'+i).val();
     this.totallivingroomarea +=(length*breadth);
     this.livingroomdimension.push({
      length:length,
      breadth:breadth
     
    })
    }
    this.totalarea += this.totallivingroomarea;
    console.log("$('#roomlength'+this.Selectedroom).val()",this.totalarea);
       console.log("dewqeqwewqeqwe",this.livingroomdimension)
      var livingroomdetail = {
       id:"room2",
       noOfRoom:this.Selectedroom,
       livingroomdimension:this.livingroomdimension
     }

    let data = this.rooms.find(x=>x.id == 'room2')
    let i = this.rooms.indexOf(data);
     this.rooms[i].isSelected = true;
     this.roomtypeapi.push(this.roomdatatype);
   localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

     localStorage.setItem("room2",JSON.stringify(livingroomdetail));
     console.log("livingroom",livingroomdetail)
     $('#myModal').modal('hide');
   

  this.localstoragevalue();

  } 
    }
  
    ///////////////////////////////////////////////////////////////////
    if(this.roomsData == 'Study Room')
    {
     if(!this.Selectedroom)
     {
       this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
     }
     else
     {
    for (let i = 0; i < this.Selectedroom; i++) {
      console.log("$('#roomlength'+this.Selectedroom).val()",$('#roomlength'+i).val());
     var length =  $('#roomlength'+i).val();
     var breadth =  $('#roombreadth'+i).val();
     this.totalstudyroomarea +=(length*breadth);
     this.studyroomdimension.push({
      length:length,
      breadth:breadth
     
      })
    }
    this.totalarea +=this.totalstudyroomarea; 
    console.log("dewqeqwewqeqwe",this.studyroomdimension)
       var studyroomdetail = {
         id:"room3",
       noOfRoom:this.Selectedroom,
       studyroomdimension:this.studyroomdimension
     }
     let data = this.rooms.find(x=>x.id == 'room3')
     let i = this.rooms.indexOf(data);
      this.rooms[i].isSelected = true;
      this.roomtypeapi.push(this.roomdatatype);
    localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

     localStorage.setItem("room3",JSON.stringify(studyroomdetail));
     console.log("bedroomdetail",studyroomdetail)
     $('#myModal').modal('hide');
     
     this.localstoragevalue();  
     }
    }
  
     ///////////////////////////////////////////////////////////////////
     if(this.roomsData == 'Pooja Room')
     {
       if(!this.Selectedroom)
       {
         this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
       }
       else
       {
     for (let i = 0; i < this.Selectedroom; i++) {
       console.log("$('#roomlength'+this.Selectedroom).val()",$('#roomlength'+i).val());
      var length =  $('#roomlength'+i).val()
      var breadth =  $('#roombreadth'+i).val()
      this.totalpoojaroomarea +=(length*breadth);
      this.poojaroomdimension.push({
        length:length,
        breadth:breadth
      
      })
     }
     this.totalarea += this.totalpoojaroomarea   
        console.log("dewqeqwewqeqwe",this.poojaroomdimension)
           var poojaroomdetail = {
             id:"room4",
           noOfRoom:this.Selectedroom,
           poojaroomdimension:this.poojaroomdimension
         }

         let data = this.rooms.find(x=>x.id == 'room4')
         let i = this.rooms.indexOf(data);
          this.rooms[i].isSelected = true;
          this.roomtypeapi.push(this.roomdatatype);
        localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

         localStorage.setItem("room4",JSON.stringify(poojaroomdetail));
         console.log("bedroomdetail",poojaroomdetail)
         $('#myModal').modal('hide');
      
      this.localstoragevalue();  
     }
      
     }
  
      ///////////////////////////////////////////////////////////////////
      if(this.roomsData == 'Servant Room')
      {
       if(!this.Selectedroom)
       {
         this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
       }
       else
       {
      for (let i = 0; i < this.Selectedroom; i++) {
        console.log("$('#roomlength'+this.Selectedroom).val()",$('#roomlength'+i).val());
       var length =  $('#roomlength'+i).val()
       var breadth =  $('#roombreadth'+i).val()
       this.totalservantroomarea +=(length*breadth);
       this.servantroomdimension.push({
        length:length,
        breadth:breadth,
       
      })
      }
     this.totalarea += this.totalservantroomarea;
       console.log("dewqeqwewqeqwe",this.servantroomdimension)
           var servantroomdetail = {
             id:"room5",
           noOfRoom:this.Selectedroom,
           servantroomdimension:this.servantroomdimension
         }
         let data = this.rooms.find(x=>x.id == 'room5')
         let i = this.rooms.indexOf(data);
          this.rooms[i].isSelected = true;
          this.roomtypeapi.push(this.roomdatatype);
        localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

         localStorage.setItem("room5",JSON.stringify(servantroomdetail));
         console.log("bedroomdetail",servantroomdetail)
         $('#myModal').modal('hide');
       
       this.localstoragevalue();  

     }
      }
  
   ///////////////////////////////////////////////////////////////////
   if(this.roomsData == 'Dining Room')
   {
     if(!this.Selectedroom)
     {
       this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
     }
     else
     {
   for (let i = 0; i < this.Selectedroom; i++) {
     console.log("$('#roomlength'+this.Selectedroom).val()",$('#roomlength'+i).val());
   var length =  $('#roomlength'+i).val()
   var breadth =  $('#roombreadth'+i).val()
   this.totaldiningroomarea +=(length*breadth);
   this.diningroomdimension.push({
     length:length,
     breadth:breadth
     
   })
   }
   this.totalarea +=this.totaldiningroomarea
     console.log("dewqeqwewqeqwe",this.diningroomdimension)
       var diningroomdetail = {
         id:"room6",
       noOfRoom:this.Selectedroom,
       diningroomdimension:this.diningroomdimension
     }
     let data = this.rooms.find(x=>x.id == 'room6')
     let i = this.rooms.indexOf(data);
      this.rooms[i].isSelected = true;
      this.roomtypeapi.push(this.roomdatatype);
    localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

     localStorage.setItem("room6",JSON.stringify(diningroomdetail));
     console.log("bedroomdetail",diningroomdetail)
     $('#myModal').modal('hide');
  
  this.localstoragevalue();  

   }
 }
       

     ///////////////////////////////////////////////////////////////////
     if(this.roomsData == 'Store Room')
     {
       if(!this.Selectedroom)
       {
        this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
       }
       else
       {
     for (let i = 0; i < this.Selectedroom; i++) {
       console.log("$('#roomlength'+this.Selectedroom).val()",$('#roomlength'+i).val());
     var length =  $('#roomlength'+i).val()
     var breadth =  $('#roombreadth'+i).val()
     this.totalstoreroomarea +=(length*breadth);
     this.storeroomdimension.push({
       length:length,
       breadth:breadth
     })
     }
     this.totalarea +=this.totalstoreroomarea
 console.log("dewqeqwewqeqwe",this.storeroomdimension)
   var storeroomdetail = {
     id:"room7",
   noOfRoom:this.Selectedroom,
   storeroomdimension:this.storeroomdimension
 }
 let data = this.rooms.find(x=>x.id == 'room7')
 let i = this.rooms.indexOf(data);
  this.rooms[i].isSelected = true;
  this.roomtypeapi.push(this.roomdatatype);
localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));

 localStorage.setItem("room7",JSON.stringify(storeroomdetail));
 console.log("bedroomdetail",storeroomdetail);
 $('#myModal').modal('hide');

this.localstoragevalue();  
     }
    

   }

//////////////////////////////////////////////////////   

  ///////////////////////////////////////////////////////////////////
  if(this.roomsData == 'Basement')
  {
    if(!this.Selectedroom)
    {
     this.toastr.info("Please Select no of Rooms","Select number of Rooms ")
    }
    else
    {
  for (let i = 0; i < this.Selectedroom; i++) {
    console.log("$('#roomlength'+this.Selectedroom).val()",$('#roomlength'+i).val());
  var length =  $('#roomlength'+i).val()
  var breadth =  $('#roombreadth'+i).val()
  this.totalbasementarea +=(length*breadth);
  this.basementroomdimension.push({
    length:length,
    breadth:breadth
  })
  }
  this.totalarea +=this.totalbasementarea
  console.log("dewqeqwewqeqwe",this.basementroomdimension)
  var basementroomdetail = {
    id:"room8",
  noOfRoom:this.Selectedroom,
  basementroomdimension:this.basementroomdimension
    }
    let data = this.rooms.find(x=>x.id == 'room8')
    let i = this.rooms.indexOf(data);
    this.rooms[i].isSelected = true;
    this.roomtypeapi.push(this.roomdatatype);
    localStorage.setItem('roomtype',JSON.stringify(this.roomtypeapi));
    localStorage.setItem("room8",JSON.stringify(basementroomdetail));
    console.log("basementroomdetail",basementroomdetail);
    $('#myModal').modal('hide');
    
    this.localstoragevalue(); 
    }
  }


}
  
  
  
  balconyavailable:any;
  tooglebalconys(data,e)
  {
    console.log("check tooglebalcony");
    this.balconyavailable = e.target.value;
    console.log("balconyavailable",this.balconyavailable);
    $('.default_bg').removeClass('buttoncolor')
    // if(e.target.value)
    $('#'+e.target.id).parent().parent().addClass('buttoncolor');
    localStorage.setItem('balconyfacavail',JSON.stringify(data))
    this.balconyavailnext();
  }

  gfgfhgfhghg(n,m){
    console.log(n,m);
    
  }


  fontbackavailable:any;
  tooglefrontavail(data,e)
  {
    console.log("check frontavail");
    this.fontbackavailable = e.target.value;
    console.log("fontbackavailable",this.fontbackavailable);
    localStorage.setItem('fronbackyardavail',JSON.stringify(data))
    $('.default_bg').removeClass('buttoncolor')
    // if(e.target.value)
    $('#'+e.target.id).parent().parent().addClass('buttoncolor');
    this.frontbackavailnext();
  }
  
  
  
  parkingavailable:any;
  
  toogleparkingtype(parkingavail,e)
  {
    console.log("check toogleparkingtype");
    this.parkingavailable = e.target.value;
    console.log("toogleparkingtype",parkingavail);
    console.log("toogleparkingtype",this.parkingavailable);
  
  localStorage.setItem('parkingavailability',JSON.stringify(parkingavail));
    $('.default_bg').removeClass('buttoncolor')
    // if(e.target.value)
    $('#'+e.target.id).parent().parent().addClass('buttoncolor');
    this.parktypenext();
  }
  
  
  nearparkingData:any;
  parkingapi = [];
  Selectedparking:any;
  parkingvaluee:any;
  toogleparkinginfo(parkingvalue,e)
  {

   this.parkingapi = parkingvalue.value;
   this.Selectedparking = e.target.value;
   console.log("landmark=====>",parkingvalue.value);
   
   if(parkingvalue.isSelected)
   {
     this.parkinginformation.forEach((locat,i)=> {
       if(locat.id== parkingvalue.id)
       {
         delete locat.parkinginformation;
         this.parkinginformation[i]=locat;
         this.parkinginformation[i].isSelected = false;
       
         console.log("this.nearlocat",this.parkinginformation[i],i,locat);
   
       }
     });
    console.log("")
     $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
     $('.default_bg').removeClass('buttoncolor')
   } 
   else
   {
     $('#vehicledata').val('')
     this.parkingvaluee = e.target.value;
     $("#myVehicle").modal({
       backdrop: 'static',
       keyboard: false
   });
     this.parkinginformation.forEach((locat,i)=> {
       if(locat.id== parkingvalue.id)
       {
         this.parkinginformation[i].isSelected = true;
         console.log("this.nearlocat",this.nearlocat[i],i);
         
       }
     });
     // console.log("nearlocat",this.nearlocat);
   // "this.nearlocat.nearest",this.nearlocat.nearest)
     $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
     this.nearparkingData = parkingvalue.name;
    
   }
   
     console.log("parkingvalue",parkingvalue);
 
 //  localStorage.setItem('parkingavail',JSON.stringify(parkingvalue));
   
  }
  



  parkingvalue:any;
  submitparkingvalue()
  {
      this.parkingvalue = $('#vehicledata').val()
      console.log('this.nearlocat',this.parkingvalue);
       if(this.parkingvalue == "")
       {
  this.toastr.info("Please type Input Field","Field is mandatory")
       }
       else{
         this.parkinginformation.forEach((kk,i) => {
           if(this.nearparkingData === kk.name){
             this.parkinginformation[i].parkinginform=this.parkingvalue
             // localStorage.setItem("lnearest",this.nearestapi);
             // localStorage.setItem("ldistance",this.distanceapi);
                       }
         });
         localStorage.setItem("parkingavail",JSON.stringify(this.parkinginformation.filter(x=>x.isSelected == true)));
         // console.log("this.nearlocat.disatance",disatance);
         console.log("this.nearlocat.nearest",this.parkinginformation,this.nearparkingData)
       $('#myVehicle').modal('hide');
       this.parkoptionnext();
       }
  }





  
  
  
  furnitureformselected:any;
  setconstructionphase(e)
  {
    this.furnitureformselected = e.target.value;
    if(this.furnitureformselected)
    {
     this.fiveformcomplete = true;
    }
    console.log("ceilingdata",e.target.value);
    $('.default_bg').removeClass('buttoncolor')
    $('#'+e.target.id).parent().parent().addClass('buttoncolor');
  }


  
  payconstructionvalue:any;
  payconstructionapi:any;
  
  
  setpayconstruction(payconstructiondata,e)
  {
  this.payconstructionvalue = e.target.value;
  this.payconstructionapi = payconstructiondata.value;
  console.log("payconstructiondata",this.payconstructionapi,this.payconstructionvalue);
  $('.default_bg').removeClass('buttoncolor')
  $('#'+e.target.id).parent().parent().addClass('buttoncolor');
  this.payconstructnext();
  $('.payconstruct-step').prop('disabled',false).css('cursor','pointer');
  localStorage.setItem('constructionphase',JSON.stringify(payconstructiondata))
  }
  
  payfinalizevalue:any;
  payfinalizeapi:any;
  
  setpayfinalizedata(payfinalizedata,e)
  {
    this.payfinalizevalue = e.target.value;
  this.payfinalizeapi = payfinalizedata.value;
    console.log("payfinalizedata",this.payfinalizeapi,this.payfinalizevalue);
  $('.default_bg').removeClass('buttoncolor')
  $('#'+e.target.id).parent().parent().addClass('buttoncolor');
  localStorage.setItem('finalizeinventory',JSON.stringify(payfinalizedata))
  this.payinventorynext();
  $('.payinventory-step').prop('disabled',false).css('cursor','pointer');
  }
  
  approvalother=false;
  payapprovalvalue:any;
  payapprovalapi:any;
  
  setpayapprovaldata(payapprovaldata,e)
      {
        this.payapprovalvalue = e.target.value;
        // this.payapprovalapi = payapprovaldata.value;
      this.payapproval.forEach((mark,i) => {
          if(mark.id === payapprovaldata.id){
            if(!mark.isSelected){
              // console.log('111111111111111111111');
              this.payapproval[i].isSelected = true;
            }
            else{
              this.payapproval[i].isSelected = false;
            }
          }
        });
       
        if(this.payapprovalvalue == "Other")
        {
          this.approvalother = this.approvalother == true ?  false : true;
         console.log("ok",this.approvalother);
        }
        localStorage.setItem('approvaltype',JSON.stringify(this.payapproval.filter(x=>x.isSelected == true)));
        var toogleceilingvalue = this.payapproval.filter(s=>s.isSelected == true);
        this.payapprovalapi = toogleceilingvalue.map(v=>v.value);
       console.log('toogleceilingvalue', this.payapprovalapi);
        $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    
      }















 //  othertypeinput(e)
 //  {
 //   var data = e.target.value;
 //   localStorage.setItem('otherapprovalinput',data);
 //  }

  othertypeinput(e)
  {
   var data = e.target.value;
   localStorage.setItem('otherapprovalinput',data);
  }


  ecother(e)
  {
    var ecothervalue = e.target.value;
    console.log('e',ecothervalue);
    localStorage.setItem('ecotherinputdata',ecothervalue);

  }
  
    // floorapidata = [];
    floorapi:any;
    togglefloor(e)
    {  
      this.floorapi = e.target.value;
      console.log("togglefloor",this.floorapi);
      localStorage.setItem("floor",this.floorapi);
    }
  
  
  bhkfloorapi:any;
  
    tooglebhk(bhkfloor,e)
      {
      this.bhk.forEach((bhkdata,i) => {
          if(bhkdata.id === bhkfloor.id){
            if(!bhkdata.isSelected){
              // console.log('111111111111111111111');
              this.bhk[i].isSelected = true;
            }
            else{
              this.bhk[i].isSelected = false;
            }
          }
        });
        localStorage.setItem('bhkflat',JSON.stringify(this.bhk.filter(x=>x.isSelected == true)));
        $('.ceilingtype-step').prop('disabled',false).css('cursor','pointer');
        var toogleceilingvalue = this.bhk.filter(s=>s.isSelected == true);
        this.bhkfloorapi = toogleceilingvalue.map(v=>v.value);
       console.log('toogleceilingvalue', this.bhkfloorapi);
        $('#'+e.target.id).parent().parent().toggleClass('buttoncolor');
    
      }


  
  nameId:number
  dimension:any;
  unitsapi:any;
  
  toggledimension(e)
  {
    this.dimension = e.target.value;
      console.log("selector",e.target.value);
      let ourdata=e.target.value;
    this.unitsapi =  this.propertydimension.find(x=>x.name == ourdata);
     if(this.unitsapi)
     {
       console.log(this.unitsapi);
       localStorage.setItem("dimensionunit",JSON.stringify(this.unitsapi));
       $('.dim-step').prop('disabled',false).css('cursor','pointer');
       // this.areanext();
     } 
  }
  
  
  dimensionnext()
  { 
    this.threeformcomplete = true;
    localStorage.setItem('thirdstep','true');
    if(this.localmarket.name =='RAW' || this.rawlandapi)
    {
      $('.dimension').hide();
      $('.overall-progress').show();
      this.progressplus('locationnext');
    }
    else
    {
    console.log("ok done ");
    $('.rooms').show();
    $('.dimension').hide();
    this.progressplus('locationnext');
  }
  }
  
  
  carpetAreaInput(e)
  {
    console.log("e.target.value",e.target.value);
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
  
  numeric(e)
  {
    var k = e.which;
    var ok = (k >= 48 && k <= 57) ||  // 0-9
        k == 8 ||  // Backspaces
        k == 9 ||  //H Tab
        k == 11 ||  //V Tab
        k == 0 ||  // Tab for Firefox
        k == 46 ||
        k == 127;   //Delete
    if (!ok) {
        e.preventDefault();
    }
  }




  
  carpetareainfo=false;
  carpetareainfo2=false;
  builtupareainfo = false;
  
  sqfeet1=0;
  sqfeet2=0;

  // superBuiltUpAreac(e)
  // {
  // if(this.dimension === 'Sq.Feet')
  //   {
  //   this.sqfeet1 = this.superBuiltUpArea;
  //   this.sqfeet2 = this.builtUpArea;
  //   console.log("sqmeter", this.sqfeet1, this.sqfeet2);
  //   }

  // if(this.dimension === 'Sq.Yards')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 9;
  //  this.sqfeet2 = this.builtUpArea * 9;
  //  console.log("sqmeter", this.sqfeet1);
  // }
  
  // if(this.dimension === 'Sq.Meter')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 11;
  //   this.sqfeet2 = this.builtUpArea * 11;
  //   console.log("sqmeter", this.sqfeet1);
  // }
  
  // if(this.dimension === 'Acres')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 43560;
  //   this.sqfeet2 = this.builtUpArea * 43560;
  //   console.log("acres", this.sqfeet1);
  // }
  
  // if(this.dimension === 'Marla')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 272;
  //   this.sqfeet2 = this.builtUpArea * 272;
  //   console.log("marla",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Ghaz')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 9;
  //   this.sqfeet2 = this.builtUpArea * 9
  //   console.log("ghaz",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Bigha')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 14400;
  //   this.sqfeet2 = this.builtUpArea * 14400;
  // console.log("bigha",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Cents')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 435;
  //   this.sqfeet2 = this.builtUpArea * 435;
  // console.log("cents",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Biswa')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 1350;
  //   this.sqfeet2 = this.builtUpArea * 1350;
  //   console.log("biswa",this.sqfeet1);
  // }
  
  // if(this.dimension === 'kottah')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 720;
  //   this.sqfeet2 = this.builtUpArea * 720;
  //   console.log("kottah",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Kanal')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 5445;
  //   this.sqfeet2 = this.builtUpArea * 5445;
  //   console.log("kottah",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Grounds')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 2400;
  //   this.sqfeet1 = this.builtUpArea * 2400
  //   console.log("kottah",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Guntha')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 1089;
  //   this.sqfeet2 = this.builtUpArea * 1089
  //   console.log("kottah",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Hectares')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 107639;
  //   this.sqfeet2 = this.builtUpArea * 107639
  // console.log("kottah",this.sqfeet1);
  // }
  
  // if(this.dimension === 'Rood')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 10890;
  //   this.sqfeet2 = this.builtUpArea * 10890
  // console.log("kottah",this.sqfeet1);
  // }
  
  // if(this.dimension === 'chataks')
  // {
  //   this.sqfeet1 = this.superBuiltUpArea * 45;
  //   this.sqfeet2 = this.builtUpArea * 45
  //   console.log("chataks",this.sqfeet1);
  // }
  
  // if(this.builtUpArea > this.superBuiltUpArea*75/100 && this.prebuiltselect != 3)
  // {
  //   this.builtupareainfo = true;
  // }
  
  // else
  // {
  //    console.log("builtUpArea superBuiltUpArea",this.superBuiltUpArea,this.builtUpArea);  

  //   console.log("check",this.superBuiltUpArea,this.builtUpArea)
  //   localStorage.setItem("Superarea",JSON.stringify(this.sqfeet1));
  //   localStorage.setItem("Builtarea",JSON.stringify(this.sqfeet2));
  //   console.log("ok done ");
  //   this.builtupareainfo = false;
  // }
  // }
  

  propertyvaluedata = 0;
  propertyvalue=0;
  unitrate(e)
  {
    let unitvalue=e.target.value;
    this.propertyvalue = unitvalue * this.localcarpet;
    console.log("row property value",this.propertyvalue);
    this.propertyvaluedata = this.propertyvalue;
    console.log("this.propertyvaluedata",this.propertyvaluedata);

    localStorage.setItem('squareareafeet',unitvalue);
    localStorage.setItem('estimateprice',JSON.stringify(this.propertyvalue));
  }
  
  
  totalpropertyrate:any;
  incometax:any;
  maintcharge(e)
  {
  this.localstoragevalue();
  let maincharge = e.target.value;
  if(maincharge > this.propertyvalue)
  {
   Swal.fire({
     title: "Maintenance Charges",
     text: "Maintenance charges should be less than Property value !!",
     type: "info",
    });
  }
  else{
   this.totalpropertyrate = this.propertyvalue + parseInt(maincharge);
   this.propertyvaluedata = this.totalpropertyrate;
   console.log("this.propertyvaluedata",this.propertyvaluedata);
   localStorage.setItem('estimateprice',JSON.stringify(this.totalpropertyrate));
  }
  
  }

  setp7carperarea:any;

  

  
  taxchange(e)
  {
   this.localstoragevalue();
    this.totalpropertyrate = this.totalpropertyrate + parseInt(this.incometax);
  }
  
  taxgov(e)
  {
    this.incometax = e.target.value;
  console.log("row totalpropertyrate value",this.totalpropertyrate);
  }

  propertyName:any;
  projname(e)
  {
  this.propertyName = e.target.value;
  this.mandatfield = false;
  $('.maplocate-step').prop('disabled',false).css('cursor','pointer');
  localStorage.setItem('projectname',this.propertyName);
  }

  statearray = [];

  togglestate(item) {
     console.log(item);
    if(!this.statearray.includes(item.name))

    this.statearray.push(item.name);
    else this.statearray.splice(this.statearray.indexOf(item.name),1)
    localStorage.setItem('statearr',JSON.stringify(this.statearray));
    console.log("statearr",this.statearray);
  }

  
  cityvalue:any;
  togglecity(e)
  {
  this.cityvalue = e.target.value;
  localStorage.setItem('citys',this.cityvalue);
  }

  districtvalue:any;
  toggledistict(e)
  {
  this.districtvalue = e.target.value;
  localStorage.setItem("district",this.districtvalue);
  }
  
  propertyDescription:any;
  projdesc(e)
  {
   this.propertyDescription = e.target.value;
   localStorage.setItem('projectdesc',this.propertyDescription);
  }

  paddress:any;
  propaddress(e)
  {
  this.paddress = e.target.value;
  localStorage.setItem('address',this.paddress);
  }

  village:any;
  propvillage(e)
  {
    this.village = e.target.value;
    localStorage.setItem('village',this.village);
  }

  professiondata:any;
  setprofessionvalue(e)
  {
    this.professiondata = e.target.value;
    localStorage.setItem('profession',this.professiondata)
  }

  namedatavalue:any;
  setname(e)
  {
    this.namedatavalue = e.target.value;
    localStorage.setItem('name',this.namedatavalue);
  }


  contactdatavalue:any;
  setcontact(e)
  {
    this.contactdatavalue = e.target.value;
    localStorage.setItem('contact',this.contactdatavalue);
  }

emailvalue:any;
  setemail(e)
  {
    this.emailvalue = e.target.value;
    localStorage.setItem('email',this.emailvalue);
  }

  refferaldatavalue:any;
  setrefferal(e)
  {
  this.refferaldatavalue = e.target.value;
  localStorage.setItem('refferal',this.refferaldatavalue);

  }



  ownerdata:any;
  owner(e)
  {
  this.ownerdata = e.target.value;
  localStorage.setItem('ownerdata',this.ownerdata);
  }

  yeardocdata:any;
  yeardoc(e)
  {
   this.yeardocdata = e.target.value;
   localStorage.setItem('yeardocument',this.yeardocdata);
  }

  mincarpetareavalue:any;
  minCarpetArea(e)
  {
this.mincarpetareavalue = e.target.value;
localStorage.setItem('mincarpetarea',this.mincarpetareavalue)
  }

  maxcarpetareavalue:any;
  maxCarpetArea(e)
  {
this.maxcarpetareavalue = e.target.value;
localStorage.setItem('maxcarpetarea',this.maxcarpetareavalue)
  }


  minbuiltareavalue:any;
  minBuiltArea(e)
  {
this.minbuiltareavalue = e.target.value;
localStorage.setItem('minbuiltarea',this.minbuiltareavalue)
  }


  maxbuiltareavalue:any;
  maxbuiltArea(e)
  {
this.maxbuiltareavalue = e.target.value;
localStorage.setItem('maxbuiltarea',this.maxbuiltareavalue)
  }

  minraweavalue:any;
  minrawArea(e)
  {
this.minraweavalue = e.target.value;
localStorage.setItem('minrawarea',this.minraweavalue)
  }

  maxraweavalue:any;
  maxrawArea(e)
  {
this.maxraweavalue = e.target.value;
localStorage.setItem('maxrawarea',this.maxraweavalue)
  }

  
    progresssub(key)
    {
      switch (key) {
        case 'marketback':
        this.progressbarinitstepone -= Math.ceil(this.progressbarstepone); break;
      
        case 'locationback':
        this.progressbarinitsteptwo -= Math.ceil(this.progressbarsteptwo); break;
  
        case 'floortypeback':
        this.progressbarinitstepthree -= Math.ceil(this.progressbarstepthree); break;
  
        case 'parktypeback':
        this.progressbarinitstepfour -= Math.ceil(this.progressbarstepfour); break;
  
        case 'furnishback':
        this.progressbarinitstepfive -= Math.ceil(this.progressbarstepfive); break;
  
        case 'paymentback':
        this.progressbarinitstepseven -= Math.ceil(this.progressbarstepseven); break;

        case 'propertyimageback':
        this.progressbarinitstepsix -= Math.ceil(this.progressbarstepsix); break;
  
        default:
        break;
      }
    
    
    }
  
  movetooltip=0;
    progressplus(key)
    {
  
      switch (key) {
        case 'marketnext':
        this.progressbarinitstepone += Math.ceil(this.progressbarstepone);  break;
  
        case 'locationnext':
        this.progressbarinitsteptwo += Math.ceil(this.progressbarsteptwo);  break;
  
        case 'floortypenext':
        this.progressbarinitstepthree += Math.ceil(this.progressbarstepthree);  break;
        
        case 'parktypenext':
        this.progressbarinitstepfour += Math.ceil(this.progressbarstepfour);  break;
  
        case 'furnishnext':
        this.progressbarinitstepfive += Math.ceil(this.progressbarstepfive);  break;
  
        case 'paymentnext':
        this.progressbarinitstepseven += Math.ceil(this.progressbarstepseven); break;
        
        case 'propertyimagenext':
        this.progressbarinitstepsix += Math.ceil(this.progressbarstepsix); break;
        
        default:
          break;
      }
    }
   
    hidedata()
    {
      $('#overviweformedit').hide();
      $('.market').show();
      $('.stepone').hide();
      $('.steptwo').hide();
      $('.stepthree').hide();
      $('.stepfour').hide();
      $('.stepfive').hide();
      $('.stepsix').hide();
      $('.stepseven').hide();
      $('.prog_tooltip').hide();
      $('.progressone').hide();
      $('.progresstwo').hide();
      $('.progressthree').hide();
      $('.progressfour').hide();
      $('.progressfive').hide();
      $('.progresssix').hide();
      $('.progressseven').hide();
      $('.progresseight').hide();
    }
    
    localmarketname:any;
    localpropertiesforname:any;
    localassetname:any;
    locaalparkingname:any;
    localmarket:any;
    localpropfor=[];
    localprofession:any;
    localasset:any;
    localprebuilt=[];
    localprebuiltname:any;
    flooringtypename:any;
    ceilingtypename:any;
    localutilitiesname:any;
    localcommunityname:any;
    localecofacilityname:any;
    localfurnishstatusname:any;
    localhomewarename:any;
    localkitchenwarename:any;
    localappliancename:any;
    localfuruniturename:any;
    constructionphasename:any;
    finalizeinventoryname:any
    approvaltypename:any;
    locallandmarkname:any;
    localbathroomtypename:any;
    localkitchentypename:any;


   

  overviewnext()
    {
 this.localstoragevalue();
 this.step7section();
  
      if(this.localflooringtype)
      {
        // this.setradiov = this.localflooringtype
          this.flooringtypename = this.localflooringtype.map(x=>x.name);
          console.log("namelist",this.flooringtypename);
      }
  
      if(this.localceilingtype)
      {
        // this.setradiov = this.localflooringtype
          this.ceilingtypename = this.localceilingtype.map(x=>x.name);
          console.log("namelist",this.ceilingtypename);
      }
  
      if(this.localutilities)
      {
        this.localutilitiesname = this.localutilities.map(x=>x.name);
        console.log('localutilities',this.localutilitiesname);
      }
  
      if(this.localcommunity)
      {
        this.localcommunityname = this.localcommunity.map(x=>x.name);
        console.log('localutilities',this.localcommunityname);
      }
  
      if(this.localecofacility)
      {
        this.localecofacilityname = this.localecofacility.map(x=>x.name);
        console.log('localutilities',this.localecofacilityname);
      }
  
  
  if(this.localfurnshingstatus)
  {
   let row = this.furnishing.find(x=>x.id == this.localfurnshingstatus.id)
  
   this.localfurnishstatusname = row.name;
   console.log("this.localmarketname",this.localfurnishstatusname);
  }
  
  if(this.localhomeware)
  {
    this.localhomewarename = this.localhomeware.map(x=>x.name);
    console.log('localhomewarename',this.localhomewarename);
  }
  
  if(this.localkitchenware)
  {
    this.localkitchenwarename = this.localkitchenware.map(x=>x.name);
    console.log('localhomewarename',this.localkitchenwarename);
  }
  
  if(this.localappliance)
  {
    this.localappliancename = this.localappliance.map(x=>x.name);
    console.log('localhomewarename',this.localappliancename);
  }
  
  if(this.localfuruniture)
  {
    this.localfuruniturename = this.localfuruniture.map(x=>x.name);
    console.log('localhomewarename',this.localfuruniturename);
  }

  
  if(this.localdimunit)
  {
    console.log("localdimunit data",this.localdimunit);
  }
  
  
  if(this.localfacing)
  {
    console.log("localfacing",this.localfacing);
  }
  
  if(this.localcarpet)
  {
    console.log("localcarpet",this.localcarpet);
  }
  
  if(this.localkitchen)
  {
    
    console.log('localkitchename',this.localkitchen);
  }
  
  if(this.localbathroom)
  {
    
    console.log('localkitchename',this.localbathroom);
  }
  
  if(this.localbedroom)
  {
    
    console.log('localkitchename',this.localbedroom);
  }

  if(this.localivingroom)
  {
    
    console.log('localkitchename',this.localbedroom);
  }

  if(this.localpoojaroom)
  {
    console.log('localivingroom',this.localpoojaroom);
  }

  if(this.localstudyroom)
  {
    console.log('localivingroom',this.localstudyroom);
  }

  if(this.localservantroom)
  {
    console.log('localivingroom',this.localservantroom);
  }

  if(this.localstoreroom)
  {
    console.log('localstoreroom',this.localstoreroom);
  }
  

  
  if(this.localbalcony)
  {
    console.log("localbalcony",this.localbalcony);
  }

  if(this.localfrontyard)
  {
    console.log('localfrontyard',this.localfrontyard);
  }

  if(this.localbackyard)
  {
    console.log('localbackyard',this.localbackyard);
  }
  
  
      $("#overviweformedit").show();
      $('.overall-progress').hide();
      console.log("show overview form")
    
   }
  

   localrawfacvalue = [];
   localrawfacfield = [];
   localacresarea:any;
   localacres:any;
   localkhata:any;
   localkhasra:any;
   localownerdata:any;
   localyeardoc:any;
   professions:any;
   naname:any;
   nacontact:any;
   narefferal:any;
   localpprofname:any;
   localname:any;
   localcontact:any;
   localreferal:any;
   localemail:any;
   naemail:any;

   localminprice:any;
   localmaxprice:any;
   localmcategory = [];
   localmarketarray = [];
  step1section()
  {

   this.localstoragevalue();
  this.naemail = this.localemail;
   this.professions = this.localpprofname;
   this.naname = this.localname;
   this.nacontact = this.localcontact;
   this.minValue = this.localminprice;
   this.maxValue = this.localmaxprice;
  
   this.naname = this.username;
  if(this.localname)
  {
    this.naname = this.localname;
  }

  this.naemail = this.email;
  if(this.localemail)
  {
    this.naemail = this.localemail;
  }


     
   
   if(this.narefferal) this.narefferal = this.localreferal;

   if(this.localpropfor)
   {
     // this.setradiov = this.localflooringtype
     this.localpropfor.forEach((data,i) => {
       let row = this.propertyfor.find(x=>x.id == data.id)
     let id = this.propertyfor.indexOf(row);
     this.propertyfor[i].isSelected = true;
       $('#'+data.id).parent().parent().addClass('buttoncolor');
     });
     this.setpropertyv = this.localpropfor.map(v=>v.value);
    //  console.log("setradiov",this.flooringapi);
   }


  

   if(this.localmarket)
   {
    let row = this.market.find(x=>x.id == this.localmarket.id);
     let id = this.market.indexOf(row);
     this.market[id].isSelected = true;
       $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
    console.log("this.localmarket",this.localmarket);
    console.log("this.localmarket.value",this.localmarket.value)

    this.localmarketarray = [(this.localmarket.value)];

    this.setradiov = this.localmarket.name;
     $('.market-step').prop('disabled',false).css('cursor','pointer');
     // $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
   }

   if(this.localmcategory)
   {
     // this.setradiov = this.localflooringtype
     this.localmcategory.forEach((data,i) => {
       let row = this.maketcategory.find(x=>x.id == data.id)
     let id = this.maketcategory.indexOf(row);
     this.maketcategory[i].isSelected = true;
       $('#'+data.id).parent().parent().addClass('buttoncolor');
     });
     this.mcategoryapi = this.localpropfor.map(v=>v.value);
   }


   
   if(this.localprebuilt)
   {
     // this.setradiov = this.localflooringtype
     this.localprebuilt.forEach((data,i) => {
       let row = this.residential.find(x=>x.id == data.id)
     let id = this.residential.indexOf(row);
    //  this.residential[i].isSelected = true;

       $('#'+data.id).parent().parent().addClass('buttoncolor');
     });
     this.prebuiltvalueapi = this.localprebuilt.map(v=>v.value);
   }

   if(this.localprebuilt)
   {
     // this.setradiov = this.localflooringtype
     this.localprebuilt.forEach((data,i) => {
       let row = this.commercial.find(x=>x.id == data.id)
     let id = this.commercial.indexOf(row);
    //  this.commercial[i].isSelected = true;

       $('#'+data.id).parent().parent().addClass('buttoncolor');
     });
     this.prebuiltvalueapi = this.localprebuilt.map(v=>v.value);
   }

   if(this.localprebuilt)
   {
     // this.setradiov = this.localflooringtype
     this.localprebuilt.forEach((data,i) => {
       let row = this.industrial.find(x=>x.id == data.id)
     let id = this.industrial.indexOf(row);
    //  this.industrial[i].isSelected = true;

       $('#'+data.id).parent().parent().addClass('buttoncolor');
     });

     this.prebuiltvalueapi = this.localprebuilt.map(v=>v.value);
    }

   if(this.localprebuilt)
   {
     // this.setradiov = this.localflooringtype
     this.localprebuilt.forEach((data,i) => {
       let row = this.agriculture.find(x=>x.id == data.id)
     let id = this.agriculture.indexOf(row);
    //  this.agriculture[i].isSelected = true;

       $('#'+data.id).parent().parent().addClass('buttoncolor');
     });
     this.prebuiltvalueapi = this.localprebuilt.map(v=>v.value);
   }

  } 

    step1()
    {
      this.localstoragevalue();
     this.progressbarinitstepone=0;
    this.step1section();
    $('.overall-progress').hide();
    $('.propertyprofession').show();
    $('.progressone').show();
      }
  
      localpincodedata:any;
      localdimunit:any;
      localsuperarea:any;
      localbuitarea:any;
      localfacing:any;
      localdistrict:any;
      localcarpet:any;
      localbalcony:any;
      localservantroom:any;
      localstoreroom:any;
      localivingroom:any;
      localbasementroom:any;
      localdiningroom:any;
      localpoojaroom:any;
      localstudyroom:any;
      localkitchencountypeapi=[];
      localbathroomcountypeapi=[];

      locallocat1:any;
      locallocat2:any;
      locallocat3:any;
      locallocat4:any;
      locallocat5:any;


      localkitchen:any;
      localkitchentype:any;
      localbathroom=[];
      localbathroomtype:any;;
      localbedroom:any;
      localfrontyard=[];
      localbackyard=[];
      localfacingvalue:any;
      localroomcount = [];
      localroomtype = [];
      localbhkflat=[];
      localfloor:any;
      localprojname:any;

      localminarea:any;
       localmaxarea:any;
       localminbuilt:any;
       localmaxbuilt:any;
       localmincarpet:any;
       localmaxcarpet:any;


      localprojdesc:any;
      localcity:any;
      localstate=[];
      localcountry:any;
      localaddress:any;
     localdescription:any;
     localvillage:any;
     showkitchenvalue:any;
     showbalconyvalue:any;
     showkitchenlength:any;
     showkitchenbredth:any;
     showbathroomvalue:any;
     localbalconyavail:any;
     localfrontbackyardavail:any;
     formatedlocation = []
     step2section()
     {
       console.log('localbuitarea',this.localbuitarea);
       
      this.localstoragevalue();
      this.district = this.localpincodedata.district;
      this.city = this.localcity;
      this.taluk = this.localpincodedata.taluka;
      this.pincode = this.localpincodedata.pinCode;
      this.maplacelocat = this.localmaplocation;
      this.showfloorvalue = this.localfloor
      this.statedatashow = this.localstate;
   
 
     } 


    step2()
    { 
      if(!this.localfirststep && !this.firstformcomplete)
      {
        this.toastr.info("Please Complete First Step",'First Step Incomplete')
      }
      else{
        this.step2section();
      $('.overall-progress').hide();
      $('.maplocate').show();
      $('.progresstwo').show();
      this.progressbarinitsteptwo=0;
      }
    }
  
  
  dimensionarray = [];
   step3section()
   {
    
    if(this.localbuitarea)
    {
     this.builtUpArea = this.localbuitarea;
     this.sqfeet2 = this.localbuitarea;
    } 

    if(this.localroomtype) this.roomtypeapi = this.localroomtype;

    if(this.localroomcount) this.totalroomcountapi = this.localroomcount;

    // console.log('totalroomcountapi',this.totalroomcountapi,this.localroomcount);
    
    if(this.localkitchencountypeapi)
    if(this.localbathroomcountypeapi)
      
    if(this.localdimunit)
    {
     this.showdimvalue = this.localdimunit.name
     this.dimension =  this.localdimunit.name;
    this.dimensionarray.push(this.localdimunit.value);
    }
   
    if(this.locallocat1)
    {

      this.formatedlocation  = [];
      this.locallocat1.forEach(loc => {
        let data = this.nearlocat.find(x=>x.id  == loc.id);
        let index = this.nearlocat.indexOf(data)
        if(index > -1)
        {
          this.nearlocat[index].isSelected = true;
          this.nearlocat[index].nearlocat = loc.nearlocat
          this.nearlocat[index].nearestdis = loc.nearestdis
        }
        console.log('nearlocat',this.nearlocat,index);
        
        this.formatedlocation.push({
         "nearBy": loc.value,
         "nearBySpec": {
           "nearByLocationName": loc.nearlocat,
           "distance": loc.nearestdis
         }
        })
      });

     //  let row = this.nearlocat.find(x=>x.id  = this.locallocat1.id)
     // let id  = this.nearlocat.indexOf(row);
     //  $('#'+this.locallocat1.id).parent().parent().addClass('buttoncolor');
      console.log("this.localmarket.value",this.locallocat1);
    }

   //  var totalnearlocation = [];


     if(this.localbhkflat)
     {
       // this.setradiov = this.localceilingtype
       this.localbhkflat.forEach((data,i) => {
         let row = this.bhk.find(x=>x.id == data.id)
       let id = this.bhk.indexOf(row);
       this.bhk[i].isSelected = true;
         $('#'+data.id).parent().parent().parent().addClass('buttoncolor');
       });
       this.bhkfloorapi = this.localbhkflat.map(v=>v.value);
        console.log("setradiov",this.bhkfloorapi);
 
     }

     if(this.localprojname)
     {
       $('.maplocate-step').prop('disabled',false).css('cursor','pointer');
     }


     if(this.localbedroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localbedroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localbedroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localbedroom.id)
     }

     if(this.localivingroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localivingroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localivingroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localivingroom.id)
     }

     if(this.localstudyroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localstudyroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localstudyroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localstudyroom.id)
     }

     if(this.localpoojaroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localpoojaroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localpoojaroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localpoojaroom.id)
     } 

     if(this.localservantroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localservantroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localservantroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localservantroom.id)
     }

     if(this.localstoreroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localstoreroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localstoreroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localstoreroom.id)
     }

     if(this.localbasementroom)
     {
       let row = this.rooms.find(x=>x.id  = this.localbasementroom.id)
      let id  = this.rooms.indexOf(row);
      this.rooms[id].isSelected = true;
       $('#'+this.localbasementroom.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket.value",this.localbasementroom.id)
     }

     // if(this.localivingroom)
     // {

     // }
     if(this.localkitchen)
     {
       this.showkitchenvalue = this.localkitchen.noOfkitchen;
       this.localkitchen.kitchendimension.forEach((data,i) => {
         this.noofkitchen.push(data)
       });
       console.log("localkitchen",this.showkitchenvalue,this.localkitchen.noOfkitchen);
       console.log("showkitchenlength",this.showkitchenlength,this.showkitchenbredth);
     }

     if(this.localbalcony)
     {
       this.showbalconyvalue = this.localbalcony.noofbalcony;
       this.localbalcony.balconydimension.forEach((data,i) => {
         this.noofbalcony.push(data)
       });
       console.log("localkitchen",this.showbalconyvalue,this.localbalcony.noOfkitchen);
       console.log("showkitchenlength",this.showkitchenlength,this.showkitchenbredth);
     }


     if(this.localbathroom)
     {
       this.showbathroomvalue = this.localbathroom.length

       this.bathroomstylearray = this.localbathroom
     }

     if(this.localkitchentype)
     {
      let row = this.kitchentype.find(x=>x.id == this.localkitchentype.id);
       let id = this.kitchentype.indexOf(row);
       this.kitchentype[id].isSelected = true;
         $('#'+this.localkitchentype.id).parent().parent().addClass('buttoncolor');
      console.log("this.kitchentype",this.localkitchentype);
      console.log("this.kitchentype.value",this.localkitchentype.value);
      
       // $('.market-step').prop('disabled',false).css('cursor','pointer');
     }   
     
     if(this.localfacing)
     {
       // this.setradiov = this.localceilingtype
       this.localfacing.forEach((data,i) => {
         let row = this.facingside.find(x=>x.id == data.id)
       let id = this.facingside.indexOf(row);
       this.facingside[i].isSelected = true;
 
         $('#'+data.id).parent().parent().parent().addClass('buttoncolor');
       });
       this.facingvalueapi = this.localfacing.map(v=>v.value);
        console.log("setradiov",this.facingvalueapi);
 
     }
     
     
     if(this.localbalconyavail)
     {
      let row = this.jbalconyavail.find(x=>x.id == this.localbalconyavail.id);     
      let id = this.jbalconyavail.indexOf(row);
     //  this.jbalconyavail[id].isSelected = true;
      $('#'+this.localbalconyavail.id).parent().parent().addClass('buttoncolor');
         this.balconyavailable = this.localbalconyavail.name;
      // $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
     }

     if(this.localfrontbackyardavail)
     {
      let row = this.jfrontyardavail.find(x=>x.id == this.localfrontbackyardavail.id);     
      let id = this.jfrontyardavail.indexOf(row);
     //  this.jfrontyardavail[id].isSelected = true;
      $('#'+this.localfrontbackyardavail.id).parent().parent().addClass('buttoncolor');
         this.fontbackavailable = this.localfrontbackyardavail.name;
      // $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
     }
   }



    step3()
    {
      if(!this.localsecondstep && !this.twoformcomplete)
      {
        this.toastr.info("Please Complete Previous Step",'Previous Step Incomplete')
      }
      else
      {
        this.step3section();
        this.localstoragevalue();
          $('.overall-progress').hide();
          $('.facing').show();
          $('.progressthree').show();
          this.progressbarinitstepthree=0;
      }
     
    }
  facingvalueapi:any;
    localparkingtype:any;
    localutilities = [];
    localcommunity = [];
    localrawfacility = [];
    localecofacility = [];
    facilitycompleteapi = [];
    loccalparkinginfo:any;
    localparkingnumber:any;
    resparking = { "value":0 }
    sharparking = { "value":0 }
    localecother:any;
    ecotherinput:any;
    localothervalue = [];
    localceilingtype=[];
    localflooringtype=[];
   
   step4section()
   {
     this.localstoragevalue();

     this.ecotherinput = this.localecother;
     
     if(this.loccalparkinginfo)
     {
       this.localparkingnumber =  parseInt(this.loccalparkinginfo[0].parkinginform)
       this.resparking = { "value":0};
       this.sharparking = {"value":0};
       if(this.loccalparkinginfo[0].name == "Reserved Parking")
       {
         this.resparking.value = 1;
       }
       else if(this.loccalparkinginfo[0].name == "Shared Parking")
       {
       this.sharparking.value = 1;
       }
       console.log("res",this.sharparking.value);
       console.log("res",this.resparking.value)    
     console.log('=>',this.loccalparkinginfo);
     } 


     if(this.localflooringtype)
      {
        // this.setradiov = this.localflooringtype
        this.localflooringtype.forEach((data,i) => {
  
          let row = this.flooring.find(x=>x.id == data.id)
        let id = this.flooring.indexOf(row);
        this.flooring[i].isSelected = true;
  
          $('#'+data.id).parent().parent().addClass('buttoncolor');
        });
        this.flooringapi = this.localflooringtype.map(v=>v.value);
  
        $('.floortype-step').prop('disabled',false).css('cursor','pointer');
        console.log("setradiov",this.flooringapi);
        // console.log("setradiov",this.localmarket);
  
        // $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
      }
 
 
     if(this.localceilingtype)
     {
       // this.setradiov = this.localceilingtype
       this.localceilingtype.forEach((data,i) => {
         let row = this.ceiling.find(x=>x.id == data.id)
       let id = this.ceiling.indexOf(row);
       this.ceiling[i].isSelected = true;
 
         $('#'+data.id).parent().parent().addClass('buttoncolor');
       });
       this.ceilingapi = this.localceilingtype.map(v=>v.value);
        console.log("setradiov",this.ceilingapi);
       // console.log("setradiov",this.localmarket);
 
       // $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
     }

     if(this.localparkingtype)
     {
       console.log("this.localparkingtype",typeof this.localparkingtype,this.localparkingtype.id);
      let row = this.parkingavailablity.find(x=>x.id == this.localparkingtype.id);     
      let id = this.parkingavailablity.indexOf(row);
      this.parkingavailablity[id].isSelected = true;
      $('#'+this.localparkingtype.id).parent().parent().addClass('buttoncolor');
         this.parkingavailable = this.localparkingtype.name;
 
      console.log("this.localparkingtype",this.localparkingtype.name,this.localparkingtype,this.localparkingtype.id)
     console.log("this.parkingavailable",this.parkingavailable);
      // $('#'+this.localmarket.id).parent().parent().addClass('buttoncolor');
     }

     if(this.loccalparkinginfo)
     {
       this.loccalparkinginfo.forEach((data,i) => {
         let row = this.parkinginformation.find(x=>x.id == data.id)
         let id = this.parkinginformation.indexOf(row);
         this.parkinginformation[i].isSelected = true;
         $('#'+data.id).parent().parent().addClass('buttoncolor');
         console.log("setradiov",data.id);
       });
     }



 
     if(this.localutilities)
     {
       console.log('localutilities',this.localutilities);
       this.localutilities.forEach((datau,i) => {
         let row = this.utilities.find(x=>x.id == datau.id)
       let id = this.utilities.indexOf(row);
       this.utilities[i].isSelected = true;
         $('#'+datau.id).parent().parent().addClass('buttoncolor');
       });
       this.utilitiesapi = this.localutilities.map(v=>v.value);
 
       $('.ceilingtype-step').prop('disabled',false).css('cursor','pointer');
       console.log("setradiov",this.utilitiesapi);
     }


     if(this.localrawfacility)
     {
       console.log('localutilities',this.localrawfacility);
       this.localrawfacility.forEach((datau,i) => {
         let row = this.rawlandfacility.find(x=>x.id == datau.id)
       let id = this.rawlandfacility.indexOf(row);
       this.rawlandfacility[i].isSelected = true;
         $('#'+datau.id).parent().parent().addClass('buttoncolor');
       });
       this.rawfacilityapi = this.localrawfacility.map(v=>v.value);
        console.log("setradiov",this.localrawfacility);
     }
 
     if(this.localcommunity)
     {
       console.log('localutilities',this.localcommunity);
       this.localcommunity.forEach((data,i) => {
         let row = this.community.find(x=>x.id == data.id)
       let id = this.community.indexOf(row);
       this.community[i].isSelected = true;
 
         $('#'+data.id).parent().parent().addClass('buttoncolor');
       });
       this.communitiesapi = this.localcommunity.map(v=>v.value);
 
       $('.ceilingtype-step').prop('disabled',false).css('cursor','pointer');
       console.log("setradiov",this.communitiesapi);
     }
 
     if(this.localecofacility)
     {
       console.log('localutilities',this.localecofacility);
       this.localecofacility.forEach((data,i) => {
         if(data.name == "Other"){
           this.ecoother = true;
          this.localothervalue.forEach((str,i)=>{
            this.array.push({
              id:i,
              value:str
            })
          })
         }
         let row = this.faciliytytype.find(x=>x.id == data.id)
       let id = this.faciliytytype.indexOf(row);
       this.faciliytytype[i].isSelected = true;
       // if(this.loca)
         $('#'+data.id).parent().parent().addClass('buttoncolor');
       });
       this.facilityapi = this.localecofacility.map(v=>v.value);
 
       $('.facilitytype-step').prop('disabled',false).css('cursor','pointer');
       console.log("setradiov",this.facilityapi);
     }


     this.facilitycompleteapi = this.utilitiesapi.concat(this.communitiesapi).concat(this.facilityapi).concat(this.rawfacilityapi);
     console.log("applianceapi",this.facilitycompleteapi);
   }

    step4()
    {
      if(!this.localthirdstep && !this.threeformcomplete)
      {
        this.toastr.info("Please Complete Previous Step",'Previous Step Incomplete')
      }
      else
      {
    this.step4section();
    this.localstoragevalue();
      $('.overall-progress').hide();
      console.log('step4',this.localmarket);
      
      if(this.localmarket.name == "RAW" || this.rawlandapi)
      {
         $('.rawfacility').show();
      }
      else $('.floortype').show();
      $('.progressfour').show();
      this.progressbarinitstepfour=0;
    }
  }
  
    localfurnshingstatus:any;
    localhomeware = [];
    localkitchenware = [];
    localappliance = [];
    localfuruniture = [];
    appliancecompletedapi = [];
    appliancecompletedapicount = [];
    furnishingarray = [];
   step5section()
   {
     if(this.localfurnshingstatus)
     {
      let row = this.furnishing.find(x=>x.id == this.localfurnshingstatus.id)
       let id = this.furnishing.indexOf(row);
       this.furnishing[id].isSelected = true;
         $('#'+this.localfurnshingstatus.id).parent().parent().addClass('buttoncolor');
      console.log("this.localmarket",this.localfurnshingstatus);
    this.furnishingarray.push(this.localfurnshingstatus.value)
      this.setfurnishvalue = this.localfurnshingstatus.name;
       $('.furnishstatus-step').prop('disabled',false).css('cursor','pointer');
     }
 
     if(this.localhomeware)
     {
       console.log('localutilities',this.localhomeware, this.homewares);
 
       this.localhomeware.forEach((datah,i) => {
       let row = this.homewares.find(x=>x.id == datah.id)
 
       let id = this.homewares.indexOf(row);
       this.homewares[id].isSelected = true;
       this.homewares[id].count = datah.count;
        $('#'+datah.id).parent().parent().addClass('buttoncolor');
       });
       this.tooglehomeapi = this.localhomeware.map(v=>v.value);
       this.homewarecountapi = this.localhomeware.map(v=>v.count);
       console.log("tooglehomeapi",this.tooglehomeapi);
       console.log("homewarecountapi",this.homewarecountapi);
      
       //  this.homewares = this.localhomeware.map(v=>v.value);
     
       $('.facilitytype-step').prop('disabled',false).css('cursor','pointer');
     }
      
     
     if(this.localkitchenware)
     {
       console.log('localutilities',this.localkitchenware);
       this.localkitchenware.forEach((datak,i) => {
         let row = this.kitchenware.find(x=>x.id == datak.id)
       let id = this.kitchenware.indexOf(row);
       this.kitchenware[i].isSelected = true;
       this.kitchenware[id].count = datak.count;
         $('#'+datak.id).parent().parent().addClass('buttoncolor');
         console.log("check localappliance row",row,datak.id);
       });
       this.kitchnwareapi = this.localkitchenware.map(v=>v.value);
       this.kitchenwarecountapi = this.localkitchenware.map(v=>v.count);
       console.log("check",this.kitchnwareapi,this.kitchenwarecountapi);

       $('.facilitytype-step').prop('disabled',false).css('cursor','pointer');
       console.log("setradiov",this.kitchenware);
     }
 
     if(this.localappliance)
     {
       console.log('localutilities',this.localappliance);
       this.localappliance.forEach((data,i) => {
 
       let row = this.appliance.find(x=>x.id == data.id)
       let id = this.appliance.indexOf(row);
       this.appliance[i].isSelected = true;
       this.appliance[id].count = data.count;
         $('#'+data.id).parent().parent().addClass('buttoncolor');
         console.log("check localappliance row",row,data.id);
       });
       
       this.applianceapi = this.localappliance.map(v=>v.value);
       this.appliancecountapi = this.localappliance.map(v=>v.count);
       console.log("check",this.appliancecountapi,this.applianceapi);

       $('.facilitytype-step').prop('disabled',false).css('cursor','pointer');
       console.log("setradiov",this.appliance);
     }
 
 
     if(this.localfuruniture)
     {
       console.log('localutilities',this.localfuruniture);
       this.localfuruniture.forEach((data,i) => {
 
         let row = this.furniture.find(x=>x.id == data.id)
       let id = this.furniture.indexOf(row);
       this.furniture[i].isSelected = true;
       this.furniture[id].count = data.count;
         $('#'+data.id).parent().parent().addClass('buttoncolor');
         console.log("check localappliance row",row,data.id);
       });
       this.furnitureapi = this.localfuruniture.map(v=>v.value);
       this.furniturecountapi = this.localfuruniture.map(v=>v.count);
        console.log("furnitureapi",this.furnitureapi,this.furniturecountapi);

       $('.facilitytype-step').prop('disabled',false).css('cursor','pointer');
      //  console.log("setradiov",this.kitchenware);
     }

     this.appliancecompletedapi = this.tooglehomeapi.concat(this.kitchnwareapi).concat(this.kitchnwarefullyapi).concat(this.applianceapi);
     this.appliancecompletedapicount = this.homewarecountapi.concat(this.kitchenwarecountapi).concat(this.kitchenfullywarecountapi).concat(this.appliancecountapi)
     
     console.log("appliancecompletedapi",this.appliancecompletedapi);
     console.log("appliancecompletedapi",this.appliancecompletedapicount);
   }

    step5()
    {
      if(!this.localfourstep && !this.fourformcomplete)
      {
        this.toastr.info("Please Complete Previous Step",'Previous Step Incomplete')
      }
      else
      {
      this.step5section();
      $('.overall-progress').hide();
      $('.furnishstatus').show();
      $('.progressfive').show();
      this.progressbarinitstepfive=0;    
    }
  }
  

    localconstruction:any;
    localfinalizeinventory:any;
    localapprovaltype:any;
    localestimated:any;
    localexpected:any;
    squareareafeet:any;
    unitrateperfeet:any;
    expectprice:any;
    otherappinput:any;
   
    step7section()
    {
      console.log("==>",this.otherapproval,this.otherappinput);
     this.progressbarinitstepseven=0;
     this.otherappinput = this.otherapproval;

     if(this.localconstruction)
     {
       let row = this.payconstructionphase.find(x=>x.id == this.localconstruction.id)
       let id = this.payconstructionphase.indexOf(row);
       this.payconstructionphase[id].isSelected = true;
       $('#'+this.localconstruction.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket",this.localconstruction,this.localconstruction.value);
       $('.payconstruct-step').prop('disabled',false).css('cursor','pointer');
     }
   
     if(this.localfinalizeinventory)
     {
       let row = this.payfinalize.find(x=>x.id == this.localfinalizeinventory.id)
       let id = this.payfinalize.indexOf(row);
       this.payfinalize[id].isSelected = true;
       $('#'+this.localfinalizeinventory.id).parent().parent().addClass('buttoncolor');
       console.log("this.localmarket",this.localfinalizeinventory,this.localfinalizeinventory.value);
       $('.payinventory-step').prop('disabled',false).css('cursor','pointer');
     }
   
     if(this.localapprovaltype)
     {
       console.log('localutilities',this.localapprovaltype, this.homewares);
       this.localapprovaltype.forEach((datah,i) => {
       let row = this.payapproval.find(x=>x.id == datah.id)
       if(row.name == "Other"){
             this.approvalother = true;
           }
       let id = this.payapproval.indexOf(row);
    
        $('#'+datah.id).parent().parent().addClass('buttoncolor');
       });
       console.log("tooglehomeapi",this.tooglehomeapi);
       console.log("homewarecountapi",this.homewarecountapi);
      
        this.payapprovalapi = this.localapprovaltype.map(v=>v.value);
     }
     
    }
  
    step7()
    {
      if(!this.localfourstep && !this.fourformcomplete)
      {
        this.toastr.info("Please Complete Previous Step",'Previous Step Incomplete')
      }
      else
      {
     this.step7section();
     this.localstoragevalue();
      $('.overall-progress').hide();
      $('.payconstruct').show();
      $('.progressseven').show();
    }
  }
  
    stepedit1(){
      $('#overviweformedit').hide();
      $('.market').show();
    }
    stepedit2(){
      $('#overviweformedit').hide();
      $('.maplocate').show();
    }
    stepedit3(){
      $('#overviweformedit').hide();
      $('.floortype').show();
    }

    landmarkedit(){
     $('.landmark_update').hide();
     $('.landmark_edit').show();
   }

   landmarkupdate(){
     $('.landmark_edit').hide();
     $('.landmark_update').show();
   }

    stepedit4(){
      $('#overviweformedit').hide();
      $('.parktype').show();
    }
    stepedit5(){
      $('#overviweformedit').hide();
      $('.furnishstatus').show();
    }
    stepedit6(){
      $('#overviweformedit').hide();
      $('.propertygallery').show();
    }
  
    stepedit7(){
      $('#overviweformedit').hide();
      $('.payconstruct').show();
    }
  
  
    overviewback()
    {
      $("#overviweformedit").hide();
      $('.overall-progress').show();
    }
  
    propforback()
    { 
      console.log("market");
      $('.propertyforused').hide();
      $('.propertypricerange').show();
      
    } 
  
    marketback()
    { 
     console.log("market");
      $('.market').hide();
      $('.marketcategory').show();
      this.progresssub('marketback');
    }     

      assetback()
      {
        this.step1section();
        console.log("asset");
        $('.asset').hide();
        $('.market').show();
       this.progresssub('marketback');
      }


    propfornext()
    {
      console.log("===>",this.facingvalue,this.localfacing);
      this.localstoragevalue();
      if(this.localpropfor)
      {
        $('.propertyforused').hide();
        $('.marketcategory').show();
        this.progressplus('marketnext');
      }
      else if(!this.setpropertyv)
      {
        this.toastr.info('Please select field !!','Missing Field');
      }
      else{
      $('.propertyforused').hide();
      $('.marketcategory').show();
      this.progressplus('marketnext');
      }

    }

    marketcatback()
    {
      $('.marketcategory').hide();
      $('.propertyforused').show();
      this.progresssub('marketback');
    }

    marketcatnext()
    {
      $('.marketcategory').hide();
      $('.market').show();
      this.progressplus('marketnext');
    }

    profesfornext()
    {

      console.log('data',this.professiondata,this.namedatavalue,this.contactdatavalue,this.emailvalue)
     console.log('data',this.localprofession);
     
      if(this.localpprofname)
      {
        $('.propertyprofession').hide();
      $('.propertypricerange').show();
      this.progressplus('marketnext');
      }
     else if(!this.professiondata || !this.contactdatavalue)
      {
        this.toastr.info("Input Missing Field",'Please Input Field');
      }
    else{
      $('.propertyprofession').hide();
      $('.propertypricerange').show();
      this.progressplus('marketnext');
    }
      
    }

    pricefornext()
    {
      $('.propertypricerange').hide();
      $('.propertyforused').show();
      this.progressplus('marketnext');
    }
      
    profesforback()
    {
      $('.propertyprofession').hide();
      $('.overall-progress').show();
      this.progresssub('marketback');
      $('.progressone').hide();
    }

    priceforback()
    { 
    $('.propertypricerange').hide();
    $('.propertyprofession').show();
    this.progresssub('marketback');

    }
    
    
      marketnext()
      {
    console.log("====>",this.setradiov);
    if(this.localmarket)
    {
     $('.market').hide();
     if(this.setradiov == 'Residential') $('.prebuiltresidential').show();
     else if(this.setradiov == 'Commercial') $('.prebuiltcommercial').show();
     else if(this.setradiov == 'Industrial') $('.prebuiltindustrial').show();
     else if(this.setradiov == 'Agriculture') $('.prebuiltagriculture').show();
     else if(this.setradiov == 'RAW') $('.overall-progress').show();
      console.log("asset");
      this.progressplus('marketnext');
    }
   else if(!this.setradiov)
   {
    Swal.fire({
      title: "Missing Field",
      text: "Please select field !!",
      type: "info",
     });
   }
   else{
     $('.market').hide();
       if(this.setradiov == 'Residential') $('.prebuiltresidential').show();
       else if(this.setradiov == 'Commercial') $('.prebuiltcommercial').show();
       else if(this.setradiov == 'Industrial') $('.prebuiltindustrial').show();
       else if(this.setradiov == 'Agriculture') $('.prebuiltagriculture').show();
       else if(this.setradiov == 'RAW') $('.overall-progress').show();
        console.log("asset");
        this.progressplus('marketnext');
      }
     }
     
    
      prebuiltback()
      {
        console.log("prebuiltback")
        if(this.setradiov == 'Residential') $('.prebuiltresidential').hide();
        else if(this.setradiov == 'Commercial') $('.prebuiltcommercial').hide();
        else if(this.setradiov == 'Industrial') $('.prebuiltindustrial').hide();
        else if(this.setradiov == 'Agriculture') $('.prebuiltagriculture').hide();
        $('.market').show();
        this.progresssub('marketback');
      }
    
  
      // prebuiltlocalvalue:any;

      prebuiltnext()
      {
        this.localstoragevalue();
      if(this.localprebuilt)
      {
        // this.prebuiltlocalvalue = this.localprebuilt.find(x=>x.name == "Flat")
        // console.log('prebuiltlocalvalue',this.prebuiltlocalvalue);

      }

        console.log("maplocate show")
        if(this.setradiov == 'Residential')  $('.prebuiltresidential').hide();
        else if(this.setradiov == 'Commercial') $('.prebuiltcommercial').hide();
        else if(this.setradiov == 'Industrial') $('.prebuiltindustrial').hide();
        else if(this.setradiov == 'Agriculture') $('.prebuiltagriculture').hide();
        $('.overall-progress').show();
        this.progressplus('marketnext');
        $('.progressone').hide();
        
      }
    
      locationback()
      {
        console.log("maplocate show")
        $('.overall-progress').show();
        $('.maplocate').hide();
        this.progresssub('locationback');
        $('.progresstwo').hide();
        $(window).scrollTop({scrollTop:0}, 5000);
      }
  
      locationnext()
      {    
        console.log("this.prebuiltselect",typeof this.prebuiltselect);
     //  console.log("==>",this.propertyName.length,this.cityvalue, this.paddress, this.propertyDescription )

    if(this.localcity)
     {
       $('.maplocate').hide();
         $('.overall-progress').show();
       $(window).scrollTop({scrollTop:0}, 5000);
     }


     else if(!this.cityvalue)
     { 
      console.log("check",this.cityvalue,this.districtvalue);
      this.toastr.info("Input Missing Field",'Please Input Field');
     }
        
    else{
      console.log('twoformcomplete');
    $('.overall-progress').show();
    $('.maplocate').hide();
    this.twoformcomplete = true;
    localStorage.setItem('secondstep','true');
    $(window).scrollTop({scrollTop:0}, 5000);
    this.localstoragevalue();
    } 
       
       
      }
  
   
      floorback()
      {
        $('.propertyfloork').hide();
        $('.overall-progress').show();
       //  this.progresssub('locationback');
      }
  
      floornext()
      {
     console.log("====>",this.floorapi);
       
     if(this.localfloor)
     {
       $('.propertyfloork').hide();
       $('.bhkfloor').show();
     }
    else if(!this.floorapi)
     {
      Swal.fire({
        title: "Missing Field",
        text: "Please select field !!",
        type: "info",
       });
     }
     else{
      console.log("===>",this.floorapi);
          $('.propertyfloork').hide();
          $('.bhkfloor').show();
     }
      }
  
  
      bhkfloorback()
      {
        $('.bhkfloor').hide();
        $('.propertyfloork').show();
       //  this.progresssub('locationback');
      }
  
  
      bhkfloornext()
      {
       if(this.localbhkflat)
       {
         $('.bhkfloor').hide();
         $('.landmark').show();
       }
       else if(!this.bhkfloorapi)
        {
         Swal.fire({
           title: "Missing Field",
           text: "Please select field !!",
           type: "info",
          });
        }
        else{
         console.log("===>",this.bhkfloorapi);
         $('.bhkfloor').hide();
         $('.landmark').show();
        }
      
       //  this.progressplus('locationnext');
      }
  
      landmarkback()
      {
        if(this.prebuiltvalue == "Flat") $('.bhkfloor').show();
        else  $('.facing').show();
        $('.landmark').hide();
        this.progresssub('locationback');
      }
  
      landmarknext()
      {

        if(this.locallocat1)
        {
         $('.landmark').hide();
         $('.area').show();
         this.progressplus('locationnext');
        }
      else if(!this.nearlocat.length)
       {
        Swal.fire({
          title: "Missing Field",
          text: "Please select field !!",
          type: "info",
         });
       }
       else{
        $('.landmark').hide();
        $('.area').show();
        this.progressplus('locationnext');
       }
       
      }
    
      areaback()
      {
        $('.landmark').show();
        $('.area').hide();
        this.progresssub('locationback');
      }
    
    
      areanext()
      {
   this.localstoragevalue();
       if(this.localdimunit)
        {
         $('.area').hide();
        $('.dimension').show();
        this.progressplus('locationnext');
        }
       else if(!this.dimension)
       {
        Swal.fire({
          title: "Missing Field",
          text: "Please select field !!",
          type: "info",
         });
       }
       else{
        console.log("===>",this.dimension);
        $('.area').hide();
        $('.dimension').show();
        this.progressplus('locationnext');
       }
     this.localstoragevalue();
      
      }
    
    
      dimensionback()
      {
        $('.area').show();
        $('.dimension').hide();
        this.progresssub('locationback');
      }
    
   
    
      facingback()
      {
        $('.facing').hide();
        $('.overall-progress').show();
        this.progresssub('locationback');
      }


       facingnext()
       {    
         this.localstoragevalue();
         console.log("this.prebuiltselect",typeof this.prebuiltselect);      
      if(this.localprebuilt && this.localprebuilt.find(x=>x.name == "Flat")) 
      { 
         $('.facing').hide();
            $('.propertyfloork').show();
            this.progressplus('locationnext');
          $(window).scrollTop({scrollTop:0}, 5000);

      }       
      else if(this.prebuiltvalue == "Flat") 
             {
            $('.propertyfloork').show();
            $('.facing').hide();
        this.progressplus('locationnext');
        $(window).scrollTop({scrollTop:0}, 5000);
             }
         
         else{
         $('.landmark').show();
         $('.facing').hide();
        this.progressplus('locationnext');
        $(window).scrollTop({scrollTop:0}, 5000);
        } 
         
       }







      roomback()
      {
        $('.rooms').hide();
        $('.dimension').show();
        this.progresssub('locationback');
      }
    
    
      totalroomcountapi = []
      roomnext()
      {
       $(window).scrollTop({scrollTop:0}, 5000);
       if(this.localroomcount)
       {
         this.totalroomcountapi.concat(this.bedroomcountapi.concat(this.livingroomcountapi.concat(this.studyroomcountapi.concat(this.Diningroomcountapi.concat(this.Poojaroomcountapi.concat(this.Servantroomcountapi.concat(this.Storeroomcountapi.concat(this.basementroomcountapi))))))));
       }
       else
       {
       this.totalroomcountapi = this.bedroomcountapi.concat(this.livingroomcountapi).concat(this.studyroomcountapi).concat(this.Diningroomcountapi).concat(this.Poojaroomcountapi).concat(this.Servantroomcountapi).concat(this.Storeroomcountapi).concat(this.basementroomcountapi)
       }
       console.log("totalroomcountapi",this.totalroomcountapi);
       localStorage.setItem('roomcount',JSON.stringify(this.totalroomcountapi));
       console.log("===>",this.roomsData,this.bedroomdimension);
       $('.rooms').hide();
       $('.kitchenvalue').show();
       this.progressplus('locationnext');       
      }
    
      kitchenvalueback()
      {
        $('.kitchenvalue').hide();
        $('.rooms').show();
        this.progresssub('locationback');
      }
    
    
      kitchentypeback()
      {
        $('.kitchenvalue').show();
        $('.kitchentype').hide();
        this.progresssub('locationback');
      }
    
      kitchentypenext()
      {
      if(this.localkitchentype)
       {
         $('.kitchentype').hide();
         $('.bathroom').show();
         this.progressplus('locationnext');
       }
      else if(!this.kitchentypeevalue)
      {
       Swal.fire({
         title: "Missing Field",
         text: "Please select field !!",
         type: "info",
        });
      }
      else{
       $('.kitchentype').hide();
        $('.bathroom').show();
        this.progressplus('locationnext');
     }
   }
    
      bathroomback()
      {
        $('.bathroom').hide();
        $('.kitchentype').show();
        this.progresssub('locationback');
      }
    
    
      
      bathroomtypeback()
      {
        $('.bathroomtype').hide();
        $('.bathroom').show();
        this.progresssub('locationback');
      }
      
      bathroomtypenext()
      {
       if(this.localbathroomtype)
       {
         $('.bathroomtype').hide();
         $('.balconyavail').show();
         this.progressplus('locationnext');
       }
      else if(!this.bathroomtypeapi)
      {
       Swal.fire({
         title: "Missing Field",
         text: "Please select field !!",
         type: "info",
        });
      }
      else{
       $('.bathroomtype').hide();
       $('.balconyavail').show();
       this.progressplus('locationnext');
     }
       
      }


      frontbackavailback()
      {
       $('.balcony').show();
       $('.frontbackyardavail').hide();
       this.progresssub('locationback');
      }
    

      frontbackavailnext()
      {
        $('.frontbackyardavail').hide();
        if(this.fontbackavailable === 'YES') $('.frontyardlawn').show();
        else{
         $('.overall-progress').show();
         this.progressplus('locationnext');
         $('.progresstwo').hide();
        }
      }
  
      balconyavailnext()
      {
        console.log(this.balconyavailable);
        $('.balconyavail').hide();
        if(this.balconyavailable === 'YES') $('.balcony').show();
        else if(this.localprebuilt.find(x=>x.name == "Flat") || this.prebuiltvalue == "Flat")
        { 
          $('.frontbackyardavail').show();
        this.progressplus('locationnext'); 
        }
        else{
         $('.overall-progress').show();
         this.progressplus('locationnext');
         $('.progresstwo').hide();
        }
      }

      balconyavailback()
      {
       $('.bathroom').show();
       $('.balconyavail').hide();
       this.progresssub('locationback');

      }
  
      balconyback()
      {
        $('.balconyavail').show();
        $('.balcony').hide();
        this.progresssub('locationback');
      }
  
    
      parktypeback()
      {
        $('.progressfour').hide();
        $('.parktype').hide();
        $('.overall-progress').show();
        this.progresssub('parktypeback');
      }
    
    parktypenext()
      {
        // $('.progressfour').hide();
        $('.parktype').hide();
        if(this.parkingavailable === 'YES') $('.parkingformation').show();
       else  $('.utilities').show();
        this.progressplus('parktypenext');
      }
  
  
      floortypeback()
      {
        $('.progressfour').hide();
        $('.overall-progress').show();
        $('.floortype').hide();
        $('.progressthree').hide();
        this.progresssub('parktypeback');
      }
    
      floortypenext()
      {
        // $('.progresstwo').hide();
        $('.floortype').hide();
        $('.ceilingtype').show();
        this.progressplus('parktypenext');
      }
    
      ceiltypeback()
      {
        $('.ceilingtype').hide();
        $('.floortype').show();
        this.progresssub('parktypeback');
      }
    
      ceiltypenext()
      {
        $('.ceilingtype').hide();
        $('.parktype').show();
        this.progressplus('parktypenext');
      }

      rawfacilitynext()
      {



        $('.rawfacility').hide();
        $('.overall-progress').show();
      }

      rawfacilityback()
      {
        $('.rawfacility').hide();
        $('.overall-progress').show();
      }
    
      parkoptionnext()
      {
        $('.parkingformation').hide();
        $('.utilities').show();
      }
  
  
      utilitiestypeback()
      {
        console.log("utilitiestypeback");
        $('.utilities').hide();
        $('.parktype').show();
        this.progresssub('parktypeback');
      }
  
      utilitiestypenext()
    {
      $('.utilities').hide();
      $('.commtype').show();
      this.progressplus('parktypenext');
    }
  
  
     
      commtypeback()
      {
        $('.commtype').hide();
        $('.utilities').show();
        this.progresssub('parktypeback');
    
      }
      commtypenext()
      {
        $('.commtype').hide();
        $('.facilitytype').show();
        this.progressplus('parktypenext');
      }
    
      facilitytypeback()
      {
        $('.facilitytype').hide();
        $('.commtype').show();
        this.progresssub('parktypeback');
      }
    
     
    
      furnishback()
      {
        $('.furnishstatus').hide();
        $('.overall-progress').show();
        this.progresssub('parktypeback');
        $('.progressfive').hide();
      }
    
      furnishnext()
      {
        if(this.setfurnishvalue == 'Unfurnished')
        {
          $('.overall-progress').show();
          $('.progressfive').hide();
        }
       else if(this.setfurnishvalue == 'Raw') $('.constructionphase').show();
        else  $('.homewares').show();
        $('.furnishstatus').hide();
        this.progressplus('furnishnext');
      }
  
  
      constructionnext()
      {
        $('.constructionphase').hide();
        $('.overall-progress').show();
        $('.progressfive').hide();
      }
    
      homeback()
      {
        $('.furnishstatus').show();
        $('.homewares').hide();
        this.progresssub('furnishback');
      }
      homenext()
      {
        
        if(this.setfurnishvalue == 'Fully Furnished')$('.fullfurnishkitchen').show();
        else  $('.kitchen').show();
        $('.homewares').hide();
        this.progressplus('furnishnext');
      }
    
      kitchenback()
      {
        if(this.setfurnishvalue == 'Fully Furnished')$('.fullfurnishkitchen').hide();
        else  $('.kitchen').hide();
        $('.homewares').show();
        this.progresssub('furnishback');
      }
  
      kitchennext()
      {
        if(this.setfurnishvalue == 'Fully Furnished')$('.fullfurnishkitchen').hide();
        else  $('.kitchen').hide();
        $('.appliance').show();
        this.progressplus('furnishnext');
      }
    
      facilitytypenext()
      {
         var flag1 = true;
        if( this.ecoother == true)
        {
          this.otherfacilitiesdata = this.array.map(x=>x.value);
          console.log('ecother',this.otherfacilitiesdata);
          localStorage.setItem('othervalue',JSON.stringify(this.otherfacilitiesdata));
          this.array.forEach((v)=>{
            if(v.value == ""){
              flag1 = false;
             this.toastr.info("Please Fill Input text","Mandatory Field");
            }
          })
         // this.pushData();
        }
     if(flag1){
       $('.progressfour').hide();
             $('.facilitytype').hide();
             $('.overall-progress').show();
             this.progressplus('parktypenext');
     }
           
      }

      applianceback()
      {
        $('.kitchen').show();
        $('.appliance').hide();
        this.progresssub('furnishback');
      }
     
      furniturehomeback()
      {
      $('.appliance').show();
      $('.furniturehome').hide();
      this.progresssub('furnishback');
      }
    
      furniturehomenext()
      {
        $('.furniturehome').hide();
        $('.overall-progress').show();
        this.progressplus('furnishnext');
        $('.progressfive').hide();
      }
  
  
      propertyuploadback()
      {
        $('.propertygallery').hide();
        $('.overall-progress').show();
        $('.progresssix').hide();
        this.progresssub('propertyimageback');
      }


      payconstructback()
      {
        $('.payconstruct').hide();
        $('.overall-progress').show();
        $('.progressseven').hide();
        this.progresssub('paymentback');
      }
  
      payconstructnext()
      {

       if(this.localconstruction)
       {
         $('.payconstruct').hide();
         $('.payinventory').show();
         this.progressplus('paymentnext');
       }
      else if(!this.payconstructionvalue)
      {
       Swal.fire({
         title: "Missing Field",
         text: "Please select field !!",
         type: "info",
        });
      }
      else{
       $('.payconstruct').hide();
       $('.payinventory').show();
       this.progressplus('paymentnext');
      }
    }
  
      payinventoryback()
      {
        $('.payconstruct').show();
        $('.payinventory').hide();
        this.progresssub('paymentback');
      }
   
      payinventorynext()
      {
        $('.payinventory').hide();
        $('.payapproval').show();
        this.progressplus('paymentnext');
      }
  
      payapprovalback()
      {
        $('.payinventory').show();
        $('.payapproval').hide();
        this.progresssub('paymentback');
      }
  
      carpetarea(e)
      {
        this.setp7carperarea = e.target.value
       localStorage.setItem('carpetarea',JSON.stringify(this.setp7carperarea));
        console.log(e.target.value);
      }

      payapprovalnext()
      {
        this.localstoragevalue();
       if(this.payapprovalvalue == "Other" && !this.otherappinput)
       {
           this.toastr.info("Input Field is Mandatory","Field is Mandatory")
       }
      else if(this.localfirststep

         )
        {
          this.parkingvalueonnext();
        } 

        else if(
          this.firstformcomplete 
          )
          {    
           this.parkingvalueonnext();
          }
          else
          {
            console.log("check six",this.localsixstep);
            console.log("this.sixformcomplete===>");
            Swal.fire({
              title: "Missing Steps",
              text: "Please complete all other steps !!",
              type: "info",
             }).then(()=>
             {
                $('.progressseven').hide();
                $('.payapproval').hide();
                $('.overall-progress').show();
             })
          }       
      }
      

   parkingvalueonnext()
   {
   
     this.overviewnext();
     $('.payapproval').hide();
      localStorage.setItem('sevenstep','true');
      this.sevenformcomplete = true;
      $('#overviweformedit').show();
      this.progressplus('paymentnext');
      $('.progressseven').hide();
      // this.resOverviewShow();
   } 

      resOverviewShow()
      {
        window.location.href="/sell-property#resoverview";
      }


     
  
      // landowner_testing
   nearbyvalue:any;
   cityarray = [];
   districtarray = [];
   villagearray = [];
  rmeuploadProperty()
  {
    this.cityarray = [];
    this.districtarray = [];
    this.spinner = true;
   this.localstoragevalue();

   this.step1section();this.step2section(); this.step3section(); this.step4section(); this.step5section();
   this.step7section(); 

   if(this.localkitchen)
   {
     this.localkitchen.kitchendimension.forEach((dm,i) => {
     this.localkitchen.kitchendimension[i].kitchencategory = this.localkitchentype.value;
    });
   }

   if(this.localcity)
   {
   this.cityarray.push(this.localcity)
   }

   if(this.localdistrict)
   {
     this.districtarray.push(this.localdistrict)
   }

   if(this.localvillage)
   {
     this.villagearray.push(this.localvillage)
   }



   console.log("this.prebuiltflat",this.prebuiltflat);
   
    let body = {
      "uuid":this.uuid ? this.uuid : "",
      "userName":this.localname,
      "contactNo":this.localcontact,
      "profession": this.localpprofname,
      "email":this.localemail,
      "referralCode":this.localreferal ? this.localreferal : "",
      "saleType" : this.setpropertyv,

      "assetType":this.localmarketarray.length ? this.localmarketarray : undefined,
      "assetCategory": this.prebuiltvalueapi,
      "marketPlace":this.mcategoryapi,
      "furnishing":this.furnishingarray,
      "propertyDescription":this.localdescription,
      "furniture":{
        "furnitureType":this.furnitureapi,
        "furnitureCount":this.furniturecountapi
      },
     "lawnType": [],
     "roomType":{
        "roomType":this.localroomtype,
        "roomCount":this.localroomcount
      },
      "homeAppliances":{
        "applianceType":this.appliancecompletedapi,
        "applianceCount":this.appliancecompletedapicount
      },
      "facing" :this.facingvalueapi,
      
        "areaUnit":this.dimensionarray,

          "minCarpetArea": this.localmincarpet,
          "maxCarpetArea": this.localmaxcarpet ,
          "minBuiltUpArea":this.localminarea ? this.localminarea : this.localminbuilt,
          "maxBuiltUpArea":this.localmaxarea ? this.localmaxarea : this.localmaxbuilt,
          "minPrice":this.localminprice,
          "maxPrice": this.localmaxprice,

      parking:{
       isReserved:this.resparking.value,
       count: this.localparkingnumber,
       isShared:this.sharparking.value
        },

        "ceilingAndFlooring":{
         "cealing":this.ceilingapi,
         "flooring":this.flooringapi 
        },

      "floor": this.localfloor,
      "bhk": this.bhkfloorapi,
      
      "bedrooms":this.localbedroom ? this.localbedroom.roomdimension : undefined,
      "livingroom":this.localivingroom ? this.localivingroom.livingroomdimension : undefined,
      "studyroom":this.localstudyroom ? this.localstudyroom.studyroomdimension : undefined,
      "poojaroom":this.localpoojaroom ? this.localpoojaroom.poojaroomdimension : undefined,
      "diningroom":this.localdiningroom ? this.localdiningroom.diningroomdimension : undefined,
      "serventroom":this.localservantroom ? this.localservantroom.servantroomdimension : undefined,
      "storeroom":this.localstoreroom ? this.localstoreroom.storeroomdimension : undefined,
      "backyard":this.localbackyard,
      "frontyard":this.localfrontyard,

      "balcony":this.localbalcony.balconydimension,
      
      "facilities":this.facilitycompleteapi,

      "otherfacility":this.ecoother ? this.localothervalue : undefined,

    "bathrooms":this.localbathroom,
  
      "kitchen":  this.localkitchen.kitchendimension,
  
        "country":'India',
        "state": this.localstate,
        "city": this.cityarray,
        "district": this.districtarray,
        "village":this.villagearray,
        "addressLineOne":this.localaddress,
     
      "nearby":this.formatedlocation,
     
          "finalizeInv": this.localfinalizeinventory.value,
          "constructionPhase": this.localconstruction.value ,
          "approval" : this.payapprovalapi,
          "otherApprovalType": this.approvalother ? this.otherapproval:undefined,        
    }
  
    console.log("body",body);
    this.apiservice.postNeeAanalysis(body)
   //  this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/product/prebuilt',body,httpOptions)
    .subscribe((data:any)=>
    {
     if(data.exception == "FATAL_EXCEPTION")
     {
       this.spinner = false;
       Swal.fire({
         title: "info",
         text: "Your Property has not been Uploaded Try Again !!",
         type: "info",
         allowEscapeKey: false,
         allowOutsideClick: false,
         })
         .then(() => {
           this.localStorageClear();
           if(this.router.url === '/sell-property#resoverview')
           {
             this.router.navigate(['/sell-property']);
             console.log("this.router.url",this.router.url);
             $('#overviweformedit').hide();
             $('.overall-progress').show();
             window.location.reload();
           }
          
        })     
     }
     else if(data.successCode == "API_SUCCESS" && data.statusCode == 200)
     {
       console.log("data",data);
       this.spinner = false;
       Swal.fire({
        title: "Success",
        text: "Your Need Analysis Has Been Recorded.",
        type: "success",
        allowEscapeKey: false,        
        }).then(() => {
          this.localStorageClear();
          this.router.navigate(['/allproperties']);
       })     
     }
      },
    (err) => {
      console.log("got error", err)
      //  self.serverDataLogin=err;
    } //For Error Response)
  
    )
   };
  


   localStorageClear()
   {
     localStorage.removeItem('market');
     localStorage.removeItem('asset');
     localStorage.removeItem('prebuilt');
     localStorage.removeItem('parkingavail');
     localStorage.removeItem('utilitiestype');
     localStorage.removeItem('ecofacilitytype');
     localStorage.removeItem('communitytype');
     localStorage.removeItem('parkingavailability');
     localStorage.removeItem('flooringtype');
     localStorage.removeItem('ceilingtype');
     localStorage.removeItem('furnishstatus');
     localStorage.removeItem('homewares');
     localStorage.removeItem('kitchenwares');
     localStorage.removeItem('appliance');
     localStorage.removeItem('furnitureware');
     localStorage.removeItem('constructionphase');
     localStorage.removeItem('finalizeinventory');
     localStorage.removeItem('approvaltype');
     localStorage.removeItem('fileimagedata');
     localStorage.removeItem('fileblueprint');
     localStorage.removeItem('pincode');
     localStorage.removeItem('dimensionunit');
     localStorage.removeItem('Superarea');
     localStorage.removeItem('projectname');
     localStorage.removeItem('Builtarea');
     localStorage.removeItem('naearlocat');
     localStorage.removeItem('studyrooms');
     localStorage.removeItem('room1');
     localStorage.removeItem('room2');
     localStorage.removeItem('address');
     localStorage.removeItem('room3');
     localStorage.removeItem('room4');
     localStorage.removeItem('room5');
     localStorage.removeItem('room6');
     localStorage.removeItem('room7');
     localStorage.removeItem('facing');
     localStorage.removeItem('carpetarea');
     localStorage.removeItem('kitchen');
     localStorage.removeItem('kitchentype');
     localStorage.removeItem('bathroom');
     localStorage.removeItem('bathroomtype');
     localStorage.removeItem('facing');
     localStorage.removeItem('facing');
     localStorage.removeItem('sixstep');
     localStorage.removeItem('thirdstep');
     localStorage.removeItem('sevenstep');
     localStorage.removeItem('firststep');
     localStorage.removeItem('fourstep');
     localStorage.removeItem('secondstep');
     localStorage.removeItem('fivestep');
     localStorage.removeItem('village');
     localStorage.removeItem('projectdesc');
     localStorage.removeItem('roomcount');
     localStorage.removeItem('roomtype');
     localStorage.removeItem('backyard');
     localStorage.removeItem('balconyarea');
     localStorage.removeItem('estimateprice');
     localStorage.removeItem('expectedprice');
     localStorage.removeItem('address');
     localStorage.removeItem('frontyard');
     localStorage.removeItem('clearcertify');
     localStorage.removeItem('duecertify');
     localStorage.removeItem('filelandmap');
     localStorage.removeItem('fileownerdoc');
     localStorage.removeItem('bhkflat');
     localStorage.removeItem('floor');
     localStorage.removeItem('ownerdata');
     localStorage.removeItem('maplocation');
     localStorage.removeItem('propertyfor');
     localStorage.removeItem('othervalue');
     localStorage.removeItem('nearlocat');
     localStorage.removeItem('otherapprovalinput');
     localStorage.removeItem('marketcategory');
     localStorage.removeItem('statearr');
     localStorage.removeItem('email');
     localStorage.removeItem('maxprice');
     localStorage.removeItem('minprice');
     localStorage.removeItem('bathroomtypeapis');
     localStorage.removeItem('rawfacilities');
     localStorage.removeItem('maxbuiltarea');
     localStorage.removeItem('minbuiltarea');

     localStorage.removeItem('contact');
     localStorage.removeItem('profession');
     localStorage.removeItem('email');

     localStorage.removeItem('citys');
     localStorage.removeItem('name');
     localStorage.removeItem('kitchentypeapis');
     localStorage.removeItem('balconyfacavail');
     localStorage.removeItem('mincarpetarea');
     localStorage.removeItem('maxcarpetarea');
     localStorage.removeItem('refferal');
   }
   
     spinner:any;
  
  
      ngOnDestroy()
      {
       this.localStorageClear();
        
      }
    



 }