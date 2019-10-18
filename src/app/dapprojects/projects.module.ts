import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule }  from './project-routing.module';
import {ProjectsComponent} from './projects/projects.component';
import { ChartsModule } from 'ng2-charts';
import {FooterModule} from '../footer/footer.module';
import { AgmCoreModule} from '@agm/core';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    NavbarComponent,

  ],
  imports: [
    ChartsModule,
    CommonModule,
    FooterModule,
    ProjectRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC0tkxpZTxUS3iQKYqq7ACJOHY8Wca6c9w",
      libraries: ["places"]
    }),
  ],
  exports:[
  ],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ProjectsModule { }
