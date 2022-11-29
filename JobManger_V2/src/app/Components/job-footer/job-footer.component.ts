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


  //For Footer
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
    this.GetFooterDetails(this.requestFromJob)
  }
  goTonextPage() {
    this.currentPage = this.currentPage + 1;
    this.totalPage = Math.ceil(this.totalRecords / this.recordPerPagerequest);
    this.jobdetails.GetJobDetails(this.recordPerPagerequest, this.currentPage);
  }
  goTopriviousPage() {
    this.currentPage = this.currentPage - 1;
    this.totalPage = Math.ceil(this.totalRecords / this.recordPerPagerequest);
    this.jobdetails.GetJobDetails(this.recordPerPagerequest, this.currentPage);
  }
  goTolastPage() {
   
    this.currentPage = Math.ceil(this.totalRecords / this.recordPerPagerequest);
    this.jobdetails.GetJobDetails(this.recordPerPagerequest, this.currentPage);
    console.log(this.totalRecords, 'TOTAL');
    console.log(this.currentPage, 'PAGE SIZE');
    console.log(this.recordPerPagerequest, 'RECORD PER PAGE');
    console.log(this.totalPage, ' TOTAL PAGE');
  }
  GetFooterDetails(isjob:boolean){
    isjob ? this.jobdetails.GetJobDetails(this.recordPerPagerequest, this.currentPage):this.taskdetails.GetTaskDetails(this.recordPerPagerequest, this.currentPage);
  }
  onSelected(value: string) {
    console.log(value, 'SELECTED');
    this.recordPerPagerequest = Number(value);
    console.log(this.currentPage);
    if (this.requestFromJob) {
      this.jobdetails.GetJobDetails(this.recordPerPagerequest, this.currentPage);
    } else {
      this.taskdetails.GetTaskDetails(this.recordPerPagerequest,this.currentPage);
    }
  }
}
