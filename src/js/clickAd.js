const ad_conf = require('../../ad_conf.js');
export const ClickAd = (e) =>{
	
	if(e != undefined){
		if(e.target.name == "game_install"){
			console.log("Install");
		}
		else{
			console.log("Install_full_screen");
		}
	}
	let url;	
	if((/iphone|ipad|ipod/i).test(window.navigator.userAgent.toLowerCase()) || (navigator.platform === "MacIntel" && typeof navigator.standalone !== "undefined")) {						
		url = ad_conf.scripts.ios;
	}else{
		url = ad_conf.scripts.gplay;
	}

	if(ad_conf.scripts.type !="build"){
		console.log("Click");
	}
	else{
		window.open(url);		
	}	
}

