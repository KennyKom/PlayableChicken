import appMc from './appMc.js';
import * as API	from './innerApi.js';
import * as MAIN from './mainFnc.js';
import * as EVENT from './events.js';
import {assets} from './loader.js';
import {ClickAd}	from './clickAd.js';



const InitBasicObj = () => {

	let i,j, objTemp;	
	
	//- 2D WORLD
	
	//- mcMain
	
	appMc.mcMain = new API.createContainer({p:window.stage});
	appMc.mcMain.visible=false;		

		appMc.mcGame = new API.createContainer({p:appMc.mcMain});	

			appMc.mcBg = new API.createSprite({p:appMc.mcGame, tex:"bg"});
					
		appMc.mcUI = new API.createContainer({p:appMc.mcMain});				

		appMc.mcUI.shakeAX = 0;
		appMc.mcUI.shakeAY = 0;
		appMc.mcUI.shakeD = 0;	
		
			//- mcBgOverlay
			appMc.mcBgOverlay = new API.createRect({
				p:appMc.mcUI, 
				x:-1280*.5,
				y:-1280*.5,
				color:0x000000,
				width:1280,
				height:1280,
				fill:1.0,
				alpha:0.0
			});				

			//- mcBgFS		
			appMc.mcBgFS = new API.createRect({
				p:appMc.mcUI, 
				x:-1280*.5,
				y:-1280*.5,
				color:0x000000,
				width:1280,
				height:1280,
				alpha:0.0,
				visible:false
			});	
			appMc.mcBgFS.name = "end_install";	

			//- mcBtnSound	
			appMc.mcBtnSound = new API.createContainer({p:appMc.mcUI, visible:true});
				appMc.mcBtnSoundB = new API.createSprite({p:appMc.mcBtnSound, tex:"btn_sound_on"});

				appMc.mcBtnSound.interactive = true;				
				appMc.mcBtnSound.on('pointerup', MAIN.BtnGlobalSound);	

	
	//-----------------------------------------------
	//- GAME
	
	
	//-----------------------------------------------
	//- SETTINGS
	
	//-----------------------------------------------
	//- SAVING OBJ

	//-----------------------------------------------
	//- EVENT
	
	appMc.mcBgOverlay.interactive = true;				
	appMc.mcBgOverlay.on('pointerdown', EVENT.StageDown);
	appMc.mcBgOverlay.on('pointermove', EVENT.StageMove);
	appMc.mcBgOverlay.on('pointerup', EVENT.StageUp);
	appMc.mcBgOverlay.on('pointerout', EVENT.StageUp);
	appMc.mcBgOverlay.on('pointeroutside', EVENT.StageUp);
	appMc.mcBgOverlay.on('touchendoutside', EVENT.StageUp);
	
	appMc.mcBgFS.interactive = true;				
	appMc.mcBgFS.on('pointerup', ClickAd);



}

export default InitBasicObj;