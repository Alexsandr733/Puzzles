
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

        var pos = {left: getRandom(510, 770), top: getRandom(10, 270)};

        obj.picture[index].addClass('pic' + i + "-" + j);
        obj.picture[index].css(pos);
        obj.picture[index].data({pos: pos});

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
    elems.on('mousedown', function(event) { // сразу после снять событие

      obj.button.off('mouseup');
      elems.off('mousedown');

      var elem = $(this);
      var pos = {};

      // Запомнить позицию курсора относительно элемента
      pos.inner = {
        left: event.offsetX,
        top: event.offsetY
      };

      elem.css({zIndex: 110});

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
          top: pos.cursor.top - pos.parents.top - pos.inner.top,
          left: pos.cursor.left - pos.parents.left - pos.inner.left
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
          doc.off('mouseup');
          parents.off('mousemove');

          elem.css({zIndex: 99});

          pos.new_pos = $.extend( true, {}, elem.data().pos);

          for (var coorY = 12; coorY <= 252; coorY += 120){
            for (var coorX = 42; coorX <= 282; coorX += 120){

              // находим крайние точки ячеек
              var coorRX = coorX + 124;
              var coorRY = coorY + 124;

              // проверяем попадает ли центр элемента внутрь ячейки
              if (pos.centerX > coorX && pos.centerX < coorRX && pos.centerY > coorY && pos.centerY < coorRY) {

                // Зафиксировать фрагмент?
                var fix = true;
                // проверка на повторную ячейку
                for (var i = 0; i < 9; i++) {
                  if (obj.picture[i].position().left == coorX && obj.picture[i].position().top == coorY) {
                    fix = false;
                    break;
                  }
                }

                if (fix) {
                // задаём в качестве новых координатов элемента координаты ячейки
                  pos.new_pos.top = coorY;
                  pos.new_pos.left = coorX;
                }
                break;
              }
            }
          }
          elem.animate({left: pos.new_pos.left, top: pos.new_pos.top}, 100, function() { //отлавливается окончание
            elem.stop(true);
            check (obj);
            drag (obj);
          });
        });
      });
    });
  }

  function check(obj){

    obj.button.on('mouseup', function() {

      obj.allPicture.off('mousedown');
      obj.button.off('mouseup');


      var mass = [];
      var posRet = {};

      var index = 0;
      for (var coorY = 12; coorY <= 252; coorY += 120){
        for (var coorX = 42; coorX <= 282; coorX += 120){
          mass[index] = {
            left: coorX,
            top: coorY
          };
          index++;
        }
      }

      var err = false;
      var anim = [];

      for (var i = 0; i < 9; i++) {

        if (!(obj.picture[i].position().left == mass[i].left && obj.picture[i].position().top == mass[i].top)){

          posRet = $.extend( true, {}, obj.picture[i].data().pos);

          anim.push(obj.picture[i].animate({left: posRet.left, top: posRet.top}, 100));

          err = true;
        }
      }
      $.when.apply($, anim).done(function() {

        if (err) {

          obj.button.addClass('wrong');
          obj.errormess.show();

          setTimeout(function () {

          obj.button.removeClass('wrong');
          obj.errormess.hide();

          drag(obj);
          check (obj);

          }, 1000);
        }
        else {
          setTimeout(function () {

            obj.scene.hide("slow");

          }, 2000);
        }
      });
    });
  }
