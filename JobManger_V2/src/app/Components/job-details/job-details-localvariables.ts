import { Injectable } from "@angular/core";
import { LayoutInfo, TaskLayoutInfo } from "src/app/Models/layout";

@Injectable()
export class JobDetailsLocalVariable
{
    public layouts: LayoutInfo[];
    public taskLayout: TaskLayoutInfo[];
    public requestFromJOb: boolean = true;
    public selected = [] as any;
    public jobCount = 0;
    public totalPage: number;
    public loading = true;
    public detailTaskID: any;
    public pageSize: number = 1;
    public dataloading: boolean = false;

    public JobManageerNavigation = [] as any;    
    public openModal = false;
    
    public Nodelist: Array<string> = [
        'All jobs',
        'Queue Simulation',
        'Queue BladedSimulation',
        'Queue PrePostProcessing',
      ];
}