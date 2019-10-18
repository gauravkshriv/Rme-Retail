import { Injectable } from "@angular/core";
import * as _swal from "sweetalert";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = _swal as any;
import { ApiService,PincodeService,UtilService,RME_URL_MAPPING } from '../../services';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { CheckloginService } from "../auth/checklogin.service";
@Injectable({
  providedIn: "root"
})
export class CanActivateRouteGuardService implements CanActivate {
  returnurl:any;
  activdata: any;
  currenturl:any;
  constructor(private utilservice:UtilService, private authService: CheckloginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("in auth");
    console.log('=>',state.url);

    this.returnurl = this.utilservice.returnurl = state.url;

    if (!this.isUserDataPresent()) {
      console.log("no data to auth");
      swal({
        title:"Authentication Error!!!",
        text: "Kindly Complete KYC to view this page",
        icon: "error",
        buttons: {
          cancel: {
            text: "Cancel",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Login Now",
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
          // window.location.href="http://accounttest.s3-website.us-east-2.amazonaws.com/?referral=rmeretail";
          window.location.href = RME_URL_MAPPING.account +'/?referral=rmeretail&returnUrl='+this.returnurl;
          else{
            this.router.navigate(['/dashboard'],{replaceUrl:true});
          }
      });
      return false;
    }

 this.authService.checkLoggedInUser().subscribe(
      (data: any) => {
        console.log("route guard service", data);


     if(data.successCode==="SESSION_ACTIVE"){}
     else this.utilservice.validationException(data)
         
      //  swal("");
      }, //For Success Response
      err => {
        console.log("got error", err);
      } //For Error Response
    );
   return true; 
  }


  isUserDataPresent() {
    if (
      localStorage.getItem("Userdetails") == null ||
      localStorage.getItem("jwttoken") == null ||
      localStorage.getItem("sessiontoken") == null ||
      localStorage.getItem("kycstatus") == 'PENDING'
    )
     {
      console.log("NOT present");
      
    // if(this.router.url == "http://localhost:4200") window.location.href="/sell-property#step2"
      return false;
    }
     else return true;
  }
}
