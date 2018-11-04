(function() {
  var path = location.pathname.replace(/[^\/]+$/, '');
  window.djConfig = {
    async: true,
    parseOnLoad: false,
    isDebug: 1, // dev only!
    packages: [{
      name: 'config',
      location: location.pathname.replace(/[^\/]+$/, '') + 'config'
    }, {
      name: 'images',
      location: location.pathname.replace(/[^\/]+$/, '') + 'images'
    }, {
      name: 'js',
      location: location.pathname.replace(/[^\/]+$/, '') + 'js'
    }, {
      name: 'services',
      location: location.pathname.replace(/[^\/]+$/, '') + 'services'
    }, {
      name: 'widgets',
      location: location.pathname.replace(/[^\/]+$/, '') + 'js/widgets'
    }]
  };
})(window);