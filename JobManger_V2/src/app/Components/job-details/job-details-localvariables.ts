import { Injectable } from '@angular/core';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';

@Injectable()
export class JobDetailsLocalVariable {
  public layouts: LayoutInfo[];
  public taskLayout: TaskLayoutInfo[];
  public statusList: Array<string> = [];
  public requestFromJOb: boolean = true;
  public selected = [] as any;
  public jobCount: number = 0;
  public totalPage: number;
  public loading = true;
  public detailTaskID: any;
  public dataloading: boolean = false;
  public priorityValue: string;
  public SelectedjobId: Array<number>;
  public SelectedjobIdStatus: Array<number>;
  public JobManageerNavigation = [] as any;
  public openModal = false;
  public IsSuccess: boolean = false;
  public Result: any;
  public recordperpagejob: number = 10;
  public currentpage: number = 1;
  public nodeGroupFragment: string = '';
  public AvailableUserName: { key: string; value: string }[] = [];
  public AvailableState: { key: string; value: string }[] = [];
  public AvailableType: { key: string; value: string }[] = [];
  public Nodelist: Array<string> = [
    'All jobs',
    'Queue Simulation',
    'Queue BladedSimulation',
    'Queue PrePostProcessing',
  ];
}
