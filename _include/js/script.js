$(document).ready(function() {
  // При загрузке страницы выполнится весь написанный здесь код



var images = '0_0.png';
var imagesurl = '_include/img/'+images;
alert(imagesurl);
var pozition;
pozition=0;
for (var i=1; i<=9;i++){
  pozition+=140;

  $('.elements').append('<div class="picture"></div>').css('top',pozition)
  // .css( "background-image", "url('"+imagesurl+"')");
.css( "background-image", "url('.._include/img/0_0.png')");

}


});
