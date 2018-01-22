		//module pattern main Obj
		var App = App || {};
		App.define = function (namespace) {
			var parts = namespace.split("."),
			parent = App,
			i;
			if (parts[0] == "App") {
				parts = parts.slice(1);
			}
			for (i = 0; i < parts.length; i++) {
				if (typeof parent[parts[i]] == "undefined") {
					parent[parts[i]] = {};
				}
				parent = parent[parts[i]];
			}
			return parent;
		}

		App.define("utils");
		App.utils = (function(){	

			function swap(a, x, y){
				if (a.length === 1) {return a};
				a.splice(y, 1, a.splice(x, 1, a[y])[0]);
				return a;
			}
			function getRandom(min, max){
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			function arrayRandom(length, min, max){
				var arr = [];
				for (var i = 0; i < length; i++) {
					arr[i] = App.utils.getRandom(min, max);
				}
				return 	arr
			}
			
			return{
				swap:swap,
				getRandom:getRandom,
				arrayRandom:arrayRandom
			}
		}());

		App.define("sortAlgorithms");
		App.sortAlgorithms = (function(){

			// var arrayConst = [3, 2, 5, 1, 8, 9, 7, 45, -4,89,-455545,105,784,425,-8454,-88,122,84,4,-15,854,54444,-145,-44554,484,544,84,54,-58,74,7,44,-4,7,41];
			var arrayConst = [3,2,7,20,11,15];
			var constantRandomArr = App.utils.arrayRandom(100, -99999, 99999);
			function sortChoice(arr){
				var i, j, min, var1;
				for (i = 0; i < arr.length-1; i++) {
					min = i;
					for (j = i + 1; j < arr.length; j++) {
						if (arr[j] < arr[min]) {
							min = j;
						}
					}
					if (min != i) {
						App.utils.swap(arr, i, min);
					}
				}
				return arr
			}
			function sortBubble(arr){
				var counter, j;
				for (counter =1; counter > 0;) {
					counter = 0;
					for (j = 0; j < arr.length; j++) {
						if (arr[j] > arr[j+1]){
							App.utils.swap(arr, j, j + 1);
							counter++;
						}
					}
				}
				return arr;
			}

			function sortInsert(arr){
				var i, j, element;
				for (i = 0; i < arr.length; i++) {
					element = arr[i];
					for (j = i; j > 0 && arr[j-1] > element; j--) {
						arr[j] = arr[j-1];
					}
					arr[j] = element;
				}
				return arr
			}
			return{
				constantRandomArr:constantRandomArr,
				array:arrayConst,
				// constantRandomArr:constantRandomArr,
				sortBubble:sortBubble,
				sortChoice:sortChoice,
				sortInsert:sortInsert
			}
		}());
	
// web worker
addEventListener("message", function () {
			postMessage(App.sortAlgorithms.sortChoice(App.sortAlgorithms.constantRandomArr));
	}, false);