if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: "ei9bSrYBvyFiRpNyx" });
} else {
  console.error("EmailJS SDK not loaded.");
}

function emailSend() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  if (!nameEl || !emailEl || !messageEl) {
    alert("Form elements not found.");
    return;
  }

  const parms = {
    name: nameEl.value,
    email: emailEl.value,
    message: messageEl.value,
  };

  emailjs
    .send("service_ooxv8wf", "template_d536ja9", parms)
    .then(function () {
      alert("Email Sent!!");
    })
    .catch(function (error) {
      alert("Failed to send email: " + error.text || error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      emailSend();
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
