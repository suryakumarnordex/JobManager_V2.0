import { Injectable } from '@angular/core';

@Injectable()
export class TaskDetailsLocalVariable {
  public filterTaskId: string = '';
  public filterName: string = '';
  public filterCommandLine: string = '';

  public CheckboxofTaskRow = [] as any;
  public AvailableState: { key: string; value: string }[] = [];
  public selectedState: Array<string> = [];
  public SelectedtasksId: Array<number>;
  public SelectedtaskId: string;
  public openPopupModal = false;

  public dataloading: boolean = false;
  public ColumnProperties: any;

  //footer properties
  public totalPage: number;
  public TaskCount: number = 0;
  public OrderBy: string = '';
  public orderDescending: boolean = false;
  public recordperpage: number = 10;
  public currentpage: number = 1;

  public FilterTaskId: number;
  public FilterTaskname: string;
  public FilterTaskExitCode: string;
  public FilterTaskAllocatedNode: string;
  public FilterTaskCommandline: string;
}
