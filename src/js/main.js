import * as API from './innerApi.js';
import InitBasicObj from './initBasicObj.js';
import {InitAnimation} from './initAnimation.js';
import {StageEF} from './stageEF.js';
import AppResize from './appresize.js';
import {loader} from './loader.js';
const ad_conf = require('../../ad_conf.js');
let i,j,k,n;

window.appObj={   
	time_old		: 0,
	time_current	: 0,
	tm_resize		: 0,
	mainWidth		: 0,
	mainHeight		: 0,	
	isGlobalSound	: false	
}


window.AppCanvas = document.createElement("canvas");
window.stage;
window.renderer;

Howler.mute(true);

//---------------------------------------------------------------------------------

window.onload = () =>{	
	LoadTextures();
}
//---------------------------------------------------------------------------------
const LoadTextures =()=>{	
	ProccesingInitPixi();
}
const ProccesingInitPixi=()=>{
	if(PIXI){
		try{
			API.InitPixi();
			setTimeout(loadAssets, 50);	
		}catch(e){
			setTimeout(ProccesingInitPixi, 200);
		}
	}else{
		setTimeout(ProccesingInitPixi, 200);
	}
}
const loadAssets = () =>{
	loader.load(ProccesingInitAd);	
}
const ProccesingInitAd=()=>{

		
	InitBasicObj();	
	//- Focus

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

	window.addEventListener("pagehide", API.canvasVisibilityChange, false);				
	window.addEventListener(visibilityChange, API.canvasVisibilityChange, false);
	window.addEventListener('blur', API.WindowOnBlur);
	window.addEventListener('focus', API.WindowOnFocus);
	
	InitGame();	

}	
const InitGame=()=>{
	
	//- Resize
	
	AppResize();
	window.addEventListener('resize', AppResize);
	
	//- Animation
	
	InitAnimation();
		
	//- EF
	
	StageEF();
			
}
