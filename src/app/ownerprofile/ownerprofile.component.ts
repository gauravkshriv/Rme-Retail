import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import {ApiService} from '../services/api.service';
import { Options,LabelType  } from 'ng5-slider';
import {EnumdataService} from '../services/enumdata.service';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { interval } from 'rxjs';
import { Observable, Subscriber } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
 import * as $ from 'jquery';
declare var $ :any; 
import {User} from '../services/user.model';
import { UtilService } from '../services';
import Swal from 'sweetalert2';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-ownerprofile',
  templateUrl: './ownerprofile.component.html',
  styleUrls: ['./ownerprofile.component.scss']
})
export class OwnerprofileComponent implements OnInit {
  isLoading=false;
  uuid:any; 
  searchControl:any;
  minValue:number;
  maxValue:number;
  jwttoken:any;
  residproperty:any;
  commproperty:any;
  user = new User();
  country:any = 0;
  registerdata=[];

  tabledata:any[]=[];

  arraynum1:Array<any> = [];

  alldata:string[] = ['dev', 'Developer','man', 'Manager','dir', 'Director'];

  default: string = 'Select Country';

  @ViewChild ('propert') propertydata:ElementRef;

  constructor( private el:ElementRef, private utilservice:UtilService, private enumservice:EnumdataService, private http: HttpClient , private apiservice:ApiService, private ngZone: NgZone) { 
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
   this.registerdata = JSON.parse(localStorage.getItem('uservalue'));


    const  o = interval(1000).pipe(
      map(value => value * value),
      filter(value => value % 2 === 0)
    );
    o.subscribe(
      // (value)=> console.log(value)
    );    
  }

  settings = {  
    actions: {
      custom: [
        { name: 'INFO', title: '<i class="fa fa-info-circle" title="More Info"></i>' },
        { name: 'EDIT', title: '<i class="fa fa-edit" title="edit & update"></i>' },
        { name: 'DELETE', title: '<i class="fa fa-trash" title="Delete"></i>' },
      ],
      add: false,
      edit:false,
      delete:false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  

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
  
  ngOnInit() {
   
    // console.log('arraynum',this.arraynum);

    console.log('arraynum1',this.arraynum1);

    
    this.tabledata = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv"
      },
      
      // ... list of items
      
      {
        id: 11,
        name: "Nicholas DuBuque",
        username: "Nicholas.Stanton",
        email: "Rey.Padberg@rosamond.biz"
      }
    ];

    this.getStateData();
    this.userResProperty(this.uuid);
    this.userCommProperty(this.uuid);
    this.minValue = 10000;
    this.maxValue = 50000000;
    
    console.log('registerdata',this.registerdata);
    
    if(this.registerdata)
    {
      this.registerdata.forEach(data => {
        this.user = data;
      });
    }
    
  //  this.propertydata.nativeElement.style.color = 'blue';
  }

  

  onCustom(e){
    console.log(e);
    if(e.action === 'DELETE'){
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#ff386a',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: "No, cancel it!",
        allowEscapeKey:false,
        showLoaderOnConfirm: true,
        preConfirm: () => {
        //  return this.apiServices.deleteProject(e.data.projectID)
        }
      }).then(result=>{
        console.log(result);
        
      })
    } 
  }



  togglestate(e)
  {
    console.log("state",e.target.value);
  }

  statedata:any;
  getStateData()
  {
    this.http.get('../assets/state.json')
    .subscribe((data:any)=>
    {
      this.statedata = data;
      console.log("data",this.statedata);
    },
    (err) => {
      console.log("got error", err)
      //  self.serverDataLogin=err;
    } //For Error Response)
  
    )
  };


  userResProperty(uuid)
  {
    this.isLoading = true;
  this.apiservice.getUserResProperties(uuid)
    .subscribe((data:any)=>
      {
        if(data.statusCode == 200 && data.successCode == "PROPERTY_RETRIVED")
        {
          this.isLoading = false;
          console.log("data",data);
          this.residproperty = data.extraData.Property_Listing;
  
          this.residproperty.forEach((v,i) => {
            this.residproperty[i].furnishing = this.enumservice.kytname.get(v.furnishing)
          });
          console.log("single properties",this.residproperty.properties);
        }
      },
      (err) => {
        console.log("got error", err)
        //  self.serverDataLogin=err;
      } //For Error Response)
      )
    };  


  userCommProperty(uuid)
  {
    this.isLoading = true;
  this.apiservice.getUserCommProperties(uuid)
    .subscribe((data:any)=>
      {
        if(data.statusCode == 200 && data.successCode == "API_SUCCESS")
        {
        this.isLoading = false;
        console.log("data",data);
        this.commproperty = data.extraData.commercialAsset;

        this.commproperty.forEach((v,i) => {
          this.commproperty[i].furnishing = this.enumservice.kytname.get(v.furnishing)
        });
        console.log("single properties",this.commproperty);
      }
      },
      (err) => {
        console.log("got error", err)
        //  self.serverDataLogin=err;
      } //For Error Response)
    
      )
    }; 



    register(user)
    {
 
   console.log('user',user);
   this.utilservice.setLocal(user);
    }

    countrydata(data)
    {
      console.log('e',data);
      
    }

}
