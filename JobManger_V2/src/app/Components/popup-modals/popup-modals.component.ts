import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
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
  public PriorityValue: string;
  public PopupResult: any;
  public IsSuccess: boolean = false;
  public Popuploading: boolean = false;
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
    private TaskDetailsComponent: TaskDetailsComponent,
    private ApiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.Popuploading = true;
  }

  PopupEvent() {
    this.passingEvent = this.JobDetailsLocalVariable.passingEventMsg;
    switch (this.JobDetailsLocalVariable.passingEventMsg) {
      case 'Priority': {
        this.PriorityValue = this.PriorityValue.replace('+', '%2B');
        this.PopupResult = this.SetJobPriority();
        this.IsSuccess = true;
        break;
      }
      default: {
        this.JobDetailscomponent.ButtonEvents(
          this.JobDetailsLocalVariable.passingEventMsg
        )
          .then((res) => {
            Object.keys(res).forEach((key) => {
              if (this.PopupResult == undefined) {
                this.Popuploading = true;

                this.PopupResult =
                  'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
              } else {
                this.PopupResult +=
                  ',' + 'Job' + ' ' + key + ' ' + 'is' + ' ' + res[key];
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
    }
    this.JobDetailsLocalVariable.dataloading = false;
    this.Popuploading = false;
  }

  PopupModelClose() {
    this.parentChildConnection = false;
    this.JobDetailsLocalVariable.disableButton = false;
    this.IsSuccess = false;
    this.PopupResult = undefined;
    this.JobDetailscomponent.CallSearchlayout();
    this.JobDetailscomponent.GetLocalStorageColumnValue();
    this.JobDetailscomponent.GetMultipleSelectFiltersData();
  }

  public SetJobPriority() {
    this.ApiService.SetJobPriority(
      this.JobDetailsLocalVariable.SelectedjobsId,
      this.PriorityValue
    ).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
}
