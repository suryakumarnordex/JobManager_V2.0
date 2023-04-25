import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.beta';
import { LoggerService } from './Services/logger.service';
import { JobDetailsModules } from './Modules/JobDetailsModules';
import { SearchResultsLayout, SearchTaskResultsLayout } from './Models/helper';
import { JobDetailsLocalVariable } from './Components/job-details/job-details-localvariables';
import { JobDetaillocalstorage } from './Components/job-details/job-detail-Localstorage';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiurl = environment.webAppApiUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    public JobDetaillocalstorage: JobDetaillocalstorage,
    public JobDetailsLocalVariable: JobDetailsLocalVariable
  ) {}

  getNavigations() {
    let url = 'http://ldms/navigations.json';
    return this.http.get(url);
  }
  // public AvailableUserName: { key: string; value: string }[] = [];
  searchLayout(
    jobIdFragment: string = '',
    userFragment: Array<string> = [],
    cockpitNameFragment: string = '',
    typeFragment: Array<string> = [],
    topicFragment: string = '',
    cockpitIdFragment: string = '',
    runnoFragment: string = '',
    statusFragment: Array<string> = [],
    priorityFragment: string = '',
    progressFragment: string = '',
    numberOfTasksFragment: string = '',
    nodeGroupFragment: string = '',
    pendingReasonFragment: string = '',
    orderBy: string = this.JobDetailsLocalVariable.OrderBy,
    orderDescending: boolean,
    PageNo: number = this.JobDetailsLocalVariable.currentpage,
    PageSize: number = this.JobDetailsLocalVariable.recordperpagejob,
    waitForChange: boolean = false
  ): Observable<SearchResultsLayout> {
    let params = new HttpParams()
      .set('jobIdFragment', jobIdFragment ? jobIdFragment : '')
      .set(
        'cockpitNameFragment',
        cockpitNameFragment ? cockpitNameFragment : ''
      )
      .set('topicFragment', topicFragment ? topicFragment : '')
      .set('cockpitIdFragment', cockpitIdFragment ? cockpitIdFragment : '')
      .set('runnoFragment', runnoFragment ? runnoFragment : '')
      .set('priorityFragment', priorityFragment ? priorityFragment : '')
      .set('progressFragment', progressFragment ? progressFragment : '')
      .set(
        'numberOfTasksFragment',
        numberOfTasksFragment ? numberOfTasksFragment : ''
      )
      .set('nodeGroupFragment', nodeGroupFragment ? nodeGroupFragment : '')
      .set(
        'pendingReasonFragment',
        pendingReasonFragment ? pendingReasonFragment : ''
      )
      .set('orderBy', orderBy ? orderBy : '')
      .set('orderDescending', orderDescending.toString())
      .set('page', PageNo)
      .set('PageSize', PageSize)
      .set('waitForChange', waitForChange ? waitForChange : false);
    statusFragment.forEach(function (status: string) {
      params = params.append('statusFragment', status);
    });
    userFragment.forEach(function (users: string) {
      params = params.append('userFragment', users);
    });
    typeFragment.forEach(function (types: string) {
      params = params.append('typeFragment', types);
    });
    return this.http
      .get(this.apiurl + 'SearchLayout', {
        headers: this.headers,
        params: params,
        withCredentials: true,
      })
      .pipe(
        map((resp: any) => {
          return new SearchResultsLayout().deserialize(resp);
        }),
        tap((results: SearchResultsLayout) => {
          this.logger.log(params.toString());
        })
      );
  }
  searchTaskLayout(
    jobIdFragment: string = '',
    taskIdFragment: string = '',
    nameFragment: string = '',
    statusFragment: Array<string> = [],
    startTimeFragment: string = '',
    endTimeFragment: string = '',
    allocatedNodesFragment: string = '',
    commandLineFragment: string = '',
    PageNo: Number,
    PageSize: Number,
    OrderBy: string,
    orderDescending: boolean
  ): Observable<SearchTaskResultsLayout> {
    let params = new HttpParams()
      .set('jobIdFragment', jobIdFragment ? jobIdFragment : '')
      .set('taskIdFragment', taskIdFragment ? taskIdFragment : '')
      .set('nameFragment', nameFragment ? nameFragment : '')
      .set('startTimeFragment', startTimeFragment ? startTimeFragment : '')
      .set('endTimeFragment', endTimeFragment ? endTimeFragment : '')
      .set(
        'allocatedNodesFragment',
        allocatedNodesFragment ? allocatedNodesFragment : ''
      )
      .set(
        'commandLineFragment',
        commandLineFragment ? commandLineFragment : ''
      )
      .set('orderBy', OrderBy ? OrderBy : '')
      .set('orderDescending', orderDescending.toString())
      .set('page', Number(PageNo))
      .set('PageSize', Number(PageSize));
    statusFragment.forEach(function (status: string) {
      params = params.append('statusFragment', status);
    });
    return this.http
      .get(this.apiurl + 'SearchTaskLayout', {
        headers: this.headers,
        params: params,
        withCredentials: true,
      })
      .pipe(
        map((resp: any) => {
          return new SearchTaskResultsLayout().deserialize(resp);
        }),
        tap((results: SearchTaskResultsLayout) => {
          this.logger.log(
            `fetched ${results.results.length} search results for jobIdFragment=${jobIdFragment}, OrderBy=${OrderBy}, orderDescending=${orderDescending}, PageNo=${PageNo}, pageSize=${PageSize}`
          );
        })
      );
  }
  SetJobPriority(jobIds: Array<number>, priority: string) {
    let params = new HttpParams();
    jobIds.forEach((jobId: any) => {
      params = params.append('jobIds', jobId);
    });
    params = params.append('priority', priority);

    return this.http.put(
      this.apiurl + 'SetPriorityBandHPCRestAPI',
      {},
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  SetRequeue(jobIds: Array<number>) {
    let params = new HttpParams();
    jobIds.forEach((jobId: any) => {
      params = params.append('jobIds', jobId);
    });

    return this.http.post(
      this.apiurl + 'HPCRestAPIJobrequeue',
      {},
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  GetPendingReason(jobIds: Array<number>) {
    let params = new HttpParams();
    jobIds.forEach((jobId: any) => {
      params = params.append('jobIds', jobId);
    });

    return this.http.post(
      this.apiurl + 'SearchLayout',
      {},
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  SetCancel(jobIds: Array<number>) {
    let params = new HttpParams();
    jobIds.forEach((jobId: any) => {
      params = params.append('jobIds', jobId);
    });

    return this.http.post(
      this.apiurl + 'HPCRestAPIJobcancel',
      {},
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  SetTaskRequeue(jobIds: string, TaskIds: Array<number>) {
    let params = new HttpParams();
    params = params.append('jobIds', jobIds);
    TaskIds.forEach((taskid: any) => {
      params = params.append('taskIds', taskid);
    });

    return this.http.post(
      this.apiurl + 'HPCRestAPITaskrequeue',
      {},
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  SetSubmit(jobIds: Array<number>) {
    let params = new HttpParams();
    jobIds.forEach((jobId: any) => {
      params = params.append('jobIds', jobId);
    });

    return this.http.post(
      this.apiurl + 'HPCPackJobSubmit',
      {},
      {
        headers: this.headers,
        params: params,
      }
    );
  }
  getFilePath(filepath: any) {
    let params = new HttpParams();
    params = params.append('FilePath', filepath);
    return this.http.get(this.apiurl + 'GetTextFileContents', {
      headers: this.headers,
      params: params,
    });
  }

  GetUserNameList() {
    return this.http.get(this.apiurl + 'GetUsersList', {
      headers: this.headers,
    });
  }
  GetTypeList() {
    return this.http.get(this.apiurl + 'GetTypeList', {
      headers: this.headers,
    });
  }
  GetStatusList() {
    return this.http.get(this.apiurl + 'GetStatusList', {
      headers: this.headers,
    });
  }
}
