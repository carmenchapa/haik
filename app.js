
var advert, preloader, progress, progressBar, counter;

window.onload = function() {
	canvas = document.getElementById('main');
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

	setElements();
	adVisibilityHandler();	
};

function enablerInitHandler() {

 //    Enabler.setProfileId(1115102);
 //    var devDynamicContent = {};

 //    devDynamicContent.Feed_300x600= [{}];
 //    devDynamicContent.Feed_300x600[0]._id = 0;
 //    devDynamicContent.Feed_300x600[0].id = 1;
 //    devDynamicContent.Feed_300x600[0].DEFAULT= true;
 //    devDynamicContent.Feed_300x600[0].ACTIVE = true;
 //    devDynamicContent.Feed_300x600[0].ReportingLabel = "ReportingLabel";
 //    devDynamicContent.Feed_300x600[0].ClickTag = {};
 //    devDynamicContent.Feed_300x600[0].ClickTag.Url = "https://www.sky.com/";
 //    devDynamicContent.Feed_300x600[0].StartDate = {};
 //    devDynamicContent.Feed_300x600[0].StartDate.RawValue = "";
 //    devDynamicContent.Feed_300x600[0].StartDate.UtcValue = 0;
 //    devDynamicContent.Feed_300x600[0].EndDate = {};
 //    devDynamicContent.Feed_300x600[0].EndDate.RawValue = "";
 //    devDynamicContent.Feed_300x600[0].EndDate.UtcValue = 0;
    
	// devDynamicContent.Feed_300x600[0].content = {
		

	// 	"cta.png":{"Type":"file","Url":"assets/cta.png"},
	
    // devDynamicContent.Feed_300x600[0].LegalButton = "Legal bits";
    // devDynamicContent.Feed_300x600[0].LegalCopy = "TBC";
    // Enabler.setDevDynamicContent(devDynamicContent);   
}
function setElements(){
		$('#container').css({"width":canvas.width,"height":canvas.height})
		$('.preloader').delay(1250).fadeOut('slow');
		$('.preloader-wrapper').delay(1250);
		$('.progress').css({'top':canvas.height});
		
}

function adVisibilityHandler() {

	var queue = new createjs.LoadQueue(true);
	
	queue.on('complete', handleAllImagesLoaded, this);
	
	// queue.loadFile({id:"cta", src: dynamicContent.Feed_300x600[0].content['cta.png'].Url });

	queue.loadFile({id:"cta", src: "assets/cta.png"});
	
	function handleAllImagesLoaded() {
		console.log('All images loaded');

			$('.preloader').fadeOut(function(){
				var assets = new Assets(queue);
            	var main = new Main(assets);
			})
		// document.getElementById('bg-exit').addEventListener('click', bgExitHandler, false);
	}
}

// function bgExitHandler() {
//     var exitId = 'Primary Exit';
//     // var dynamicExitUrl = dynamicContent.Feed_300x600[0].ClickTag.Url;

//     if (dynamicExitUrl) {
//         Enabler.exitOverride(exitId, dynamicExitUrl);
//     } else {
//         Enabler.exit(exitId);
//     }
// }

function Assets(queue) {
console.log('assets');	
	var assets = {};

	assets.cta = {};
	assets.cta.img = queue.getResult("cta");
	
	return assets;
}

function Main(assets) {
console.log('main');
	var stage = new createjs.Stage("main");
	var progress = new ProgressBar();
	var legals = new SkyLegals();
	
	var currentFrame = null,
		framePointer = null,
		framesArray = [];
		
	// var background = new createjs.Bitmap(assets.bg.img);
	var background = new createjs.Shape();
 	background.graphics.beginFill("#80cbc4").drawRect(0, 0, window.innerWidth, window.innerHeight);
	
	stage.addChild(background);
	console.log('main');
	var frame_01 = new Frame01(stage, assets);
	framesArray.push(frame_01);
	
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.setInterval(25);
	createjs.Ticker.setFPS(40);
	stage.update();
	
	/*Start Banner*/
	console.log('start');
	handleNextFrame();  
	
	function handleNextFrame(){
		if (currentFrame === null) {
			framePointer = 0;
		} else if (framePointer !== framesArray.length -1) {
			framePointer++;
		}else {
			createjs.Ticker.removeEventListener("tick");
			return;
		}
		currentFrame = framesArray[framePointer];
		currentFrame.animate(handleNextFrame);
	}
}

function ProgressBar(){
	console.log('progress');
	progress = document.getElementById('progress');
	progressBar = document.getElementById('determinate');
	setTimeout(function(){
		progress.style.top = '70px';
		
	},1000)
	
}

