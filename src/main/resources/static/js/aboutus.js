"use strict";

const STORAGE_KEY = "bmw_contact_cards";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const cardsMount = $("#cardsMount");

  // Render saved cards (0,1 или 2 штуки)
  const contacts = loadContacts();
  renderCards(contacts, cardsMount);

  // Feedback form
  const uName = $("#uName");
  const uPhone = $("#uPhone");
  const uEmail = $("#uEmail");
  const uMsg = $("#uMsg");
  const msgCount = $("#msgCount");
  const status = $("#sendStatus");

  uMsg.addEventListener("input", () => {
    msgCount.textContent = String(uMsg.value.length);
  });
  msgCount.textContent = "0";

  $("#clearForm").addEventListener("click", () => {
    [uName,uPhone,uEmail,uMsg].forEach(el => el.value = "");
    msgCount.textContent = "0";
    status.style.display = "none";
  });

  $("#feedbackForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = uName.value.trim();
    const phone = uPhone.value.trim();
    const email = uEmail.value.trim();
    const message = uMsg.value.trim();

    if (!message) return show("Введите сообщение.");
    if (!email && !phone) return show("Укажите хотя бы email или телефон.");

    // берём первый доступный email из визиток
    const targetEmail = (contacts.find(c => c && c.email) || {}).email;

    if (targetEmail) {
      const subject = "Сообщение с контактов BMW";
      const body = `Имя: ${name || "-"}\nТелефон: ${phone || "-"}\nEmail: ${email || "-"}\n\nСообщение:\n${message}`;
      const mailto = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // открываем почтовый клиент
      window.location.href = mailto;
      show("Открыт ваш почтовый клиент. Если не открылся — проверьте настройки по умолчанию.", true);
    } else {
      // fallback: сохраняем в локальное хранилище
      const QUEUE = "bmw_user_message_queue";
      const list = JSON.parse(localStorage.getItem(QUEUE) || "[]");
      list.push({ name, phone, email, message, ts: Date.now() });
      localStorage.setItem(QUEUE, JSON.stringify(list));
      show("Нет email получателя. Сообщение сохранено локально, админ сможет его увидеть.", true);
    }
  });

  function show(msg, ok=false){
    status.textContent = msg;
    status.style.display = "block";
    status.style.color = ok ? "var(--brand)" : "#d32f2f";
  }
});

function loadContacts(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    // нормализуем
    return (arr || []).map(c => c ? {
      firstName: c.firstName || "",
      lastName:  c.lastName  || "",
      email:     c.email     || "",
      phone:     c.phone     || ""
    } : null).filter(Boolean);
  } catch {
    return [];
  }
}

function renderCards(contacts, mount){
  const makeCard = (c) => `
    <div class="contact-card">
      <div class="card-top"><div class="badge">BMW</div></div>
      <div class="card-body">
        <h3>${escapeHTML(`${c.firstName || "Имя"} ${c.lastName || "Фамилия"}`.trim())}</h3>
        <p>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.85 22 2 13.15 2 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/></svg>
          <span>${escapeHTML(formatPL(c.phone || "+48 123 456 789"))}</span>
        </p>
        <p>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v1.2l10 6.25 10-6.25V6a2 2 0 00-2-2zm0 6.15l-8.8 5.5a1 1 0 01-1.05 0L4 10.15V18a2 2 0 002 2h12a2 2 0 002-2v-7.85z"/></svg>
          <span>${escapeHTML(c.email || "name@example.com")}</span>
        </p>
        <div class="actions" style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
          <a class="btn" href="${telHref(c.phone || '')}">Позвонить</a>
          <a class="btn" href="mailto:${encodeURIComponent(c.email || '')}?subject=${encodeURIComponent('Запрос')}">Написать</a>
        </div>
      </div>
    </div>
  `;

  if (!contacts.length) {
    mount.innerHTML = `<div class="error-message">Контакты пока не добавлены.</div>`;
    return;
  }

  mount.innerHTML = contacts.map(makeCard).join("");
}

function formatPL(v=""){
  const d = v.replace(/\D/g,"");
  if (d.length === 9) return `+48 ${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6)}`;
  if (d.length === 11 && d.startsWith("48")) {
    const x = d.slice(2);
    return `+48 ${x.slice(0,3)} ${x.slice(3,6)} ${x.slice(6)}`;
  }
  return v.trim();
}
function telHref(v=""){
  const d = v.replace(/\D/g,"");
  if (d.length === 9) return `tel:+48${d}`;
  if (d.length === 11 && d.startsWith("48")) return `tel:+${d}`;
  return `tel:${v}`;
}
function escapeHTML(s=""){
  return s.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
