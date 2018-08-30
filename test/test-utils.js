var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var fs = require('fs');
var vm = require('vm');
var path = './utils.js';
var code = fs.readFileSync(path);

class importContext{
  constructor() {
    this.memory = {};
  }

  createData(data) {
    return data;
  }

  return(data)
  {
    return data;
  }
};

describe('utils.js', function () {
  jsdom();

  before(function () {
    vm.runInThisContext(code);
  });

  it('should load', function () {
    var utils = new window.__Utils(this);
    expect(utils.loaded).to.equal(true);

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