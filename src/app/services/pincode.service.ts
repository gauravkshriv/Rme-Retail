import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { RequestOptions, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  constructor(private http: HttpClient) { }

  getPincode(pincode)
  {
    return this.http.get('https://apidaap.rmehub.in/pin/taluka/district?pinCode='+pincode);
  }

  getFacilities()
  {
    return this.http.get('./assets/facilities.json');
  }

  getSingleView()
  {
    return this.http.get('./');
  }

}
