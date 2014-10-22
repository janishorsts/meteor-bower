var js  = Npm.require('jsonfile'),
	bower = Npm.require('bower'),
	fs    = Npm.require('fs'),
	path  = Npm.require('path');


var readBowerConfig = function () {
	var result = js.readFileSync('.bowerrc', {throws: false});

	if (!result) {
		result = {directory: '.meteor/local/bower_components'};
		js.writeFileSync('.bowerrc', result);
	}

	return result;
};

var readMeteorBowerConfig = function () {
	var result = js.readFileSync('meteor-bower.json', {throws: false});
	if (!result) {
		result = {files: []};
		js.writeFileSync('meteor-bower.json', result);
	}
	return result;
};

var installBowerComponents  = Meteor.wrapAsync(function(bowerrc) {
	argsArray = _.toArray(arguments);
	var callback = argsArray.pop();
	bower.commands.install(null, null, bowerrc)
		.on('end', function(res) { callback(null, res); })
		.on('error', function(err) { callback(err, null); });
});

var handler = function (compileStep) {
	console.log('handle now');
	var bowerrc = readBowerConfig();

	installBowerComponents(bowerrc);

	var config = readMeteorBowerConfig();

	config.files.forEach(function (file) {
		var sourcePath = path.join(process.cwd(), bowerrc.directory, file);

		jsSource = fs.readFileSync(sourcePath);
		var targetPath = path.join('packages/bower_components', file);
		console.log('adding %s as %s', sourcePath, targetPath);
		compileStep.addJavaScript({
			path: targetPath,
			sourcePath: sourcePath,
			data: jsSource.toString(),
			bare: true
		});
	});
};

Plugin.registerSourceHandler('json', function () {});
Plugin.registerSourceHandler('meteor-bower.json', {archMatching: "web"}, handler);