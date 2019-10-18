import { Component, OnInit, Input,Output,EventEmitter, OnChanges } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService,EnumdataService,PincodeService, UtilService } from '../../services';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Options,LabelType  } from 'ng5-slider';
@Component({
  selector: 'app-resfilter',
  templateUrl: './resfilter.component.html',
  styleUrls: ['./resfilter.component.scss']
})
export class ResfilterComponent implements OnInit,OnChanges { 
  @Input() propertype;      
  @Input () pagenumber:Observable<any>;  
  @Input () count:Observable<any>;

  @Output() filterdata = new EventEmitter();

  minValue:number;
  maxValue:number;
  isLoading=false;
  nearlocat;
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
  cityvalue:any;
  city:any;
  minbuiltup:any;
  maxbuiltup:any;
  mincarpet:any;
  maxcarpet:any;
  residential:any;
  operationalfloor:any;
  commfurniture:any;
  commelectronics:any;
  payconstructionphase:any;
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  spinner:any;
  rawproperties:any;
  constructor(
    private dataservice:PincodeService,
     private enumservice:EnumdataService,
     private apiservice:ApiService,
     private http:HttpClient
     ) { }

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


    ngOnChanges()
    {
      // console.log("property data",this.propertype);
      // console.log("pagenumber",this.pagenumber); 
    }

  statedata;
  ngOnInit() {
    // this.count.subscribe((data:any)=>{
    // console.log('count data',data);
    // })                                 
    this.pagenumber.subscribe((data:any)=>{
      console.log("pagenumber",data);
      this.applyFilter(data);
    })

    $('.dropdown-menu').click(function(e) {
      // console.log('ksjdksd');
         e.stopPropagation();
      });

    this.applyFilter(20);
    // this.commercialfilter(1);
    //  this.sendFilterData();
     
    this.http.get('./assets/state.json')
    .subscribe((data:any)=>
    {
      this.statedata = data;
    })


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

  }  
  // ///// end ng oninit



  minPrice = [];
  maxPrice = [];

  ApiDataResponse(e)
  {
    this.minPrice = [];
    this.maxPrice = [];
    // console.log("max",e);
  this.minPrice.push(e.value);
  // console.log("Min",this.minPrice);
  this.maxPrice.push(e.highValue);
  // console.log("Max",this.maxPrice);
  }



  statearray = [];
  togglestate(item) {
     console.log(item);
    if(!this.statearray.includes(item.name))
    this.statearray.push(item.name);
    else this.statearray.splice(this.statearray.indexOf(item.name),1)
    console.log("statearray",this.statearray);
  }


   ///////////////////////////////////// Home Appliance start

   tooglehomevalue = [];
   tooglehomeapi = [];
   homewarecountapi = [];
   tooglehome(homewaresdata,e)
   {
     this.homeappliance.forEach((homew,i) => {
       if(homew.id === homewaresdata.id){
         if(!homew.isSelected){
           // console.log('111111111111111111111');
           this.homeappliance[i].isSelected = true;
           this.addCounthome(homewaresdata);
         }
         else{
           this.homeappliance[i].isSelected = false;
           this.subCounthome(homewaresdata);
         }
       }
     });
   }
 
   addCounthome(homewaresdata){
     console.log('addCount(homewaresdata)',homewaresdata);
    this.homeappliance.forEach((app,i) => {
     if(this.homeappliance[i].id == homewaresdata.id){
        // console.log("check count",this.homewares[i].count++);
        this.homeappliance[i].count++;
        this.tooglehomevalue = this.homeappliance.filter(s=>s.isSelected == true);
        this.tooglehomeapi = this.tooglehomevalue.map(v=>v.value);
        this.homewarecountapi = this.tooglehomevalue.map(v=>v.count);
       console.log('fil',this.tooglehomeapi);
           console.log('data count',this.homewarecountapi); 
     }
   }); 
   }
 
