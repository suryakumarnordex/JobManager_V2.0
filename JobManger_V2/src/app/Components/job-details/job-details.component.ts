import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import {
  SearchResultsLayout,
  SearchTaskResultsLayout,
} from 'src/app/Models/helper';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { JobDetaillocalstorage } from './job-detail-Localstorage';
import { JobDetailsLocalVariable } from './job-details-localvariables';
import {
  ClrDatagridColumn,
  ClrDatagridStateInterface,
  ClrNavLevel,
} from '@clr/angular';
import { CheckboxListFilterComponent } from './checkbox-list-filter.component';
import { FiltersProvider } from '@clr/angular/data/datagrid/providers/filters';
import { User } from '../../Models/user';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../Services/login.service';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  @Input() pageSize: number = 1;
  @Input() totalPage: number;
  @Input() jobCount: number;

  @Input() recordPerPage: number = 10;
  @ViewChildren(ClrDatagridColumn) columns: QueryList<ClrDatagridColumn>;
  @ViewChildren(CheckboxListFilterComponent)
  buildincolumns: QueryList<CheckboxListFilterComponent>;
  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService,
    private localstorage: LocalStorageService,
    public JobDetailsLocalStorage: JobDetaillocalstorage,
    public JobDetailsLocalVariable: JobDetailsLocalVariable,

    private route: ActivatedRoute
  ) {}
  loginModal = false;
  ngOnInit(): void {
    this.JobDetailsLocalVariable.dataloading = true;
    //  this.GetJobDetails(this.recordPerPage, this.JobDetailsLocalVariable.pageSize);
  }
  public ColumnResized(event: any, colType: string) {
    this.localstorage.set(colType, event);

    switch (colType) {
      case 'idcolumnwidth': {
        this.JobDetailsLocalStorage.idcolumnWidthValue = event;
        break;
      }
      case 'cockpitcolumnwidth': {
        this.JobDetailsLocalStorage.cockpitcolumnWidthValue = event;
        break;
      }
      case 'runcolumnwidth': {
        this.JobDetailsLocalStorage.runcolumnWidthValue = event;
        break;
      }
      case 'typecolumnwidth': {
        this.JobDetailsLocalStorage.typecolumnWidthValue = event;
        break;
      }
      case 'topiccolumnwidth': {
        this.JobDetailsLocalStorage.topiccolumnWidthValue = event;
        break;
      }
      case 'statuscolumnwidth': {
        this.JobDetailsLocalStorage.statuscolumnWidthValue = event;
        break;
      }
      case 'progresscolumnwidth': {
        this.JobDetailsLocalStorage.progresscolumnWidthValue = event;
        break;
      }
      case 'prioritycolumnwidth': {
        this.JobDetailsLocalStorage.prioritycolumnWidthValue = event;
        break;
      }
      case 'notaskcolumnwidth': {
        this.JobDetailsLocalStorage.notaskcolumnWidthValue = event;
        break;
      }
      case 'runningTaskcolumnwidth': {
        this.JobDetailsLocalStorage.runcolumnWidthValue = event;
        break;
      }
      case 'queuedTaskcolumnwidth': {
        this.JobDetailsLocalStorage.queuedTaskcolumnWidthValue = event;
        break;
      }
      case 'starttimecolumnwidth': {
        this.JobDetailsLocalStorage.starttimecolumnWidthValue = event;
        break;
      }
      case 'endtimecolumnwidth': {
        this.JobDetailsLocalStorage.endtimecolumnWidthValue = event;
        break;
      }
      case 'submittimecolumnwidth': {
        this.JobDetailsLocalStorage.submittimecolumnWidthValue = event;
        break;
      }
      case 'elapsedtimecolumnwidth': {
        this.JobDetailsLocalStorage.elapsedtimecolumnWidthValue = event;
        break;
      }
    }
  }
  Columnfilters(state: ClrDatagridStateInterface) {
    let jobIdFragment = '';
    let userFragment: Array<string> = [];
    let typeFragment: Array<string> = [];
    let topicFragment = '';
    let cockpitIdFragment = '';
    let runnoFragment = '';
    let priorityFragment = '';
    // progressFragment: string = '',
    let numberOfTasksFragment = '';
    let orderDescending = false;
    let waitForChange = false;
    // nodeGroupFragment: string = '',
    // pendingReasonFragment: string = '',
    // orderBy: string = '';
    let PageNo = 1;
    // PageSize: number = 10;

    if (state.filters) {
      this.JobDetailsLocalVariable.dataloading = true;
      for (const filter of state.filters) {
        this.JobDetailsLocalVariable.currentpage = 1;

        const { property, value } = <{ property: string; value: string }>filter;

        if (filter.filterParamName == 'typeFragment') {
          typeFragment = filter.selectedItems.map((e: any) => e.value);
          console.log(typeFragment);
        } else if (filter.filterParamName == 'userFragment') {
          userFragment = filter.selectedItems.map((e: any) => e.value);
          console.log(userFragment);
        } else if (filter.filterParamName == 'statusFragment') {
          this.JobDetailsLocalVariable.statusList = filter.selectedItems.map(
            (e: any) => e.value
          );
          console.log(this.JobDetailsLocalVariable.statusList);
        }
        switch (property) {
          case 'jobIdFragment': {
            jobIdFragment = value;
            console.log(jobIdFragment);
            break;
          }
          case 'cockpitIdFragment': {
            cockpitIdFragment = value;
            console.log(cockpitIdFragment);
            break;
          }

          case 'runnoFragment': {
            runnoFragment = value;
            console.log(runnoFragment);
            break;
          }
          case 'topicFragment': {
            topicFragment = value;
            console.log(topicFragment);
            break;
          }
          case 'numberOfTasksFragment': {
            numberOfTasksFragment = value;
            console.log(numberOfTasksFragment);
            break;
          }
          case 'priorityFragment': {
            priorityFragment = value;
            console.log(priorityFragment);
            break;
          }
        }
      }
    }
    this.ApiService.searchLayout(
      jobIdFragment,
      userFragment,
      typeFragment,
      topicFragment,
      cockpitIdFragment,
      runnoFragment,
      this.JobDetailsLocalVariable.statusList,
      priorityFragment,
      '',
      numberOfTasksFragment,
      this.JobDetailsLocalVariable.nodeGroupFragment,
      '',
      '',
      orderDescending,
      this.JobDetailsLocalVariable.currentpage,
      this.JobDetailsLocalVariable.recordperpagejob,
      waitForChange
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.JobDetailsLocalVariable.layouts = res.results;
        this.jobCount = res.totalResults;
        this.JobDetailsLocalVariable.dataloading = false;
        this.totalPage = Math.ceil(
          this.jobCount / this.JobDetailsLocalVariable.recordperpagejob
        );
      },
      error: (error) => {
        this.logger.reportError(error);
        this.JobDetailsLocalVariable.dataloading = false;
      },
    });
  }

  onDetailOpen(event: any) {
    if (event !== null) {
      this.JobDetailsLocalVariable.detailTaskID = event.jobIdFragment;
      this.ApiService.searchTaskLayout(
        this.JobDetailsLocalVariable.detailTaskID,
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
          this.JobDetailsLocalVariable.taskLayout = res.results;
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
  selectionChanged(event: any[]) {
    this.JobDetailsLocalVariable.SelectedjobId = event.map(
      (e) => e.jobIdFragment
    );
  }
  GetLocalStorageColumnValue() {
    this.JobDetailsLocalStorage.idcolumnWidthValue =
      this.localstorage.get('idcolumnwidth');
    this.JobDetailsLocalStorage.usercolumnWidthValue =
      this.localstorage.get('usercolumnwidth');
    this.JobDetailsLocalStorage.cockpitcolumnWidthValue =
      this.localstorage.get('cockpitcolumnwidth');
    this.JobDetailsLocalStorage.runcolumnWidthValue =
      this.localstorage.get('runcolumnwidth');
    this.JobDetailsLocalStorage.typecolumnWidthValue =
      this.localstorage.get('typecolumnwidth');
    this.JobDetailsLocalStorage.topiccolumnWidthValue =
      this.localstorage.get('topiccolumnwidth');
    this.JobDetailsLocalStorage.statuscolumnWidthValue =
      this.localstorage.get('statuscolumnwidth');
    this.JobDetailsLocalStorage.progresscolumnWidthValue =
      this.localstorage.get('progresscolumnwidth');
    this.JobDetailsLocalStorage.prioritycolumnWidthValue =
      this.localstorage.get('prioritycolumnwidth');
    this.JobDetailsLocalStorage.notaskcolumnWidthValue =
      this.localstorage.get('notaskcolumnwidth');
    this.JobDetailsLocalStorage.runningTaskcolumnWidthValue =
      this.localstorage.get('runningtaskcolumnwidth');
    this.JobDetailsLocalStorage.queuedTaskcolumnWidthValue =
      this.localstorage.get('queuedtaskcolumnwidth');
    this.JobDetailsLocalStorage.starttimecolumnWidthValue =
      this.localstorage.get('starttimecolumnwidth');
    this.JobDetailsLocalStorage.endtimecolumnWidthValue =
      this.localstorage.get('endtimecolumnwidth');
    this.JobDetailsLocalStorage.elapsedtimecolumnWidthValue =
      this.localstorage.get('elapsedtimecolumnwidth');
    this.JobDetailsLocalStorage.submittimecolumnWidthValue =
      this.localstorage.get('submittimecolumnwidth');
    this.JobDetailsLocalStorage.pendingreasoncolumnWidthValue =
      this.localstorage.get('pendingreasoncolumnwidth');
    this.JobDetailsLocalStorage.recordPerPageValue =
      this.localstorage.get('recordperpage');
  }
  public SetJobPriority() {
    this.ApiService.SetJobPriority(
      this.JobDetailsLocalVariable.SelectedjobId,
      this.JobDetailsLocalVariable.priorityValue
    ).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  ButtonEvents(EventStr: string): Promise<any> {
    return new Promise((resolve, reject) => {
      switch (EventStr) {
        case 'Requeue': {
          this.ApiService.SetRequeue(
            this.JobDetailsLocalVariable.SelectedjobId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              resolve(res);
            },
            error: (error: string) => {
              console.log(error);
              this.JobDetailsLocalVariable.dataloading = false;
              reject(error);
            },
          });
          break;
        }
        case 'Pending_Reason': {
          this.ApiService.GetPendingReason(
            this.JobDetailsLocalVariable.SelectedjobId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              resolve(res);
            },
            error: (error: string) => {
              console.log(error);
              reject(error);
            },
          });
          break;
        }
        case 'Cancel': {
          this.ApiService.SetCancel(
            this.JobDetailsLocalVariable.SelectedjobId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              resolve(res);
            },
            error: (error: string) => {
              console.log(error);
              reject(error);
            },
          });
          break;
        }
        case 'Submit': {
          this.ApiService.SetSubmit(
            this.JobDetailsLocalVariable.SelectedjobId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              resolve(res);
            },
            error: (error: string) => {
              console.log(error);
              reject(error);
            },
          });
          break;
        }
      }
    });
  }
}
