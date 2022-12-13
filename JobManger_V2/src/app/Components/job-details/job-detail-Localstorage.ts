export class JobDetaillocalstorage
{
public  idcolumnWidthValue: string;
public  usercolumnWidthValue: string;
public  cockpitcolumnWidthValue: string;
public  runcolumnWidthValue: string;
public  typecolumnWidthValue: string;
public  topiccolumnWidthValue: string;
public  statuscolumnWidthValue: string;
public  progresscolumnWidthValue: string;
public  prioritycolumnWidthValue: string;
public  notaskcolumnWidthValue: string;
public  runningTaskcolumnWidthValue: string;
public  queuedTaskcolumnWidthValue: string;
public  starttimecolumnWidthValue: string;
public  endtimecolumnWidthValue: string;
public  submittimecolumnWidthValue: string;
public  elapsedtimecolumnWidthValue: string;
public  pendingreasoncolumnWidthValue: string;

public  recordPerPageValue: Number = 10;
public  pageSize: Number;
public  SelectedjobId: Array<number>;

getidcolumnWidthValue(): string {
  return this.idcolumnWidthValue;
}
setidcolumnWidthValue(value: string) {
  this.idcolumnWidthValue = value;
}

getusercolumnWidthValue(): string {
  return this.usercolumnWidthValue;
}
setusercolumnWidthValue(value: string) {
  this.usercolumnWidthValue = value;
}

getcockpitcolumnWidthValue(): string {
  return this.cockpitcolumnWidthValue;
}
setcockpitcolumnWidthValue(value: string) {
  this.cockpitcolumnWidthValue = value;
}
getruncolumnWidthValue(): string {
  return this.runcolumnWidthValue;
}
setruncolumnWidthValue(value: string) {
  this.runcolumnWidthValue = value;
}
gettypecolumnWidthValue(): string {
  return this.typecolumnWidthValue;
}
settypecolumnWidthValue(value: string) {
  this.typecolumnWidthValue = value;
}
gettopiccolumnWidthValue(): string {
  return this.topiccolumnWidthValue;
}
settopiccolumnWidthValue(value: string) {
  this.topiccolumnWidthValue = value;
}
 getstatuscolumnWidthValue(): string {
  return this.statuscolumnWidthValue;
}
setstatuscolumnWidthValue(value: string) {
  this.statuscolumnWidthValue = value;
}
getprogresscolumnWidthValue(): string {
  return this.progresscolumnWidthValue;
}
setprogresscolumnWidthValue(value: string) {
  this.progresscolumnWidthValue = value;
}
getprioritycolumnWidthValue(): string {
  return this.prioritycolumnWidthValue;
}
setprioritycolumnWidthValue(value: string) {
  this.prioritycolumnWidthValue = value;
}
getnotaskcolumnWidthValue(): string {
  return this.notaskcolumnWidthValue;
}
setnotaskcolumnWidthValue(value: string) {
  this.notaskcolumnWidthValue = value;
}
getRunningTaskcolumnWidthValue(): string {
  return this.runningTaskcolumnWidthValue;
}
setRunningTaskcolumnWidthValue(value: string) {
  this.runningTaskcolumnWidthValue = value;
}
getQueuedTaskcolumnWidthValue(): string {
  return this.queuedTaskcolumnWidthValue;
}
setQueuedTaskcolumnWidthValue(value: string) {
  this.queuedTaskcolumnWidthValue = value;
}
getstarttimecolumnWidthValue(): string {
  return this.starttimecolumnWidthValue;
}
setstarttimecolumnWidthValue(value: string) {
  this.starttimecolumnWidthValue = value;
}
getendtimecolumnWidthValue(): string {
  return this.endtimecolumnWidthValue;
}
setendtimecolumnWidthValue(value: string) {
  this.endtimecolumnWidthValue = value;
}
getelapsedtimecolumnWidthValue(): string {
  return this.elapsedtimecolumnWidthValue;
}
setelapsedtimecolumnWidthValue(value: string) {
  this.elapsedtimecolumnWidthValue = value;
}
getsubmittimecolumnWidth(): string {
  return this.submittimecolumnWidthValue;
}
setsubmittimecolumnWidth(value: string) {
  this.submittimecolumnWidthValue = value;
}
getpendingreasoncolumnWidthValue(): string {
  return this.pendingreasoncolumnWidthValue;
}
setpendingreasoncolumnWidthValue(value: string) {
  this.pendingreasoncolumnWidthValue = value;
}
getrecordPerPageValue(): Number {
  return this.recordPerPageValue;
}
setrecordPerPageValue(value: Number) {
  this.recordPerPageValue = value;
}
getpageSize(): Number {
  return this.pageSize;
}
setpageSize(value: Number) {
  this.pageSize = value;
}
getGetSelectedjobId():Array<number> {
  return this.SelectedjobId;
}
SetSelectedjobId(value: Array<number>) {
  this.SelectedjobId = value; 
}

getgetJobGlobalVar():JobDetaillocalstorage{
    return this;
  }


}