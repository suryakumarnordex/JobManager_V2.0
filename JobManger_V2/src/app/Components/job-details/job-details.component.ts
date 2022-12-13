import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchResultsLayout, SearchTaskResultsLayout,} from 'src/app/Models/helper';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { JobDetaillocalstorage } from './job-detail-Localstorage';
import { JobDetailsLocalVariable } from './job-details-localvariables';
import { id } from '@cds/core/internal';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {

  @Input() recordPerPage: number = 10;


  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService,
    private localstorage: LocalStorageService,
    public JobDetailsLocalStorage : JobDetaillocalstorage,
    public JobDetailsLocalVariable : JobDetailsLocalVariable
  ) {}

  ngOnInit(): void {    
   this.GetJobDetails(this.recordPerPage, this.JobDetailsLocalVariable.pageSize);
   this.GetLocalStorageColumnValue();   
  }
public ColumnResized(event: any, colType: string)
{   
  this.localstorage.set(colType, event);

  switch(colType) { 
    case 'idcolumnwidth': { 
    this.JobDetailsLocalStorage.idcolumnWidthValue=(event);  
       break; 
    } 
    case 'cockpitcolumnwidth': { 
      this.JobDetailsLocalStorage.cockpitcolumnWidthValue=(event);     
       break; 
    } 
    case 'runcolumnwidth': { 
      this.JobDetailsLocalStorage.runcolumnWidthValue=(event);   
      break; 
   } 
   case 'typecolumnwidth': { 
    this.JobDetailsLocalStorage.typecolumnWidthValue=(event);
    break; 
 } 
 case 'topiccolumnwidth': { 
  this.JobDetailsLocalStorage.topiccolumnWidthValue=(event);
  break; 
} 
case 'statuscolumnwidth': { 
  this.JobDetailsLocalStorage.statuscolumnWidthValue=(event);
  break; 
} 
case 'progresscolumnwidth': { 
  this.JobDetailsLocalStorage.progresscolumnWidthValue=(event);
  break; 
} 
case 'prioritycolumnwidth': { 
  this.JobDetailsLocalStorage.prioritycolumnWidthValue=(event);
  break; 
} 
case 'notaskcolumnwidth': { 
  this.JobDetailsLocalStorage.notaskcolumnWidthValue=(event);
  break; 
} 
case 'runningTaskcolumnwidth': { 
  this.JobDetailsLocalStorage.runcolumnWidthValue=(event);
  break; 
} 
case 'queuedTaskcolumnwidth': { 
  this.JobDetailsLocalStorage.queuedTaskcolumnWidthValue=(event);
  break; 
} 
case 'starttimecolumnwidth': { 
  this.JobDetailsLocalStorage.starttimecolumnWidthValue=(event);
  break; 
} 
case 'endtimecolumnwidth': { 
  this.JobDetailsLocalStorage.endtimecolumnWidthValue=(event);
  break; 
} 
case 'submittimecolumnwidth': { 
  this.JobDetailsLocalStorage.submittimecolumnWidthValue=(event);
  break; 
} 
case 'elapsedtimecolumnwidth': { 
  this.JobDetailsLocalStorage.elapsedtimecolumnWidthValue=(event);
  break; 
    } 
 } 


}
 
  GetJobDetails(recordPerPage: number, pageSize: number) {
    this.JobDetailsLocalVariable.pageSize = pageSize;
    this.recordPerPage = recordPerPage;
    this.JobDetailsLocalStorage.recordPerPageValue=(recordPerPage);
    this.JobDetailsLocalStorage.pageSize=(pageSize);
    this.JobDetailsLocalVariable.dataloading = true;

    this.ApiService.searchLayout(
      '',
      [],
      [],
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
      this.JobDetailsLocalVariable.pageSize,
      this.recordPerPage,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.JobDetailsLocalVariable.layouts = res.results;
        this.JobDetailsLocalVariable.jobCount = res.totalResults;
        this.JobDetailsLocalVariable.dataloading = false;
        this.JobDetailsLocalVariable.totalPage = Math.ceil(this.JobDetailsLocalVariable.jobCount / this.recordPerPage);
      },
      error: (error) => {
        this.logger.reportError(error);
        this.JobDetailsLocalVariable.dataloading = false;
      },
    });
  }
  onDetailOpen(event: any) {
    if (event !== null) {
      this.JobDetailsLocalVariable.detailTaskID = event.jobIdFragment;
      this.ApiService.searchTaskLayout(
        this.JobDetailsLocalVariable.detailTaskID,
        '',
        '',
        [],
        '',
        '',
        '',
        '',
        1,
        10,
        false
      ).subscribe({
        next: (res: SearchTaskResultsLayout) => {
          this.JobDetailsLocalVariable.taskLayout = res.results;
          this.JobDetailsLocalVariable.jobCount = res.totalResults;
          this.JobDetailsLocalVariable.dataloading = false;
        },
        error: (error) => {
          this.logger.reportError(error);
          this.JobDetailsLocalVariable.dataloading = false;
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
  SetJobPriority() {
    this.ApiService.SetJobPriority([], '').subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
  selectionChanged(event: any[]) {   
    this.JobDetailsLocalStorage.SelectedjobId=(event.map((e) => e.jobIdFragment));
    console.log(this.JobDetailsLocalStorage.SelectedjobId);
  }
  GetLocalStorageColumnValue()
  {    
    this.JobDetailsLocalStorage.idcolumnWidthValue = this.localstorage.get('idcolumnwidth');
    this.JobDetailsLocalStorage.usercolumnWidthValue = this.localstorage.get('usercolumnwidth');
    this.JobDetailsLocalStorage.cockpitcolumnWidthValue = this.localstorage.get('cockpitcolumnwidth');
    this.JobDetailsLocalStorage.runcolumnWidthValue = this.localstorage.get('runcolumnwidth');
    this.JobDetailsLocalStorage.typecolumnWidthValue = this.localstorage.get('typecolumnwidth');
    this.JobDetailsLocalStorage.topiccolumnWidthValue = this.localstorage.get('topiccolumnwidth');
    this.JobDetailsLocalStorage.statuscolumnWidthValue = this.localstorage.get('statuscolumnwidth');
    this.JobDetailsLocalStorage.progresscolumnWidthValue = this.localstorage.get('progresscolumnwidth');
    this.JobDetailsLocalStorage.prioritycolumnWidthValue = this.localstorage.get('prioritycolumnwidth');
    this.JobDetailsLocalStorage.notaskcolumnWidthValue = this.localstorage.get('notaskcolumnwidth');
    this.JobDetailsLocalStorage.runningTaskcolumnWidthValue = this.localstorage.get('runningtaskcolumnwidth');
    this.JobDetailsLocalStorage.queuedTaskcolumnWidthValue = this.localstorage.get('queuedtaskcolumnwidth');
    this.JobDetailsLocalStorage.starttimecolumnWidthValue = this.localstorage.get('starttimecolumnwidth');
    this.JobDetailsLocalStorage.endtimecolumnWidthValue = this.localstorage.get('endtimecolumnwidth');
    this.JobDetailsLocalStorage.elapsedtimecolumnWidthValue = this.localstorage.get('elapsedtimecolumnwidth');
    this.JobDetailsLocalStorage.submittimecolumnWidthValue = this.localstorage.get('submittimecolumnwidth');
    this.JobDetailsLocalStorage.pendingreasoncolumnWidthValue = this.localstorage.get('pendingreasoncolumnwidth');
    this.JobDetailsLocalStorage.recordPerPageValue = this.localstorage.get('recordperpage');
  }
}
