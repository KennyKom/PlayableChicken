import bigAsset from '../../tmp/assets.zip';
const ad_conf = require('../../ad_conf.js');

export let assets = {};

assets.dataScripts = [];
assets.dataJson = [];
assets.dataTextures = [];
assets.dataSounds = [];
assets.dataAtlas = [];
assets.dataSpineJson = [];
assets.dataVideo = [];
assets.dataFont = [];

assets.textures = {
	base	: {},
	pixi	: {}
};

assets.sounds = {};
assets.jsons = {};
assets.atlas = {};
assets.spines = {};
assets.videos = {};
assets.fonts = {};


let zipFiles = [];

export let loader = {
	funComplete		: null,
	
	load			: function(_funComplete){
		loader.funComplete = _funComplete;
		loader.unzipAssets();

	},
	
	//- unzip
	
	
	
	unzipAssets	: function(){
	
		if(bigAsset.length > 10){
			let zipAssets = new JSZip();
			zipAssets.loadAsync(bigAsset, {base64: true}).then(function(zip) {
				for(let i in zip.files){				
					zipFiles.push({
						file		: zip.files[i],
						nameFull	: zip.files[i].name,
						nameFile	: zip.files[i].name.split(".")[0],
						nameFormat	: zip.files[i].name.split(".")[1]
					});	
				}					
				loader.unzipRead();

			});	
		}else{
			loader.loadScripts();
		}		
	},
	
	unzipRead	: function(){		
		if(zipFiles.length > 0){				
			let file 		= zipFiles[0].file;
			let nameFull 	= zipFiles[0].nameFull;
			let nameFile 	= zipFiles[0].nameFile;
			let nameFormat 	= zipFiles[0].nameFull.match(/\.([^.]+)$|$/)[1];
			
			file.async('base64').then(function(b64encoded) {
				if(nameFormat == "js"){
					b64encoded = "data:@file/javascript;base64,"+b64encoded;
					
					assets.dataScripts.push({
						name 	: nameFull,
						src 	: b64encoded,
					});
					
				}else if(nameFormat == "json"){
					b64encoded = b64encoded;
					
					assets.dataJson.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}
				else if(nameFormat == "atlas"){
					b64encoded = b64encoded;
					
					assets.dataAtlas.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}
				else if(nameFormat == "data"){
					b64encoded = b64encoded;
					
					assets.dataSpineJson.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}
				else if(nameFormat == "png"){
					b64encoded = "data:image/png;base64,"+b64encoded;
					
					assets.dataTextures.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}else if(nameFormat == "jpg"	){
					b64encoded = "data:image/jpeg;base64,"+b64encoded;
					
					assets.dataTextures.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}else if(nameFormat == "mp3"){
					b64encoded = "data:audio/mpeg;base64,"+b64encoded;
					
					assets.dataSounds.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}else if(nameFormat == "mp4"){
					b64encoded = "data:video/mp4;base64,"+b64encoded;
					
					assets.dataVideo.push({
						name 	: nameFile,
						src 	: b64encoded,
					});
					
				}
				else if(nameFormat == "ttf" || nameFormat == "otf" || nameFormat == "woff" || nameFormat == "woff2"){
										
					assets.dataFont.push({
						name 	: nameFile,
						src 	: b64encoded,
						type	: nameFormat
					});
					
				}
				
				//-
				
				zipFiles.shift();
				loader.unzipRead();
				
			});
		
		}else{
			loader.loadScripts();
		}
	},
	
	//- load scripts
	
	loadScripts	: function(){		
		if(assets.dataScripts.length > 0){			
			for(let i=0; i<assets.dataScripts.length; i++){
				if(i>0 && assets.dataScripts[i].name == "three.min.js"){
					assets.dataScripts.splice(0, 0, assets.dataScripts.splice(i, 1)[0]);
				}else if(i>0 && assets.dataScripts[i].name == "pixi.min.js"){
					assets.dataScripts.splice(0, 0, assets.dataScripts.splice(i, 1)[0]);
				}
			}
			
			//-
			
			let scriptTag = document.createElement('script');			
			scriptTag.onload = loader.loadScriptComplete;
			scriptTag.onreadystatechange = loader.loadScriptComplete;
			scriptTag.src = assets.dataScripts[0].src;	
			document.body.appendChild(scriptTag);
		}else{
			loader.loadScriptsComplete();
		}
	},
	loadScriptComplete		: function(){
		assets.dataScripts.shift();				
		loader.loadScripts();
	},
	loadScriptsComplete	: function(){
		loader.loadJson();
	},

	//- load json
	loadJson	: function(){		
		if(assets.dataJson.length > 0){			
			const jsonString = atob(assets.dataJson[0].src);
			const jsonObject = JSON.parse(jsonString);
			assets.jsons[assets.dataJson[0].name] = jsonObject;
			loader.loadJsonComplete();

		}else{
			loader.loadJsonsComplete();
		}
	},
	loadJsonComplete		: function(){
		assets.dataJson.shift();				
		loader.loadJson();
	},
	loadJsonsComplete	: function(){
		loader.loadAtlas();
	},

	//- load Atlas
	loadAtlas	: function(){		
		if(assets.dataAtlas.length > 0){			
			const jsonString = atob(assets.dataAtlas[0].src);
		//	const jsonObject = JSON.parse(jsonString);
			assets.spines[assets.dataAtlas[0].name] = {};
			assets.spines[assets.dataAtlas[0].name].atlasData = jsonString;
			loader.loadAtlasComplete();

		}else{
			loader.loadAtlassComplete();
		}
	},
	loadAtlasComplete		: function(){
		assets.dataAtlas.shift();				
		loader.loadAtlas();
	},
	loadAtlassComplete	: function(){
		loader.loadSpines();
	},

	//- load Spine Json
	loadSpines	: function(){		
		if(assets.dataSpineJson.length > 0){	
			const jsonString = atob(assets.dataSpineJson[0].src);
			const jsonObject = JSON.parse(jsonString);
			assets.spines[assets.dataSpineJson[0].name].data = jsonObject;
			assets.spines[assets.dataSpineJson[0].name].name = assets.dataSpineJson[0].name;
			assets.spines[assets.dataSpineJson[0].name].metadata	= {};   
			loader.loadSpineComplete();

		}else{
			loader.loadSpinesComplete();
		}
	},
	loadSpineComplete		: function(){
		assets.dataSpineJson.shift();				
		loader.loadSpines();
	},
	loadSpinesComplete	: function(){
		loader.loadTextures();
	},
	
	//- load textures
	
	loadTextures	: function(){		
		if(assets.dataTextures.length > 0){			
			assets.textures.base[ assets.dataTextures[0].name ] = new Image();			
			assets.textures.base[ assets.dataTextures[0].name ].onload = loader.loadTextureComplete;
			assets.textures.base[ assets.dataTextures[0].name ].onerror = loader.loadTextureError;
			assets.textures.base[ assets.dataTextures[0].name ].src = assets.dataTextures[0].src;			
		}else{
			loader.loadTexturesComplete();
		}
	},
	loadTextureComplete		: function(){		
		assets.textures.pixi[ assets.dataTextures[0].name ] = PIXI.Texture.from(assets.dataTextures[0].src);
		
		assets.dataTextures.shift();		
		loader.loadTextures();
		
	},
	loadTextureError		: function(){
		setTimeout(loader.loadTextures, 200);
	},
	loadTexturesComplete	: function(){
		loader.loadSounds();
	},
	
	//- load sounds
	
	loadSounds		: function(){
		if(assets.dataSounds.length > 0){			
			assets.sounds[ assets.dataSounds[0].name ] = new Howl(assets.dataSounds[0]);
			let conf = ad_conf.scripts.audio_conf.find(entry=>entry.n == assets.dataSounds[0].name);
			if(conf != undefined){
				assets.sounds[ assets.dataSounds[0].name ].loop(conf.loop);
				assets.sounds[ assets.dataSounds[0].name ].volume(conf.volume);
			}
			assets.dataSounds.shift();				
			loader.loadSounds();
		}else{
			loader.loadSoundsComplete();
		}
	},
	loadSoundsComplete	: function(){
		loader.loadVideos();

	},
	//- load videos
	
	loadVideos		: function(){
		if(assets.dataVideo.length > 0){			
			assets.videos[ assets.dataVideo[0].name ] = assets.dataVideo[0];			
			assets.dataVideo.shift();				
			loader.loadVideos();
		}else{
			loader.loadVideosComplete();
		}
	},
	loadVideosComplete	: function(){
		loader.loadFonts();

	},
	//- load Fonts
	
	loadFonts		: function(){
		if(assets.dataFont.length > 0){	
			/**
			* Загружает шрифт из base64-строки и регистрирует его в браузере.
			*	
			* @param {string} fontName   - имя шрифта (как будешь писать в fontFamily)
 			* @param {string} base64     - base64-строка. Может быть как "AAAA..." так и "data:font/ttf;base64,AAAA..."
 			* @param {string} [mime='font/ttf'] - mime-тип шрифта (font/ttf, font/otf, font/woff, font/woff2)
 			* @returns {Promise<void>}	
			*/
			let src;
			if (assets.dataFont[0].src.startsWith('data:')) {
			    src = assets.dataFont[0].src;
			} else {
			    src = `data:font/${assets.dataFont[0].type};base64,${assets.dataFont[0].src}`;
			}
			const fontFace = new FontFace(assets.dataFont[0].name, `url(${src})`);

			fontFace.load().then((loadedFace) => {
			    document.fonts.add(loadedFace);
			    // Подождём, пока все шрифты применятся
			    assets.dataFont.shift();	
			    loader.loadFonts();
			 });
			
		}else{
			loader.loadFontsComplete();
		}
	},
	loadFontsComplete	: function(){
		loader.funComplete();

	},
		
};

window.assets = assets;
