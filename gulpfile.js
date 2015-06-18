var gulp = require('gulp'),
    useref= require('gulp-useref'),
    sass = require('gulp-sass');



gulp.task('do-something', function() {
  console.log(arguments);
  console.log('I did something!');
});

gulp.task('sass', function(){
  // node-sass src/scss/main.scss -o src/css/

  gulp.src('src/scss/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css/'))
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gulp.dest('dist/css/'))
}); //END gulp.task(sass)


var browserSync = require('browser-sync').create();

gulp.task('serve', [ 'sass' ], function(){
  browserSync.init({
    server: "./src",
    routes: {
      '/bower_components': 'bower_components'
    }

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
    'dist/*.*',
    'dist/*',
    '!dist/.gitignore'
  ], done);
})

gulp.task('build', [ 'clean', 'sass' ], function(){
  var assets = useref.assets();
  gulp.src([
    'src/*.html',
    'src/css/*.css',
    'src/js/*.js'
    ])
  //gulp.from()
  .pipe(assets)
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(gulp.dest('dist/')); //gulp.into()
});
