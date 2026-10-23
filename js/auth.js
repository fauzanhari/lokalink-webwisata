/* Authentication & Role Management */

function getImpersonatedHost() {
  try {
    return JSON.parse(localStorage.getItem('lokallink_impersonating_host') || 'null');
  } catch (e) {
    return null;
  }
}

function getUser() {
  const impersonated = getImpersonatedHost();
  if (authRole === 'host' && impersonated) {
    return {
      name: impersonated.name,
      email: impersonated.email || `${impersonated.id}@lokallink.id`,
      avatar: impersonated.avatar || 'assets/img/host_baiq_erwina.png',
      isImpersonated: true,
      connectorName: impersonated.connector || 'Ahmad Pratama',
      village: impersonated.village || '',
      phone: impersonated.phone || ''
    };
  }
  const u = currentUser[authRole] || currentUser.traveler;
  const stored = JSON.parse(localStorage.getItem(profileKey) || '{}');
  return { ...u, ...(stored[authRole] || {}) };
}

function saveUserData(data) {
  const stored = JSON.parse(localStorage.getItem(profileKey) || '{}');
  stored[authRole] = { ...(stored[authRole] || {}), ...data };
  localStorage.setItem(profileKey, JSON.stringify(stored));
  currentUser[authRole] = { ...currentUser[authRole], ...data };
}

function selectAuthRole(role) {
  if (role !== 'traveler' && role !== 'host' && role !== 'connector') role = 'traveler';
  authRole = role;
  ['travelerTab', 'hostTab', 'connectorTab'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', id.toLowerCase().startsWith(role));
  });

  const label = document.getElementById('loginRoleLabel');
  if (label) {
    if (role === 'traveler') label.textContent = 'Traveler';
    else if (role === 'host') label.textContent = 'Local Host';
    else label.textContent = 'Youth Connector';
  }

  const email = document.getElementById('loginEmail');
  if (email) {
    if (role === 'traveler') email.value = 'alex@lokallink.id';
    else if (role === 'host') email.value = 'host@lokallink.id';
    else email.value = 'connector@lokallink.id';
  }
}

function fillDemo(role) {
  selectAuthRole(role);
  const passwordInput = document.getElementById('loginPassword');
  if (passwordInput) passwordInput.value = '12345678';
}

function loginUser() {
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!email || password.length < 6) {
    alert('Masukkan email dan password minimal 6 karakter.');
    return;
  }

  // Clear any leftover host impersonation when logging in freshly
  localStorage.removeItem('lokallink_impersonating_host');

  localStorage.setItem('lokallink_logged_in', 'true');
  localStorage.setItem('lokallink_role', authRole);
  localStorage.setItem('lokallink_email', email);

  const authGate = document.getElementById('authGate');
  if (authGate) authGate.style.display = 'none';

  const splash = document.getElementById('splash');
  if (splash) splash.style.display = 'none';

  applyRoleUI();

  if (authRole === 'traveler') {
    goTo('home');
    if (splash) {
      splash.style.display = 'flex';
      setTimeout(() => splash.style.display = 'none', 3000);
    }
  } else if (authRole === 'host') {
    goTo('hostDashboard');
  } else {
    goTo('connectorDashboard');
  }
}

function logoutUser() {
  localStorage.removeItem('lokallink_logged_in');
  localStorage.removeItem('lokallink_role');
  localStorage.removeItem('lokallink_email');
  localStorage.removeItem('lokallink_impersonating_host');

  const authGate = document.getElementById('authGate');
  const splash = document.getElementById('splash');
  if (authGate) authGate.style.display = 'flex';
  if (splash) splash.style.display = 'none';

  selectAuthRole('traveler');
  showToast('Success.');
}

function switchRole() {
  // If currently managing a host as connector, return cleanly to connector mode
  if (getImpersonatedHost()) {
    if (typeof exitHostImpersonation === 'function') {
      exitHostImpersonation();
      return;
    }
  }

  let next = 'traveler';
  if (authRole === 'traveler') next = 'host';
  else if (authRole === 'host') next = 'connector';
  else if (authRole === 'connector') next = 'traveler';

  authRole = next;
  localStorage.setItem('lokallink_role', next);
  applyRoleUI();

  let target = 'home';
  if (next === 'host') target = 'hostDashboard';
  else if (next === 'connector') target = 'connectorDashboard';

  goTo(target);
  const roleLabels = {
    traveler: 'Traveler',
    host: 'Local Host',
    connector: 'Youth Local Connector'
  };
  showToast(`Switched to ${roleLabels[next]} mode.`);
}

function applyRoleUI() {
  const impersonated = getImpersonatedHost();
  const user = getUser();
  let roleText = 'Traveler';

  if (authRole === 'host') {
    roleText = impersonated ? `Host (Dikelola: ${impersonated.name})` : 'Local Host';
  } else if (authRole === 'connector') {
    roleText = 'Youth Local Connector';
  }

  const desktopName = document.getElementById('desktopName');
  const desktopRole = document.getElementById('desktopRole');
  const desktopAvatar = document.getElementById('desktopAvatar');

  if (desktopName) desktopName.textContent = user.name;
  if (desktopRole) desktopRole.textContent = roleText;
  if (desktopAvatar) desktopAvatar.src = user.avatar;

  renderNavigation();
  renderProfile();

  if (authRole === 'host') {
    renderHostExperiences();
    if (typeof patchHostButtons === 'function') patchHostButtons();
    if (typeof updateImpersonationBanner === 'function') updateImpersonationBanner();
  }

  syncBookingRecords();
  if (authRole === 'traveler') renderTravelerBookingsV2();
  if (authRole === 'host') renderHostBookingsV2();
  if (authRole === 'connector') {
    if (typeof renderConnectorDashboard === 'function') renderConnectorDashboard();
  }
  updateStaticLanguage();
}
