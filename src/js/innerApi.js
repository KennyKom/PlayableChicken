import appMc from './appMc.js';
import AppResize from './appresize.js';
import {assets} from './loader.js';
const ad_conf = require('../../ad_conf.js');
let i, objTemp;


//- Init PIXI

export const InitPixi = () => {
	let appObj = window.appObj;
	appObj.canvasWidth	=	Math.ceil(window.innerWidth);
	appObj.canvasHeight	=	Math.ceil(window.innerHeight);
	
	AppCanvas.id		= "AppCanvas";
	AppCanvas.width		= appObj.canvasWidth;
	AppCanvas.height	= appObj.canvasHeight; 

	window.renderer = new PIXI.autoDetectRenderer({
		width 			: appObj.canvasWidth, 		
		height 			: appObj.canvasHeight,
		view			: window.AppCanvas, 
		transparent		: true, 
		antialias		: false						
	});
	
	document.getElementById('pixi').append(renderer.view);  
	
	window.stage = new PIXI.Container();
	window.stage.position.set(Math.ceil(appObj.canvasWidth*0.5), Math.ceil(appObj.canvasHeight*0.5));	

}

export class createContainer{
	constructor({name,p,visible=true,alpha=1,x=0,y=0, scale=1}) {  					
		name = new PIXI.Container();
		name.position.set(x, y);
		p.addChild(name);
		name.visible = visible;
		name.alpha = alpha;
		name.scale.set(scale);						
		return name;
	}				
}
export class createSprite{
	constructor({name,p,tex,x=0,y=0,anchor=[0.5,0.5],scale=1,visible=true,alpha=1, tint=0xffffff}) {  					
		name = new PIXI.Sprite();	
		name.texture=assets.textures.pixi[tex];	
		name.position.set(x, y);
		name.anchor.set(anchor[0], anchor[1]);
		name.scale.set(scale);
		name.visible = visible;
		name.alpha = alpha;	
		name.tint = tint;	
		p.addChild(name);	
		return name;					
	}				
}
export class createRect{
	constructor({name,p,visible=true,alpha=1,x=0,y=0, width=0,height=0,color="0x000000", fill=1,radius=0}) {  					
		name = new PIXI.Graphics();			
		name.beginFill(color, fill);
		name.drawRoundedRect(x, y, width, height,radius);
		name.endFill();
		name.alpha = alpha;
		name.visible = visible;
		p.addChild(name);	
		return name;
	}				
}
export class createCircle{
	constructor({name,p,visible=true,alpha=1,x=0,y=0, color="0x000000", fill=1,radius=0,  lineWeigth=0, lineColor= "0x000000"}) {  					
		name = new PIXI.Graphics();	
		name.lineStyle(lineWeigth, lineColor);		
		name.beginFill(color, fill);
		name.drawCircle(x, y, radius);		
		name.endFill();		
		name.alpha = alpha;
		name.visible = visible;
		p.addChild(name);	
		return name;
	}				
}

//-----------
export const SaveObject = (_obj) =>{				
	_obj.m_x=_obj.position.x;
	_obj.m_y=_obj.position.y;
	_obj.m_z=_obj.position.z;
	_obj.m_scaleX=_obj.scale.x;
	_obj.m_scaleY=_obj.scale.y;
	_obj.m_rotation_x =_obj.rotation.x;
	_obj.m_rotation_y =_obj.rotation.y;
	_obj.m_rotation_z =_obj.rotation.z;
	_obj.m_alpha=_obj.alpha;
	_obj.gs_an_x=0;
	_obj.gs_an_y=0;
	_obj.gs_an_scaleX=0;
	_obj.gs_an_scaleY=0;
	_obj.gs_an_rotation=0;
}
export const RebootObject = (_obj) =>{
	gsap.killTweensOf(_obj);
	gsap.killTweensOf(_obj.scale);
	
	_obj.position.x=_obj.m_x;
	_obj.position.y=_obj.m_y;
	_obj.position.z=_obj.m_z;
	_obj.scale.x=_obj.m_scaleX;
	_obj.scale.y=_obj.m_scaleY;
	_obj.rotation.x=_obj.m_rotation_x;
	_obj.rotation.y=_obj.m_rotation_y;
	_obj.rotation.z=_obj.m_rotation_z;
	_obj.alpha=_obj.m_alpha;
	_obj.visible =_obj.m_visible;	
}

//

//---------------------------------------------------------------------------------
//- DistancePointToPoint

export const DistancePointToPoint=(_x0, _y0, _x1, _y1)=>{
	return Math.sqrt((_x0-_x1)*(_x0-_x1)+(_y0-_y1)*(_y0-_y1));
}

//---------------------------------------------------------------------------------
//- PlaySound

export const PlaySound = (_name) =>{
	appMc.appSounds[_name].play();
}

