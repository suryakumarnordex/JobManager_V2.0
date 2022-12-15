import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
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
    private jobdetails: JobDetailsComponent,
    public JobDetailsLocalVariable : JobDetailsLocalVariable
  ) {}

  ngOnInit(): void {}
  
  goTofirstPage() {
    if( this.JobDetailsLocalVariable.currentpage !=1)
    {
       this.JobDetailsLocalVariable.currentpage = 1;
    this.GetFooterDetails(this.requestFromJob);
    } 
  }
  goTonextPage() {
    if( this.JobDetailsLocalVariable.currentpage != this.JobDetailsLocalVariable.totalPage)
    {
      this.JobDetailsLocalVariable.currentpage = this.JobDetailsLocalVariable.currentpage + 1;
      this.JobDetailsLocalVariable.totalPage = Math.ceil(this.JobDetailsLocalVariable.jobCount / this.JobDetailsLocalVariable.recordperpagejob);
    this.GetFooterDetails(this.requestFromJob);
    }
  }
  goTopriviousPage() {
    if( this.JobDetailsLocalVariable.currentpage!= 1)
    { this.JobDetailsLocalVariable.currentpage = this.JobDetailsLocalVariable.currentpage - 1;
      this.JobDetailsLocalVariable.totalPage = Math.ceil(this.JobDetailsLocalVariable.jobCount / this.JobDetailsLocalVariable.recordperpagejob);
    this.GetFooterDetails(this.requestFromJob);
    } 
  }
  goTolastPage() {
    if( this.JobDetailsLocalVariable.currentpage!= this.JobDetailsLocalVariable.totalPage)
    { this.JobDetailsLocalVariable.currentpage = Math.ceil(this.JobDetailsLocalVariable.jobCount / this.JobDetailsLocalVariable.recordperpagejob);
    this.GetFooterDetails(this.requestFromJob);
    }
  }
  GetFooterDetails(isjob: boolean) {
    isjob
      ? this.jobdetails.Columnfilters({})
      : this.taskdetails.GetTaskDetails(
          this.recordPerPagerequest,
          this.currentPage
        );
  }
  onSelected(value: string) {
    this.recordPerPagerequest = Number(value);
    this.JobDetailsLocalVariable.recordperpagejob = Number(value);
    this.JobDetailsLocalVariable.currentpage = 1;
    if (this.requestFromJob) {
      this.jobdetails.Columnfilters({});
    } else {
      this.taskdetails.GetTaskDetails(
        this.recordPerPagerequest,
        this.currentPage
      );
    }
  }
}
