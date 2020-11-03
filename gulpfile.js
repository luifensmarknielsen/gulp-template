// var gulp = require("gulp");
// var sass = require("gulp-sass");
// var cleanCSS = require("gulp-clean-css");
// var connect = require("gulp-connect");
// var babel = require("gulp-babel");
// var sourcemaps = require("gulp-sourcemaps");
// var concat = require('gulp-concat');

// function projectImages() {
// 	return gulp.src("src/images/**/*.*")
// 		.pipe(gulp.dest("dist/assets/images"))
// 		.pipe(connect.reload());
// }

// function processHTML() {
// 	return gulp.src("src/html/**/*.html")
// 		.pipe(gulp.dest("dist/"))
// 		.pipe(connect.reload());
// }

// function processSass() {
// 	return gulp.src("src/sass/**/*.scss")
// 		.pipe(sass())
// 		.pipe(cleanCSS({
// 			compatibility: "ie9"
// 		}))
// 		.pipe(gulp.dest("dist/assets/css"))
// 		.pipe(connect.reload());
// }

// function processJs() {
//     return gulp.src("src/js/**/*.js")
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//         presets: ["@babel/env"]
//     }))
//     .pipe(concat("all.js"))
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("dist/assets/js"))
//     .pipe(connect.reload());
// };

// function watch() {
// 	gulp.watch("src/sass/**/*.scss", {
// 			ignoreInitial: false
// 		},
// 		processSass);
// 	gulp.watch("src/html/**/*.html", {
// 			ignoreInitial: false
// 		},
// 		processHTML);

// 	gulp.watch("src/images/**/*.*", {
// 			ignoreInitial: false
// 		},
// 		projectImages);

// 	gulp.watch("src/js/**/*.js", {
// 			ignoreInitial: false
// 		},
// 		processJS)

// };

// function server() {
// 	return connect.server({
// 		root: 'dist',
// 		livereload: true
// 	});
// }

// gulp.task("default", gulp.parallel(server, watch));


var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require("gulp-imagemin");

function processHTML() {
	return gulp.src("src/html/**/*.html")
		.pipe(gulp.dest("dist/"))
		.pipe(connect.reload());
}

function processSass() {
	return gulp.src("src/sass/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS({
			compatibility: "ie9"
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist/assets/css"))
		.pipe(connect.reload());
}

function processImages() {
	return gulp.src("src/images/**/*.*")
		.pipe(imagemin([
			imagemin.mozjpeg({
				quality: 25
			}),
			imagemin.optipng({
				optimizationLevel: 1
			})
		]))
		.pipe(gulp.dest("dist/assets/images"))
		.pipe(connect.reload());
}

function processJs() {
	return gulp.src("src/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(concat("all.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist/assets/js"))
		.pipe(connect.reload());
};

function watch() {
	gulp.watch("src/sass/**/*.scss", {
			ignoreInitial: false
		},
		processSass);
	gulp.watch("src/html/**/*.html", {
			ignoreInitial: false
		},
		processHTML);
	gulp.watch("src/images/**/*.*", {
			ignoreInitial: false
		},
		processImages);
	gulp.watch("src/js/**/*.js", {
			ignoreInitial: false
		},
		processJs);
}

function server() {
	return connect.server({
		root: 'dist',
		livereload: true
	});
}
gulp.task("default", gulp.parallel(server, watch));