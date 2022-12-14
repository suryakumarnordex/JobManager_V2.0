import { Deserializable, Serializable } from './helper';

export class LayoutInfo implements Deserializable, Serializable {
  jobIdFragment: number;
  userFragment: string;
  typeFragment: string;
  topicFragment: string;
  cockpitIdFragment: number;
  runnoFragment: string;
  runFolderFragment: string;
  statusFragment: string;
  priorityFragment: string;
  progressFragment: number;
  numberOfTasksFragment: number;
  nodeGroupFragment: string;
  pendingReasonFragment: string;
  orderBy: string;
  orderDescending: boolean;

  //New
  startTime: string;
  endTime: string;
  elapsedTime: string;
  submitTime: string;
  failedTasksCount: number;
  runningTasksCount: number;
  queuedTasksCount:number;
  finishedTasksCount: number;
  clipboardtext: string;
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
    this.runFolderFragment= input.runFolder;
    this.statusFragment = input.state;
    this.priorityFragment = input.priority;
    this.progressFragment = input.progress;
    this.numberOfTasksFragment = input.numberOfTasks;
    this.nodeGroupFragment = input.nodeGroup;
    this.pendingReasonFragment = input.pendingReason;

    //New
    this.startTime = input.startTime;
    this.endTime = input.endTime;
    this.elapsedTime = input.elapsedTime;
    this.submitTime = input.submitTime;
    this.failedTasksCount = input.failedTasksCount;
    this.runningTasksCount = input.runningTasksCount;
    this.queuedTasksCount = input.queuedTasksCount;
    this.finishedTasksCount = input.finishedTasksCount;
    this.clipboardtext = 'Copy directory path to clipboard';
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
      runFolderFragment: this.runFolderFragment,
      statusFragment: this.statusFragment,
      priorityFragment: this.priorityFragment,
      progressFragment: this.progressFragment,
      numberOfTasksFragment: this.numberOfTasksFragment,
      nodeGroupFragment: this.nodeGroupFragment,
      pendingReasonFragment: this.pendingReasonFragment,
      Comment: this.pendingReasonFragment,
      clipboardtext: this.clipboardtext,
      startTime: this.startTime,
      endTime: this.endTime,
      elapsedTime: this.elapsedTime,
      submitTime: this.submitTime,
      failedTasksCount: this.failedTasksCount,
      runningTasksCount: this.runningTasksCount,
      queuedTasksCount: this.queuedTasksCount,
      finishedTasksCount: this.finishedTasksCount,
    };
  }
}
export class TaskLayoutInfo implements Deserializable, Serializable {
  jobIdFragment: number;
  taskIdFragment: number;
  nameFragment: string;
  statusFragment: string;
  exidCodeFragment: string;
  exidCodeNameFragment: string;
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
    this.exidCodeNameFragment = input.exitCodeName;
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
      exidCodeNameFragment: this.exidCodeNameFragment,
      startTimeFragment: this.startTimeFragment,
      endTimeFragment: this.endTimeFragment,
      allocatedNodesFragment: this.allocatedNodesFragment,
      commandLineFragment: this.commandLineFragment,
    };
  }
}
