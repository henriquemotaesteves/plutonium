/*eslint no-console: "off"*/

const babel    = require('gulp-babel');
const del      = require('del');
const gulp     = require('gulp');
const mocha    = require('gulp-mocha');
const npm      = require('npm');
const vinyl    = require('vinyl-paths');
const { exec } = require('child_process');

function clean() {
    return del([ 'dist', '*.tgz' ]);
}

function compile() {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/@plutonium/core'));
}

function coverage() {
    process.env.NODE_ENV = 'test';

    return exec('npx nyc npx mocha', (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
}

function pack() {
    return new Promise(resolve => {
        npm.load((error, npm) => {
            npm.commands.pack(() => resolve());
        });
    }).then(() => {
        return gulp
            .src('*.tgz')
            .pipe(vinyl(del))
            .pipe(gulp.dest('../../dist'));
    });
}

function test() {
    return gulp
        .src('test/**/*.js')
        .pipe(mocha({
            require: '@babel/register'
        }));
}

gulp.task('clean'   , gulp.series(clean));
gulp.task('coverage', gulp.series(coverage));
gulp.task('pack'    , gulp.series(clean, compile, test, pack));
gulp.task('test'    , gulp.series(compile, test));
