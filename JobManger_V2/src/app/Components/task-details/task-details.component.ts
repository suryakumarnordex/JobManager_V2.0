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
  @Input() taskLayout: TaskLayoutInfo[];
  @Input() JobIDFragement: string;  
  selected = [] as any;
  total = 0;
  dataloading:boolean=false;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.GetTaskDetails();
  }

  GetTaskDetails() {
    this.dataloading=true;
    this.ApiService.searchTaskLayout(
      this.JobIDFragement,
      '',
      '',
      '',
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
        this.total = res.totalResults; 
        this.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },      
    });
  }
}
