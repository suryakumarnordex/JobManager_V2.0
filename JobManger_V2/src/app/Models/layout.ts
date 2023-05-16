import { Deserializable, Serializable } from './helper';

export class JobLayoutInfo implements Deserializable, Serializable {
  jobIdFragment: number;
  userFragment: string;
  cockpitNameFragement: string;
  typeFragment: string;
  topicFragment: string;
  cockpitIdFragment: number;
  cockpitfolderFragment: string;
  project: string;
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
  parentJobIdsFragment:string;
  parentJobIdsStatusFragment:string;
  toolChainVersionFragment : string;


  //New
  startTime: string;
  endTime: string;
  elapsedTime: string;
  submitTime: string;
  failedTasksCount: number;
  runningTasksCount: number;
  queuedTasksCount: number;
  finishedTasksCount: number;

  // PageNo: number;
  // PageSize: number;
  waitForChange: boolean;

  deserialize(input: any): this {
    this.jobIdFragment = input.id;
    this.userFragment = input.cockpitUserName;
    this.cockpitNameFragement = input.cockpitName;
    this.typeFragment = input.type;
    this.topicFragment = input.runTopic;
    this.cockpitIdFragment = input.cockpitId;
    this.runnoFragment = input.runNumber;
    this.runFolderFragment = input.runFolder;
    this.statusFragment = input.state;
    this.priorityFragment = input.priority;
    this.progressFragment = input.progress;
    this.numberOfTasksFragment = input.numberOfTasks;
    this.nodeGroupFragment = input.nodeGroup;
    this.pendingReasonFragment = input.pendingReason;
    this.cockpitfolderFragment = input.cockpitFolder;
    this.project = input.project;
    this.parentJobIdsFragment=input.parentJobIds;
    this.parentJobIdsStatusFragment=input.parentJobIdsStatus;
    this.toolChainVersionFragment=input.toolChainVersion;
    //New
    this.startTime = input.startTime;
    this.endTime = input.endTime;
    this.elapsedTime = input.elapsedTime;
    this.submitTime = input.submitTime;
    this.failedTasksCount = input.failedTasksCount;
    this.runningTasksCount = input.runningTasksCount;
    this.queuedTasksCount = input.queuedTasksCount;
    this.finishedTasksCount = input.finishedTasksCount;
    // this.clipboardtext = 'Copy directory path to clipboard';
    return this;
  }
  serialize() {
    return {
      jobIdFragment: this.jobIdFragment,
      userFragment: this.userFragment,
      cockpitNameFragement: this.cockpitNameFragement,
      typeFragment: this.typeFragment,
      topicFragment: this.topicFragment,
      cockpitIdFragment: this.cockpitIdFragment,
      project: this.project,
      cockpitfolderFragment: this.cockpitfolderFragment,
      runnoFragment: this.runnoFragment,
      runFolderFragment: this.runFolderFragment,
      statusFragment: this.statusFragment,
      priorityFragment: this.priorityFragment,
      progressFragment: this.progressFragment,
      numberOfTasksFragment: this.numberOfTasksFragment,
      nodeGroupFragment: this.nodeGroupFragment,
      pendingReasonFragment: this.pendingReasonFragment,
      Comment: this.pendingReasonFragment,
      parentJobIdsFragment:this.parentJobIdsFragment,
      parentJobIdsStatusFragment:this.parentJobIdsStatusFragment,
      toolChainVersionFragment:this.toolChainVersionFragment,
      // clipboardtext: this.clipboardtext,
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
  standardOutput: string;

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
    this.standardOutput = input.standardOutput;
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
      standardOutput: this.standardOutput,
      commandLineFragment: this.commandLineFragment,
    };
  }
}
