import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from './logger.service';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router, private logger: LoggerService) {
    // clear alert message on route change
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() => {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change function
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next(clearAlert);
        }
      });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    // this.logger.log(message);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    // this.logger.reportError(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
function clearAlert(_clearAlert: any) {
  throw new Error('Function not implemented.');
}
