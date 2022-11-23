import { LayoutInfo } from './layout';
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
        this.PageNo = input.PageNo;
        this.PageSize = input.PageSize;
        this.totalResults = input.totalResults;
        
        this.results = [];
        for (const result of input.result) {
            this.results.push(new LayoutInfo().deserialize(result));
        }
        return this;
    }

    
}

