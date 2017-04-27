$(document).ready(function() {
  // При загрузке страницы выполнится весь написанный здесь код
  var data = {
    button:$('.ready'),
    content:$(".content"),
    allPicture:$(".picture"),
    container:$(".container"),
    doc:$(document),
    iter:0
  };

  detect (data);
  randomPoz (data);
  drag (data);


});
