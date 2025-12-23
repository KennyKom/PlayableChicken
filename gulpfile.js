const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();
const inlinesource = require('gulp-inline-source');
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const gulppug = require('gulp-pug');
const ad_conf = require('./ad_conf.js');
const gulpif = require('gulp-if');
const rename = require("gulp-rename");
const zip = require('gulp-zip');
const minify = require('gulp-minify');
const fs = require('fs');


let isDev = (ad_conf.scripts.type == "dev");
let isProd = !isDev;

const condition = ()=>{
	return true;
}

let webpackConfig;

const conf = {	
	dest: './build',
	temp: './tmp',
	compress: true	
};
if(ad_conf.scripts.type =="dev")conf.compress = false;
const wpConf = () =>{
	webpackConfig = {
		output: {
			filename: 'index.js'			
		},
		module:{
			rules:[
				{
					exclude: /node_modules/,
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}				
				},
				{
					test: /\.(zip)$/i,
					use: 'binary-base64-loader',				
				}
			]
		},
		mode: isDev ? 'development' : 'production',
		devtool: isDev ? 'eval-source-map' : false,
		optimization: {
	        minimize: false
	    }
	};
}
wpConf();
const cssFiles = [
//	'./node_modules/normalize.css/normalize.css',
	'./src/css/main.css'
];
const styles = () =>{
	return gulp.src(cssFiles)
			.pipe(concat('all.css'))			
			.pipe(gulp.dest(conf.temp + '/css'))
			.pipe(browserSync.stream());
}
const script = () =>{	
		return gulp.src('./src/js/main.js')
				.pipe(webpack(webpackConfig))
				.pipe(gulp.dest(conf.temp + '/js'))				
				.pipe(browserSync.stream());	
}
const images = () =>{
	return gulp.src('./src/img/**/*')	
			.pipe(imagemin([					
					imagemin.mozjpeg({quality: 75, progressive: true}),
					imagemin.optipng({optimizationLevel: 5})					
				]))
			.pipe(gulp.dest(conf.temp + '/assets'))	
}
const imagesNoCompress = () =>{
	return gulp.src('./src/img/**/*')			
			.pipe(gulp.dest(conf.temp + '/assets'))	
}
const audio = () =>{
	return gulp.src('./src/audio/**/*')				
			.pipe(gulp.dest(conf.temp + '/assets'))	
}
const video = () =>{
	return gulp.src('./src/video/**/*')				
			.pipe(gulp.dest(conf.temp + '/assets'))	
}
const json = () =>{
	return gulp.src('./src/json/**/*')				
			.pipe(gulp.dest(conf.temp + '/assets'))	
}
const font = () =>{
	return gulp.src('./src/font/**/*')				
			.pipe(gulp.dest(conf.temp + '/assets'))	
}
const watch = () =>{
	browserSync.init({
		server:{
			baseDir:'./build'
		},
		//tunnel:true	
	});
	gulp.watch('./src/css/**/*.css', styles);
	gulp.watch('./src/js/**/*.js', gulp.series(script,html));	
	gulp.watch('./src/**/*.html', html);
	
}
const clean = () =>{
	return	del(['build/*', 'tmp/*']);
	
}
const pug = () =>{	
	return gulp.src('./src/pug/*.pug')
		.pipe(gulppug({
			options: {
				pretty: true,
			},
			data: {
				title:ad_conf.scripts.title,
				author:ad_conf.scripts.author,
				preloaderImg:ad_conf.scripts.preloaderImg,
				typeAd:ad_conf.scripts.typeAd,				
				ios:ad_conf.scripts.ios,
				gplay:ad_conf.scripts.gplay
			}
			}))
		.pipe(gulp.dest('./tmp'))
		.pipe(browserSync.stream());	
}
const adZip = ()=>{
	return gulp.src(conf.temp+'/assets/*')
		.pipe(zip('assets.zip'))
		.pipe(gulp.dest(conf.temp));
}
const html = () =>{
	const options = {
		compress: conf.compress
	};	 
	return gulp.src('./tmp/*.html')
		.pipe(inlinesource(options))
		.pipe(gulpif(condition, rename("index.html")))	
		.pipe(gulp.dest(conf.dest))
		.pipe(browserSync.stream())
}
const htmlNoZip = () =>{
	const options = {
		compress: conf.compress
	};	 
	return gulp.src('./tmp/*.html')
		.pipe(inlinesource(options))
		.pipe(gulpif(condition, rename("index.html")))	
		.pipe(gulp.dest(conf.dest))
		.on('end', sequenceAds);
}
let build =
	gulp.series(clean, 
				imagesNoCompress,
				audio,
				video,
				font,
				json,						
				adZip,
				gulp.parallel(styles, script),
				pug,
				html
	);	
let devMode =
	gulp.series(clean, 
				imagesNoCompress,
				audio,
				video,
				font,
				json,					
				adZip,
				gulp.parallel(styles, script),
				pug,
				html
	);
gulp.task('styles', styles);
gulp.task('script', script);
gulp.task('watch', watch);
gulp.task('build', build);					
gulp.task('devMode', devMode);
gulp.task('dev', gulp.series('devMode', 'watch'));