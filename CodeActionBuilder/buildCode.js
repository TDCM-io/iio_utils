var fs = require('fs');
const  ncp = require("copy-paste");

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory there is no second parameter");
    process.exit(-1);
}

var requireDir = require('require-dir');
var dir = requireDir(process.argv[2]);

const config = dir.config;
const url = config.loginUrl;
const url1 = config.siteUrl;

const fnstr1 = `module.exports = ${dir.interactions.toString()}`;
const fnstr2 = `module.exports = ${dir.authInteractions.toString()}`;

var jsonText= JSON.stringify({
    'extractionConfigs': {
    },
    'authInteractions': [
      {
        'constructor': 'GotoAction',
        'url': url,
      },
      {
        'constructor': 'CodeAction',
        'code': fnstr2,
        
      },
    ],
    'interactions': [
      {
        'constructor': 'GotoAction',
        'url': url1,        
      },
      {
        'constructor': 'CodeAction',
        'code': fnstr1,
      },
    ],
    
  });
console.log(jsonText);


 
ncp.copy(jsonText, function () {})

