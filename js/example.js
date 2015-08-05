
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
	$(".canvas").addClass("hide");
	$("#ask-options").removeClass("hide");
	$("#add-option").click(function() {
		addOption($("#option").val());
		optionsArray.push($("#option").val());
		$("#option").val("");

	});
	$("#start-wheel").click(function() {
		$.localStorage.set("options", optionsArray);
		$("#ask-options").addClass("hide");
		callback(optionsArray);
	});
}
var removeOption = function() {
	var parent = $(this).parent();
	var option = parent.find(".value").text();
	var newOptions = [];
	console.log(optionsArray);
	console.log(option);
	for (var idx in optionsArray) {
		if (optionsArray[idx] != option) {
			newOptions.push(optionsArray[idx]);
		}
	}
	optionsArray = newOptions;
	console.log(optionsArray);
	$.localStorage.set("options", optionsArray);
	parent.remove();
	if (newOptions.length) {
		startWheel(newOptions);
	} else {
		askForOptions(startWheel);
	}
}
var addOption = function(option) {
	var container = $("#options-template").clone();
	container.find(".value").text(option);
	container.attr("id", "");

	container.find("a").click(removeOption);
	$("#options").append(container);
	container.removeClass("hide");
}
var optionsArray;
$(document).ready(function(){
	resize();
	$(window).resize(resize);

	optionsArray = getOptionsArray();
	if (optionsArray.length) {
		for (var idx in optionsArray) {
			addOption(optionsArray[idx]);
		}
		startWheel(optionsArray);
	} else {
		askForOptions(startWheel);
	}

	$("#clear-options").click(function() {
		$.localStorage.remove("options");
		$(".option").each(function() {
				$(this).remove();
		});
		askForOptions(startWheel);
	});
});
