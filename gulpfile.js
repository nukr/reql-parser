var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['nodemon']);

gulp.task('nodemon', function () {
  nodemon({
    script: 'parser.js',
    ext: 'js',
    execMap: {
      js: 'babel-node --stage-0 --optional=runtime'
    }
  })
})
