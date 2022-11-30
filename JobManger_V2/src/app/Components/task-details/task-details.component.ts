import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchTaskResultsLayout } from 'src/app/Models/helper';
import { TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';

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
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.GetTaskDetails(this.recordPerPage, this.pageSize);
  }

  GetTaskDetails(recordPerPage: number, pageSize: number) {
    this.pageSize = pageSize;
    this.recordPerPage = recordPerPage;
    this.dataloading = true;
    console.log(this.JobIDFragement);

    this.ApiService.searchTaskLayout(
      this.JobIDFragement,
      '',
      '',
      [],
      '',
      '',
      '',
      '',
      this.pageSize,
      this.recordPerPage,
      false
    ).subscribe({
      next: (res: SearchTaskResultsLayout) => {
        this.taskLayout = res.results;
        this.totalRecords = res.totalResults;
        console.log(this.totalRecords);
        this.totalPage = Math.ceil(this.totalRecords / this.recordPerPage);
        this.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },
    });
  }
}
