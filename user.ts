export class User {
    firstName= '';
    lastName= '';
    #isActive = false;

    constructor(firstName: string, lastName: string, isActive: boolean = true) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#isActive = isActive;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    get active(): boolean {
        return this.#isActive;
    }
}


