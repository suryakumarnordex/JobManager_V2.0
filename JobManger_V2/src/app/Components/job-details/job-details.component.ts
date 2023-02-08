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
import { ClrDatagridSortOrder } from '@clr/angular';
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
import { JobHeaderComponent } from '../job-header/job-header.component';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  @Input() pageSize: number = 1;
  @ViewChildren(ClrDatagridColumn) columns: QueryList<ClrDatagridColumn>;
  @ViewChildren(CheckboxListFilterComponent)
  buildincolumns: QueryList<CheckboxListFilterComponent>;

  totalJobCount: number;
  priorityDisable: boolean = false;
  requeueDisable: boolean = false;
  cancelDisable: boolean = false;
  submitDisable: boolean = false;

  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService,
    private localstorage: LocalStorageService,
    public JobDetailsLocalStorage: JobDetaillocalstorage,
    public JobDetailsLocalVariable: JobDetailsLocalVariable,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.JobDetailsLocalVariable.dataloading = true;
    this.GetLocalStorageColumnValue();
    this.GetMultipleSelectFiltersData();
  }
  GetMultipleSelectFiltersData() {
    this.JobDetailsLocalVariable.AvailableUserName = [];
    this.JobDetailsLocalVariable.AvailableType = [];
    this.JobDetailsLocalVariable.AvailableState = [];

    //Get Available User name list
    this.ApiService.GetUserNameList().subscribe({
      next: (res: any) => {
        res.forEach((UserName: any) => {
          if (!this.JobDetailsLocalVariable.AvailableUserName)
            this.JobDetailsLocalVariable.AvailableUserName = [
              { key: UserName, value: UserName },
            ];
          else
            this.JobDetailsLocalVariable.AvailableUserName.push({
              key: UserName,
              value: UserName,
            });
        });
      },
      error: (error: string) => {
        console.log(error);
      },
    });
    //Get Available Type name list
    this.ApiService.GetTypeList().subscribe({
      next: (res: any) => {
        res.forEach((Type: any) => {
          if (!this.JobDetailsLocalVariable.AvailableType)
            this.JobDetailsLocalVariable.AvailableType = [
              { key: Type, value: Type },
            ];
          else
            this.JobDetailsLocalVariable.AvailableType.push({
              key: Type,
              value: Type,
            });
        });
      },
      error: (error: string) => {
        console.log(error);
      },
    });
    //Get Available Status list
    this.ApiService.GetStatusList().subscribe({
      next: (res: any) => {
        res.forEach((state: any) => {
          if (!this.JobDetailsLocalVariable.AvailableState)
            this.JobDetailsLocalVariable.AvailableState = [
              { key: state, value: state },
            ];
          else
            this.JobDetailsLocalVariable.AvailableState.push({
              key: state,
              value: state,
            });
        });
      },
      error: (error: string) => {
        console.log(error);
      },
    });
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
    // let jobIdFragment = '';
    // let userFragment: Array<string> = [];
    // let typeFragment: Array<string> = [];
    // let topicFragment = '';
    //let orderDescending = false;
    let waitForChange = false;
    // nodeGroupFragment: string = '',
    // pendingReasonFragment: string = '',
    // orderBy: string = '';
    // let PageNo = 1;
    // progressFragment: string = '',
    // PageSize: number = 10;
    this.JobDetailsLocalVariable.state = state;
    this.JobDetailsLocalVariable.selectedType = [];
    this.JobDetailsLocalVariable.selectedUsername = [];
    this.JobDetailsLocalVariable.statusList = [];

    if (state.filters) {
      this.JobDetailsLocalVariable.dataloading = true;

      for (const filter of state.filters) {
        this.JobDetailsLocalStorage.currentpage = 1;
        const { property, value } = <{ property: string; value: string }>filter;

        if (filter.filterParamName == 'typeFragment') {
          this.JobDetailsLocalVariable.selectedType = filter.selectedItems.map(
            (e: any) => e.key
          );
          this.JobDetailsLocalVariable.OrderBy = 'type';
        } else if (filter.filterParamName == 'userFragment') {
          console.log(
            filter.selectedItems.map((e: any) => e.key),
            ' filter.selectedItems.map((e: any) => e.key)'
          );
          this.JobDetailsLocalVariable.selectedUsername =
            filter.selectedItems.map((e: any) => e.key);
          this.JobDetailsLocalVariable.OrderBy = 'cockpitusername';
        } else if (filter.filterParamName == 'statusFragment') {
          this.JobDetailsLocalVariable.statusList = filter.selectedItems.map(
            (e: any) => e.key
          );
          this.JobDetailsLocalVariable.selectedState =
            this.JobDetailsLocalVariable.statusList;
          this.JobDetailsLocalVariable.OrderBy = 'status';
        }

        switch (property) {
          case 'jobIdFragment': {
            this.JobDetailsLocalVariable.filterJobid = value;
            this.JobDetailsLocalVariable.OrderBy = 'id';

            break;
          }
          case 'cockpitIdFragment': {
            this.JobDetailsLocalVariable.filterCockpit = value;
            this.JobDetailsLocalVariable.OrderBy = 'cockpitid';
            break;
          }

          case 'runnoFragment': {
            this.JobDetailsLocalVariable.filterrunno = value;
            this.JobDetailsLocalVariable.OrderBy = 'runnumber';
            break;
          }
          case 'topicFragment': {
            this.JobDetailsLocalVariable.filterTopic = value;
            this.JobDetailsLocalVariable.OrderBy = 'runtopic';
            break;
          }
          case 'numberOfTasksFragment': {
            this.JobDetailsLocalVariable.filternooftasks = value;
            this.JobDetailsLocalVariable.OrderBy = 'numberoftasks';
            break;
          }
          case 'priorityFragment': {
            this.JobDetailsLocalVariable.filterpriority = value;
            this.JobDetailsLocalVariable.OrderBy = 'priority';
            break;
          }
          default: {
            this.JobDetailsLocalVariable.OrderBy = 'id';
          }
        }
      }
    }
    if (state.sort?.by !== undefined) {
      switch (state.sort?.by) {
        case 'typeFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'type';
          break;
        }
        case 'userFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'cockpitusername';
          break;
        }
        case 'statusFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'status';
          break;
        }
        case 'jobIdFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'id';
          break;
        }
        case 'cockpitIdFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'cockpitid';
          break;
        }
        case 'runnoFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'runnumber';
          break;
        }
        case 'topicFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'runtopic';
          break;
        }
        case 'numberOfTasksFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'numberoftasks';
          break;
        }
        case 'priorityFragment': {
          this.JobDetailsLocalVariable.OrderBy = 'priority';
          break;
        }
      }
    }
    let ColumnName = state.sort?.reverse;
    ColumnName == undefined
      ? (this.JobDetailsLocalVariable.orderDescending = true)
      : (this.JobDetailsLocalVariable.orderDescending = ColumnName);

    this.ApiService.searchLayout(
      this.JobDetailsLocalVariable.filterJobid,
      this.JobDetailsLocalVariable.selectedUsername,
      this.JobDetailsLocalVariable.selectedType,
      this.JobDetailsLocalVariable.filterTopic,
      this.JobDetailsLocalVariable.filterCockpit,
      this.JobDetailsLocalVariable.filterrunno,
      this.JobDetailsLocalVariable.selectedState,
      this.JobDetailsLocalVariable.filterpriority,
      '',
      this.JobDetailsLocalVariable.filternooftasks,
      this.JobDetailsLocalVariable.nodeGroupFragment,
      '',
      this.JobDetailsLocalVariable.OrderBy,
      this.JobDetailsLocalVariable.orderDescending,
      this.JobDetailsLocalStorage.currentpage,
      this.JobDetailsLocalStorage.recordperpagejob,
      waitForChange
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.JobDetailsLocalVariable.layouts = res.results;
        this.JobDetailsLocalVariable.jobCount = res.totalResults;
        this.JobDetailsLocalVariable.dataloading = false;
        this.JobDetailsLocalVariable.totalPage = Math.ceil(
          this.JobDetailsLocalVariable.jobCount /
            this.JobDetailsLocalStorage.recordperpagejob
        );
      },
      error: (error) => {
        this.logger.reportError(error);
        this.JobDetailsLocalVariable.dataloading = false;
      },
    });
  }
  clearallFilters() {
    this.JobDetailsLocalVariable.dataloading = true;
    this.columns.forEach((column) => (column.filterValue = ''));
    this.JobDetailsLocalStorage.currentpage = 1;

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
      this.JobDetailsLocalVariable.nodeGroupFragment,
      '',
      '',
      false,
      this.JobDetailsLocalStorage.currentpage,
      this.JobDetailsLocalStorage.recordperpagejob,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.JobDetailsLocalVariable.layouts = res.results;
        this.JobDetailsLocalVariable.jobCount = res.totalResults;
        this.JobDetailsLocalVariable.dataloading = false;
        this.JobDetailsLocalVariable.totalPage = Math.ceil(
          this.JobDetailsLocalVariable.jobCount /
            this.JobDetailsLocalStorage.recordperpagejob
        );
        this.JobDetailsLocalVariable.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.JobDetailsLocalVariable.dataloading = false;
      },
    });
  }
  loadDatas() {
    this.JobDetailsLocalVariable.dataloading = true;
    this.ApiService.searchLayout(
      this.JobDetailsLocalVariable.filterJobid,
      this.JobDetailsLocalVariable.selectedUsername,
      this.JobDetailsLocalVariable.selectedType,
      this.JobDetailsLocalVariable.filterTopic,
      this.JobDetailsLocalVariable.filterCockpit,
      this.JobDetailsLocalVariable.filterrunno,
      this.JobDetailsLocalVariable.statusList,
      this.JobDetailsLocalVariable.filterpriority,
      '',
      '',
      this.JobDetailsLocalVariable.nodeGroupFragment,
      this.JobDetailsLocalVariable.filternooftasks,
      '',
      false,
      this.JobDetailsLocalStorage.currentpage,
      this.JobDetailsLocalStorage.recordperpagejob,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.JobDetailsLocalVariable.layouts = res.results;
        this.JobDetailsLocalVariable.jobCount = res.totalResults;
        this.JobDetailsLocalVariable.dataloading = false;
        this.JobDetailsLocalVariable.totalPage = Math.ceil(
          this.JobDetailsLocalVariable.jobCount /
            this.JobDetailsLocalStorage.recordperpagejob
        );
        this.JobDetailsLocalVariable.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.JobDetailsLocalVariable.dataloading = false;
      },
    });
  }
  nodeGroupchange(
    event: any,
    statusList: Array<string>,
    nodeGroupFragment: string
  ) {
    if (event !== null) {
      this.JobDetailsLocalVariable.nodeGroupFragment = nodeGroupFragment;
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
        this.JobDetailsLocalVariable.nodeGroupFragment,
        '',
        '',
        false,
        1,
        this.JobDetailsLocalStorage.recordperpagejob,
        false
      ).subscribe({
        next: (res: SearchResultsLayout) => {
          this.JobDetailsLocalVariable.layouts = res.results;
          this.JobDetailsLocalVariable.jobCount = res.totalResults;
          this.JobDetailsLocalVariable.dataloading = false;
          this.JobDetailsLocalVariable.totalPage = Math.ceil(
            this.JobDetailsLocalVariable.jobCount /
              this.JobDetailsLocalStorage.recordperpagejob
          );

          this.JobDetailsLocalVariable.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.JobDetailsLocalVariable.dataloading = false;
        },
      });
    }
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
  copyRunClipboard(selectedItem: any) {
    const create_copy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', selectedItem.runFolder);
      e.preventDefault();
      if (selectedItem.runFolder != '' && selectedItem.runFolder != null) {
        selectedItem.text = 'copied';
      } else {
        selectedItem.text = 'no data to copy';
      }
    };
    document.addEventListener('copy', create_copy);
    document.execCommand('copy');
    document.removeEventListener('copy', create_copy);
  }
  copyClipboard(selectedItem: any) {
    const create_copy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', selectedItem.CockpitFolder);
      e.preventDefault();
      if (
        selectedItem.CockpitFolder != '' &&
        selectedItem.CockpitFolder != null &&
        selectedItem.CockpitFolder != undefined
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
    let finishedCount = 0;
    let canceledCount = 0;
    let failedCount = 0;
    let queuedCount = 0;
    let configuringCount = 0;

    this.JobDetailsLocalVariable.SelectedjobId = event.map(
      (e) => e.jobIdFragment
    );

    this.totalJobCount = this.JobDetailsLocalVariable.SelectedjobId.length;
    this.JobDetailsLocalVariable.SelectedjobIdStatus = event.map(
      (e) => e.statusFragment
    );

    this.JobDetailsLocalVariable.SelectedjobIdStatus.forEach((status) => {
      switch (status.toString()) {
        case 'Finished': {
          this.priorityDisable = true;
          this.requeueDisable = true;
          this.submitDisable = true;
          this.cancelDisable = true;
          break;
        }
        case 'Running': {
          this.requeueDisable = true;
          this.submitDisable = true;
          break;
        }
        case 'Queued': {
          this.requeueDisable = true;
          this.submitDisable = true;
          break;
        }
        case 'Failed': {
          this.cancelDisable = true;
          this.submitDisable = true;
          break;
        }
        case 'Cancelled': {
          this.cancelDisable = true;
          this.submitDisable = true;
          break;
        }
        case 'Configuring': {
          this.requeueDisable = true;
          break;
        }
      }
    });
  }
  openmodel(action: string, jobId: number) {
    this.JobDetailsLocalVariable.SelectedjobId = [jobId];
    this.JobDetailsLocalVariable.passingEvent = action;
    this.JobDetailsLocalVariable.openModal = true;
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
    this.JobDetailsLocalStorage.recordperpagejob =
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
