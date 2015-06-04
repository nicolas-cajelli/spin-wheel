var pplArrayT = [];
for (var k in optionsArray) {
    pplArrayT.push(optionsArray[k]);
}

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

$(document).ready(function(){
    resize();
   $(window).resize(resize);
   $('.canvas').spinwheel({
       pplArray : pplArrayT
   });
});
