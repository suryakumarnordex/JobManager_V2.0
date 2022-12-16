import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UtcToLocalTimePipe } from './Components/utc-pipe/utc-to-local-time.pipe';
import { TaskDetailsComponent } from './Components/task-details/task-details.component';
import { UtcConverterService } from './Components/utc-converter.service/utc-converter.service';
import { JobFooterComponent } from './Components/job-footer/job-footer.component';
import { JobHeaderComponent } from './Components/job-header/job-header.component';
import { PopupModalsComponent } from './Components/popup-modals/popup-modals.component';
import {JobDetaillocalstorage} from './Components/job-details/job-detail-Localstorage'
import { JobDetailsLocalVariable } from './Components/job-details/job-details-localvariables';
import { CheckboxListFilterComponent} from './Components/job-details/checkbox-list-filter.component' 
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    JobDetailsComponent,
    UtcToLocalTimePipe,
    TaskDetailsComponent,
    JobFooterComponent,
    JobHeaderComponent,
    PopupModalsComponent, 
    CheckboxListFilterComponent   
  ],
  providers: [UtcConverterService, TaskDetailsComponent,JobDetaillocalstorage,JobDetailsLocalVariable],
  bootstrap: [AppComponent],
})
export class AppModule {}