   subCounthome(homewaresdata){
     console.log('addCount(homewaresdata)',homewaresdata);
    this.homeappliance.forEach((app,i) => {
     if(this.homeappliance[i].id == homewaresdata.id){
        // console.log();
        if(this.homeappliance[i].count == 0){} 
           else {
             this.homeappliance[i].count--;
           this.tooglehomevalue = this.homeappliance.filter(s=>s.isSelected == true);
             this.tooglehomeapi = this.tooglehomevalue.map(v=>v.value);
             this.homewarecountapi = this.tooglehomevalue.map(v=>v.count);
           console.log('fil',this.tooglehomeapi);
               console.log('data',this.tooglehomevalue);
               console.log('data count',this.homewarecountapi);
           }
           }
      });
    }
 
   /////////////////////////////////// Home Appliance End
 
 
 
    ///////////////////////////////////// Home Furniture start
 
    tooglefurnvalue = [];
    tooglefurnapi = [];
    furnwarecountapi = [];
    tooglefurniture(furnwaresdata,e)
    {
      console.log('toglle furinture');
      
      this.furniture.forEach((homew,i) => {
        if(homew.id === furnwaresdata.id){
          if(!homew.isSelected){
            // console.log('111111111111111111111');
            this.furniture[i].isSelected = true;
            this.addCountfurn(furnwaresdata);
          }
          else{
            this.furniture[i].isSelected = false;
            this.subCountfurn(furnwaresdata);
          }
        }
      });
    }
  
    addCountfurn(furnwaresdata){
      console.log('addCount(homewaresdata)',furnwaresdata);
     this.furniture.forEach((app,i) => {
      if(this.furniture[i].id == furnwaresdata.id){
         // console.log("check count",this.homewares[i].count++);
         this.furniture[i].count++;
         this.tooglefurnvalue = this.furniture.filter(s=>s.isSelected == true);
         this.tooglefurnapi = this.tooglefurnvalue.map(v=>v.value);
         this.furnwarecountapi = this.tooglefurnvalue.map(v=>v.count);
        console.log('fil',this.tooglefurnapi);
            console.log('data count',this.furnwarecountapi); 
      }
    }); 
    }
  
    subCountfurn(furnwaresdata){
      console.log('addCount(homewaresdata)',furnwaresdata);
     this.furniture.forEach((app,i) => {
      if(this.furniture[i].id == furnwaresdata.id){
         // console.log();
         if(this.furniture[i].count == 0){} 
            else {
              this.furniture[i].count--;
            this.tooglefurnvalue = this.furniture.filter(s=>s.isSelected == true);
              this.tooglefurnapi = this.tooglefurnvalue.map(v=>v.value);
              this.furnwarecountapi = this.tooglefurnvalue.map(v=>v.count);
               console.log('fil',this.tooglefurnapi);
                console.log('data count',this.furnwarecountapi);
            }
            }
       });
     }
  
    /////////////////////////////////// Home Furniture End
 
 
    ///////////////////////////////////// Home Furniture start
 
    toogleroomvalue = [];
    toogleroomapi = [];
    roomwarecountapi = [];
    tooglerooms(roomsdata,e)
    {
      console.log('toglle furinture');
      
      this.rooms.forEach((homew,i) => {
        if(homew.id === roomsdata.id){
          if(!homew.isSelected){
            // console.log('111111111111111111111');
            this.rooms[i].isSelected = true;
            this.addCountroom(roomsdata);
          }
          else{
            this.rooms[i].isSelected = false;
            this.subCountroom(roomsdata);
          }
        }
      });
    }
 
 
   commelectvalue = []; 
   commelectapi = [];
   commelectcountapi = [];
    tooglecommelectronic(electdata,e)
    {
     console.log('toglle furinture'); 
     this.commelectronics.forEach((homew,i) => {
       if(homew.id === electdata.id){
         if(!homew.isSelected){
           // console.log('111111111111111111111');
           this.commelectronics[i].isSelected = true;
           this.addCountElect(electdata);
         }
         else{
           this.commelectronics[i].isSelected = false;
           this.subCountElect(electdata);
         }
       }
     });
    }
 
 
    addCountElect(electdata){
     console.log('addCount(homewaresdata)',electdata);
    this.commelectronics.forEach((app,i) => {
     if(this.commelectronics[i].id == electdata.id){
        // console.log("check count",this.homewares[i].count++);
        this.commelectronics[i].count++;
        this.commelectvalue = this.commelectronics.filter(s=>s.isSelected == true);
        this.commelectapi = this.commelectvalue.map(v=>v.value);
        this.commelectcountapi = this.commelectvalue.map(v=>v.count);
       console.log('fil',this.commelectapi);
           console.log('data count',this.commelectcountapi); 
     }
   }); 
   }
 
