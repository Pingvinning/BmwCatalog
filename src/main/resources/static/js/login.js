"use strict";

const ADMINS_KEY = "bmw_admins";

document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const form = $("#adminRegForm");
  const status = $("#regStatus");

  const first = $("#firstName");
  const last  = $("#lastName");
  const email = $("#email");
  const pass  = $("#password");
  const conf  = $("#confirm");
  const show  = $("#showPass");

  $("#clearForm").addEventListener("click", () => {
    [first,last,email,pass,conf].forEach(el => el.value = "");
    showMsg("", false, true);
  });

  show.addEventListener("change", () => {
    const type = show.checked ? "text" : "password";
    pass.type = type; conf.type = type;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMsg("", false, true);

    const nameOk = first.value.trim() && last.value.trim();
    const emailOk = /^\S+@\S+\.\S+$/.test(email.value.trim());
    const passVal = pass.value;
    const passOk = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(passVal); // буквы+цифры, >=8
    const match = passVal === conf.value;

    if (!nameOk)  return showMsg("Заполните имя и фамилию");
    if (!emailOk) return showMsg("Некорректный email");
    if (!passOk)  return showMsg("Пароль должен быть не короче 8 символов и содержать буквы и цифры");
    if (!match)   return showMsg("Пароли не совпадают");

    const admins = loadAdmins();
    if (admins.some(a => a.email.toLowerCase() === email.value.trim().toLowerCase())) {
      return showMsg("Такой email уже зарегистрирован");
    }

    const passHash = await sha256(passVal);
    admins.push({
      id: Date.now(),
      firstName: first.value.trim(),
      lastName:  last.value.trim(),
      email:     email.value.trim(),
      passHash,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
    showMsg("Готово! Аккаунт создан ✅", true);

    form.reset();
  });

  function loadAdmins(){
    try { return JSON.parse(localStorage.getItem(ADMINS_KEY) || "[]"); }
    catch { return []; }
  }

  function showMsg(msg, ok=false, hide=false){
    if (hide){ status.style.display="none"; return; }
    status.textContent = msg;
    status.style.display = "block";
    status.style.color = ok ? "var(--brand)" : "#d32f2f";
  }
});

async function sha256(text){
  if (window.crypto?.subtle){
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  // fallback (не криптостойко, но чтобы не падало)
  return btoa(unescape(encodeURIComponent(text)));
}
