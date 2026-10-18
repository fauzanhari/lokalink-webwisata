/* Main Application Entry Point & Initialization */

document.addEventListener('DOMContentLoaded', function () {
  // ── Loading screen logic ──
  const loadingScreen = document.getElementById('loadingScreen');
  const authGate = document.getElementById('authGate');

  // Hide authGate while loading screen is visible
  if (authGate) authGate.style.visibility = 'hidden';

  function dismissLoading() {
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        // Now show authGate
        if (authGate) authGate.style.visibility = 'visible';
      }, 600); // matches CSS transition duration
    } else {
      if (authGate) authGate.style.visibility = 'visible';
    }
  }

  // Dismiss loading screen after 5 seconds
  setTimeout(dismissLoading, 4000);

  // ── Always require login on every page load ──
  // Clear any previously stored session so user must always sign in
  localStorage.removeItem('lokallink_logged_in');
  localStorage.removeItem('lokallink_role');
  localStorage.removeItem('lokallink_email');

  // Always show the login gate after loading screen
  if (authGate) authGate.style.display = 'flex';
  const splash = document.getElementById('splash');
  if (splash) splash.style.display = 'none';

  selectAuthRole('traveler');
  renderNavigation();

  // Load host-created experiences into the shared experiences array
  // so they appear in traveler's Home & Discover pages
  hostExperiences.forEach(he => {
    if (!experiences.find(e => e.id === he.id)) {
      experiences.push(he);
    }
  });

  // Initial renders for active views
  renderTrending();
  renderDiscover();
  renderBookings();
  renderProfile();
  renderSaved();
  renderHostExperiences();

  // Safety fallback for splash overlay pointer events
  setTimeout(() => {
    const s = document.getElementById('splash');
    if (s) s.style.pointerEvents = 'none';
  }, 3000);

  // Delegation listener for host dashboard action tiles
  document.addEventListener('click', function (e) {
    const t = e.target.closest('[data-action]');
    if (!t) return;
    const a = t.dataset.action;
    if (a === 'host-bookings') hostViewAllBookings();
    if (a === 'host-experiences') hostManageExperiences();
    if (a === 'add-experience') openExperienceForm();
  });
});
