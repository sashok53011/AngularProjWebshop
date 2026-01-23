// npm install -g typescript   -> Installiert TypeScript global
const title = 'Hello TypeScript';
console.log(title);

let qty: number=10
// Tenärer Operator, Nullish Coalescing Operator: Wenn qty null oder undefined ist, wird 1 verwendet, sonst der Wert von qty.
const quantity = qty ?? 1;
console.log(`Quantity Z8: ${quantity}`);


// Funktionen in JavaScript sind die Prozessmaschinen, die wir nutzen, um Eingaben zu analysieren, Informationen zu verarbeiten
// und die norwendigen veränderungen an Daten vorzunehmen. Sie nutzen Parameter, um Daten zu liefern, die den Zustand unserer Anwendung
//transformieren oder geben eine Ausgabe zurück, die zur Geschäftslogik unserer Anwendung passt oder zur Benutzerinteraktion beiträgt.
function addtoCart(productId: number, quantity: number = 1): void {
    const product = {
        id: productId,
        qty: quantity
    };
    console.log(`Product added to cart Z19:`, product);
    }
addtoCart(101);
// Ein Vorteil von JS ist die Flexibilität bei der Definition von Funktionen. Es werden Parameter akzeptiert, die unbeschränkte, nicht benannte Arrays 
// von Parametern sind, die als "Rest-Parameter" bezeichnet werden. Wir können auch am Ende der Parmaterliste einen zusätzlichen Parameter
//definieren, der vorgefestigt mit einer Ellipse (...) geschrieben wird. Dies ermöglicht es uns, eine variable Anzahl von Argumenten zu übergeben,
//die dann als Array innerhalb der Funktion behandelt werden.
function addProduct(name:string, ...categories:string[]): void {
    const product = {
        name,
        categories: categories.join(', ')
    };
    console.log(`Product added Z31:`, product);
    //return product;
}
addProduct('Laptop', 'Electronics', 'Computers', 'Gadgets');
//let productA = addProduct('Laptop', 'Electronics', 'Computers', 'Gadgets');
//console.log(`Product added Z35:`, productA);
// Rest Parameter sind essentiell, wenn wir nicht wissen, wie viele Argumente an eine Funktion übergeben werden. Die name Property wird ebenso gesetzt, um
// um eine andere nützliche Eigenschaft von JS zu nutzen. Anstatt die Property im Product Objekt explizit zu definieren, können wir die Kurzschreibweise verwenden,
// wenn der Property-Name mit dem Variablennamen übereinstimmt.


// Arrow Function
let price: number = 100;

const discount = (price:number) => {
    return (price / 100) * 10; // 10% Rabatt
};
// Oder kürzer:
const discountA = (price:number) => (price / 100) * 20; // 20% Rabatt
// in reinem JavaScript ohne Typ-Deklaration kann die Klammern weggelassen werden.
//nützlich, wenn die Parameterliste nur einen Eintrag hat oder ersetzt die geschweiften Klammern und das return Schlüsselwort bei
//  einer einzigen Anweisung im Funktionskörper.

console.log(`Discount Z45: ${discount(price)}`);
console.log(`DiscountA Z49: ${discountA(price)}`);

// Wie hängen jetzt Arrow Functions mit der Wertbindung von this zusammen?
// In regulären Funktionen wird der Wert von this dynamisch bestimmt, basierend darauf, wie die Funktion aufgerufen wird.
// In Arrow Functions hingegen wird der Wert von this lexikalisch gebunden, was bedeutet, dass er den Wert von this aus dem
// umgebenden Kontext übernimmt,
// in dem die Arrow Function definiert wurde.
// Je nachdem wo eine Funktion ausgeführt wird, kann der Wert von this variieren. Wenn wie es in einem Callback verwendet wird,
// kann this auf ein anderes Objekt verweisen als erwartet. Arrow Functions lösen dieses Problem, indem sie den Wert von this
// aus dem umgebenden Kontext übernehmen, in dem sie definiert wurden.

function createProdukt(name:string) {
    this.name = name;
    this.getName = function() {
        setTimeout(function() {
            console.log(`Product Name Z68: ${this.name}`); // this verweist hier nicht auf das Produktobjekt
        });
    }
}
const product = new createProdukt('Smartphone') //undefined
product.getName();
// Um das Problem zu lösen, können wir eine Arrow Function verwenden, die den Wert von this aus dem umgebenden Kontext übernimmt.
function createProduktA (name:string) {
    this.name = name;
    this.getName = function() {
        setTimeout(() => {
            console.log(`Product Name Z78: ${this.name}`); // this verweist hier auf das Produktobjekt
        });
    }
}
const productA = new createProduktA('Tablet')
productA.getName();

// Arrow Functions sind besonders nützlich in Szenarien wie Callback-Funktionen, Event-Handlern oder Methoden in Klassen,
// bei denen der Wert von this konsistent bleiben soll und nicht durch den Aufrufkontext verändert werden darf.

// Optional Chaining
//kann helfen, den Code zu vereinfachen und zu überarbeiten, indem es unseren Codee dahin führt, die Ausführung einer Anweisung ignorieren,
//bis ein Wert in der Anweisung bereitgestellt wird.

const getOrder = () => {
    return {
        product: {
            name: 'Headphones',
            price: 150
        }
    };
}
//Jetzt definieren wir eine getOrder() Funktion, die ein Produkt einer Teilbestellung zurückgibt. Wenn wir jetzt versuchen,
//auf die price Property des Produkts zuzugreifen, könnten wir auf ein Problem stoßen, wenn das Produktobjekt nicht definiert ist.
const order = getOrder();
//console.log(`Order Z102:`, order);
if (order !== undefined){
    const product = order.product;
    console.log(`Product Name Z98: ${product.name}`);
}

// Dieser Code ist der vorbeugende Schritt, wenn unser Objekt verändert wurde. Wenn wir nicht prüfen, ob das Objekt undefined ist, wird JS
// einen Fehler werfen. Mit Optional Chaining können wir den Code vereinfachen:
const orderB = getOrder();
const productB = orderB?.product;
console.log(`Product Name Z109: ${productB?.name}`);
// Das ?. Operator überprüft, ob orderA definiert ist, bevor es versucht, auf die product Property zuzugreifen. Wenn orderA undefined ist, wird der gesamte Ausdruck
// undefined zurückgeben, anstatt einen Fehler zu werfen. Optional Chaining kann auch verschachtelt werden, um tiefere Ebenen von Objekten zu überprüfen.
const priceA = orderB?.product?.price;
console.log(`Product Price Z112: ${priceA}`);
// In diesem Beispiel überprüft der ?. Operator sowohl orderA als auch product, bevor er versucht, auf die price Property zuzugreifen.
// Wenn eine der beiden undefiniert ist, wird der gesamte Ausdruck undefined zurückgeben.
// Optional Chaining ist besonders nützlich, wenn wir mit komplexen Datenstrukturen arbeiten, bei denen einige Teile möglicherweise
//  nicht definiert sind.

