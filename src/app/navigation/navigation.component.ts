import { Component, OnInit ,ViewChild, ElementRef, NgZone, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $ :any; 
import Swal from 'sweetalert2';
import { MapsAPILoader } from '@agm/core';
import { ApiService,PincodeService,UtilService,RME_URL_MAPPING } from '../services';
import {Encryptor} from '../services/encryption.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  close_navi:boolean;
   uuid:any;
   zoom: number=1
   latitude: number;
   longitude: number;  
   jwttoken:any;
   sessiontoken:any;
   username:any;
   fullname:any;
   profiledata:any;
   serverData:any;
   occupation:any;
   stateprop:any;
   state:any;
   kycstatus:any;
   showkyc:any;
   show: boolean = localStorage.getItem("userLoginStatus")  == "true" ? true : false;
   showprofile: boolean = localStorage.getItem("userLoginProfile") == "true" ? true : false;
  constructor( private encryptor: Encryptor, private utilservice:UtilService, private dataservice:PincodeService, private apiservice:ApiService, private router: Router,private http: HttpClient) {
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.fullname = localStorage.getItem("fullname");
    this.username = localStorage.getItem("username");
    this.occupation = localStorage.getItem("occupation");

    this.kycstatus = localStorage.getItem("kycstatus");
    
    this.state = localStorage.getItem("state");  

    console.log("landowner",this.occupation);
   }
   

   


  ngOnInit() {

    this.ValidateLogin();
    this.GetUSer();
console.log('GetUSer');

    this.router.events.subscribe(() => {
      this.closeNav();
    });

    $(".routlet_sec").click(function() {
      let wid=$('#mySidenav').width();
      if(wid==280){
          $('#mySidenav').width(0);
       }
       });
       
    if(localStorage.getItem("Userdetails"))
    {
      if(localStorage.getItem("fullname") === 'null'){
        swal({
          title:"Thank You!!!",
          text: "Please complete information Detail on our RME Portal.",
          icon: "success",
          buttons: {
            cancel: {
              text: "Cancel",
              value: false,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm: {
              text: "Complete Information",
              value: true,
              visible: true,
              className: "",
              closeModal: true,
            }
            
          },
          // button: false,
          //closeOnClickOutside: false
        }) .then(data => {
          console.log("data Authentication  error ",data)
          if(data)
          this.SendLoadData(); 
          else{
              this.router.navigate(['/dashboard'],{replaceUrl:true});
            }
        });
      }
      else if(localStorage.getItem("kycstatus") === 'PENDING' || localStorage.getItem("kycstatus") === 'ERROR'){
        console.log("no data to auth");
        swal({
          title:"Thank You!!!",
          text: "Please complete KYC Detail on our RME Portal.",
          icon: "success",
          buttons: {
            cancel: {
              text: "Cancel",
              value: false,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm: {
              text: "Complete KYC",
              value: true,
              visible: true,
              className: "",
              closeModal: true,
            }
            
          },
          // button: false,
          //closeOnClickOutside: false
        }) .then(data => {
          console.log("data Authentication  error ",data)
          if(data)
          this.SendDataKyc(); 
          else{
              this.router.navigate(['/dashboard'],{replaceUrl:true});
            }
        });
      }
    }
   

 


    // if(this.kycstatus == null)
    // {
    //  this.SendDataKyc();
    // }

 

      this.dataservice.getFacilities().subscribe((data:any)=>
    {
      this.stateprop = data[34].PROPERTYINSTATE;
      // console.log("property data",this.stateprop);
      // this.step1Section();

    });
      
  }


   

  openNav() {
    $('#mySidenav').css('width','280')
    console.log("open nav");
    }

  closeNav() {
    $('#mySidenav').css('width','0');
    // console.log("close nav")
  }

  

  SendLoadData() {
    var dataencript = [
      { jwttoken: localStorage.getItem("jwttoken") },
      { uuid: localStorage.getItem("uuid") },
      { sessiontoken: localStorage.getItem("sessiontoken") }
    ]
    let enc = this.encryptor;
    var ciphertext = (enc.encrypt(JSON.stringify(dataencript)));
    window.location.href = RME_URL_MAPPING.account +'/personalinformation?referral=rmeretail&&redirect=https://retail.rmehub.in/login&&_ct=' + btoa(ciphertext);
    // console.log("=======================>ciphertext", ciphertext);
  }

  SendDataKyc() {
    var dataencript = [
      { jwttoken: localStorage.getItem("jwttoken") },
      { uuid: localStorage.getItem("uuid") },
      { sessiontoken: localStorage.getItem("sessiontoken") }
    ]
    let enc = this.encryptor;
    var ciphertext = (enc.encrypt(JSON.stringify(dataencript)));
    window.location.href = RME_URL_MAPPING.account +'/kycdetails?referral=rmeretail&&redirect=https://retail.rmehub.in/login&&_ct=' + btoa(ciphertext);
    // console.log("=======================>ciphertext", ciphertext);
  }


  datacheck = () =>{

  }

  needAnalysis()
  {
    if(localStorage.getItem("Userdetails") == null &&
    localStorage.getItem("jwttoken") == null &&
    localStorage.getItem("sessiontoken") == null)
    {
      Swal.fire({
        title:"Authentication Error!!!",
        text: "Kindly Login to view this page",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now'
      }).then(data => {
        console.log("data Authentication  error ",)
        if(data.value)
        {
        window.location.href = RME_URL_MAPPING.account + '/?referral=rmeretail&returnUrl='+this.router.url;
        // window.location.href="http://accounttest.s3-website.us-east-2.amazonaws.com/?referral=rmeretail,";
        }  
        });
        
       
    } else{
     this.router.navigate(['/need-analysis']);
    }
  
  }



 

  Logout()
  {
    let body = {
      'uuid': this.uuid,
      "sessionToken": this.sessiontoken
    };
    console.log("this is------>", body)

    var self = this;
    this.apiservice.LogOutPortal(body)
      .subscribe(
        (data) => {
          
          this.show = false;
          this.utilservice.Logout(data);
        });
  }



  statepropfilter(e,state)
  {
    console.log("e",e.target.value,state.name);
  }



  loginRoute()
  {
      window.location.href=RME_URL_MAPPING.account +'/?referral=rmeretail&returnUrl='+this.router.url;
   }
  
  GetUSer() {
    if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
    {
      localStorage.clear();
      console.log("not working");
    }
    else{
      let body = {
        'uuid': this.uuid,
        "sessionToken": this.sessiontoken
      };
        this.apiservice.getuserdata(body)
          .subscribe(
            (data) => {
              this.profiledata = data;
              // console.log('this.profiledata',this.profiledata);
              
              // console.log("=============================>", this.profiledata);
              localStorage.setItem('email',this.profiledata.email);
              if (this.profiledata.firstname == null) {
                localStorage.setItem("userLoginProfile", "true");
                this.showprofile = true;
                console.log('profile',this.showprofile);
                
              }
               else if (this.profiledata._kst == "PENDING")  {
                //  localStorage.setItem("kycstatus", "true");
                 this.showkyc = true;
               }
              
              
            }, //For Success Response
            (err) => {
              console.log("got error", err)
              //  self.serverDataLogin=err;
            } //For Error Response
          );
      }
    };
  


  
  ValidateLogin()
	{
		const httpOptions = {
			headers: new HttpHeaders({
				 'Content-Type':  'application/json',
				 'Authorization': 'Token ' + this.jwttoken})
			  };
		 	let body = {
			 'uuid': this.uuid,
			 'sessionToken':this.sessiontoken,
      };
    if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
    {
      console.log("not working");
    }
    else{
			// console.log("this is------>",body)
       this.apiservice.postSession(body)
		 	.subscribe(
 	    (data) => {
					 console.log("session verify", data);
					 this.serverData=data;
          this.utilservice.validationException(data);		
				}, //For Success Response
			 	    (err) => {
						 console.log("got error",err)
		 	    } //For Error Response
         );
        }
	}

}
                                                                     