function Frame01(stage, assets) {
	console.log('f1');

	var cta = new createjs.Bitmap(assets.cta.img);
	$(cta).css("z-index", "2");
	cta.width = 100;
	cta.height = 203;
	cta.x = window.innerWidth / 2;
	cta.y = window.innerHeight - 120;
	cta.regX = cta.width / 2;
	cta.regY = cta.height / 2;
	cta.alpha = 0;
	
	

	this.animate = function(animationComplete) { 
		stage.addChild(cta);
		
		// createjs.Tween.get(cta).to({alpha: 1},500).wait(300).to({ y: cta.y - 20 },250).to({y: cta.y},250);;
		createjs.Tween.get(cta).to({alpha: 1},400).wait(300).to({ y: cta.y - 50 },250, createjs.Ease.circIn).to({y: cta.y},250, createjs.Ease.circOut);

		
		TweenLite.delayedCall(26, function(){
			animationComplete();
		});
	};

	//moof thing
	// var firstPosX = cta.x;
	// var firstPosY = cta.y;

		var startX, startY;
		counter = 0;
		//$('#main').mousedown(function(e){
		$('#main').bind("mousedown touchstart", function(e){
			console.log(e.type=='touchstart');
			console.log(e.type=='mousedown');
			e.preventDefault();
			if(e.type=='touchstart'){
				var touch = e.originalEvent.touches[0];
		  		startX = touch.clientX;
		  		startY = touch.clientY;
			}else if(e.type=='mousedown'){
		  		startX = e.clientX;
		  		startY = e.clientY;
			}
		  console.log('sart x: ' + startX + ' start y: ' + startY);  
		})

		//$('#main').mouseup(function(e){
		$('#main').bind("mouseup touchend",function(e){
			e.preventDefault();
			if(e.type=='touchend'){
				  var touch = e.originalEvent.changedTouches[0];
				  var endX = touch.clientX;
				  var endY = touch.clientY;
			}else if(e.type=='mouseup'){
				  var endX = e.clientX;
		  		  var endY = e.clientY;			
			}
		  var deltaX = endX - startX;
		  var deltaY = endY - startY;
		  console.log('end x: ' + endX + ' end y: ' + endY);  
		  console.log ("deltaX: " + deltaX + ' deltaY, ' + deltaY);
		  
    	  console.log("Top: " + cta.x + " Left: " + cta.y);

		  if(deltaY<0){
		  	createjs.Tween.get(cta).wait(100).to({x:(deltaX + cta.x), y:(deltaY*0.5 + cta.y)},createjs.Ease.cubicInOut(5));
		  	counter += 2;
		  	console.log('counter: ' + counter);
		  	progressBar.style.width = 100 - counter + '%';
		  }else{
		  	createjs.Tween.get(cta).wait(100).to({x:(deltaX + cta.x), y:(deltaY*1.25 + cta.y)},createjs.Ease.cubicInOut(5));
			counter += 1;
		  	console.log('counter: ' + counter);
		  	progressBar.style.width = 100 - counter + '%';
		  }
		})
}

function SkyLegals() {
	var legalsContainer = document.getElementById('legalsContainer'),
	legalsButton = document.getElementById('legalsButton'),
	legalsCopy = document.getElementById('legalsCopy');
	// legalsClose = document.getElementById('legalsClose');

	legalsCopy.innerHTML = "©HAIK. All Rights Reserved.";//
	// legalsCopy.innerHTML = dynamicContent.Feed_300x600[0].LegalCopy;
	legalsButton.innerHTML = "Something Here";//
	// legalsButton.innerHTML = dynamicContent.Feed_300x600[0].LegalButton;

	var outerWidth = document.getElementById('main').offsetWidth;
	var outerHeight = document.getElementById('main').offsetHeight;

	legalsContainer.style.top = outerHeight + 'px';
	legalsCopy.style['max-height'] = (outerHeight - 30) + 'px';
	// legalsClose.style.left = (outerWidth - 21) + 'px';

	legalsButton.addEventListener('click', handleClick);
	$('#main').bind('click touchstart', handleClose);

	function handleClick() {
		TweenMax.to(legalsContainer, 0.5, {
			ease: Cubic.easeInOut,
			top: outerHeight - document.getElementById('legalsCopy').offsetHeight
		});

		legalsButton.style.visibility = 'hidden';
	}

	function handleClose() {
		TweenMax.to(legalsContainer, 0.5, {
			ease: Cubic.easeInOut,
			top: outerHeight
		});

		legalsButton.style.visibility = 'visible';
	}
}