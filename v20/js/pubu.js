	   

function show () {
	var margin = 10;
	var boxes = document.getElementsByClassName('imgShow');
	var con = document.getElementsByClassName('container');
	var boxWidth = boxes[0].offsetWidth+margin;
	var columnHeight=[];
	var bodyWidth = document.body.offsetWidth;
	var n = parseInt(bodyWidth/boxWidth);
	var columnNum = n==0?1:n;
	var bodyLeft = bodyWidth>=boxWidth?bodyWidth-columnNum*boxWidth:0;
	con[0].style.left = parseInt(bodyLeft/2)-margin/2+'px';
	for (var i = 0,l=boxes.length; i <l ; i++) {
		if (i<columnNum) {
			columnHeight[i]=boxes[i].offsetHeight+margin;
			boxes[i].style.top = 0;
			boxes[i].style.left = i*boxWidth+margin+'px';
		} else{
			var innsertColumn = min(columnHeight),
				imgHeight = boxes[i].offsetHeight+margin;
			boxes[i].style.top = columnHeight[innsertColumn]+'px';
			boxes[i].style.left = innsertColumn*boxWidth+margin+'px';
			columnHeight[innsertColumn] +=imgHeight; 
		};

	};
};
function min (heightAarry) {
	var minColumn = 0;
	var minHeight = heightAarry[minColumn];
	for (var i = 1,len=heightAarry.length; i < len; i++) {
		var temp = heightAarry[i];
		if (temp < minHeight) {
			minColumn = i;
			minHeight = temp;
		};
	};
	return minColumn;
}

window.onresize = function(){show();};