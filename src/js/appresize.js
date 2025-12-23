import appMc from './appMc.js';


const AppResize = (e) =>{
	let camera = window.camera3d;
	let appObj = window.appObj;
	appObj.mainWidth		= Math.ceil(window.innerWidth);
	appObj.mainHeight		= Math.ceil(window.innerHeight); 
	appObj.canvasWidth		= Math.ceil(1.5*window.innerWidth);
	appObj.canvasHeight		= Math.ceil(1.5*window.innerHeight); 
	
	window.renderer.view.style.width	= appObj.mainWidth+"px";
	window.renderer.view.style.height	= appObj.mainHeight+"px";							
	window.renderer.view.width			= appObj.canvasWidth;
	window.renderer.view.height		= appObj.canvasHeight;
	
	window.renderer.resize(appObj.canvasWidth, appObj.canvasHeight);
	
	window.stage.position.set(Math.ceil(appObj.canvasWidth*0.5), Math.ceil(appObj.canvasHeight*0.5));
		
						
	//- POSITION OBJ
	
	appMc.mcGame.scale.set(1, 1);	
	appMc.mcUI.scale.set(1, 1);	
	
	if(appObj.mainWidth<appObj.mainHeight){	
		
		appMc.mcGame.scale.x = appObj.canvasWidth/1280;
		appMc.mcGame.scale.y = appMc.mcGame.scale.x;
		if(appMc.mcGame.scale.y*1280 < appObj.canvasHeight){
			appMc.mcGame.scale.y = appObj.canvasHeight/1280;
			appMc.mcGame.scale.x = appMc.mcGame.scale.y;
		}
		
		appMc.mcUI.scale.x = appObj.canvasWidth/720;
		appMc.mcUI.scale.y = appMc.mcUI.scale.x;
		if(appMc.mcUI.scale.y*1280 > appObj.canvasHeight){
			appMc.mcUI.scale.y = appObj.canvasHeight/1280;
			appMc.mcUI.scale.x = appMc.mcUI.scale.y;
		}
					
		appMc.mcBgFS.scale.x = 0.1 + appObj.canvasWidth/1280/appMc.mcUI.scale.x;
		appMc.mcBgFS.scale.y = 0.1 + appObj.canvasHeight/1280/appMc.mcUI.scale.x;
		
		appMc.mcBgOverlay.scale.x = 0.1 + appObj.canvasWidth/1280/appMc.mcUI.scale.x;
		appMc.mcBgOverlay.scale.y = 0.1 + appObj.canvasHeight/1280/appMc.mcUI.scale.x;

		appMc.mcBtnSound.x = 30-appObj.canvasWidth*0.5/appMc.mcUI.scale.y;
		appMc.mcBtnSound.y = -30+appObj.canvasHeight*0.5/appMc.mcUI.scale.y;
		appMc.mcBtnSound.scale.set(0.5);	

	}else{
		
		appMc.mcGame.scale.x = appObj.canvasWidth/1280;
		appMc.mcGame.scale.y = appMc.mcGame.scale.x;
		if(appMc.mcGame.scale.y*1280 < appObj.canvasHeight){
			appMc.mcGame.scale.y = appObj.canvasHeight/1280;
			appMc.mcGame.scale.x = appMc.mcGame.scale.y;
		}
		
		appMc.mcUI.scale.x = appObj.canvasWidth/1280;
		appMc.mcUI.scale.y = appMc.mcUI.scale.x;	
		if(appMc.mcUI.scale.y*720 > appObj.canvasHeight){
			appMc.mcUI.scale.y = appObj.canvasHeight/720;
			appMc.mcUI.scale.x = appMc.mcUI.scale.y;
		}
		
		appMc.mcBgFS.scale.x = 0.1 + appObj.canvasWidth/1280/appMc.mcUI.scale.x;
		appMc.mcBgFS.scale.y = 0.1 + appObj.canvasHeight/1280/appMc.mcUI.scale.x;
		
		appMc.mcBgOverlay.scale.x = 0.1 + appObj.canvasWidth/1280/appMc.mcUI.scale.x;
		appMc.mcBgOverlay.scale.y = 0.1 + appObj.canvasHeight/1280/appMc.mcUI.scale.x;
	
		appMc.mcBtnSound.x = 40-appObj.canvasWidth*0.5/appMc.mcUI.scale.y;
		appMc.mcBtnSound.y = -40+appObj.canvasHeight*0.5/appMc.mcUI.scale.y;
		appMc.mcBtnSound.scale.set(0.55);
	}
}			
// Resize

export default AppResize;