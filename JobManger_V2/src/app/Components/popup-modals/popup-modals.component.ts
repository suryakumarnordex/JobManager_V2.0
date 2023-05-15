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
    this.PopupResult = undefined;
    this.TaskDetailsLocalVariable.dataloading = false;
    this.passingEvent = this.JobDetailsLocalVariable.passingEventMsg;
    switch (this.JobDetailsLocalVariable.passingEventMsg) {
      case 'Priority': {
        let PriorityBand = 0;
        var IsNumber = Number(this.PopupModelLocalvariable.PriorityValue);
        if(IsNumber)
        {
          PriorityBand = IsNumber;
        }
        else
        {
          PriorityBand = this.Validation(this.PopupModelLocalvariable.PriorityValue);
        }        
        if(PriorityBand <=4000)
          {          
        this.SetJobPriority()
          .then((res) => {
            this.PopupModelLocalvariable.isProgressbar = true;
            this.PopupModelLocalvariable.isclose = true;
            this.PopupModelLocalvariable.iscloseheader = true;
            Object.keys(res).forEach((key) => { 
              if (this.PopupResult == undefined && Object.keys(res).length == 1) {
                this.Popuploading = true;
                setTimeout(() => {
                  this.PopupResult =
                    'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                  this.PopupModelLocalvariable.isclose=false;
                  this.PopupModelLocalvariable.isSignpost = false;
                  this.PopupModelLocalvariable.isProgressbar = false;
                  this.PopupModelLocalvariable.iscloseheader = false;
                }, 8000);
              } else {
                setTimeout(() => {
                    if(this.PopupResult == undefined || (this.PopupResult != undefined && Object.keys(res).length == 1)){
                      this.PopupResult='Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];;
                    }
                    else{
                      this.PopupResult += ',' + 'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
                    }
                  this.PopupModelLocalvariable.isclose=false;
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
            this.IsSuccess = false;
            this.PopupResult = error;            
          });
        break;
      }
      else
        {
          this.IsSuccess = false;
          this.PopupResult = "Not allowed this priority value " + this.PopupModelLocalvariable.PriorityValue;         
          break;
        }
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
        this.JobDetailscomponent.DisableButtons(true);
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
  
  Validation(priorityStr: string): number {
    try {
        let sumValue = 0;
        let priorityValue = '';
        let specialChar = '';

        const containsInt = /\d/.test(priorityStr);
        if (containsInt) {
            const chars = ['+', '-'];
            for (const char of chars) {
                if (priorityStr.includes(char.trim())) {
                    specialChar = char.trim();
                    break;
                }
            }

            if (specialChar !== '') {
                const priorityStrList = priorityStr.split(specialChar);

                if (priorityStrList.length > 1) {
                    priorityValue = priorityStrList[0].toUpperCase().trim();
                    const value = parseInt(priorityStrList[1].toString().trim());
                    if (!isNaN(value)) {
                        sumValue = value;
                    }
                }
            }
        }

        if (specialChar === '') {
            priorityValue = priorityStr.toUpperCase().trim();
            sumValue = 0;
        }

        let priorityBand = 0;
        switch (priorityValue.trim()) {
            case 'LOWEST':
                if (specialChar === '+') {
                    priorityBand = 0 + sumValue;
                } else if (specialChar === '-') {
                    priorityBand = 0 - sumValue;
                } else {
                    priorityBand = 0;
                }
                break;

            case 'BELOWNORMAL':
                if (specialChar === '+') {
                    priorityBand = 1000 + sumValue;
                } else if (specialChar === '-') {
                    priorityBand = 1000 - sumValue;
                } else {
                    priorityBand = 1000;
                }
                break;

            case 'NORMAL':
                if (specialChar === '+') {
                    priorityBand = 2000 + sumValue;
                } else if (specialChar === '-') {
                    priorityBand = 2000 - sumValue;
                } else {
                    priorityBand = 2000;
                }
                break;

            case 'ABOVENORMAL':
                if (specialChar === '+') {
                    priorityBand = 3000 + sumValue;
                } else if (specialChar === '-') {
                    priorityBand = 3000 - sumValue;
                } else {
                    priorityBand = 3000;
                }
                break;

            case 'HIGHEST':
                if (specialChar === '+') {
                    priorityBand = 4000 + sumValue;
                } else if (specialChar === '-') {
                    priorityBand = 4000 - sumValue;
                } else {
                    priorityBand = 4000;
                }
                break;
        }

        return priorityBand;
    } catch (ex) {
        console.log(ex);
        return 0;
    }
}





 
 
 
 
 
 

 
 
 
}
