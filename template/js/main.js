window.onload = function(){
  toggleNavBar();
  toggleSideBar();

};

function toggleNavBar(){
  let burgar_nav = document.querySelector('.burgar-nav');
  let click = false;
  let navigations = burgar_nav.previousElementSibling;
  burgar_nav.addEventListener('click', function(){
    if(!click) {
      navigations.classList = 'dropdown';
      return click = true;
    }
    else {
      navigations.classList = 'navigations';
      return click = false;
    }
  });
};

function toggleSideBar(){
  let [profile, rideoffer, rideHistory] = document.querySelectorAll(".nav");

  rideHistory = addEventListener("click", showProfile)
  profile.addEventListener("click", showProfile);
  rideoffer = addEventListener("click", showProfile)
}

function showProfile(e) {
  let details = document.querySelector(".detail");
  let offer = details.nextElementSibling;
  let listings = offer.nextElementSibling;

  if(e.target.innerText == "Profile"){
    details.style.display = "block";
  }
  else if(e.target.innerText == "Ride offers created"){
    offer.style.display = "inline-block";
    details.style.display = "none";;
  }
  else if(e.target.innerText == "Ride History"){
    listings.style.display = "inline-block";
    details.style.display = "none";
    offer.style.display = "none";
  }
}
