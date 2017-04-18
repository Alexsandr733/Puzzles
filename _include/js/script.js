  $(document).ready(function() {
    // При загрузке страницы выполнится весь написанный здесь код
    function getRandom(){
      return Math.round(Math.random() * (8 - 0) + 0);
    }
  //     for (var i=0; i<=10;i++){
  //   alert(getRandom());
  // }
    var pozitions = {
    };

    function imagesCreate () {

      var pictureNames = [];
      var pozition;
      pozition=565;
      var images = '';
      var imagesurl = '';
      for (var i=0; i<=8;i++){

        // считаем номер картинки

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

        var pushed = pictureNames.push(images);

        var r = getRandom();
        console.log(r, pictureNames[r]);
      //  alert(r);
      //  alert(pictureNames[r]);

        // меняем позицию div и задаём фон
        if (i==3 || i==6){
        pozition=565;
        }
        $(".elements").append('<div class="picture"></div>');
        if(i>2){
          $(".picture").eq(i).css('top',140);//820
        }
        if(i>5){
          $(".picture").eq(i).css('top',270);//690
          }
          imagesurl = '_include/img/'+images+'.png';
          $(".picture").eq(i).css('left',pozition).css( "background-image", "url('"+imagesurl+"')");
          //.css( "background-image", "url('_include/img/0_0.png')");
          // .css( "background-image", "url('"+imagesurl+"')");
        // .css( "background-image", "url('_include/img/0_0.png')");
          pozition+=130;
        }


    }

    imagesCreate();

  });
