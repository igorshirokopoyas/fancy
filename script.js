/*
  FANCY PUMP — regional configuration.
  Replace the values below before publishing.
*/
const SITE_CONFIG = {
  region: "Ваш регион",
  phone: "+1 (000) 000-00-00",
  phoneHref: "+10000000000",
  email: "info@example.com",
  address: "Ваш регион, ваш адрес",
  formEndpoint: "" // e.g. your CRM/form API endpoint. Leave empty for demo mode.
};

document.querySelectorAll("[data-region]").forEach(el => el.textContent = SITE_CONFIG.region);
document.querySelectorAll("[data-phone]").forEach(el => el.textContent = SITE_CONFIG.phone);
document.querySelectorAll("[data-phone-link]").forEach(el => el.href = "tel:" + SITE_CONFIG.phoneHref);
document.querySelectorAll("[data-email]").forEach(el => { el.textContent = SITE_CONFIG.email; el.href = "mailto:" + SITE_CONFIG.email; });
document.querySelectorAll("[data-address]").forEach(el => el.textContent = SITE_CONFIG.address);
document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
burger?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll("[data-product]").forEach(btn => {
  btn.addEventListener("click", () => {
    const field = document.getElementById("selectedProduct");
    if (field) field.value = btn.dataset.product;
  });
});

const form = document.getElementById("leadForm");
const note = document.getElementById("formNote");
const toast = document.getElementById("toast");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if (!SITE_CONFIG.formEndpoint) {
    note.textContent = "Демо-режим: подключите formEndpoint в script.js, чтобы отправлять заявки.";
    showToast("Форма заполнена — подключите обработчик заявки.");
    return;
  }

  try {
    const response = await fetch(SITE_CONFIG.formEndpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Request failed");
    form.reset();
    note.textContent = "Заявка отправлена. Мы свяжемся с вами.";
    showToast("Заявка отправлена");
  } catch {
    note.textContent = "Не удалось отправить заявку. Проверьте настройки formEndpoint.";
  }
});
