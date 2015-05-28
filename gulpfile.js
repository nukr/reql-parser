var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['watch', 'test']);

gulp.task('nodemon', function () {
  nodemon({
    script: 'src/parser.js',
    ext: 'js',
    execMap: {
      js: 'babel-node --stage-0 --optional=runtime'
    }
  })
})
