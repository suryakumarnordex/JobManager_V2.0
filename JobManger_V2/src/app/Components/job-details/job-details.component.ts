import { Component, OnInit } from '@angular/core';
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

  constructor(
    private ApiService: ApiServiceService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.GetJobDetails();
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
      '',
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
        console.log(this.layouts);
        this.dataloading=false;
      },
      error: (error) => {
        this.logger.reportError(error);
        this.dataloading = false;
      },
      // console.log(this.layouts.map((res: any) => res.cockpitIdFragment));
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
          console.log(this.layouts);
          this.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.dataloading = false;
        },
        // console.log(this.layouts.map((res: any) => res.cockpitIdFragment));
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
  copyRunClipboard(selectedItem: any) {
    const create_copy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', selectedItem.runFolder);
      e.preventDefault();
           if (selectedItem.runFolder != '' && selectedItem.runFolder != null) {
        selectedItem.text = 'copied';
      } else {
        selectedItem.text = 'no data to copy';
      }
    };
    document.addEventListener('copy', create_copy);
    document.execCommand('copy');
    document.removeEventListener('copy', create_copy);
  }
}
