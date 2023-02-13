import { Component, OnInit, Input } from '@angular/core';
import { TaskDetailsLocalVariable } from '../task-details/task-details-localvariable';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css'],
})
export class TaskHeaderComponent implements OnInit {
  @Input() passingEvent: string;
  @Input() taskLength: number;

  @Input() TaskRequeueDisable: boolean;

  constructor(
    public TaskDetailsLocalVariable: TaskDetailsLocalVariable,
    public JobDetailsLocalVariable: JobDetailsLocalVariable
  ) {}

  ngOnInit(): void {}

  openmodel(event: string) {
    this.JobDetailsLocalVariable.passingEventMsg = event;
    this.TaskDetailsLocalVariable.openPopupModal = true;
  }

  onModalClose() {
    this.TaskDetailsLocalVariable.openPopupModal = false;
  }
}
