import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService,RME_URL_MAPPING } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class CheckloginService {
  // public isAuthenticated(): boolean;
  constructor( private apiservice: ApiService,private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
checkLoggedInUser() {
    let uuid = localStorage.getItem("uuid");
    let jwttoken = localStorage.getItem("jwttoken");
    let sessiontoken = localStorage.getItem("sessiontoken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + jwttoken
      })
    };
    let body = {
      'uuid': uuid,
      'sessionToken': sessiontoken,
    };
    // console.log("this is------>",body)
    return this.http.post(RME_URL_MAPPING.POST_SESSION, body, httpOptions);
    //  return this.http.post('https://api.rmehub.in/api/user/getSession', body, httpOptions);
  
  }
}