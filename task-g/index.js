// Author: Kasper Luhtio
// Date: 2025-11-07
// Handles form validation and table updates

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const tableBody = document.querySelector("#dataTable tbody");
  const timestampInput = document.getElementById("timestamp");

  // Set timestamp automatically on page load
  timestampInput.value = new Date().toLocaleString();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    // Get values
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birth = document.getElementById("birth").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    // ✅ Custom validation rules
    if (!/^([A-Za-zÀ-ÖØ-öø-ÿ]{2,})\s+([A-Za-zÀ-ÖØ-öø-ÿ]{2,})/.test(name)) {
      document.getElementById("nameError").textContent = "Please enter your full name (first and last).";
      valid = false;
    }

    if (!email.includes("@") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (!/^\+358\d{7,9}$/.test(phone)) {
      document.getElementById("phoneError").textContent = "Phone must start with +358 and contain 9–12 digits.";
      valid = false;
    }

    const birthDate = new Date(birth);
    const today = new Date();
    if (!birth || birthDate > today) {
      document.getElementById("birthError").textContent = "Birth date cannot be in the future.";
      valid = false;
    }

    if (!terms) {
      document.getElementById("termsError").textContent = "You must accept the terms.";
      valid = false;
    }

    if (!valid) return;

    // ✅ Add new row to table
    const row = document.createElement("tr");
    [timestampInput.value, name, email, phone, birth].forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      row.appendChild(td);
    });
    tableBody.appendChild(row);

    // Reset form & update timestamp
    form.reset();
    timestampInput.value = new Date().toLocaleString();
  });
});
