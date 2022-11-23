import { Deserializable, Serializable } from '../Models/helper';

export class JobDetailsModules implements Deserializable {
  jobIdFragment?: number;
  userFragment?: string;
  typeFragment?: string;
  topicFragment?: string;
  cockpitIdFragment?: number;
  runnoFragment?: number;
  statusFragment?: string;
  priorityFragment?: string;
  progressFragment?: number;
  numberOfTasksFragment?: number;
  nodeGroupFragment?: string;
  pendingReasonFragment?: string;
  orderBy?: string;
  orderDescending?: boolean;
  PageNo?: number;
  PageSize?: number;
  waitForChange?: boolean;
  clipboardtext?: string;
  //New
  startTime?: string;
  endTime?: string;
  elapsedTime?: string;
  submitTime?: string;
  failedTasksCount?: number;
  runningTasksCount?: number;
  finishedTasksCount?: number;
  parameter: JobDetailsModules[] = [];
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
    //New
    this.clipboardtext = 'Copy directory path to clipboard';
    this.startTime = input.startTime;
    this.endTime = input.endTime;
    this.elapsedTime = input.elapsedTime;
    this.submitTime = input.submitTime;
    this.failedTasksCount = input.failedTasksCount;
    this.runningTasksCount = input.runningTasksCount;
    this.finishedTasksCount = input.finishedTasksCount;
    if (input.Parameter !== null) {
      for (const parameter of input.Parameter) {
        this.parameter.push(new JobDetailsModules().deserialize(parameter));
      }
    }
    return this;
  }
}
