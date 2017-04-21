  $(document).ready(function() {
    // При загрузке страницы выполнится весь написанный здесь код
    var data = {
      button:$('.ready'),
      content:$(".content"),
       AllPicture:$(".picture")
    };

    detect (data);
    randomPoz (data);
    drag (data);

  });
