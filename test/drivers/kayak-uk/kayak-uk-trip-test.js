var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;
require('../../trip-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

vows.describe('KayakUkTrip').addBatch({
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var KayakUKTrip = require('drivers/kayak-uk/kayak-uk-trip');

  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    http.register_intercept({
      uri: /\/s\/run\/inlineDetails\/flight.*/,
      host: 'www.kayak.co.uk',
      body: JSON.stringify({ message: kayakFlightDetails })
    });
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakUKTrip('818', $('.flightresult').get(0));
    this.trip.init();
  });

  afterEach(function() { http.clear_intercepts(); });

  itBehavesLikeA('Trip');
});