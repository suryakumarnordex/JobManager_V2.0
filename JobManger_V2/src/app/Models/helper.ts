import { LayoutInfo } from './layout';
export interface Deserializable {
    deserialize(input: any): this;
}

export interface Serializable {
    serialize(): any;
}

export class SearchResultsLayout implements Deserializable {
    page: number;
    pageSize: number;
    totalResults: number;
    results: Array<LayoutInfo>;

    deserialize(input: any): this {
        this.page = input.Page;
        this.pageSize = input.PageSize;
        this.totalResults = input.TotalResults;
        
        this.results = [];
        for (const result of input.Results) {
            this.results.push(new LayoutInfo().deserialize(result));
        }
        return this;
    }
}