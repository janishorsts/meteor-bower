Package.describe({
  name: 'ianhorst:bower',
  summary: 'Meteor bower [EXPERIMENTAL]',
  version: '0.0.1',
  git: 'https://github.com/ianhorst/meteor-bower.git'
});

Package.registerBuildPlugin({
  name: "bower",
  use: [],
  sources: [
    'plugin/bower.js'
  ],
  npmDependencies: {
    'bower': '1.3.12',
    'lodash': '2.4.1',
    'jsonfile': '2.0.0',
    'when': '3.5.0'
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
});