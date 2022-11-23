import { Deserializable, Serializable } from '../Models/helper';

export class TaskDetailsModules implements Deserializable {
  jobIdFragment?: number;
  taskIdFragment?: number;
  nameFragment?: string;
  statusFragment?: string;
  exidCodeFragment?: string;

  startTimeFragment?: string;
  endTimeFragment?: string;
  allocatedNodesFragment?: string;

  commandLineFragment?: string;

  parameter: TaskDetailsModules[] = [];
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

    if (input.Parameter !== null) {
      for (const parameter of input.Parameter) {
        this.parameter.push(new TaskDetailsModules().deserialize(parameter));
      }
    }
    return this;
  }
}
