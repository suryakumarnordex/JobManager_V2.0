import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetailsLocalVariable } from '../job-details/job-details-localvariables';
import { JobDetailsComponent } from '../job-details/job-details.component';
@Component({
  selector: 'app-popup-modals',
  templateUrl: './popup-modals.component.html',
  styleUrls: ['./popup-modals.component.css'],
})

export class PopupModalsComponent implements OnInit {
  @Input() passingEvent: string;
  isOpen: boolean = false;
  get parentChildConnection(): boolean {
    return this.isOpen;
  }
  @Input()
ngSwitchCase: any
  @Input() set parentChildConnection(setting: boolean) {
    this.isOpen = setting;
    if (setting === false) {
      this.modalClosed.emit();
    }
  }
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(  
    public JobDetailsLocalVariable : JobDetailsLocalVariable,
    private  JobDetailscomponent : JobDetailsComponent,
  ) {}

  ngOnInit(): void {}

   PopupEvent() {
    this.JobDetailsLocalVariable.dataloading = true;
    switch (this.passingEvent) {
      case 'Priority': { 
        this.JobDetailsLocalVariable.priorityValue = this.JobDetailsLocalVariable.priorityValue.replace('+', '%2B');    
        this.JobDetailscomponent.SetJobPriority();      
        break;
      }
      default : {
        this.JobDetailscomponent.ButtonEvents(this.passingEvent);
        break;
      }     
    }

   
   
  }
  
}
