// Initialize EmailJS safely
if (typeof emailjs !== "undefined" && emailjs.init) {
  emailjs.init({ publicKey: "ei9bSrYBvyFiRpNyx" });
  console.log("✅ EmailJS initialized successfully");
} else {
  console.error("❌ EmailJS SDK not loaded.");
}

// DOM Elements
let notificationTimer;
let callbackTimer;

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const cleanPhone = phone.replace(/\D/g, ""); // Remove non-digits
  return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone); // Indian mobile numbers
}

function sanitizeInput(input) {
  return input
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/&/g, "&amp;");
}

// ===================== HEADER SCROLL EFFECT =====================
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===================== REFER FRIENDS FUNCTIONALITY =====================
function showReferPopup() {
  const referData = {
    title: "Refer Friends to GoFICO Training",
    description:
      "Help your friends advance their careers with professional SAP FICO training!",
    benefits: [
      "Your friend gets expert SAP FICO training",
      "You earn referral rewards",
      "Both get placement assistance",
      "Strengthen your professional network",
    ],
    shareText: `🎯 Transform your career with SAP FICO training! 

✅ Expert trainers with real-world experience
✅ Hands-on practical training
✅ Mock interviews & placement assistance
✅ Flexible learning options

Join GoFICO Training Academy and become job-ready!

📞 Call: +91 9391983250
🌐 Visit: https://gofico.com/

#SAPFICO #CareerGrowth #Training`,
  };

  // Remove existing refer popup if any
  const existingPopup = document.getElementById("refer-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create refer popup
  const popup = document.createElement("div");
  popup.id = "refer-popup";
  popup.className = "refer-popup";

  const popupContent = document.createElement("div");
  popupContent.className = "refer-popup-content";

  popupContent.innerHTML = `
    <div class="refer-header">
      <div class="refer-icon">
        <i class="bi bi-people-fill"></i>
      </div>
      <h3>${referData.title}</h3>
      <button class="refer-close" onclick="hideReferPopup()">&times;</button>
    </div>
    
    <div class="refer-body">
      <p class="refer-description">${referData.description}</p>
      
      <div class="refer-benefits">
        <h4><i class="bi bi-gift-fill"></i> Benefits</h4>
        <ul>
          ${referData.benefits
            .map(
              (benefit) =>
                `<li><i class="bi bi-check-circle-fill"></i> ${benefit}</li>`
            )
            .join("")}
        </ul>
      </div>
      
      <div class="refer-actions">
        <button class="refer-share-btn" onclick="shareReferMessage()">
          <i class="bi bi-share-fill"></i> Share via Apps
        </button>
        
        <button class="refer-copy-btn" onclick="copyReferMessage()">
          <i class="bi bi-clipboard-fill"></i> Copy Message
        </button>
        
        <button class="refer-whatsapp-btn" onclick="shareViaWhatsApp()">
          <i class="bi bi-whatsapp"></i> Share on WhatsApp
        </button>
      </div>
      
      <div class="refer-footer">
        <small><i class="bi bi-info-circle-fill"></i> Share this message with friends who are interested in SAP FICO training</small>
      </div>
    </div>
  `;

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  // Show popup with animation
  setTimeout(() => popup.classList.add("show"), 10);

  // Close popup when clicking outside
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      hideReferPopup();
    }
  });

  // Prevent body scroll when popup is open
  document.body.style.overflow = "hidden";
}

function hideReferPopup() {
  const popup = document.getElementById("refer-popup");
  if (popup) {
    popup.classList.remove("show");
    setTimeout(() => {
      popup.remove();
      // Re-enable body scroll
      document.body.style.overflow = "";
    }, 300);
  }
}

function shareReferMessage() {
  const referText = `🎯 Transform your career with SAP FICO training! 

✅ Expert trainers with real-world experience
✅ Hands-on practical training
✅ Mock interviews & placement assistance
✅ Flexible learning options

Join GoFICO Training Academy and become job-ready!

📞 Call: +91 9391983250
🌐 Visit: https://gofico.com/

#SAPFICO #CareerGrowth #Training`;

  if (navigator.share) {
    navigator
      .share({
        title: "SAP FICO Training Opportunity",
        text: referText,
        url: "https://gofico.com/",
      })
      .then(() => {
        console.log("✅ Refer message shared successfully");
        hideReferPopup();
      })
      .catch((error) => {
        console.log("❌ Error sharing refer message:", error);
      });
  } else {
    // Fallback: copy to clipboard
    copyReferMessage();
  }
}

