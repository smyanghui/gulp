var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //图片压缩
var less = require('gulp-less');
var babel = require('gulp-babel');
// var filter = require('gulp-filter'); // 过滤文件
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var uglify = require('gulp-uglify'); //js压缩  

var SRC_DIR = './src';     // 源文件目录  
var DIST_DIR = './dist';   // 文件处理后存放的目录  

var Config = {
  src: SRC_DIR,
  dist: DIST_DIR,
  // html文件
  html: {  
    dir: SRC_DIR,
    src: SRC_DIR + '/*.html',
    dist: DIST_DIR
  },
  // 存放库文件
  lib: {
    dir: SRC_DIR + '/lib',
    src: SRC_DIR + '/lib/**/*',
    dist: DIST_DIR + '/lib'
  },
  // 存放样式文件
  less: {
    dir: SRC_DIR + '/less',
    src: SRC_DIR + '/less/**/*.less',
    dist: DIST_DIR + '/css'
  },
  // 存放JS文件
  js: {
    dir: SRC_DIR + '/js',
    src: SRC_DIR + '/js/**/*.js',
    dist: DIST_DIR + '/js',
    build_name: '/build.js'
  },
  // 存放图片文件
  img: {
    dir: SRC_DIR + '/images',
    src: SRC_DIR + '/images/**/*',
    dist: DIST_DIR + '/images'
  }
};

// 开发环境
gulp.task('html:dev', function () {
  return gulp.src(Config.html.src)
  .pipe(gulp.dest(Config.html.dist))
  .pipe(reload({stream: true}));
});

gulp.task('lib:dev', function () {
  return gulp.src(Config.lib.src)
  .pipe(gulp.dest(Config.lib.dist))
  .pipe(reload({stream: true}));
});

gulp.task('less:dev', function () {
  return gulp.src(Config.less.src)
  .pipe(less())
  .pipe(gulp.dest(Config.less.dist))
  .pipe(reload({stream: true}));
});

gulp.task('js:dev', function () {
  return gulp.src(Config.js.src)
  .pipe(gulp.dest(Config.js.dist))
  .pipe(reload({stream: true}));
});

gulp.task('images:dev', function () {
  return gulp.src(Config.img.src)
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(Config.img.dist))
  .pipe(reload({stream: true}));
});

gulp.task('dev', ['html:dev', 'less:dev', 'js:dev', 'lib:dev', 'images:dev'], function () {
  browserSync.init({
    server: {
      baseDir: Config.dist
      // index: 'index.html' // 指定默认打开的文件
    },
    port: 3002
  });
  gulp.watch(Config.html.src, ['html:dev']);
  gulp.watch(Config.less.src, ['less:dev']);
  gulp.watch(Config.js.src, ['js:dev']);
  // gulp.watch(Config.img.src, ['images:dev']);
});

// 资源打包
gulp.task('html', function () {
  return gulp.src(Config.html.src)
  .pipe(gulp.dest(Config.html.dist));
});

gulp.task('lib', function () {
  return gulp.src(Config.lib.src)
  .pipe(gulp.dest(Config.lib.dist));
});

gulp.task('less', function () {
  return gulp.src(Config.less.src)
  .pipe(autoprefixer('last 2 version'))
  .pipe(less())
  .pipe(cssnano()) //执行压缩  
  .pipe(gulp.dest(Config.less.dist));
});

gulp.task('js', function () {
  return gulp.src(Config.js.src)
  .pipe(babel({presets: ['env']}))
  //.pipe(uglify())
  .pipe(gulp.dest(Config.js.dist));
});

gulp.task('images', function () {
  return gulp.src(Config.img.src)
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(Config.img.dist));
});

gulp.task('build', ['html', 'less', 'js', 'lib', 'images']);





