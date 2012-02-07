var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;
require('../../trip-examples');

vows.describe('OrbitzTrip').addBatch({
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var OrbitzTrip = require('drivers/orbitz/orbitz-trip');

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.trip = new OrbitzTrip(0, $('.result').get(0));
  });

  itBehavesLikeA('Trip');
});