var gulp = require('gulp'),
	bump = require('gulp-bump'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('bump', function() {
	return gulp.src(['./package.json'])
	.pipe(bump())
	.pipe(gulp.dest('.'));
});

gulp.task('build', function() {
	return gulp.src([
		'src/**/*.js'
	])

	// Build
	.pipe(concat('deeplink.js'))
	.pipe(gulp.dest('build'))

	// Minify
	.pipe(uglify({ preserveComments: 'some' }))
	.pipe(rename('deeplink.min.js'))
	.pipe(gulp.dest('build'));
});
