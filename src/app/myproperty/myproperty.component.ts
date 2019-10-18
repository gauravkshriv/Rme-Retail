import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ApiService,EnumdataService,PincodeService } from '../services';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styleUrls: ['./myproperty.component.scss']
})
export class MypropertyComponent implements OnInit {
  isLoading=false;
  page:any;
  recentProperties:any;
  propertyId:any;
  constructor(private enumservice:EnumdataService,private http: HttpClient, private dataservice:PincodeService,private apiservice:ApiService)
  {
    
  }
  ngOnInit() {
    this.getRecentlyUploaded(0);
  }

       
getRecentlyUploaded(page)
{
  $('#pagsec .page-item a .page-link').removeClass('highlight')
  // $('#t5 :nth-child(3)')
  $('#pagsec .page-item a .page-link:nth-child('+ page +')').addClass('highlight')
  this.isLoading = true;
  this.page = page
  this.apiservice.gettoRecentpproperties(this.page,10)
  // this.http.get('http://ec2-3-80-207-138.compute-1.amazonaws.com/filter/show/res?page=0&size=10&sort=createdAt,des')
 .subscribe((data:any)=>
     {
      console.log("recent properties",data);
     
      if(data.successCode === "API_SUCCESS" && data.statusCode == 200)
      {
        this.recentProperties = data.page.content;
        this.isLoading = false;
        console.log("recent properties",this.recentProperties);
       // let __crousel=[];
        this.recentProperties.forEach((data,i) => {
         this.propertyId = data.propertyId
         // console.log("===>",this.recentProperties[i].pricing.assetConstructionPhase);
 
         this.recentProperties[i].furnishing = data.furnishing.replace('_',' ');
 
         const str2 = data.createdAt;
         const arr2 = str2.split(/ (.*)/);
         this.recentProperties[i].createdAt = new Date(arr2[0]).toDateString();
         this.recentProperties[i].pricing.assetConstructionPhase = this.enumservice.kytname.get(this.recentProperties[i].pricing.assetConstructionPhase);
      });
     //  this.carouselItemsraw = __crousel;
      console.log("check======>?????????????",);
      console.log("propertyId",this.propertyId)
      }
       
     else(data.exception === "NO_RECORDS_FOUND")
     {
      this.isLoading = false;
     }
     },
     (err) => {
       console.log("got error", err)
       //  self.serverDataLogin=err;
     } //For Error Response)
   
     )
    };

}
