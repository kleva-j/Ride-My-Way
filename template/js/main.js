window.onload = (function(){
  toggleNavBar();
  toggleSideBar();
})();

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
  let [,profile, rideoffer, ridesTaken, ridesGiven] = document.querySelector('.resize').children;

  ridesTaken = addEventListener("click", showProfile);
  profile.addEventListener("click", showProfile);
  rideoffer = addEventListener("click", showProfile);
  ridesGiven = addEventListener("click", showProfile);
;}

function showProfile(e) {
  let details = document.querySelector(".detail");
  let offer = details.nextElementSibling;
  let listings = offer.nextElementSibling;
  let listings2 = offer.nextElementSibling;

  if(e.target.innerText == "Dashboard"){
    details.style.display = "block";
  }
  else if(e.target.innerText == "Ride Requests"){
    offer.style.display = "inline-block";
    details.style.display = "none";;
  }
  else if(e.target.innerText == "Rides Given"){
    listings.style.display = "inline-block";
    details.style.display = "none";
    offer.style.display = "none";
  }
  else if(e.target.innerText == "Rides Taken"){
    listings2.style.display = "inline-block";
    details.style.display = "none";
    offer.style.display = "none";
    listings.style.display = 'none';
  }
}
