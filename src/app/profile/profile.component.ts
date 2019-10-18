import { Component, OnInit,ChangeDetectorRef,ViewChild, ElementRef, NgZone } from '@angular/core';
import { Options,LabelType  } from 'ng5-slider';
import * as $ from 'jquery';
declare var $ :any;
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService,EnumdataService,PincodeService,RME_URL_MAPPING } from '../services';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import {Encryptor} from '../services/encryption.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  lod1:any;
  imageUrl : string  = "./assets/images/default_profile.png";
  isLoading=false;
  page:any;
  selectedFile:null;
  recentProperties:any;
  propertyId:any;
  username:any;
  profileimage:any;
  uuid:any;
  profiledata:any;
  sessiontoken:any;
  jwttoken:any;
  marketupload:any;
  Picstatus:any;
  constructor( private encryptor: Encryptor,private enumservice:EnumdataService,private http: HttpClient,private router: Router,private route: ActivatedRoute, private cdr: ChangeDetectorRef,  private dataservice:PincodeService,private apiservice:ApiService)
   {
    this.username= localStorage.getItem("username");
    this.uuid= localStorage.getItem("uuid");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.jwttoken = localStorage.getItem("jwttoken");
   }

  ngOnInit() {
    this.GetUSer();
  this.getUseruuid();

  this.dataservice.getFacilities().subscribe((data:any)=>
  {
    this.marketupload = data[35].MARKETUPLAD;
    console.log("property data",this.marketupload);
    // this.step1Section();

  });
  }



  activestatus(id)
  {
    console.log("id",id)
    $("#dashboard_sec").removeClass("active");
    $("#prop_sec").removeClass("active");
    $("#profile_sec").removeClass("active");
    $("#"+id).addClass("active")
  }
  

  addProperty()
  {
    $('#uploadmodal').modal('show');
  }


  setproperty(propdata,e)
  {
    // localStorage.removeItem('uploadproperty');
    $('#uploadmodal').modal('hide');
    let market = e.target.value;
    if(market == "Raw Land")
    {
      this.router.navigate(['/sell-rawland']);
    
    }
    else{
      this.router.navigate(['/sell-property']);
    }
    console.log("==>",propdata,e.target.value);
  }



    getuserdata:ReplaySubject<any> = new ReplaySubject<any>();


    GetUSer() {
      if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
      {
        localStorage.clear();
        console.log("not working");
      }
      else{
        this.isLoading = true;
        const httpOptions = {
          headers: new HttpHeaders({
             'Content-Type':  'application/json',
             'Authorization': 'Token ' + this.jwttoken})
            };
        let body = {
          'uuid': this.uuid,
          "sessionToken": this.sessiontoken
        };
        this.apiservice.getuserdata(body)
       .subscribe(
       (data) => {
        this.isLoading=false;
           this.profiledata = data;
           this.getuserdata.next(data);
           console.log("=============================>",this.profiledata)
           localStorage.setItem("fullname", this.profiledata.fullname);
      
          
          // console.log('tempArray',occup);
          //  this.occ = this.profiledata._occ.split(",");
          //  console.log("=====occupatoin",this.occ);
  
           if (this.profiledata.profilepicture !=  null) {
            localStorage.setItem("ProfilePicStatus", "true");
            this.Picstatus = true;}
            else
            {
              localStorage.setItem("ProfilePicStatus", "false");
              this.Picstatus = false;
            }
  
            if (this.profiledata.firstname === null) {
              Swal.fire({
                title: "Thank You!!!",
                text: "Please complete information Detail on our Portal.",
                type: "success",
                // button: false,
                allowOutsideClick: false
              })
                .then(() => {
                  this.SendLoadData();
                });
              // console.log("get full name--> if condition")
            }
    else
    {
           
        } }, //For Success Response
             (err) => {
             console.log("got error",err)
            //  self.serverDataLogin=err;
           } //For Error Response
         );
  }
  
    }



    SendLoadData() {
      var dataencript = [
        { jwttoken: localStorage.getItem("jwttoken") },
        { uuid: localStorage.getItem("uuid") },
        { sessiontoken: localStorage.getItem("sessiontoken") }
      ]
      let enc = this.encryptor;
      var ciphertext = (enc.encrypt(JSON.stringify(dataencript)));
      window.location.href = RME_URL_MAPPING.account +'/kycdetails?referral=rmeretail&&redirect=http://commtest.rmehub.in.s3-website.us-east-2.amazonaws.com/login&&_ct=' + btoa(ciphertext);
      // console.log("=======================>ciphertext", ciphertext);
    }
   
    uuiddata:any;

    getUseruuid()
    {
      let uuid = ["1c02be32-3d3a-4547-a366-0c81def4508f","00d08a6c-88be-4ae3-88cf-0eb066513479","569c96af-23f5-4bea-88cb-25076307d50c"];
     
      let body = 
      {
         'uuid':uuid,
         'email':[],
         'username':[]
      }
    console.log("body",body);
      this.http.post('http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/getvalid/invalid/user',body)
      .subscribe((data:any)=>
      {
        console.log("data",data);
        this.uuiddata= data.extraData.dto.validUUID;
        console.log("data",this.uuiddata);
        let useridlist = Object.keys(this.uuiddata);
        console.log("=>",useridlist);

        useridlist.forEach(data => {
        
         console.log(">>", this.uuiddata[data]);
          
        });
      })
    }


}
