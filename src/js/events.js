import appMc from './appMc.js';
import * as API from './innerApi.js';
import * as MAIN from './mainFnc.js';
import AppResize from './appresize.js';



export const StageDown = (e) =>{			
	appMc.numGlobalClick++;
		
	if(appMc.pauseGlobal){
		appMc.pauseGlobal = false;
		try{ gsap.globalTimeline.resume() }catch(e){}	
	}

	appMc.mouse.isDown = true;		
	
	if(appMc.stateGame == 0){
		appMc.stateGame = 1;		
		if(!appMc.firstClick){
			appMc.firstClick = true;
			console.log("First click");
		}	
		soundCheck();	
	}
}
export const StageMove = (e) =>{
	
}			
export const StageUp = (e) =>{		
	appMc.mouse.isDown = false;	
}
export const soundCheck = ()=>{
	if(!appMc.isGlobalActive){
		appMc.isGlobalActive = true;
		appMc.isGlobalSound = true;
		Howler.mute(!appMc.isGlobalSound);	
	}
}
