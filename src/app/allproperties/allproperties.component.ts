import { Component, OnInit,ChangeDetectorRef,ViewChild, ElementRef, NgZone } from '@angular/core';
import { Options,LabelType  } from 'ng5-slider';
import * as $ from 'jquery';
import {  } from '../services/pincode.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService,EnumdataService,PincodeService, UtilService } from '../services';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allproperties',
  templateUrl: './allproperties.component.html',
  styleUrls: ['./allproperties.component.scss']
})
export class AllpropertiesComponent implements OnInit {
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
  rooms:any;
  bhk:any;
  propertyfor:any;
  market:any;
  facingside:any;
  homeappliance:any;
  facilities:any;
  furniture:any;
  propertyfloor:any;

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
  dropdownSettings = {};
  cityvalue:any;
  minbuiltup:any;
  maxbuiltup:any;
  mincarpet:any;
  maxcarpet:any;
  residential:any;
  operationalfloor:any;
  commfurniture:any;
  commelectronics:any;


  carouselItems =[];
  carouselItemsView = [];
  fullname:any;
  @ViewChild("search") searchElementRef: ElementRef;
  public evenSubject:Subject<any>=new Subject<any>();

  constructor(private utilService:UtilService, private toastr: ToastrService, private enumservice:EnumdataService,private http: HttpClient,private router: Router,private route: ActivatedRoute, private cdr: ChangeDetectorRef,  private dataservice:PincodeService,private apiservice:ApiService) { 
    this.fullname = localStorage.getItem("fullname");

    toastr.toastrConfig.preventDuplicates=true;

  }    

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
 

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: false
    };


    this.getRecentlyUploaded(0);
    // this.commercialfilter(1) 
    this.getTopRawLandUploaded();

    this.dataservice.getFacilities().subscribe((data:any)=>
    {
      this.nearlocat = data[13].NEARLOCATION;
      this.flooring = data[6].FLOORING;
      this.ceiling = data[7].CEILING;
      this.kitchentype = data[12].KITCHENTYPE;
      this.bathroom = data[11].BATHROOMTYPE;
      this.furnishing = data[1].FURNISHING;
      this.payconstructionphase = data[27].PAYCONSTRUCTIONPHASE;
      this.rooms = data[46].FILTERROOMS;
      this.bhk = data[14].BHK;
      this.propertyfor = data[32].PROPERTYFOR;
      this.market = data[8].MARKET;
      this.facingside = data[37].FACING;
      this.homeappliance = data[44].ALLHOMEAPPLIANCE;
      this.facilities = data[45].ALLFACILITIES;
      this.furniture = data[0].FURNITURE;
      this.propertyfloor = data[26].PROPERTYFLOOR;
      this.residential = data[2].RESIDENTIAL;
      this.operationalfloor = data[47].OPERATIONALFLOOR
      this.commfurniture = data[48].COMMFURNTIURE
      this.commelectronics = data[49].COMMELECTRONICS;
      // this.commercial = data[3].COMMERCIAL;
      // this.industrial = data[4].INDUSTRIAL;
      // this.agriculture = data[5].FARMING;
      console.log("property Facilities data",this.nearlocat);
    });

    this.searchControl = new FormControl();
    this.getResidentialdata(1);

  }

  filternotavail = false;
  

  recentview:ReplaySubject<Array<any>>= new ReplaySubject<Array<any>>()

  arraypage = [];
   
