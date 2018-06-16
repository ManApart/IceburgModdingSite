

function animatePieChartIn(canvasElement, dataArray, colorArray, step) {
	step++;
	
	var context = canvasElement.getContext("2d");
	
	properlySizeCanvas(canvasElement);
	
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);

	var total = getTotal(dataArray);
	//Start at top instead of side
	var lastend = -Math.PI/2;
	var j=-1;
	//give a padding to the edges, so we can increase radius for active slice without being cut off
	var border = 0.05* canvasElement.width;
	var initialRadius = (canvasElement.width / 2) - border;
	var center = initialRadius + border;
	
	for (var i = 0; i < dataArray.length; i++) {
		
		//get the percent of the final radius, staggerd for each slice
		var stepPercent = getStepPercent(step, i);
		
		var radius = initialRadius* stepPercent;
		
		j++;
		if (j == colorArray.length){
			j = 0;
		}
		context.fillStyle = colorArray[j];
		context.beginPath();
		
		context.moveTo(center, center);
		var nextAngle = Math.PI*2*(dataArray[i]/total);
		context.arc(center,center,radius,lastend,lastend + nextAngle,false);
		context.lineTo(center,center);
		context.fill();
		lastend += nextAngle;

	}
	// until we hit our 100th frame (plus time for the other slices to catch up), keep drawing
	if (step < 100+ dataArray.length){
		window.requestAnimationFrame(function(){
			animatePieChartIn(canvasElement, dataArray, colorArray, step);
		});
	} else{
		createPieChart(canvasElement, dataArray, colorArray, -1)
	}
}

function properlySizeCanvas(canvasElement){
	//properly size canvas
	var cs = getComputedStyle(canvasElement.parentElement);

	/// these will return dimensions in *pixel* regardless of what
	/// you originally specified for image:
	var width = parseInt(cs.getPropertyValue('width'), 10);
	var height = width;
//	var height = parseInt(cs.getPropertyValue('height'), 10);

	/// now use this as width and height for your canvas element:
	canvasElement.width = width;
	canvasElement.height = height;
}

//function to add repeatable noise to the zoom
function getStepPercent(step, i){
	var progress = step-i;
	var dist = 100-step;
	if (i % 2 == 0){
		progress -= (dist/10);
	} 
	if (i % 3 == 0){
		progress -= (dist/8);
	}
	if (progress < 0){
		progress = 0;
	}
	var stepPercent = progress/100;
	if (stepPercent > 1){
		stepPercent = 1;
	}
	return stepPercent;
}

function createPieChart(canvasElement, dataArray, colorArray, activeIndex) {
	properlySizeCanvas(canvasElement);
	var context = canvasElement.getContext("2d");
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);
	
	var total = getTotal(dataArray);
	//Start at top instead of side
	var lastend = -Math.PI/2;
	var j=-1;
	//give a padding to the edges, so we can increase radius for active slice without being cut off
	var border = 0.05* canvasElement.width;
	var radius = (canvasElement.width / 2) - border;
	var center = radius + border;
	for (var i = 0; i < dataArray.length; i++) {
		j++;
		if (j == colorArray.length){
			j = 0;
		}
		context.fillStyle = colorArray[j];
		context.beginPath();
		
		var radiusBoost = 0;
		if (i == activeIndex){
			radiusBoost += border;
		}
		
		context.moveTo(center, center);
		var nextAngle = Math.PI*2*(dataArray[i]/total);
		context.arc(center,center,radius + radiusBoost,lastend,lastend + nextAngle,false);
		context.lineTo(center,center);
		context.fill();
		lastend += nextAngle;
		
	}
	addClickAreas(canvasElement, dataArray, colorArray, total);
	
	//update the mod controller as to who was the last slice
	modsCtrl.getStats().index =activeIndex;
	modsCtrl.updateAsync();
}

function addClickAreas(canvasElement, dataArray, colorArray, total){
	canvasElement.onmousemove = function(e) {
//		canvasElement.onclick = function(e) {

		var context = canvasElement.getContext("2d");
		var radius = canvasElement.width / 2;
		var lastend = -Math.PI/2;
		for (var i = 0; i < dataArray.length; i++) {
			context.beginPath();
			context.moveTo(radius,radius);
			var nextAngle = Math.PI*2*(dataArray[i]/total);
			context.arc(radius,radius,radius,lastend,lastend + nextAngle,false);
			context.lineTo(radius,radius);
			lastend += nextAngle;
			
			var rect = canvasElement.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			if(context.isPointInPath(x,y)){
				//don't needlessly redraw
				if (i == modsCtrl.getStats().index){
					return;
				}
				console.log("Slice " + i);
				createPieChart(canvasElement, dataArray, colorArray, i);
				return;
			}
		}
		//don't needlessly redraw
		if (modsCtrl.getStats().index != -1){
			createPieChart(canvasElement, dataArray, colorArray, -1);
		}
    } 
}


function getTotal(dataArray){
	var total = 0;
	for (var i=0; i< dataArray.length; i++) {
		if (typeof dataArray[i] == 'number'){
			total += dataArray[i];
		}
	}
	return total;
}

function test(){
	var colors2 = ["#ECD078","#D95B43","#C02942","#542437","#53777A"];
	var data2 = [10,30,20,60,40];
	var canvas = document.getElementById("modChart");
	createPieChart(canvas, data2, colors2);
}