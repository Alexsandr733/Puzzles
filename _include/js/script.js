$(document).ready(function() {
  // При загрузке страницы выполнится весь написанный здесь код
  var data = {
    scene:$('.scene'),
    button:$('.ready'),
    errormess:$(".errormess"),
    content:$(".content"),
    allPicture:$(".picture"),
    doc:$(document)
  };

  detect (data);
  randomPoz (data);
  drag (data);
});
