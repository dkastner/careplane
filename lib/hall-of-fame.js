var HallOfFame = function() {
  this.trips = {};
  this.count = 0;
};

HallOfFame.prototype.clear = function() {
  this.trips = {};
  this.count = 0;
  this.scale = null;
};

HallOfFame.prototype.induct = function(trip) {
  if(!this.trips[trip.id]) {
    this.trips[trip.id] = trip;
    this.count++;
    this.updateRatingScale();
  }
};

HallOfFame.prototype.cleanest = function() {
  var minFootprint = 0;
  for(var i in this.trips) {
    var footprint = this.trips[i].roundedTotalFootprint();
    if(minFootprint === 0) {
      minFootprint = footprint;
    } else {
      minFootprint = Math.min(minFootprint, footprint);
    }
  }
  return minFootprint;
};

HallOfFame.prototype.dirtiest = function() {
  var maxFootprint = 0;
  for(var i in this.trips) {
    maxFootprint = Math.max(maxFootprint, this.trips[i].roundedTotalFootprint());
  }
  return maxFootprint;
};

HallOfFame.prototype.average = function() {
  if(this.count === 0) {
    return 0;
  } else {
    var totalFootprint = 0;
    for(var i in this.trips) {
      totalFootprint += this.trips[i].roundedTotalFootprint();
    }
    return totalFootprint / this.count;
  }
};

HallOfFame.prototype.updateRatingScale = function() {
  var min = this.cleanest();
  var max = this.dirtiest();
  var avg = this.average();

  if(min == max) {
    this.scale = null;
  } else {
    var minDifference = avg - min;
    var maxDifference = max - avg;
    this.scale = {};

    for(var i in this.trips) {
      var trip = this.trips[i];
      var tripDifference = avg - trip.roundedTotalFootprint();

      var rating = 0;
      if(trip.roundedTotalFootprint() > avg)
        rating = tripDifference / maxDifference;
      else if(trip.totalFootprint < avg)
        rating = tripDifference / minDifference;

      this.scale[trip.roundedTotalFootprint()] = rating;
    }
  }
};

HallOfFame.prototype.ratingFor = function(trip) {
  if(this.scale) {
    return this.scale[trip.roundedTotalFootprint()];
  } else {
    return 0;
  }
};

module.exports = HallOfFame;
