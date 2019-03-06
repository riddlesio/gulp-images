const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');

/**
 * Gulp task for CSS compilation using PostCSS
 * @param  {Function} read      A factory function provided by the super task which
 *                              can be used to provide additional pipes up front
 *                              (eg. error catching).
 *                              This function should return a stream when passed a source.
 * @param  {Function} write     A function through which a stream can be piped in order
 *                              to write its contents to a predefined destination.
 * @param  {Object}   config    The plugin configuration as described in README.md.
 * @return {Function}           A function which executes the gulp task when called
 *                              and returns a gulp stream.
 */
const task = (read, write, config) => () => {

    const dest = Array.isArray(config.dest) ? config.dest : [config.dest];
    const source$ = read(config.src);

    const $s = dest.map(destinationPath => source$
        .pipe(changed(destinationPath))
        .pipe(imagemin())
        .pipe(write(destinationPath))
    );

    return merge.apply(null, $s);
};

module.exports = task;
