Npm.depends({
  'bower': '1.3.12',
  'lodash': '2.4.1',
  'jsonfile': '2.0.0',
  'when': '3.5.0'
});

Package.describe({
  name: 'ianhorst:bower',
  summary: 'Meteor bower [EXPERIMENTAL]',
  version: '0.0.1',
  git: 'git://github.com/ianhorst/meteor-bower.git'
});

Package.onUse(function(api) {
  var js = Npm.require('jsonfile'),
      _ = Npm.require('lodash'),
      bower = Npm.require('bower'),
      when = Npm.require('when');

  api.versionsFrom('0.9.4');

  var installBowerComponents = function () {
    return when.promise(function (resolve) {
      bower.commands.install().on('end', resolve);
    });
  };

  var readBowerConfig = function () {
    return when.promise(function (resolve) {
      js.readFile('.bowerrc', function (err, config) {
        var defaults = {directory: 'bower_components'};
        config = _.defaults(config || {}, defaults);

        resolve(config);
      });
    })
  };

  when.all([readBowerConfig(), installBowerComponents()]).done(function (bowerConfigResolved) {
    var bowerrc = bowerConfigResolved[0];

    js.readFile('meteor-bower.json', function (err, config) {
      var defaults = {files: []};
      config = _.defaults(config, defaults);

      var files = _.map(config.files, function (file) {
        return process.cwd() + '/' + bowerrc.directory + '/' + file;
      });

      api.addFiles(files, 'client');
    });
  });
});

Package.onTest(function(api) {
  api.use('tinytest');
});