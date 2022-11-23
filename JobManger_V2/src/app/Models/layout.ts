import { Deserializable, Serializable } from './helper';

export class LayoutInfo implements Deserializable, Serializable {
  jobIdFragment: number;
  userFragment: string;
  typeFragment: string;
  topicFragment: string;
  cockpitIdFragment: number;
  runnoFragment: number;
  statusFragment: string;
  priorityFragment: string;
  progressFragment: number;
  numberOfTasksFragment: number;
  nodeGroupFragment: string;
  pendingReasonFragment: string;
  orderBy: string;
  orderDescending: boolean;
  // PageNo: number;
  // PageSize: number;
  waitForChange: boolean;

  deserialize(input: any): this {
    this.jobIdFragment = input.id;
    this.userFragment = input.cockpitUserName;
    this.typeFragment = input.type;
    this.topicFragment = input.runTopic;
    this.cockpitIdFragment = input.cockpitId;
    this.runnoFragment = input.runNumber;
    this.statusFragment = input.state;
    this.priorityFragment = input.priorityBand;
    this.progressFragment = input.progress;
    this.numberOfTasksFragment = input.numberOfTasks;
    this.nodeGroupFragment = input.nodeGroup;
    this.pendingReasonFragment = input.pendingReason;
    // this.orderBy = input.orderBy;
    // this.PageNo = input.PageNo;
    // this.PageSize = input.PageSize;
    // this.waitForChange = input.waitForChange;
    return this;
  }
  serialize() {
    return {
      jobIdFragment: this.jobIdFragment,
      userFragment: this.userFragment,
      typeFragment: this.typeFragment,
      topicFragment: this.topicFragment,
      cockpitIdFragment: this.cockpitIdFragment,
      runnoFragment: this.runnoFragment,
      statusFragment: this.statusFragment,
      priorityFragment: this.priorityFragment,
      progressFragment: this.progressFragment,
      numberOfTasksFragment: this.numberOfTasksFragment,
      nodeGroupFragment: this.nodeGroupFragment,
      pendingReasonFragment: this.pendingReasonFragment,
      Comment: this.pendingReasonFragment,
    };
  }
}
export class TaskLayoutInfo implements Deserializable, Serializable {
  jobIdFragment: number;
  taskIdFragment: number;
  nameFragment: string;
  statusFragment: string;
  exidCodeFragment: string;

  startTimeFragment: string;
  endTimeFragment: string;
  allocatedNodesFragment: string;

  commandLineFragment: string;

  deserialize(input: any): this {
    this.jobIdFragment = input.jobID;
    this.taskIdFragment = input.taskID;
    this.nameFragment = input.taskName;
    this.statusFragment = input.taskState;
    this.exidCodeFragment = input.exitCode;
    this.startTimeFragment = input.startTime;
    this.endTimeFragment = input.endTime;
    this.allocatedNodesFragment = input.allocatedNodes;
    this.commandLineFragment = input.commandLine;
    return this;
  }
  serialize() {
    return {
      jobIdFragment: this.jobIdFragment,
      taskIdFragment: this.taskIdFragment,
      nameFragment: this.nameFragment,
      statusFragment: this.statusFragment,
      exidCodeFragment: this.exidCodeFragment,

      startTimeFragment: this.startTimeFragment,
      endTimeFragment: this.endTimeFragment,
      allocatedNodesFragment: this.allocatedNodesFragment,
      commandLineFragment: this.commandLineFragment,
    };
  }
}
