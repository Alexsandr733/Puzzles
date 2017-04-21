  $(document).ready(function() {

    var data = {
      button:$('.ready'),
      content:$(".content"),
      test:$(".picture")
    //  mouseEl:0
    };

    detect (data);
    randomPoz (data);
    mousedownDetect (data);
    //drag (data);




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

    var form = data.picture;

    function mousedownDetect (obj) {
      obj.content.on("mousedown",function(event){



      var targ = event.target.className;
      console.log(targ);

      for (var i = 0; i < 9; i++) {
        if (obj.picture[i].hasClass(targ)) {
          obj.mouseEl = i;
          console.log(obj.picture[i]);

          return(obj.picture[i]);
        }
      }
          //  console.log(obj.picture);
          //  console.log(obj.picture[5]);
            console.log(obj.mouseEl);

      });
        drag (data);
    }

    // начинаем двигать
    function drag (obj){
      //mousedownDetect (obj);

        console.clear();

        var iter = obj.mouseEl;
        console.log( obj.picture[iter]+' in drug');
        console.log(obj.picture[1]+' in drug');

        var parents = obj.content;

        //var elem = obj.picture[iter];
        //var elem = obj.picture[1];
        var elem = obj.test;



      // События нажатия
      elem.on('mousedown', function(event) {

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

          elem.css(pos.new_pos);
        });

        elem.on('mouseup', function() {
          // Снять события перетаскивания и отжатия мыши
          elem.off("mouseup");
          parents.off("mousemove");
        });
      });
    }
  });
