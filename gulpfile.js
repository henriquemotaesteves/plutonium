/*eslint no-console: "off"*/

const del          = require('del');
const eslint       = require('gulp-eslint');
const gulp         = require('gulp');
const htmllint     = require('gulp-htmllint');
const path         = require('path');
const sassLint     = require('gulp-sass-lint');
const { execSync } = require('child_process');

const PACKAGES = [
    'packages/plutonium-core',
    'packages/plutonium-app'
];

function clean() {
    return runTaskForEachPackage('clean').then(del('dist'));
}

function coverage() {
    return runTaskForEachPackage('coverage');
}

function lintHTML() {
    return gulp
        .src(['packages/**/*.html', '!packages/**/build/**/*.html', '!packages/**/coverage/**/*.html', '!packages/**/dist/**/*.html', ])
        .pipe(htmllint({ failOnError: true }));
}

function lintJavaScript() {
    return gulp
        .src(['packages/**/*.js', '!packages/**/node_modules/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function lintSass() {
    return gulp
        .src(['packages/**/*.scss'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
}

function pack() {
    return runTaskForEachPackage('pack');
}

function runTaskForEachPackage(task) {
    return new Promise((resolve, reject) => {
        try {
            PACKAGES.forEach(package => {
                console.log(`Starting '${task}' on '${package}'`)
                console.log(execSync(`npx gulp --cwd ${package} ${task}`).toString('utf8'));
                console.log(`Finished '${task}' on '${package}'`)
            });

            resolve();
        } catch (ex) {
            reject(ex);
        }
    });
}

function test() {
    return runTaskForEachPackage('test');
}

gulp.task('clean'   , gulp.series(clean));
gulp.task('coverage', gulp.series(coverage));
gulp.task('pack'    , gulp.series(pack));
gulp.task('lint'    , gulp.series(lintHTML, lintJavaScript, lintSass));
gulp.task('test'    , gulp.series(test));
