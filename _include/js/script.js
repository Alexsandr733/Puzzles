  $(document).ready(function() {
    // При загрузке страницы выполнится весь написанный здесь код
    var data = {
      button:$('.ready'),
      content:$(".content"),
      allPicture:$(".picture"),
      container:$(".container"),
      doc:$(document)
    };

    var busyX = [];
    var busyY = [];

    data.busyX = busyX;
    data.busyY = busyY;


    detect (data);
    randomPoz (data);
    drag (data);

  });
