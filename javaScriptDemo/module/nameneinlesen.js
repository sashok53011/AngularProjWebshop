// Projekt: Namen einlesen und ausgeben
import promptSync from 'prompt-sync'
const prompt = promptSync({sigint: true})

console.log('Hi\n gib mir einen VorNamen:')

 let vorname = prompt('Eingabe')
console.log(' deine Eingabe war:', vorname)

