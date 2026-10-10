/* Navigation & Screen Routing */

function renderNavigation() {
  const nav = authRole === 'host' ? hostNav : travelerNav;
  const mobile = document.getElementById('bottomNav');
  if (mobile) {
    mobile.innerHTML = nav.map(([id, label, icon]) => `
      <button class="nav-btn" data-target="${id}" onclick="goTo('${id}')">
        ${icon}<span>${label}</span>
      </button>
    `).join('');
  }

  const desktop = document.getElementById('desktopLinks');
  if (desktop) {
    desktop.innerHTML = nav.map(([id, label]) => `
      <button class="desktop-link" data-target="${id}" onclick="goTo('${id}')">${label}</button>
    `).join('');
  }
}

function goTo(id) {
  if (id === 'saved') {
    document.querySelectorAll('.screen').forEach(x => {
      x.classList.remove('active');
      if (x.id !== 'detail') x.style.display = '';
    });
    const t = document.getElementById('saved');
    if (t) {
      t.classList.add('active');
      t.style.display = 'block';
    }
    renderSaved();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const allowedTraveler = travelerNav.some(x => x[0] === id) || id === 'saved';
  const allowedHost = hostNav.some(x => x[0] === id);

  if (authRole === 'traveler' && !allowedTraveler) {
    id = 'home';
  }
  if (authRole === 'host' && !allowedHost) {
    id = 'hostDashboard';
  }

  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    if (s.id !== 'detail') s.style.display = '';
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
  }

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === id);
  });
  document.querySelectorAll('.desktop-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === id);
  });

  if (id === 'home') renderTrending();
  if (id === 'discover') renderDiscover();
  if (id === 'bookings') {
    syncBookingRecords();
    renderTravelerBookingsV2();
  }
  if (id === 'hostBookings') {
    renderHostBookingsV2();
  }
  if (id === 'hostExperiences') {
    renderHostExperiences();
  }
  if (id === 'profile') {
    renderProfile();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStaticLanguage() {
  const user = getUser();
  const map = {
    '#desktopName': user.name,
    '#desktopRole': authRole === 'host' ? 'Local Host' : 'Traveler'
  };
  Object.entries(map).forEach(([sel, val]) => {
    const e = document.querySelector(sel);
    if (e) e.textContent = val;
  });
}

