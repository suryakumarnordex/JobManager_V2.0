import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { LoggerService } from 'src/app/Services/logger.service';
import { LayoutInfo } from 'src/app/Models/layout';
import { SearchResultsLayout } from 'src/app/Models/helper';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css'],
})
export class JobHeaderComponent implements OnInit {
  @Input() recordPerPage: number = 10;
  @Input() recordPerPagerequest: number;

  @Input() passingEvent: string;
  JobManageerNavigation = [] as any;
  dataloading: boolean = false;
  layouts: LayoutInfo[];
  jobCount = 0;
  openModal = false;

  public Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];
  constructor(
    private router: Router,
    private ApiService: ApiServiceService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.getNavigationsList();
  }
  nodeListPage() {
    this.router.navigate(['nodelist']);
  }
  onModalClose() {
    this.openModal = false;
  }
  getNavigationsList(): void {
    this.ApiService.getNavigations().subscribe((res) => {
      this.JobManageerNavigation = res;
    });
  }
  openmodel(event: string) {
    console.log(event);
    this.passingEvent = event;
    this.openModal = true;
  }
  onNodeGroupChange(event: Event) {
    this.dataloading = true;
    let selectedNodeGroup = '';
    let val = event.target as HTMLInputElement;
    let statusList: Array<string> = [];
    if (val.name.includes('Queue')) {
      selectedNodeGroup = val.name.replace('Queue ', '');
      statusList = ['Queued', 'Finished'];
    } else {
      selectedNodeGroup = '';
    }
    if (event !== null) {
      this.ApiService.searchLayout(
        '',
        [],
        [],
        '',
        '',
        '',
        statusList,
        '',
        '',
        '',
        selectedNodeGroup,
        '',
        '',
        false,
        1,
        this.recordPerPage,
        false
      ).subscribe({
        next: (res: SearchResultsLayout) => {
          this.layouts = res.results;
          this.jobCount = res.totalResults;
          this.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },
      });
    }
  }
}
