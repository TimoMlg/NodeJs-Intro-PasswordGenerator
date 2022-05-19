import XKCDPassword from "xkcd-password";
var pw = new XKCDPassword;

var options = {
  numWords: 4,
  minLength: 4,
  maxLength: 8
}
 
// using callbacks
pw.generate(options, function (err, result) {
  console.log(result.join(' '))  // ['distome', 'pantries', 'sending', 'weiner']
})