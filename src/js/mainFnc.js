import appMc from './appMc.js';
import * as API	from './innerApi.js';
import * as EVENT from './events.js';
import {assets} from './loader.js';
import {ClickAd}	from './clickAd.js';
import {App}	from './app.js';


let i, j, objTemp;


//-------------------------------

export const worldCreate=()=>{
	appObj = window.appObj;

	appMc.App = new App();
	appMc.App.main = appMc.mcArea;
	appMc.App.init();

	console.log("Playable loaded");
}


export const EndGame = (state) =>{
	let i, objTemp;
	if(appMc.stateGame != 10){
		appMc.stateGame = 10;

		appMc.mouse.isDown = false;
		appMc.mcBgFS.visible = true;
	}				
}

export const BtnGlobalSound =(e) =>{
	if(appMc.isGlobalSound){
		appMc.isGlobalSound = false;
		
		appMc.mcBtnSoundB.texture = assets.textures.pixi["btn_sound_off"];
		console.log("Sound off");
		
		Howler.mute(true);
		
	}else{
		appMc.isGlobalSound = true;
	
		appMc.mcBtnSoundB.texture = assets.textures.pixi["btn_sound_on"];
		console.log("Sound on");
		Howler.mute(false);
	}			
}
