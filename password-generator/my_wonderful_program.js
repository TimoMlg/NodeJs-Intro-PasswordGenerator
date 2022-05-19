#!/usr/bin/env node
import clipboard from 'clipboardy';
import generator from 'generate-password';
import color from 'ansi-colors';

const myArgs = process.argv;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function createPassword() { 
    var password;
    var length = 10;
    //set length of password
    myArgs.forEach(arg => {
        if (arg.match('^[0-9]*$')) {
            length = parseInt(arg);
            if (arg >= 6) {
                    password = generator.generate({
                    length: length,
                    numbers: true,
                    lowercase: true,
                    uppercase: true,
                    symbols: true,
                    strict: true
                });
            } else {
                console.log("Veuillez choisir un mot de passe d'au moins 6 caracteres");
            }
        }
       });

   //optional -c arg for clipboard
   myArgs.forEach(arg => {
    if (arg == "-c") {
        if (password != undefined) {
            clipboard.writeSync(password);
        }
    } 
   })
   
   return password;
}

function displayPassword(password) {
    if (password != undefined) {
        // Itération sur le password
   for (let index = 0; index < password.length; index++) {
    // Tester la Présence de chiffre et print en rouge
    if (password[index].match('^[0-9]*$')) {
        process.stdout.write(color.red(password[index]));
        // Tester la présence de caracteres spéciaux et print en Bleu
    } else if (password[index].match(specialChars)) {
        process.stdout.write(color.blue(password[index]));
        //Print les caracteres normaux
    } else {
        process.stdout.write(password[index]);
    }
   }
        process.stdout.write("\n");
    }
    
}

const pass = createPassword();
displayPassword(pass);