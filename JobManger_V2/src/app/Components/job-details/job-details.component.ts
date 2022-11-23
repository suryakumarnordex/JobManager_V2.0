import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchResultsLayout } from 'src/app/Models/helper';
import { LayoutInfo } from 'src/app/Models/layout';
import { JobDetailsModules } from 'src/app/Modules/JobDetailsModules';
import { LoggerService } from 'src/app/Services/logger.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  layouts: LayoutInfo[];
  total = 0;
  layoutLoading = true;
  loading = true;

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.GetJobDetails();
  }

  GetJobDetails() {
    this.ApiService.searchLayout(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      1,
      10,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.layouts = res.results;
        this.total = res.totalResults;
        this.layoutLoading = false;
        console.log(this.layouts);
      },
      error: (error) => {
        this.logger.reportError(error);
      },
      // console.log(this.layouts.map((res: any) => res.cockpitIdFragment));
    });
  }
}
