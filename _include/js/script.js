  $(document).ready(function() {
  //   // При загрузке страницы выполнится весь написанный здесь код
  var check = [];

  var data = {
    button:$('.ready'),
    checkMass:check =[]
  };



  function getRandom(min, max){
    return Math.round(Math.random() * (max - min) + min);
  }

  function detect (){
    var png = [];
    var cell = [];
    for( var i = 1; i <= 9; i++){
      var massi = i-1;
      png[massi] =   $(".picture").eq(massi);
      cell[massi] =  $(".pazzl").eq(massi);
    }
      console.log(png);
      console.log(cell);
    data.picture = png;
    data.pazzle = cell;
  }
  detect ();

  function randomPoz () {
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
      //var step = i+9;
      imagesurl = '_include/img/'+images+'.png';
      console.log(images);
      data.picture[i].css({left: randX, top: randY}).css( "background-image", "url('"+imagesurl+"')");

    }
  }
  randomPoz ();


});
