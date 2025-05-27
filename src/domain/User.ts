export class User {
    userId: string;
    firstName?: string;
    lastName?: string;
    password: string;

    constructor (userId: string, firstName: string, lastName: string, password: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

}