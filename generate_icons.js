#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var svgicons2svgfont = require('svgicons2svgfont');
var svg2ttf = require('svg2ttf');
var ttf2woff = require('ttf2woff');

var folder = './icons';

var streamToString = function(stream, callback) {
  var str = '';
  stream.on('data', function(chunk) {
    str += chunk;
  });
  stream.on('end', function() {
    callback(str);
  });
}

fs.readdir('./icons', function(err, files) {
  files.forEach(function(file) {
    if (path.extname(file) === '.svg') {
      var name = path.basename(file, '.svg');

      var font = svgicons2svgfont({});

      var glyph = fs.createReadStream(path.join(folder, file));

			glyph.metadata = {
			  unicode: ['\uE900'],
			  name: ''
			};

			font.write(glyph);
			font.end();

			streamToString(font, function(str) {
				var ttf = svg2ttf(str, {});
	      var woff = ttf2woff(new Buffer(ttf.buffer), {});

	      console.log(name);

	      fs.writeFileSync(path.join(folder, name + '.scss'),
	      	'@import "./icon.scss";' +
	      	'@font-face {' +
					'  font-family: "' + name + '";' +
					'  src: url(data:applicaton/font-woff;base64,' + new Buffer(woff.buffer).toString('base64') + ') format("woff");' +
					'  font-weight: normal;' +
					'  font-style: normal;' +
					'}' +
					'.icon-ios-arrow-back {' +
					'  font-family: "' + name + '" !important;' + /* use !important to prevent issues with browser extensions that change fonts */
					'  &:before {' +
					'    content: "\\e900";' +
					'  }' +
					'}');
			});
    }
  });
});
