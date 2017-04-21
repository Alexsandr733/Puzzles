  //$(document).ready(function() {
    // При загрузке страницы выполнится весь написанный здесь код
    var data = {
      button:$('.ready'),
      content:$(".content")
    };

    detect (data);
    randomPoz (data);
    drag (data);

//  });
