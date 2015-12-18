
module.exports = function(druck) {

  druck.init({
    source: 'pages',
    dest: 'dist',
    templates: 'templates'
  });


  // grep for files

  var allPages = druck.files('**/*.md');

  // filter published / unpublished posts

  var published = allPages.filter(function(p) { return !p.draft; }),
      unpublished = allPages.filter(function(p) { return p.draft; });

  // extract tags

  // guess what, you can use actuall javascript to do it!
  // use the same approach to create categories, tocs, ... in your application
  var tagged = {};

  allPages.forEach(function(p) {
    (p.tags || []).forEach(function(tag) {
      var t = tagged[tag] = (tagged[tag] || { tag: tag, items: [] });
      t.items.push(p);
    });
  });

  // index.html

  druck.generate({
    source: 'index.html',
    dest: 'index.html'
  });


  // other pages

  druck.generate({
    source: allPages,
    dest: ':name.html'
  });

};