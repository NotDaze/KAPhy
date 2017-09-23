var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("build", function() {
	gulp.src("./js/**/*.js").pipe(concat("kaphy.js")).pipe(gulp.dest("./"));
	gulp.src("./js/**/*.js").pipe(concat("kaphy.min.js")).pipe(uglify()).pipe(gulp.dest("./"));
	return;
});