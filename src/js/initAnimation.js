import appMc from './appMc.js';
import * as API	from './innerApi.js';
import {worldCreate} from './mainFnc.js';

const ad_conf = require('../../ad_conf.js');
export const InitAnimation = () =>{
	let i, objTemp;			
	//- Animation
	
	appMc.mcMain.visible=true;
	document.getElementById('main').style.visibility = "visible";
	document.getElementById('progress').style.display = "none";

	worldCreate();	

	API.playSound("bg",0.3);
}
