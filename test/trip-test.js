var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('Trip').addBatch({
  var Trip = require('trip');

  '.events': {
    '.flightEmissionsComplete': {
      var trip, flightEmissionsComplete, onTripEmissionsComplete, callback;
      beforeEach(function() {
        trip = new Trip();
        trip.flights = [];
        onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
        callback = jasmine.createSpy('callback');
        flightEmissionsComplete = Trip.events.
          flightEmissionsComplete(trip, callback, onTripEmissionsComplete);
      });

      "tallies the flight's footprint": function() {
        spyOn(trip, 'tallyFootprint');
        flightEmissionsComplete(null, { carbon: 1 });
        expect(trip.tallyFootprint).toHaveBeenCalledWith(1);
      });
      'calls the provided callback function': function() {
        var flight = jasmine.createSpy('Flight');
        var response = { carbon: 1, subject: flight };

        flightEmissionsComplete(null, response);

        expect(callback).toHaveBeenCalledWith(trip, response);
      });
      'executes the onTripEmissionsComplete function when all flights are ready': function() {
        trip.isDone = function() { return true; };
        flightEmissionsComplete(null, { carbon: 1 });
        expect(onTripEmissionsComplete).toHaveBeenCalled();
      });
    });
  });

  '#score': {
    'sets isScorable to false': function() {
      var trip = new Trip();
      trip.flights = [];
      trip.score(function() {}, function() {});
      expect(trip.isScorable).toBeFalsy();
    });
  });
  '#rate': {
    'sets the rating': function() {
      var trip = new Trip();
      trip.rate(0.8);
      expect(trip.rating).toBe(0.8);
    });
  });
});