getRecentlyUploaded(page)
{
 
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
        // 
        console.log('arraypage',this.arraypage);

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


         this.recentProperties[i].pricing.assetConstructionPhase = this.enumservice.kytname.get(this.recentProperties[i].pricing.assetConstructionPhase);
         this.recentProperties[i].residentialStructuralDocument.propertyFacing = this.enumservice.kytname.get(this.recentProperties[i].residentialStructuralDocument.propertyFacing);
        //  this.recentProperties[i].prebuiltAssetType = this.enumservice.kytname.get(this.recentProperties[i].prebuiltAssetType);

     if(this.recentProperties[i].residentialStructuralDocument.flats)
    {
      this.recentProperties[i].residentialStructuralDocument.flats.bhks = this.enumservice.kytname.get(this.recentProperties[i].residentialStructuralDocument.flats.bhks);

    }

     });

      console.log("check======>?????????????", this.carouselItems);
      console.log("propertyId",this.propertyId)
      }
      else(data.exception === "NO_RECORDS_FOUND")
      {
       this.isLoading = false;
      }},
     (err) => {
       console.log("got error", err)
       //  self.serverDataLogin=err;
     } //For Error Response)
)};

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
          this.rawproperties[i].marketplace = this.enumservice.kytname.get(this.rawproperties[i].marketplace);


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


  filterArea()
  {
    $('.buy-filter').show();
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
        k == 127;   //Delete
    if (!ok) {
        e.preventDefault();
    }
  }


  contactstate(e)
  {
    this.statevalue = e.target.value;
    console.log(this.statevalue);
    
  }

  // onFilterChange(event)
  // {
  //   console.log("event",event);
  
  
  // }

  // roomsarray = [];

  // tooglerooms(data,e)
  // {
  //  if(!this.roomsarray.includes(data.value))
  //  this.roomsarray.push(data.value);
  //  else{
  //    this.roomsarray.splice(this.roomsarray.indexOf(data.value),1);
  //  }
  //   console.log('data',this.roomsarray);
  // }


  propertype:any='RESIDENTIAL';
  
  residentialtab:boolean= true;
  Propertycheck(propertype)
  {
  this.propertype = propertype;
  console.log('propertype',propertype,this.propertype);
  }


  pagenumber:number=0;
  applyFilter(data)
  {
     console.log(data);
  this.pagenumber = data;
  this.evenSubject.next(this.pagenumber)
  }


  size = 20;
  loadMore(size)
  { 
     this.size += size;
    console.log('check count',size,this.size);
    this.evenSubject.next(this.size)
  }


  ///////   get residential api from child
  filterProperty=[];
  commercialprop=[];

  commpaginat:any;

  getResidentialdata(data)
  {
    console.log(data);
    let residentialfilter = data.residentialdata;

    let commercialFilter = data.commercialdata;
    if(residentialfilter.successCode==="PROPERTY_RETRIVED" && residentialfilter.statusCode==200)
    {
     this.filterProperty = residentialfilter.extraData.PROPERTIES;
      
      this.filterProperty.forEach((data,i) => {
        this.propertyId = data.propertyId
        this.filterProperty[i].furnishing = data.furnishing.replace('_',' ');
        this.filterProperty[i].createdAt = this.formatDate(new Date(data.createdAt));
        this.filterProperty[i].pricing.assetConstructionPhase = this.enumservice.kytname.get(this.filterProperty[i].pricing.assetConstructionPhase);
        this.filterProperty[i].residentialStructuralDocument.propertyFacing = this.enumservice.kytname.get(this.filterProperty[i].residentialStructuralDocument.propertyFacing);
       //  this.recentProperties[i].prebuiltAssetType = this.enumservice.kytname.get(this.recentProperties[i].prebuiltAssetType);

    if(this.filterProperty[i].residentialStructuralDocument.flats)
   {
     this.filterProperty[i].residentialStructuralDocument.flats.bhks = this.enumservice.kytname.get(this.filterProperty[i].residentialStructuralDocument.flats.bhks);
   }
    });
      console.log("filter",this.filterProperty);
    }

    else if(residentialfilter.exception == "NO_RECORDS_FOUND")
    {
      this.filternotavail ? true : false;
         console.log('ok no data found');
    }
    
    if(commercialFilter.successCode == "PROPERTY_RETRIVED" &&  commercialFilter.statusCode == 200)
    {
       this.commercialprop = data.commercialdata.extraData.PROPERTIES;
      this.commercialprop.forEach((data,i) => {         
        this.commercialprop[i].createdAt = this.formatDate(new Date(data.createdAt));    
       });
       console.log('commercial>',this.commercialprop);
    }
    else if(commercialFilter.exception == "NO_RECORDS_FOUND")
    {
       console.log("No Data Found");
      this.filternotavail ? true : false;
    }
  }



  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
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
    
    if(!this.name || !this.mobileNo || !this.email || !this.city || !this.statevalue)
    {
      this.spinner = false;
      this.toastr.info('Please complete Input Field','Incomplete');
    }
    else if(!reg.test(this.email))
    {
      this.spinner = false;
      this.toastr.info('Please Fill Valid Email Address','Invalid Email Address !!');
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


  fromdashboard()
  {
    console.log('ok');
    this.utilService.routedsellproperty = true;
    localStorage.setItem("showcontact","true");
  }      


}
