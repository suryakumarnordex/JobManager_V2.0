import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchTaskResultsLayout } from 'src/app/Models/helper';
import { TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import { TaskDetailsLocalVariable } from './task-details-localvariable';
import { TaskDetaillocalstorage } from '../task-header/task-detail-Localstorage';
import { LocalStorageService } from 'src/app/local-storage.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() recordPerPage: number = 10;
  @Input() taskLayout: TaskLayoutInfo[];
  @Input() JobIDFragement: string;

  requestFromTask: boolean = true;
  selected = [] as any;
  pageSize: number = 1;
  totalRecords = 0;
  totalPage: number;
  dataloading: boolean = false;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService,
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable,
    public TaskDetailsLocalStorage: TaskDetaillocalstorage,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.GetTaskDetails();
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
    // console.log(event);
    this.TaskDetailsLocalVariable.SelectedtaskId = event.map(
      (e) => e.taskIdFragment
    );
    console.log(this.TaskDetailsLocalVariable.SelectedJobIDFragement);

    console.log(this.TaskDetailsLocalVariable.SelectedtaskId);

    // this.JobDetailsLocalVariable.SelectedjobId=(event.map((e) => e.jobIdFragment));
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
