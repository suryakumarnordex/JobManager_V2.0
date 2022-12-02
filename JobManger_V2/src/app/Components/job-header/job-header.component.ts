import { Component, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { LoggerService } from 'src/app/Services/logger.service';
import { LayoutInfo } from 'src/app/Models/layout';
import { SearchResultsLayout} from 'src/app/Models/helper';
import { PopupModalsComponent } from '../popup-modals/popup-modals.component';
@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.css']
})
export class JobHeaderComponent implements OnInit {
  @Input() recordPerPage: number = 10;
  @Input() recordPerPagerequest: number;
  
  JobManageerNavigation = [] as any;
  dataloading: boolean = false;
  layouts: LayoutInfo[];
  jobCount = 0;
  @Input() priorityJobModal:boolean;
  public Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];
  constructor( private router: Router, private ApiService: ApiServiceService, private logger: LoggerService) { }

  ngOnInit(): void {
    
  }
  nodeListPage() {
    this.router.navigate(['nodelist']);
  }

  priority(priority:boolean){
     this.priorityJobModal=priority;

  }
  onNodeGroupChange(event: Event) {
    this.dataloading = true;
    let selectedNodeGroup = '';
    let val = event.target as HTMLInputElement;
    console.log(val.name, 'sele');
    let statusList: Array<string> = [];
    if (val.name.includes('Queue')) {
      selectedNodeGroup = val.name.replace('Queue ', '');
      statusList = ['Queued', 'Finished'];
    } else {
      selectedNodeGroup = '';
    }
    if (event !== null) {
      this.ApiService.searchLayout(
        '',
        [],
        [],
        '',
        '',
        '',
        statusList,
        '',
        '',
        '',
        selectedNodeGroup,
        '',
        '',
        false,
        1,
        this.recordPerPage,
        false
      ).subscribe({
        next: (res: SearchResultsLayout) => {
          this.layouts = res.results;
          this.jobCount = res.totalResults;
          this.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },
      });
    }
  }
}