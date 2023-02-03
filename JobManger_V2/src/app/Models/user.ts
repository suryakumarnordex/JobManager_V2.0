import { Deserializable, Serializable } from './helper';

export class User implements Deserializable, Serializable {
    email: string;
    // phone: string;
    userName: string;
    displayName: string;

    deserialize(input: any): this {
        this.email = input.email;
        // this.phone = input.Phone;
        this.userName = input.userName;
        this.displayName = input.displayName;
        return this;
    }

    serialize(): any {
        return { 'email': this.email, 'userName': this.userName, 'displayName': this.displayName };
    }
}

