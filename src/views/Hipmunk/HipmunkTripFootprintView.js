HipmunkTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
HipmunkTripFootprintView.prototype = new TripFootprintView();

HipmunkTripFootprintView.prototype.isValid = function() {
  return this.tripElement != null;
};

HipmunkTripFootprintView.prototype.loadingText = '<i>Footprinting&hellip;</i>';

HipmunkTripFootprintView.prototype.driverName = function() {
  return 'Hipmunk';
};

HipmunkTripFootprintView.prototype.footprintParent = function() {
  return $('.graph', this.tripElement);
};

HipmunkTripFootprintView.prototype.tripBarElements = function() {
  return $('.graph .box ', this.tripElement);
};

HipmunkTripFootprintView.prototype.leftmostLeg = function() {
  return $('div.airline:first', this.tripElement);
};

HipmunkTripFootprintView.prototype.hasRoomOnLeft = function() {
  if(this.leftmostLeg().css('margin-left').search(/%/) > 0) {  // some browsers use %, some px
    var margin = parseFloat(this.leftmostLeg().css('margin-left').replace(/%/,''));
    return margin >= 12;
  } else {
    var margin = parseFloat(this.leftmostLeg().css('margin-left'));
    return margin >= 110;
  }
};

HipmunkTripFootprintView.prototype.insertFootprintParagraph = function(footprintParagraph) {
  if(this.hasRoomOnLeft())
    this.position = this.positionLeft;
  this.footprintParent().append(footprintParagraph);
};

HipmunkTripFootprintView.prototype.positionLeft = function() {
  var timebox = $('div.timebox:first', this.footprintParent());
  this.footprintParagraph().css('right', timebox.css('right'));
};

HipmunkTripFootprintView.prototype.show = function() {
  this.target().css('visibility','visible');
};
HipmunkTripFootprintView.prototype.hide = function() {
  this.target().css('visibility','hidden');
};