//---------------------------------------------------------------------------------
//- SortZ

function SortZ( a, b ) {
	if ( a._z < b._z ){
		return -1;
	}
	if ( a._z > b._z ){
		return 1;
	}
	return 0;
}

//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
//- Components

export function RandomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

var idRandomCash = 0;
var aRandomCash = [0.55,0.86,0.065,0.408,0.423,0.628,0.672,0.634,0.671,0.794,0.328,0.649,0.172,0.531,0.803,0.583,0.528,0.527,0.396,0.153,0.198,0.418,0.021,0.712,0.553,0.03,0.811,0.495,0.186,0.119,0.421,0.039,0.889,0.345,0.889,0.161,0.931,0.358,0.762,0.254,0.729,0.568,0.979,0.607,0.894,0.616,0.841,0.128,0.05,0.856,0.997,0.543,0.841,0.877,0.563,0.358,0.853,0.906,0.115,0.339,0.788,0.988,0.326,0.123,0.413,0.308,0.723,0.121,0.762,0.916,0.406,0.491,0.942,0.7,0.554,0.958,0.562,0.182,0.956,0.056,0.867,0.692,0.26,0.215,0.801,0.668,0.168,0.17,0.977,0.876,0.088,0.296,0.116,0.904,0.498,0.056,0.062,0.008,0.335,0.392,0.67,0.697,0.647,0.87,0.648,0.529,0.6,0.583,0.689,0.176,0.722,0.612,0.005,0.218,0.33,0.401,0.004,0.344,0.066,0.517,0.038,0.307,0.183,0.03,0.272,0.591,0.846,0.403,0.581,0.34,0.094,0.49,0.167,0.26,0.676,0.344,0.657,0.147,0.134,0.662,0.813,0.213,0.435,0.548,0.676,0.628,0.986,0.265,0.539,0.633,0.33,0.947,0.354,0.183,0.413,0.479,0.015,0.576,0.606,0.723,0.313,0.43,0.976,0.37,0.745,0.328,0.599,0.654,0.037,0.36,0.826,0.725,0.921,0.868,0.503,0.144,0.956,0.281,0.961,0.808,0.001,0.206,0.602,0.137,0.587,0.848,0.819,0.804,0.857,0.319,0.431,0.723,0.993,0.37,0.738,0.313,0.331,0.728,0.809,0.101,0.711,0.482,0.494,0.545,0.502,0.047,0.495,0.224,0.749,0.826,0.554,0.459,0.329,0.834,0.239,0.645,0.695,0.824,0.651,0.341,0.82,0.724,0.233,0.52,0.968,0.035,0.778,0.7,0.454,0.153,0.677,0.025,0.825,0.909,0.027,0.731,0.616,0.158,0.46,0.467,0.23,0.998,0.429,0.481,0.028,0.511,0.742,0.379,0.022,0.629,0.039,0.985,0.931,0.491,0.057,0.929,0.91,0.599,0.741,0.073,0.388,0.745,0.359,0.581,0.065,0.633,0.211,0.005,0.738,0.992,0.621,0.493,0.497,0.575,0.247,0.139,0.549,0.122,0.191,0.168,0.329,0.278,0.279,0.706,0.252,0.823,0.027,0.592,0.197,0.87,0.498,0.903,0.563,0.043,0.868,0.648,0.123,0.171,0.982,0.154,0.758,0.61,0.301,0.385,0.981,0.714,0.69,0.721,0.434,0.857,0.814,0.361,0.036,0.672,0.239,0.021,0.22,0.871,0.928,0.276,0.846,0.267,0.215,0.05,0.422,0.857,0.279,0.86,0.676,0.134,0.908,0.738,0.73,0.094,0.218,0.978,0.873,0.8,0.235,0.059,0.684,0.255,0.584,0.392,0.917,0.787,0.431,0.323,0.945,0.568,0.5,0.383,0.271,0.613,0.344,0.695,0.652,0.22,0.743,0.022,0.016,0.269,0.242,0.022,0.826,0.917,0.338,0.066,0.126,0.048,0.595,0.426,0.604,0.256,0.51,0.574,0.895,0.766,0.681,0.717,0.479,0.484,0.879,0.666,0.439,0.969,0.542,0.896,0.326,0.402,0.232,0.052,0.913,0.793,0.446,0.535,0.939,0.125,0.868,0.393,0.925,0.771,0.685,0.542,0.219,0.051,0.038,0.189,0.994,0.14,0.992,0.115,0.046,0.05,0.363,0.524,0.793,0.819,0.542,0.173,0.65,0.26,0.743,0.773,0.068,0.141,0.714,0.836,0.83,0.592,0.086,0.721,0.87,0.251,0.849,0.812,0.806,0.643,0.878,0.62,0.539,0.51,0.632,0.839,0.211,0.838,0.626,0.107,0.478,0.753,0.215,0.273,0.647,0.778,0.776,0.108,0.66,0.925,0.751,0.075,0.369,0.463,0.319,0.841,0.141,0.064,0.465,0.152,0.768,0.869,0.497,0.822,0.568,0.865,0.725,0.22,0.356,0.062,0.843,0.321,0.426,0.662,0.772,0.334,0.919,0.747,0.527,0.192,0.754,0.442,0.904,0.029,0.679,0.975,0.326,0.481,0.661,0.143,0.21,0.011,0.476,0.648,0.268,0.781,0.262,0.65,0.502,0.917,0.833,0.148,0.626,0.898,0.399,0.03,0.201,0.92,0.801,0.363,0.354,0.639,0.158,0.039,0.196,0.093,0.677,0.416,0.954,0.379,0.276,0.701,0.733,0.148,0.305,0.48,0.8,0.808,0.274,0.553,0.268,0.895,0.703,0.979,0.243,0.967,0.857,0.73,0.605,0.2,0.415,0.398,0.658,0.363,0.839,0.366,0.451,0.375,0.998,0.532,0.685,0.289,0.649,0.125,0.299,0.718,0.903,0.16,0.284,0.114,0.748,0.684,0.455,0.313,0.815,0.831,0.83,0.146,0.646,0.707,0.545,0.091,0.143,0.174,0.081,0.246,0.001,0.166,0.95,0.891,0.58,0.323,0.56,0.184,0.185,0.703,0.286,0.035,0.76,0.255,0.089,0.083,0.193,0.091,1,0.824,0.326,0.029,0.866,0.6,0.905,0.253,0.911,0.529,0.023,0.996,0.21,0.431,0.456,0.616,0.087,0.126,0.055,0.023,0.751,0.807,0.437,0.94,0.502,0.271,0.267,0.886,0.195,0.342,0.569,0.899,0.421,0.87,0.941,0.83,0.111,0.886,0.461,0.165,0.295,0.67,0.298,0.719,0.896,0.266,0.126,0.677,0.694,0.098,0.764,0.027,0.182,0.526,0.218,0.07,0.912,0.535,0.931,0.717,0.979,0.827,0.827,0.068,0.018,0.99,0.404,0.378,0.121,0.266,0.722,0.22,0.333,0.029,0.603,0.372,0.881,0.345,0.35,0.177,0.375,0.33,0.697,0.364,0.875,0.976,0.139,0.895,0.083,0.883,0.795,0.639,0.53,0.467,0.437,0.556,0.781,0.505,0.956,0.445,0.971,0.077,0.065,0.786,0.157,0.039,0.114,0.211,0.929,0.19,0.379,0.797,0.001,0.91,0.543,0.792,0.364,0.49,0.534,0.954,0.01,0.484,0.641,0.922,0.216,0.732,0.87,0.808,0.07,0.591,0.823,0.805,0.859,0.414,0.789,0.791,0.727,0.532,0.296,0.002,0.463,0.877,0.969,0.158,0.27,0.922,0.691,0.964,0.59,0.67,0.084,0.435,0.628,0.037,0.631,0.795,0.448,0.502,0.568,0.417,0.049,0.154,0.257,0.182,0.536,0.678,0.351,0.3,0.5,0.301,0.779,0.8,0.685,0.458,0.576,0.888,0.04,0.053,0.855,0.171,0.872,0.521,0.118,0.972,0.301,0.651,0.863,0.009,0.907,0.447,0.981,0.534,0.559,0.508,0.216,0.098,0.583,0.792,0.659,0.357,0.819,0.334,0.256,0.553,0.675,0.158,0.637,0.748,0.297,0.17,0.332,0.817,0.057,0.154,0.282,0.299,0.678,0.626,0.731,0.134,0.882,0.562,0.817,0.672,0.819,0.671,0.607,0.219,0.399,0.51,0.179,0.821,0.612,0.646,0.204,0.769,0.489,0.177,0.654,0.021,0.178,0.393,0.732,0.203,0.43,0.645,0.917,0.325,0.209,0.221,0.947,0.158,0.922,0.072,0.153,0.07,0.734,0.316,0.871,0.067,0.295,0.244,0.217,0.109,0.83,0.736,0.042,0.332,0.623,0.625,0.697,0.032,0.809,0.861,0.385,0.562,0.76,0.171,0.8,0.947,0.059,0.243,0.445,0.924,0.884,0.616,0.612,0.027,0.721,0.611,0.736,0.658,0.352,0.82,0.71,0.245,0.656,0.456,0.766,0.513,0.596,0.467,0.29,0.532,0.562,0.985,0.314,0.099,0.204,0.014,0.084,0.543,0.6,0.238,0.714,0.015,0.928,0.493,0.127,0.78,0.68,0.88,0.198,0.113,0.857,0.371,0.153,0.344,0.36,0.653,0.731,0.845,0.651,0.532,0.894,0.321,0.23,0.876,0.117,0.52,0.128,0.793,0.323,0.999,0.732,0.45,0.348,0.995,0.014,0.554,0.474,0.121,0.803,0.247,0.929,0.398,0.298,0.871,0.287,0.055,0.082,0.89,0.892,0.467,0.132,0.251,0.212,0.999,0.773,0.556,0.621,0.014,0.875,0.694,0.3,0.165,0.552,0.574,0.911,0.708,0.714,0.328,0.756,0.658,0.752,0.126,0.762,0.631,0.198,0.154,0.797,0.717,0.764,0.654,0.559,0.127,0.543,0.669];
function RandomCash() {
	idRandomCash++;
	if(idRandomCash==aRandomCash.length){ idRandomCash = 0; }
	return aRandomCash[idRandomCash];
}