   subCountElect(electdata){
     console.log('addCount(homewaresdata)',electdata);
    this.commelectronics.forEach((app,i) => {
     if(this.commelectronics[i].id == electdata.id){
        if(this.commelectronics[i].count == 0){} 
           else {
             this.commelectronics[i].count--;
           this.commelectvalue = this.commelectronics.filter(s=>s.isSelected == true);
             this.commelectapi = this.commelectvalue.map(v=>v.value);
             this.commelectcountapi = this.commelectvalue.map(v=>v.count);
              console.log('fil',this.commelectapi);
               console.log('data count',this.commelectcountapi);
           }
           }
      });
    }
 
 
 
 
 
    
    officefloorvalue = [];
    officefloorapi = [];
    officecountapi= [];
    togglecommfloor(roomsdata,e)
    {
     console.log('toglle furinture'); 
     this.operationalfloor.forEach((homew,i) => {
       if(homew.id === roomsdata.id){
         if(!homew.isSelected){
           // console.log('111111111111111111111');
           this.operationalfloor[i].isSelected = true;
           this.addCountFloor(roomsdata);
         }
         else{
           this.operationalfloor[i].isSelected = false;
           this.subCountfloor(roomsdata);
         }
       }
     });
    }
 
 
    addCountFloor(roomsdata){
     console.log('addCount(homewaresdata)',roomsdata);
    this.operationalfloor.forEach((app,i) => {
     if(this.operationalfloor[i].id == roomsdata.id){
        // console.log("check count",this.homewares[i].count++);
        this.operationalfloor[i].count++;
        this.toogleroomvalue = this.operationalfloor.filter(s=>s.isSelected == true);
        this.officefloorapi = this.toogleroomvalue.map(v=>v.value);
        this.officecountapi = this.toogleroomvalue.map(v=>v.count);
       console.log('fil',this.officefloorapi);
           console.log('data count',this.officecountapi); 
     }
   }); 
   }
 
   subCountfloor(roomsdata){
     console.log('addCount(homewaresdata)',roomsdata);
    this.operationalfloor.forEach((app,i) => {
     if(this.operationalfloor[i].id == roomsdata.id){
        if(this.operationalfloor[i].count == 0){} 
           else {
             this.operationalfloor[i].count--;
           this.officefloorvalue = this.operationalfloor.filter(s=>s.isSelected == true);
             this.officefloorapi = this.officefloorvalue.map(v=>v.value);
             this.officecountapi = this.officefloorvalue.map(v=>v.count);
              console.log('fil',this.officefloorapi);
               console.log('data count',this.officecountapi);
           }
           }
      });
    }
 
  
    addCountroom(roomsdata){
      console.log('addCount(homewaresdata)',roomsdata);
     this.rooms.forEach((app,i) => {
      if(this.rooms[i].id == roomsdata.id){
         // console.log("check count",this.homewares[i].count++);
         this.rooms[i].count++;
         this.toogleroomvalue = this.rooms.filter(s=>s.isSelected == true);
         this.toogleroomapi = this.toogleroomvalue.map(v=>v.value);
         this.roomwarecountapi = this.toogleroomvalue.map(v=>v.count);
        console.log('fil',this.toogleroomapi);
            console.log('data count',this.roomwarecountapi); 
      }
    }); 
    }
  
    subCountroom(roomsdata){
      console.log('addCount(homewaresdata)',roomsdata);
     this.rooms.forEach((app,i) => {
      if(this.rooms[i].id == roomsdata.id){
         if(this.rooms[i].count == 0){} 
            else {
              this.rooms[i].count--;
            this.toogleroomvalue = this.rooms.filter(s=>s.isSelected == true);
              this.toogleroomapi = this.toogleroomvalue.map(v=>v.value);
              this.roomwarecountapi = this.toogleroomvalue.map(v=>v.count);
               console.log('fil',this.toogleroomapi);
                console.log('data count',this.roomwarecountapi);
            }
            }
       });
     }
  
