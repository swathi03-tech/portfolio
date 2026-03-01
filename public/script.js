const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("show"));
document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("show"));
});

// ✅ Change this later when backend is deployed
const BACKEND_URL = "https://portfolio-8feu.onrender.com";

const contactForm = document.getElementById("contactForm");
const note = document.getElementById("formNote");
const cName = document.getElementById("cName");
const cEmail = document.getElementById("cEmail");
const cMsg = document.getElementById("cMsg");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  note.textContent = "Sending...";

  try {
    const res = await fetch(`${BACKEND_URL}/send-mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cName.value.trim(),
        email: cEmail.value.trim(),
        message: cMsg.value.trim()
      })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      note.textContent = "✅ Message sent successfully!";
      contactForm.reset();
    } else {
      note.textContent = "❌ Failed to send. Check backend or email settings.";
    }
  } catch (err) {
    note.textContent = "❌ Backend not running / CORS issue.";
  }
});