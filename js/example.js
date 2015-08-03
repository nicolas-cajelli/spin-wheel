
var resize = function() {

   var size;

   if (window.innerWidth > window.innerHeight) {
	   size = window.innerHeight;
	} else {
		size = window.innerWidth;
	}
   $(".canvas").width(size);
   $(".canvas").height(size);
}

var startWheel = function(optionsArray) {
	var pplArrayT = [];
	for (var k in optionsArray) {
		pplArrayT.push(optionsArray[k]);
	}
	$(".canvas").removeClass("hide");
	$('.canvas').spinwheel({
		pplArray : pplArrayT
	});

}
var getOptionsArray = function() {
	if ($.localStorage.get("options")) {
		return $.localStorage.get("options");
	} else {
		return [];
	}
}

var askForOptions = function(callback) {
	$("#ask-options").removeClass("hide");
	var optionsArray = [];
	$("#add-option").click(function() {
		optionsArray.push($("#option").val());
		$("#option").val("");

	});
	$("#start-wheel").click(function() {
		$.localStorage.set("options", optionsArray);
		$("#ask-options").addClass("hide");
		callback(optionsArray);
	});
}
$(document).ready(function(){
	resize();
	$(window).resize(resize);

	var optionsArray = getOptionsArray();
	if (optionsArray.length) {
		startWheel(optionsArray);
	} else {
		askForOptions(startWheel);
	}
});