    /////////////////////////////////// Home Furniture End
 

    facingarray = [];
    facingcheck(data)
    {
      if(!this.facingarray.includes(data.value))
      this.facingarray.push(data.value);
      else{
        this.facingarray.splice(this.facingarray.indexOf(data.value),1);
      }
       console.log('data',this.facingarray);
    }

   
    commfloorapidata=0;
  floorapidata = [];
  floorapi:any;
  togglefloor(e)
  {  
    this.floorapi = e.target.value;
    if(this.floorapi == "Ground Floor")
    {
     this.floorapidata = [0];
     this.commfloorapidata = 0;
    }
    else
    {
     this.floorapidata =  [parseInt(this.floorapi)];
     this.commfloorapidata = this.floorapi;

    }
    console.log("togglefloor",this.floorapi,this.floorapidata);
  }

  facilityarray = [];
  tooglefacilities(data)
  {
    if(!this.facilityarray.includes(data.value))
    this.facilityarray.push(data.value);
    else{
      this.facilityarray.splice(this.facilityarray.indexOf(data.value),1);
    }
     console.log('data',this.facilityarray);
  }

  roomsbhk = [];

  tooglebhk(data,e)
  {
   if(!this.roomsbhk.includes(data.value))
   this.roomsbhk.push(data.value);
   else{
     this.roomsbhk.splice(this.roomsbhk.indexOf(data.value),1);
   }
    console.log('data',this.roomsbhk);
  }

  propertysalearray = []
  setproperty(data,e)
  {
    if(!this.propertysalearray.includes(data.value))
    this.propertysalearray.push(data.value);
    else{
      this.propertysalearray.splice(this.propertysalearray.indexOf(data.value),1);
    }
     console.log('data',this.propertysalearray);
  }

  residentialtype = [];
  Residentialfor(data,e)
  {
    if(!this.residentialtype.includes(data.value))
    this.residentialtype.push(data.value);
    else{
      this.residentialtype.splice(this.residentialtype.indexOf(data.value),1);
    }
     console.log('data',this.residentialtype);

  }




  marketarray = [];
  setmarket(data,e)
  {
    if(!this.marketarray.includes(data.value))
    this.marketarray.push(data.value);
    else{
      this.marketarray.splice(this.marketarray.indexOf(data.value),1);
    }
     console.log('data',this.marketarray);
  }


  ceilingstatus=[];

  toogleceiling(data,e)
  {
    if(!this.ceilingstatus.includes(data.value))
    this.ceilingstatus.push(data.value);
    else{
      this.ceilingstatus.splice(this.ceilingstatus.indexOf(data.value),1);
    }
     console.log('data',this.ceilingstatus);
  }

  
  flooringstatus = [];
  toogleflooring(data,e)
  {
    if(!this.flooringstatus.includes(data.value))
    this.flooringstatus.push(data.value);
    else{
      this.flooringstatus.splice(this.flooringstatus.indexOf(data.value),1);
    }
     console.log('data',this.flooringstatus);
  }

  furnishingstatus = [];

  tooglefurnishing(data,e)
  {
   if(!this.furnishingstatus.includes(data.value))
   this.furnishingstatus.push(data.value);
   else{
     this.furnishingstatus.splice(this.furnishingstatus.indexOf(data.value),1);
   }
    console.log('data',this.furnishingstatus);
  }
  


  RemovefilterArea()
  {
    $('.buy-filter').hide();
  }



  cityarray = [];
  minbuiltarray = [];
  maxbuiltarray = [];
  mincarpetarray = [];
  maxcarpetarray = [];

