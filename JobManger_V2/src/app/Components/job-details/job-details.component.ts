import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchResultsLayout } from 'src/app/Models/helper';
import { LoggerService } from 'src/app/Services/logger.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { JobDetaillocalstorage } from './job-detail-Localstorage';
import { JobDetailsLocalVariable } from './job-details-localvariables';
import {
  ClrDatagrid,
  ClrDatagridColumn,
  ClrDatagridStateInterface,
} from '@clr/angular';
import { CheckboxListFilterComponent } from './checkbox-list-filter.component';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { TaskDetaillocalstorage } from '../task-header/task-detail-Localstorage';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  @Input() pageSize: number = 1;
  @ViewChildren(ClrDatagridColumn) columns: QueryList<ClrDatagridColumn>;
  @ViewChild(ClrDatagrid) JobDataGrid!: ClrDatagrid;
  @ViewChild(CheckboxListFilterComponent)
  checkboxFilter!: CheckboxListFilterComponent;

  @ViewChild('statusFilter') statusFilter: CheckboxListFilterComponent;
  @ViewChild('cockpitusernameFilter')
  cockpitusernameFilter: CheckboxListFilterComponent;
  @ViewChild('typeFilter') typeFilter: CheckboxListFilterComponent;

  public ClipBoardText: string = '';
  priorityDisable: boolean = true;
  requeueDisable: boolean = true;
  cancelDisable: boolean = true;
  submitDisable: boolean = true;

  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService,
    private localstorage: LocalStorageService,
    public JobDetailsLocalStorage: JobDetaillocalstorage,
    public JobDetailsLocalVariable: JobDetailsLocalVariable,
    private route: ActivatedRoute,
    public TaskDetailsComponent: TaskDetailsComponent,
    public TaskDetaillocalstorage: TaskDetaillocalstorage
  ) {}

  ngOnInit(): void {
    this.JobDetailsLocalVariable.dataloading = true;
    this.GetLocalStorageColumnValue();
    this.GetMultipleSelectFiltersData();
    this.JobDetailsLocalVariable.dataloading = false;
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

  Columnfilters(ColumnProperties: ClrDatagridStateInterface) {
    this.JobDetailsLocalVariable.dataloading = true;
    this.JobDetailsLocalVariable.ColumnProperties = ColumnProperties;
    this.JobDetailsLocalVariable.CheckBoxFilterClear();
    this.JobDetailsLocalVariable.currentpage = 1;
    if (ColumnProperties.filters) {
      //this.JobDetailsLocalVariable.dataloading = true;
      for (const filterctrl of ColumnProperties.filters) {
        if (
          filterctrl.filterParamName == 'typeFragment' ||
          filterctrl.filterParamName == 'userFragment' ||
          filterctrl.filterParamName == 'statusFragment'
        ) {
          if (filterctrl.changes.currentObservers !== null) {
            if (filterctrl.filterParamName == 'typeFragment') {
              filterctrl.selectedItems
                .map((e: any) => e.value)
                .forEach((value: string) => {
                  if (
                    !this.JobDetailsLocalVariable.selectedType.includes(value)
                  ) {
                    this.JobDetailsLocalVariable.selectedType.push(value);
                  }
                });
            } else if (filterctrl.filterParamName == 'userFragment') {
              filterctrl.selectedItems
                .map((e: any) => e.value)
                .forEach((value: string) => {
                  if (
                    !this.JobDetailsLocalVariable.selectedUsername.includes(
                      value
                    )
                  ) {
                    this.JobDetailsLocalVariable.selectedUsername.push(value);
                  }
                });
            } else if (filterctrl.filterParamName == 'statusFragment') {
              filterctrl.selectedItems
                .map((e: any) => e.value)
                .forEach((value: string) => {
                  if (
                    !this.JobDetailsLocalVariable.selectedState.includes(value)
                  ) {
                    this.JobDetailsLocalVariable.selectedState.push(value);
                  }
                });
            }
          }
        }

        const { property, value } = <{ property: string; value: string }>(
          filterctrl
        );

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
    } else {
      this.JobDetailsLocalVariable.filterJobid = '';
      this.JobDetailsLocalVariable.filterrunno = '';
      this.JobDetailsLocalVariable.filterTopic = '';
      this.JobDetailsLocalVariable.filternooftasks = '';
      this.JobDetailsLocalVariable.filterpriority = '';
      this.JobDetailsLocalVariable.selectedType = [];
      this.JobDetailsLocalVariable.selectedUsername = [];
      this.JobDetailsLocalVariable.selectedState = [];
      this.JobDetailsLocalVariable.OrderBy = 'id';
      this.JobDetailsLocalVariable.orderDescending = true;

      this.checkboxFilter.selectedItems = [];
      this.cockpitusernameFilter.selectedItems = [];
      this.statusFilter.selectedItems = [];
      this.typeFilter.selectedItems = [];
    }
    this.ColumnSorting(ColumnProperties);
    this.CallSearchlayout();
  }

  ColumnSorting(ColumnProperties: ClrDatagridStateInterface) {
    if (ColumnProperties.sort?.by !== undefined) {
      switch (ColumnProperties.sort?.by) {
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
    let ColumnName = ColumnProperties.sort?.reverse;
    ColumnName == undefined
      ? (this.JobDetailsLocalVariable.orderDescending = true)
      : (this.JobDetailsLocalVariable.orderDescending = ColumnName);
  }

  CallSearchlayout() {
    let waitForChange = false;
    this.JobDetailsLocalVariable.dataloading = true;
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
      this.JobDetailsLocalVariable.SelectedNodeGroup,
      '',
      this.JobDetailsLocalVariable.OrderBy,
      this.JobDetailsLocalVariable.orderDescending,
      this.JobDetailsLocalVariable.currentpage,
      this.JobDetailsLocalVariable.recordperpagejob,
      waitForChange
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.JobDetailsLocalVariable.Joblayout = res.results;
        this.JobDetailsLocalVariable.jobCount = res.totalResults;
        this.JobDetailsLocalVariable.totalPage = Math.ceil(
          this.JobDetailsLocalVariable.jobCount /
            this.JobDetailsLocalVariable.recordperpagejob
        );
        this.JobDetailsLocalVariable.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.JobDetailsLocalVariable.dataloading = false;
      },
    });
    
  }

  clearallFilters() {;
    this.JobDetailsLocalVariable.ClearAllLocalVariables();
    this.priorityDisable = true;
    this.requeueDisable = true;
    this.submitDisable = true;
    this.cancelDisable = true;

    this.columns.forEach((column) => (column.filterValue = ''));
    this.checkboxFilter.selectedItems = [];
    this.CallSearchlayout();
    this.JobDataGrid.dataChanged();
  }

  nodeGroupchange(
    event: any,
    _statusList: Array<string>,
    nodeGroupFragment: string
  ) {
    if (event !== null) {
      this.JobDetailsLocalVariable.ClearAllLocalVariables();
      this.JobDetailsLocalVariable.SelectedNodeGroup = nodeGroupFragment;
      this.CallSearchlayout();
    }
  }

  onDetailOpen(event: any) {
    if (event !== null) {
      this.JobDetailsLocalVariable.SelectedJobId = event.jobIdFragment;
      // Call Task searchlayout
    }
  }

  CopyClipboard(IsRun: boolean, selectedItem: any) {
    if (selectedItem != undefined) {
      let CtrlName: any;
      if (IsRun) {
        CtrlName = selectedItem.runFolderFragment;
      } else {
        CtrlName = selectedItem.cockpitfolderFragment;
      }

      const create_copy = (e: ClipboardEvent) => {
        e.clipboardData?.setData('text/plain', CtrlName);
        e.preventDefault();
        // if (CtrlName != '' && CtrlName != null && CtrlName != undefined) {
        //   this.ClipBoardText = 'copied';
        // } else {
        //   this.ClipBoardText = 'no data to copy';
        // }
      };
      document.addEventListener('copy', create_copy);
      document.execCommand('copy');
      document.removeEventListener('copy', create_copy);
    }
  }

  selectionChanged(event: any[]) {
    this.JobDetailsLocalVariable.SelectedjobsId = event.map(
      (e) => e.jobIdFragment
    );

    this.priorityDisable = false;
    this.requeueDisable = false;
    this.submitDisable = false;
    this.cancelDisable = false;

    if (this.JobDetailsLocalVariable.SelectedjobsId.length == 0) {
      this.priorityDisable = true;
      this.requeueDisable = true;
      this.submitDisable = true;
      this.cancelDisable = true;
    }

    event
      .map((e) => e.statusFragment)
      .forEach((status) => {
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
            this.priorityDisable = true;
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
    this.JobDetailsLocalVariable.SelectedjobsId = [jobId];
    this.JobDetailsLocalVariable.passingEventMsg = action;
    this.JobDetailsLocalVariable.openPopupModal = true;
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
    this.JobDetailsLocalVariable.recordperpagejob =
      this.localstorage.get('recordperpage');
    if (
      this.localstorage.get('recordperpage') == null ||
      this.localstorage.get('recordperpage') == undefined ||
      isNaN(this.localstorage.get('recordperpage')) ||
      this.localstorage.get('recordperpage') == ''
    ) {
      this.JobDetailsLocalVariable.recordperpagejob = 10;
    }
  }

  ButtonEvents(EventStr: string): Promise<any> {
    return new Promise((resolve, reject) => {
      switch (EventStr) {
        case 'Requeue': {
          this.JobDetailsLocalVariable.dataloading = true;
          this.ApiService.SetRequeue(
            this.JobDetailsLocalVariable.SelectedjobsId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              this.JobDetailsLocalVariable.dataloading = false;
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
          this.JobDetailsLocalVariable.dataloading = true;
          this.ApiService.GetPendingReason(
            this.JobDetailsLocalVariable.SelectedjobsId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              this.JobDetailsLocalVariable.dataloading = false;
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
        case 'Cancel': {
          this.JobDetailsLocalVariable.dataloading = true;
          this.ApiService.SetCancel(
            this.JobDetailsLocalVariable.SelectedjobsId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              this.JobDetailsLocalVariable.dataloading = false;
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
        case 'Submit': {
          this.JobDetailsLocalVariable.dataloading = true;
          this.ApiService.SetSubmit(
            this.JobDetailsLocalVariable.SelectedjobsId
          ).subscribe({
            next: (res: any) => {
              console.log(res);
              this.JobDetailsLocalVariable.dataloading = false;
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
      }
    });
  }
}
