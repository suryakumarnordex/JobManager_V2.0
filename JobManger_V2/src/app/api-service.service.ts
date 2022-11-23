import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.beta';
import { LoggerService } from './Services/logger.service';
import { JobDetailsModules } from './Modules/JobDetailsModules';
import { SearchResultsLayout } from './Models/helper';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiurl = environment.webAppApiUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private logger: LoggerService) {}

  GetJobDetails(
    jobIdFragment: number | null,
    userFragment: String | null,
    typeFragment: String | null,
    topicFragment: String | null,
    cockpitIdFragment: String | null,
    runnoFragment: String | null,
    statusFragment: String | null,
    priorityFragment: String | null,
    progressFragment: String | null,
    numberOfTasksFragment: String | null,
    nodeGroupFragment: String | null,
    pendingReasonFragment: String | null,
    orderBy: String | null,
    orderDescending: boolean,
    PageNo: number | null,
    PageSize: number | null,
    waitForChange: boolean
  ) {
    let url =
      environment.webAppApiUrl +
      `SearchLayout?jobIdFragment=${jobIdFragment}&userFragment=${userFragment}&typeFragment=${typeFragment}&topicFragment=${topicFragment}&cockpitIdFragment=${cockpitIdFragment}&runnoFragment=${runnoFragment}&statusFragment=${statusFragment}&priorityFragment=${priorityFragment}&progressFragment=${progressFragment}&numberOfTasksFragment=${numberOfTasksFragment}&nodeGroupFragment=${nodeGroupFragment}&pendingReasonFragment=${pendingReasonFragment}&orderBy=${orderBy}&orderDescending=${orderDescending}&page=${PageNo}&pageSize=${PageSize}&waitForChange=${waitForChange}`;
    console.log('GetJobDetails');
    console.log(url);
    return this.http.get<JobDetailsModules[]>(url);
  }

  // GetJobDetailsNew():Observable<JobDetailsModules[]>
  // {
  //   const infos = [];
  // return infos;
  // }

  searchLayout(
    jobIdFragment: string = '',
    userFragment: string = '',
    typeFragment: string = '',
    topicFragment: string = '',
    cockpitIdFragment: string = '',
    runnoFragment: string = '',
    statusFragment: string = '',
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
    const params = new HttpParams()
      .set('jobIdFragment', jobIdFragment ? jobIdFragment : '')
      .set('userFragment', userFragment ? userFragment : '')
      .set('typeFragment', typeFragment ? typeFragment : '')
      .set('topicFragment', topicFragment ? topicFragment : '')
      .set('cockpitIdFragment', cockpitIdFragment ? cockpitIdFragment : '')
      .set('runnoFragment', runnoFragment ? runnoFragment : '')
      .set('statusFragment', statusFragment ? statusFragment : '')
      .set('priorityFragment', priorityFragment ? priorityFragment : '')
      .set('progressFragment', progressFragment ? typeFragment : '')
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
      .set('PageNo', PageNo.toFixed(0))
      .set('PageSize', PageSize.toFixed(0))
      .set('waitForChange', waitForChange ? waitForChange : false);
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
}
