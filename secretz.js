var tar = require('tar');
var crypto = require('crypto');
var through = require('through2');
var zlib = require('zlib');

var stream = crypto.createDecipher(process.argv[2], process.argv[3]);
var md5 = crypto.createHash('md5', { encoding: 'hex' });
var parser = new tar.Parse();

parser.on('entry', function (e) {
  if(e.type == 'File') {
    console.log(e);
  }
  console.log(e.path);
    //through(write(e), end);
});

function write (line, _, next) {
  md5.update(line);
  next();
}

function end (next) {
  next();
}



process.stdin
  .pipe(stream) //uncipher
  .pipe(zlib.createGunzip()) //unzip
  .pipe(parser) //provide readable entry object streams and create hash
