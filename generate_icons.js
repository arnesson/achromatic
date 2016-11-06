#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var svgicons2svgfont = require('svgicons2svgfont');
var svg2ttf = require('svg2ttf');
var ttf2woff = require('ttf2woff');

var folder = './icon';

var streamToString = function(stream, callback) {
  var str = '';
  stream.on('data', function(chunk) {
    str += chunk;
  });
  stream.on('end', function() {
    callback(str);
  });
}

fs.readdir(folder, function(err, files) {
  files.forEach(function(file) {
    if (path.extname(file) === '.svg') {
      var name = path.basename(file, '.svg').replace("ios-", "");

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
          '$__INCLUDE_ICON_SCSS: true !default !global;' +
          '@if $__INCLUDE_ICON_SCSS {' +
          '  $__INCLUDE_ICON_SCSS: false;' +
          '  [class^="icon-"], [class*=" icon-"] {' +
          '    speak: none;' +
          '    font-style: normal;' +
          '    font-weight: normal;' +
          '    font-variant: normal;' +
          '    text-transform: none;' +
          '    -webkit-font-smoothing: antialiased;' +
          '    -moz-osx-font-smoothing: grayscale;' +
          '  }' +
          '}' +
          '@font-face {' +
          '  font-family: "' + name + '";' +
          '  src: url(data:applicaton/font-woff;base64,' + new Buffer(woff.buffer).toString('base64') + ') format("woff");' +
          '  font-weight: normal;' +
          '  font-style: normal;' +
          '}' +
          '.icon-' + name + ' {' +
          '  font-family: "' + name + '" !important;' + /* use !important to prevent issues with browser extensions that change fonts */
          '  &:before {' +
          '    content: "\\e900";' +
          '  }' +
          '}');
      });
    }
  });
});
