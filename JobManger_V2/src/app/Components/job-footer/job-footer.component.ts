import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { TaskDetailsLocalVariable } from '../../Components/task-details/task-details-localvariable';
@Component({
  selector: 'app-job-footer',
  templateUrl: './job-footer.component.html',
  styleUrls: ['./job-footer.component.css'],
})
export class JobFooterComponent implements OnInit {
  @Input() requestFromJob: boolean;
  @Input() totalRecords: number;
  @Input() recordPerPagerequest: number;
  @Input() currentPage: number;
  @Input() totalPage: number;
  taskloading: boolean = false;
  //task
  @Input() totalRecordstask: number;
  @Input() recordPerPagerequesttask: number;
  @Input() currentPagetask: number;
  @Input() totalPagetask: number;

  constructor(
    private jobdetails: JobDetailsComponent,
    private taskdetails: TaskDetailsComponent,
    public JobDetailsLocalVariable: JobDetailsLocalVariable,
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable
  ) {}

  ngOnInit(): void {}

  goTofirstPage() {
    if (this.requestFromJob) {
      if (this.JobDetailsLocalVariable.currentpage != 1) {
        this.JobDetailsLocalVariable.dataloading = true;
        this.JobDetailsLocalVariable.currentpage = 1;
        this.GetFooterDetails(this.requestFromJob);
      }
    } else {
      this.TaskDetailsLocalVariable.loading = true;
      this.TaskDetailsLocalVariable.currentpagetask = 1;
      this.GetFooterDetails(this.requestFromJob);
    }
  }
  goTonextPage() {
    if (this.requestFromJob) {
      if (this.JobDetailsLocalVariable.currentpage != this.totalPage) {
        this.JobDetailsLocalVariable.dataloading = true;
        this.JobDetailsLocalVariable.currentpage =
          this.JobDetailsLocalVariable.currentpage + 1;
        this.totalPage = Math.ceil(
          this.totalRecords / this.JobDetailsLocalVariable.recordperpagejob
        );
        this.GetFooterDetails(this.requestFromJob);
      }
    } else {
      this.TaskDetailsLocalVariable.currentpagetask =
        this.TaskDetailsLocalVariable.currentpagetask + 1;
      this.totalPagetask = Math.ceil(
        this.totalRecordstask / this.TaskDetailsLocalVariable.recordperpagetask
      );
      this.GetFooterDetails(this.requestFromJob);
    }
  }
  goTopriviousPage() {
    if (this.requestFromJob) {
      if (this.JobDetailsLocalVariable.currentpage != 1) {
        this.JobDetailsLocalVariable.dataloading = true;
        this.JobDetailsLocalVariable.currentpage =
          this.JobDetailsLocalVariable.currentpage - 1;
        this.totalPage = Math.ceil(
          this.totalRecords / this.JobDetailsLocalVariable.recordperpagejob
        );
        this.GetFooterDetails(this.requestFromJob);
      }
    } else {
      this.TaskDetailsLocalVariable.loading = true;
      this.TaskDetailsLocalVariable.currentpagetask =
        this.TaskDetailsLocalVariable.currentpagetask - 1;
      this.totalPagetask = Math.ceil(
        this.totalRecordstask / this.TaskDetailsLocalVariable.recordperpagetask
      );
      this.GetFooterDetails(this.requestFromJob);
    }
  }
  goTolastPage() {
    if (this.requestFromJob) {
      if (this.JobDetailsLocalVariable.currentpage != this.totalPage) {
        this.JobDetailsLocalVariable.dataloading = true;
        this.JobDetailsLocalVariable.currentpage = Math.ceil(
          this.totalRecords / this.JobDetailsLocalVariable.recordperpagejob
        );
        this.GetFooterDetails(this.requestFromJob);
      }
    } else {
      this.TaskDetailsLocalVariable.loading = true;
      this.TaskDetailsLocalVariable.currentpagetask = Math.ceil(
        this.totalRecordstask / this.TaskDetailsLocalVariable.recordperpagetask
      );
      this.GetFooterDetails(this.requestFromJob);
    }
  }
  GetFooterDetails(isjob: boolean) {
    isjob
      ? this.jobdetails.Columnfilters({})
      : this.taskdetails.GetTaskDetails();
  }
  onSelected(value: string) {
    if (this.requestFromJob) {
      this.JobDetailsLocalVariable.recordperpagejob = Number(value);
      this.JobDetailsLocalVariable.dataloading = true;
      this.JobDetailsLocalVariable.currentpage = 1;
      this.jobdetails.Columnfilters({});
    } else {
      this.TaskDetailsLocalVariable.loading = true;
      this.TaskDetailsLocalVariable.recordperpagetask = Number(value);
      this.taskdetails.GetTaskDetails();
    }
  }
}
