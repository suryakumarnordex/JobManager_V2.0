import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { JobFooterComponent } from './Components/job-footer/job-footer.component';
import { TaskDetailsComponent } from './Components/task-details/task-details.component';
import { JobHeaderComponent } from './Components/job-header/job-header.component';
import { PopupModalsComponent } from './Components/popup-modals/popup-modals.component';
import { NodeListComponent } from './Components/node-list/node-list.component';
const routes: Routes = [
  { path: '', component: JobDetailsComponent },
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
    path: 'app-popup-modals',
    component: PopupModalsComponent,
  },
  {
    path: 'nodelist',
    component: NodeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
