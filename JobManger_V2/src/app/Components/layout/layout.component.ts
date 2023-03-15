import { Component, OnInit } from '@angular/core';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import {JobDetailsComponent } from '../job-details/job-details.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  priorityDisable: boolean = true;
  requeueDisable: boolean = true;
  cancelDisable: boolean = true;
  submitDisable: boolean = true;
  constructor(public JobDetailsLocalVariable: JobDetailsLocalVariable,public JobDetailsComponent:JobDetailsComponent) { }

  ngOnInit(): void {
  }

}
