
function getRandom(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function detect (obj){
  var png = [];
  var cell = [];
  for( var i = 0; i < 9; i++){
    png[i] = obj.content.find(".picture").eq(i);
    cell[i] = obj.content.find(".pazzl").eq(i);
  }
  obj.picture = png;
  obj.pazzle = cell;
}

function randomPoz (obj) {
  for (var z=0; z<=8;z++){
    var index = 0;
    for (var i=0; i<=2; i++){
      for (var j=0; j<=2; j++){

        var randX = getRandom(510, 770);
        var randY = getRandom(10, 270);

        obj.picture[index].addClass('pic' + i + "-" + j);
        obj.picture[index].css({left: randX, top: randY});

        index++;
      }
    }
  }
}
