class User {
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
// Die Klasse umschließt die Eigenschaften und Methoden eines Benutzers.
// Member: firstName, lastName und die private Eigenschaft #isActive.
// Der Konstruktor initialisiert die Eigenschaften.
// Die Methode getFullName gibt den vollständigen Namen des Benutzers zurück.
// Property accessor: active gibt den Aktivitätsstatus des Benutzers zurück. Mit den Schlüsselwötern set macht die Property beschreibbar.
// beschreibbar. get macht die Property nur lesbar. Private Eigenschaften werden mit # deklariert und sind nur innerhalb der Klasse zugänglich.
// Beispiel für die Verwendung der User Klasse:
// Vererbung in TypeScript
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