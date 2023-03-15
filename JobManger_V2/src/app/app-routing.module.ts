import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { JobFooterComponent } from './Components/job-footer/job-footer.component';
import { TaskDetailsComponent } from './Components/task-details/task-details.component';
import { JobHeaderComponent } from './Components/job-header/job-header.component';
import { PopupModalsComponent } from './Components/popup-modals/popup-modals.component';
import { LayoutComponent } from './Components/layout/layout.component';
const routes: Routes = [

  
   { path: 'app-job-details', component: JobDetailsComponent },
  { path: '', component: LayoutComponent },
  {
    path: 'app-task-details',
    component: TaskDetailsComponent,
  },

  {
    path: 'app-job-footer',
    component: JobFooterComponent,
  },
  {
    path: 'app-job-header',
    component: JobHeaderComponent,
  },
  {
    path:'app-popup-modals',
    component:PopupModalsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
