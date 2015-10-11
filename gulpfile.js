'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps'),
		wiredep = require('wiredep').stream,
		useref = require('gulp-useref'),
		gulpif = require('gulp-if'),
		uglify = require('gulp-uglify'),
		minifyCss = require('gulp-minify-css'),
		del = require('del')
;

// Scss task
gulp.task('sass', function() {
	return gulp.src('./app/scss/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./app/css'))
		;
});

// Foundation CSS task
gulp.task('sass-zf', function() {
	return gulp.src('./app/bower_components/foundation/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/css'))
		;
});

// Bower task
gulp.task('bower', function() {
	return gulp.src('./app/*.html')
		.pipe(wiredep({
			exclude: ['./app/bower_components/modernizr/dist/modernizr-build.js']
		}))
		.pipe(gulp.dest('./app'))
		;
});

// Useref task
gulp.task('useref', function() {
	var assets = useref.assets();

	return gulp.src('./app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('./dist'))
		;
});

// Delete files task
gulp.task('del', function() {
	return del('./dist/**');
});

// Build task
gulp.task('build', ['del', 'useref']);