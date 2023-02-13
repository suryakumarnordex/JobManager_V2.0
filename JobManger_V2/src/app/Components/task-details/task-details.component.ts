import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchTaskResultsLayout } from 'src/app/Models/helper';
import { TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import { TaskDetailsLocalVariable } from './task-details-localvariable';
import { TaskDetaillocalstorage } from '../task-header/task-detail-Localstorage';
import { LocalStorageService } from 'src/app/local-storage.service';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { ClrDatagridColumn, ClrDatagridStateInterface } from '@clr/angular';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() recordPerPage: number = 10;
  @Input() taskLayout: TaskLayoutInfo[];
  @Input() JobIDFragement: string;
  @Input() taskLength: number;
  @ViewChildren(ClrDatagridColumn) columns: QueryList<ClrDatagridColumn>;

  public LogFileData: any;

  dataloading: boolean = false;
  TaskRequeueDisable: boolean = true;
  LogModelOpen: boolean = false;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService,
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable,
    public TaskDetailsLocalStorage: TaskDetaillocalstorage,
    private localstorage: LocalStorageService,
    public JobDetailsLocalVariable: JobDetailsLocalVariable
  ) {}

  ngOnInit(): void {
    this.GetTaskLocalStorageColumnValue();
  }
  showFileData(log: any) {
    this.LogFileData = '';
    this.getFilepath(log);
  }

  getFilepath(filepath: any) {
    this.ApiService.getFilePath(filepath).subscribe((data) => {
      if (data !== null) {
        this.LogFileData = data;
        this.LogModelOpen = true;
      } else {
        this.LogFileData = '';
        this.LogModelOpen = false;
      }
    });
  }

  GetTaskDetails() {
    this.dataloading = true;
    this.CallSearchTaskLayout();
  }

  CallSearchTaskLayout() {
    this.ApiService.searchTaskLayout(
      this.JobDetailsLocalVariable.SelectedJobId,
      this.TaskDetailsLocalVariable.filterTaskId,
      this.TaskDetailsLocalVariable.filterName,
      this.TaskDetailsLocalVariable.selectedState,
      '',
      '',
      this.TaskDetailsLocalVariable.FilterTaskAllocatedNode,
      this.TaskDetailsLocalVariable.filterCommandLine,
      this.TaskDetailsLocalVariable.currentpage,
      this.TaskDetailsLocalVariable.recordperpage,
      this.TaskDetailsLocalVariable.OrderBy,
      this.TaskDetailsLocalVariable.orderDescending
    ).subscribe({
      next: (res: SearchTaskResultsLayout) => {
        this.taskLayout = res.results;

        this.TaskDetailsLocalVariable.TaskCount = res.totalResults;
        this.TaskDetailsLocalVariable.totalPage = Math.ceil(
          this.TaskDetailsLocalVariable.TaskCount /
            this.TaskDetailsLocalVariable.recordperpage
        );
        this.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },
    });
  }
  selectionChanged(event: any[]) {
    if (event !== undefined) {
      this.TaskDetailsLocalVariable.SelectedtasksId = event.map(
        (e) => e.taskIdFragment
      );
      this.taskLength = this.TaskDetailsLocalVariable.SelectedtasksId.length;
      event
        .map((e) => e.statusFragment)
        .forEach((status) => {
          switch (status.toString()) {
            case 'Failed' || 'Cancelled' || 'Running': {
              this.TaskRequeueDisable = false;
              break;
            }
            default: {
              this.TaskRequeueDisable = true;
              break;
            }
          }
        });
    }
  }
  public TaskColumnResized(event: any, colType: string) {
    this.localstorage.set(colType, event);

    switch (colType) {
      case 'taskidcolumnwidth': {
        this.TaskDetailsLocalStorage.taskidcolumnWidthValue = event;
        break;
      }
      case 'tasknamecolumnwidth': {
        this.TaskDetailsLocalStorage.tasknamecolumnWidthValue = event;
        break;
      }
      case 'taskstatecolumnwidth': {
        this.TaskDetailsLocalStorage.taskstatecolumnWidthValue = event;
        break;
      }
      case 'exitcodecolumnwidth': {
        this.TaskDetailsLocalStorage.exitcodecolumnWidthValue = event;
        break;
      }
      case 'tasklogcolumnwidth': {
        this.TaskDetailsLocalStorage.tasklogcolumnWidthValue = event;
        break;
      }
      case 'taskstarttimecolumnwidth': {
        this.TaskDetailsLocalStorage.taskstartcolumnWidthValue = event;
        break;
      }
      case 'taskendtimecolumnwidth': {
        this.TaskDetailsLocalStorage.taskendcolumnWidthValue = event;
        break;
      }
      case 'allocatednodecolumnwidth': {
        this.TaskDetailsLocalStorage.allocatednodescolumnWidthValue = event;
        break;
      }
      case 'commandlinecolumnwidth': {
        this.TaskDetailsLocalStorage.commandlinecolumnWidthValue = event;
        break;
      }
    }
  }
  GetTaskLocalStorageColumnValue() {
    this.TaskDetailsLocalStorage.taskidcolumnWidthValue =
      this.localstorage.get('taskidcolumnwidth');
    this.TaskDetailsLocalStorage.tasknamecolumnWidthValue =
      this.localstorage.get('tasknamecolumnwidth');
    this.TaskDetailsLocalStorage.taskstatecolumnWidthValue =
      this.localstorage.get('taskstatecolumnwidth');
    this.TaskDetailsLocalStorage.exitcodecolumnWidthValue =
      this.localstorage.get('exitcodecolumnwidth');
    this.TaskDetailsLocalStorage.tasklogcolumnWidthValue =
      this.localstorage.get('tasklogcolumnwidth');
    this.TaskDetailsLocalStorage.taskstartcolumnWidthValue =
      this.localstorage.get('taskstarttimecolumnwidth');
    this.TaskDetailsLocalStorage.taskendcolumnWidthValue =
      this.localstorage.get('taskendtimecolumnwidth');
    this.TaskDetailsLocalStorage.allocatednodescolumnWidthValue =
      this.localstorage.get('allocatednodecolumnwidth');
    this.TaskDetailsLocalStorage.commandlinecolumnWidthValue =
      this.localstorage.get('commandlinecolumnwidth');
    this.TaskDetailsLocalVariable.recordperpage =
      this.localstorage.get('taskrecordperpage');
  }
  setRequeue() {
    this.ApiService.SetTaskRequeue(
      this.JobDetailsLocalVariable.SelectedJobId,
      this.TaskDetailsLocalVariable.SelectedtasksId
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataloading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.dataloading = false;
      },
    });
  }

  clearallFilters() {
    this.TaskDetailsLocalVariable.dataloading = true;
    this.columns.forEach((column) => (column.filterValue = ''));
    this.TaskDetailsLocalVariable.currentpage = 1;
    this.ClearAllLocalVariables();
    this.CallSearchTaskLayout();
  }

  ClearAllLocalVariables() {
    this.TaskDetailsLocalVariable.filterTaskId = '';
    this.TaskDetailsLocalVariable.filterCommandLine = '';
    this.TaskDetailsLocalVariable.filterName = '';
    this.TaskDetailsLocalVariable.selectedState = [];

    this.TaskDetailsLocalVariable.OrderBy = '';
    this.TaskDetailsLocalVariable.orderDescending = false;
    this.TaskDetailsLocalVariable.currentpage = 1;
  }

  Columnfilters(ColumnProperties: ClrDatagridStateInterface) {
    this.TaskDetailsLocalVariable.ColumnProperties = ColumnProperties;
    this.TaskDetailsLocalVariable.currentpage = 1;
    if (ColumnProperties.filters) {
      this.TaskDetailsLocalVariable.dataloading = true;
      this.TaskDetailsLocalVariable.selectedState = [];
      for (const filterctrl of ColumnProperties.filters) {
        if (filterctrl.filterParamName == 'statusFragment') {
          filterctrl.selectedItems
            .map((e: any) => e.value)
            .forEach((value: string) => {
              if (
                !this.TaskDetailsLocalVariable.selectedState.includes(value)
              ) {
                this.TaskDetailsLocalVariable.selectedState.push(value);
              }
            });
        }

        const { property, value } = <{ property: string; value: string }>(
          filterctrl
        );

        switch (property) {
          case 'taskIdFragment': {
            this.TaskDetailsLocalVariable.filterTaskId = value;
            this.TaskDetailsLocalVariable.OrderBy = 'TaskId';
            break;
          }
          case 'tasknameFragment': {
            this.TaskDetailsLocalVariable.filterName = value;
            this.TaskDetailsLocalVariable.OrderBy = 'Taskname';
            break;
          }

          case 'exitcodeFragment': {
            this.TaskDetailsLocalVariable.FilterTaskExitCode = value;
            this.JobDetailsLocalVariable.OrderBy = 'ExitCode';
            break;
          }
          case 'allocatedFragment': {
            this.TaskDetailsLocalVariable.FilterTaskAllocatedNode = value;
            this.TaskDetailsLocalVariable.OrderBy = 'AllocatedNodes';
            break;
          }
          case 'commandlineFragment': {
            this.TaskDetailsLocalVariable.filterCommandLine = value;
            this.TaskDetailsLocalVariable.OrderBy = 'CommandLine';
            break;
          }
          default: {
            this.TaskDetailsLocalVariable.OrderBy = 'TaskId';
          }
        }
      }
    } else {
      this.TaskDetailsLocalVariable.filterTaskId = '';
      this.TaskDetailsLocalVariable.filterName = '';
      this.TaskDetailsLocalVariable.FilterTaskExitCode = '';
      this.TaskDetailsLocalVariable.FilterTaskAllocatedNode = '';
      this.TaskDetailsLocalVariable.filterCommandLine = '';
      this.TaskDetailsLocalVariable.selectedState = [];
    }
    this.ColumnSorting(ColumnProperties);
    this.CallSearchTaskLayout();
  }

  ColumnSorting(ColumnProperties: ClrDatagridStateInterface) {
    if (ColumnProperties.sort?.by !== undefined) {
      switch (ColumnProperties.sort?.by) {
        case 'taskIdFragment': {
          this.TaskDetailsLocalVariable.OrderBy = 'TaskId';
          break;
        }
        case 'tasknameFragment': {
          this.TaskDetailsLocalVariable.OrderBy = 'Taskname';
          break;
        }
        case 'exitcodeFragment': {
          this.TaskDetailsLocalVariable.OrderBy = 'ExitCode';
          break;
        }
        case 'allocatedFragment': {
          this.TaskDetailsLocalVariable.OrderBy = 'AllocatedNodes';
          break;
        }
        case 'commandlineFragment': {
          this.TaskDetailsLocalVariable.OrderBy = 'CommandLine';
          break;
        }
      }
    }
    let ColumnName = ColumnProperties.sort?.reverse;
    ColumnName == undefined
      ? (this.TaskDetailsLocalVariable.orderDescending = true)
      : (this.TaskDetailsLocalVariable.orderDescending = ColumnName);
  }

  ButtonEvents(EventStr: string): Promise<any> {
    return new Promise((resolve, reject) => {
      switch (EventStr) {
        case 'TaskRequeue': {
          this.ApiService.SetTaskRequeue(
            this.JobDetailsLocalVariable.SelectedJobId,
            this.TaskDetailsLocalVariable.SelectedtasksId
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
      }
    });
  }
}
