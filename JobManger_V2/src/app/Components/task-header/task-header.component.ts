import { Component, OnInit,Input } from '@angular/core';
import {TaskDetailsLocalVariable } from '../task-details/task-details-localvariable'
@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css']
})
export class TaskHeaderComponent implements OnInit {
  @Input() passingEvent: string;
  constructor(public TaskDetailsLocalVariable:TaskDetailsLocalVariable) { }

  ngOnInit(): void {
  }
  openmodel(event: string) {
    this.passingEvent = event;
    this.TaskDetailsLocalVariable.openModal = true;
  }
  onModalClose() {
    this.TaskDetailsLocalVariable.openModal = false;
    // this.TaskDetailsLocalVariable.loading=false;
  }
}
