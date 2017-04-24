  $(document).ready(function() {
    // При загрузке страницы выполнится весь написанный здесь код
    var data = {
      button:$('.ready'),
      content:$(".content"),
       allPicture:$(".picture"),
       container:$(".container"),
    //   outBorder:coordinates = {}
    };

    detect (data);
    randomPoz (data);
    drag (data);

  });
