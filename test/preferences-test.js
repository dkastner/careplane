var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('Preferences').addBatch({
  var Preferences = require('preferences');

  var preferences;
  beforeEach(function() {
    preferences = new Preferences();
    preferences.callbacks = [];
  });

  '#get': {
    'provides an existing preference to a given callback': function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId]('awesome'); };
      var result;
      preferences.get('foo', function(val) { result = val; }, 'lame');
      expect(result).toBe('awesome');
    });
    'sends null to the callback if the preference is not set': function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](null); };
      var result;
      preferences.get('foo', function(val) { result = val; });
      expect(result).toBeNull();
    });
  });
  '#getBoolean': {
    'provides an existing preference to a given callback': function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](true); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; }, 'lame');
      expect(result).toBeTruthy();
    });
    'provides an false preference to a given callback': function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](false); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; }, 'lame');
      expect(result).toBeFalsy();
    });
    'sends false to the callback if the preference is not set': function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](null); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; });
      expect(result).toBeFalsy()
    });
  });
});
