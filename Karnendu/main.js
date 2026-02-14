const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("site-nav-mobile");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("hidden");
    const expanded = String(!isOpen);
    navToggle.setAttribute("aria-expanded", expanded);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");
const statusBox = document.getElementById("form-status");

function setFieldError(id, message) {
  const error = document.getElementById(`${id}-error`);
  const field = document.getElementById(id);

  if (!error || !field) {
    return;
  }

  if (message) {
    error.textContent = message;
    error.classList.remove("hidden");
    field.setAttribute("aria-invalid", "true");
  } else {
    error.textContent = "";
    error.classList.add("hidden");
    field.removeAttribute("aria-invalid");
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function submitContactForm(event) {
  event.preventDefault();

  if (!form || !submitButton || !statusBox) {
    return;
  }

  setFieldError("name", "");
  setFieldError("email", "");
  setFieldError("message", "");
  statusBox.textContent = "";
  statusBox.className = "text-sm text-slate-600";

  const name = (document.getElementById("name")?.value || "").trim();
  const email = (document.getElementById("email")?.value || "").trim();
  const message = (document.getElementById("message")?.value || "").trim();
  const companyTrap = (document.getElementById("company")?.value || "").trim();

  let hasError = false;

  if (!name) {
    setFieldError("name", "Please enter your name.");
    hasError = true;
  }

  if (!email) {
    setFieldError("email", "Please enter your email.");
    hasError = true;
  } else if (!isValidEmail(email)) {
    setFieldError("email", "Please enter a valid email address.");
    hasError = true;
  }

  if (!message) {
    setFieldError("message", "Please enter your message.");
    hasError = true;
  } else if (message.length < 20) {
    setFieldError("message", "Please provide at least 20 characters.");
    hasError = true;
  }

  if (hasError) {
    statusBox.textContent = "Please review the highlighted fields.";
    statusBox.className = "text-sm text-red-700";
    return;
  }

  if (companyTrap) {
    statusBox.textContent = "Submission rejected.";
    statusBox.className = "text-sm text-red-700";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Opening Mail...";

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  statusBox.textContent = "Opening your default email app...";
  statusBox.className = "text-sm text-emerald-700";

  window.location.href = `mailto:karnendu.pattanaik2015@yahoo.com?subject=${subject}&body=${body}`;
  form.reset();

  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Send Email";
  }, 800);
}

if (form) {
  form.addEventListener("submit", submitContactForm);
}
