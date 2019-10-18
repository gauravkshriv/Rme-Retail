import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {User} from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UtilService{
  returnurl:any;
  zoom: number=1
  latitude: number;
  longitude: number;
  uuid:any;
  jwttoken:any;
  sessiontoken:any;
  logout:any;
  userdata = [];
  pid:any;
  
  constructor(private mapsAPILoader: MapsAPILoader,private router: Router,private toastr: ToastrService) 
  { 
    this.uuid = localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    toastr.toastrConfig.preventDuplicates=true;
    console.log('pid',this.pid);
  }


  setLocal(user)
  {
  this.userdata.push(user);  
  localStorage.setItem('uservalue',JSON.stringify(this.userdata));
  this.router.navigate(['/user/edit']);
  }

  LoginLocal(user)
  {
     var local = JSON.parse(localStorage.getItem('uservalue'));

    if(local.find(x=>x.userName == user.userName && x.Password == user.Password))
    {
      console.log('Successfully login');
    this.router.navigate(['/user/onwer-profile']);
    // console.log('check',x.userName,x.userName);
    }
    else
    {
      console.log('not');
      
      return false;
    }
  }




  capitalize(word): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
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
               //find country name
                   for (var i=0; i<results[0].address_components.length; i++) {
                  for (var b=0;b<results[0].address_components[i].types.length;b++) {

                if (results[0].address_components[i].types[b] == "locality") {		                  //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                  this.city= results[0].address_components[i].long_name;		                      // if (results[0].address_components[i].types[b] == "locality") {
                  localStorage.setItem('city',this.city);		                      //     this.city= results[0].address_components[i].long_name;
                  break;		                      //     localStorage.setItem('city',this.city);
              }		   

               if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                 this.state= results[0].address_components[i].long_name;
                 localStorage.setItem('state',this.state);
                 break;
             }

   
                  }
              }
             
              } else {
                alert("No results found");
              }
         });
       });
     }




     Logout(data) {
     console.log("=============================>", this.logout);
     if(data.successCode==="LOGOUT_SUCCESS")
    {
      localStorage.clear();
      this.router.navigate(['/dashboard']);
      // window.location.reload();
  } 
  else{
    this.validationException(data);
  } 
   //For Success Response
  }

  // checkcurrenturl()
  // {
  //   this.routeguard.currenturl;
  //   console.log('=>',this.routeguard.currenturl);
    
  // }


  profileimage(data)
  {
    if(data.exception=="FIELD_CAN_NOT_BE_EMPTY")
    {
     this.toastr.info("This Field Cannot be empty","Field is Empty");
    }
    else if(data.exception=="UUID_CANNOT_BE_EMPTY")
   {
    this.toastr.info("UUID cannot be empty","UUID is empty");
    }
    else if(data.exception=="PROFILE_PICTURE_FORMAT_INVALID"){
      this.toastr.info("Accept only .jpg .png","Format Not valid");
    }
    else if(data.exception=="FILE_SIZE_LIMIT_EXCEED"){
      this.toastr.info("File Size Is Limit Exceed","File Size Exceed");
    }
    else if(data.exception=="PROFILE_PICTURE_UPLOAD_FAILED"){
      this.toastr.info("Profile Picture Upload Failed","Uploaded Failed");
    }
    
  }





   

  routedsellproperty = false;


  validationException(data)
  {
    if(data.exception==="USER_NOT_FOUND")
    {
  Swal.fire({
  title: "User does not exist on system.",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,
  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  }

  else if(data.exception==="SESSION_NOT_FOUND")
      {
  Swal.fire({
  title: "You session has expired.",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,

  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  } 

  else if(data.exception==="JWT_NOT_VALID")
  {
  Swal.fire({
  title: "Session Expired",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,
  })
  .then(() => {
  localStorage.clear();
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  window.location.reload();
  })
  }

  else if(data.exception==="JWT_FORMATE_INVALID")
  {
  Swal.fire({
  title: "Invalid JWT format.",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,

  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  } 
  else if(data.exception==="JWT_EXPIRED")
  {
  Swal.fire({
  title: "You session has expired.",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,

  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  } 

  else if(data.exception==="JWT_MISSING")
  {
  Swal.fire({
  title: "Authentication Token Missing.",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,

  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  } 


  else if(data.exception==="io.jsonwebtoken.ExpiredJwtException")
  {
  Swal.fire({
  title: "Warning",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,

  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  }
  else if(data.exception==="SESSION_EXPIRED")
      {
  Swal.fire({
  title: "You session has expired.",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,

  }).then(() => {
  this.router.navigate(['/dashboard'],{replaceUrl:true});
  localStorage.clear();
  window.location.reload();
  })
  }

  else if(data.exception==="SESSION_DEAD")
  {
  Swal.fire({
  title: "Warning",
  text: "Please login again !!",
  type: "info",
  allowEscapeKey: false,
  allowOutsideClick: false,
  
  }).then(() => {
    this.router.navigate(['/dashboard'],{replaceUrl:true});
    localStorage.clear();
  window.location.reload();
  })
  } 		
  }


 passwordvalidation(data)
 {
  if(data.exception==="INVALID_CREDENTIALS")
  {
    this.toastr.error("user please enter new password","Please Enter New Password");
  }
  if(data.exception==="FIELD_CAN_NOT_BE_EMPTY")
  {
   this.toastr.info("Please Type input Field !!","Field is Empty!");
 }
  else if(data.exception==="OLD_PASSWORD_WRONG")
  {
    this.toastr.error("Dear user your old password is wrong","Wrong Password");
  } 
  else if(data.exception==="PASSWORD_SAME_AS_PREVIOUS")
  {
   this.toastr.error("Dear user your New Password is same as Old Password","Same Password");

  }
  else if(data.exception==="USER_NOT_FOUND")
  {
   this.toastr.error("This user is not found ","User Not Found");

  }
  else if(data.successCode==="CHANGE_PASSWORD_SUCCESS")
  {
   data = data;  
     Swal.fire({
     title: "Thank You!",
     text: "Dear user your password has been changed Successfully",
     type: "success",
     // button: false,
     //closeOnClickOutside: false
   }).then(()=>
   {
     this.Logout(data);
     localStorage.clear();
     window.location.reload();
    this.router.navigate(['/dashboard']);
   })  
    
  }
 }
 
     



}
