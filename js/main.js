var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var api = {
	size: 0,
	objects: [],
	keys: [],
	variables: [],
	createObject: function(name) {
		api.objects.push({name:name,x:0,y:0,color:"black"});
		api.render();
	},
	deleteObject: function(name) {
		api.objects.forEach(function(item, idx){
			if(item.name === name){
		    	api.objects.splice(idx, 1);
			}
		});
		api.render();
	},
	colorObject: function(name, color){
		api.objects.forEach(function(item, idx){
			if(item.name === name){
				item.color = color;
				console.log(item.color)
			}
		});
		api.render();
	},
	moveObject: function(name, x, y){
		api.objects.forEach(function(item, idx){
			if(item.name === name){
		    	
		    	item.x = Number(x);
			}
		});
		api.objects.forEach(function(item, idx){
			if(item.name === name){
		    	item.y = Number(y);
			}
		});
		api.render();
	},
	testKey: function(keyCode){
		return api.keys[keyCode] === true ? true : false;
	},
	createVariable: function(name, value){
		api.variables[name] = value;
		api.render();
	},
	render: function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		init(api.size)
		api.objects.forEach(function(item){
			ctx.fillStyle = item.color;
			ctx.fillRect(item.x * api.size + 1, item.y * api.size + 1, api.size - 2, api.size - 2);
		});
	}
}

function init(size){
	api.size = size;
	for(var i = 0;i < canvas.width / size; i++){
		ctx.beginPath();
		ctx.moveTo(size * i, 0);
		ctx.lineTo(size * i, canvas.height);
		ctx.stroke();
	}
	for(var i = 0;i < canvas.height / size; i++){
		ctx.beginPath();
		ctx.moveTo(0, size * i);
		ctx.lineTo(canvas.width, size * i);
		ctx.stroke();
	}
}

function parseCode(code){
	console.log(code.substring(code.indexOf("[") + 1, code.indexOf("|")));
	console.log(code.substring(code.indexOf("|") + 1, code.lastIndexOf("|")));
	console.log(code.substring(code.lastIndexOf("|")+ 1, code.indexOf("]")));
	switch (code.substring(0, code.indexOf("["))) {
		case "+":
			api.createObject(code.substring(code.indexOf("[") + 1, code.indexOf("]")));
			break;
		case "-":
			api.deleteObject(code.substring(code.indexOf("[") + 1, code.indexOf("]")));
			break;
		case "&":
			api.colorObject(code.substring(code.indexOf("[")+ 1, code.indexOf("|")),code.substring(code.indexOf("|")+ 1, code.indexOf("]")));
			break;
		case "#":
			api.moveObject(code.substring(code.indexOf("[")+ 1, code.indexOf("|")),code.substring(code.indexOf("|")+ 1, code.lastIndexOf("|")),code.substring(code.lastIndexOf("|")+ 1, code.indexOf("]")));
			break;
		case "&":
			api.colorObject(code.substring(code.indexOf("["), code.indexOf("|")),code.substring(code.indexOf("|"), code.indexOf("]")));
			break;
    }
}

function run(){
	var code = document.getElementById("code").value;
	var codearr = code.split("\n");
	parseProgram(codearr);
}

function parseProgram(arr){
	arr.map(function(a){
		return parseCode(a);
	})
	console.log(arr);
}

window.addEventListener("keydown", function(e) {
	api.keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
	api.keys[e.keyCode] = false;
});