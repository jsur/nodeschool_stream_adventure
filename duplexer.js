var spawn = require('child_process').spawn;
var duplexer2 = require("duplexer2");

module.exports = function (cmd, args) {
    // spawn the process and return a single stream
    // joining together the stdin and stdout here
    var x = spawn(cmd, args);
    return duplexer2(x.stdin, x.stdout);
};
