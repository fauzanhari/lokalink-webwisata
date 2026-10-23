/* Booking Management & Reservation System */

function getBookingRecords() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(bookingStoreKey) || "null");
  } catch (e) {
    data = null;
  }
  if (!Array.isArray(data)) {
    data = bookingSeed.map((b) => ({ ...b }));
    localStorage.setItem(bookingStoreKey, JSON.stringify(data));
  }
  return data;
}

function saveBookingRecords(data) {
  localStorage.setItem(bookingStoreKey, JSON.stringify(data));
  bookings = data.filter((b) => b.travelerEmail === getUser().email);
}

function syncBookingRecords() {
  const data = getBookingRecords();
  bookings = data.filter((b) => b.travelerEmail === getUser().email);
  return data;
}

function bookingStatusClass(status) {
  return String(status || "Pending")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function bookingStatusLabel(status) {
  const labels = {
    Pending: "Menunggu konfirmasi",
    Confirmed: "Dikonfirmasi",
    Rejected: "Ditolak",
    Completed: "Selesai",
    Cancelled: "Dibatalkan",
  };
  return uiLanguage === "id" ? labels[status] || status : status;
}

function openBooking(title, price) {
  pendingBooking = { title, price };
  guestCount = 2;
  const gc = document.getElementById("guestCount");
  const be = document.getElementById("bookingExperience");
  const sn = document.getElementById("sumName");
  const sp = document.getElementById("sumPrice");
  const sg = document.getElementById("sumGuests");
  const st = document.getElementById("sumTotal");
  const bd = document.getElementById("bookingDate");

  if (gc) gc.textContent = guestCount;
  if (be) be.textContent = title;
  if (sn) sn.textContent = title;
  if (sp) sp.textContent = money(price);
  if (sg) sg.textContent = guestCount;
  if (st) st.textContent = money(price * guestCount);
  if (bd) bd.value = new Date().toISOString().slice(0, 10);

  const bf = document.getElementById("bookingForm");
  const bs = document.getElementById("bookingSuccess");
  const bm = document.getElementById("bookingModal");

  if (bf) bf.style.display = "block";
  if (bs) bs.style.display = "none";
  if (bm) bm.classList.add("open");

  const btn = document.querySelector(
    '#bookingForm button[onclick="confirmBooking()"]'
  );
  if (btn)
    btn.textContent =
      uiLanguage === "id" ? "Kirim Permintaan Booking" : "Send Booking Request";
}

function openBookingFromDetail() {
  openBooking(currentExperience.title, currentExperience.price);
}

function closeBooking() {
  const bm = document.getElementById("bookingModal");
  if (bm) bm.classList.remove("open");
}

function changeGuests(delta) {
  guestCount = Math.max(1, Math.min(6, guestCount + delta));
  const gc = document.getElementById("guestCount");
  const sg = document.getElementById("sumGuests");
  const st = document.getElementById("sumTotal");

  if (gc) gc.textContent = guestCount;
  if (sg) sg.textContent = guestCount;
  if (st && pendingBooking)
    st.textContent = money(pendingBooking.price * guestCount);
}

function confirmBooking() {
  const dateInput = document.getElementById("bookingDate");
  const dateValue = dateInput ? dateInput.value : "";
  if (!dateValue) {
    showToast("Please choose a date first.");
    return;
  }

  const d = new Date(dateValue + "T00:00:00");
  const pretty = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const hostInfo = {
    hostName: currentExperience.host || "Local Host",
    hostEmail: currentExperience.hostEmail || "",
    hostAvatar: currentExperience.avatar || "assets/img/host_rafi_maulana.png",
  };

  const data = getBookingRecords();
  const record = {
    id: "booking-" + Date.now(),
    travelerName: getUser().name,
    travelerEmail: getUser().email,
    title: currentExperience.title,
    experienceId: currentExperience.id,
    date: pretty,
    time: document.getElementById("bookingTime")?.value || "08:00 AM",
    guests: guestCount,
    price: Number(currentExperience.price),
    total: Number(currentExperience.price) * guestCount,
    status: "Pending",
    hostName: hostInfo.hostName,
    hostEmail: hostInfo.hostEmail,
    hostAvatar: hostInfo.hostAvatar,
    category: currentExperience.category,
    location: currentExperience.location,
    duration: currentExperience.duration,
  };

  data.unshift(record);
  saveBookingRecords(data);

  const successText = document.getElementById("successText");
  const successHeading = document.querySelector("#bookingSuccess h2");
  if (successText)
    successText.textContent = `${currentExperience.title} has been sent to the host for confirmation. You can check the status in My Bookings.`;
  if (successHeading) successHeading.textContent = "Booking Request Sent";

  const bf = document.getElementById("bookingForm");
  const bs = document.getElementById("bookingSuccess");
  if (bf) bf.style.display = "none";
  if (bs) bs.style.display = "block";
}

function finishBooking() {
  closeBooking();
  closeDetail();
  goTo("bookings");
  showToast(
    uiLanguage === "id"
      ? "Permintaan booking berhasil dikirim."
      : "Booking request sent successfully."
  );
}

function renderImpact() {
  const email = getUser().email;
  const list  = getBookingRecords().filter((b) => b.travelerEmail === email);

  // Elements
  const valEl      = document.getElementById("impactValue");
  const subEl      = document.getElementById("impactSubtitle");
  const hostsEl    = document.getElementById("impactHosts");
  const tripsEl    = document.getElementById("impactTrips");
  const guidesEl   = document.getElementById("impactGuides");
  const umkmEl     = document.getElementById("impactUMKM");
  const breakdownEl= document.getElementById("impactBreakdown");
  const historyEl  = document.getElementById("impactHistory");
  const emptyEl    = document.getElementById("impactEmpty");
  const heroBox    = document.getElementById("impactHeroBox");
  const bkCard     = document.getElementById("impactBreakdownCard");
  const histCard   = document.getElementById("impactHistoryCard");

  const noBookings = list.length === 0;

  // Toggle empty state
  if (emptyEl)  emptyEl.style.display  = noBookings ? "block" : "none";
  if (heroBox)  heroBox.style.display  = noBookings ? "none"  : "";
  if (bkCard)   bkCard.style.display   = noBookings ? "none"  : "";
  if (histCard) histCard.style.display = noBookings ? "none"  : "";

  if (noBookings) return;

  // ── Compute stats ──
  const totalRp   = list.reduce((s, b) => s + (b.total || 0), 0);
  const uniqueHosts = new Set(list.map((b) => b.hostEmail || b.hostName)).size;
  const guideCount  = list.filter((b) => b.type === "guide").length;
  const umkmCount   = list.filter((b) => b.type === "kuliner" || b.type === "usaha").length;
  const tripCount   = list.filter((b) => !b.type || b.type === "experience").length;

  // Hero
  if (valEl) valEl.textContent = formatIDR(totalRp);
  if (subEl) subEl.textContent = `dari ${list.length} booking yang tercatat`;

  // Stats grid
  if (hostsEl)  hostsEl.textContent  = uniqueHosts;
  if (tripsEl)  tripsEl.textContent  = tripCount;
  if (guidesEl) guidesEl.textContent = guideCount;
  if (umkmEl)   umkmEl.textContent   = umkmCount;

  // ── Breakdown per kategori ──
  const categories = {
    "Pengalaman Lokal":  { emoji: "🎒", color: "#2f7d55", items: [], bgColor: "#eef7f1" },
    "Destinasi Wisata":  { emoji: "🗺️", color: "#1565c0", items: [], bgColor: "#e8f0ff" },
    "Guide Lokal":       { emoji: "🧭", color: "#c8961e", items: [], bgColor: "#fff8e6" },
    "Kuliner Khas":      { emoji: "🍽️", color: "#e07a1e", items: [], bgColor: "#fff3e0" },
    "Usaha Lokal":       { emoji: "🏠", color: "#6b21c8", items: [], bgColor: "#f3e8ff" },
  };

  list.forEach((b) => {
    const cat = b.type === "guide"   ? "Guide Lokal"
              : b.type === "kuliner" ? "Kuliner Khas"
              : b.type === "usaha"   ? "Usaha Lokal"
              : b.category === "Destinasi Wisata" ? "Destinasi Wisata"
              : "Pengalaman Lokal";
    if (categories[cat]) categories[cat].items.push(b);
  });

  if (breakdownEl) {
    const rows = Object.entries(categories)
      .filter(([, v]) => v.items.length > 0)
      .map(([name, v]) => {
        const catTotal = v.items.reduce((s, b) => s + (b.total || 0), 0);
        const pct = totalRp > 0 ? Math.round((catTotal / totalRp) * 100) : 0;
        return `
          <div style="background:${v.bgColor};border-radius:10px;padding:10px 12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:12px;font-weight:600;color:${v.color}">${v.emoji} ${name}</span>
              <span style="font-size:11px;color:var(--muted)">${v.items.length}× · ${formatIDR(catTotal)}</span>
            </div>
            <div style="background:rgba(0,0,0,.08);border-radius:6px;height:6px;overflow:hidden">
              <div style="width:${pct}%;height:100%;background:${v.color};border-radius:6px;transition:width .6s ease"></div>
            </div>
            <div style="text-align:right;font-size:10px;color:${v.color};margin-top:3px;font-weight:600">${pct}%</div>
          </div>`;
      });
    breakdownEl.innerHTML = rows.length
      ? rows.join("")
      : `<p style="font-size:11px;color:var(--muted)">Belum ada data.</p>`;
  }

  // ── Riwayat booking 5 terbaru ──
  if (historyEl) {
    const recent = list.slice(0, 5);
    const typeConfig = {
      guide:   { emoji: "🧭", color: "#c8961e", bg: "#fff8e6" },
      kuliner: { emoji: "🍽️", color: "#e07a1e", bg: "#fff3e0" },
      usaha:   { emoji: "🏠", color: "#6b21c8", bg: "#f3e8ff" },
    };
    historyEl.innerHTML = recent.map((b) => {
      const conf = typeConfig[b.type] || { emoji: "🎒", color: "#2f7d55", bg: "#eef7f1" };
      return `
        <div style="display:flex;align-items:center;gap:10px;padding:10px;background:${conf.bg};border-radius:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:${conf.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${conf.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(b.title)}</div>
            <div style="font-size:10px;color:var(--muted);margin-top:1px">📅 ${escapeHtml(b.date)} · ${escapeHtml(b.status)}</div>
          </div>
          <strong style="font-size:12px;color:${conf.color};flex-shrink:0">${formatIDR(b.total)}</strong>
        </div>`;
    }).join("");
  }
}

function renderTravelerBookingsV2() {
  const el = document.getElementById("bookingList");
  if (!el) return;
  const email = getUser().email;
  const list = getBookingRecords().filter((b) => b.travelerEmail === email);
  if (!list.length) {
    el.innerHTML = `<div style="text-align:center;padding:30px;color:var(--muted);font-size:11px">Belum ada booking.</div>`;
    return;
  }
  el.innerHTML = list
    .map(
      (b) => `
    <article class="booking-card-v2">
      <div class="booking-top">
        <h3>${escapeHtml(b.title)}${b.type === "guide" ? ` <span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px;background:#fff0c8;color:#a07000;vertical-align:middle">Guide Lokal</span>` : ""}</h3>
        <span class="booking-status ${bookingStatusClass(
          b.status
        )}">${escapeHtml(bookingStatusLabel(b.status))}</span>
      </div>
      <p>${escapeHtml(b.hostName || "Local Host")} · ${escapeHtml(
        b.location || "Lombok"
      )}${b.type === "guide" && b.experienceTitle ? ` · <em style="color:var(--muted)">${escapeHtml(b.experienceTitle)}</em>` : ""}</p>
      <div class="booking-meta-v2">
        <span>📅 ${escapeHtml(b.date)}</span>
        <span>◷ ${escapeHtml(b.time)}</span>
        <span>👥 ${b.guests}</span>
        ${b.type === "guide" ? `<span>⏱ ${escapeHtml(b.duration || "")}</span>` : ""}
        <span>${formatIDR(b.total)}</span>
      </div>
      <div class="booking-actions-v2">
        <button class="btn btn-light" onclick="openBookingDetail('${escapeAttr(
          b.id
        )}')">Lihat Rincian</button>
        <button class="btn btn-primary" onclick="openBookingDetail('${escapeAttr(
          b.id
        )}')">Hubungi ${b.type === "guide" ? "Guide" : "Host"}</button>
      </div>
    </article>
  `
    )
    .join("");
}

function renderHostBookingsV2() {
  const root = document.getElementById("hostBookings");
  if (!root) return;
  const imp = typeof getImpersonatedHost === 'function' ? getImpersonatedHost() : null;
  const hostEmail = getUser().email;
  const allRecords = getBookingRecords();

  let list = allRecords.filter((b) => b.hostEmail === hostEmail);
  if (imp && !list.length) {
    // Cari booking berdasarkan kecocokan judul pengalaman atau nama host
    list = allRecords.filter(
      (b) =>
        (imp.experienceTitle && b.title && b.title.toLowerCase().includes(imp.experienceTitle.toLowerCase())) ||
        (imp.experienceId && b.experienceId === imp.experienceId) ||
        (imp.name && b.hostName && b.hostName.toLowerCase().includes(imp.name.toLowerCase()))
    );
    // Jika masih kosong untuk demo, tampilkan rekaman booking relevan
    if (!list.length) list = allRecords.slice(0, 2);
  } else if (!list.length) {
    list = allRecords;
  }

  root.innerHTML = `
    <div class="dashboard-wrap" style="padding-bottom:10px">
      ${imp ? `
        <div class="impersonation-banner" style="margin-bottom:14px">
          <div class="impersonation-inner">
            <div class="impersonation-meta">
              <span class="impersonation-tag">⚡ MODE PENDAMPING (YOUTH CONNECTOR)</span>
              <p>Mengelola pemesanan tamu atas nama: <strong>${escapeHtml(imp.name)}</strong></p>
            </div>
            <button class="btn-return-connector" onclick="exitHostImpersonation()">
              Kembali ke Connector ➔
            </button>
          </div>
        </div>
      ` : ''}

      <div class="page-title" style="padding:0;margin-bottom:16px">
        <h1>Booking Management</h1>
        <p>${imp ? `Kelola reservasi tamu untuk ${escapeHtml(imp.name)}.` : 'Review guest requests and update each booking status.'}</p>
      </div>
    </div>
    <div class="booking-list" id="hostBookingListV2">
      ${
        list.length
          ? list
              .map(
                (b) => `
        <article class="booking-card-v2">
          <div class="booking-top">
            <h3>${escapeHtml(b.travelerName)} · ${escapeHtml(b.title)}</h3>
            <span class="booking-status ${bookingStatusClass(
              b.status
            )}">${escapeHtml(bookingStatusLabel(b.status))}</span>
          </div>
          <p>${escapeHtml(b.date)} · ${escapeHtml(b.time)} · ${
                  b.guests
                } guests</p>
          <div class="booking-meta-v2">
            <span>${formatIDR(b.total)}</span>
            <span>Host: ${escapeHtml(b.hostName || "You")}</span>
            <span>${escapeHtml(b.travelerEmail || "")}</span>
          </div>
          <div class="booking-actions-v2">
            <select class="host-status-select" aria-label="Change booking status" onchange="updateBookingStatus('${escapeAttr(
              b.id
            )}',this.value)">
              ${["Pending", "Confirmed", "Rejected", "Completed", "Cancelled"]
                .map(
                  (st) =>
                    `<option value="${st}" ${
                      b.status === st ? "selected" : ""
                    }>${bookingStatusLabel(st)}</option>`
                )
                .join("")}
            </select>
            <button class="btn btn-light" onclick="showBookingHostDetail('${escapeAttr(
              b.id
            )}')">View Details</button>
          </div>
        </article>
      `
              )
              .join("")
          : `<div style="text-align:center;padding:30px;color:var(--muted);font-size:11px">No booking requests yet.</div>`
      }
    </div>
  `;
}

function openBookingDetail(id) {
  const b = getBookingRecords().find((x) => x.id === id);
  if (!b) return;
  const content = document.getElementById("bookingDetailContent");
  if (!content) return;
  const canContact = !!b.hostEmail;
  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
      <div>
        <h3 style="font-size:15px;margin:0 0 5px">${escapeHtml(b.title)}</h3>
        <p style="font-size:10px;color:var(--muted);margin:0">${escapeHtml(
          b.category || "Local Experience"
        )} · ${escapeHtml(b.location || "Lombok")}</p>
      </div>
      <span class="booking-status ${bookingStatusClass(b.status)}">${escapeHtml(
    bookingStatusLabel(b.status)
  )}</span>
    </div>
    <div class="booking-detail-grid">
      <div class="booking-detail-item"><small>Date</small><strong>${escapeHtml(
        b.date
      )}</strong></div>
      <div class="booking-detail-item"><small>Meeting time</small><strong>${escapeHtml(
        b.time
      )}</strong></div>
      <div class="booking-detail-item"><small>Guests</small><strong>${
        b.guests
      } ${b.guests === 1 ? "guest" : "guests"}</strong></div>
      <div class="booking-detail-item"><small>Duration</small><strong>${escapeHtml(
        b.duration || "As scheduled"
      )}</strong></div>
      <div class="booking-detail-item"><small>Price / person</small><strong>${formatIDR(
        b.price
      )}</strong></div>
      <div class="booking-detail-item"><small>Total</small><strong>${formatIDR(
        b.total
      )}</strong></div>
    </div>
    <div class="booking-address-box" style="background:#f4f9f5;border:1px solid #d2e8d9;border-radius:12px;padding:14px;margin:14px 0">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2f7d55" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <small style="font-weight:700;color:#1B4332;letter-spacing:.5px">LOKASI PERTEMUAN</small>
      </div>
      <strong style="font-size:13px;color:#1a3a2a">${escapeHtml(b.location || "Lombok")}</strong>
      <p style="font-size:11px;color:#496153;margin:4px 0 10px">Harap tiba tepat waktu sesuai jadwal yang telah disepakati bersama host.</p>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.location || 'Lombok')}" target="_blank"
        style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#2f7d55;text-decoration:none">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
        Buka di Google Maps
      </a>
    </div>
    <div class="contact-host-box">
      <h3>Local Host</h3>
      <p><strong>${escapeHtml(
        b.hostName || "Local Host"
      )}</strong><br>${escapeHtml(
    b.hostEmail || "Contact information is not available yet."
  )}</p>
      ${
        canContact
          ? `<button class="btn btn-primary btn-block" style="margin-top:10px" onclick="contactHost('${escapeAttr(
              b.id
            )}')">Hubungi Host</button>`
          : ""
      }
    </div>
    ${
      b.status === "Pending"
        ? `<p style="font-size:9px;color:#8C857F;margin-top:12px">Booking ini masih menunggu konfirmasi dari host. Status akan berubah setelah host memproses permintaan.</p>`
        : ""
    }
  `;

  const modal = document.getElementById("bookingDetailModal");
  if (modal) modal.classList.add("open");
}

function closeBookingDetail() {
  const modal = document.getElementById("bookingDetailModal");
  if (modal) modal.classList.remove("open");
}

function contactHost(id) {
  const b = getBookingRecords().find((x) => x.id === id);
  if (!b) return;
  const email = b.hostEmail || "";
  if (email) {
    const subject = encodeURIComponent(`LokaLink Booking - ${b.title}`);
    const body = encodeURIComponent(
      `Halo ${b.hostName || "Host"}, saya ${
        b.travelerName || "Traveler"
      } ingin menghubungi Anda terkait booking ${b.title} pada ${
        b.date
      } pukul ${b.time}.`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  } else {
    showToast("Kontak host belum tersedia.");
  }
}

function showBookingHostDetail(id) {
  const b = getBookingRecords().find((x) => x.id === id);
  if (!b) return;
  const content = document.getElementById("bookingDetailContent");
  if (!content) return;
  content.innerHTML = `
    <div>
      <h3 style="font-size:15px;margin:0 0 5px">${escapeHtml(b.title)}</h3>
      <p style="font-size:10px;color:var(--muted);margin:0">Guest: ${escapeHtml(
        b.travelerName
      )}</p>
    </div>
    <div class="booking-detail-grid">
      <div class="booking-detail-item"><small>Date</small><strong>${escapeHtml(
        b.date
      )}</strong></div>
      <div class="booking-detail-item"><small>Time</small><strong>${escapeHtml(
        b.time
      )}</strong></div>
      <div class="booking-detail-item"><small>Guests</small><strong>${
        b.guests
      }</strong></div>
      <div class="booking-detail-item"><small>Total</small><strong>${formatIDR(
        b.total
      )}</strong></div>
      <div class="booking-detail-item"><small>Traveler email</small><strong>${escapeHtml(
        b.travelerEmail || "-"
      )}</strong></div>
      <div class="booking-detail-item"><small>Status</small><strong>${escapeHtml(
        bookingStatusLabel(b.status)
      )}</strong></div>
    </div>
    <div class="form-group">
      <label>UPDATE STATUS</label>
      <select class="field" onchange="updateBookingStatus('${escapeAttr(
        b.id
      )}',this.value)">
        ${["Pending", "Confirmed", "Rejected", "Completed", "Cancelled"]
          .map(
            (st) =>
              `<option value="${st}" ${
                b.status === st ? "selected" : ""
              }>${bookingStatusLabel(st)}</option>`
          )
          .join("")}
      </select>
    </div>
  `;
  const modal = document.getElementById("bookingDetailModal");
  if (modal) modal.classList.add("open");
}

function updateBookingStatus(id, status) {
  const data = getBookingRecords();
  const item = data.find((b) => b.id === id);
  if (!item) return;
  item.status = status;
  item.updatedAt = new Date().toISOString();
  saveBookingRecords(data);
  renderHostBookingsV2();
  renderTravelerBookingsV2();
  showToast(`Booking status updated to ${bookingStatusLabel(status)}.`);
}

function hireGuide() {
  selectedGuide = null;
  const modal = document.getElementById("guideModal");
  const nameEl = document.getElementById("guideDestName");
  if (nameEl) nameEl.textContent = currentExperience ? currentExperience.title : "destinasi ini";

  // Reset to step 1
  const step1 = document.getElementById("guideStep1");
  const step2 = document.getElementById("guideStep2");
  if (step1) step1.style.display = "block";
  if (step2) step2.style.display = "none";

  // Render guide list
  renderGuideList();

  if (modal) modal.classList.add("open");
}

function renderGuideList() {
  const container = document.getElementById("guideListContainer");
  if (!container || typeof guides === "undefined") return;

  container.innerHTML = guides
    .map(
      (g) => `
    <div onclick="selectGuide('${g.id}')" style="
      display:flex;align-items:flex-start;gap:12px;
      background:#fff;border:1.5px solid #ede8df;
      border-radius:14px;padding:12px;cursor:pointer;
      transition:border-color .2s,box-shadow .2s;
    "
    onmouseover="this.style.borderColor='#c8961e';this.style.boxShadow='0 4px 16px rgba(200,150,30,0.15)'"
    onmouseout="this.style.borderColor='#ede8df';this.style.boxShadow='none'"
    >
      <img src="${g.avatar}" alt="${escapeHtml(g.name)}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid #f0d98a">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:2px">
          <strong style="font-size:13px;color:var(--text)">${escapeHtml(g.name)}</strong>
          ${g.badges.map((b) => `<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:${b === "Top Guide" ? "#fff0c8" : b === "Terpopuler" ? "#f0fff4" : "#f0f7ff"};color:${b === "Top Guide" ? "#a07000" : b === "Terpopuler" ? "#1a7a3c" : "#2a5fa0"}">${escapeHtml(b)}</span>`).join("")}
        </div>
        <div style="font-size:11px;color:#c8961e;font-weight:600;margin-bottom:3px">${escapeHtml(g.specialty)}</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:5px;line-height:1.4">${escapeHtml(g.bio)}</div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-size:10px;color:#2f7d55;font-weight:600">★ ${g.rating} <span style="color:var(--muted);font-weight:400">(${g.reviews} ulasan)</span></span>
          <span style="font-size:10px;color:var(--muted)">${g.languages.join(" · ")}</span>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:12px;font-weight:700;color:#c8961e">${formatIDR(g.pricePerHour)}</div>
        <div style="font-size:9px;color:var(--muted)">/jam</div>
        <div style="margin-top:8px;background:linear-gradient(135deg,#c8961e,#e8b830);color:#fff;font-size:10px;font-weight:700;padding:5px 10px;border-radius:8px">
          Pilih
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function selectGuide(id) {
  selectedGuide = (typeof guides !== "undefined") ? guides.find((g) => g.id === id) : null;
  if (!selectedGuide) return;

  const step1 = document.getElementById("guideStep1");
  const step2 = document.getElementById("guideStep2");
  if (step1) step1.style.display = "none";
  if (step2) step2.style.display = "block";

  // Fill selected guide preview
  const preview = document.getElementById("selectedGuidePreview");
  if (preview) {
    preview.innerHTML = `
      <img src="${selectedGuide.avatar}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #f0d98a;flex-shrink:0">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:#7a5a00">${escapeHtml(selectedGuide.name)}</div>
        <div style="font-size:11px;color:#a07820;margin:1px 0">${escapeHtml(selectedGuide.specialty)}</div>
        <div style="font-size:10px;color:var(--muted)">★ ${selectedGuide.rating} · ${formatIDR(selectedGuide.pricePerHour)}/jam</div>
      </div>
      <div style="background:#c8961e;color:#fff;font-size:9px;font-weight:700;padding:3px 8px;border-radius:6px;align-self:flex-start">Terpilih ✓</div>
    `;
  }

  // Pre-fill traveler name
  const nameInput = document.getElementById("guideName");
  if (nameInput && typeof getUser === "function") {
    nameInput.value = getUser().name || "";
  }

  // Set default date
  const dateInput = document.getElementById("guideDate");
  if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

  updateGuideSummary();
}

