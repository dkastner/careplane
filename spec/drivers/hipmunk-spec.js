require('../driver-examples');

describe('Hipmunk', function() {
  var Hipmunk = require('drivers/hipmunk');

  beforeEach(function() {
    this.driverClass = Hipmunk;
  });

  it('has a .driverName', function() {
    expect(Hipmunk.driverName).toBe('Hipmunk');
  });

  itBehavesLikeA('polling Driver');
});
