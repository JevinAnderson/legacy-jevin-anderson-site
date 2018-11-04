(function() {
  var path = location.pathname.replace(/[^\/]+$/, '');
  window.djConfig = {
    async: true,
    parseOnLoad: false,
    isDebug: 1, // dev only!
    packages: [{
      name: 'config',
      location: path + 'config'
    }, {
      name: 'images',
      location: path + 'images'
    }, {
      name: 'audio',
      location: path + 'audio'
    }, {
      name: 'js',
      location: path + 'js'
    }, {
      name: 'services',
      location: path + 'services'
    }, {
      name: 'widgets',
      location: path + 'js/widgets'
    }, {
      name: 'bootstrap',
      location: path + 'js/lib/Dojo-Bootstrap'
    }, {
      name: 'xstyle',
      location: path + 'js/lib/xstyle'
    }]
  };
})(window);