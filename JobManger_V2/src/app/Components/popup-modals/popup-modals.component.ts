import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { TaskDetailsLocalVariable } from '../task-details/task-details-localvariable';
import { TaskDetailsComponent } from '../task-details/task-details.component';
@Component({
  selector: 'app-popup-modals',
  templateUrl: './popup-modals.component.html',
  styleUrls: ['./popup-modals.component.css'],
})
export class PopupModalsComponent implements OnInit {
  @Input() passingEvent: string;
  isOpen: boolean = false;
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
    private JobDetailscomponent: JobDetailsComponent,
    private TaskDetailsComponent: TaskDetailsComponent
  ) {}

  ngOnInit(): void {
    this.JobDetailsLocalVariable.loading = true;
  }

  PopupEvent() {
    this.passingEvent = this.JobDetailsLocalVariable.passingEvent;
    switch (this.JobDetailsLocalVariable.passingEvent) {
      case 'Priority': {
        this.JobDetailsLocalVariable.priorityValue =
          this.JobDetailsLocalVariable.priorityValue.replace('+', '%2B');
        this.JobDetailsLocalVariable.Result =
          this.JobDetailscomponent.SetJobPriority();
        this.JobDetailsLocalVariable.IsSuccess = true;
        break;
      }
      default: {
        this.JobDetailscomponent.ButtonEvents(
          this.JobDetailsLocalVariable.passingEvent
        )
          .then((res) => {
            Object.keys(res).forEach((key) => {
              if (this.JobDetailsLocalVariable.Result == undefined) {
                this.JobDetailsLocalVariable.loading = true;
                console.log(this.JobDetailsLocalVariable.loading);
                this.JobDetailsLocalVariable.Result =
                  'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
              } else {
                this.JobDetailsLocalVariable.Result +=
                  ',' + 'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
              }
              if (res[key].includes('Already')) {
                this.JobDetailsLocalVariable.IsSuccess = false;
              } else {
                this.JobDetailsLocalVariable.IsSuccess = true;
              }
            });
          })
          .catch((error) => {
            this.JobDetailsLocalVariable.Result = error;
            this.JobDetailsLocalVariable.IsSuccess = false;
          });

        break;
      }
    }
    this.JobDetailsLocalVariable.dataloading = false;
    this.JobDetailsLocalVariable.loading = false;
  }

  PopupModelClose() {
    this.parentChildConnection = false;
    this.JobDetailsLocalVariable.disableButton = false;
    this.JobDetailsLocalVariable.IsSuccess = false;
    this.JobDetailsLocalVariable.Result = undefined;
  }
}
