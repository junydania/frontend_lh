{
    
    // dependencies
    var gulp = require('gulp'),
        vendors = require('./vendors.json'),                // choose vendors to copy
        config = require('./config.json'),                  // config file
        gulpif = require('gulp-if'),                        // conditionally control for pipeline
        rename = require('gulp-rename'),                    // rename
        plumber = require('gulp-plumber'),                  // crash saver
        runSequence = require('run-sequence'),              // gulp tasks in order
        flatten = require('gulp-flatten'),                  // unwrap parent folders
        browserSync = require('browser-sync'),              // server
        reload = browserSync.reload,                        // server reload
        sass = require('gulp-sass'),                        // css preprocessor
        sassGlob = require('gulp-sass-glob'),               // SASS glob
        autoprefixer = require('gulp-autoprefixer'),        // css auto prefix
        cssnano = require('gulp-cssnano'),                  // css compressing
        include = require("gulp-include"),                  // JavaScript including
        uglify = require('gulp-uglify'),                    // JavaScript compressing
        hb = require('gulp-hb'),                            // handlebars
        layouts = require('handlebars-layouts'),            // handlebars templating extention
        pretty = require('gulp-prettify'),                  // pretty html
        htmlmin = require('gulp-htmlmin'),                  // compress html
        del = require('del'),                               // delete
        imagemin = require('gulp-imagemin');                // images compressing


    // paths
    var path = {
        src: {
            data        : 'src/data/**/*.json',
            templates   : 'src/views/pages/*.hbs',
            styles      : 'src/styles/*.scss',
            scripts     : 'src/scripts/*.js',
            images      : 'src/assets/images/**/*.*' ,
            fonts       : 'src/assets/fonts/**/*.*',
            favicons    : 'src/assets/favicons/**/*.*'
        },
        build: {
            templates   : 'build/',
            styles      : 'build/css/',
            scripts     : 'build/js/',
            images      : 'build/images/',
            fonts       : 'build/fonts/',
            favicons    : 'build/favicons/'
        },
        watch: {
            data        : 'src/data/**/*.json',
            templates   : 'src/views/**/*.,hbs',
            styles      : 'src/styles/**/*.scss',
            scripts     : 'src/scripts/**/*.js',
            images      : 'src/assets/images/**/*.*',
            fonts       : 'src/assets/fonts/**/*.*',
            favicons    : 'src/assets/favicons/**/*.*'
        },
        clean       : 'build'
    };


    // templates
    gulp.task('templates', function () {
        return gulp.src(path.src.templates)
            .pipe(plumber())
            .pipe(hb()
                .partials('src/views/main.hbs')
                .partials('src/views/components/1/*.hbs')
                .partials('src/views/components/2/*.hbs')
                .helpers(layouts)
                .data(path.src.data)
            )
            .pipe(rename({ extname: '.html' }))
            .pipe(gulpif(config.prettify_html, pretty()))
            .pipe(gulpif(config.compress_html, htmlmin({collapseWhitespace: true})))
            .pipe(gulp.dest(path.build.templates))
            .pipe(reload({stream: true}));
    });


    // SASS
    gulp.task('styles', function () {
        return gulp.src(path.src.styles)
            .pipe(plumber())
            .pipe(sassGlob())
            .pipe(sass({
                outputStyle: 'expanded',
                includePaths: [
                    "bower_components",
                    "src/styles/components/0",
                    "src/styles/components/1",
                    "src/styles/components/2"
                ]
            }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulpif(config.compress_js_css, cssnano()))
            .pipe(gulp.dest(path.build.styles))
            .pipe(reload({stream: true}));
    });


    // scripts
    gulp.task('scripts', function () {
        return gulp.src(path.src.scripts)
            .pipe(plumber())
            .pipe(include({
                extensions: "js",
                hardFail: true,
                includePaths: [
                    "bower_components",
                    "src/scripts/components"
                ]
            }))
            .pipe(gulpif(config.compress_js_css, uglify()))
            .pipe(gulp.dest(path.build.scripts))
            .pipe(reload({stream: true}));
    });


    // images
    gulp.task('images', function () {
        return gulp.src(path.src.images)
            .pipe(plumber())
            .pipe(flatten())
            .pipe(gulpif(config.compress_img, imagemin()))
            .pipe(gulp.dest(path.build.images))
            .pipe(reload({stream: true}));
    });


    // fonts
    gulp.task('fonts', function () {
        return gulp.src(path.src.fonts)
            .pipe(plumber())
            .pipe(gulp.dest(path.build.fonts))
            .pipe(reload({stream: true}));
    });


    // favicons
    gulp.task('favicons', function () {
        return gulp.src(path.src.favicons)
            .pipe(plumber())
            .pipe(gulp.dest(path.build.favicons))
            .pipe(reload({stream: true}));
    });


    // vendors
    gulp.task('vendors', function () {
        return gulp.src(vendors.vendors, {base: "."})
            .pipe(plumber())
            .pipe(flatten({subPath: 1}))
            .pipe(gulp.dest('build/vendors/'));
    });


    // watcher
    gulp.task('watch', function() {
        gulp.watch(path.watch.data, function() {
            gulp.start('templates');
        });
        gulp.watch(path.watch.templates, function() {
            gulp.start('templates');
        });
        gulp.watch(path.watch.styles, function() {
            gulp.start('styles');
        });
        gulp.watch(path.watch.scripts, function() {
            gulp.start('scripts');
        });
        gulp.watch(path.watch.images, function() {
            gulp.start('images');
        });
        gulp.watch(path.watch.fonts, function() {
            gulp.start('fonts');
        });
        gulp.watch(path.watch.favicons, function() {
            gulp.start('favicons');
        });
    });


    // server
    gulp.task('webserver', function () {
        browserSync({
            server: {
                baseDir: "build"
            },
            tunnel: false,
            host: 'localhost',
            port: 9000,
            notify: false,
            open: config.open_browser
        });
    });


    // clean
    gulp.task('clean', function () {
        return del(path.clean);
    });


    // build
    gulp.task('build',[
        'templates',
        'styles',
        'scripts',
        'fonts',
        'images',
        'favicons',
        'vendors'
    ]);


    // default
    gulp.task('default', function() {
        runSequence( 'clean', 'build', 'webserver', 'watch');
    });
}