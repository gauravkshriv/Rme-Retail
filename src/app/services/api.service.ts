import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {RME_URL_MAPPING} from './RME_URL_MAPPING';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwttoken:any;
  httpOptions:any;
  constructor(private http: HttpClient) {
    // this.jwttoken = localStorage.getItem("jwttoken");
    // console.log("=>jwtoken",this.httpOptions,this.jwttoken);

    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //      'Content-Type':  'application/json',
    //      'Authorization': 'Token ' + this.jwttoken})
    //     };
   }
   getHttpHeader(){
     let jwt = localStorage.getItem("jwttoken");
     if(jwt){
      let httpOp ={
        headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Authorization': 'Token ' + jwt})
          };
          return httpOp;
     } else Swal.fire({
      title: "JWT Token Missing",
       text: "Jwt Token is missing!!",
       type: "info",
  })
   }

   postResidentialProperty(body){
    return this.http.post(RME_URL_MAPPING.POST_RESIDENTIAL_PROPERTY , body , this.getHttpHeader())
   }

   postCommercialProperty(uuid,body){
    return this.http.post(RME_URL_MAPPING.POST_COMMERCIAL_PROPERTY + uuid , body , this.getHttpHeader())
   }

   postIndustrialProperty(uuid,body)
   {
     return this.http.post(RME_URL_MAPPING.POST_INDUSTRIAL_PROPERTY +uuid,body,this.getHttpHeader())
   }

   postRawProperty(body){
    return this.http.post(RME_URL_MAPPING.POST_RAW_PROPERTY,body,this.getHttpHeader())
   }

   postResFilterProperty(size,body){
    return this.http.post(RME_URL_MAPPING.RES_POST_FILTER + size,body)
   }

   postCommFilterProperty(size,body){
    return this.http.post(RME_URL_MAPPING.COMM_POST_FILTER + size,body)
   }

   postprofilepicupload(body)
   {
     return this.http.post(RME_URL_MAPPING.PROFILE_UPLOAD, body,this.getHttpHeader())
   }


   postSession(body)
   {
   return this.http.post(RME_URL_MAPPING.POST_SESSION, body,this.getHttpHeader())
  }

  getCommecialProperty(page,size)
  {
    return this.http.get(RME_URL_MAPPING.GET_COMMERCIAL_PROPERTY+page+'&size='+size+'&sort=createdAt,desc');
  }


   postNeeAanalysis(body){
    return this.http.post(RME_URL_MAPPING.POST_NEED_ANALYSIS,body)
   }

  gettoRecentpproperties(page,size)
  {
    return this.http.get(RME_URL_MAPPING.GET_Top_RECENT_PROPERTY + page + '&size='+size+'&sort=createdAt,desc');
  }

  getResidentialSinglePage(pid)
  {
  return this.http.get(RME_URL_MAPPING.GET_RESIDENTIAL_SINGLE_VIEW+pid);
  }

  getCommecialSinglePage(pid)
  {
  return this.http.get(RME_URL_MAPPING.GET_COMMERCIAL_SINGLE_VIEW+pid);
  }

  getIndustrialSinglePage(pid)
  {
    return this.http.get(RME_URL_MAPPING.GET_INDUSTRIAL_SINGLE_VIEW + pid);
  }


  getleadsdata(pid)
  {
    return this.http.get(RME_URL_MAPPING.GET_LEADS_DATA+pid);
  }

  postConatctForm(pid,body)
  {
    return this.http.post(RME_URL_MAPPING.POST_CONTACT+pid,body)
  }

  getSingleRawPage(pid):Observable<Object>
  {
  return this.http.get(RME_URL_MAPPING.GET_RAW_SINGLE_VIEW+pid)
  }

  getUserResProperties(uuid)
  {
    console.log("=>jwtoken",this.httpOptions);
  return this.http.get(RME_URL_MAPPING.GET_USER_RESID_PROPERTIES + uuid,this.getHttpHeader());
  }

  getUserCommProperties(uuid)
  {
    console.log("=>jwtoken",this.httpOptions);
  return this.http.get(RME_URL_MAPPING.GET_USER_COMM_PROPERTIES + uuid,this.getHttpHeader());
  }

  getuserdata(body) {
    return this.http.post(RME_URL_MAPPING.GET_USER_DATA,body,this.getHttpHeader());
  }

  getTopProperties():Observable<any>
  {
  return this.http.get(RME_URL_MAPPING.GET_TOP_VIEW_Property)
  }


  getTopIndustrialProperties()
  {
    return this.http.get(RME_URL_MAPPING.GET_TOP_INDUSTRIAL_PROPERTY)
  }


  getrawlandproperty()
  {
  return this.http.get(RME_URL_MAPPING.GET_RAW_LAND_PROPERTY);
  }


  getAddViewsproperties(body)
  {
    return this.http.post(RME_URL_MAPPING.GET_ADD_VIEWS,body);
  }

  UploadPropertyImages(uuid,body)
  {
    return this.http.post(RME_URL_MAPPING.POST_POPERTY_IMAGES+uuid,body,this.getHttpHeader());
  }

  LogOutPortal(body)
  {
    return this.http.post(RME_URL_MAPPING.LOG_OUT,body,this.getHttpHeader());
  }

  getdapproperty(size)
  {
  return this.http.get(RME_URL_MAPPING.GET_DAPPDATA + size)
  }


  getsingledapproperty(pid)
  {
  return this.http.get(RME_URL_MAPPING.GET_SINGLE_DAPP_DATA + pid)
  }

   
  
  
  handleNetworkException(error){
    if(!error.response){
      Swal.fire({
        type: "info",
        title:'Network Error',
        text:'Check the network cables, modem, and router',
        confirmButtonText:'Got It'
      })
    }
  }


}
