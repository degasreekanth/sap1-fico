if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: "ei9bSrYBvyFiRpNyx" });
  console.log("EmailJS initialized successfully");
} else {
  console.error("EmailJS SDK not loaded.");
}

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "");
  // Check if it's a valid 10-digit Indian mobile number
  return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
}

function sanitizeInput(input) {
  return input.trim().replace(/[<>"'&]/g, "");
}

// Update notification content based on context
function updateNotificationContent(type = "callback") {
  const notificationTitle = document.querySelector(".notification-content h3");
  const notificationText = document.querySelector(".notification-content p");

  if (type === "contact") {
    if (notificationTitle)
      notificationTitle.textContent = "Message Sent Successfully!";
    if (notificationText)
      notificationText.textContent =
        "Thank you for contacting us. We'll get back to you within 24 hours.";
  } else {
    if (notificationTitle)
      notificationTitle.textContent = "Callback Request Sent!";
    if (notificationText)
      notificationText.textContent =
        "Thank you for your interest in SAP FICO training. We've received your callback request and will contact you within 24 hours during your preferred time.";
  }
}

function showNotification(type = "callback") {
  const popup = document.getElementById("notification-popup");
  if (popup) {
    console.log("Showing notification popup for:", type);
    updateNotificationContent(type);
    popup.classList.add("show");

    // Auto-hide after 5 seconds
    setTimeout(() => {
      hideNotification();
    }, 5000);
  } else {
    console.error("Notification popup element not found");
  }
}

function hideNotification() {
  const popup = document.getElementById("notification-popup");
  if (popup) {
    console.log("Hiding notification popup");
    popup.classList.remove("show");
  } else {
    console.error("Notification popup element not found when trying to hide");
  }
}

// Callback popup functions
function showCallbackPopup() {
  const popup = document.getElementById("callback-popup");
  if (popup) {
    console.log("Showing callback popup");
    popup.classList.add("show");

    // Auto-hide after 30 seconds (longer for form completion)
    setTimeout(() => {
      hideCallbackPopup();
    }, 30000);
  } else {
    console.error("Callback popup element not found");
  }
}

function hideCallbackPopup() {
  const popup = document.getElementById("callback-popup");
  if (popup) {
    console.log("Hiding callback popup");
    popup.classList.remove("show");
  } else {
    console.error("Callback popup element not found when trying to hide");
  }
}

function submitCallbackRequest() {
  console.log("Submitting callback request...");

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

  // Get and sanitize form values
  const name = sanitizeInput(nameEl.value);
  const phone = sanitizeInput(phoneEl.value);
  const timeValue = timeEl.value;

  console.log("Form data:", { name, phone, timeValue });

  // Validate form values
  if (!name || !phone || !timeValue) {
    console.warn("Validation failed: empty fields");
    alert("Please fill in all required fields.");
    return;
  }

  if (name.length < 2) {
    console.warn("Validation failed: name too short");
    alert("Please enter a valid name (at least 2 characters).");
    return;
  }

  if (!validatePhone(phone)) {
    console.warn("Validation failed: invalid phone number");
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

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

  console.log("Sending email with params:", callbackParams);

  // Send to email via EmailJS
  emailjs
    .send("service_ooxv8wf", "template_d536ja9", callbackParams)
    .then(function (response) {
      console.log("Email sent successfully:", response);

      // Clear form
      nameEl.value = "";
      phoneEl.value = "";
      timeEl.value = "";

      // Hide callback popup
      hideCallbackPopup();

      // Show success notification for callback (no WhatsApp redirect)
      showNotification("callback");
    })
    .catch(function (error) {
      console.error("Email sending failed:", error);
      alert(
        "Failed to submit callback request. Please try again or contact us directly at +91 9391983250."
      );
    });
}

function emailSend() {
  console.log("Submitting contact form...");

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  if (!nameEl || !emailEl || !messageEl) {
    console.error("Contact form elements not found:", {
      nameEl: !!nameEl,
      emailEl: !!emailEl,
      messageEl: !!messageEl,
    });
    alert(
      "Contact form elements not found. Please refresh the page and try again."
    );
    return;
  }

  // Get and sanitize form values
  const name = sanitizeInput(nameEl.value);
  const email = sanitizeInput(emailEl.value);
  const message = sanitizeInput(messageEl.value);

  console.log("Contact form data:", {
    name,
    email,
    message: message.substring(0, 50) + "...",
  });

  // Validate form values
  if (!name || !email || !message) {
    console.warn("Validation failed: empty fields");
    alert("Please fill in all required fields.");
    return;
  }

  if (name.length < 2) {
    console.warn("Validation failed: name too short");
    alert("Please enter a valid name (at least 2 characters).");
    return;
  }

  if (!validateEmail(email)) {
    console.warn("Validation failed: invalid email");
    alert("Please enter a valid email address.");
    return;
  }

  if (message.length < 10) {
    console.warn("Validation failed: message too short");
    alert("Please enter a message with at least 10 characters.");
    return;
  }

  const parms = {
    name: name,
    email: email,
    message: message,
  };

  console.log("Sending contact email with params:", parms);

  emailjs
    .send("service_ooxv8wf", "template_d536ja9", parms)
    .then(function (response) {
      console.log("Contact email sent successfully:", response);

      // Clear form
      nameEl.value = "";
      emailEl.value = "";
      messageEl.value = "";

      // Show notification popup for contact form
      showNotification("contact");
    })
    .catch(function (error) {
      console.error("Contact form email failed:", error);
      alert("Failed to send email: " + (error.text || error));
    });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - Initializing JavaScript...");

  // Contact form handler
  const form = document.querySelector("form");
  if (form) {
    console.log("Contact form found, adding event listener");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Form submit event triggered");
      emailSend();
    });

    // Add real-time validation feedback
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput) {
      nameInput.addEventListener("blur", function () {
        const name = sanitizeInput(this.value);
        if (name.length > 0 && name.length < 2) {
          this.style.borderColor = "#ff4444";
          console.warn("Name validation: too short");
        } else if (name.length >= 2) {
          this.style.borderColor = "#28a745";
        } else {
          this.style.borderColor = "";
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        const email = sanitizeInput(this.value);
        if (email.length > 0 && !validateEmail(email)) {
          this.style.borderColor = "#ff4444";
          console.warn("Email validation: invalid format");
        } else if (validateEmail(email)) {
          this.style.borderColor = "#28a745";
        } else {
          this.style.borderColor = "";
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener("blur", function () {
        const message = sanitizeInput(this.value);
        if (message.length > 0 && message.length < 10) {
          this.style.borderColor = "#ff4444";
          console.warn("Message validation: too short");
        } else if (message.length >= 10) {
          this.style.borderColor = "#28a745";
        } else {
          this.style.borderColor = "";
        }
      });
    }
  } else {
    console.warn("Contact form not found on this page");
  }

  // Close popup button event listener
  const closePopupBtn = document.getElementById("close-popup");
  if (closePopupBtn) {
    console.log("Close popup button found");
    closePopupBtn.addEventListener("click", hideNotification);
  } else {
    console.warn("Close popup button not found");
  }

  // Close popup when clicking outside
  const popup = document.getElementById("notification-popup");
  if (popup) {
    console.log("Notification popup found");
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        hideNotification();
      }
    });
  } else {
    console.warn("Notification popup not found");
  }

  // Callback popup event listeners
  const callbackForm = document.getElementById("callback-form");
  if (callbackForm) {
    console.log("Callback form found, adding event listener");
    callbackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitCallbackRequest();
    });
  } else {
    console.warn("Callback form not found");
  }

  const callbackCloseBtn = document.getElementById("callback-close");
  if (callbackCloseBtn) {
    console.log("Callback close button found");
    callbackCloseBtn.addEventListener("click", hideCallbackPopup);
  } else {
    console.warn("Callback close button not found");
  }

  // Close callback popup when clicking outside
  const callbackPopup = document.getElementById("callback-popup");
  if (callbackPopup) {
    console.log("Callback popup found");
    callbackPopup.addEventListener("click", function (e) {
      if (e.target === callbackPopup) {
        hideCallbackPopup();
      }
    });
  } else {
    console.warn("Callback popup not found");
  }

  // Show callback popup after 8 seconds
  setTimeout(() => {
    const callbackPopup = document.getElementById("callback-popup");
    if (callbackPopup && !callbackPopup.classList.contains("show")) {
      console.log("Auto-showing callback popup after 8 seconds");
      showCallbackPopup();
    }
  }, 8000);

  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
    console.log("Year set to:", currentYear);
  } else {
    console.warn("Year span element not found");
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  console.log("Found", anchorLinks.length, "anchor links");

  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        console.log("Smooth scrolling to:", targetId);
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Target element not found for anchor:", targetId);
      }
    });
  });

  console.log("JavaScript initialization complete");
});
