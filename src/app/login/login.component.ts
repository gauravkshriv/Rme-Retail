import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import {ActivatedRoute, Params} from '@angular/router';
import {Encryptor} from './../services/encryption.service';
import {ApiService} from '../services/api.service';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	showNav = true;
	title = "Login Form";
	 serverData:any;
	  
	 res:any;
	 btndisbled:false;
	 cipherText:any;
	 bytes:any;
	 data:any;
	 profiledata:any;
	 _ct:any;
	 originalText:string;
	 uuid:any;
	 sessiontoken:any;
	 decryptedData:any;
	 jwttoken:any;
	// @Output() onLogin = new EventEmitter<boolean>();
  constructor(private apiservice:ApiService, private http: HttpClient, private router: Router,private activatedRoute: ActivatedRoute,private encryptor:Encryptor) 
  {
	this.PortalData();
	
  }
  
ngOnInit() {
	
}

PortalData(){
  this.activatedRoute.queryParams.subscribe( (params: Params) => {
	  let returnUrl = params['returnUrl'];
	  let referral = params['referral'];
	this._ct = params['_ct'];
	console.log("------->_ct" , returnUrl);
	console.log("==>",referral);

	console.log("dsfsd",localStorage.getItem('uuid'));
	if(this._ct)
	{
     var byte = this.encryptor.decrypt(atob(unescape(this._ct)));
	 this.decryptedData = (JSON.parse(byte.toString(CryptoJS.enc.Utf8)));
	 console.log("------------------------------>",this.decryptedData);
	 localStorage.setItem("occupation", JSON.parse(this.decryptedData[0].Userdetails).data._occ[0]);
	 localStorage.setItem("Userdetails", this.decryptedData[0].Userdetails);
	 localStorage.setItem("username", this.decryptedData[1].username);
	 localStorage.setItem("userLoginStatus","true");
	 localStorage.setItem('uuid',this.decryptedData[6].uuid);
	 localStorage.setItem('sessiontoken',this.decryptedData[2].sessiontoken);
	 localStorage.setItem('jwttoken',this.decryptedData[3].jwttoken);
	 localStorage.setItem("fullname", this.decryptedData[5].fullname);
	 localStorage.setItem("kycstatus", JSON.parse(this.decryptedData[0].Userdetails).data._kst);
	 this.uuid = localStorage.getItem("uuid");
	 this.sessiontoken = localStorage.getItem("sessiontoken");
	 this.jwttoken = localStorage.getItem("jwttoken");
	 this.GetUSer();
	if(referral)
	{
		this.router.navigate(['/sell-rawland']);

	}
   else if(returnUrl)
	{
		this.router.navigate([returnUrl]);
	}
	
	else
	{
		this.router.navigate(['/dashboard']);
	}
	}

  else if(localStorage.getItem('uuid')){
        this.GetUSer();
		this.router.navigate(['/dashboard'],{replaceUrl:true});
	}
   else{
	this.router.navigate(['/dashboard'],{replaceUrl:true});
	}
  });
}

     
GetUSer() {
      let body = {
        'uuid': this.uuid,
        "sessionToken": this.sessiontoken
      };
        this.apiservice.getuserdata(body)
          .subscribe(
            (data) => {
			  this.profiledata = data;
			  console.log(this.profiledata);
			  localStorage.setItem("fullname", this.profiledata.fullname);
			  localStorage.setItem("kycstatus", this.profiledata._kst);
			  localStorage.setItem("occupation", this.profiledata._occ[0]);
              
            }, //For Success Response
            (err) => {
              console.log("got error", err)
              //  self.serverDataLogin=err;
            } //For Error Response
          );
      
    };
	
}

