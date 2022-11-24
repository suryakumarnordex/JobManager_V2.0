import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchResultsLayout, SearchTaskResultsLayout } from 'src/app/Models/helper';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';
import { JobDetailsModules } from 'src/app/Modules/JobDetailsModules';
import { LoggerService } from 'src/app/Services/logger.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {

  layouts: LayoutInfo[];
  taskLayout:TaskLayoutInfo[];
  selected = [] as any;
  total = 0;

  loading = true;
  detailTaskID:any;
  dataloading:boolean=false;

  QuickerViewNavigation = [] as any;

  public Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];

  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.GetJobDetails();
  }
  getNavigationsList(): void {
    this.ApiService.getNavigations().subscribe((res) => {
      this.QuickerViewNavigation = res;
    });
  } 
  nodeListPage() {
    this.router.navigate(['nodelist']);
  }
  GetJobDetails() {
    this.dataloading =true;
    this.ApiService.searchLayout(
      '',
      '',
      '',
      '',
      '',
      '',
      [],
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      1,
      100,
      false
    ).subscribe({      
      next: (res: SearchResultsLayout) => {      
        this.layouts = res.results;
        this.total = res.totalResults;      
        this.dataloading=false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },     
    });
  }
  onDetailOpen(event: any) {
  
    if (event !== null) {  
      this.detailTaskID = event.jobIdFragment;        
      this.ApiService.searchTaskLayout(this.detailTaskID,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      1,
      10,
      false).subscribe({
        next: (res: SearchTaskResultsLayout) => {
          this.taskLayout = res.results;
          this.total = res.totalResults;         
          this.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },
      });
    }
  }
  copyClipboard(selectedItem: any) {
    const create_copy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', selectedItem.CockpitFolder);
      e.preventDefault();
            if (
        selectedItem.CockpitFolder != '' &&
        selectedItem.CockpitFolder != null
      ) {
        selectedItem.text = 'copied';
      } else {
        selectedItem.text = 'no data to copy';
      }
    };
    document.addEventListener('copy', create_copy);
    document.execCommand('copy');
    document.removeEventListener('copy', create_copy);
  }
  onNodeGroupChange(event: any) {
    this.dataloading=true;
    let selectedNodeGroup='';
    console.log(event.target.value);
    if (event.target.value.includes('Queue')) {
      selectedNodeGroup = event.target.value.replace('Queue ', '');
    } else {
      selectedNodeGroup = event.target.value;
    }
    console.log(selectedNodeGroup.trim());
    
    if (event !== null) {  
      this.ApiService.searchLayout(
        '',
        '',
        '',
        '',
        '',
        '',
        ['Queued','Finished'],
        '',
        '',
        '',
        selectedNodeGroup,
        '',
        '',
        false,
        1,
        100,
        false
      ).subscribe({      
        next: (res: SearchResultsLayout) => {      
          this.layouts = res.results;
          this.total = res.totalResults;
          console.log(this.layouts,"Node Group Changed");
          this.dataloading=false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },     
      });
    }
  }
}
