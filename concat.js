var concat = require('concat-stream');

var ct = concat(function(input) {
  var body = input.toString().split('').reverse().join('');
  console.log(body);
});

process.stdin.pipe(ct);
