import appMc from './appMc.js';
import * as API	from './innerApi.js';
import * as MAIN from './mainFnc.js';
import AppResize from './appresize.js';

let tmDebug = 0;
let toRAD=Math.PI/180;
export const StageEF = () => {
	appObj = window.appObj;
	
	appObj.time_current = performance.now();				
	if(appObj.time_current - appObj.time_old > 25){
		if(!appMc.pauseGlobal){
			appObj.time_old = appObj.time_current;
			// 33 - 30 fps
			// 16 - 60 fps
			
			var i,j,k,d,a, _a;
			let heroPos;
			let objTemp, objTempHero, obj;
			var objTempExtra;

			appMc.App.update();			
		}
				
		//- PIXI RENDER
		
		window.renderer.render(window.stage);
				
		//- RESIZE
		let objTemp; 
		objTemp = appObj;
		
		objTemp.tm_resize++;
		if(objTemp.tm_resize == 10){
			objTemp.tm_resize = 0;
			
			if(objTemp.mainWidth != Math.ceil(window.innerWidth) || objTemp.mainHeight != Math.ceil(window.innerHeight)){
				AppResize();
			}
		}
	}
	
	//- RAF
	window.requestAnimationFrame(StageEF);

}

