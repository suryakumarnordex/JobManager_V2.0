import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import {
  SearchResultsLayout,
  SearchTaskResultsLayout,
} from 'src/app/Models/helper';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';

import { LoggerService } from 'src/app/Services/logger.service';

import { LocalStorageService } from 'src/app/local-storage.service';
import { JobDetaillocalstorage } from './job-detail-Localstorage';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  layouts: LayoutInfo[];

  @Input() recordPerPage: number = 10;
  taskLayout: TaskLayoutInfo[];
  requestFromJOb: boolean = true;
  selected = [] as any;
  jobCount = 0;
  totalPage: number;
  loading = true;
  detailTaskID: any;
  pageSize: number = 1;
  dataloading: boolean = false;
  JobDetailsLocalStoragehtml: JobDetaillocalstorage;
  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService,
    private localstorage: LocalStorageService,
    private JobDetailsLocalStorage: JobDetaillocalstorage
  ) {}

  ngOnInit(): void {
    this.GetJobDetails(this.recordPerPage, this.pageSize);
  }
  public ColumnResized(event: any, colType: String) {
    switch (colType) {
      case 'idcolumnwidth': {
        this.JobDetailsLocalStorage.setidcolumnWidthValue(event);
        console.log(this.JobDetailsLocalStorage.idcolumnWidthValue, colType);
        break;
      }
      case 'cockpitcolumnWidth': {
        this.JobDetailsLocalStorage.setcockpitcolumnWidthValue(event);
        console.log(
          this.JobDetailsLocalStorage.cockpitcolumnWidthValue,
          colType
        );
        break;
      }
      case 'runcolumnWidth': {
        this.JobDetailsLocalStorage.setruncolumnWidthValue(event);
        console.log(this.JobDetailsLocalStorage.runcolumnWidthValue, colType);
        break;
      }
      case 'typecolumnWidth': {
        this.JobDetailsLocalStorage.settypecolumnWidthValue(event);
        break;
      }
      case 'topiccolumnWidth': {
        this.JobDetailsLocalStorage.settopiccolumnWidthValue(event);
        break;
      }
      case 'statuscolumnWidth': {
        this.JobDetailsLocalStorage.setstatuscolumnWidthValue(event);
        break;
      }
      case 'progresscolumnWidth': {
        this.JobDetailsLocalStorage.setprogresscolumnWidthValue(event);
        break;
      }
      case 'prioritycolumnWidth': {
        this.JobDetailsLocalStorage.setprioritycolumnWidthValue(event);
        break;
      }
      case 'notaskcolumnWidth': {
        this.JobDetailsLocalStorage.setnotaskcolumnWidthValue(event);
        break;
      }
      case 'runningTaskcolumnWidth': {
        this.JobDetailsLocalStorage.setRunningTaskcolumnWidthValue(event);
        break;
      }
      case 'queuedTaskcolumnWidth': {
        this.JobDetailsLocalStorage.setQueuedTaskcolumnWidthValue(event);
        break;
      }
      case 'starttimecolumnWidth': {
        this.JobDetailsLocalStorage.setstarttimecolumnWidthValue(event);
        break;
      }
      case 'endtimecolumnWidth': {
        this.JobDetailsLocalStorage.setendtimecolumnWidthValue(event);
        break;
      }
      case 'submittimecolumnWidth': {
        this.JobDetailsLocalStorage.setsubmittimecolumnWidth(event);
        break;
      }
      case 'elapsedtimecolumnWidth': {
        this.JobDetailsLocalStorage.setelapsedtimecolumnWidthValue(event);
        break;
      }
    }
  }

  GetJobDetails(recordPerPage: number, pageSize: number) {
    this.pageSize = pageSize;
    this.recordPerPage = recordPerPage;
    this.dataloading = true;

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
      '',
      '',
      '',
      false,
      this.pageSize,
      this.recordPerPage,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.layouts = res.results;
        this.jobCount = res.totalResults;
        this.dataloading = false;
        this.totalPage = Math.ceil(this.jobCount / this.recordPerPage);
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },
    });
  }
  onDetailOpen(event: any) {
    if (event !== null) {
      this.detailTaskID = event.jobIdFragment;
      this.ApiService.searchTaskLayout(
        this.detailTaskID,
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
          this.taskLayout = res.results;
          this.jobCount = res.totalResults;
          this.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },
      });
    }
  }
  copyClipboard(selectedItem: any) {
    const create_copy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', selectedItem.CockpitFolder);
      e.preventDefault();
      if (
        selectedItem.CockpitFolder != '' &&
        selectedItem.CockpitFolder != null
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
    this.JobDetailsLocalStorage.SetSelectedjobId(
      event.map((e) => e.jobIdFragment)
    );
    console.log(this.JobDetailsLocalStorage.SelectedjobId);
  }
  // JobManager Actions
  SetJobPriority() {
    this.ApiService.SetJobPriority([56819], 'Normal+100').subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  setRequeue() {
    this.ApiService.SetRequeue([]).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
  getPendingReasons() {
    this.ApiService.GetPendingReason([]).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
  setCancel() {
    this.ApiService.SetCancel([]).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
  setSubmit() {
    this.ApiService.SetSubmit([]).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
}
