import { Component, Injectable, Input, OnInit,  QueryList,  ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { LoggerService } from 'src/app/Services/logger.service';
import { LayoutInfo } from 'src/app/Models/layout';
import { SearchResultsLayout } from 'src/app/Models/helper';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { LoginService } from 'src/app/Services/login.service';
import { ActivatedRoute } from '@angular/router';
import { event } from '@cds/core/internal';
import {
  ClrDatagridColumn,
  ClrDatagridStateInterface,
  ClrNavLevel,
} from '@clr/angular';
@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css'],
})
@Injectable()
export class JobHeaderComponent implements OnInit {
  @Input() jobCountLength: number;
  @Input() priorityDisable: boolean;
  @Input() requeueDisable: boolean;
  @Input() cancelDisable: boolean;
  @Input() submitDisable: boolean;
  @Input() recordPerPage: number = 10;
  @Input() recordPerPagerequest: number;
  @Input() passingEvent: string;
  @ViewChildren(ClrDatagridColumn) columns: QueryList<ClrDatagridColumn>;
  jobCount: number;
  totalPage: number;
  totalJobCount: number;
  // username: string = 'KumarSu';
  isRole: string = 'internal';
  displayName: string;
  spinnerInlineloader: boolean = true;
  hostName: string;
  loginModal = false;
  constructor(
    private router: Router,
    private ApiService: ApiServiceService,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private JobDetailsComponent: JobDetailsComponent,
    public JobDetailsLocalVariable: JobDetailsLocalVariable,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getNavigationsList();
    this.route.queryParams.subscribe((params) => {});

    this.loginService.user().subscribe({
      next: (user: any) => {
        console.log(user,"User");
        this.displayName = user.displayName;
        this.spinnerInlineloader = false;
      },
      error: (error) => {
        console.log(error);
        this.displayName = 'Unknown User';
        this.spinnerInlineloader = false;
      },
    });
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
    this.JobDetailsLocalVariable.passingEvent = event;
    this.JobDetailsLocalVariable.openModal = true;
  }
  refreshData() {
    this.JobDetailsComponent.loadDatas();
    this.JobDetailsComponent.GetLocalStorageColumnValue();
    this.JobDetailsComponent.GetMultipleSelectFiltersData();
  }
  clearAllfilters(){
    this.JobDetailsComponent.clearallFilters();
    this.JobDetailsComponent.GetLocalStorageColumnValue();
    this.JobDetailsComponent.GetMultipleSelectFiltersData();
  }
  onNodeGroupChange(event: any) {
    this.JobDetailsLocalVariable.dataloading = true;
    let val = event.target.value;
    if (val.includes('Queue')) {
      this.JobDetailsLocalVariable.nodeGroupFragment = val.replace(
        'Queue ',
        ''
      );
      this.JobDetailsLocalVariable.statusList = ['Queued', 'Finished'];
    } else {
      this.JobDetailsLocalVariable.nodeGroupFragment = '';
      this.JobDetailsLocalVariable.statusList = [];
      this.JobDetailsLocalVariable.currentpage = 1;
    }

    this.JobDetailsComponent.nodeGroupchange(
      event,
      this.JobDetailsLocalVariable.statusList,
      this.JobDetailsLocalVariable.nodeGroupFragment
    );
  }
}
