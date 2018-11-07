window.onload = (function () {
  toggleNavBar();
  toggleSideBar();
}());

// eslint-disable-next-line require-jsdoc
function toggleNavBar() {
  const burgar_nav = document.querySelector('.burgar-nav');
  let click = false;
  const navigations = burgar_nav.previousElementSibling;
  burgar_nav.addEventListener('click', () => {
    if (!click) {
      navigations.classList = 'dropdown';
      return click = true;
    }

    navigations.classList = 'navigations';
    return click = false;
  });
}

// eslint-disable-next-line require-jsdoc
function toggleSideBar() {
  let [, profile, rideoffer, ridesTaken, ridesGiven] = document.querySelector('.resize').children;

  ridesTaken = addEventListener('click', showProfile);
  profile.addEventListener('click', showProfile);
  rideoffer = addEventListener('click', showProfile);
  ridesGiven = addEventListener('click', showProfile);
}

/**
 *
 * @param {*} e
 * @return {String}
 */
function showProfile(e) {
  const details = document.querySelector('.detail');
  const offer = details.nextElementSibling;
  const listings = offer.nextElementSibling;
  const listings2 = offer.nextElementSibling;

  if (e.target.innerText == 'Dashboard') {
    details.style.display = 'block';
  } else if (e.target.innerText == 'Ride Requests') {
    offer.style.display = 'inline-block';
    details.style.display = 'none';
  } else if (e.target.innerText == 'Rides Given') {
    listings.style.display = 'inline-block';
    details.style.display = 'none';
    offer.style.display = 'none';
  } else if (e.target.innerText == 'Rides Taken') {
    listings2.style.display = 'inline-block';
    details.style.display = 'none';
    offer.style.display = 'none';
    listings.style.display = 'none';
  }
}
