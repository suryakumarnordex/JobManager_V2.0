import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { JobFooterComponent } from './Components/job-footer/job-footer.component';
import { TaskDetailsComponent } from './Components/task-details/task-details.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
