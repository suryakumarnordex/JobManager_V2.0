import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import {
  SearchResultsLayout,
  SearchTaskResultsLayout,
} from 'src/app/Models/helper';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';
import { JobDetailsModules } from 'src/app/Modules/JobDetailsModules';
import { LoggerService } from 'src/app/Services/logger.service';
import { JobDetailsVariable } from './job-details-variables';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  layouts: LayoutInfo[];

  @Input() recordPerPage: number = 10;
  taskLayout: TaskLayoutInfo[];
  requestFromJOb: string = 'Job';
  selected = [] as any;
  total = 0;
  pageNumberJob: number;
  loading = true;
  detailTaskID: any;
  pageSize: number = 1;
  dataloading: boolean = false;
  JobManageerNavigation = [] as any;
  // jobvariable:JobDetailsVariable
  public Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];

  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.GetJobDetails(this.recordPerPage, this.pageSize);
  }
  getNavigationsList(): void {
    this.ApiService.getNavigations().subscribe((res) => {
      this.JobManageerNavigation = res;
    });
  }
  nodeListPage() {
    this.router.navigate(['nodelist']);
  }
  GetJobDetails(recordPerPage: number, pageSize: number) {
    this.pageSize = pageSize;
    this.recordPerPage = recordPerPage;
    this.dataloading = true;

    this.ApiService.searchLayout(
      '',
      [],
      [],
      '',
      '',
      '',
      [],
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      this.pageSize,
      this.recordPerPage,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.layouts = res.results;
        this.total = res.totalResults;
        this.dataloading = false;
        this.pageNumberJob = Math.ceil(this.total / this.recordPerPage);
        console.log(this.layouts);
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },
    });
  }
  onDetailOpen(event: any) {
    if (event !== null) {
      this.detailTaskID = event.jobIdFragment;
      this.ApiService.searchTaskLayout(
        this.detailTaskID,
        '',
        '',
        [],
        '',
        '',
        '',
        '',
        1,
        10,
        false
      ).subscribe({
        next: (res: SearchTaskResultsLayout) => {
          this.taskLayout = res.results;
          this.total = res.totalResults;
          this.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },
      });
    }
  }
  copyClipboard(selectedItem: any) {
    const create_copy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', selectedItem.CockpitFolder);
      e.preventDefault();
      if (
        selectedItem.CockpitFolder != '' &&
        selectedItem.CockpitFolder != null
      ) {
        selectedItem.text = 'copied';
      } else {
        selectedItem.text = 'no data to copy';
      }
    };
    document.addEventListener('copy', create_copy);
    document.execCommand('copy');
    document.removeEventListener('copy', create_copy);
  }
  onNodeGroupChange(event: Event) {
    this.dataloading = true;
    let selectedNodeGroup = '';
    let val = event.target as HTMLInputElement;
    console.log(val.name, 'sele');
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
          this.total = res.totalResults;
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
