import { Deserializable, Serializable } from './helper';

export class User implements Deserializable, Serializable {
    email: string;
    phone: string;
    userName: string;
    displayName: string;

    deserialize(input: any): this {
        this.email = input.Email;
        this.phone = input.Phone;
        this.userName = input.UserName;
        this.displayName = input.DisplayName;
        return this;
    }

    serialize(): any {
        return { 'Email': this.email, 'Phone': this.phone, 'UserName': this.userName, 'DisplayName': this.displayName };
    }
}

