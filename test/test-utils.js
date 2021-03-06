var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var fs = require('fs');
var vm = require('vm');
var path = './lib/utils.js';
var code = fs.readFileSync(path);

class importContext {
  constructor() {
    this.memory = {};
    this.lastResponseData = {};
  }

  createData(data) {
    return data;
  }

  return (data) {
    return data;
  }
};

describe('utils.js', function () {
  jsdom();

  // Set timout to 10s due to Target fetch failing with 5s
  this.timeout(10000);

  before(function () {

    const {
      JSDOM
    } = require('jsdom');
    var wgxpath = require('wgxpath');

    class DOMParser {
      constructor() {}

      parseFromString(URL, mode) {
        return new JSDOM(URL).window.document;
      }
    };

    let context = vm.createContext({ ...window,
      fetch: require('node-fetch'),
      DOMParser: DOMParser,
      XPathResult: wgxpath.XPathResultType
    });

    vm.runInNewContext(code.toString(), context);
  });

  it('library loads', function () {
    var utils = new window.__Utils(this);
    expect(utils.loaded).to.equal(true);
  });

  it('endEx() works', () => {
    var utils = new window.__Utils(new importContext());
    // return both authentication and failure message
    expect(utils.endEx('AUTH_SUCCESS', 'INVALID_URL')).to.deep.equal({
      auth_status: "SUCCESS",
      auth_message: " ",
      status: "FAILURE",
      message: "URL is invalid."
    });

    // return both authentication and failure message with custom auth message
    expect(utils.endEx(null, null, 'Failure message')).to.deep.equal({
      auth_status: "FAILURE",
      auth_message: 'Failure message',
      status: "FAILURE",
      message: " "
    });

    // return custom failure message
    expect(utils.endEx(null, null, null, 'Failure message')).to.deep.equal({
      auth_status: "SUCCESS",
      auth_message: ' ',
      status: "FAILURE",
      message: "Failure message"
    });

    // return custom failure and auth message
    expect(utils.endEx(null, null, 'Custom auth message', 'Custom failure message')).to.deep.equal({
      auth_status: "FAILURE",
      auth_message: 'Custom auth message',
      status: "FAILURE",
      message: "Custom failure message"
    });

    utils = new window.__Utils(new importContext(), 'NEG 3.1.1.');
    // return only authentication failure message (NEG 3.1.1)
    expect(utils.endEx(null, null, 'Failure message')).to.deep.equal({
      auth_status: "FAILURE",
      auth_message: 'Failure message'
    });

    utils = new window.__Utils(new importContext(), 'NEG 3.1.1');
    // test missing dot in columns' name
    expect(utils.endEx(null, null, 'Failure message')).to.deep.equal({
      auth_status: "FAILURE",
      auth_message: 'Failure message'
    });

    utils = new window.__Utils(new importContext());
    // return only auth message
    expect(utils.endEx('AUTH_UNKNOWN', null)).to.deep.equal({
      auth_status: "UNKNOWN",
      auth_message: " "
    });

    // return only auth message
    expect(utils.endEx('AUTH_UNKNOWN')).to.deep.equal({
      auth_status: "UNKNOWN",
      auth_message: " "
    });

    // return only failure message (no auth)
    expect(utils.endEx(null, 'INVALID_URL')).to.deep.equal({
      status: "FAILURE",
      message: "URL is invalid."
    });

    // return console.log when given invalid args
    const temp = console.log;
    console.log = (x => x);

    // handle invalid ObjectIds
    expect(utils.endEx(null, null)).to.equal('authObjId or statusObjId do not match any known status.');
    expect(utils.endEx('InvalidObjId', 'INVALID_URL')).to.equal('authObjId or statusObjId do not match any known status.');
    expect(utils.endEx('AUTH_SUCCESS', 'InvalidObjId')).to.equal('authObjId or statusObjId do not match any known status.');
    expect(utils.endEx('InvalidObjId', 'InvalidObjId')).to.equal('authObjId or statusObjId do not match any known status.');

    // restore console.log
    console.log = temp;
  });

  it('delay() works', () => {
    var utils = new window.__Utils(this);
    let start = new Date();
    return utils.delay(1000).then(() => {
      expect(new Date().getTime() - start.getTime()).to.be.gte(1000);
    });
  });

  it('checkTimeframes() works', () => {
    var utils = new window.__Utils(new importContext());

    expect(utils.checkTimeframes(["1231231231"])).to.not.equal(true); // two timeframes in array required
    expect(utils.checkTimeframes(["1231231231", "1000000000"])).to.not.equal(true); // first can't be greater then the second
    expect(utils.checkTimeframes(["1231231231", "1231231235"])).to.equal(true); // valid test case
    expect(utils.checkTimeframes(["1231231", "1231123231235"])).to.not.equal(true); // 10 digits
    expect(utils.checkTimeframes(["9999999998", "9999999999"])).to.not.equal(true); // first timeframe can't be in the future
  });

  it('handle404() works', () => {
    var utils = new window.__Utils(new importContext());
    const bad_codes = [401, 402, 403, 404, 405, 406, 407, 408, 500, 501, 502, 503, 504, 505].map(x => x.toString());
    const good_codes = [200, 201, 202, 203, 204, 205, 206].map(x => x.toString());

    // check invalid codes
    bad_codes.forEach(x => {
      let context = new importContext();
      context.lastResponseData.code = x;
      utils = new window.__Utils(context);
      expect(utils.handle404()).to.deep.equal(utils.endEx('AUTH_SUCCESS', 'INVALID_URL'));
    });

    // check valid codes
    good_codes.forEach(x => {
      let context = new importContext();
      context.lastResponseData.code = x;
      utils = new window.__Utils(context);
      expect(utils.handle404()).to.not.equal(utils.endEx('AUTH_SUCCESS', 'INVALID_URL'));
    });
  });

  it('safeRedirect() works', async () => {
    var utils = new window.__Utils(new importContext());

    // check valid URL
    var response = await utils.safeRedirect('https://www.google.com', {
      mode: 'no-cors'
    });
    expect(response).to.not.equal(utils.endEx('AUTH_SUCCESS', 'INVALID_URL'));

    // check invalid URL (code: 404)
    response = await utils.safeRedirect('https://www.target.com/p/coleman--174--quickpump-120v-pump/-/A-11115253invalid', {
      mode: 'no-cors'
    });
    expect(response).to.deep.equal(utils.endEx('AUTH_SUCCESS', 'INVALID_URL'));
  });

  it('fetchHTMLBody() works', async () => {
    var utils = new window.__Utils(new importContext());

    // check valid HTML
    var response = await utils.fetchHTMLBody('https://www.google.com', {
      mode: 'no-cors'
    });
    expect(response).to.have.property('querySelector');
    expect(response.querySelector('form[action="/search"]')).to.not.equal(null);

    // check invalid HTML (code: 404)
    response = await utils.fetchHTMLBody('https://www.asdfasd314sf.io', {
      mode: 'no-cors'
    });
    expect(response).to.deep.equal(utils.endEx('AUTH_SUCCESS', 'INVALID_URL'));
  });

//   it('checkDestinationBody() works', async () => {
//     // page loads, xpath doesn't exist
//     var utils = new window.__Utils(new importContext());
//     var response = await utils.checkDestinationBody('https://www.google.com', '//div[@class="asdf"]/td/td', {
//       mode: 'no-cors'
//     });
//     expect(response).to.equal(false);

//     // page loads, xpath exists
//     response = await utils.checkDestinationBody('https://www.google.com', '//div', {
//       mode: 'no-cors'
//     });
//     expect(response).to.equal(true);

//     // page doesn't exist
//     response = await utils.checkDestinationBody('https://www.asdfasd314sf.io', '//div/a/td/td', {
//       mode: 'no-cors'
//     });
//     expect(response).to.equal(false);

//     // page exists (404 handled by Target), xpath exists
//     response = await utils.checkDestinationBody('https://www.target.com/p/modern-wood-and-velour-dining-chair-green-zm-home/-/A-16577asdfs319', '(//div[@class[contains(., "ProductNotFound")]]) | (//p[contains(./text(), "we\'re sorry")])', {
//       mode: 'no-cors'
//     });
//     expect(response).to.equal(true);
//   });

  it('mergeExtractions() works', () => {
    var utils = new window.__Utils(new importContext());

    var obj1 = {
      "name": [{
        "text": "John Kowalski" // in 1, not in 2
      }],
      "address": [{
        "text": " " // in 2, not in 1
      }],
      "zip": [{
        "text": "1111" // newer in 2
      }],
      "price": [{
        "text": "$12" // not existing in 2
      }]
    };

    var obj2 = {
      "name": [{
        "text": " "
      }],
      "address": [{
        "text": "Chicago"
      }],
      "zip": [{
        "text": "2222"
      }],
      "quantity": [{ // not in 1
          "text": "0"
        },
        {
          "text": "1"
        },
        {
          "text": "2"
        }
      ]
    };

    expect(utils.mergeExtractions(obj1, obj2)).to.deep.equal({
      "name": [{
        "text": "John Kowalski"
      }],
      "address": [{
        "text": "Chicago"
      }],
      "zip": [{
        "text": "2222"
      }],
      "price": [{
        "text": "$12"
      }],
      "quantity": [{
        "text": "0"
      },
      {
        "text": "1"
      },
      {
        "text": "2"
      }
    ]
    });
  });
});