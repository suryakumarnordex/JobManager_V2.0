import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.beta';
import { LoggerService } from './Services/logger.service';
import { JobDetailsModules } from './Modules/JobDetailsModules';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor( private http: HttpClient,
    private logger: LoggerService
    ) {}

GetJobDetails(jobIdFragment:number|null,userFragment:String|null,typeFragment:String|null,topicFragment:String|null,cockpitIdFragment:String|null,runnoFragment:String|null,statusFragment:String|null,
  priorityFragment:String|null,progressFragment:String|null,numberOfTasksFragment:String|null,nodeGroupFragment:String|null,pendingReasonFragment:String|null,orderBy:String|null,orderDescending:boolean, PageNo:number|null, PageSize:number|null,waitForChange:boolean)
{
  let url = environment.webAppApiUrl + `SearchLayout?jobIdFragment=${jobIdFragment}&userFragment=${userFragment}&typeFragment=${typeFragment}&topicFragment=${topicFragment}&cockpitIdFragment=${cockpitIdFragment}&runnoFragment=${runnoFragment}&statusFragment=${statusFragment}&priorityFragment=${priorityFragment}&progressFragment=${progressFragment}&numberOfTasksFragment=${numberOfTasksFragment}&nodeGroupFragment=${nodeGroupFragment}&pendingReasonFragment=${pendingReasonFragment}&orderBy=${orderBy}&orderDescending=${orderDescending}&page=${PageNo}&pageSize=${PageSize}&waitForChange=${waitForChange}`;
  console.log('GetJobDetails');
  console.log(url);
  return this.http.get<JobDetailsModules[]>(url);
  
}

}
