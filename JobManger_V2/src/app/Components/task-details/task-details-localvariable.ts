import { Injectable } from '@angular/core';
import { LayoutInfo, TaskLayoutInfo } from 'src/app/Models/layout';

@Injectable()
export class TaskDetailsLocalVariable {
  public recordperpagetask: number = 10;
  public currentpage: number = 1;
  public totalPage: number;
  public currentpagetask: number = 1;
  public loading: boolean = false;
  public dataloading: boolean = false;
  public SelectedtaskId: Array<number>;
  public SelectedJobIDFragement: string;
  public passingEvent: string;
  public openModal = false;
  public LogFileData: any;
  public state: any;
  public filterTaskid: string = '';
  public filterTaskName: string = '';
  public filterTaskState: string = '';
  public filterExitCode: string = '';
  public filterLog: string = '';
  public filterStartTime: string = '';
  public filterEndTime: string = '';
  public filterAllocatedNodes: string = '';
  public filterCommandLine: string = '';
  public OrderBy: string = '';
  public orderDescending: boolean = false;
  public selectedType: Array<string> = [];
  public statusList: Array<string> = [];
  public selectedState: Array<string> = [];
  public layouts: TaskLayoutInfo[];
  public taskCount: number = 0;
  public AvailableState: { key: string; value: string }[] = [];
}
