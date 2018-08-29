var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var fs = require('fs');
var vm = require('vm');
var path = './utils.js';
var code = fs.readFileSync(path);

describe('utils.js', function () {
  jsdom();

  before(function () {
    vm.runInThisContext(code);
  });
  
  it('should load', function () {
    var utils = new window.__Utils(this);
    expect(utils.loaded).to.equal(true);
  });
})