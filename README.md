# bundl-copy

*Copy matched src files into another directory*

*Runs with the amazing [Bundl](https://github.com/seebigs/bundl) build tool*

## Install

```
$ npm install --save-dev bundl-copy
```

## Use

```js
var bundl = require('bundl');
var copy = require('bundl-copy');

var options = {
    dest: 'dist/public',
    flatten: true
};

bundl(targets)
    .then(copy(options))
    .go();
```

## Setting the destination path (required)

This can be done by simply passing a string into the copy plugin
```js
copy('dist/public')
```

Or, if more options are needed, it can be set as a member of the options object
```js
copy({ dest: 'dist/public' })
```

## Options

### basedir
By default, copied files maintain their original paths relative to `basedir` when copied into the `dest` folder. If basedir is not specified, `process.cwd()` will be used.
```js
{
    basedir: 'src/stylesheets'
}
```

### filter
If provided, this Function will be used to filter which files should be copied. Returning `true` allows the current file to be copied. Returning `false` skips the current file.
```js
{
    filter: function (extName, fileName, srcPath) {
        if (extName === 'css' && fileName.indexOf('_private') === -1) {
            return true;
        }
    }
}
```

### flatten
Setting `flatten` to true will cause all matched files to be copied into the root of `dest` (`basedir` will be ignored).
```js
{
    flatten: true
}
```
