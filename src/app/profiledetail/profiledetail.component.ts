import { Component, OnInit } from '@angular/core';
import { ApiService,EnumdataService,PincodeService,UtilService } from '../services';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.scss']
})
export class ProfiledetailComponent implements OnInit {

  uuid:any;
  profiledata:any;
  sessiontoken:any;
  selectedFile:null;
  lod1:any;
  jwttoken:any;
  username:any;
  profileimage:any;
  Picstatus:any;
  isLoading=false;
  step1Form:FormGroup;
  imageUrl : string  = "./assets/images/default_profile.png";
  constructor(private toastr: ToastrService, private utilservice:UtilService, private builder:FormBuilder,private enumservice:EnumdataService,private http: HttpClient,private router: Router,private route: ActivatedRoute,  private dataservice:PincodeService,private apiservice:ApiService)
    {
    this.username= localStorage.getItem("username");
    this.uuid= localStorage.getItem("uuid");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    this.jwttoken = localStorage.getItem("jwttoken");
    toastr.toastrConfig.preventDuplicates=true;
    }

  ngOnInit() {
    this.GetUSer(); 

  }

     ///////////////////////////////////////////////////////////////////////
     handleFileInput(event){
      this.lod1=true;
      this.selectedFile = event.target.files[0];
      console.log("pic================>", this.selectedFile);
      // console.log("User Valid profile ..........")
         const httpOptions = {
          headers: new HttpHeaders({
            //  'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + this.jwttoken,
          }),
         };
      // console.log("=====================>",formData)
      let body = new FormData();
      body.append('pic', this.selectedFile)
      body.append('uuid', this.uuid)
         console.log("this is------>",body)
      //  this.apiservice.postprofilepicupload(body)
         this.http.post('http://ec2-18-223-238-93.us-east-2.compute.amazonaws.com/api/profilePic/upload',body, httpOptions,)
         .subscribe(
         (data) => {
          this.lod1=false;
             this.profileimage = data;
             console.log("=============================>",this.profileimage);
            
           //  localStorage.setItem("fullname", this.profiledata.fullname);
              if (this.profileimage.successCode=="PROFILE_PIC_UPLOAD_SUCCESS"){
                  this.GetUSer();
                  this.toastr.success('Profile Picture Uploaded Successfully!','Thank You!');
                 }
                 else{
                 this.utilservice.profileimage(data);
                   
                 }
                
        }, //For Success Response
               (err) => {
               console.log("got error",err)
              //  self.serverDataLogin=err;
             } //For Error Response
           );
      // show image preview
      var reader = new FileReader();
      reader.onload = (event:any) =>{
      this.imageUrl = event.target.result;
      
      }
        reader.readAsDataURL(this.selectedFile);
      }

  GetUSer() {
    if (this.uuid==null || this.sessiontoken==null || this.jwttoken==null)
    {
      console.log("not working");
    }
    else{
      this.isLoading=true;
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
         this.profiledata = data;
         this.isLoading=false;
        //  this.getuserdata.next(data);
         console.log("=============================>",this.profiledata)
         localStorage.setItem("fullname", this.profiledata.fullname);   

        var tempArray=[];
        this.profiledata._occ.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
          // console.log("v",v);
        });

        
        this.profiledata._occ = tempArray;
        
        tempArray=[];
        this.profiledata._ptype.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata._ptype = tempArray;


        tempArray=[];
        this.profiledata.market.forEach(v => {
          tempArray.push(this.enumservice.kytname.get(v))
        });
        this.profiledata.market = tempArray;

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
                // this.SendLoadData();
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

}
