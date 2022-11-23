import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchTaskResultsLayout } from 'src/app/Models/helper';
import { TaskLayoutInfo } from 'src/app/Models/layout';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  layouts: TaskLayoutInfo[];
  total = 0;
  layoutLoading = true;
  loading = true;
  constructor(private ApiService: ApiServiceService) {}

  ngOnInit(): void {
    this.GetTaskDetails();
  }

  GetTaskDetails() {
    this.ApiService.searchTaskLayout(
      '54212',
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
    ).subscribe((res: SearchTaskResultsLayout) => {
      this.layouts = res.results;
      this.total = res.totalResults;
      this.layoutLoading = false;
      console.log(this.layouts);
      // console.log(this.layouts.map((res: any) => res.cockpitIdFragment));
    });
  }
}
