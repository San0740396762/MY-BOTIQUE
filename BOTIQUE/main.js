/* ==========================================================================
   general.js — Boutique Order Form Logic
   ========================================================================== */

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // If no form found, exit
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const productInput = document.getElementById("product");
  const quantityInput = document.getElementById("quantity");

  // Attach submit event
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const product = productInput.value;
    const quantity = parseInt(quantityInput.value);

    // 1. Validate user input
    if (!validateForm(name, email, product, quantity)) {
      return;
    }

    // 2. Construct order object
    const order = buildOrder(name, email, product, quantity);

    // 3. Save order to storage
    saveOrder(order);

    // 4. Provide user feedback
    showMessage(
      `✅ Thank you ${name}! Your order for ${quantity} ${product}(s) has been placed.`,
      "success"
    );

    // 5. Optional reset/redirect
    setTimeout(() => {
      form.reset();
    }, 2000);
  });

  // Autofill with mock data (optional)
  autoFillForm();

  // Theme toggling for bonus stars 🌙
  setupThemeToggle();
});

/* ==========================================================================
   Functions
   ========================================================================== */

/**
 * Validate user form input
 */
function validateForm(name, email, product, quantity) {
  if (!name || !email || !product || isNaN(quantity)) {
    showMessage("⚠️ Please fill out all fields correctly.", "error");
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage("⚠️ Please enter a valid email address.", "error");
    document.getElementById("email").focus();
    return false;
  }

  if (quantity < 1 || quantity > 10) {
    showMessage("⚠️ Quantity must be between 1 and 10.", "error");
    document.getElementById("quantity").focus();
    return false;
  }

  return true;
}

/**
 * Build order object
 */
function buildOrder(name, email, product, quantity) {
  return {
    name,
    email,
    product,
    quantity,
    time: new Date().toLocaleString()
  };
}

/**
 * Save order to localStorage
 */
function saveOrder(order) {
  const existing = JSON.parse(localStorage.getItem("boutiqueOrderHistory") || "[]");
  existing.push(order);
  localStorage.setItem("boutiqueOrderHistory", JSON.stringify(existing));
  localStorage.setItem("lastOrder", JSON.stringify(order));
}

/**
 * Show feedback message
 */
function showMessage(message, type = "success") {
  let alertBox = document.querySelector(".form-alert");

  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.className = "form-alert";
    document.querySelector("form").prepend(alertBox);
  }

  alertBox.textContent = message;
  alertBox.classList.remove("error", "success");
  alertBox.classList.add(type);
}

/**
 * Auto-fill form for dev/demo
 */
function autoFillForm() {
  if (!window.location.href.includes("buy.html")) return;

  const mock = JSON.parse(localStorage.getItem("lastOrder"));
  if (mock) {
    document.getElementById("name").value = mock.name;
    document.getElementById("email").value = mock.email;
    document.getElementById("product").value = mock.product;
    document.getElementById("quantity").value = mock.quantity;
  }
}

/**
 * Setup dark/light mode toggle
 */
function setupThemeToggle() {
  const existingToggle = document.querySelector("#themeToggle");
  if (existingToggle) return;

  const toggle = document.createElement("button");
  toggle.id = "themeToggle";
  toggle.innerText = "🌓 Toggle Theme";
  toggle.style.position = "fixed";
  toggle.style.bottom = "20px";
  toggle.style.right = "20px";
  toggle.style.zIndex = "999";
  toggle.style.padding = "10px 15px";
  toggle.style.backgroundColor = "#333";
  toggle.style.color = "#fff";
  toggle.style.border = "none";
  toggle.style.borderRadius = "5px";
  toggle.style.cursor = "pointer";
  toggle.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";

  document.body.appendChild(toggle);

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const status = document.body.classList.contains("dark-mode") ? "on" : "off";
    localStorage.setItem("darkMode", status);
  });

  // Restore theme on load
  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
  }
}

/* ==========================================================================
   Utility CSS (attach to style tag or CSS file for dark mode)
   ========================================================================== */
/*
.dark-mode {
  background-color: #121212;
  color: #eee;
}

.dark-mode .checkout-container {
  background-color: #1e1e1e;
}

.dark-mode input,
.dark-mode select {
  background-color: #222;
  color: #fff;
  border-color: #444;
}

.dark-mode .form-alert.success {
  background-color: #198754;
}

.dark-mode .form-alert.error {
  background-color: #b02a37;
}
*/

/* ==========================================================================
   Debug Helpers
   ========================================================================== */

// Uncomment to view saved orders in console
// console.log(JSON.parse(localStorage.getItem("boutiqueOrderHistory") || "[]"));

/* ==========================================================================
   END OF FILE ✨
   ========================================================================== */
