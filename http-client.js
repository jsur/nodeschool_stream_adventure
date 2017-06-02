var request = require('request');

var stream = request.post('http://localhost:8099');
process.stdin.pipe(stream).pipe(process.stdout);
