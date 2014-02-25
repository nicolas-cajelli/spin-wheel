var pplArrayT = [];
for (var k in optionsArray) {
    var pos = parseInt(k) + 1;
    pplArrayT.push(pos.toString());
}

$(document).ready(function(){
   $('.canvas').spinwheel({
       pplArray : pplArrayT
   });
});
