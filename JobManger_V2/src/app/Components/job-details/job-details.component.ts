import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchResultsLayout } from 'src/app/Models/helper';
import { LayoutInfo } from 'src/app/Models/layout';
import { JobDetailsModules } from 'src/app/Modules/JobDetailsModules';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  JobDetails : JobDetailsModules[]=[];
  selectedLayout: LayoutInfo;
  layouts: LayoutInfo[];
  total = 0;
  layoutLoading = true;
  loading = true;
  constructor(private ApiService:ApiServiceService) { }

  ngOnInit(): void {
    this.GetJobDetails();
  }

  GetJobDetails()
  {

    this.ApiService.searchLayout('54212','','','','','','Finished','','','','','','',false,1,10,false).subscribe((results: SearchResultsLayout) => {
      this.layouts = results.results;
      this.total = results.totalResults;
      this.layoutLoading = false;
      console.log(this.layouts);
    });
  //   this.ApiService.searchLayout().subscribe((data:JobDetailsModules[]) =>{  
  //     this.JobDetails=data;
  //     console.log( this.JobDetails);
  // });
}

  
}