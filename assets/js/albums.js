// "Albums Of The Week" on the About page, from Last.fm.
//
// Replaces the old jQuery/JSONP implementation. JSONP executed whatever script
// the remote host returned, and the response was injected as raw HTML; this
// version uses fetch() + JSON, builds DOM nodes with textContent, and only
// accepts links/images from known Last.fm origins.
(function () {
  var section = document.querySelector('[data-albums]');
  var slots = document.querySelectorAll('[data-album]');
  if (!section || !slots.length || typeof fetch !== 'function') return;

  // Last.fm API keys are public by design (they identify the app, not the user).
  var API = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums' +
    '&user=aarich21&period=7day&limit=' + slots.length +
    '&api_key=0cccb1a2aebc9cd70e27d1164726192c&format=json';

  var LINK_RE = /^https:\/\/www\.last\.fm\//;
  var IMAGE_RE = /^https:\/\/(lastfm(-img)?\.freetls\.fastly\.net|lastfm-img2\.akamaized\.net)\//;

  function safeUrl(value, re) {
    return typeof value === 'string' && re.test(value) ? value : null;
  }

  function link(href, child) {
    if (!href) return child;
    var a = document.createElement('a');
    a.href = href;
    a.rel = 'noopener';
    a.appendChild(child);
    return a;
  }

  function render(albums) {
    var rendered = 0;
    slots.forEach(function (slot, i) {
      var album = albums[i];
      if (!album || !album.name) return;

      var albumUrl = safeUrl(album.url, LINK_RE);
      var artist = album.artist || {};
      var image = Array.isArray(album.image) ? album.image[album.image.length - 1] : null;
      var imageUrl = image && safeUrl(image['#text'], IMAGE_RE);

      if (imageUrl) {
        var img = document.createElement('img');
        img.src = imageUrl;
        img.alt = album.name + ' cover art';
        img.width = 300;
        img.height = 300;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.className = 'w-100 ba b--black-10';
        slot.querySelector('.album-art').appendChild(link(albumUrl, img));
      }

      slot.querySelector('.album-name')
        .appendChild(link(albumUrl, document.createTextNode(album.name)));

      if (artist.name) {
        var by = slot.querySelector('.album-artist');
        by.appendChild(document.createTextNode('by '));
        by.appendChild(link(safeUrl(artist.url, LINK_RE), document.createTextNode(artist.name)));
      }
      rendered++;
    });
    if (rendered) section.hidden = false;
  }

  fetch(API)
    .then(function (res) { return res.ok ? res.json() : Promise.reject(new Error('HTTP ' + res.status)); })
    .then(function (data) {
      var albums = data && data.topalbums && data.topalbums.album;
      if (Array.isArray(albums)) render(albums);
    })
    .catch(function () { /* leave the section hidden */ });
})();
