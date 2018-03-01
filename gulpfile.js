var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //图片压缩
var less = require('gulp-less');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var uglify = require('gulp-uglify'); //js压缩  

var srcDir = './src';     // 源文件目录  
var distDir = './dist';   // 文件处理后存放的目录  

// 相关目录路径配置
var Config = {
  // html文件
  html: {  
    src: srcDir + '/*.html',
    dist: distDir
  },
  // 库文件
  lib: {
    src: srcDir + '/lib/**/*',
    dist: distDir + '/lib'
  },
  // 样式文件
  less: {
    src: srcDir + '/less/**/*.less',
    dist: distDir + '/css'
  },
  // JS文件
  js: {
    src: srcDir + '/js/**/*.js',
    dist: distDir + '/js',
    build_name: '/build.js'
  },
  // 图片文件
  img: {
    src: srcDir + '/images/**/*',
    dist: distDir + '/images'
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
  .pipe(gulp.dest(Config.lib.dist));
});

gulp.task('less:dev', function () {
  return gulp.src(Config.less.src)
  .pipe(less())
  .pipe(gulp.dest(Config.less.dist))
  .pipe(reload({stream: true}));
});

gulp.task('js:dev', function () {
  return gulp.src(Config.js.src)
  .pipe(babel({'presets': ['env']}))
  .pipe(gulp.dest(Config.js.dist))
  .pipe(reload({stream: true}));
});

gulp.task('images:dev', function () {
  return gulp.src(Config.img.src)
  // .pipe(imagemin({
  //   optimizationLevel: 3,
  //   progressive: true,
  //   interlaced: true
  // }))
  .pipe(gulp.dest(Config.img.dist));
});

gulp.task('dev', ['html:dev', 'less:dev', 'js:dev', 'lib:dev', 'images:dev'], function () {
  browserSync.init({
    server: {
      baseDir: distDir
      // index: 'index.html' // 指定默认打开的文件
    },
    port: 3002
  });
  gulp.watch(Config.html.src, ['html:dev']);
  gulp.watch(Config.less.src, ['less:dev']);
  gulp.watch(Config.js.src, ['js:dev']);
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
  return gulp.src([Config.less.src, '!./src/less/common/*.less'])
  // return gulp.src(Config.less.src)
  .pipe(autoprefixer('last 2 version'))
  .pipe(less())
  .pipe(cssnano()) //执行压缩  
  .pipe(gulp.dest(Config.less.dist));
});

gulp.task('js', function () {
  return gulp.src(Config.js.src)
  .pipe(babel({'presets': ['env']}))
  .pipe(uglify())
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





