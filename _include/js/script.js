  $(document).ready(function() {
  //   // При загрузке страницы выполнится весь написанный здесь код
  var check = [];
  var data = {
    button:$('.ready'),
    checkMass:check
  };



  function getRandom(){
    return Math.round(Math.random() * (9 - 1) + 1);
  }

  function detect (){
    var png = [];
    var cell = [];
    for( var i = 1; i <= 9; i++){
      var massi = i-1;
      cell[massi] =   $(".picture").eq(i);
      png[massi] =  $(".pazzl").eq(i);
    }
    data.picture = png;
    data.pazzle = cell;


  }
  detect ();

  function randomPoz () {
    var r=getRandom();
    var fl=0;
    if(data.checkMass.length === 0){
      data.checkMass[0]=r;
    }
    while (fl === 0) {
      r = getRandom();
      for (var j = 0; j < data.checkMass.length; j++) {
        if (data.checkMass[j] === r) {
          fl++;
          data.checkMass[j]=r;
          return fl;
        }
      }
    }
    alert(data.checkMass[0]+'its 0');
    return r;
  }
  randomPoz ();
});
