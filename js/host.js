/* Local Host Operations & Dashboard Management */

function openHost() {
  const modal = document.getElementById('hostModal');
  if (modal) modal.classList.add('open');
}

function closeHost() {
  const modal = document.getElementById('hostModal');
  if (modal) modal.classList.remove('open');
}

function submitHost() {
  closeHost();
  showToast('Local Host registration started.');
}

function openExperienceForm() {
  const modal = document.getElementById('experienceModal');
  if (modal) modal.classList.add('open');
}

function closeExperienceForm() {
  const modal = document.getElementById('experienceModal');
  if (modal) modal.classList.remove('open');
}

function createExperience() {
  if (authRole !== 'host') {
    showToast('Only Local Host can create experiences.');
    return;
  }
  const title = document.getElementById('expTitle')?.value.trim();
  const price = Number(document.getElementById('expPrice')?.value);
  const location = document.getElementById('expLocation')?.value.trim();

  if (!title || !price || !location) {
    showToast('Please complete experience name, price, and location.');
    return;
  }

  const e = {
    id: 'host-' + Date.now(),
    title,
    category: document.getElementById('expCategory')?.value || 'Culture',
    location,
    price,
    duration: document.getElementById('expDuration')?.value.trim() || '3 hours',
    image: document.getElementById('expImage')?.value.trim() || 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85',
    host: getUser().name,
    story: document.getElementById('expStory')?.value.trim() || 'A locally hosted experience created through LokaLink.',
    avatar: getUser().avatar,
    rating: 'New'
  };

  hostExperiences.push(e);
  localStorage.setItem(expKey, JSON.stringify(hostExperiences));

  ['expTitle', 'expPrice', 'expLocation', 'expDuration', 'expImage', 'expStory'].forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = '';
  });

  closeExperienceForm();
  renderHostExperiences();
  renderProfile();
  showToast('Experience published successfully.');
  goTo('hostExperiences');
}

function renderHostExperiences() {
  const root = document.getElementById('hostExperiences');
  if (!root) return;
  const all = [
    ...hostExperiences.map(e => ({ ...e, custom: true })),
    ...experiences.slice(0, 3).map(e => ({ ...e, custom: false }))
  ];

  root.innerHTML = `
    <div class="page-title">
      <h1>${tr('myExperiences')}</h1>
      <p>Create, edit, publish, and monitor your local experiences.</p>
    </div>
    <div class="dashboard-wrap">
      <div class="dashboard-card">
        <div class="section-head" style="padding:0;margin:0">
          <h3 style="margin:0">Published Experiences</h3>
          <button class="btn btn-primary" style="min-height:35px;font-size:9px" onclick="openExperienceForm()">+ ${tr('addExperience')}</button>
        </div>
        ${all.map(e => `
          <div class="host-row">
            <img src="${e.image}" alt="Experience">
            <div class="host-row-main">
              <strong>${escapeHtml(e.title)}</strong>
              <span>${e.category} · ${e.rating === 'New' ? 'New' : e.rating + ' ★'} · ${e.custom ? 'Created by you' : 'Demo experience'}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div class="host-row-price">${formatIDR(e.price)}</div>
              ${e.custom ? `<button class="remove-save" onclick="deleteHostExperience('${e.id}')">Delete</button>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function deleteHostExperience(id) {
  hostExperiences = hostExperiences.filter(e => e.id !== id);
  localStorage.setItem(expKey, JSON.stringify(hostExperiences));
  renderHostExperiences();
  renderProfile();
  showToast('Experience deleted.');
}

function hostViewAllBookings() {
  goTo('hostBookings');
}

function hostManageExperiences() {
  goTo('hostExperiences');
}

function patchHostButtons() {
  const heads = document.querySelectorAll('#hostDashboard .section-head .see-all');
  if (heads[0]) heads[0].onclick = hostViewAllBookings;
  if (heads[1]) heads[1].onclick = hostManageExperiences;

  const actionTiles = document.querySelectorAll('#hostDashboard .action-tile');
  if (actionTiles[0]) actionTiles[0].onclick = openExperienceForm;
  if (actionTiles[1]) actionTiles[1].onclick = hostViewAllBookings;
  if (actionTiles[2]) actionTiles[2].onclick = () => goTo('hostImpact');
}
