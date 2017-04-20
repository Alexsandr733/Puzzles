  $(document).ready(function() {
  // При загрузке страницы выполнится весь написанный здесь код

  function getRandom(min, max){
    return Math.round(Math.random() * (max - min) + min);
  }

  function detect (obj){
    var png = [];
    var cell = [];
    for( var i = 1; i <= 9; i++){
      var massi = i-1;
      png[massi] =   $(".picture").eq(massi);
      cell[massi] =  $(".pazzl").eq(massi);
    }
    obj.picture = png;
    obj.pazzle = cell;
  }
  detect (data);

  function randomPoz (obj) {
    var imagesurl = '';
    var images = '';
    for (var i=0; i<=8;i++){
      var randX = getRandom(510, 770);
      var randY = getRandom(10, 270);
      // генерируем имя картинки
      var iter=0;
      if(i>=0 && i<=2){
        images = '0_'+i;
      }
      if(i>=3 && i<=5){
        iter=i-3;
        images='1_'+iter;
      }
      if(i>=6 && i<=8){
        iter=i-6;
        images='2_'+iter;
      }
      imagesurl = '_include/img/'+images+'.png';
      console.log(images);
      obj.picture[i].css({left: randX, top: randY}).css( "background-image", "url('"+imagesurl+"')");
    }
  }
randomPoz (data);

});
