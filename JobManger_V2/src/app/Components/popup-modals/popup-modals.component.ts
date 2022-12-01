import { Component, Input, OnInit, Output } from '@angular/core';
import { JobHeaderComponent } from '../job-header/job-header.component';

@Component({
  selector: 'app-popup-modals',
  templateUrl: './popup-modals.component.html',
  styleUrls: ['./popup-modals.component.css']
})
export class PopupModalsComponent implements OnInit {
  @Input() priorityJobModal:boolean;
  titleTxt:string;
  jobIds:Array<string>;
  constructor(private header:JobHeaderComponent) { }

  ngOnInit(): void {
  }
  Cancel(priority:boolean){
    console.log("pop called");
    
    this.header.priority(priority)
  }
}
