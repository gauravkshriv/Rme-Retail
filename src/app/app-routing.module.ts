import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent }  from './layout/dashboard.layout.component';
import { FooterComponent } from './footer/footer.component';
import { SellpropertyComponent } from './sellproperty/sellproperty.component';
import { OwnerprofileComponent } from './ownerprofile/ownerprofile.component';
import { CanActivateRouteGuardService } from './services/gaurd/can-activate-route-guard.service';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';
import { PolicyComponent } from './policy/policy.component';
import { SellrawlandComponent } from './sellrawland/sellrawland.component';
import { PropertiesComponent } from './properties/properties.component';
// import {DashModule} from './dashboard/dash.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NeedanalysisComponent } from './needanalysis/needanalysis.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { LeadsComponent } from './leads/leads.component';
import { PropertyreviewComponent } from './propertyreview/propertyreview.component';
import { ProfiledetailComponent } from './profiledetail/profiledetail.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AllpropertiesComponent } from './allproperties/allproperties.component';
import { ResidentialviewComponent } from './singleview/residentialview/residentialview.component';
import { CommercialviewComponent } from './singleview/commercialview/commercialview.component';
import { IndustrialviewComponent } from './singleview/industrialview/industrialview.component';
import { RawviewComponent } from './singleview/rawview/rawview.component';
const appRoutes: Routes = [

{path: '', pathMatch:'full', redirectTo:'/dashboard'},
{
  path: '',
  component: DashboardLayoutComponent,
  children: [
    { path: 'footer', component: FooterComponent},

    {
      path: 'user',
      children: [
        { path: 'edit', component: EditprofileComponent},
        { path: 'myprofile', component: ProfileComponent},
        { path: 'onwer-profile', component: OwnerprofileComponent, canActivate: [CanActivateRouteGuardService]},
        ]
    },  
    {
      path: 'user',
      children: [
        {path: 'myprofile', component:ProfileComponent,
          children:[
        {path: '', redirectTo:"propertyreview", pathMatch:'full'},
        {path: 'leads/:pid', component: LeadsComponent, canActivate: [CanActivateRouteGuardService]},
        {path: 'myproperties', component: MypropertyComponent, canActivate: [CanActivateRouteGuardService]},
        {path: 'propertyreview', component: PropertyreviewComponent},
        {path: 'propertydetail', component: ProfiledetailComponent}
       ]
      },
    ]
  },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'parent', component: ParentComponent},
    { path: 'properties', component: PropertiesComponent},
    { path: 'child', component: ChildComponent},
    { path: 'termsofuse', component: TermsofuseComponent},
    { path: 'policy', component: PolicyComponent},
    { path: 'need-analysis', component: NeedanalysisComponent},
    { path: 'sell-rawland', component: SellrawlandComponent, canActivate: [CanActivateRouteGuardService]},
    { path: 'sell-property', component: SellpropertyComponent, canActivate: [CanActivateRouteGuardService]},
    { path: 'residential/view/:pid', component: ResidentialviewComponent},
    { path: 'commercial/view/:pid', component: CommercialviewComponent},
    { path: 'industrial/view/:pid', component: IndustrialviewComponent},
    { path: 'rawproperty/view/:pid', component: RawviewComponent},
    { path: 'allproperties', component: AllpropertiesComponent},
   
  ]
},
{
  path: 'login',
  loadChildren: './login/auth.module#AuthModule'
},
{
  path: 'projects/view/:pid',
  loadChildren: './dapprojects/projects.module#ProjectsModule'
}

// {
//   path: 'dashboard',
//   loadChildren: ()=>DashModule
// },

];

@NgModule({ 
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )],
    
  exports: [RouterModule]
})
export class AppRoutingModule { 
  static components = [
    DashboardComponent,SellpropertyComponent,OwnerprofileComponent
  ];
}
