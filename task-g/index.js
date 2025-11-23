/*
Author: Kasper Luhtio
Date: 2025-11-21
*/

document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById("registerForm");
  const tbody = document.querySelector("#dataTable tbody");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Clear earlier errors
    clearErrors();

    let valid = true;

    // Read values
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const birth = form.birth.value.trim();
    const terms = document.getElementById("terms").checked;

    // --------------------------
    // VALIDATION RULES
    // --------------------------

    // Full name: at least 2 words, each 2+ letters
    if (!/^[A-Za-zÅÄÖåäö]{2,}\s+[A-Za-zÅÄÖåäö]{2,}/.test(fullName)) {
      showError("nameError", "Please enter your full name (first and last).");
      valid = false;
    }

    // Email: must contain @ and .
    if (!email.includes("@") || !email.includes(".")) {
      showError("emailError", "Please enter a valid email address.");
      valid = false;
    }

    // Phone: must start with +358 and contain digits
    if (!/^\+358\d{7,}$/.test(phone)) {
      showError("phoneError", "Phone number must start with +358 and contain digits only.");
      valid = false;
    }

    // Birth date: not in the future
    const today = new Date().toISOString().split("T")[0];
    if (birth === "" || birth > today) {
      showError("birthError", "Birth date cannot be in the future.");
      valid = false;
    }

    // Terms checkbox
    if (!terms) {
      showError("termsError", "You must accept the terms before submitting.");
      valid = false;
    }

    // --------------------------
    // STOP if errors exist
    // --------------------------
    if (!valid) return;

    // Create timestamp
    const timestamp = new Date().toLocaleString();

    // Create table row
    const row = document.createElement("tr");
    [timestamp, fullName, email, phone, birth].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });

    // Add row to table
    tbody.appendChild(row);

    // Clear form
    form.reset();
  });

  // --------------------------
  // Helper functions
  // --------------------------
  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
  }
});
