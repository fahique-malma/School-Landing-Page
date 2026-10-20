const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

function closeMenu() {
  nav?.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
  if (menu) menu.textContent = "☰";
}
menu?.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "×" : "☰";
});
nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("click", (event) => {
  if (
    nav?.classList.contains("open") &&
    !nav.contains(event.target) &&
    !menu?.contains(event.target)
  )
    closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((el) => observer.observe(el));
} else items.forEach((el) => el.classList.add("in"));

document.querySelectorAll(".faqs details").forEach((d) => {
  const sync = () => {
    const icon = d.querySelector("summary span");
    if (icon) icon.textContent = d.open ? "−" : "+";
  };
  sync();
  d.addEventListener("toggle", sync);
});

const quotes = document.getElementById("quotes");
document
  .getElementById("prev")
  ?.addEventListener("click", () =>
    quotes?.scrollBy({ left: -280, behavior: "smooth" }),
  );
document
  .getElementById("next")
  ?.addEventListener("click", () =>
    quotes?.scrollBy({ left: 280, behavior: "smooth" }),
  );

const form = document.getElementById("form"),
  message = document.getElementById("message");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  message.textContent = `Thanks${name ? ", " + name : ""}! Your enquiry is complete.`;
  form.reset();
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("visit")?.addEventListener("click", () => {
  const intent = form?.elements.intent;
  if (intent) intent.value = "Book a campus visit";
});

const topBtn = document.getElementById("top");
window.addEventListener(
  "scroll",
  () => topBtn?.classList.toggle("visible", window.scrollY > 550),
  { passive: true },
);
topBtn?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);