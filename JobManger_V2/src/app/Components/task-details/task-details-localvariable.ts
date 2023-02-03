import { Injectable } from "@angular/core";
import { LayoutInfo, TaskLayoutInfo } from "src/app/Models/layout";

@Injectable()
export class TaskDetailsLocalVariable
{
    public recordperpagetask:number=10;
    public currentpagetask:number=1;
    public loading:boolean=false;
    public SelectedtaskId: Array<number>;
    public SelectedJobIDFragement:string;
    public passingEvent:string;
    public openModal = false;
}