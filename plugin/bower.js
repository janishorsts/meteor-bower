var js = Npm.require('jsonfile'),
	_ = Npm.require('lodash'),
	bower = Npm.require('bower'),
	when = Npm.require('when');


Plugin.registerSourceHandler('meteor-bower.json', function (compileStep) {
	api.versionsFrom('0.9.4');

	var installBowerComponents = function () {
		return when.promise(function (resolve) {
			bower.commands.install().on('end', resolve);
		});
	};

	var writeBowerConfig = function () {
		return when.promise(function (resolve) {
			var config = {directory: '.meteor/local/bower_components'};
			js.writeFile('.bowerrc', config, function () {
				resolve(config);
			});
		});
	};

	var readBowerConfig = function () {
		return when.promise(function (resolve, reject) {
			js.readFile('.bowerrc', function (err, config) {
				if (err && err.errno === 34) {
					writeBowerConfig().done(resolve);
				} else if (err) {
					reject();
				} else {
					var defaults = {directory: 'bower_components'}; // todo default target directory can't be used in meteor
					config = _.defaults(config, defaults);

					resolve(config);
				}
			});
		})
	};

	when.all([readBowerConfig(), installBowerComponents()]).done(function (bowerConfigResolved) {
		var bowerrc = bowerConfigResolved[0];

		js.readFile('meteor-bower.json', function (err, config) {
			if (err && err.errno === 34) {
				js.writeFile('meteor-bower.json', {files:[]});
			} else {
				var defaults = {files: []};
				config = _.defaults(config, defaults);

				var files = _.map(config.files, function (file) {
					return process.cwd() + '/' + bowerrc.directory + '/' + file;
				});

				api.addFiles(files, 'client');
			}
		});
	});
});