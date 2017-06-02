var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {

  var genreinfo;

    function write(buf) {
      if(buf.length === 0) {
        return;
      }

      buf = JSON.parse(buf);
      if (buf.type === 'genre') {
        if (genreinfo) {
          this.queue(JSON.stringify(genreinfo) + '\n');
        }

        genreinfo = {
          name: buf.name,
          books: []
        }
      }
    else {
      genreinfo.books.push(buf.name);
    }
  }

    function end() {
      this.queue(JSON.stringify(genreinfo) + '\n');
      this.queue(null);
    }

    return combine(
      split(), // read newline-separated json,
      through(write, end),    // group books into genres, // then gzip the output
      zlib.createGzip()
    );
};

// Solution from: https://github.com/brunops/nodeschool-solutions/blob/master/stream-adventure/combiner.js

/*
Reference solution

var combine = require('stream-combiner');
var through = require('through2');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
    var grouper = through(write, end);
    var current;

    function write (line, _, next) {
        if (line.length === 0) return next();
        var row = JSON.parse(line);

        if (row.type === 'genre') {
            if (current) {
                this.push(JSON.stringify(current) + '\n');
            }
            current = { name: row.name, books: [] };
        }
        else if (row.type === 'book') {
            current.books.push(row.name);
        }
        next();
    }
    function end (next) {
        if (current) {
            this.push(JSON.stringify(current) + '\n');
        }
        next();
    }

    return combine(split(), grouper, zlib.createGzip());
};

*/
