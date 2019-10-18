import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $ :any; 
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService,ApiService} from '../services';
import {  FormGroup,
  FormBuilder,
  Validators,
  FormControl } from '@angular/forms';
  
  import {User} from '../services/user.model'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  oldpassword="";
  newpassword="";
  confirmPassword="";
  jwttoken:any;
  sessiontoken:any;
  uuid:any;
 
  showbuttonvalue1="Show";
  showbuttonvalue2="Show";
  showbuttonvalue3="Show";
  ChangePasswordForm:FormGroup;
  submitted = false;
  step1Form:FormGroup;

  user = new User();

  constructor(  private formbuilder:FormBuilder,private apiservice:ApiService, private utilservice:UtilService, private router: Router,private http: HttpClient, private toastr: ToastrService) { 
   
    

    this.uuid= localStorage.getItem("uuid");
    this.jwttoken = localStorage.getItem("jwttoken");
    this.sessiontoken = localStorage.getItem("sessiontoken");
    toastr.toastrConfig.preventDuplicates=true;
  }

  ngOnInit() {
    this.ChangePasswordForm = this.formbuilder.group({
       oldpassword:["",Validators.required],
       newpassword:["",Validators.required],
       confirmPassword:["",Validators.required]
    })
    // this.step1Form =this.formbuilder.group({
    //   oldpassword : ['',Validators.required],
    //   newpassword : ['',Validators.required],
    //   confirmPassword : ['',Validators.required],
    // })

  }



  sunmit(){
    console.log('submited',this.step1Form);
 
  }

  myFormdata() {
  
    console.log("==>",this.ChangePasswordForm)
   
  }
  

  LogoutonPortal()
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
          this.utilservice.Logout(data);
        });
  }


oldpasswords() 
{
    this.showbuttonvalue1=this.showbuttonvalue1 == 'Show' ? "Hide" : "Show"
}

curpasswords() 
{
    this.showbuttonvalue2=this.showbuttonvalue2 == 'Show' ? "Hide" : "Show"
}

newpasswords() 
{
    this.showbuttonvalue3=this.showbuttonvalue3 == 'Show' ? "Hide" : "Show"
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




validateInpus(){

if(this.confirmPassword != this.newpassword){
    this.toastr.info('Confirm Password not Match','Password Not Match');
    return  false;
  }
  return true;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

ChangePass(){
  console.log("==>",this.ChangePasswordForm)
  console.log("===",this.ChangePasswordForm.controls.oldpassword);
  this.submitted = true;

if(this.ChangePasswordForm.valid && this.validateInpus()){  
    this.submitted = false;     
       
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Token ' + this.jwttoken
            })
          }
           let body = {
           'oldpassword': this.oldpassword,
           'newpassword':this.newpassword,
           "uuid" : this.uuid
          };
          console.log("this is------>",body)
         console.log("jwt token is", this.jwttoken);
          // var self=this;
           this.http.post('http://ec2-3-19-70-172.us-east-2.compute.amazonaws.com/api/changePassword', body, httpOptions)
           .subscribe(
           (data) => {
               console.log("successful verify", data);
               this.utilservice.passwordvalidation(data);                 
             }, //For Success Response
                 (err) => {
                 console.log("got error",err)
               } //For Error Response
             );
             
        }
        else
        {
          this.validateAllFormFields(this.ChangePasswordForm);
        }
        
      }
             
      
Login(user)
{
  console.log('login');
  
  var local = JSON.parse(localStorage.getItem('uservalue'));
  console.log('local',local,this.user.userName,this.user.Password);  
  this.utilservice.LoginLocal(user)
}




}
