Package.describe({
  name: 'ianhorst:bower',
  summary: 'Meteor bower [EXPERIMENTAL]',
  version: '0.0.2',
  git: 'https://github.com/ianhorst/meteor-bower.git'
});

Package.registerBuildPlugin({
  name: "bower",
  use: [
    "meteor",
    "underscore"
  ],
  sources: [
    'plugin/bower.js'
  ],
  npmDependencies: {
    'bower': '1.3.12',
    'jsonfile': '2.0.0'
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
});