var seedRandom= 6;
function Random(_n){						
	_n = _n || 1;				
	seedRandom = (seedRandom * 9301 + 49297) % 233280;
	var rnd = seedRandom / 233280.0;
	rnd = Math.round(rnd * (_n));
	if(rnd==_n){rnd--;}				
	return rnd;
}

function MixArray(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


//---------------------------------------------------------------------------------
//- IS SAFARI

function isSafari(){
	var ua = navigator.userAgent.toLowerCase(); 
	if (ua.indexOf('safari') != -1) { 
		if (ua.indexOf('chrome') > -1) {
			return false;
		} else {
			return true;
		}
	}else{
		return false;
	}	
}

//---------------------------------------------------------------------------------
//- RAF

var raf_lastTime = 0;
var raf_vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < raf_vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[raf_vendors[x]+'RequestAnimationFrame'];
	window.cancelAnimationFrame = window[raf_vendors[x]+'CancelAnimationFrame'] || window[raf_vendors[x]+'CancelRequestAnimationFrame'];
} 
if (!window.requestAnimationFrame){
	window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - raf_lastTime));
		var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
		raf_lastTime = currTime + timeToCall;
		return id;
	};
}	
if (!window.cancelAnimationFrame){
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}

//- FOCUS

var hidden, state, visibilityChange; 
if (typeof document.hidden !== "undefined") {
	hidden = "hidden";
	visibilityChange = "visibilitychange";
	state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
	hidden = "mozHidden";
	visibilityChange = "mozvisibilitychange";
	state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
	state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
	state = "webkitVisibilityState";
}


