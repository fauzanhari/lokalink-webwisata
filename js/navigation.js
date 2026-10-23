/* Navigation & Screen Routing */

function renderNavigation() {
  let nav = travelerNav;
  if (authRole === 'host') nav = hostNav;
  else if (authRole === 'connector') nav = connectorNav;

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
  const allowedConnector = connectorNav.some(x => x[0] === id);

  if (authRole === 'traveler' && !allowedTraveler) {
    id = 'home';
  }
  if (authRole === 'host' && !allowedHost) {
    id = 'hostDashboard';
  }
  if (authRole === 'connector' && !allowedConnector) {
    id = 'connectorDashboard';
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
  if (id === 'impact') {
    if (typeof renderImpact === 'function') renderImpact();
  }
  if (id === 'bookings') {
    syncBookingRecords();
    renderTravelerBookingsV2();
  }
  if (id === 'hostDashboard') {
    if (typeof updateImpersonationBanner === 'function') updateImpersonationBanner();
  }
  if (id === 'hostBookings') {
    renderHostBookingsV2();
    if (typeof updateImpersonationBanner === 'function') updateImpersonationBanner();
  }
  if (id === 'hostExperiences') {
    renderHostExperiences();
    if (typeof updateImpersonationBanner === 'function') updateImpersonationBanner();
  }
  if (id === 'connectorDashboard') {
    if (typeof renderConnectorDashboard === 'function') renderConnectorDashboard();
  }
  if (id === 'connectorHosts') {
    if (typeof renderConnectorHosts === 'function') renderConnectorHosts();
  }
  if (id === 'connectorEarnings') {
    if (typeof renderConnectorEarnings === 'function') renderConnectorEarnings();
  }
  if (id === 'profile') {
    renderProfile();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStaticLanguage() {
  const user = getUser();
  let roleTitle = 'Traveler';
  if (authRole === 'host') {
    const imp = typeof getImpersonatedHost === 'function' ? getImpersonatedHost() : null;
    roleTitle = imp ? `Host (${imp.name})` : 'Local Host';
  } else if (authRole === 'connector') {
    roleTitle = 'Youth Local Connector';
  }

  const map = {
    '#desktopName': user.name,
    '#desktopRole': roleTitle
  };
  Object.entries(map).forEach(([sel, val]) => {
    const e = document.querySelector(sel);
    if (e) e.textContent = val;
  });
}
