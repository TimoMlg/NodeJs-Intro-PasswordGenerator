#!/usr/bin/env node
import clipboard from 'clipboardy';
import generator from 'generate-password';
import color from 'ansi-colors';

const myArgs = process.argv;
//console.log("Node rocks!");

function createPass() { 
    var length = 10;
    //set length of password
    myArgs.forEach(arg => {
        if (arg.match('^[0-9]*$')) {
            length = parseInt(arg);
        }
       });

    var password = generator.generate({
        length: length,
        numbers: true,
        lowercase: true,
        uppercase: true,
        symbols: true

    });
   //optional -c arg for clipboard
   myArgs.forEach(arg => {
    if (arg == "-c") {
        clipboard.writeSync(password);
    } 
   })

   const splittedPass = password.split('');
   splittedPass.forEach(char => {
       if (char.match(/[`!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?~]/)) {
            console.log(color.red(char));
            const index = password.indexOf(char);
            splittedPass.splice(index, 0, char);
       }
   });
   
   return password;
}

const password = createPass();
console.log(password);
