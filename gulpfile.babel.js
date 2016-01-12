import gulp from "gulp";
import connect from "gulp-connect";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat-css";
import jspm from "gulp-jspm-build";

gulp.task("server", () => {
  connect.server({
    livereload: true
  });
});

gulp.task("styles", () => {
  return gulp.src("app/styles/**/*")
    .pipe(connect.reload())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ["last 4 versions"]
    }))
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("jspm", () => {
  jspm({
    bundleOptions: {
      minify: false,
      mangle: false
    },
    bundles: [
      {src: "app/main", dst: "bundle.js"}// array of bundles for sources & destinations
    ]
    // configOverride : {baseUrl: "/foo"}
  })
    .pipe(gulp.dest("dist"));
});

gulp.task("scripts", () => {
  return gulp.src("app/scripts/**/*")
    .pipe(connect.reload());
});

gulp.task("main", () => {
  return gulp.src("app/main.js")
    .pipe(connect.reload());
});

gulp.task("dev", ["server", "styles", "scripts", "main", "jspm"], () => {
  gulp.watch("app/styles/**/*.scss", ["styles"]);
gulp.watch("app/scripts/**/*.js", ["scripts"]);
gulp.watch("app/main.js", ["main"]);
});

gulp.task("dist", ["server", "styles", "scripts", "main", "jspm"], () => {
  gulp.watch("app/styles/**/*.scss", ["styles"]);
gulp.watch("app/scripts/**/*.js", ["scripts"]);
gulp.watch("app/main.js", ["main"]);
});