function backToGuideList() {
  const step1 = document.getElementById("guideStep1");
  const step2 = document.getElementById("guideStep2");
  if (step1) step1.style.display = "block";
  if (step2) step2.style.display = "none";
  selectedGuide = null;
}

function updateGuideSummary() {
  if (!selectedGuide) return;
  const hours = parseInt(document.getElementById("guideHours")?.value || "3");
  const party = parseInt(document.getElementById("guideParty")?.value || "2");
  const total = selectedGuide.pricePerHour * hours;

  const rateEl = document.getElementById("sumGuideRate");
  const durEl = document.getElementById("sumGuideDuration");
  const totEl = document.getElementById("sumGuideTotal");

  if (rateEl) rateEl.textContent = `${formatIDR(selectedGuide.pricePerHour)}/jam`;
  if (durEl) durEl.textContent = `${hours} jam · ${party} orang`;
  if (totEl) totEl.textContent = formatIDR(total);
}

function closeGuideModal() {
  const modal = document.getElementById("guideModal");
  if (modal) modal.classList.remove("open");
}

function confirmGuideRequest() {
  if (!selectedGuide) {
    showToast("Pilih guide terlebih dahulu.");
    return;
  }

  const dateInput = document.getElementById("guideDate");
  const dateValue = dateInput ? dateInput.value : "";
  if (!dateValue) {
    showToast("Pilih tanggal kunjungan.");
    return;
  }

  const nameVal = document.getElementById("guideName")?.value || getUser().name;
  const phoneVal = document.getElementById("guidePhone")?.value || "";
  const hours = parseInt(document.getElementById("guideHours")?.value || "3");
  const party = parseInt(document.getElementById("guideParty")?.value || "2");

  const d = new Date(dateValue + "T00:00:00");
  const pretty = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const total = selectedGuide.pricePerHour * hours;

  const record = {
    id: "guide-" + Date.now(),
    type: "guide",
    travelerName: nameVal || getUser().name,
    travelerEmail: getUser().email,
    travelerPhone: phoneVal,
    title: `🧭 Guide: ${selectedGuide.name}`,
    experienceId: currentExperience ? currentExperience.id : "",
    experienceTitle: currentExperience ? currentExperience.title : "Destinasi Wisata",
    date: pretty,
    time: "09:00 AM",
    guests: party,
    price: selectedGuide.pricePerHour,
    total: total,
    hours: hours,
    status: "Pending",
    hostName: selectedGuide.name,
    hostEmail: selectedGuide.hostEmail,
    hostAvatar: selectedGuide.avatar,
    category: "Guide Lokal",
    location: currentExperience ? currentExperience.location : selectedGuide.location,
    duration: `${hours} jam`,
    guideId: selectedGuide.id,
    guideSpecialty: selectedGuide.specialty,
  };

  const data = getBookingRecords();
  data.unshift(record);
  saveBookingRecords(data);

  closeGuideModal();
  renderTravelerBookingsV2();
  showToast(
    `Permintaan guide ${selectedGuide.name} berhasil dikirim! Cek status di My Bookings.`
  );

  // Navigate to bookings
  setTimeout(() => {
    if (typeof goTo === "function") goTo("bookings");
  }, 800);
}

