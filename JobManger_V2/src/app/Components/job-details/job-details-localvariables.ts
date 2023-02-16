import { Injectable } from '@angular/core';
import { JobLayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';

@Injectable()
export class JobDetailsLocalVariable {
  //Layout info properties
  public Joblayout: JobLayoutInfo[];
  public taskLayout: TaskLayoutInfo[];

  //public statusList: Array<string> = [];

  // Other properties
  public disableButton = false;
  public ColumnProperties: any;

  //Popup model properties
  public openPopupModal = false;
  public passingEventMsg: string = '';

  public JobManagerNavigation = [] as any;

  //Grid properties

  public dataloading: boolean = false;
  public CheckboxofJobRow = [] as any;

  public SelectedjobsId: Array<number>;
  public SelectedJobId: string;

  //Filter Values
  public filterJobid: string = '';
  public filterTopic: string = '';
  public filterCockpit: string = '';
  public filterrunno: string = '';
  public filterpriority: string = '';
  public filternooftasks: string = '';

  //footer properties
  public totalPage: number;
  public jobCount: number = 0;
  public OrderBy: string = '';
  public orderDescending: boolean = false;
  public recordperpagejob: number = 10;
  public currentpage: number = 1;

  //Filter properties
  public AvailableUserName: { key: string; value: string }[] = [];
  public selectedUsername: Array<string> = [];
  public AvailableState: { key: string; value: string }[] = [];
  public selectedState: Array<string> = [];
  public AvailableType: { key: string; value: string }[] = [];
  public selectedType: Array<string> = [];

  public SelectedNodeGroup: string = '';

  public readonly Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];

  ClearAllLocalVariables() {
    this.filterJobid = '';
    this.filterTopic = '';
    this.filterCockpit = '';
    this.filterrunno = '';
    this.filterpriority = '';
    this.filternooftasks = '';
    this.SelectedNodeGroup = '';
    this.SelectedJobId = '';
    this.OrderBy = '';
    this.orderDescending = false;
    this.currentpage = 1;
    this.CheckBoxFilterClear();
  }
  CheckBoxFilterClear() {
    this.selectedType = [];
    this.selectedType.length = 0;
    this.selectedUsername = [];
    this.selectedUsername.length = 0;
    this.selectedState = [];
    this.selectedState.length = 0;
  }
}
