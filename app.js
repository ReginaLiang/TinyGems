function b(url) { // Downloads a binary file and outputs it in the specified callback
    return new Promise((ok, err) => {
      var x = new XMLHttpRequest();
      x.open('GET', url, true);
      x.responseType = 'arraybuffer';
      x.onload = () => { ok(x.response); }
      x.send(null);
    });
  }

  function s(url) { // Downloads a script file and adds it to DOM
    return new Promise((ok, err) => {
      var s = document.createElement('script');
      s.src = url;
      s.onload = () => {
        ok();
      };
      document.body.appendChild(s);
    });
  }

  var Module = {};

function revokeURL(url) {
  // In multithreaded builds, the runtime .js script we are loading will need to be kept alive
  // so that pthread workers can load that same script for each created Worker.
  URL.revokeObjectURL(url)
}

// Depending on the build flags that one uses, different files need to be downloaded
// to load the compiled page. What follows is a matrix of all different combinations that
// affect how code is downloaded. When developing your own shell file, you can copy the whole
// matrix, or just focus on a single/specific set of download schemes to use.












  // No modularize, no streaming wasm compilation, separate .mem init file
  Promise.all([b('TinyGems.js'), b('TinyGems.wasm'), b('TinyGems.mem')]).then((r) => {
    Module.wasm = r[1];
    Module.mem = r[2];
    var url = URL.createObjectURL(new Blob([r[0]], { type: 'application/javascript' }));
    s(url).then(() => { revokeURL(url) });
  });
