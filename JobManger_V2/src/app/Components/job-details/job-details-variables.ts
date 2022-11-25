import { LayoutInfo, TaskLayoutInfo } from "src/app/Models/layout";

export class JobDetailsVariable{
     layouts: LayoutInfo[];
     taskLayout:TaskLayoutInfo[];
     selected = [] as any;
     total = 0;
     loading = true;
     detailTaskID:any;
     dataloading:boolean=false;
     JobManageerNavigation = [] as any;
}