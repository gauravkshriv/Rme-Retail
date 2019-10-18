import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import {ApiService} from './services/api.service'
import { NavigationComponent } from './navigation/navigation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {UtilService} from './services/util.service';
import { AgmCoreModule} from '@agm/core';
import { DashboardLayoutComponent }  from './layout/dashboard.layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { SellpropertyComponent } from './sellproperty/sellproperty.component'; 
import { ToastrModule,ToastContainerModule } from 'ngx-toastr';
import { OwlModule } from 'ngx-owl-carousel';
import { LightboxModule } from 'ngx-lightbox';
import { NguCarouselModule } from '@ngu/carousel';
import { OwnerprofileComponent } from './ownerprofile/ownerprofile.component';
import {CanActivateRouteGuardService} from './services/gaurd/can-activate-route-guard.service';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';
import { PolicyComponent } from './policy/policy.component';
import { PropertiesComponent } from './properties/properties.component';
import { SellrawlandComponent } from './sellrawland/sellrawland.component';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ResidentialviewComponent } from './singleview/residentialview/residentialview.component';
import { CommercialviewComponent } from './singleview/commercialview/commercialview.component';
import { IndustrialviewComponent } from './singleview/industrialview/industrialview.component';
import { ResfilterComponent } from './share/resfilter/resfilter.component';
import { CommfilterComponent } from './share/commfilter/commfilter.component';
import { IndfilterComponent } from './share/indfilter/indfilter.component';
import { AgrfilterComponent } from './share/agrfilter/agrfilter.component';
import { RawviewComponent } from './singleview/rawview/rawview.component';
import {FooterModule} from './footer/footer.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CartComponent } from './cart-wishlist/cart/cart.component';
import { WishlistComponent } from './cart-wishlist/wishlist/wishlist.component';
// import {Grid} from 'ag-grid-community';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    SellpropertyComponent,
    OwnerprofileComponent,
    ParentComponent,
    ChildComponent,
    TermsofuseComponent,
    PolicyComponent,
    PropertiesComponent,
    SellrawlandComponent,
    NeedanalysisComponent,
    ProfileComponent,
    EditprofileComponent,
    MypropertyComponent,
    LeadsComponent,
    PropertyreviewComponent,
    ProfiledetailComponent,
    NotfoundComponent,
    AllpropertiesComponent,
    ResidentialviewComponent,
    CommercialviewComponent,
    IndustrialviewComponent,
    ResfilterComponent,
    CommfilterComponent,
    IndfilterComponent,
    AgrfilterComponent,
    RawviewComponent,
    CartComponent,
    WishlistComponent
  ],
  imports: [
    FooterModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    NguCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC0tkxpZTxUS3iQKYqq7ACJOHY8Wca6c9w",
      libraries: ["places"]
    }),
    OwlModule,
    LightboxModule,
    LoadingBarRouterModule,
    // Grid,
    LoadingBarHttpClientModule,
    SlickCarouselModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ApiService,UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
