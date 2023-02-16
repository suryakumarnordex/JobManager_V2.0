import {
  Component,
  Injectable,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { LoginService } from 'src/app/Services/login.service';
import { ActivatedRoute } from '@angular/router';
import { JobDetaillocalstorage } from '../job-details/job-detail-Localstorage';
import { ClrDatagridColumn } from '@clr/angular';
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
    private JobDetailsComponent: JobDetailsComponent,
    public JobDetailsLocalVariable: JobDetailsLocalVariable,
    public JobDetaillocalstorage: JobDetaillocalstorage,

    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getNavigationsList();
    this.route.queryParams.subscribe((params) => {});

    this.loginService.user().subscribe({
      next: (user: any) => {
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
    this.JobDetailsLocalVariable.openPopupModal = false;
  }
  getNavigationsList(): void {
    this.ApiService.getNavigations().subscribe((res) => {
      this.JobDetailsLocalVariable.JobManagerNavigation = res;
    });
  }
  openmodel(event: string) {
    this.JobDetailsLocalVariable.passingEventMsg = event;
    this.JobDetailsLocalVariable.openPopupModal = true;
  }
  refreshData() {
    this.JobDetailsComponent.GetLocalStorageColumnValue();
    if (
      this.JobDetailsLocalVariable.selectedType.length == 0 &&
      this.JobDetailsLocalVariable.selectedUsername.length == 0 &&
      this.JobDetailsLocalVariable.selectedState.length == 0
    ) {
      this.JobDetailsComponent.GetMultipleSelectFiltersData();
    }

    this.JobDetailsComponent.CallSearchlayout('refreshData from job header');
  }
  clearAllfilters() {
    this.JobDetailsComponent.GetLocalStorageColumnValue();
    this.JobDetailsComponent.GetMultipleSelectFiltersData();
    this.JobDetailsComponent.clearallFilters();
    console.log(
      this.JobDetailsLocalVariable.selectedUsername,
      'this.JobDetailsLocalVariable.selectedUsername'
    );
  }
  onNodeGroupChange(event: any) {
    let statusList: string[] = [];
    this.JobDetailsLocalVariable.dataloading = true;
    let val = event.target.value;
    if (val.includes('Queue')) {
      this.JobDetailsLocalVariable.SelectedNodeGroup = val.replace(
        'Queue ',
        ''
      );
      statusList = ['Queued', 'Finished'];
    } else {
      this.JobDetailsLocalVariable.SelectedNodeGroup = '';
      statusList = [];
      this.JobDetailsLocalVariable.currentpage = 1;
    }
    this.JobDetailsComponent.nodeGroupchange(
      event,
      statusList,
      this.JobDetailsLocalVariable.SelectedNodeGroup
    );
  }
}
