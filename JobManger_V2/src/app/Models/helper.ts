import { LayoutInfo, TaskLayoutInfo } from './layout';
export interface Deserializable {
  deserialize(input: any): this;
}

export interface Serializable {
  serialize(): any;
}

export class SearchResultsLayout implements Deserializable {
  PageNo: number;
  PageSize: number;
  totalResults: number;
  results: Array<LayoutInfo>;

  deserialize(input: any): this {
    this.PageNo = input.page;
    this.PageSize = input.pageSize;
    this.totalResults = input.totalResults;

    this.results = [];
    for (const result of input.results) {
      this.results.push(new LayoutInfo().deserialize(result));
    }
    return this;
  }
}
export class SearchTaskResultsLayout implements Deserializable {
  PageNo: number;
  PageSize: number;
  totalResults: number;
  results: Array<TaskLayoutInfo>;

  deserialize(input: any): this {
    this.PageNo = input.page;
    this.PageSize = input.pageSize;
    this.totalResults = input.totalResults;

    this.results = [];
    for (const result of input.taskResults) {
      this.results.push(new TaskLayoutInfo().deserialize(result));
    }
    return this;
  }
}
