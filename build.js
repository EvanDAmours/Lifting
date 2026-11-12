// Wraps app.html (the page body, which is what gets published as the Claude artifact)
// into a standalone index.html that any static host, including GitHub Pages, can serve.
// Usage: node build.js
const fs = require('fs');
const path = require('path');

let src = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf8');
const head = [];
const lift = (re) => {
  src = src.replace(re, (m) => { head.push(m.trim()); return ''; });
};
lift(/<title>[\s\S]*?<\/title>\s*/);
lift(/<meta name="claude:[^>]*>\s*/);
lift(/<link rel="stylesheet"[^>]*>\s*/);

const reset =
  ':root{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}' +
  'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}';

const out =
  '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' +
  head.join('\n') + '\n<style>' + reset + '</style>\n</head>\n<body>\n' + src.trim() + '\n</body>\n</html>\n';

fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log('index.html written (' + out.length + ' bytes)');
