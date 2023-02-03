import { Injectable } from '@angular/core';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';

@Injectable()
export class JobDetailsLocalVariable {

  //Data properties
  public layouts: LayoutInfo[];
  public taskLayout: TaskLayoutInfo[];
  public statusList: Array<string> = [];

  //Grid properties
  public requestFromJOb: boolean = true;
  public dataloading: boolean = false;
  public selected = [] as any;
  public loading = true;
  public SelectedjobId: Array<number>;
  public SelectedjobIdStatus: Array<number>;

  public detailTaskID: any;
  public priorityValue: string;
  public JobManageerNavigation = [] as any;
  public openModal = false;
  public passingEvent:string='';
  public IsSuccess: boolean = false;
  public Result: any;

  //footer properties
  public recordperpagejob: number = 10;
  public currentpage: number = 1;
  public totalPage: number;
  public jobCount: number = 0;
  public nodeGroupFragment: string = '';

  //Filter properties
  public AvailableUserName: { key: string; value: string }[] = [];
  public AvailableState: { key: string; value: string }[] = [];
  public AvailableType: { key: string; value: string }[] = [];

  public Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];

  public Typelist = [
    { key: 'Reporting', value: 'Reporting' },
    { key: 'Simulation', value: 'Simulation' },
    { key: 'SimulationPro', value: 'SimulationPro' },
  ];
  public Userlist = [
    { key: 'PleusS', value: 'PleusS' },
    { key: 'SchenkJ', value: 'SchenkJ' },
    { key: 'MartinezA3', value: 'MartinezA3' },
  ];
  public Statuslist = [
    { key: 'Configuring', value: 'Configuring' },
    { key: 'Failed', value: 'Failed' },
    { key: 'Queued', value: 'Queued' },
  ];
}
