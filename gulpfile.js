var gulp = require('gulp');

gulp.task('do-something', function() {
  console.log(arguments);
  console.log('I did something!');
});

gulp.task('sass', function(){
  // node-sass src/scss/main.scss -o src/css/
  var sass = require('gulp-sass');

  gulp.src('src/scss/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css/'))
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gulp.dest('dist/css/'))
}); //END gulp.task(sass)


var browserSync = require('browser-sync').create();

gulp.task('serve', [ 'sass' ], function(){
  browserSync.init({
    server: "./src"

  });
  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
  gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('watch:sass', function(){
  gulp.watch('src/scss/*.scss', [ 'sass' ], function(){
    console.log('In your Sass files...', 'Building your CSS');
  });
  gulp.watch('src/*.html', [ 'build' ]);
})

gulp.task('clean', function(done){
  var del = require('del');

  del([
    'dist/**/*.*',
    'dist/**/.*',
    '!dist/.gitignore'
  ], done);
})

gulp.task('build', [ 'clean', 'sass' ], function(){
  gulp.src(['src/*', '!src/scss'])
  //gulp.from()
  .pipe(gulp.dest('dist/')); //gulp.into()
});
