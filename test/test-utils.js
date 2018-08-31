var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var fs = require('fs');
var vm = require('vm');
var path = './utils.js';
var code = fs.readFileSync(path);

class importContext {
  constructor() {
    this.memory = {};
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

  before(function () {
    vm.runInThisContext(code.toString());
  });

  it('should load', function () {
    var utils = new window.__Utils(this);
    expect(utils.loaded).to.equal(true);
  });

  it('endEx works', () => {
    var utils = new window.__Utils(new importContext());
    // return both authentication and failure message
    expect(utils.endEx('AUTH_SUCCESS', 'INVALID_URL')).to.deep.equal({
      auth_status: "SUCCESS",
      auth_message: " ",
      status: "FAILURE",
      message: "URL is invalid."
    });

    utils = new window.__Utils(new importContext());
    // return both only authentication failure
    expect(utils.endEx(null, null, 'Failure message')).to.deep.equal({
      auth_status: "FAILURE",
      auth_message: 'Failure message',
      status: "FAILURE",
      message: " "
    });

    utils = new window.__Utils(new importContext());
    // return only failure message (no auth)
    expect(utils.endEx(null, 'INVALID_URL')).to.deep.equal({
      status: "FAILURE",
      message: "URL is invalid."
    });

    // return console.log when given invalid args
    const temp = console.log;
    console.log = (x => x);

    utils = new window.__Utils(new importContext());
    // handle invalid ObjectIds
    expect(utils.endEx(null, null)).to.equal('authObjId or statusObjId do not match any known status.');
    expect(utils.endEx('InvalidObjId', 'INVALID_URL')).to.equal('authObjId or statusObjId do not match any known status.');
    expect(utils.endEx('AUTH_SUCCESS', 'InvalidObjId')).to.equal('authObjId or statusObjId do not match any known status.');
    expect(utils.endEx('InvalidObjId', 'InvalidObjId')).to.equal('authObjId or statusObjId do not match any known status.');
    
    // restore console.log
    console.log = temp; 
  });

  it('delay works', () => {
    var utils = new window.__Utils(this);
    let start = new Date();
    return utils.delay(1000).then(() => {
      expect(new Date().getTime() - start.getTime()).to.be.gte(1000);
    });
  });

  it('checking timeframes works', () => {
    var utils = new window.__Utils(new importContext());

    expect(utils.checkTimeframes(["1231231231"])).to.not.equal(true); // two timeframes in array required
    expect(utils.checkTimeframes(["1231231231", "1000000000"])).to.not.equal(true); // first can't be greater then the second
    expect(utils.checkTimeframes(["1231231231", "1231231235"])).to.equal(true); // valid test case
    expect(utils.checkTimeframes(["1231231", "1231123231235"])).to.not.equal(true); // 10 digits
    expect(utils.checkTimeframes(["9999999998", "9999999999"])).to.not.equal(true); // first timeframe can't be in the future

  });
})