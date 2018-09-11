var ncp = require("copy-paste");
var requireDir = require('require-dir');

if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " path/to/directory there is no second parameter");
  process.exit(-1);
}

var dir = requireDir(process.argv[2]);

const loginUrl = dir.config.loginUrl;
const siteUrl = dir.config.siteUrl;

const interactions = `module.exports = ${dir.interactions.toString()}`;
const authInteractions = `module.exports = ${dir.authInteractions.toString()}`;

var jsonText = JSON.stringify({
  'extractionConfigs': {},
  'authInteractions': [{
      'constructor': 'GotoAction',
      'url': loginUrl,
    },
    {
      'constructor': 'CodeAction',
      'code': authInteractions,

    },
  ],
  'interactions': [{
      'constructor': 'GotoAction',
      'url': siteUrl,
    },
    {
      'constructor': 'CodeAction',
      'code': interactions,
    },
  ],

});

ncp.copy(jsonText, () => {})