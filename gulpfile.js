const gulp = require('gulp');
const del = require('del');

const pkg = require('./package.json');
const dirs = pkg['wf-build-config'].directories;

gulp.task('copy:index.html', () => {

	return gulp.src(`${dirs.src}/index.html`)
		.pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:normalize.css', () => {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(gulp.dest(`${dirs.dist}/css`));
});

gulp.task('copy:js', () => {
	return gulp.src(`${dirs.src}/js/app.js`)
		.pipe(gulp.dest(`${dirs.dist}/js`));
});

gulp.task('copy:style', () => {
	return gulp.src(`${dirs.src}/css/app.css`)
		.pipe(gulp.dest(`${dirs.dist}/css`));
});



gulp.task('clean', (done) => {
	del([
		dirs.dist
	]).then(() => {
		done();
	});
});

gulp.task('copy', gulp.series('clean',
		'copy:normalize.css',
		'copy:js',
		'copy:style',
		'copy:index.html',
	)
);

gulp.task('build', gulp.series(
	'copy'
));


gulp.task('default', gulp.series('build'));