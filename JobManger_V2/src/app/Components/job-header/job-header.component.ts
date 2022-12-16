import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { LoggerService } from 'src/app/Services/logger.service';
import { LayoutInfo } from 'src/app/Models/layout';
import { SearchResultsLayout } from 'src/app/Models/helper';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import {JobDetailsComponent } from '../job-details/job-details.component'

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css'],
})
export class JobHeaderComponent implements OnInit {
  @Input() recordPerPage: number = 10;
  @Input() recordPerPagerequest: number;
  @Input() passingEvent: string;
 
  constructor(
    private router: Router,
    private ApiService: ApiServiceService,
    private logger: LoggerService,
    private JobDetailsComponent : JobDetailsComponent,
    public JobDetailsLocalVariable : JobDetailsLocalVariable 
  ) {}

  ngOnInit(): void {
    this.getNavigationsList();
  }
  nodeListPage() {
    this.router.navigate(['nodelist']);
  }
  onModalClose() {
    this.JobDetailsLocalVariable.openModal = false;
  }
  getNavigationsList(): void {
    this.ApiService.getNavigations().subscribe((res) => {
      this.JobDetailsLocalVariable.JobManageerNavigation = res;
    });
  }
  openmodel(event: string) {
    this.passingEvent = event;
    this.JobDetailsLocalVariable.openModal = true;   
  }
  onNodeGroupChange(event: any) {
    this.JobDetailsLocalVariable.dataloading = true;
    let val = event.target.value;
   
 
    if (val.includes('Queue')) {
      this.JobDetailsLocalVariable.nodeGroupFragment=val.replace('Queue ', '');
      this.JobDetailsLocalVariable.statusList = ['Queued', 'Finished'];
      this.JobDetailsLocalVariable.currentpage  =1;
    } else {
      this.JobDetailsLocalVariable.nodeGroupFragment = '';
      this.JobDetailsLocalVariable.statusList = [];
      this.JobDetailsLocalVariable.currentpage  =1;
    }
    if (event !== null) {
      this.ApiService.searchLayout(
        '',
        [],
        [],
        '',
        '',
        '',
        this.JobDetailsLocalVariable.statusList,
        '',
        '',
        '',
        this.JobDetailsLocalVariable.nodeGroupFragment,
        '',
        '',
        false,
        1,
        this.recordPerPage,
        false
      ).subscribe({
        next: (res: SearchResultsLayout) => {
          this.JobDetailsLocalVariable.layouts = res.results;
          this.JobDetailsLocalVariable.jobCount = res.totalResults;
          this.JobDetailsLocalVariable.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.JobDetailsLocalVariable.dataloading = false;
        },
      });
    }
  }
}
