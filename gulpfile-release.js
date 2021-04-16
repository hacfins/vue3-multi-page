var gulp         = require('gulp'),
	cleancss     = require('gulp-clean-css'),    //- css压缩
	uglify       = require('gulp-uglify'),		 //- js压缩
	rev          = require('gulp-rev'),          //- 对文件名加MD5后缀
	revcollector = require('gulp-rev-collector'),//- 路径替换
    runsequence	 = require('gulp4-run-sequence'), //- 依次顺序执行
    del          = require('del');				 //- 删除文件夹里的内容

// “src/a.js”：指定具体文件
// “*”：匹配所有文件 例：src/*.js(包含src下的所有js文件)
//  “**”：匹配0个或多个子文件夹 例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)
// “{}”：匹配多个属性 例：src/{a,b}.js(包含a.js和b.js文件) src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)
//  “!”：排除文件 例：!src/a.js(不包含src下的a.js文件)

//【0】清空rev目录中的内容
gulp.task('cleanrev', function(cb) {
    return del(['./rev/*'], cb)
});

//【1】static/lib端css-压缩+MD5
gulp.task('css-min-rev-lib', function() {
    return gulp.src(['./public/lib/**/*.css'])
    .pipe(cleancss()) //- 压缩CSS
        .pipe(rev())                            //- 文件名加MD5后缀
        .pipe(gulp.dest( './dist/web/lib/')) 		//- 发布到线上版本
        .pipe(rev.manifest('./rev' + '/css-rev-manifest-lib.json', {merge: true, base: './rev'})) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));          //- 将 rev-manifest.json 保存到 rev 目录内
});


//【2】static/lib端js-压缩+MD5
gulp.task('js-min-rev-lib', function () {
	return gulp.src([
        './public/lib/**/*.js',
    ])
			.pipe(uglify())//压缩js
			.pipe(rev())                      	//- 文件名加MD5后缀
       		.pipe(gulp.dest( './dist/web/lib/')) 		//- 发布到线上版本
			.pipe(rev.manifest('./rev' + '/js-rev-manifest-lib.json', {merge: true, base: './rev'})) //- 生成一个rev-manifest.json
			.pipe(gulp.dest('./rev'));       //- 将 rev-manifest.json 保存到 rev 目录内
});


//【3】pug文件引用路径替换
gulp.task('pug-rev-replace', function() {
	return gulp.src(['./rev/*.json', './dist/web/**/*.html', './dist/web/**/*.js'])		//- 读取 rev-manifest.json 文件以及需要进行css/js名替换的文件
            .pipe(revcollector()) //- 执行文件内css/js名的替换
        	.pipe(gulp.dest( './dist/web')) 		//- 发布到线上版本
});

//【4】执行任务
gulp.task('run', function (done) {
    //依次顺序执行
    return runsequence(
    	['cleanrev'],
        ['css-min-rev-lib'],
        ['js-min-rev-lib'],
        ['pug-rev-replace'],
        done);
});







