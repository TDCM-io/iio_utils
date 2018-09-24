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
  'interactions': [{
      'constructor': 'GotoAction',
      'url': siteUrl,
      "options": {
        "externalScripts": [
          "https://tdcmioiio.herokuapp.com/utils.js",
          "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        ]
      }
    },
    {
      'constructor': 'CodeAction',
      'code': interactions,
    },
  ],
  'authInteractions': [{
    'constructor': 'GotoAction',
    'url': loginUrl,
    "options": {
      "externalScripts": [
        "https://tdcmioiio.herokuapp.com/utils.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
      ]
    }
  },
  {
    'constructor': 'CodeAction',
    'code': authInteractions,

  },
]
});

ncp.copy(jsonText, () => {})