/*eslint no-console: "off"*/

const babel    = require('gulp-babel');
const builder  = require('electron-builder');
const del      = require('del');
const gulp     = require('gulp');
const merge    = require('merge-stream');
const sass     = require('gulp-sass');
const { exec } = require('child_process');

function clean() {
    return del([ 'build/', 'dist/', '.gulp-scss-cache/', '**/*.log' ]);
}

function compile() {
    return gulp
        .src(['src/**/*.js', 'src/**/*.jsx'])
        .pipe(babel())
        .pipe(gulp.dest('build'));
}

function coverage() {
    return Promise.resolve(true);
}

function processCSS() {
    const compileMainCSS = gulp
        .src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build'));

    const copyPaperCSS = gulp
        .src('../../node_modules/paper-css/paper.css')
        .pipe(gulp.dest('build/css'));

    return merge(compileMainCSS, copyPaperCSS);
}

function processHTML() {
    return gulp
        .src('src/**/*.html')
        .pipe(gulp.dest('build'));
}

function processIcon() {
    return gulp
        .src('../../resources/icon.png')
        .pipe(gulp.dest('build'));
}

function processLogo() {
    return gulp
        .src('../../resources/logo.png')
        .pipe(gulp.dest('build'));
}

function processResources(callback) {
    return gulp.series(processCSS, processHTML, processIcon, processLogo)(callback);
}

function pack() {
    const targets = new Map([
        [builder.Platform.WINDOWS, new Map([
            [builder.Arch.ia32, ['portable']],
            [builder.Arch.x64 , ['portable']]
        ])],
        [builder.Platform.LINUX, new Map([
            [builder.Arch.ia32, ['tar.gz']],
            [builder.Arch.x64 , ['tar.gz']]
        ])]
    ]);

    const config = {
        productName : 'plutonium-app',
        artifactName: '${productName}-${os}-${arch}-${version}.${ext}',
        icon        : 'build/icon.png',
        files       : [
            '!gulpfile.js',
            '!src/',
            'build/**/*'
        ],
        linux       : {
            executableName: 'plutonium-app'
        }
    };

    return builder.build({config, targets}).then(artifacts => {
        return gulp
            .src(artifacts)
            .pipe(gulp.dest('../../dist'));
    });
}

function test() {
    return exec('npx cucumber-js --require test/acceptance/**/*.js --require-module @babel/register test/acceptance/**/*.feature', (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
}

gulp.task('clean'   , gulp.series(clean));
gulp.task('coverage', gulp.series(coverage));
gulp.task('pack'    , gulp.series(clean, compile, processResources, test, pack));
gulp.task('test'    , gulp.series(compile, processResources, test));
