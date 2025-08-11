"use strict";

/* localStorage key */
const STORAGE_KEY = "bmw_contact_cards";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);

  // Inputs
  const fields = {
    1: {
      first: $("#firstName1"), last: $("#lastName1"),
      email: $("#email1"), phone: $("#phone1"),
      cardName: $("#cardName1"), cardEmail: $("#cardEmail1"), cardPhone: $("#cardPhone1"),
      callBtn: $("#callBtn1"), mailBtn: $("#mailBtn1")
    },
    2: {
      first: $("#firstName2"), last: $("#lastName2"),
      email: $("#email2"), phone: $("#phone2"),
      cardName: $("#cardName2"), cardEmail: $("#cardEmail2"), cardPhone: $("#cardPhone2"),
      callBtn: $("#callBtn2"), mailBtn: $("#mailBtn2")
    }
  };

  // Helpers
  const formatPL = (v="") => {
    const d = v.replace(/\D/g,"");
    if (d.length === 9) return `+48 ${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6)}`;
    if (d.length === 11 && d.startsWith("48")) {
      const x = d.slice(2);
      return `+48 ${x.slice(0,3)} ${x.slice(3,6)} ${x.slice(6)}`;
    }
    return v.trim();
  };
  const telHref = (v="") => {
    const d = v.replace(/\D/g,"");
    if (d.length === 9) return `tel:+48${d}`;
    if (d.length === 11 && d.startsWith("48")) return `tel:+${d}`;
    return `tel:${v}`;
  };

  // Load from storage
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [null, null];
      const arr = JSON.parse(raw);
      return [arr[0] || null, arr[1] || null];
    } catch {
      return [null, null];
    }
  }

  // Save to storage
  function save() {
    const c1 = readForm(1);
    const c2 = readForm(2);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([c1, c2]));
    alert("Сохранено ✅");
  }

  // Read inputs
  function readForm(n) {
    const f = fields[n];
    return {
      firstName: f.first.value.trim(),
      lastName:  f.last.value.trim(),
      email:     f.email.value.trim(),
      phone:     f.phone.value.trim()
    };
  }

  // Update one preview
  function updatePreview(n) {
    const f = fields[n];
    const first = f.first.value.trim() || "Имя";
    const last  = f.last.value.trim()  || "Фамилия";
    const email = f.email.value.trim() || "name@example.com";
    const phone = f.phone.value.trim() || "+48 123 456 789";

    f.cardName.textContent  = `${first} ${last}`.trim();
    f.cardEmail.textContent = email;
    f.cardPhone.textContent = formatPL(phone);
    f.callBtn.href = telHref(phone);
    f.mailBtn.href = `mailto:${email}?subject=${encodeURIComponent("Запрос")}`;
  }

  // Fill forms with loaded data
  function apply(contact, n) {
    const f = fields[n];
    if (!contact) { updatePreview(n); return; }
    f.first.value = contact.firstName || "";
    f.last.value  = contact.lastName  || "";
    f.email.value = contact.email     || "";
    f.phone.value = contact.phone     || "";
    updatePreview(n);
  }

  // Init
  const [c1, c2] = load();
  apply(c1,1); apply(c2,2);

  // Bind updates
  [1,2].forEach(n => {
    const f = fields[n];
    [f.first,f.last,f.email,f.phone].forEach(el => el.addEventListener("input", () => updatePreview(n)));
  });

  // Buttons
  document.querySelector("#saveAdmin").addEventListener("click", () => {
    // простая валидация: у первого контакта все поля обязательны
    if (!fields[1].first.value.trim() || !fields[1].last.value.trim() ||
        !fields[1].email.value.trim() || !fields[1].phone.value.trim()) {
      alert("Заполните все поля для Контакта 1.");
      return;
    }
    save();
  });

  document.querySelector("#clearAdmin").addEventListener("click", () => {
    if (!confirm("Очистить все сохранённые контакты?")) return;
    localStorage.removeItem(STORAGE_KEY);
    ["first","last","email","phone"].forEach(k => { fields[1][k].value = ""; fields[2][k].value = ""; });
    updatePreview(1); updatePreview(2);
  });
});
