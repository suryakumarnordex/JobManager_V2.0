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
import { ClrDatagridColumn } from '@clr/angular';
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
  LogFileData: any;

  // requestFromTask: boolean = true;
  // selected = [] as any;
  // pageSize: number = 1;
  // totalRecords = 0;
  // totalPage: number;
  dataloading: boolean = false;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService,
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable,
    public TaskDetailsLocalStorage: TaskDetaillocalstorage,
    private localstorage: LocalStorageService,
    private JobDetailsLocalVariable: JobDetailsLocalVariable
  ) {}

  ngOnInit(): void {
    this.GetTaskLocalStorageColumnValue();
    this.GetTaskDetails();
  }
  showFileData(log: any) {
    this.LogFileData = null;
    this.getFilepath(log);
    if (this.LogFileData !== null) {
      this.TaskDetailsLocalVariable.openPopupModal = true;
    }
  }
  getFilepath(filepath: any) {
    this.ApiService.getFilePath(filepath).subscribe((data) => {
      if (data !== null) {
        this.LogFileData = data;
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
      this.TaskDetailsLocalVariable.SelectedtaskId,
      this.TaskDetailsLocalVariable.filterName,
      this.TaskDetailsLocalVariable.selectedState,
      '',
      '',
      '',
      this.TaskDetailsLocalVariable.filterCommandLine,
      this.TaskDetailsLocalVariable.currentpage,
      this.TaskDetailsLocalVariable.recordperpage,
      false
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
    this.TaskDetailsLocalVariable.SelectedtasksId = event.map(
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
}
