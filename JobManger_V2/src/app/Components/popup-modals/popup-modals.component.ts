import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsLocalVariable } from '../task-details/task-details-localvariable';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { PopupModelLocalvariable } from '../popup-modals/popup-modalslocalvariable';
@Component({
  selector: 'app-popup-modals',
  templateUrl: './popup-modals.component.html',
  styleUrls: ['./popup-modals.component.css'],
})
export class PopupModalsComponent implements OnInit {
  @Input() passingEvent: string;
  isOpen: boolean = false;
  public PopupResult: any;
  public IsSuccess: boolean = false;
  public Popuploading: boolean = false;
  public DisplayMsg: any;

  get parentChildConnection(): boolean {
    return this.isOpen;
  }

  @Input()
  ngSwitchCase: any;
  @Input() set parentChildConnection(setting: boolean) {
    this.isOpen = setting;
    if (setting === false) {
      this.modalClosed.emit();
    }
  }

  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public JobDetailsLocalVariable: JobDetailsLocalVariable,
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable,
    public PopupModelLocalvariable: PopupModelLocalvariable,
    private JobDetailscomponent: JobDetailsComponent,
    private TaskDetailsComponent: TaskDetailsComponent,
    private ApiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.Popuploading = true;
  }

  PopupEvent() {
    this.TaskDetailsLocalVariable.dataloading = false;
    this.passingEvent = this.JobDetailsLocalVariable.passingEventMsg;
    switch (this.JobDetailsLocalVariable.passingEventMsg) {
      case 'Priority': {
        this.SetJobPriority()
          .then((res) => {
            this.PopupModelLocalvariable.isProgressbar = true;
            this.PopupModelLocalvariable.isclose = true;
            this.PopupModelLocalvariable.iscloseheader = true;
            Object.keys(res).forEach((key) => {
              if (this.PopupResult == undefined) {
                this.Popuploading = true;
                setTimeout(() => {
                  this.PopupResult =
                    'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.PopupModelLocalvariable.isSignpost = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = false;
                }, 8000); // 8 sec
              } else {
                setTimeout(() => {
                  this.PopupResult +=
                    ',' + 'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.PopupModelLocalvariable.isSignpost = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = false;
                }, 8000);
              }

              if (res[key].includes('Already')) {
                this.IsSuccess = false;
              } else {
                this.IsSuccess = true;
              }
            });
          })
          .catch((error) => {
            this.PopupResult = error;
            this.IsSuccess = false;
          });
        break;
      }
      case 'TaskRequeue': {
        this.TaskDetailsComponent.ButtonEvents(
          this.JobDetailsLocalVariable.passingEventMsg
        )
          .then((res) => {
            this.PopupModelLocalvariable.isProgressbar = true;
            this.PopupModelLocalvariable.isclose = true;
            this.PopupModelLocalvariable.iscloseheader = true;
            Object.keys(res).forEach((key) => {
              if (this.PopupResult == undefined) {
                this.Popuploading = true;
                setTimeout(() => {
                  this.PopupResult =
                    'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.PopupModelLocalvariable.isSignpost = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = false;
                }, 8000);
              } else {
                setTimeout(() => {
                  this.PopupResult +=
                    ',' + 'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.PopupModelLocalvariable.isSignpost = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = false;
                }, 8000);
              }
              if (res[key].includes('Already')) {
                this.IsSuccess = false;
              } else {
                this.IsSuccess = true;
              }
            });
          })
          .catch((error) => {
            this.PopupResult = error;
            this.IsSuccess = false;
          });
        break;
      }
      default: {
        this.JobDetailscomponent.ButtonEvents(
          this.JobDetailsLocalVariable.passingEventMsg
        )
          .then((res) => {
            this.PopupModelLocalvariable.isProgressbar = true;
            this.PopupModelLocalvariable.isclose = true;
            this.PopupModelLocalvariable.iscloseheader = true;
            Object.keys(res).forEach((key) => {
              if (this.PopupResult == undefined) {
                this.Popuploading = true;
                setTimeout(() => {
                  this.PopupResult =
                    'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.Popuploading = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = false;
                }, 8000); // 8 seconds delay
              } else {
                setTimeout(() => {
                  this.PopupResult +=
                    ',' + 'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.Popuploading = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = true;
                }, 8000); // 8 seconds delay
              }

              if (res[key].includes('Already')) {
                setTimeout(() => {
                  this.IsSuccess = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                }, 8000);
              } else {
                setTimeout(() => {
                  this.IsSuccess = true;
                  this.PopupModelLocalvariable.isProgressbar = false;
                }, 8000);
              }
            });
          })
          .catch((error) => {
            this.PopupResult = error;

            this.IsSuccess = false;
          });
        break;
      }
    }
    // this.JobDetailsLocalVariable.dataloading = false;
    this.Popuploading = false;
  }

  PopupModelClose() {
    this.parentChildConnection = false;
    this.JobDetailsLocalVariable.disableButton = false;
    this.PopupResult = undefined;
    this.PopupModelLocalvariable.PriorityValueoption = '';
    this.PopupModelLocalvariable.PriorityValue = '';
    this.PopupModelLocalvariable.isSignpost = true;
    this.JobDetailscomponent.GetLocalStorageColumnValue();

    if (this.IsSuccess) {
      if (this.JobDetailsLocalVariable.passingEventMsg == 'TaskRequeue') {
        this.TaskDetailsComponent.CallSearchTaskLayout();
        this.TaskDetailsLocalVariable.CheckboxofTaskRow = [];
        this.TaskDetailsLocalVariable.SelectedtasksId = [];
      } else {
        this.JobDetailscomponent.CallSearchlayout();
        this.JobDetailsLocalVariable.SelectedjobsId = [];
        this.JobDetailsLocalVariable.CheckboxofJobRow = [];
      }
    }
    this.IsSuccess = false;
  }

  public SetJobPriority(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.JobDetailsLocalVariable.dataloading = true;
      this.ApiService.SetJobPriority(
        this.JobDetailsLocalVariable.SelectedjobsId,
        this.PopupModelLocalvariable.PriorityValue
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
    });
  }

  public Validation() {
    let isnum = /^\d+$/.test(this.PopupModelLocalvariable.PriorityValue);
    let SpecialChar: string = '';
    if (isnum) {
      if (this.PopupModelLocalvariable.PriorityValue.includes('+')) {
        SpecialChar = '+';
      } else if (this.PopupModelLocalvariable.PriorityValue.includes('-')) {
        SpecialChar = '-';
      } else {
        SpecialChar = '';
      }
    }
  }
}
