'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps'),
		wiredep = require('wiredep').stream
;

// Scss task
gulp.task('sass', function() {
	return gulp.src('./app/scss/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename({
			suffix: '.min'
		}))
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