import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { SearchResultsLayout, SearchTaskResultsLayout,} from 'src/app/Models/helper';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';
import { LoggerService } from 'src/app/Services/logger.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { JobDetaillocalstorage } from './job-detail-Localstorage';
import { id } from '@cds/core/internal';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {

  @Input() recordPerPage: number = 10;
  layouts: LayoutInfo[];
  taskLayout: TaskLayoutInfo[];
  requestFromJOb: boolean = true;
  selected = [] as any;
  jobCount = 0;
  totalPage: number;
  loading = true;
  detailTaskID: any;
  pageSize: number = 1;
  dataloading: boolean = false;

  idcolumnWidthValue: string;
  usercolumnWidthValue: string;
  cockpitcolumnWidthValue: string;
  runcolumnWidthValue: string;
  typecolumnWidthValue: string;
  topiccolumnWidthValue: string;
  statuscolumnWidthValue: string;
  progresscolumnWidthValue: string;
  prioritycolumnWidthValue: string;
  notaskcolumnWidthValue: string;
  runningTaskcolumnWidthValue: string;
  queuedTaskcolumnWidthValue: string;
  starttimecolumnWidthValue: string;
  endtimecolumnWidthValue: string;
  submittimecolumnWidthValue: string;
  elapsedtimecolumnWidthValue: string;
  pendingreasoncolumnWidthValue: string;
  recordPerPageValue: Number = 10;

  constructor(
    private ApiService: ApiServiceService,
    private router: Router,
    private logger: LoggerService,
    private localstorage: LocalStorageService,
    private JobDetailsLocalStorage : JobDetaillocalstorage,

  ) {}

  ngOnInit(): void {    
   this.GetJobDetails(this.recordPerPage, this.pageSize);
   this.GetLocalStorageColumnValue();   
  }
public ColumnResized(event: any, colType: string)
{   
  this.localstorage.set(colType, event);

  switch(colType) { 
    case 'idcolumnwidth': { 
    this.JobDetailsLocalStorage.setidcolumnWidthValue(event);  
       break; 
    } 
    case 'cockpitcolumnwidth': { 
      this.JobDetailsLocalStorage.setcockpitcolumnWidthValue(event);     
       break; 
    } 
    case 'runcolumnwidth': { 
      this.JobDetailsLocalStorage.setruncolumnWidthValue(event);   
      break; 
   } 
   case 'typecolumnwidth': { 
    this.JobDetailsLocalStorage.settypecolumnWidthValue(event);
    break; 
 } 
 case 'topiccolumnwidth': { 
  this.JobDetailsLocalStorage.settopiccolumnWidthValue(event);
  break; 
} 
case 'statuscolumnwidth': { 
  this.JobDetailsLocalStorage.setstatuscolumnWidthValue(event);
  break; 
} 
case 'progresscolumnwidth': { 
  this.JobDetailsLocalStorage.setprogresscolumnWidthValue(event);
  break; 
} 
case 'prioritycolumnwidth': { 
  this.JobDetailsLocalStorage.setprioritycolumnWidthValue(event);
  break; 
} 
case 'notaskcolumnwidth': { 
  this.JobDetailsLocalStorage.setnotaskcolumnWidthValue(event);
  break; 
} 
case 'runningTaskcolumnwidth': { 
  this.JobDetailsLocalStorage.setRunningTaskcolumnWidthValue(event);
  break; 
} 
case 'queuedTaskcolumnwidth': { 
  this.JobDetailsLocalStorage.setQueuedTaskcolumnWidthValue(event);
  break; 
} 
case 'starttimecolumnwidth': { 
  this.JobDetailsLocalStorage.setstarttimecolumnWidthValue(event);
  break; 
} 
case 'endtimecolumnwidth': { 
  this.JobDetailsLocalStorage.setendtimecolumnWidthValue(event);
  break; 
} 
case 'submittimecolumnwidth': { 
  this.JobDetailsLocalStorage.setsubmittimecolumnWidth(event);
  break; 
} 
case 'elapsedtimecolumnwidth': { 
  this.JobDetailsLocalStorage.setelapsedtimecolumnWidthValue(event);
  break; 
    } 
 } 


}
 
  GetJobDetails(recordPerPage: number, pageSize: number) {
    this.pageSize = pageSize;
    this.recordPerPage = recordPerPage;
    this.JobDetailsLocalStorage.setrecordPerPageValue(recordPerPage);
    this.JobDetailsLocalStorage.setpageSize(pageSize);
    this.dataloading = true;

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
      this.pageSize,
      this.recordPerPage,
      false
    ).subscribe({
      next: (res: SearchResultsLayout) => {
        this.layouts = res.results;
        this.jobCount = res.totalResults;
        this.dataloading = false;
        this.totalPage = Math.ceil(this.jobCount / this.recordPerPage);
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
      this.ApiService.searchTaskLayout(
        this.detailTaskID,
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
          this.taskLayout = res.results;
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
    this.JobDetailsLocalStorage.SetSelectedjobId(event.map((e) => e.jobIdFragment));
    console.log(this.JobDetailsLocalStorage.SelectedjobId);
  }
  GetLocalStorageColumnValue()
  {    
    this.idcolumnWidthValue = this.localstorage.get('idcolumnwidth');
    this.usercolumnWidthValue = this.localstorage.get('usercolumnwidth');
    this.cockpitcolumnWidthValue = this.localstorage.get('cockpitcolumnwidth');
    this.runcolumnWidthValue = this.localstorage.get('runcolumnwidth');
    this.typecolumnWidthValue = this.localstorage.get('typecolumnwidth');
    this.topiccolumnWidthValue = this.localstorage.get('topiccolumnwidth');
    this.statuscolumnWidthValue = this.localstorage.get('statuscolumnwidth');
    this.progresscolumnWidthValue = this.localstorage.get('progresscolumnwidth');
    this.prioritycolumnWidthValue = this.localstorage.get('prioritycolumnwidth');
    this.notaskcolumnWidthValue = this.localstorage.get('notaskcolumnwidth');
    this.runningTaskcolumnWidthValue = this.localstorage.get('runningtaskcolumnwidth');
    this.queuedTaskcolumnWidthValue = this.localstorage.get('queuedtaskcolumnwidth');
    this.starttimecolumnWidthValue = this.localstorage.get('starttimecolumnwidth');
    this.endtimecolumnWidthValue = this.localstorage.get('endtimecolumnwidth');
    this.elapsedtimecolumnWidthValue = this.localstorage.get('elapsedtimecolumnwidth');
    this.submittimecolumnWidthValue = this.localstorage.get('submittimecolumnwidth');
    this.pendingreasoncolumnWidthValue = this.localstorage.get('pendingreasoncolumnwidth');
    this.recordPerPageValue = this.localstorage.get('recordperpage');
  }
}
