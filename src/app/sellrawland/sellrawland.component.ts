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
   @Component({
     selector: 'app-sellrawland',
     templateUrl: './sellrawland.component.html', 
     styleUrls: ['./sellrawland.component.scss']
   })
   export class SellrawlandComponent implements OnInit {
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
    kitchen:any;
    area:number = 0;
    homewares:any;
    kitchentype:any;
    nearlocat:any;
    bhk:any;
    kitchenware:any;
    furnishing:any;
    faciliytytype:any;
    community:any;
    constructionphase:any;
    cookingunit:any;
    washingmachine:any;
    fullfurnished:any;
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
   statedatashow:any;
   builtUpArea:number;
   carpetArea:number;
   superBuiltUpArea:number=0;
   statedata:any;
   length:any;
   breadth:any;
    bathroomlocation:any;
   
    progressbarinitstepeight=0;
    progressbarstepeight=6;
   
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
     parkingavailablity:any;
     localmaplocation:any;
     propertyFloor:Array<string> = ["select","","","","1", "2","3","4","5","6","7","8","9","10"];
    //  @ViewChild("rawsearch", {read: ElementRef}) rawsearch: ElementRef;
     @ViewChild('rawsearch') rawsearch: ElementRef;
    
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
       toastr.toastrConfig.preventDuplicates=true;
  
      }
     
     ngOnInit() {
     
      this.hidedata();
      this.http.get('./assets/state.json')
    .subscribe((data:any)=>
    {
      this.statedata = data;
      // console.log("data",data);
    })

      this.localstoragevalue();
      
       console.log("localflooringtype",this.localceilingtype,this.localflooringtype);
   
       history.pushState(null, null, location.href);
      window.onpopstate = function () {
          history.go(1);
      };
      $(window).scrollTop({scrollTop:0}, 5000);
   
      this.stepNotAllowed();
   
       this.propertyTypes = this.getpropertytypes();
       
   
       this.dataservice.getFacilities().subscribe((data:any)=>
     {
     
       this.propertydimension = data[25].PROPERTYDIMENSION;
    
       // console.log("property Facilities data",this.residential);
     });
     
     this.step1section();
     this.AllurlData();
   //////////////////////////////////
    //create search FormControl
     this.searchControl1 = new FormControl();
   
    //set current position
    this.setCurrentPosition();

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.rawsearch.nativeElement, {
        types: []
      });
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let tempPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
           this.place=tempPlace;
           // let tempPlace: google.maps.places.lo;
           console.log("place",this.place.formatted_address);
          console.log("places", this.place.address_components);
          localStorage.setItem("maplocation",this.place.formatted_address);

           for(var i = 0; i < this.place.address_components.length; i += 1) {
            var addressObj = this.place.address_components[i];
            for(var j = 0; j < addressObj.types.length; j += 1) {
              if (addressObj.types[j] === 'country') {
                console.log(addressObj.types[j]); // confirm that this is 'country'
                this.country = addressObj.long_name;
                console.log(addressObj.long_name); // confirm that this is the country name
              }
              if (addressObj.types[j] === 'locality') {
                console.log(addressObj.types[j]); // confirm that this is 'country'
                this.city = addressObj.long_name;
                localStorage.setItem('city',this.city);
                console.log("this.citya",addressObj.long_name); // confirm that this is the country name
              }
              if (addressObj.types[j] === 'administrative_area_level_1') {
                console.log(addressObj.types[j]); // confirm that this is 'country'
                this.state = addressObj.long_name;
                localStorage.setItem('state',this.state);
                console.log("this.state",addressObj.long_name); // confirm that this is the country name
              }
            }
          }
           //verify result
           if (this.place.geometry === undefined || this.place.geometry === null) {
             return;
           }
    
           //set latitude, longitude and zoom
           this.latitude = this.place.geometry.location.lat();
           this.longitude = this.place.geometry.location.lng();
           console.log("latitude=====>",this.latitude);
           console.log("longitude=====>",this.longitude);
           localStorage.setItem('latitude',JSON.stringify(this.latitude));
           localStorage.setItem('longitude',JSON.stringify(this.longitude));
           this.zoom = 15;
         });
       });
     });
   
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
    return   ["select","1", "2","3","4","5","6","7","8","9","10"];
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
   
     city:any;
     currentLocation:any;
     addresslocation:any;
     getCurrentLocation() {
       console.log("check getCurrentLocation");
       this.mapsAPILoader.load().then(() => {
         let geocoder = new google.maps.Geocoder;
         let latlng = {lat: this.latitude, lng: this.longitude};
         localStorage.setItem('latitude',JSON.stringify(this.latitude));
         localStorage.setItem('longitude',JSON.stringify(this.longitude));
         console.log("latlng",latlng);
         // let that = this;
         geocoder.geocode({'location': latlng}, function(results) {
             if (results[0]) {
               //formatted address
              //  console.log("formatted_address",results);
               console.log("place",results[0].formatted_address);
               localStorage.setItem("maplocation",results[0].formatted_address);
              //  this.maplacelocat = 
               $('#dataloccs').val(results[0].formatted_address)
              //find country name
                   for (var i=0; i<results[0].address_components.length; i++) {
                  for (var b=0;b<results[0].address_components[i].types.length;b++) {
      
                  //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                      if (results[0].address_components[i].types[b] == "locality") {
                          this.city= results[0].address_components[i].long_name;
                          localStorage.setItem('city',this.city);
                          break;
                      }
   
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
              console.log("city",this.city);
              console.log("country",this.country);
              console.log("state",this.state);
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
     this.localraw = storagevalupath.filerawpropertyv;
     this.localmap = storagevalupath.filelandmapv;
     this.localowner = storagevalupath.fileownerdocv;
     this.localseed = storagevalupath.filesaleseedv;
     this.localtitcert = storagevalupath.fileTitlecertifyv;
     this.localduecert = storagevalupath.fileduecertifyv;
     this.locallandcert = storagevalupath.filelandcertifyv;
     this.localapprcert = storagevalupath.approvecertifyv;
     this.localtaxcert = storagevalupath.fileclearcertifyv;
     this.localvalcert = storagevalupath.filevaluecertifyv;

     this.localrawfacvalue = storagevalupath.locfacingvaluev;
     this.localrawfacfield = storagevalupath.locfacingfieldv;

     this.localacresarea = storagevalupath.locacresareav;
     this.localacres = storagevalupath.locacresv;

     this.localownerdata = storagevalupath.locownerdatav;

     this.localcurrentownerdata = storagevalupath.loccurrentownerdatav;

     this.localyeardoc = storagevalupath.locyeardocv;

     this.localkhata = storagevalupath.lockhatanumv;
     this.localkhasra = storagevalupath.lockhasranumv;

     this.localpincodedata = storagevalupath.pincodedatav;
     this.localdimunit = storagevalupath.locdimunitv;
     this.localsuperarea = storagevalupath.locsuperareav;
     this.localbuitarea = storagevalupath.builtareav;
     this.localfacing =  storagevalupath.facingareav;
     this.localcity = storagevalupath.loccityv;
     this.localstate = storagevalupath.locstatev;     
     this.localaddress = storagevalupath.addressv;
     this.localdescription = storagevalupath.descrv;
     this.localvillage = storagevalupath.villagev;
     this.localprojname = storagevalupath.locprojnamev;
     this.localprojdesc = storagevalupath.locprojdescv;

     this.locallatitude = storagevalupath.latitudev;

     this.locallangitude = storagevalupath.longitudev;

   

     this.localmaplocation = storagevalupath.locmaplocationv;

    //  if(this.rawfacingvalue === undefined) this.localmaplocation = "";
     if(this.localmaplocation === undefined) this.localmaplocation = "";
     if(this.localacresarea === undefined) this.localacresarea = "";
     if(this.localacres === undefined) this.localacres = "";
     
     if(this.localfiledata === undefined) this.localfiledata = [];
     if(this.localbluePrint === undefined) this.localbluePrint = [];
     if(this.localraw === undefined) this.localraw = [];
     if(this.localmap === undefined) this.localmap = [];
     if(this.localowner === undefined) this.localowner = [];
     if(this.localseed === undefined) this.localseed = [];
     if(this.localtitcert === undefined) this.localtitcert = [];
     if(this.localduecert === undefined) this.localduecert = [];
     if(this.locallandcert === undefined) this.locallandcert = [];
     if(this.localapprcert === undefined) this.localapprcert = [];
     if(this.localtaxcert === undefined) this.localtaxcert = [];
     if(this.localvalcert === undefined) this.localvalcert = [];

     if(this.localpincodedata === undefined) this.localpincodedata = "";

     if(this.localfacing === undefined) this.localfacing = "";
     if(this.localprojname === undefined) this.localprojname = "";
     if(this.localprojdesc === undefined) this.localprojdesc = "";
     console.log("CHECK localmap",this.localownerdata,this.localcurrentownerdata);
   }



  localmapvalue=[];
  localrawvalue = []
  localownervalue = [];
  localseedvalue = [];
  localtitcertvalue = [];
  localduecertvalue = [];
  locallandcertvalue = [];
  localapprcertvalue = [];
  localtaxcertvalue = [];
  localvalcertvalue = [];
  AllurlData()
  {

   if(this.localmap) {
   this.localmapvalue = this.localmap.map(x=>x.url);
   console.log("CHECK localraw",this.localmap.map(x=>x.url));
   }

   if(this.localraw) {
     this.localrawvalue = this.localraw.map(x=>x.url);
    console.log("CHECK localraw",this.localraw.map(x=>x.url));
    }

  if(this.localowner) {
    this.localownervalue = this.localowner.map(x=>x.url);
    console.log("CHECK localraw",this.localowner.map(x=>x.url));
    }

  if(this.localseed) {
   this.localseedvalue = this.localseed.map(x=>x.url);
    console.log("CHECK localraw",this.localseed.map(x=>x.url));
    }

    if(this.localtitcert) {
      this.localtitcertvalue = this.localtitcert.map(x=>x.url);
  console.log("CHECK localraw",this.localtitcert.map(x=>x.url));
  }
   
  if(this.localduecert) {
    this.localduecertvalue = this.localduecert.map(x=>x.url);
    console.log("CHECK localraw",this.localduecert.map(x=>x.url));
    }

  if(this.locallandcert) {
     this.locallandcertvalue = this.locallandcert.map(x=>x.url);
    console.log("CHECK localraw",this.locallandcert.map(x=>x.url));
    }

    if(this.localapprcert) {
     this.localapprcertvalue = this.localapprcert.map(x=>x.url);
      console.log("CHECK localraw",this.localapprcert.map(x=>x.url));
      }

  if(this.localtaxcert) {
    this.localtaxcertvalue = this.localtaxcert.map(x=>x.url);
    console.log("CHECK localraw",this.localtaxcert.map(x=>x.url));
    }

    if(this.localvalcert) {
     this.localvalcertvalue = this.localvalcert.map(x=>x.url);
      console.log("CHECK localraw",this.localvalcert.map(x=>x.url));
      }


  }



   

 // upload raw propery picture

 filesrawprop:any;
 allrawproperty:any=[];
 imagesrawprop:any = [];
 fileRawProperty (event){
   console.log("fileuploadsBlue");
  this.filesrawprop = event.target.files;
 console.log("this.files------>",this.filesrawprop);

  if(this.filesrawprop)
  {
    for(let i=0; i<this.filesrawprop.length; i++){
     
      if(this.localraw.some(x=>x.name == this.filesrawprop[i].name))
   {
     Swal.fire({
         title: "Existing Image",
          text: "Existing field !!",
          type: "info",
     })
     return;
   }
   console.log("chyeckj",this.filesrawprop[i].size);
      if(this.filesrawprop[i].size > 5000000)
      {
     this.toastr.error("File not supported above 5 mb","File Size Exceed");
     return false;
      }
      else
      {
        const image= {
          name:"",    
          type:"",
          size:"",
          url:"",
          isUploaded:false
        }; 
        this.allrawproperty.push(this.filesrawprop[i]);
        image.name=this.filesrawprop[i].name;
        image.type=this.filesrawprop[i].type;
        image.size=this.filesrawprop[i].size;
        image.isUploaded = this.filesrawprop[i].isUploaded
        console.log("allfilesblue",this.allrawproperty);
        $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');
  
   // show image preview
        const reader = new FileReader();
        reader.onload=(filedata)=>{
          image.url = reader.result + "";
          this.imagesrawprop.push(image);
        };
        reader.readAsDataURL(this.filesrawprop[i]);
      }
      }
     
  }
  event.srcElement.value = null;
}

deleteRawProperty(image:any){

  const index = this.imagesrawprop.indexOf(image);
  this.imagesrawprop.splice(index,1);
  console.log(" this.images", this.imagesrawprop);
  this.allrawproperty.splice(index,1);
}
/////////////////////////



// upload raw upload land map
   
fileslandmap:any;
alllandmap:any=[];
imagesLandmap:any = [];
fileuploadLandMap(event){
  console.log("fileuploadsBlue");
 this.fileslandmap = event.target.files;
console.log("this.files",this.fileslandmap);
 if(this.fileslandmap)
 {
  this.localstoragevalue();
   for(let i=0; i<this.fileslandmap.length; i++){
    
   if(this.localmap.some(x=>x.name == this.fileslandmap[i].name))
   {
     Swal.fire({
         title: "Existing Image",
          text: "Existing field !!",
          type: "info",
     })
     return;
   }
    if(this.fileslandmap[i].size > 5000000)
    {
   this.toastr.error("File not upload","File Image");
    }
    else
    {
      const image= {
        name:"",    
        type:"",
        size:"",
        url:"",
        isUploaded:""
      };
      image.name=this.fileslandmap[i].name;
      image.type=this.fileslandmap[i].type;
      image.size=this.fileslandmap[i].size;
      image.isUploaded = this.fileslandmap[i].isUploaded;
      this.alllandmap.push(this.fileslandmap[i]);
     
      console.log("allfilesblue",this.alllandmap,image.isUploaded,image.name);
      $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');
 
 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.imagesLandmap.push(image);
      };
      reader.readAsDataURL(this.fileslandmap[i]);
    }
    }
 }
 event.srcElement.value = null;
}

deleteLandMap(image:any){

 const index = this.imagesLandmap.indexOf(image);
 this.imagesLandmap.splice(index,1);
 console.log(" this.images", this.imagesLandmap);
 this.alllandmap.splice(index,1);
}
/////////////////////////


// upload raw upload ownership chain document
   
filesownership:any;
allfilesownership:any=[];
imagesownershipdoc:any = [];
fileRawOwnershipDocument(event){
  console.log("fileuploadsBlue");
 this.filesownership = event.target.files;
console.log("this.files",this.filesownership);
 if(this.filesownership)
 {
   for(let i=0; i<this.filesownership.length; i++){

    if(this.localowner.some(x=>x.name == this.filesownership[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
 
     if(this.filesownership[i].size > 5000000)
      {
     this.toastr.error("File not supported above 5 mb","File Size Exceed");
     return false;
      }
      else
      {
        const image= {
          name:"",    
          type:"",
          size:"",
          url:""
        };
        this.allfilesownership.push(this.filesownership[i]);
        image.name=this.filesownership[i].name;
        image.type=this.filesownership[i].type;
        image.size=this.filesownership[i].size;
        console.log("allfilesblue",this.allfilesownership);
        $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');
   
   // show image preview
        const reader = new FileReader();
        reader.onload=(filedata)=>{
          image.url = reader.result + "";
          this.imagesownershipdoc.push(image);
        };
        reader.readAsDataURL(this.filesownership[i]);
      }
      }
 }
}

deleteRawDocument(image:any){

 const index = this.imagesownershipdoc.indexOf(image);
 this.imagesownershipdoc.splice(index,1);
 console.log(" this.images", this.imagesownershipdoc);
 this.allfilesownership.splice(index,1);
}
/////////////////////////

// upload raw upload property sales deed
   
filesalesdeed:any;
allfilesalesdeed:any=[];
imagesalesdeed:any = [];
fileuploadsalesDeed(event){
  console.log("fileuploadsBlue");
 this.filesalesdeed = event.target.files;
console.log("this.files",this.filesalesdeed);
 if(this.filesalesdeed)
 {
   for(let i=0; i<this.filesalesdeed.length; i++){
    if(this.localseed.some(x=>x.name == this.filesalesdeed[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
    if(this.filesalesdeed[i].size > 5000000)
    {
   this.toastr.error("File not supported above 5 mb","File Size Exceed");
   return false;
    }
    else
    {
      const image= {
        name:"",    
        type:"",
        size:"",
        url:""
      };
      this.allfilesalesdeed.push(this.filesalesdeed[i]);
      image.name=this.filesalesdeed[i].name;
      image.type=this.filesalesdeed[i].type;
      image.size=this.filesalesdeed[i].size;
      console.log("allfilesalesdeed",this.allfilesalesdeed);
      $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');
 
 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.imagesalesdeed.push(image);
      };
      reader.readAsDataURL(this.filesalesdeed[i]);
    }
    }
  
 }
}

deleteSalesDeed(image:any){

 const index = this.imagesalesdeed.indexOf(image);
 this.imagesalesdeed.splice(index,1);
 console.log(" this.images", this.imagesalesdeed);
 this.allfilesalesdeed.splice(index,1);
}
/////////////////////////

// upload raw upload property sales deed
   
filestitlecertify:any;
allfilestitlecertify:any=[];
imagetitle:any = [];
fileTitleCertificate(event){
  console.log("fileuploadsBlue");
 this.filestitlecertify = event.target.files;
console.log("this.files",this.filestitlecertify);
 if(this.filestitlecertify)
 {
   for(let i=0; i<this.filestitlecertify.length; i++){

    if(this.localtitcert.some(x=>x.name == this.filestitlecertify[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
 
    if(this.filestitlecertify[i].size > 5000000)
    {
   this.toastr.error("File not supported above 5 mb","File Size Exceed");
   return false;
    }
    else
    {
      const image= {
        name:"",    
        type:"",
        size:"",
        url:""
      };
      this.allfilestitlecertify.push(this.filestitlecertify[i]);
      image.name=this.filestitlecertify[i].name;
      image.type=this.filestitlecertify[i].type;
      image.size=this.filestitlecertify[i].size;
      console.log("allfilesalesdeed",this.allfilestitlecertify);
      $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');
 
 // show image preview
      const reader = new FileReader();
      reader.onload=(filedata)=>{
        image.url = reader.result + "";
        this.imagetitle.push(image);
      };
      reader.readAsDataURL(this.filestitlecertify[i]);
    }
    }
  
 }
}

deleteTitleCertificate(image:any){

 const index = this.imagetitle.indexOf(image);
 this.imagetitle.splice(index,1);
 console.log(" this.images", this.imagetitle);
 this.allfilestitlecertify.splice(index,1);
}
/////////////////////////

// upload raw upload no dues  certificate
   
filesduecertify:any;
allfilesduecertify:any=[];
imagesduecertify:any = [];
fileDuesCertificate(event){
  console.log("fileuploadsBlue");
 this.filesduecertify = event.target.files;
console.log("this.files",this.filesduecertify);
 if(this.filesduecertify)
 {
   
   for(let i=0; i<this.filesduecertify.length; i++){
    if(this.localduecert.some(x=>x.name == this.filesduecertify[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
 
    if(this.filesduecertify[i].size > 5000000)
    {
   this.toastr.error("File not supported above 5 mb","File Size Exceed");
   return false;
    }
    else
    {
     const image= {
       name:"",    
       type:"",
       size:"",
       url:""
     };
     this.allfilesduecertify.push(this.filesduecertify[i]);
     image.name=this.filesduecertify[i].name;
     image.type=this.filesduecertify[i].type;
     image.size=this.filesduecertify[i].size;
     console.log("allfilesblue",this.allfilesduecertify);
     $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');

// show image preview
     const reader = new FileReader();
     reader.onload=(filedata)=>{
       image.url = reader.result + "";
       this.imagesduecertify.push(image);
     };
     reader.readAsDataURL(this.filesduecertify[i]);
   }
  }
 }
 event.srcElement.value = null;
}

deleteDuesCertificate(image:any){

 const index = this.imagesduecertify.indexOf(image);
 this.imagesduecertify.splice(index,1);
 console.log(" this.images", this.imagesduecertify);
 this.allfilesduecertify.splice(index,1);
}
/////////////////////////



// upload raw upload land use certificate
   
filesrawlandcertify:any;
allfilesrawlandcertify:any=[];
imagesrawlandcertify:any = [];
fileRawLandUseCertificate(event){
  console.log("fileuploadsBlue");
 this.filesrawlandcertify = event.target.files;
console.log("this.files",this.filesrawlandcertify);
 if(this.filesrawlandcertify)
 {
   for(let i=0; i<this.filesrawlandcertify.length; i++){
    if(this.locallandcert.some(x=>x.name == this.filesrawlandcertify[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
     if(this.filesrawlandcertify[i].size > 5000000)
     {
    this.toastr.error("File not upload","File Image");
     }
     else
     {
     const image= {
       name:"",    
       type:"",
       size:"",
       url:""
     };
     this.allfilesrawlandcertify.push(this.filesrawlandcertify[i]);
     image.name=this.filesrawlandcertify[i].name;
     image.type=this.filesrawlandcertify[i].type;
     image.size=this.filesrawlandcertify[i].size;
     console.log("allfilesblue",this.allfilesrawlandcertify);
     $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');

// show image preview
     const reader = new FileReader();
     reader.onload=(filedata)=>{
       image.url = reader.result + "";
       this.imagesrawlandcertify.push(image);
     };
     reader.readAsDataURL(this.filesrawlandcertify[i]);
   }
  }
 }
 event.srcElement.value = null;
}

deleteRawLandCertificate(image:any){

 const index = this.imagesrawlandcertify.indexOf(image);
 this.imagesrawlandcertify.splice(index,1);
 console.log(" this.images", this.imagesrawlandcertify);
 this.allfilesrawlandcertify.splice(index,1);
}
/////////////////////////



// upload raw upload authority approval certificate
   
filesapprovalcertify:any;
allfilesapprovalcertify:any=[];
imagesapprovalcertify:any = [];
fileApprovalcertificate(event){
  console.log("fileuploadsBlue");
 this.filesapprovalcertify = event.target.files;
console.log("this.files",this.filesapprovalcertify);
 if(this.filesapprovalcertify)
 {
   for(let i=0; i<this.filesapprovalcertify.length; i++){
    if(this.localapprcert.some(x=>x.name == this.filesapprovalcertify[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
 
     if(this.filesapprovalcertify[i].size > 5000000)
     {
    this.toastr.error("File not upload","File Image");
     }
     else
     {
     const image= {
       name:"",    
       type:"",
       size:"",
       url:""
     };
     this.allfilesapprovalcertify.push(this.filesapprovalcertify[i]);
     image.name=this.filesapprovalcertify[i].name;
     image.type=this.filesapprovalcertify[i].type;
     image.size=this.filesapprovalcertify[i].size;
     console.log("allfilesblue",this.allfilesapprovalcertify);
     $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');

// show image preview
     const reader = new FileReader();
     reader.onload=(filedata)=>{
       image.url = reader.result + "";
       this.imagesapprovalcertify.push(image);
     };
     reader.readAsDataURL(this.filesapprovalcertify[i]);
   }
  }
 }
 event.srcElement.value = null;
}

deleteApprovalCertificate(image:any){

 const index = this.imagesapprovalcertify.indexOf(image);
 this.imagesapprovalcertify.splice(index,1);
 console.log(" this.images", this.imagesapprovalcertify);
 this.allfilesapprovalcertify.splice(index,1);
}
/////////////////////////


// upload raw upload tax clearance certificate 
   
filesclearcertify:any;
allfilesclearcertify:any=[];
imagesclearcertify:any = [];
fileTaxClearanceCertificate(event){
  console.log("fileuploadsBlue");
 this.filesclearcertify = event.target.files;
console.log("this.files",this.filesclearcertify);
 if(this.filesclearcertify)
 {
   for(let i=0; i<this.filesclearcertify.length; i++){
    if(this.localtaxcert.some(x=>x.name == this.filesclearcertify[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
 
     if(this.filesclearcertify[i].size > 5000000)
     {
    this.toastr.error("File not upload","File Image");
     }
     else
     {
     const image= {
       name:"",    
       type:"",
       size:"",
       url:""
     };
     this.allfilesclearcertify.push(this.filesclearcertify[i]);
     image.name=this.filesclearcertify[i].name;
     image.type=this.filesclearcertify[i].type;
     image.size=this.filesclearcertify[i].size;
     console.log("allfilesblue",this.allfilesclearcertify);
     $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');

// show image preview
     const reader = new FileReader();
     reader.onload=(filedata)=>{
       image.url = reader.result + "";
       this.imagesclearcertify.push(image);
     };
     reader.readAsDataURL(this.filesclearcertify[i]);
   }
  }
 }
 event.srcElement.value = null;
}

deleteTaxClearanceCertificate(image:any){

 const index = this.imagesclearcertify.indexOf(image);
 this.imagesclearcertify.splice(index,1);
 console.log(" this.images", this.imagesclearcertify);
 this.allfilesclearcertify.splice(index,1);
}
/////////////////////////



// upload raw upload valuation certificate
   
filesvaluecertify:any;
allfilesvaluecertify:any=[];
imagesvaluecertify:any = [];
fileValuationCertificate(event){
  console.log("fileuploadsBlue");
 this.filesvaluecertify = event.target.files;
console.log("this.files",this.filesvaluecertify);
 if(this.filesvaluecertify)
 {
   for(let i=0; i<this.filesvaluecertify.length; i++){
    if(this.localvalcert.some(x=>x.name == this.filesvaluecertify[i].name))
    {
      Swal.fire({
          title: "Existing Image",
           text: "Existing field !!",
           type: "info",
      })
      return;
    }
 
     if(this.filesvaluecertify[i].size > 5000000)
     {
    this.toastr.error("File not upload","File Image");
     }
     else
     {
     const image= {
       name:"",    
       type:"",
       size:"",
       url:""
     };
     this.allfilesvaluecertify.push(this.filesvaluecertify[i]);
     image.name=this.filesvaluecertify[i].name;
     image.type=this.filesvaluecertify[i].type;
     image.size=this.filesvaluecertify[i].size;
     console.log("allfilesvaluecertify",this.allfilesvaluecertify);
     $('.uploadBlue-step').prop('disabled',false).css('cursor','pointer');

// show image preview
     const reader = new FileReader();
     reader.onload=(filedata)=>{
       image.url = reader.result + "";
       this.imagesvaluecertify.push(image);
     };
     reader.readAsDataURL(this.filesvaluecertify[i]);
   }
  }
 }
 event.srcElement.value = null;
}

deleteValuationCertificate(image:any){

 const index = this.imagesvaluecertify.indexOf(image);
 this.imagesvaluecertify.splice(index,1);
 console.log(" this.images", this.imagesvaluecertify);
 this.allfilesvaluecertify.splice(index,1);
}
/////////////////////////


 
facingvalue=[];
   
   facingcheck(value,e)
   {
   console.log("value",value,e.target.value);
     this.facingvalue.push(
       {
          'facingvalue':value,
          'facingside':e.target.value
       }
     )
     $('.default_bg').removeClass('buttoncolor')
     console.log("facingcheck",this.facingvalue);
     localStorage.setItem('facing',JSON.stringify(this.facingvalue));
     $('#'+e.target.id).parent().parent().addClass('buttoncolor');
     this.facingnext();
   }

   
   eastvalue = [];
   eastfield = [];

  westtvalue = [];
  westfield = [];

  northvalue = [];
  northfield = [];

  southfield = [];
  southvalue = [];

  fcfiled = [];
  fcvalue = [];

   rawfacingvalue:any = [];
   rawfacingfield:any = [];
   rawfacingv:any;
   rawfacingcheck(value,e)
   {
     this.rawfacingv = value;
     
     if(this.rawfacingv == 0)
     {
       this.northvalue = value;
       this.northfield = e.target.value;
       console.log("raw input check check",this.northvalue,this.northfield); 
     }

     if(this.rawfacingv == 1)
     {
       this.eastvalue = value;
       this.eastfield = e.target.value;
       console.log("raw input check check",this.eastvalue,this.eastfield); 
     }

     if(this.rawfacingv == 2)
     {
       this.westtvalue = value;
       this.westfield = e.target.value;
       console.log("raw input check check",this.westtvalue,this.westfield); 
     }

     if(this.rawfacingv == 3)
     {
       this.southvalue = value;
       this.southfield = e.target.value;
       console.log("raw input check check",this.southvalue,this.southfield); 
     }

   }

rawfacingnext()
 {
  this.rawfacingvalue = this.fcfiled.concat(this.eastvalue,this.northvalue,this.westtvalue,this.southvalue)
  this.rawfacingfield = this.fcvalue.concat(this.northfield,this.eastfield,this.westfield,this.southfield)
  console.log("raw facing check",this.rawfacingvalue); 
  console.log("raw input check check",this.rawfacingfield); 
  localStorage.setItem('rawfacingvalue',JSON.stringify(this.rawfacingvalue));
  localStorage.setItem('rawfacingfield',JSON.stringify(this.rawfacingfield));
  this.progressplus('rawlandnext');
     $('.rawlandmapnext').show();
      $('.rawfacing').hide();
}  

rawfacingback()
{
  this.progresssub('rawlandback');
  $('.rawkhasranumber').show();
  $('.rawfacing').hide();
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
   
     setrooms(e)
     {
       console.log("chekck",e.target.value);
       $('.default_bg').removeClass('buttoncolor')
       // if(e.target.value)
       $('#'+e.target.id).parent().parent().addClass('buttoncolor');
   
     }
   
     ecothervalue:any;
     ecother(e)
     {
       this.ecothervalue = e.target.value;
       console.log('e',this.ecothervalue);

     }

   appliancenext()
   {
     $('.appliance').hide();
     $('.furniturehome').show();
     this.progressplus('furnishnext');
   }
   
 
   roomlengthcheck(room,e)
   {
     console.log("room",room);
     console.log("room.target.value",e.target.value);
   }
   

     floorapi:any;
     togglefloor(e)
     {  
       this.floorapi = parseInt(e.target.value);
       console.log("togglefloor",e.target.value);
       localStorage.setItem("floor",this.floorapi);
       $('.propertyfloor').prop('disabled',false).css('cursor','pointer');
     }
   
   
   bhkfloorapi:any;
   nameId:number
   dimension:any;
   unitsapi:any;
   rawdimland:any;
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

   
   carpetAreaInput(e)
   {
     console.log("e.target.value",e.target.value);
   }
   
   
   spchar(e)
   {
    var k = e.which;
    var ok = (k >= 65 && k <= 90) || // A-Z(capital letter alpahabets)
         k >= 48 && k <= 57 ||
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


  acresvalue:number = 0;
   TotaLandarea()
   {
    if(this.dimension === 'Sq.Feet')
    {
    this.acresvalue = this.area / 43560;
    console.log("sqmeter", this.acresvalue);
    }

  if(this.dimension === 'Sq.Yards')
  {
   this.acresvalue = this.area / 4840;
   console.log("sqmeter", this.acresvalue);
  }
  
  if(this.dimension === 'Sq.Meter')
  {
    this.acresvalue = this.area / 4046.856;
    console.log("sqmeter", this.acresvalue);
  }
  
  if(this.dimension === 'Acres')
  {
    this.acresvalue = this.area;
    console.log("acres", this.acresvalue);
  }
  
  if(this.dimension === 'Marla')
  {
    this.acresvalue = this.area * 160;
    console.log("marla",this.acresvalue);
  }
  
  if(this.dimension === 'Ghaz')
  {
    this.acresvalue = this.area * 4886.918;
    console.log("ghaz",this.acresvalue);
  }
  

  if(this.dimension === 'Bigha')
  {
    this.acresvalue = this.area / 4;
  console.log("bigha",this.acresvalue);
  }
  
  if(this.dimension === 'Cents')
  {
    this.acresvalue = this.area / 100;
  console.log("cents",this.acresvalue);
  }
  
  if(this.dimension === 'Biswa')
  {
    this.acresvalue = this.area * 8.19642857;
    console.log("biswa",this.acresvalue);
  }
  
  if(this.dimension === 'kottah')
  {
    this.acresvalue = this.area * 32;
    console.log("kottah",this.acresvalue);
  }
  
  if(this.dimension === 'Kanal')
  {
    this.acresvalue = this.area * 0.125;
    console.log("kottah",this.acresvalue);
  }
  
  if(this.dimension === 'Grounds')
  {
    this.acresvalue = this.area * 0.05508881;
    console.log("kottah",this.acresvalue);
  }
  
  if(this.dimension === 'Guntha')
  {
    this.acresvalue = this.area / 40;
    console.log("kottah",this.acresvalue);
  }
  
  if(this.dimension === 'Hectares')
  {
    this.acresvalue = this.area * 2.47105;
  console.log("kottah",this.acresvalue);
  }  
  
  if(this.dimension === 'Rood')
  {
    this.acresvalue = this.area * 0.25;
  console.log("kottah",this.acresvalue);
  } 
  
  if(this.dimension === 'chataks')
  {
    this.acresvalue = this.area * 0.0103305371447;
    console.log("chataks",this.acresvalue);
  }
  
  else
  {
    console.log("check",this.area)
    localStorage.setItem("acresvalue",JSON.stringify(this.acresvalue));
    localStorage.setItem("totalarea",JSON.stringify(this.area));
    
    console.log("ok done ");
  }
   }

   
 
  
   

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
   this.totalpropertyrate = this.propertyvalue + parseInt(maincharge);
   this.propertyvaluedata = this.totalpropertyrate;
   console.log("this.propertyvaluedata",this.propertyvaluedata);
   localStorage.setItem('estimateprice',JSON.stringify(this.totalpropertyrate));
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

   statevalue:any;
   togglestate(e)
   {
   this.statevalue = e.target.value;
   console.log("data",this.statevalue);
   localStorage.setItem('state',this.statevalue);
   }

   
   cityvalue:any;
   togglecity(e)
   {
   this.cityvalue = e.target.value;
   localStorage.setItem('city',this.cityvalue);
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

   khatanum:any;
   rawkhata(e)
   {
    this.khatanum = e.target.value;
    localStorage.setItem('khatanumber',this.khatanum);
   }

   khasranum:any
   rawkhasra(e)
   {
    this.khasranum = e.target.value;
    localStorage.setItem('khasranumber',this.khasranum);
   }


   ownerdatas:any;
   owner(e)
   {
   this.ownerdatas = e.target.value;
   localStorage.setItem('ownerdata',this.ownerdatas);
   }

   currentownerdata
   currentowner(e)
   {
    this.currentownerdata = e.target.value;
    localStorage.setItem('localcurrownerdata',this.currentownerdata);

   }


   yeardocdata:any;
   yeardoc(e)
   {
    this.yeardocdata = e.target.value;
    localStorage.setItem('yeardocument',this.yeardocdata);
   }

   
     progresssub(key)
     {
       switch (key) {
         case 'rawlandback':
         this.progressbarinitstepeight -= Math.ceil(this.progressbarstepeight); break;
   
         default:
         break;
       }
     
     
     }
   
   movetooltip=0;
     progressplus(key)
     {
       switch (key) {
         case 'rawlandnext':
         this.progressbarinitstepeight += Math.ceil(this.progressbarstepeight); break;
         
         default:
           break;
       }
     }
    
   stepNotAllowed()
   {
   
     $('.maplocate-step').prop('disabled',true).css('cursor','not-allowed');
  
     $('.payconstruct-step').prop('disabled',true).css('cursor','not-allowed');
     $('.payinventory-step').prop('disabled',true).css('cursor','not-allowed');
     $('.payapproval-step').prop('disabled',true).css('cursor','not-allowed');
     $('.upload-step').prop('disabled',true).css('cursor','not-allowed');
   }
     hidedata()
     {
      $('.stepone').hide();
       $('#overviweformedit').hide();
       $('#rawoverviweformedit').hide();
       $('.market').show();
       $('.prog_tooltip').hide();

     }
     
     localmarketname:any;
     localassetname:any;
     locaalparkingname:any;
     localmarket:any;
     localasset:any;
     localprebuilt:any;
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


     Rawoverviewnext()
     {
      this.localstoragevalue();
      this.step1section();

      if(this.localacresarea)
      {
        console.log("localraw",this.localacresarea);
      }

      if(this.localraw)
      {
        console.log("localraw",this.localraw);
      }
      if(this.localmap)
      {
        console.log("localraw",this.localmap);
      }
      if(this.localseed)
      {
        console.log("localraw",this.localseed);
      }
      if(this.localtitcert)
      {
        console.log("localraw",this.localtitcert);
      }
      if(this.localduecert)
      {
        console.log("localraw",this.localduecert);
      }
      if(this.locallandcert)
      {
        console.log("localraw",this.locallandcert);
      }
      if(this.localapprcert)
      {
        console.log("localraw",this.localapprcert);
      }
      if(this.localtaxcert)
      {
        console.log("localraw",this.localtaxcert);
      }
      if(this.localpincodedata)
      {
        console.log("pincode data",this.localpincodedata);
      }
      
      if(this.localdimunit)
      {
        console.log("localdimunit data",this.localdimunit);
      }

      if(this.localstate)
      {
        console.log("localstate data",this.localstate);
      }


      if(this.localprojname)
      {
        console.log("localprojname data",this.localprojname);
      }

      if(this.localdescription)
      {
        console.log("localcity data",this.localdescription);
      }
      
     
      $("#rawoverviweformedit").show();
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
    localcurrentownerdata:any;
    localyeardoc:any;

   step1section()
   {
    this.localstoragevalue();
    if(this.localdimunit)
    {
    this.rawdimland = this.localdimunit.name
    }
    this.city = this.localcity;
    this.district = this.localpincodedata.district;
    this.taluk = this.localpincodedata.taluka;
    this.pincode = this.localpincodedata.pinCode;
    this.maplacelocat = this.localmaplocation;    
    this.area =  this.localacresarea;
    this.acresvalue = this.localacres;
    this.statedatashow = this.localstate;
   } 


   
       localpincodedata:any;
       localdimunit:any;
       localsuperarea:any;
       localbuitarea:any;
       localfacing:any;
       localcarpet:any;
       localbalcony:any;
       localprojname:any;
       localprojdesc:any;
       localcity:any;
       localstate:any;
       localcountry:any;
       localaddress:any;
      localdescription:any;
      localvillage:any;
      locallatitude:any;
      locallangitude:any;

     localceilingtype=[];
     localflooringtype=[];
     loccalparkinginfo:any;
   
  
     localfiledata = [];
     localbluePrint = [];
     localraw = [];
     localmap = [];
     localowner = [];
     localseed = [];
     localtitcert = [];
     localduecert = [];
     locallandcert = [];
     localapprcert = [];
     localtaxcert = [];
     localvalcert = [];
     step6()
     {
       $('.overall-progress').hide();
       $('.propertygallery').show();
       $('.progresssix').show();
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
   
   
   
       floorback()
       {
         $('.propertyfloor').hide();
         $('.maplocate').show();
         this.progresssub('locationback');
         
       }
   
       floornext()
       {
         $('.propertyfloor').hide();
         $('.bhkfloor').show();
         this.progressplus('locationnext');
       }
   
   
      
   
       landmarkback()
       {
         $('.maplocate').show();
         $('.landmark').hide();
         this.progresssub('locationback');
       }
   
       landmarknext()
       {
         $('.landmark').hide();
         $('.area').show();
         this.progressplus('locationnext');
       }
     
       areaback()
       {
         $('.landmark').show();
         $('.area').hide();
         this.progresssub('locationback');
       }
     
     
       areanext()
       {
         $('.area').hide();
         $('.dimension').show();
         this.progressplus('locationnext');
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
         $('.dimension').show();
         this.progresssub('locationback');
       }
     
       facingnext()
       {
         $('.facing').hide();
         $('.rooms').show();
         this.progressplus('locationnext');
       }
     
       roomback()
       {
         $('.rooms').hide();
         $('.facing').show();
         this.progresssub('locationback');
       }
     
     
       roomnext()
       {
         $('.rooms').hide();
         $('.kitchenvalue').show();
         this.progressplus('locationnext');
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
       }

       propertyblueback()
       {
        $('.propertydimension ').hide();
        $('.propertygallery').show();
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
         $('.payconstruct').hide();
         $('.payinventory').show();
         this.progressplus('paymentnext');
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
   
       payapprovalnext()
       {
         $('.payapproval').hide();
         $('.pricing').show();
         this.progressplus('paymentnext');
       }
   
   
       pricingback()
       {
         $('.payapproval').show();
         $('.pricing').hide();
         this.progresssub('paymentback');
       }

       carpetarea(e)
       {
         this.setp7carperarea = e.target.value
        localStorage.setItem('carpetarea',JSON.stringify(this.setp7carperarea));
         console.log(e.target.value);
       }
   
    

       resOverviewShow()
       {
         window.location.href="/sell-property#resoverview";
       }

       rawlocationback()
       {
        this.router.navigate(['/dashboard']);
        $(window).scrollTop({scrollTop:0}, 100);
       }

       rawlocationnext()
       {
         console.log("pincode");
        if(this.localaddress && this.localdescription && this.localprojname)
        {
        $('.rawarea').show();
        $('.rawlocation').hide();
        this.progressplus('rawlandnext');
        $(window).scrollTop({scrollTop:0}, 5000);
        }
       else if(!this.state || !this.paddress || !this.propertyName || !this.propertyDescription)
       { 
         this.mandatfield = true;
        console.log("check",this.propertyName,this.propertyDescription,this.paddress);
        console.log("check if");
        Swal.fire({
          title: "Missing Field",
          text: "Please input field !!",
          type: "info",
         });
       }
       else{
        console.log("check else");
        $('.rawarea').show();
        $('.rawlocation').hide();
         this.progressplus('rawlandnext');
         $(window).scrollTop({scrollTop:0}, 5000);
       }
       }


       

       rawareaback()
       {
        this.progresssub('rawlandback');
         console.log("area back");
        $('.rawlocation').show();
        $('.rawarea').hide();
       }

       rawareanext()
       {
        console.log("====>",this.dimension);
        if(this.localdimunit)
        {
          this.progressplus('rawlandnext');
          $('.rawdimension').show();
          $('.rawarea').hide();
        }
        else if(this.dimension == undefined)
         {
          Swal.fire({
            title: "Missing Field",
            text: "Please select field !!",
            type: "info",
           });
         }
       else{
        this.progressplus('rawlandnext');
        $('.rawdimension').show();
        $('.rawarea').hide();
       }
      }

       rawdimensionback()
       {
        this.progresssub('rawlandback');
        $('.rawarea').show();
        $('.rawdimension').hide();
       }

       rawdimensionnext()
       {
   this.localstoragevalue();
        console.log("check",this.localacres,this.localacresarea.value);
         if(this.localacres)
        {
          this.progressplus('rawlandnext');
          $('.rawkhasranumber').show();
          $('.rawdimension').hide();
        }
      else if(!this.area)
          {
          Swal.fire({
            title: "Missing Field",
            text: "Please input field !!",
            type: "info",
           });
         }     
         else{
          this.progressplus('rawlandnext');
        $('.rawkhasranumber').show();
        $('.rawdimension').hide();
       }
      }

       rawkhataback()
       {
        this.progresssub('rawlandback');
        $('.rawdimension').show();
        $('.rawkhasranumber').hide();
       }

       rawkhatanext()
       { 
        //  this.localstoragevalue();
         console.log("khatanum",this.khatanum,this.khasranum);
          if(this.localkhasra && this.localkhata)
         {
          $('.rawfacing').show();
          this.progressplus('rawlandnext');
          $('.rawkhasranumber').hide();
         }

         else if(!this.khatanum || !this.khasranum)
         {
          Swal.fire({
            title: "Missing Field",
            text: "Please input field !!",
            type: "info",
           });
         }
        
         else
         {
          this.progressplus('rawlandnext');
          $('.rawfacing').show();
          $('.rawkhasranumber').hide();
         }
       }

       rawoverviewback()
       {
        $('.rawlocation').show();
        $('#rawoverviweformedit').hide();
       }

   


localStorageClear()
{
  localStorage.removeItem('pincode');
  localStorage.removeItem('dimensionunit');
  localStorage.removeItem('Superarea');
  localStorage.removeItem('projectname');
  localStorage.removeItem('Builtarea');
  localStorage.removeItem('naearlocat');
  localStorage.removeItem('address');
  localStorage.removeItem('village');
  localStorage.removeItem('projectdesc');
  localStorage.removeItem('address');
  localStorage.removeItem('frontyard');
  localStorage.removeItem('clearcertify');
  localStorage.removeItem('duecertify');
  localStorage.removeItem('filelandmap');
  localStorage.removeItem('fileownerdoc');
  localStorage.removeItem('approvecertify');
  localStorage.removeItem('landcertify');
  localStorage.removeItem('rawproperty');
  localStorage.removeItem('saleseed');
  localStorage.removeItem('titlecertify');
  localStorage.removeItem('valuecertify');
  localStorage.removeItem('yeardocument');
  localStorage.removeItem('khasranumber');
  localStorage.removeItem('khatanumber');
  localStorage.removeItem('acresvalue');
  localStorage.removeItem('ownerdata');
  localStorage.removeItem('maplocation');
  localStorage.removeItem('totalarea');
  localStorage.removeItem('acresvalue');

  localStorage.removeItem('rawfacingfield');
  localStorage.removeItem('rawfacingvalue');
}



  spinner:any;

   ///////////////////////////////////////////////////////////////////////////
   checkAndUpload(){
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.alllandmap.length; i++) {
     let file = this.alllandmap[i];
     body.append('_files', file);
   }
     console.log("value  chek array4");
     this.spinner = true;
    body.append('fvalue', '8');  
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{
 console.log("data is not available");
   console.log("data raw land map",data);
   this.toastr.success('Property Image upload','Success');
   data.extraData;
   var fileuploadraw1 = data.extraData.fileUrl;
   console.log("data",fileuploadraw1,this.alllandmap);
   var filelandfilename = [];

   this.alllandmap.forEach((data,i) => {
     console.log("data",data);
     console.log(data.name);

     filelandfilename.push({
       name:data.name,
       url:fileuploadraw1[i]
     })
   });

   // fileuploadraw1

   localStorage.setItem("filelandmap",JSON.stringify(filelandfilename.concat(this.localmap)));
   this.spinner = false;
   this.progressplus('rawlandnext');
   $('.rawpropertyimages').show();
   $('.rawlandmapnext').hide();
   this.alllandmap = [];
   this.imagesLandmap = []
  }
 //  this.sixformcomplete = true;
,
(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)}

   rawlandmapnext()
   { 
     this.localstoragevalue();
     if(this.localmap.length)
      {
        if(this.alllandmap.length){
          this.checkAndUpload()
        } else {
          console.log("==>",this.alllandmap);
          console.log("==>",this.imagesLandmap);
          
          $('.rawpropertyimages').show();
          $('.rawlandmapnext').hide();
          this.progressplus('rawlandnext');
        }
        
      } else {
        if(this.alllandmap.length){
          this.checkAndUpload()
        } else {
          Swal.fire({
            title: "Info !!!",
            text: "Please upload field.",
            type: "error",
          })
        }
      }
}
 
 
localdeletelandmap(image)
 {
   let deltFile = this.localmap.find(v=>v.name == image.name);
   if(deltFile){
    this.localmap.splice(this.localmap.indexOf(deltFile),1)
    localStorage.setItem("filelandmap",JSON.stringify(this.localmap));
   }
 }


 rawlandmapback()
 {
   this.localstoragevalue();
  this.progresssub('rawlandback');
  $('.rawfacing').show();
  $('.rawlandmapnext').hide();
 }
   ///////////////////////////////////////////////////////////////////////////

checkandUploadimage()
{
  const httpOptions = {
    headers: new HttpHeaders({
       'Authorization': 'Token ' + this.jwttoken})
      };
  let body = new FormData();
  for (var i = 0; i < this.allrawproperty.length; i++) {
    let file = this.allrawproperty[i];
    body.append('_files', file);
  }
  this.spinner = true;
  body.append('fvalue', '1');
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{
  this.toastr.success('Property Image upload','Success');
  this.spinner = false;
  var fileuploadraw2 = data.extraData.fileUrl;

  var filelandfilename = [];

  this.allrawproperty.forEach((data,i) => {
    console.log("data",data);
    console.log(data.name);

    filelandfilename.push({
      name:data.name,
      url:fileuploadraw2[i]
    })
  });


  localStorage.setItem("rawproperty",JSON.stringify(filelandfilename.concat(this.localraw)));
  console.log("data",fileuploadraw2,data);

    this.spinner = false;
  $('.rawownershipdoc').show();
  $('.rawpropertyimages').hide();
  this.progressplus('rawlandnext');
  this.allrawproperty=[];
   this.imagesrawprop = [];
},

(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)
}

   rawpropertyimages()
   { 
    this.localstoragevalue();
    if(this.localraw.length)
   {
     if(this.allrawproperty.length){
       this.checkandUploadimage()
     } else {
       console.log("==>",this.allrawproperty);
       console.log("==>",this.imagesLandmap);
       
       $('.rawownershipdoc').show();
       $('.rawpropertyimages').hide();
       this.progressplus('rawlandnext');
     }
   }
   else {
    if(this.allrawproperty.length){
      this.checkandUploadimage()
    } else { 
      $('.rawownershipdoc').show();
      $('.rawpropertyimages').hide();
      this.progressplus('rawlandnext');
    }
  }
};


localdeleteRawProperty(image)
{
  let deltFile = this.localraw.find(v=>v.name == image.name);
  if(deltFile){
   this.localraw.splice(this.localraw.indexOf(deltFile),1)
   localStorage.setItem("rawproperty",JSON.stringify(this.localraw));
  }
}

 rawpropertyback()
 {
   this.localstoragevalue();
   if(this.localmap)
   {
  console.log("===>",this.localmap);
  
   }
  this.progresssub('rawlandback');
  $('.rawlandmapnext').show();
  $('.rawpropertyimages').hide();
 }


   ///////////////////////////////////////////////////////////////////////////

  checkandUploadOwnershipDoc()
  {
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.allfilesownership.length; i++) {
      let file = this.allfilesownership[i];
      body.append('_files', file);
    }
    this.spinner = true;
    body.append('fvalue', '0');  
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{
  console.log("data",data);
  this.toastr.success('Property Image upload','Success');
  var fileupload3 = data.extraData.fileUrl;
  console.log("data",fileupload3);

  var filelandfilename = [];

  this.allfilesownership.forEach((data,i) => {
    console.log("data",data);
    console.log(data.name);

    filelandfilename.push({
      name:data.name,
      url:fileupload3[i]
    })
  });
  

  console.log("==>",filelandfilename);

  localStorage.setItem("fileownerdoc",JSON.stringify(filelandfilename.concat(this.localowner)));
  this.spinner = false;
  this.progressplus('rawlandnext');
  $('.rawsaleseed').show();
   $('.rawownershipdoc').hide();
   this.allfilesownership=[];
   this.imagesownershipdoc = [];
 
 //  this.sixformcomplete = true;
},
(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)
  }


   rawownershipdoc()
   { 
    this.localstoragevalue();
   
    if(!this.ownerdatas || !this.yeardocdata || !this.currentownerdata)
    {
      if(this.localownerdata || this.localyeardoc)
      {
       this.ownershipfilevalid();
      }
      else
      {
      Swal.fire({
        title: "Info !!!",
        text: "Please enter field.",
        type: "error",
      })
      this.spinner = false;
    }
    }
    else{
      this.ownershipfilevalid();
    }
  
};


ownershipfilevalid()
{
   
 if(this.localowner.length)
  {
    if(this.allfilesownership.length){
      this.checkandUploadOwnershipDoc()
    } else {
      $('.rawsaleseed').show();
      $('.rawownershipdoc').hide();
      this.progressplus('rawlandnext');
    }
    
  } 
  else {
    if(this.allfilesownership.length){
      this.checkandUploadOwnershipDoc()
    } else {
      Swal.fire({
        title: "Info !!!",
        text: "Please upload field.",
        type: "error",
      })
    }
  }
}

 rawownerdcback()
 { 
  this.localstoragevalue(); 
  if(this.localraw)
  {
    console.log("==>",this.localraw);
    
  }
  this.progresssub('rawlandback');
  $('.rawpropertyimages').show();
  $('.rawownershipdoc').hide();
 }

 localdeletelandownership(image)
{
  let deltFile = this.localowner.find(v=>v.name == image.name);
  if(deltFile){
   this.localowner.splice(this.localowner.indexOf(deltFile),1)
   localStorage.setItem("fileownerdoc",JSON.stringify(this.localowner));
  }
}


   ///////////////////////////////////////////////////////////////////////////
 
 
 checkandUploadSaleSeed()
 {
  const httpOptions = {
    headers: new HttpHeaders({
       'Authorization': 'Token ' + this.jwttoken})
      };
  let body = new FormData();
  for (var i = 0; i < this.allfilesalesdeed.length; i++) {
    let file = this.allfilesalesdeed[i];
    body.append('_files', file);
  }
  this.spinner = true;
  body.append('fvalue', '3');  
//  this.apiservice.getPropertyImages(this.uuid,body)
    this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
    .subscribe((data:any)=>
    {
    this.toastr.success('Property Image upload','Success');
    this.spinner = false;
    var fileupload4 = data.extraData.fileUrl;

    var filelandfilename = [];

    this.allfilesalesdeed.forEach((data,i) => {
      console.log("data",data);
      console.log(data.name);
 
      filelandfilename.push({
        name:data.name,
        url:fileupload4[i]
      })
    });

    localStorage.setItem("saleseed",JSON.stringify(filelandfilename.concat(this.localseed)));
    console.log("data",fileupload4,data);
    this.spinner = false;
    $('.rawtitleclearcertify').show();
    $('.rawsaleseed').hide();
    this.progressplus('rawlandnext');
    this.allfilesalesdeed=[];
    this.imagesalesdeed = [];
    },

    (err) => {
    console.log("got error", err)
    //  self.serverDataLogin=err;
    } //For Error Response)
    )
 }
 
 
   rawsaleseed()
   { 
    this.localstoragevalue();
     if(this.localseed.length)
      {
        if(this.allfilesalesdeed.length){
          this.checkandUploadSaleSeed()
        } else {
          $('.rawtitleclearcertify').show();
        $('.rawsaleseed').hide();
        this.progressplus('rawlandnext');
        }
        
      } else {
        if(this.allfilesalesdeed.length){
          this.checkandUploadSaleSeed()
        } else {
          $('.rawtitleclearcertify').show();
          $('.rawsaleseed').hide();
          this.progressplus('rawlandnext');
        }
      }
};


localdeletelandsaleseed(image)
{
  let deltFile = this.localseed.find(v=>v.name == image.name);
  if(deltFile){
   this.localseed.splice(this.localseed.indexOf(deltFile),1)
   localStorage.setItem("saleseed",JSON.stringify(this.localseed));
  }
}


 rawsaleseedback()
 {
   this.localstoragevalue();
   if(this.localowner) console.log("=>>",this.localowner);
  this.progresssub('rawlandback');
  $('.rawownershipdoc').show();
  $('.rawsaleseed').hide();
 }
   ///////////////////////////////////////////////////////////////////////////

 
  checkandUploadtitlecertify()
  {
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.allfilestitlecertify.length; i++) {
      let file = this.allfilestitlecertify[i];
      body.append('_files', file);
    }
    this.spinner = true;
    body.append('fvalue', '2');  
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{

  this.toastr.success('Property Image upload','Success');
  data.extraData;
  this.spinner = false;
  var fileupload5 = data.extraData.fileUrl;

  var filelandfilename = [];

   this.allfilestitlecertify.forEach((data,i) => {
     console.log("data",data);
     console.log(data.name);

     filelandfilename.push({
       name:data.name,
       url:fileupload5[i]
     })
   });

  localStorage.setItem("titlecertify",JSON.stringify(filelandfilename.concat(this.localtitcert)));
  console.log("data",fileupload5,data);
  this.progressplus('rawlandnext');
  $('.rawduecertificates').show();
  $('.rawtitleclearcertify').hide();
  this.allfilestitlecertify=[];
   this.imagetitle = [];
 


 //  this.sixformcomplete = true;
},

(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)
  }
  


   rawtitleclearcertify()
   { 
    this.localstoragevalue();
    if(this.localtitcert.length)
     {
       if(this.allfilestitlecertify.length){
         this.checkandUploadtitlecertify()
       } else {
         $('.rawduecertificates').show();
         $('.rawtitleclearcertify').hide();
         this.progressplus('rawlandnext');
       }
       
     } else {
       if(this.allfilestitlecertify.length){
         this.checkandUploadtitlecertify()
       } else {
         Swal.fire({
           title: "Info !!!",
           text: "Please upload field.",
           type: "error",
         })
       }
     }
};


localdeletelandclearcrttify(image)
{
  let deltFile = this.localtitcert.find(v=>v.name == image.name);
  if(deltFile){
   this.localtitcert.splice(this.localtitcert.indexOf(deltFile),1)
   localStorage.setItem("titlecertify",JSON.stringify(this.localtitcert));
  }
}




 rawtitlecertifyback()
 {
   this.localstoragevalue();
   if(this.localseed)console.log("-->",this.localseed);
  this.progresssub('rawlandback');
  $('.rawsaleseed').show();
  $('.rawtitleclearcertify').hide();
 }
   ///////////////////////////////////////////////////////////////////////////


  checkandUploadDueCertificate()
  {

    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.allfilesduecertify.length; i++) {
      let file = this.allfilesduecertify[i];
      body.append('_files', file);
    }
    this.spinner = true;
    body.append('fvalue', '4');  
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{
  this.toastr.success('Property Image upload','Success');
  data.extraData;
  this.spinner = false;
  var fileupload6 = data.extraData.fileUrl;

  var filelandfilename = [];

  this.allfilesduecertify.forEach((data,i) => {
    console.log("data",data);
    console.log(data.name);

    filelandfilename.push({
      name:data.name,
      url:fileupload6[i]
    })
  });

  localStorage.setItem("duecertify",JSON.stringify(filelandfilename.concat(this.localduecert)));
  console.log("data",fileupload6,data);
  this.progressplus('rawlandnext');
  $('.rawlandcertificate').show();
  $('.rawduecertificates').hide();
  this.allfilesduecertify=[];
  this.imagesduecertify = [];
 
 
 //  this.sixformcomplete = true;
},

(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)
  }


   rawduecertificates()
   { 
   this.localstoragevalue();
   if(this.localduecert.length)
    {
      if(this.allfilesduecertify.length){
        this.checkandUploadDueCertificate()
      } else {
        console.log("==>",this.allfilesduecertify);
        console.log("==>",this.imagesLandmap);
        $('.rawlandcertificate').show();
        $('.rawduecertificates').hide();
        this.progressplus('rawlandnext');
      }
      
    } else {
      if(this.allfilesduecertify.length){
        this.checkandUploadDueCertificate()
      } else {
        Swal.fire({
          title: "Info !!!",
          text: "Please upload field.",
          type: "error",
        })
      }
    }
};


localdeletelandduecrtify(image)
{
  let deltFile = this.localduecert.find(v=>v.name == image.name);
  if(deltFile){
   this.localduecert.splice(this.localduecert.indexOf(deltFile),1)
   localStorage.setItem("duecertify",JSON.stringify(this.localduecert));
  }
}


 rawduecertifyback()
 {
   this.localstoragevalue();
   if(this.localtitcert) console.log("==>",this.localtitcert);
  this.progresssub('rawlandback');
  $('.rawtitleclearcertify').show();
  $('.rawduecertificates').hide();
 }
   ///////////////////////////////////////////////////////////////////////////

  checkandUploadLandcerttificate()
  {
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.allfilesrawlandcertify.length; i++) {
      let file = this.allfilesrawlandcertify[i];
      body.append('_files', file);
    }
    this.spinner = true;
    body.append('fvalue', '9');  
//  this.apiservice.getPropertyImages(this.uuid,body)
    this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
    .subscribe((data:any)=>
    {
      this.toastr.success('Property Image upload','Success');
      data.extraData;
      this.spinner = false;
      var fileupload7 = data.extraData.fileUrl;


  var filelandfilename = [];

  this.allfilesrawlandcertify.forEach((data,i) => {
    console.log("data",data);
    console.log(data.name);

    filelandfilename.push({
      name:data.name,
      url:fileupload7[i]
    })
  });

      localStorage.setItem("landcertify",JSON.stringify(filelandfilename.concat(this.locallandcert)));
      console.log("data",fileupload7,data);
    
       this.progressplus('rawlandnext');
    $('.rawapprovalcertify').show();
      $('.rawlandcertificate').hide();
      this.allfilesrawlandcertify=[];
     this.imagesrawlandcertify = [];
    //  this.sixformcomplete = true;
    },

    (err) => {
      console.log("got error", err)
      //  self.serverDataLogin=err;
    } //For Error Response)
    )
  }


   rawlandcertificate()
   { 
    this.localstoragevalue();
     if(this.locallandcert.length)
      {
        if(this.allfilesrawlandcertify.length){
          this.checkandUploadLandcerttificate()
        } else {
          $('.rawapprovalcertify').show();
          $('.rawlandcertificate').hide();
          this.progressplus('rawlandnext');
        }
        
      } else {
        if(this.allfilesrawlandcertify.length){
          this.checkandUploadLandcerttificate()
        } else {
          Swal.fire({
            title: "Info !!!",
            text: "Please upload field.",
            type: "error",
          })
        }
      }
    };


localdeletelandcertify(image)
{
  let deltFile = this.locallandcert.find(v=>v.name == image.name);
  if(deltFile){
   this.locallandcert.splice(this.locallandcert.indexOf(deltFile),1)
   localStorage.setItem("landcertify",JSON.stringify(this.locallandcert));
  }
}


 rawlandcertifback()
 {
   this.localstoragevalue();
   if(this.localduecert) console.log("==>",this.localduecert);
  this.progresssub('rawlandback');
  $('.rawduecertificates').show();
  $('.rawlandcertificate').hide();
 }


   ///////////////////////////////////////////////////////////////////////////


   checkandUploadApprovalCertificate()
   {
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.allfilesapprovalcertify.length; i++) {
      let file = this.allfilesapprovalcertify[i];
      body.append('_files', file);
    }
    this.spinner = true;
    body.append('fvalue', '5');  
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{
  this.toastr.success('Property Image upload','Success');
  data.extraData;
  this.spinner = false;
  var fileupload8 = data.extraData.fileUrl;

  var filelandfilename = [];

  this.allfilesapprovalcertify.forEach((data,i) => {
    console.log("data",data);
    console.log(data.name);

    filelandfilename.push({
      name:data.name,
      url:fileupload8[i]
    })
  });

  localStorage.setItem("approvecertify",JSON.stringify(filelandfilename.concat(this.localapprcert)));
  console.log("data",fileupload8,data);

 this.progressplus('rawlandnext');
  $('.rawclearcertify').show();
  $('.rawapprovalcertify').hide();
   this.allfilesapprovalcertify=[];
   this.imagesapprovalcertify = [];

 //  this.sixformcomplete = true;
},

(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)
   }
  

   rawapprovalcertify()
   { 
     if(this.localapprcert.length)
     {
       if(this.allfilesapprovalcertify.length){
         this.checkandUploadApprovalCertificate()
       } else {
         $('.rawclearcertify').show();
         $('.rawapprovalcertify').hide();
         this.progressplus('rawlandnext');
       }
       
     } else {
       if(this.allfilesapprovalcertify.length){
         this.checkandUploadApprovalCertificate()
       } else {
        $('.rawclearcertify').show();
        $('.rawapprovalcertify').hide();
        this.progressplus('rawlandnext');
       }
     }   
};


localdeleteapprovalcertify(image)
{
  let deltFile = this.localapprcert.find(v=>v.name == image.name);
  if(deltFile){
   this.localapprcert.splice(this.localapprcert.indexOf(deltFile),1)
   localStorage.setItem("approvecertify",JSON.stringify(this.localapprcert));
  }
}


 rawapprovalback()
 {
   this.localstoragevalue();
   if(this.locallandcert)console.log('=',this.locallandcert);
  this.progresssub('rawlandback');
  $('.rawlandcertificate').show();
  $('.rawapprovalcertify').hide();
 }
   ///////////////////////////////////////////////////////////////////////////

checkandUploadClearCerttify()
{
  const httpOptions = {
    headers: new HttpHeaders({
       'Authorization': 'Token ' + this.jwttoken})
      };
  let body = new FormData();
  for (var i = 0; i < this.allfilesclearcertify.length; i++) {
    let file = this.allfilesclearcertify[i];
    body.append('_files', file);
  }
  this.spinner = true;
  body.append('fvalue', '6');  
      //  this.apiservice.getPropertyImages(this.uuid,body)
      this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
      .subscribe((data:any)=>
      {
          this.toastr.success('Property Image upload','Success');
          data.extraData;
          this.spinner = false;
          var fileupload9 = data.extraData.fileUrl;

          var filelandfilename = [];

          this.allfilesclearcertify.forEach((data,i) => {
            console.log("data",data);
            console.log(data.name);
       
            filelandfilename.push({
              name:data.name,
              url:fileupload9[i]
            })
          });

          localStorage.setItem("clearcertify",JSON.stringify(filelandfilename.concat(this.localtaxcert)));
          console.log("data",fileupload9,data);
          this.progressplus('rawlandnext');
          $('.rawvaluationcertify').show();
          $('.rawclearcertify').hide();
         this.allfilesclearcertify=[];
         this.imagesclearcertify = [];

      
      },

      (err) => {
      console.log("got error", err)
      //  self.serverDataLogin=err;
      } //For Error Response)
      )
      }


   rawclearcertify()
   { 
     this.localstoragevalue();
     if(this.localtaxcert.length)
      {
        if(this.allfilesclearcertify.length){
          this.checkandUploadClearCerttify()
        } else {
          $('.rawvaluationcertify').show();
          $('.rawclearcertify').hide();
          this.progressplus('rawlandnext');
        }
        
      } else {
        if(this.allfilesclearcertify.length){
          this.checkandUploadClearCerttify()
        } else {
          Swal.fire({
            title: "Info !!!",
            text: "Please upload field.",
            type: "error",
          })
        }
      }
};



localdeleteclearcertify(image)
{
  let deltFile = this.localtaxcert.find(v=>v.name == image.name);
  if(deltFile){
   this.localtaxcert.splice(this.localtaxcert.indexOf(deltFile),1)
   localStorage.setItem("clearcertify",JSON.stringify(this.localtaxcert));
  }
}



 rawclearcertifyback()
 {
   this.localstoragevalue();
   if(this.localapprcert) console.log('>',this.localapprcert);
  this.progresssub('rawlandback');
  $('.rawapprovalcertify').show();
  $('.rawclearcertify').hide();
 }
   ///////////////////////////////////////////////////////////////////////////



   checkanduploadValucationCertify()
   {
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': 'Token ' + this.jwttoken})
        };
    let body = new FormData();
    for (var i = 0; i < this.allfilesvaluecertify.length; i++) {
      let file = this.allfilesvaluecertify[i];
      body.append('_files', file);
    }
    this.spinner = true;
    body.append('fvalue', '7');  
//  this.apiservice.getPropertyImages(this.uuid,body)
this.http.post('http://ec2-34-234-215-47.compute-1.amazonaws.com/api/uploadattachment?_uat='+this.uuid,body,httpOptions)
.subscribe((data:any)=>
{
  this.toastr.success('Property Image upload','Success');
  data.extraData;
  this.spinner = false;
  var fileupload10 = data.extraData.fileUrl;

  var filelandfilename = [];

  this.allfilesvaluecertify.forEach((data,i) => {
    console.log("data",data);
    console.log(data.name);

    filelandfilename.push({
      name:data.name,
      url:fileupload10[i]
    })
  });

  localStorage.setItem("valuecertify",JSON.stringify(filelandfilename.concat(this.localvalcert)));
  console.log("data",fileupload10,data);
  $('.progresseight').hide();
  $('#rawoverviweformedit').show();
 $('.rawvaluationcertify').hide();

 this.allfilesvaluecertify=[];
this.imagesvaluecertify = [];
  this.Rawoverviewnext();
},

(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
} //For Error Response)
)
   }

   rawvaluationcertify()
   { 
     this.localstoragevalue();
     if(this.localvalcert.length)
      {
        if(this.allfilesvaluecertify.length){
          this.checkanduploadValucationCertify()
        } else {
          $('#rawoverviweformedit').show();
          $('.rawvaluationcertify').hide();
        }
        
      } else {
        if(this.allfilesvaluecertify.length){
          this.checkanduploadValucationCertify()
        } else {
          $('.progresseight').hide();
          $('#rawoverviweformedit').show();
          $('.rawvaluationcertify').hide();
          this.Rawoverviewnext();
        }
      }
    };



    localdeletevalcertify(image)
    {
      let deltFile = this.localvalcert.find(v=>v.name == image.name);
      if(deltFile){
       this.localvalcert.splice(this.localvalcert.indexOf(deltFile),1)
       localStorage.setItem("valuecertify",JSON.stringify(this.localvalcert));
      }
    }

 rawvalucationback()
 {
   this.localstoragevalue();
   if(this.localtaxcert)console.log("==>",this.localtaxcert);
  this.progresssub('rawlandback');
  $('.rawvaluationcertify').hide();
  $('.rawclearcertify').show();
 }


 
postRawProperty()
{
  this.spinner = true;
  this.localstoragevalue();
  this.step1section();
  this.AllurlData();
  const httpOptions = {
    headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Token ' + this.jwttoken})
      };

      let body = {
        "_uat":this.uuid,
        "_ptcc":this.localtitcertvalue,
        "_ccsd":this.localseedvalue,
        "_ndc":this.localduecertvalue,
        "_luc":this.locallandcertvalue,
        "_lda":this.localapprcertvalue,
        "_pttc":this.localtaxcertvalue,
        "_valc":this.localvalcertvalue,
        "_lMap":this.localmapvalue,
        "_lpic":this.localrawvalue,
        "propertyDescription":this.localdescription,
        "propertyName":this.localprojname,
        "area": parseInt(this.localacresarea),
        "unit":this.localdimunit.value,
        "acres":this.localacres,				
        "mutationRequestDto":{
          "yearOfTransfer": this.localyeardoc,
          "mutationStatus": 1 ,
          "previousOwnerName":this.localownerdata,
          "currentOwnerName":this.localcurrentownerdata,
          "propertyMutationDocument":this.localownervalue
         },

        "propertySpecs": {
          "khataNo": this.localkhata,
          "khasraNo" : this.localkhasra,
          "direction": this.localrawfacvalue,
          "specs": this.localrawfacfield
        },
        "location":{
          "latitude": this.locallatitude,
          "longitude": this.locallangitude,
          "country":'India',
          "state": this.localstate,
          "city": this.localcity,
          "district": this.localpincodedata.district,
          "pincode": this.localpincodedata.pinCode,
          "tehsil": this.localpincodedata.taluka,
          "village":this.localvillage,
          "addressLineOne":this.localaddress,
          "mapLocation":this.localmaplocation,
          "propertyDescription":this.localprojdesc
        },
      }
console.log("body",body);
this.apiservice.postRawProperty(body)
  // this.http.post("http://ec2-34-234-215-47.compute-1.amazonaws.com/api/product/raw",body,httpOptions)
  .subscribe((data:any)=>
  {
   if(data.successCode == "API_SUCCESS" && data.statusCode == 200)
  {
    this.spinner = false;
    console.log("data",data);
    Swal.fire({
      title: "Success",
      text: "Your Property has been Uploaded Successfully !!",
      type: "success",
      allowEscapeKey: false,
      allowOutsideClick: false,
      
      }).then(() => {
       this.localStorageClear();
        this.router.navigate(['/rawproperty/view',data.extraData.LAND_ID]);
     })
  }

 else if(data.exception == "FATAL_EXCEPTION")
  {
    this.spinner = false;
    Swal.fire({
      title: "Info",
      text: "Your Land has not been Uploaded Try Again !! !!",
      type: "info",
      allowEscapeKey: false,
      allowOutsideClick: false,
      
      })
      .then(() => {
        this.localStorageClear();
        window.location.reload();
           })
  } 
 
 
  // this.router.navigate(['/dashboard']);
},
(err) => {
  console.log("got error", err)
  //  self.serverDataLogin=err;
})

}

ngOnDestroy()
{
 this.localStorageClear();
  
}

   
   }
   