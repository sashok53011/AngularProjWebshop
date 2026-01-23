import { User } from './user.ts';

class Customer extends User {
    taxNumber: string = '';

    constructor(firstName: string, lastName: string) {
        super(firstName, lastName);
    }
}

const customer = new Customer('Max', 'Mustermann');
customer.taxNumber = 'DE123456789';
console.log(`Customer Name Z34: ${customer.getFullName()}`);
console.log(`Customer Active Z35: ${customer.active}`);
console.log(`Customer Tax Number Z36: ${customer.taxNumber}`);