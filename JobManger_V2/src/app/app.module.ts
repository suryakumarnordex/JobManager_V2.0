import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    JobDetailsComponent,
    UtcToLocalTimePipe,
    TaskDetailsComponent,
    JobFooterComponent,
  ],
  providers: [UtcConverterService, TaskDetailsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
