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

  constructor(
    private taskdetails: TaskDetailsComponent,
    private jdetails: JobDetailsComponent
  ) {}

  ngOnInit(): void {}
  onSelected(value: string) {
    console.log(value, 'SELECTED');
    this.recordPerPage = Number(value);
    if (this.requestFromJOb != undefined) {
      //console.log(this.requestFromJOb);
      this.jdetails.GetJobDetails(this.recordPerPage);
    } else {
      //console.log(this.requestFromTask);
      this.taskdetails.GetTaskDetails(this.recordPerPage);
    }
  }
}
