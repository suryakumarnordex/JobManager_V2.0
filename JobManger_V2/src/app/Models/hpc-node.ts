import { Deserializable } from './helper';

export class HpcNode implements Deserializable {
    name: string;
    description: string;
    state: boolean;

    deserialize(input: any): this {
        this.name = input.m_Item1;
        this.description = input.m_Item2;
        this.state = input.m_Item3;
        return this;
    }
}
