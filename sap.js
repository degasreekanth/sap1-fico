if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: "ei9bSrYBvyFiRpNyx" });
} else {
  console.error("EmailJS SDK not loaded.");
}

function showNotification() {
  const popup = document.getElementById("notification-popup");
  if (popup) {
    popup.classList.add("show");

    // Auto-hide after 5 seconds
    setTimeout(() => {
      hideNotification();
    }, 5000);
  }
}

function hideNotification() {
  const popup = document.getElementById("notification-popup");
  if (popup) {
    popup.classList.remove("show");
  }
}

// Callback popup functions
function showCallbackPopup() {
  const popup = document.getElementById("callback-popup");
  if (popup) {
    popup.classList.add("show");

    // Auto-hide after 30 seconds (longer for form completion)
    setTimeout(() => {
      hideCallbackPopup();
    }, 30000);
  }
}

function hideCallbackPopup() {
  const popup = document.getElementById("callback-popup");
  if (popup) {
    popup.classList.remove("show");
  }
}

function submitCallbackRequest() {
  const nameEl = document.getElementById("callback-name");
  const phoneEl = document.getElementById("callback-phone");
  const timeEl = document.getElementById("callback-time");

  if (!nameEl || !phoneEl || !timeEl) {
    console.error("Form elements not found:", {
      nameEl: !!nameEl,
      phoneEl: !!phoneEl,
      timeEl: !!timeEl,
    });
    alert("Form elements not found. Please refresh the page and try again.");
    return;
  }

  // Validate form values
  if (!nameEl.value.trim() || !phoneEl.value.trim() || !timeEl.value) {
    alert("Please fill in all required fields.");
    return;
  }

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const preferredTime = timeEl.options[timeEl.selectedIndex].text;

  const callbackParams = {
    name: name,
    phone: phone,
    preferred_time: preferredTime,
    email: "callback-request@sapfico.com",
    message: `CALLBACK REQUEST DETAILS:

👤 Name: ${name}
📞 Phone: ${phone}
🕐 Preferred Call Time: ${preferredTime}

📋 Request Type: SAP FICO Training Callback
📅 Request Date: ${new Date().toLocaleDateString()}
⏰ Request Time: ${new Date().toLocaleTimeString()}

💼 Action Required: Please call the above number within 24 hours during their preferred time slot.

🎯 Course Interest: SAP FICO Training Program`,
  };

  // Send to email via EmailJS
  emailjs
    .send("service_ooxv8wf", "template_d536ja9", callbackParams)
    .then(function (response) {
      // Send to WhatsApp
      const whatsappMessage = `*New Callback Request*%0A%0A*Name:* ${encodeURIComponent(
        name
      )}%0A*Phone:* ${encodeURIComponent(
        phone
      )}%0A*Preferred Time:* ${encodeURIComponent(
        preferredTime
      )}%0A%0APlease call back within 24 hours.`;
      const whatsappUrl = `https://wa.me/9391983250?text=${whatsappMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      // Clear form
      nameEl.value = "";
      phoneEl.value = "";
      timeEl.value = "";

      // Hide callback popup
      hideCallbackPopup();

      // Show success notification
      showNotification();
    })
    .catch(function (error) {
      console.error("Email sending failed:", error);
      alert(
        "Failed to submit callback request. Please try again or contact us directly at +91 9391983250."
      );
    });
}

function emailSend() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  if (!nameEl || !emailEl || !messageEl) {
    alert(
      "Contact form elements not found. Please refresh the page and try again."
    );
    return;
  }

  // Validate form values
  if (
    !nameEl.value.trim() ||
    !emailEl.value.trim() ||
    !messageEl.value.trim()
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const parms = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    message: messageEl.value.trim(),
  };

  emailjs
    .send("service_ooxv8wf", "template_d536ja9", parms)
    .then(function () {
      // Clear form
      nameEl.value = "";
      emailEl.value = "";
      messageEl.value = "";

      // Show notification popup instead of alert
      showNotification();
    })
    .catch(function (error) {
      console.error("Contact form email failed:", error);
      alert("Failed to send email: " + (error.text || error));
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

  // Close popup button event listener
  const closePopupBtn = document.getElementById("close-popup");
  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", hideNotification);
  }

  // Close popup when clicking outside
  const popup = document.getElementById("notification-popup");
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        hideNotification();
      }
    });
  }

  // Callback popup event listeners
  const callbackForm = document.getElementById("callback-form");
  if (callbackForm) {
    callbackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitCallbackRequest();
    });
  }

  const callbackCloseBtn = document.getElementById("callback-close");
  if (callbackCloseBtn) {
    callbackCloseBtn.addEventListener("click", hideCallbackPopup);
  }

  // Close callback popup when clicking outside
  const callbackPopup = document.getElementById("callback-popup");
  if (callbackPopup) {
    callbackPopup.addEventListener("click", function (e) {
      if (e.target === callbackPopup) {
        hideCallbackPopup();
      }
    });
  }

  // Show callback popup after 8 seconds
  setTimeout(() => {
    const callbackPopup = document.getElementById("callback-popup");
    if (callbackPopup && !callbackPopup.classList.contains("show")) {
      showCallbackPopup();
    }
  }, 8000);

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
