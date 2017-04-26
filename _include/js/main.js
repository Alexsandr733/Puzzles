
  function getRandom(min, max){
    return Math.round(Math.random() * (max - min) + min);
  }

  function detect (obj){

    var png = [];
    var cell = [];
    for( var i = 0; i < 9; i++){

    png[i] = obj.content.find(".picture").eq(i);
    png[i].data({pos: png[i].position()});
    cell[i] = obj.content.find(".pazzl").eq(i);

    }

    obj.picture = png;
    obj.pazzle = cell;

  }

  function randomPoz (obj) {

    var index = 0;
    for (var i=0; i<=2; i++){
      for (var j=0; j<=2; j++){

        //var randX = getRandom(510, 770);
        //var randY = getRandom(10, 270);
        var pos = {left: getRandom(510, 770), top: getRandom(10, 270)};

        obj.picture[index].addClass('pic' + i + "-" + j);
        // obj.picture[index].css({left: randX, top: randY});
        // obj.picture[index].data({pos: obj.picture[index].position()});
        obj.picture[index].css(pos);
        obj.picture[index].data({pos: pos});

        //console.log(allPicture[index]);

        index++;
      }
    }
  }



  // начинаем двигать
  function drag (obj){

    var parents = obj.content;
    var elems = obj.allPicture;
    //var elems = obj.picture;
    var doc  = obj.doc;

    // События нажатия
    elems.on('mousedown', function(event) {

      var elem = $(this);
      var pos = {};

      // Запомнить позицию курсора относительно элемента
      pos.inner = {
        left: event.offsetX,
        top: event.offsetY
      };

      // Событие перетаскивания
      parents.on('mousemove', function(event) {

        // Позиция родителя относительно экрана
        pos.parents = parents.offset();

        // Позиция курсора относительно экрана
        pos.cursor = {
          left: event.pageX,
          top: event.pageY
        };

        // Новая позиция элемента
        pos.new_pos = {
          left: pos.cursor.left - pos.parents.left - pos.inner.left,
          top: pos.cursor.top - pos.parents.top - pos.inner.top
        };

        // Ограничение перемещения элемента
        if (pos.new_pos.left < 0){
          pos.new_pos.left = 0;
        }
        if (pos.new_pos.top < 0){
          pos.new_pos.top = 0;
        }

        var width = parents.outerWidth() - 120;
        var height =  parents.outerHeight() - 120;

        if (pos.new_pos.left > width){
          pos.new_pos.left = width;
        }
        if (pos.new_pos.top > height){
          pos.new_pos.top = height;
        }

        // находим центр элемента
        pos.centerX = pos.new_pos.left + 60;
        pos.centerY = pos.new_pos.top + 60;

        elem.css(pos.new_pos);

        doc.on('mouseup', function() {

        var trigger = 0;


        pos.new_pos = elem.data().pos;

        for (var coorY=12; coorY<=252; coorY+=120){
          for (var coorX=42; coorX<=282; coorX+=120){

          // находим крайние точки ячеек
          var coorRX = coorX + 124;
          var coorRY = coorY + 124;

        //  pos.new_pos = elem.data().pos;

          // проверяем попадает ли центр элемента внутрь ячейки
          if (pos.centerX>coorX && pos.centerX < coorRX && pos.centerY>coorY && pos.centerY < coorRY) {



            // задаём в качестве новых координатов элемента координаты ячейки
            trigger++;

            // проверка на повторную ячейку
            //if (obj.iter != 0){
            console.log('111111111111111111');
              for (var i = 0; i < 9; i++) {
                console.log(obj.picture[i].position());
                console.log(coorX, coorY);

                if (obj.picture[i].position().left != coorX && obj.picture[i].position().top != coorY) {

                  console.log('за');
                  pos.new_pos.top = coorY;
                  pos.new_pos.left = coorX;
                  //pos.new_pos = elem.data().pos;
                  break;
                  }
                }
              //  }
            break;
            }
          }
        }

        // перемешение если mouseup сработала не над сеткой
        if (trigger == 0) {

        //  pos.new_pos = elem.data().pos;

        }

          elem.animate({left: pos.new_pos.left, top: pos.new_pos.top}, 100, function() {
            console.log("Success");
            elem.stop(true);
            doc.off("mouseup");

            obj.iter +=1;
          });
        });
      });

  doc.on('mouseup', function() {

      // Снять события перетаскивания и отжатия мыши
      doc.off("mouseup");
      parents.off("mousemove");
      });
    });
  }
