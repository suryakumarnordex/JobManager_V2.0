import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-job-footer',
  templateUrl: './job-footer.component.html',
  styleUrls: ['./job-footer.component.css'],
})
export class JobFooterComponent implements OnInit {
  recordPerPage: number;
  @Input() requestFromJOb: string;
  @Input() requestFromTask: string;
  pageNumber: number;
  constructor(
    private taskdetails: TaskDetailsComponent,
    private jdetails: JobDetailsComponent
  ) {}

  ngOnInit(): void {}
  goTofirstPage() {
    console.log(this.recordPerPage, 'From Next Page');
    this.pageNumber = 1;
    this.jdetails.GetJobDetails(this.recordPerPage, this.pageNumber);
  }
  goTonextPage() {
    this.pageNumber = 2;
    this.jdetails.GetJobDetails(10, this.pageNumber);
  }
  onSelected(value: string) {
    console.log(value, 'SELECTED');
    this.recordPerPage = Number(value);
    console.log(this.pageNumber);

    if (this.requestFromJOb != undefined) {
      //console.log(this.requestFromJOb);
      this.jdetails.GetJobDetails(this.recordPerPage, this.pageNumber);
    } else {
      //console.log(this.requestFromTask);
      this.taskdetails.GetTaskDetails(this.recordPerPage);
    }
  }
}
