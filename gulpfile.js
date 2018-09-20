var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src(['test/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000
    }));
});

gulp.task('deploy', function () {
  return gulp.src('./lib/utils.js')
    .pipe(gulp.dest('./public/'));
})