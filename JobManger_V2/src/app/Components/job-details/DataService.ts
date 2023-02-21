import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private refreshData = new BehaviorSubject<boolean>(false);
  currentRefreshData = this.refreshData.asObservable();

  refreshComponent() {
    this.refreshData.next(true);
  }
}
