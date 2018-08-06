var gulp = require('gulp');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
// var css = require('gulp-css');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = fs.readFileSync('./src/data/data.json');
console.log(data);
// gulp.task('js', function() {
//     gulp.src('./src/js/*.js')
//         .pipe(uglify)
// });
// gulp.task('css', function() {
//     gulp.src('./src/css/*.css')
//         .pipe(css())
// })
gulp.task('server', function() {
    gulp.src('./src/')
        .pipe(server({
            port: 8000,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') { return };
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (pathname === '/api/ajaxList') {
                    res.end(data.toString());
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('watch', function() {
    gulp.watch('./src/index.html', ['server'])
});