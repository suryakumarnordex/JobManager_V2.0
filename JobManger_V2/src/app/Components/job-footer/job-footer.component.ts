import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

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

  constructor(
    private taskdetails: TaskDetailsComponent,
    private jobdetails: JobDetailsComponent
  ) {}

  ngOnInit(): void {}
  goTofirstPage() {
    this.currentPage = 1;
    this.GetFooterDetails(this.requestFromJob);
  
  }
  goTonextPage() {
    this.currentPage = this.currentPage + 1;
    this.totalPage = Math.ceil(this.totalRecords / this.recordPerPagerequest);
    this.GetFooterDetails(this.requestFromJob);
   
  }
  goTopriviousPage() {
    this.currentPage = this.currentPage - 1;
    this.totalPage = Math.ceil(this.totalRecords / this.recordPerPagerequest);
    this.GetFooterDetails(this.requestFromJob);
  }
  goTolastPage() {
    this.currentPage = Math.ceil(this.totalRecords / this.recordPerPagerequest);
    this.GetFooterDetails(this.requestFromJob);
  }
  GetFooterDetails(isjob: boolean) {
    isjob
      ? this.jobdetails.GetJobDetails(
          this.recordPerPagerequest,
          this.currentPage
        )
      : this.taskdetails.GetTaskDetails(
          this.recordPerPagerequest,
          this.currentPage
        );
  }
  onSelected(value: string) {
    this.recordPerPagerequest = Number(value);
    if (this.requestFromJob) {
      this.jobdetails.GetJobDetails(
        this.recordPerPagerequest,
        this.currentPage
      );
    } else {
      this.taskdetails.GetTaskDetails(
        this.recordPerPagerequest,
        this.currentPage
      );
    }
  }
}