  filterProperty:any;
  getFilterreddata(size){
    return new Promise((resolve, reject)=>{
    this.cityarray = [];
    this.minbuiltarray = [];
    this.maxbuiltarray = [];
    this.mincarpetarray = [];
    this.maxcarpetarray = [];
    
    if(this.city)       this.cityarray = [(this.cityvalue)];
    if(this.minbuiltup)  this.minbuiltarray.push(this.minbuiltup);
    if(this.maxbuiltup)  this.maxbuiltarray.push(this.maxbuiltup);
    if(this.mincarpet)   this.mincarpetarray.push(this.mincarpet);
    if(this.maxcarpet)  this.maxcarpetarray.push(this.maxcarpet);

    let body =
    {
        "state": this.statearray,
        "city": this.cityarray.length ?  this.cityarray : [],
        "saleType": this.propertysalearray,
        "areaUnit": [],
        "assetType": [],
        "assetCategory" : this.residentialtype,
        "furnishing" : this.furnishingstatus,
        "facilities" : this.facilityarray,
        "roomCount":[{
          "roomType":this.toogleroomapi,
          "roomCount":this.roomwarecountapi
        }],
        "furniture": [{
          "furnitureType": this.tooglefurnapi,
		      "furnitureCount": this.furnwarecountapi
        }] ,
        "homeAppliances":[{
          "applianceType" : this.tooglehomeapi,
		      "applianceCount": this.homewarecountapi
        }],
        "flats":{
          "floor": this.floorapidata,
          "bhks": this.roomsbhk
        },
        "ceilingAndFlooring": {
          "cealing":this.ceilingstatus,
		     "flooring":this.flooringstatus
        },
	      "bedrooms":[],
        "bathrooms":[],
        "kitchen": [],
        "serventroom":[],
        "poojaroom":[],
        "storeroom":[],
        "studyroom":[],
        "livingroom":[],	
        "diningroom":[],
         "balcony":[],
        "frontyard":[],
        "backyard":[],
        "basement":[],
        "facing": this.facingarray ,
        "minCarpetArea":this.mincarpetarray,
        "maxCarpetArea":this.maxcarpetarray,
        "minBuiltUpArea":this.minbuiltarray,
        "maxBuiltUpArea": this.maxbuiltarray,
        "minPrice": this.minPrice,
        "maxPrice": this.maxPrice
  }

console.log('body',body);

  this.apiservice.postResFilterProperty(size,body)
  .subscribe((data:any)=>{
    resolve(data)
  },(err)=>{reject(err)})
  })
  };
  
  async applyFilter(size){
    try {
      this.isLoading = true;
      $(window).scrollTop({scrollTop:0}, 5000);
    let residentialdata = await this.getFilterreddata(size)
    let commercialdata = await this.getcommercialdata(size)
    // let industrialdata = await this.getcommercialdata(page,size)
    // let agriculture = await this.getcommercialdata(page,size)   
    this.isLoading = false;
    this.filterdata.emit({residentialdata,commercialdata});
    } catch (error) {
    console.log('=>',error);
    this.isLoading = false;
    }
  };
  


getcommercialdata(size){
  return new Promise((resolve, reject)=>{
  let body = 
  {
    "state": this.statearray,
    "city": this.cityarray.length ?  this.cityarray : [],
    "saleType": this.propertysalearray,
    "areaUnit": [],
    "assetType": [],
    "assetCategory" : this.residentialtype,
    "furnishing" : this.furnishingstatus,
    "facilities" : this.facilityarray,
    "propertyType": [],
    "facing": this.facingarray,
    "minTotalArea":[],
    "maxTotalArea":[],
    "minAdministrativeArea": [],
    "maxAdministrativeArea": [],
    "minOperationalArea": [],
    "maxOperationalArea": [],
    "maxViews": [],
    "minViews": [],
    "minPrice": [],
    "maxPrice": [],
    "numberOfFloors": 0 ,
    "floorNumber": 0 ,
    "possession": -1 ,
    "constructionPhase": -1,
    "furniture": [{}],
    "basicUtilities": [{}]
  }
  
  this.apiservice.postCommFilterProperty(size,body)
  .subscribe((data:any)=>{
    resolve(data)
  },(err)=>{reject(err)})
  })
}

//  sendFilterData()
  // {
  //   switch(this.propertype){ 
  //     case 'RESIDENTIAL':
  //     this.filterdata.emit(this.filterProperty);
  //      break;
  //     case 'COMMERCIAL':
      
  //      break;
  //     //  case 'INDUSTRIAL':
  //     //  this.filterdata.emit(this.)  
  //   }
  // }





}
