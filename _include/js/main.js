
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

    // console.log(obj.picture);
    // console.log(obj.allPicture);
  }

  function randomPoz (obj) {

    var index = 0;
    for (var i=0; i<=2; i++){
      for (var j=0; j<=2; j++){

        var randX = getRandom(510, 770);
        var randY = getRandom(10, 270);

        obj.picture[index].addClass('pic' + i + "-" + j);
        obj.picture[index].css({left: randX, top: randY});
        obj.picture[index].data({pos: obj.picture[index].position()});

        // console.log(obj.picture[index].data().pos.left);
        // console.log(obj.picture[index].data().pos.top);
        // console.log('111111111');

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
      // получаю начальные координаты элемента 
      var position = elem.position();

      //var elem = event.target.className;
      var pos = {};

      // сохраняю координаты элемента
      pos.starting = {
        left:position.left,
        top:position.top
      };

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
      //var iter = 0;
      doc.on('mouseup', function() {
        var trigger = 0;

        for (var coorY=12; coorY<=252; coorY+=120){
            for (var coorX=42; coorX<=282; coorX+=120){

            // находим крайние точки ячеек
            var coorRX = coorX + 124;
            var coorRY = coorY + 124;

            // проверяем попадает ли центр элемента внутрь ячейки
            if (pos.centerX>coorX && pos.centerX < coorRX && pos.centerY>coorY && pos.centerY < coorRY) {

              // задаём в качестве новых координатов элемента координаты ячейки
              pos.new_pos.top = coorY;
              pos.new_pos.left = coorX;

              trigger++;

              for (var ii = 0; ii < 9; ii++) {
                if ((obj.picture[ii].data().pos.left == coorX) && (obj.picture[ii].data().pos.top == coorY)) {
                  trigger = 0;

                  pos.new_pos.top = pos.starting.top;
                  pos.new_pos.left = pos.starting.left;

                }
              }

              var name = event.target.className;
              console.log(name);
              for (var k = 0; k < 9; k++) {
                if ( obj.picture[k].hasClass(name) ) {
                  console.log('зашли');
                  console.log(obj.picture[k]);
                  // obj.picture[k].data({pos: obj.picture[k].position()});
                  obj.picture[k].data({pos: {left: coorX, top: coorY}});
                }
              }

              obj.busyX[obj.iter] = coorX;
              obj.busyY[obj.iter] = coorY;

            }
            if (trigger == 0) {

              pos.new_pos.top = pos.starting.top;
              pos.new_pos.left = pos.starting.left;


              // pos.new_pos.top = elem.data().pos.top;
              // pos.new_pos.left = elem.data().pos.left;


            }

          }
        }

// nen

          elem.animate({left: pos.new_pos.left, top: pos.new_pos.top}, 100, function() {
            console.log("Success");
            elem.stop(true);
            doc.off("mouseup");

            obj.iter += 1;
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
