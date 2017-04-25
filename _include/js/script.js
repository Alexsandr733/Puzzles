  $(document).ready(function() {
    // При загрузке страницы выполнится весь написанный здесь код
    var data = {
      button:$('.ready'),
      content:$(".content"),
      allPicture:$(".picture"),

      container:$(".container"),
      doc:$("document")
    };

    detect (data);
    randomPoz (data);
    drag (data);

  });
