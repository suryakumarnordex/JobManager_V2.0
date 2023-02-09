import { Injectable } from '@angular/core';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';

@Injectable()
export class JobDetailsLocalVariable {
  //Data properties
  public layouts: LayoutInfo[];
  public taskLayout: TaskLayoutInfo[];
  public statusList: Array<string> = [];
  public disableButton = false;
  public state: any;
  //Grid properties
  public requestFromJOb: boolean = true;
  public dataloading: boolean = false;
  public selected = [] as any;
  public loading: boolean = false;
  public SelectedjobId: Array<number>;
  public SelectedjobIdStatus: Array<number>;

  //Filter Values
  public filterJobid: string = '';
  public filterTopic: string = '';
  public filterCockpit: string = '';
  public filterrunno: string = '';
  public filterpriority: string = '';
  public filternooftasks: string = '';

  public detailTaskID: any;
  public priorityValue: string;
  public JobManageerNavigation = [] as any;
  public openModal = false;
  public passingEvent: string = '';
  public IsSuccess: boolean = false;
  public Result: any;

  //footer properties

  public totalPage: number;
  public jobCount: number = 0;
  public nodeGroupFragment: string = '';
  public OrderBy: string = '';
  public orderDescending: boolean = false;

  //Filter properties
  public AvailableUserName: { key: string; value: string }[] = [];
  public selectedUsername: Array<string> = [];
  public AvailableState: { key: string; value: string }[] = [];
  public selectedState: Array<string> = [];
  public AvailableType: { key: string; value: string }[] = [];
  public selectedType: Array<string> = [];

  public readonly Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];
}
