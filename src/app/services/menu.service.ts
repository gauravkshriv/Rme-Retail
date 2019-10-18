import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private utilservice:UtilService) { }

  getMenu() {
  const menu = [

        { name: 'Dashboard', route:'dashboard', path: '../dashboard', children: [] },
      {
            name: 'Sell property', 
            route:'sell-property',
            path: '../sell-property',
      },
      {
        name: 'sell-rawland', 
        route:'sell-rawland',
        path: '../sell-rawland',
      },
      {
        name: 'residentialview', 
        route:'residential/view/'+this.utilservice.pid,
        path: '../residential/view/'+this.utilservice.pid,
      },
      ]
        
       
  return menu;

  }

  }

  //  { path: 'parent', component: ParentComponent},
    // { path: 'properties', component: PropertiesComponent},
    // { path: 'child', component: ChildComponent},
    // { path: 'termsofuse', component: TermsofuseComponent},
    // { path: 'policy', component: PolicyComponent},
    // { path: 'need-analysis', component: NeedanalysisComponent},
    // { path: 'sell-rawland', component: SellrawlandComponent, canActivate: [CanActivateRouteGuardService]},
    // { path: 'sell-property', component: SellpropertyComponent, canActivate: [CanActivateRouteGuardService]},
    // { path: 'residential/view/:pid', component: ResidentialviewComponent},
    // { path: 'commercial/view/:pid', component: CommercialviewComponent},
    // { path: 'industrial/view/:pid', component: IndustrialviewComponent},
    // { path: 'rawproperty/view/:pid', component: RawviewComponent},
    // { path: 'allproperties', component: AllpropertiesComponent},
