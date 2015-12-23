var UI = require('ui');

var ajax = require('ajax');

var URL = 'http://fabien.benetou.fr/Site/AllRecentChanges?action=rss';
var pagePrefix = 'http://fabien.benetou.fr/';
// should be configurable

var pages = [];
var pageName = "";

var card = new UI.Card({
  title:"Fabien's PIM",
  subtitle:'Fetching the last 10 edited pages...'
});

ajax({url: URL, type: 'data'},
  function(data) {
    // Data is supplied here
    var items = data.split('<item>');
    for (var item in items){
      pageName = items[item].substring(items[item].indexOf("<link>")+6+pagePrefix.length ,items[item].indexOf("</link>"));
      console.log(pageName);
      pages.push({title: pageName});
      // might prefer to limit to 5 instead of 10-ish
    }
    pages.shift();
    var main = new UI.Menu({ sections: [{ title: "Pages:", items: pages }] });
    main.show();
    card.hide();
        
    main.on('select', function(e) {
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
        Pebble.openURL(pagePrefix+e.item.title);
      // appends return_to to the URL
    });
  },
  function(error) {
    console.log('Ajax failed: ' + error);
  }
);

// Display the Card
card.show();