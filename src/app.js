var UI = require('ui');

var ajax = require('ajax');

var URL = 'http://fabien.benetou.fr/Site/AllRecentChanges?action=rss';
var pagePrefix = 'http://fabien.benetou.fr/';
// should be configurable

var pages = [];
ajax({url: URL, type: 'data'},
  function(data) {
    // Data is supplied here
    var items = data.split('<item>');
    for (var item in items){
      var pageName = items[item].substring(items[item].indexOf("<link>")+6+pagePrefix.length() ,items[item].indexOf("</link>"));
      pages.push({title: pageName});
      // might prefer to limit to 5 instead of 10-ish
    }
    pages.shift();
    console.log(pages);
  },
  function(error) {
    console.log('Ajax failed: ' + error);
  }
);

var main = new UI.Menu({ sections: [{ title: "Pages:", items: pages }] });

main.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    Pebble.OpenURL(pagePrefix+e.item.title);
});

main.show();