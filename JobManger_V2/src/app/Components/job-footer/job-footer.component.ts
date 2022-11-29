import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-job-footer',
  templateUrl: './job-footer.component.html',
  styleUrls: ['./job-footer.component.css'],
})
export class JobFooterComponent implements OnInit {
  recordPerPage: number = 10;
  @Input() requestFromJOb: string;
  @Input() requestFromTask: string;
  @Input() total: number;
  @Input() recordPerPagerequest: number;
  @Input() pageSize: number;
  @Input() pageNumberJob: number;
  pageNumber: number;
  pn: number;
  constructor(
    private taskdetails: TaskDetailsComponent,
    private jdetails: JobDetailsComponent
  ) {}

  ngOnInit(): void {}
  goTofirstPage() {
    this.pageNumber = 1;
    this.jdetails.GetJobDetails(this.recordPerPagerequest, this.pageNumber);
  }
  goTonextPage() {
    this.pageNumber = this.pageSize + 1;
    this.pageNumberJob = Math.ceil(this.total / this.recordPerPagerequest);
    this.jdetails.GetJobDetails(this.recordPerPagerequest, this.pageNumber);
  }
  goTopriviousPage() {
    this.pageNumber = this.pageSize - 1;
    this.pageNumberJob = Math.ceil(this.total / this.recordPerPagerequest);
    this.jdetails.GetJobDetails(this.recordPerPagerequest, this.pageNumber);
  }
  goTolastPage() {
    // console.log(this.total, 'TOTAL PAGE');
    // console.log(this.pageSize, 'PAGE SIZE');
    // console.log(this.recordPerPagerequest, 'RECORD PER PAGE');
    // console.log(this.pageNumberJob, 'PAGE');
    this.pageNumber = Math.ceil(this.total / this.recordPerPagerequest);
    this.jdetails.GetJobDetails(this.recordPerPagerequest, this.pageNumber);
  }
  onSelected(value: string) {
    console.log(value, 'SELECTED');
    this.recordPerPagerequest = Number(value);
    console.log(this.pageNumber);
    if (this.requestFromJOb != undefined) {
      this.jdetails.GetJobDetails(this.recordPerPagerequest, this.pageSize);
      // console.log(this.total, 'TOTAL PAGE');
      // console.log(this.pageSize, 'PAGE SIZE');
      // console.log(this.recordPerPagerequest, 'RECORD PER PAGE');
    } else {
      this.taskdetails.GetTaskDetails(this.recordPerPagerequest);
    }
  }
}
