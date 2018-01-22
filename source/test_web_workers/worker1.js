	
function calc(){				

	var x,
	y,
	acc = 0.01,
	step = 0.01,
	a = acc*10, 
	b = acc*10,
	max = 999,
	min = -999;
	function foo1(x,y){
		return (6*y/x) + 16 - x;
	}
	function foo2(x,y){
		return (6*x/y) + 16 - y;
	}
	y =min;
	x= min;
	do{
		a = foo1(x,y);
		b = foo2(x,y);
		x+=step;
		if (x > max){
			y += step;
			x = min;
		}
	// console.log("x = ", x, "y = ", y);
}
while (!(a > -acc && a < acc && b > -acc && b < acc));
	// console.log("xFinal = ", x, "yFinal = ", y);
	return (x + "_worker1_" + y)
}

addEventListener("message", function(){
	postMessage(calc())
}, false)