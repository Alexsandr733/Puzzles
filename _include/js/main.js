
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

  // начинаем двигать
  function drag (obj){

    var parents = obj.content;
    var elems = obj.allPicture;
    var doc  = obj.doc;


    // События нажатия
    elems.on('mousedown', function(event) {

      var elem = $(this);

      var position = elem.position();


      //var elem = event.target.className;
      var pos = {};
      //starting:position
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

        // var iter = busyX.length;

        for (var i=1; i<=3; i++){

          // генерируем координаты ячеек
          var coorY;
          if (i == 1) {
            coorY = 12;
          }
          else{
            coorY += 120;
          }

          for (var j=1; j<=3; j++){

            var coorX;
            if (j == 1) {
              coorX = 42;
            }
            else{
              coorX += 120;
            }

            // находим крайние точки ячеек
            var coorRX = coorX + 124;
            var coorRY = coorY + 124;

            // проверяем попадает ли центр элемента внутрь ячейки
            if (pos.centerX>coorX && pos.centerX < coorRX && pos.centerY>coorY && pos.centerY < coorRY) {

              // задаём в качестве новых координатов элемента координаты ячейки
              pos.new_pos.top = coorY;
              pos.new_pos.left = coorX;



              trigger++;
              if (obj.busyX.length != 0){
                for (var z = 0; z < obj.busyX.length; z++) {
                  if (obj.busyX[z] == coorX && obj.busyY[z] == coorY){
                    trigger = 0;
                  }
                }
              }

              obj.busyX[obj.iter] = coorX;
              obj.busyY[obj.iter] = coorY;

              console.log(obj.busyX);
              console.log(obj.iter);
              console.log(obj.iter);

              // obj.busyX.push(coorX);
              // obj.busyY.push(coorY);
              // console.log(obj.busyX);
            }
          }
        }

        if (trigger == 0) {

          pos.new_pos.top = pos.starting.top;
          pos.new_pos.left = pos.starting.left;

        }

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
