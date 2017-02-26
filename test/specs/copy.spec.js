
var copy = require('../../index.js');
var path = require('path');
var utils = require('seebigs-utils');

describe('', function (expect, done) {
    utils.cleanDir('test/_out');

    var srcFile = utils.readFile(path.resolve('test/_fixture/sub/_a1.js'));
    var srcFiles = [
        path.resolve('test/_fixture/sub/_a1.js'),
        path.resolve('test/_fixture/_a2.js'),
        path.resolve('test/_fixture/_b1.js')
    ];

    var c = copy({
        dest: 'test/_out',
        flatten: true,
        filter: function (ext, filename) {
            return filename.indexOf('_a') === 0;
        }
    });

    c.all({}, srcFiles, function () {
        var destFile = utils.readFile(path.resolve('test/_out/_a1.js'));
        expect(destFile).toBe(srcFile);
        done();
    });
});