export const canvasVisibilityChange=()=>{    
	if(document[hidden] || document[state]=="hidden" || document.visibilityState == 'hidden'){	
		try{ Howler.mute(true); }catch(e){}	 
		appMc.pauseGlobal = true;
		try{ gsap.globalTimeline.pause() }catch(e){}	
	}else{		
		try{ 
			appMc.pauseGlobal = false;						
			gsap.globalTimeline.resume(); 
		}catch(e){}				
		if(appMc.isGlobalSound){
			if(navigator.audioSession != undefined)navigator.audioSession.type = "playback";	
			Howler.mute(false); 			
		} 
	}
}

export const WindowOnBlur=()=>{    
	try{ Howler.mute(true); }catch(e){}	 
	appMc.pauseGlobal = true;
	try{ 
		gsap.globalTimeline.pause() 
	}catch(e){}	
}

export const WindowOnFocus=()=>{    
	if(appMc.isGlobalSound){
		Howler.mute(false);		
	}	 
	try{ 
			appMc.pauseGlobal = false;
			gsap.globalTimeline.resume();		
	}catch(e){}			

}
export const initLibSound = () =>{
	Howler.mute(true);
}

export const playSound =(_name, _volume, _rate, _sprite)=>{
	
		if(_volume == undefined){
			_volume = assets.sounds[_name].volume();
		}else if(_volume != null){
			assets.sounds[_name].volume(_volume);
		}
		
		if(_rate == undefined){
			_rate = 1; 
			try{
				assets.sounds[_name].rate(_rate);
			}catch(e){}
		}else if(_rate != null){
			if(_rate < 0){ _rate = 0; }else if(_rate > 1){ _rate = 1; }
			try{
				assets.sounds[_name].rate(0.5 + 3.5*_rate);
			}catch(e){}
		}
		
		if(_sprite){
			assets.sounds[_name].play(_sprite);
		}else{
			assets.sounds[_name].play();
		}

}
export const fadeSound = (_name, _from, _to, _tm) =>{

		assets.sounds[_name].fade(_from, _to, _tm);

}

export default {	
	SaveObject,
	RebootObject,
	PlaySound,
	SortZ,	
	RandomCash,
	Random,
	MixArray,
	isSafari
};