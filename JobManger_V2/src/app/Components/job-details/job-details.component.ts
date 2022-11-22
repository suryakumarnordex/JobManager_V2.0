import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { JobDetailsModules } from 'src/app/Modules/JobDetailsModules';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  JobDetails : JobDetailsModules[]=[];
  constructor(private ApiService:ApiServiceService) { }

  ngOnInit(): void {
    this.GetJobDetails();
  }

  GetJobDetails()
  {
    this.ApiService.GetJobDetails(54212,'','','','','','Finished','','','','','','',false,1,10,false).subscribe((data:JobDetailsModules[]) =>{  
      this.JobDetails=data;
      console.log( this.JobDetails);
  });
}

  
}