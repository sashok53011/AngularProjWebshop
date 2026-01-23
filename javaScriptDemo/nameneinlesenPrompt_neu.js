// Projekt: Namen einlesen und ausgeben, 
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Name: ', answer => {
	console.log('Du hast eingegeben: ', answer);
	rl.close();
});