function copyReferMessage() {
  const referText = `🎯 Transform your career with SAP FICO training! 

✅ Expert trainers with real-world experience
✅ Hands-on practical training
✅ Mock interviews & placement assistance
✅ Flexible learning options

Join GoFICO Training Academy and become job-ready!

📞 Call: +91 9391983250
🌐 Visit: https://gofico.com/

#SAPFICO #CareerGrowth #Training`;

  navigator.clipboard
    .writeText(referText)
    .then(() => {
      showReferSuccess(
        "✅ Referral message copied! Share it with your friends."
      );
      hideReferPopup();
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = referText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      showReferSuccess(
        "✅ Referral message copied! Share it with your friends."
      );
      hideReferPopup();
    });
}

function shareViaWhatsApp() {
  const referText = `🎯 Transform your career with SAP FICO training! 

✅ Expert trainers with real-world experience
✅ Hands-on practical training
✅ Mock interviews & placement assistance
✅ Flexible learning options

Join GoFICO Training Academy and become job-ready!

📞 Call: +91 9391983250
🌐 Visit: https://gofico.com/

#SAPFICO #CareerGrowth #Training`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(referText)}`;
  window.open(whatsappUrl, "_blank");
  hideReferPopup();
}

function showReferSuccess(message) {
  // Remove existing success message if any
  const existingMsg = document.querySelector(".refer-success");
  if (existingMsg) {
    existingMsg.remove();
  }

  // Show success message
  const successMsg = document.createElement("div");
  successMsg.className = "refer-success";
  successMsg.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${message}`;
  document.body.appendChild(successMsg);

  setTimeout(() => {
    successMsg.classList.add("show");
  }, 10);

  setTimeout(() => {
    successMsg.classList.remove("show");
    setTimeout(() => successMsg.remove(), 300);
  }, 3000);
}

// ===================== NOTIFICATION POPUP =====================
function updateNotificationContent(type = "callback") {
  const title = document.querySelector(".notification-content h3");
  const text = document.querySelector(".notification-content p");

  if (type === "contact") {
    if (title) title.textContent = "Message Sent Successfully!";
    if (text)
      text.textContent =
        "Thank you for contacting us. We'll get back to you within 24 hours.";
  } else {
    if (title) title.textContent = "Callback Request Sent!";
    if (text)
      text.textContent =
        "Thank you for your interest in SAP FICO training. We'll contact you within 24 hours during your preferred time.";
  }
}

function showNotification(type = "callback") {
  const popup = document.getElementById("notification-popup");
  if (!popup) return console.error("Notification popup not found");

  updateNotificationContent(type);
  popup.classList.add("show");

  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(hideNotification, 5000);
}

function hideNotification() {
  const popup = document.getElementById("notification-popup");
  if (popup) {
    popup.classList.remove("show");
    // Re-enable body scroll
    document.body.style.overflow = "";
  }
}

// ===================== CALLBACK POPUP =====================
function showCallbackPopup() {
  const popup = document.getElementById("callback-popup");
  if (!popup) return console.error("Callback popup not found");

  popup.classList.add("show");
  clearTimeout(callbackTimer);
  callbackTimer = setTimeout(hideCallbackPopup, 50000);

  // Prevent body scroll when popup is open
  document.body.style.overflow = "hidden";
}

function hideCallbackPopup() {
  const popup = document.getElementById("callback-popup");
  if (popup) {
    popup.classList.remove("show");
    // Re-enable body scroll
    document.body.style.overflow = "";
  }
}

