process.env = { CM1_KEY: '423120471f5c355512049b4532b2332f' };

var GoogleChromeExtension = require('./browser/google_chrome/google-chrome-extension');
GoogleChromeExtension.load();

if(/hipmunk/.test(document.location.href)) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.extension.getURL('hipmunk-spy.js'));
  document.head.appendChild(script);
}
