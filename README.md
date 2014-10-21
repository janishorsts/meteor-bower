meteor-bower
============


Installing
----------

```shell
$ meteor add ianhorst:bower
```

Bower
-----

Use bower as usual. For example, to install Zurb Foundation

```shell
$ bower install foundation --save
```

Adding files to meteor project
------------------------------

By default bower components are installed into .meteor/local/bower_components directory. Target directory can be changed by modifying .bowerrc file in the root of the project.

Modify meteor-bower.json to add files to your project.

```json
{
  "files": [
    "foundation/js/foundation.js"
  ]
}
```
