var ncp = require("copy-paste");
var requireDir = require('require-dir');

if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " path/to/directory there is no second parameter");
  process.exit(-1);
}

var dir = requireDir(process.argv[2]);

const loginUrl = dir.config.loginUrl;
const siteUrl = dir.config.siteUrl;
const configJSON = dir.config.runtimeConfig;
const gotoActionOptions = dir.config.gotoActionOptions || {};

const interactions = `module.exports = ${dir.interactions.toString().replace(/INSERT_CONFIG_HERE/, configJSON)}`;

if (loginUrl) {
  const authInteractions = `module.exports = ${dir.authInteractions.toString()}`;

  var jsonText = JSON.stringify({
    'extractionConfigs': {
      "_runtimeConfig": configJSON
    },
    'authInteractions': [{
        'constructor': 'GotoAction',
        'url': loginUrl,
        'options': gotoActionOptions
      },
      {
        'constructor': 'CodeAction',
        'code': authInteractions
      }
    ],
    'interactions': [{
        'constructor': 'GotoAction',
        'url': siteUrl,
        'options': gotoActionOptions
      },
      {
        'constructor': 'CodeAction',
        'code': interactions
      }
    ]
  });
} else {
  var jsonText = JSON.stringify({
    'extractionConfigs': {
      "_runtimeConfig": configJSON
    },
    'interactions': [{
        'constructor': 'GotoAction',
        'url': siteUrl,
        'options': gotoActionOptions
      },
      {
        'constructor': 'CodeAction',
        'code': interactions
      }
    ]
  });
}
ncp.copy(jsonText, () => {})