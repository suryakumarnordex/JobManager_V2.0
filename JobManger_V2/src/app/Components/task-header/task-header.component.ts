import { Component, OnInit,Input } from '@angular/core';
import {TaskDetailsLocalVariable } from '../task-details/task-details-localvariable';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables'
@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css']
})
export class TaskHeaderComponent implements OnInit {
  @Input() passingEvent: string;
  @Input() taskLength:number;
  constructor(public TaskDetailsLocalVariable:TaskDetailsLocalVariable,public JobDetailsLocalVariable:JobDetailsLocalVariable) { }

  ngOnInit(): void {
  }
  openmodel(event: string) {
    this.JobDetailsLocalVariable.passingEvent = event;
    this.TaskDetailsLocalVariable.openModal = true;
  }
  onModalClose() {
    this.TaskDetailsLocalVariable.openModal = false;
    // this.TaskDetailsLocalVariable.loading=false;
  }
}
