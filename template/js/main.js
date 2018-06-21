window.onload = function(){
  var burgar_nav = document.querySelector('.burgar-nav');
  var click = false;
  var navigations = burgar_nav.previousElementSibling;
  burgar_nav.addEventListener('click', function(){
    if(!click) {
      navigations.classList = 'dropdown';
      return click = true;
    }
    else {
      navigations.classList = 'navigations';
      return click = false;
    }
  })
}