// ===================== CALLBACK SUBMISSION =====================
function submitCallbackRequest() {
  console.log("📞 Submitting callback request...");

  const nameEl = document.getElementById("callback-name");
  const phoneEl = document.getElementById("callback-phone");
  const timeEl = document.getElementById("callback-time");

  if (!nameEl || !phoneEl || !timeEl) {
    alert("Form elements missing. Please refresh and try again.");
    return;
  }

  const name = sanitizeInput(nameEl.value);
  const phone = sanitizeInput(phoneEl.value);
  const timeValue = timeEl.value;

  if (!name || !phone || !timeValue) return alert("All fields are required.");
  if (name.length < 2) return alert("Name must be at least 2 characters.");
  if (!validatePhone(phone))
    return alert("Enter a valid 10-digit mobile number.");

  const preferredTime = timeEl.options[timeEl.selectedIndex].text;

  const callbackParams = {
    name,
    phone,
    preferred_time: preferredTime,
    email: "callback-request@gofico.com",
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

  // Show loading state
  const submitBtn = document.querySelector(".callback-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
  submitBtn.disabled = true;

  emailjs
    .send("service_ooxv8wf", "template_d536ja9", callbackParams)
    .then(() => {
      nameEl.value = "";
      phoneEl.value = "";
      timeEl.value = "";
      hideCallbackPopup();
      showNotification("callback");
    })
    .catch((error) => {
      console.error("❌ Callback request failed:", error);
      alert("Failed to submit. Contact us at +91 9391983250.");
    })
    .finally(() => {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
}

// ===================== CONTACT FORM SUBMISSION =====================
function emailSend() {
  console.log("✉️ Submitting contact form...");

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  if (!nameEl || !emailEl || !messageEl) {
    alert("Form elements missing. Please refresh and try again.");
    return;
  }

  const name = sanitizeInput(nameEl.value);
  const email = sanitizeInput(emailEl.value);
  const message = sanitizeInput(messageEl.value);

  if (!name || !email || !message) return alert("All fields are required.");
  if (name.length < 2) return alert("Name must be at least 2 characters.");
  if (!validateEmail(email)) return alert("Enter a valid email address.");
  if (message.length < 10)
    return alert("Message must be at least 10 characters.");

  const params = { name, email, message };

  // Show loading state
  const submitBtn = document.querySelector(".btn-orange");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
  submitBtn.disabled = true;

  emailjs
    .send("service_ooxv8wf", "template_d536ja9", params)
    .then(() => {
      nameEl.value = "";
      emailEl.value = "";
      messageEl.value = "";
      showNotification("contact");
    })
    .catch((error) => {
      console.error("❌ Contact form failed:", error);
      alert("Failed to send: " + (error.text || error));
    })
    .finally(() => {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
}

// ===================== FORM VALIDATION =====================
function validateFormInput(input, min, validator) {
  const val = sanitizeInput(input.value);
  if (val && (val.length < min || !validator(val))) {
    input.style.borderColor = "#ef4444";
    input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
  } else if (val) {
    input.style.borderColor = "#10b981";
    input.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)";
  } else {
    input.style.borderColor = "#e2e8f0";
    input.style.boxShadow = "none";
  }
}

// ===================== DOM INITIALIZATION =====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM ready, initializing...");

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      emailSend();
    });
  }

  // Input validation colors for contact form
  const contactInputs = [
    { el: "name", min: 2, validator: () => true },
    { el: "email", min: 5, validator: validateEmail },
    { el: "message", min: 10, validator: (msg) => msg.length >= 10 },
  ];

  contactInputs.forEach(({ el, min, validator }) => {
    const input = document.getElementById(el);
    if (!input) return;
    input.addEventListener("blur", function () {
      validateFormInput(this, min, validator);
    });

    // Also validate on input for real-time feedback
    input.addEventListener("input", function () {
      validateFormInput(this, min, validator);
    });
  });

  // Notification close
  const closeBtn = document.getElementById("close-popup");
  if (closeBtn) closeBtn.addEventListener("click", hideNotification);

  // Callback form
  const callbackForm = document.getElementById("callback-form");
  if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitCallbackRequest();
    });
  }

  // Callback close
  const callbackCloseBtn = document.getElementById("callback-close");
  if (callbackCloseBtn)
    callbackCloseBtn.addEventListener("click", hideCallbackPopup);

  // Refer Friends button
  const referBtn = document.getElementById("refer-btn");
  if (referBtn) {
    referBtn.addEventListener("click", showReferPopup);
  }

  // Auto-show callback popup after 15s (increased from 13s)
  setTimeout(() => {
    const cbPopup = document.getElementById("callback-popup");
    if (cbPopup && !cbPopup.classList.contains("show")) showCallbackPopup();
  }, 15000);

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Add loading spinner CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
      display: inline-block;
    }
    
    /* Enhanced animations */
    .feature-card, .card, .card-box {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    .highlight-item {
      transition: all 0.2s ease;
    }
    
    .training-highlights {
      animation: fadeIn 0.8s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
});
