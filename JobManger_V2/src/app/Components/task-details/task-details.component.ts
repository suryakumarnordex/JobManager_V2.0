import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchTaskResultsLayout } from 'src/app/Models/helper';
import { TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import {TaskDetailsLocalVariable} from './task-details-localvariable'
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() recordPerPage: number = 10;
  @Input() taskLayout: TaskLayoutInfo[];
  @Input() JobIDFragement: string;
  @Input() taskLength:number;
  
  requestFromTask: boolean = true;
  selected = [] as any;
  pageSize: number = 1;
  totalRecords = 0;
  totalPage: number;
  dataloading: boolean = false;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService,
    public TaskDetailsLocalVariable:TaskDetailsLocalVariable
  ) {}

  ngOnInit(): void {
    this.GetTaskDetails();
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
        this.totalPage = Math.ceil(this.totalRecords / this.TaskDetailsLocalVariable.recordperpagetask);
        this.dataloading = false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },
    });
  }
  selectionChanged(event: any[]) {   
    this.TaskDetailsLocalVariable.SelectedtaskId = (event.map((e) => e.taskIdFragment));
    this.taskLength = this.TaskDetailsLocalVariable.SelectedtaskId.length;
  }
  setRequeue(){
    this.ApiService.SetTaskRequeue(this.TaskDetailsLocalVariable.SelectedJobIDFragement,this.TaskDetailsLocalVariable.SelectedtaskId)
    .subscribe({
      next:(res:any)=>{
        console.log(res);
        this.TaskDetailsLocalVariable.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
        this.TaskDetailsLocalVariable.loading = false;
      }
    })
    
  }
}
