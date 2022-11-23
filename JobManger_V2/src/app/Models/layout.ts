import { Deserializable, Serializable } from './helper';

export class LayoutInfo implements Deserializable, Serializable {
    jobIdFragment?: number;
    userFragment?:string;
    typeFragment?:string;
    topicFragment?:string;
    cockpitIdFragment?:number;
    runnoFragment?:number;
    statusFragment?:string;
    priorityFragment?:string;
    progressFragment?:number;
    numberOfTasksFragment?:number;
    nodeGroupFragment?:string;
    pendingReasonFragment?:string;
    orderBy?:string;
    orderDescending?:boolean; 
    PageNo?:number; 
    PageSize?:number;
    waitForChange?:boolean
    
    deserialize(input: any): this {
        this.jobIdFragment = input.jobIdFragment;
        this.userFragment = input.userFragment;
        this.typeFragment = input.typeFragment;
        this.topicFragment = input.topicFragment;
        this.cockpitIdFragment = input.cockpitIdFragment;
        this.runnoFragment = input.runnoFragment;
        this.statusFragment = input.statusFragment;
        this.priorityFragment = input.priorityFragment;
        this.progressFragment = input.progressFragment;
        this.numberOfTasksFragment = input.numberOfTasksFragment;
        this.nodeGroupFragment = input.nodeGroupFragment;
        this.pendingReasonFragment = input.pendingReasonFragment;
        this.orderBy = input.orderBy;
        this.PageNo = input.PageNo;
        this.PageSize = input.PageSize;
        this.waitForChange = input.waitForChange;
        return this;
    }
    serialize() {
        return { 'jobIdFragment': this.jobIdFragment, 'userFragment': this.userFragment, 'typeFragment': this.typeFragment, 'topicFragment': this.topicFragment,
         'cockpitIdFragment': this.cockpitIdFragment,'runnoFragment': this.runnoFragment,'statusFragment': this.statusFragment,
         'priorityFragment': this.priorityFragment,'progressFragment': this.progressFragment,'numberOfTasksFragment': this.numberOfTasksFragment,'nodeGroupFragment': this.nodeGroupFragment,
         'pendingReasonFragment': this.pendingReasonFragment,'Comment': this.pendingReasonFragment };
    }
}


   
       