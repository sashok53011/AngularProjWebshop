import promptSync from "prompt-sync";
const prompt = promptSync({sigint: true})
console.log('Tiernamen raten - alias hangman')

tierliste = ['Elephant', 'Dephin', 'Fuchs', 'Dachs', 'Gans', 'Eierlegendewollmichsau']
let gewaehlt = tierliste[3]
let buchstabenwahl = []

 while (true) {
    let buchstaben = prompt('Buchstabe oder Wort: ')
    if (buchstaben.length === 1) {
        console.log(' - ein buchstabe gegeben')
    } else if (buchstaben.length > 1) {
        console.log(' - mehere buchstaben = wort gegeben')
    } else if (buchstaben.length === 0) {
        console.log(' - kein buchstabe gegeben - nur Enter')
        return
    } else { console.log(' Fehlerhafte Eingabe - bittte nochmal: ')}
 }
