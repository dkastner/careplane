var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var fakeweb = require('fakeweb'),
    http = require('http');

sharedExamplesFor('AirTrafficController', function() {
  beforeEach(function() {
    http.register_intercept({
      uri: '/flights.json',
      host: 'impact.brighterplanet.com',
      body: JSON.stringify({ decisions: { carbon: { object: { value: 234 }}}})
    });
  });

  afterEach(function() { http.clear_intercepts(); });

  '#discoverTrips, #scoreTrips, #rateTrips': {
    'discovers, scores, and rates each trip, provides methodologies, and calls searchEmissionsComplete': function() {
      var searchEmissionsComplete = jasmine.createSpy('searchEmissionsComplete');
      this.controller.events.searchEmissionsComplete = searchEmissionsComplete;
      this.controller.discoverTrips();

      var numTrips = this.controller.trips.length;
      expect(this.controller.tripCount).toBeGreaterThan(0);
      expect(this.controller.tripCount).toBe(numTrips);
      this.controller.trips.forEach(function(trip) {
        expect(trip.isScorable).toBeTruthy();
      });

      this.controller.scoreTrips();
      this.controller.trips.forEach(function(trip) {
        expect(trip.isScorable).toBeFalsy();
      });

      this.controller.rateTrips();

      for(var i in this.controller.trips) {
        var p = this.controller.trips[i].footprintView.footprintParagraph();
        expect(p).toHaveText(/[\d,]+/);

        var div = this.controller.trips[i].infoView.target();
        expect($(div).find('.careplane-methodologies li a').length).toBeGreaterThan(0);
        $(div).find('.careplane-methodologies li a').each(function(i, a) {
          expect($(a)).toHaveText(/[A-Z]{3}-[A-Z]{3}/);
        });

        expect($(div).find('p.careplane-search-average-comparison')).toHaveText(/impact/);
      }

      expect(searchEmissionsComplete).toHaveBeenCalled();
    });
  });
});