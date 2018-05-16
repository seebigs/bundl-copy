/**
 * Copy files extension for Bundl
 */

var path = require('path');
var utils = require('seebigs-utils');


module.exports = function (options) {
    options = options || {};

    if (typeof options === 'string') {
        options = {
            dest: options
        };
    }

    if (!options.dest) {
        throw new Error('bundl-copy requires a destination');
    }

    options.dest = path.resolve(options.dest);
    options.basedir = options.basedir ? path.resolve(options.basedir) : process.cwd();

    function copy (srcFiles, done) {
        var bundl = this;
        var copied = 0;

        function afterCopied () {
            if (++copied >= srcFiles.length) {
                done();
            }
        }

        function logIfVerbose (src, outfile) {
            if (options.verbose) {
                bundl.log('Duplicating ' + src + ' to ' + outfile);
            }
        }

        utils.each(srcFiles, function (src) {
            var filename = src.split('/').pop();
            var ext = filename.split('.').pop();
            var outfile;

            if (typeof options.filter === 'function' && !options.filter(ext, filename, src)) {
                afterCopied();
                return;
            }

            if (options.flatten) {
                outfile = options.dest + '/' + filename;
                logIfVerbose(src, outfile);
                utils.writeFile(outfile, utils.readFile(src), afterCopied);
            } else {
                outfile = src.replace(options.basedir, options.dest);
                logIfVerbose(src, outfile);
                utils.writeFile(outfile, utils.readFile(src), afterCopied);
            }
        });
    }

    return {
        name: 'copy',
        stage: 'src',
        exec: copy,
    };

};
