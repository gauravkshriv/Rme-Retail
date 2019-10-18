import { Component, OnInit } from '@angular/core';
import { UtilService,ApiService} from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $ :any; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  pid:any;
  constructor(private route: ActivatedRoute,private apiservice:ApiService, private utilservice:UtilService, private router: Router,private http: HttpClient) 
    { }

  ngOnInit() {

    var sub = this.route.params.subscribe(params => {
      this.pid = params['pid'];
      console.log("pid",this.pid);
    })


   this.getLeads();
  }

    getLeads()
    {
  this.apiservice.getleadsdata(this.pid)
  .subscribe((data:any)=>{
    console.log("data",data);
    
  })
    }

}
