
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
    var body  = obj.container;

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

        pos.element = elem.offset();

        // Получение границ элемента
        pos.objectLeft = pos.element.left;
        pos.objectTop = pos.element.top;
        pos.objectRight = pos.element.left+120;
        pos.objectBottom = pos.element.top+120;

        // Новая позиция элемента
        pos.new_pos = {
          left: pos.cursor.left - pos.parents.left - pos.inner.left,
          top: pos.cursor.top - pos.parents.top - pos.inner.top
        };

        // Ограничение перемещения элемента
        if (pos.new_pos.left<0){
          pos.new_pos.left = 0;
        }
        if (pos.new_pos.top<0){
          pos.new_pos.top = 0;
        }
        if (pos.new_pos.left>836){
          pos.new_pos.left = 836;
        }
        if (pos.new_pos.top>297){
          pos.new_pos.top = 297;
        }

        elem.css(pos.new_pos);
      });

    elem.on('mouseup', function() {

      var elem = $(this);
      
      // Снять события перетаскивания и отжатия мыши
      elem.off("mouseup");
      parents.off("mousemove");
      });
    });
  }
