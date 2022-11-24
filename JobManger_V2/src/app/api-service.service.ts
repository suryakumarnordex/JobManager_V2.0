import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.beta';
import { LoggerService } from './Services/logger.service';
import { JobDetailsModules } from './Modules/JobDetailsModules';
import { SearchResultsLayout, SearchTaskResultsLayout } from './Models/helper';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiurl = environment.webAppApiUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getNavigations() {
    let url = 
    'http://ldms/navigations.json';
    return this.http.get(url);
  }

  searchLayout(
    jobIdFragment: string = '',
    userFragment: Array<string> = [],
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
    orderBy: string = '',
    orderDescending: boolean,
    PageNo: number = 1,
    PageSize: number = 10,
    waitForChange: boolean = false
  ): Observable<SearchResultsLayout> {
    let params = new HttpParams()
      .set('jobIdFragment', jobIdFragment ? jobIdFragment : '')
      .set('topicFragment', topicFragment ? topicFragment : '')
      .set('cockpitIdFragment', cockpitIdFragment ? cockpitIdFragment : '')
      .set('runnoFragment', runnoFragment ? runnoFragment : '') 
      .set('priorityFragment', priorityFragment ? priorityFragment : '')
      .set('progressFragment', progressFragment ? progressFragment : '')
      .set('numberOfTasksFragment', numberOfTasksFragment ? numberOfTasksFragment : '' )
      .set('nodeGroupFragment', nodeGroupFragment ? nodeGroupFragment : '')
      .set('pendingReasonFragment',pendingReasonFragment ? pendingReasonFragment : '')
      .set('orderBy', orderBy ? orderBy : '')
      .set('orderDescending', orderDescending.toString())
      .set('PageNo', PageNo.toFixed(0))
      .set('PageSize', PageSize.toFixed(0))
      .set('waitForChange', waitForChange ? waitForChange : false);
      statusFragment.forEach(function (status:string){
        params = params.append('statusFragment', status );
      });
      userFragment.forEach(function (users:string){
        params = params.append('userFragment', users );
      });
      typeFragment.forEach(function (types:string){
        params = params.append('typeFragment', types );
      });
    console.log(this.apiurl + 'SearchLayout', {
      headers: this.headers,
      params: params,
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
          this.logger.log(
            `fetched ${results.results.length} search results for jobIdFragment=${jobIdFragment}, orderBy=${orderBy}, orderDescending=${orderDescending}, PageNo=${PageNo}, pageSize=${PageSize}`
          );
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
    PageNo: number = 1,
    PageSize: number = 10,
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
      .set('orderDescending', orderDescending.toString())
      .set('PageNo', PageNo.toFixed(0))
      .set('PageSize', PageSize.toFixed(0));
      statusFragment.forEach(function (status:string){
        params = params.append('statusFragment', status );
      });
    console.log(this.apiurl + 'SearchTaskLayout', {
      headers: this.headers,
      params: params,
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
            `fetched ${results.results.length} search results for jobIdFragment=${jobIdFragment}, orderDescending=${orderDescending}, PageNo=${PageNo}, pageSize=${PageSize}`
          );
        })
      );
  }
}
