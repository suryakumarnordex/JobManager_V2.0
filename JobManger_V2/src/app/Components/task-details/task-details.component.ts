import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import {
  SearchResultsLayout,
  SearchTaskResultsLayout,
} from 'src/app/Models/helper';
import { TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import { TaskDetailsLocalVariable } from './task-details-localvariable';
import { TaskDetaillocalstorage } from '../task-header/task-detail-Localstorage';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ClrDatagridStateInterface } from '@clr/angular';
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
  requestFromTask: boolean = true;
  selected = [] as any;
  pageSize: number = 1;
  totalRecords = 0;
  totalPage: number;
  dataloading: boolean = false;
  JobDetailsLocalVariable: any;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService,
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable,
    public TaskDetailsLocalStorage: TaskDetaillocalstorage,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.GetTaskDetails();
    this.GetTaskLocalStorageColumnValue();
  }
  showFileData(log: any) {
    this.TaskDetailsLocalVariable.LogFileData = null;
    this.getFilepath(log);
    this.TaskDetailsLocalVariable.openModal = true;
  }
  getFilepath(filepath: any) {
    this.ApiService.getFilePath(filepath).subscribe((data) => {
      if (data !== null) {
        this.TaskDetailsLocalVariable.LogFileData = data;
      }
    });
  }

  GetTaskDetails() {
    this.dataloading = true;
    console.log(this.JobIDFragement);
    this.TaskDetailsLocalVariable.SelectedJobIDFragement = this.JobIDFragement;
    this.ApiService.searchTaskLayout(
      this.JobIDFragement,
      '',
      '',
      [],
      '',
      '',
      '',
      '',
      this.TaskDetailsLocalVariable.currentpagetask,
      this.TaskDetailsLocalVariable.recordperpagetask,
      false
    ).subscribe({
      next: (res: SearchTaskResultsLayout) => {
        this.taskLayout = res.results;
        this.totalRecords = res.totalResults;
        this.totalPage = Math.ceil(
          this.totalRecords / this.TaskDetailsLocalVariable.recordperpagetask
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
    this.TaskDetailsLocalVariable.SelectedtaskId = event.map(
      (e) => e.taskIdFragment
    );
    this.taskLength = this.TaskDetailsLocalVariable.SelectedtaskId.length;
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
  }

  Columnfilters(state: ClrDatagridStateInterface) {
    let waitForChange = false;

    if (state.filters) {
      this.TaskDetailsLocalVariable.dataloading = true;
      for (const filter of state.filters) {
        this.TaskDetailsLocalVariable.currentpage = 1;
        const { property, value } = <{ property: string; value: string }>filter;

        switch (property) {
          case 'taskIdFragment': {
            this.TaskDetailsLocalVariable.filterTaskid = value;
            this.TaskDetailsLocalVariable.OrderBy = 'taskid';
            console.log(this.TaskDetailsLocalVariable.filterTaskid);
            break;
          }
          case 'nameFragment': {
            this.TaskDetailsLocalVariable.filterTaskName = value;
            this.TaskDetailsLocalVariable.OrderBy = 'taskname';
            console.log(this.TaskDetailsLocalVariable.filterTaskName);
            break;
          }
          // case 'TaskStateFragment': {
          //   this.TaskDetailsLocalVariable.filterTaskState = value;
          //   this.TaskDetailsLocalVariable.OrderBy = 'taskstate';
          //   console.log(this.TaskDetailsLocalVariable.filterTaskState);
          //   break;
          // }
          // case 'ExitCodeFragment': {
          //   this.TaskDetailsLocalVariable.filterExitCode = value;
          //   this.TaskDetailsLocalVariable.OrderBy = 'exitcode';
          //   console.log(this.TaskDetailsLocalVariable.filterExitCode);
          //   break;
          // }
          // case 'LogFragment': {
          //   this.TaskDetailsLocalVariable.filterLog = value;
          //   this.TaskDetailsLocalVariable.OrderBy = 'log';
          //   console.log(this.TaskDetailsLocalVariable.filterLog);
          //   break;
          // }
          case 'startTimeFragment': {
            this.TaskDetailsLocalVariable.filterStartTime = value;
            this.TaskDetailsLocalVariable.OrderBy = 'starttime';
            console.log(this.TaskDetailsLocalVariable.filterStartTime);
            break;
          }
          case 'endTimeFragment': {
            this.TaskDetailsLocalVariable.filterEndTime = value;
            this.TaskDetailsLocalVariable.OrderBy = 'endtime';
            console.log(this.TaskDetailsLocalVariable.filterEndTime);
            break;
          }
          case 'allocatedNodesFragment': {
            this.TaskDetailsLocalVariable.filterAllocatedNodes = value;
            this.TaskDetailsLocalVariable.OrderBy = 'allocatednode';
            console.log(this.TaskDetailsLocalVariable.filterAllocatedNodes);
            break;
          }
          case 'commandLineFragment': {
            this.TaskDetailsLocalVariable.filterCommandLine = value;
            this.TaskDetailsLocalVariable.OrderBy = 'commandline';
            console.log(this.TaskDetailsLocalVariable.filterCommandLine);
            break;
          }
        }
      }
      let ColumnName = state.sort?.reverse;
      ColumnName == undefined
        ? (this.TaskDetailsLocalVariable.orderDescending = false)
        : (this.TaskDetailsLocalVariable.orderDescending = ColumnName);
      this.ApiService.searchTaskLayout(
        this.TaskDetailsLocalVariable.filterTaskid,
        '',
        this.TaskDetailsLocalVariable.filterTaskName,
        this.TaskDetailsLocalVariable.selectedState,

        this.TaskDetailsLocalVariable.filterStartTime,
        this.TaskDetailsLocalVariable.filterEndTime,
        this.TaskDetailsLocalVariable.filterAllocatedNodes,

        this.TaskDetailsLocalVariable.filterCommandLine,
        this.TaskDetailsLocalVariable.currentpage,

        this.TaskDetailsLocalVariable.recordperpagetask,
        this.TaskDetailsLocalVariable.orderDescending
      ).subscribe({
        next: (res: SearchTaskResultsLayout) => {
          this.TaskDetailsLocalVariable.layouts = res.results;
          console.log(this.TaskDetailsLocalVariable.layouts, 'RES');

          this.TaskDetailsLocalVariable.taskCount = res.totalResults;
          this.TaskDetailsLocalVariable.dataloading = false;
          this.TaskDetailsLocalVariable.totalPage = Math.ceil(
            this.TaskDetailsLocalVariable.taskCount /
              this.TaskDetailsLocalVariable.recordperpagetask
          );
        },
        error: (error) => {
          this.logger.reportError(error);
          this.TaskDetailsLocalVariable.dataloading = false;
        },
      });
    }
  }

  setRequeue() {
    this.ApiService.SetTaskRequeue(
      this.TaskDetailsLocalVariable.SelectedJobIDFragement,
      this.TaskDetailsLocalVariable.SelectedtaskId
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.TaskDetailsLocalVariable.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.TaskDetailsLocalVariable.loading = false;
      },
    });
  }
}

function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}
