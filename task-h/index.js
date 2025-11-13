// Author: Kasper Luhtio
// Task H (Tailwind version)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const tableBody = document.getElementById("dataTable");
  const timestampInput = document.getElementById("timestamp");

  timestampInput.value = new Date().toLocaleString();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll("small").forEach(el => el.textContent = "");

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birth = document.getElementById("birth").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    if (!/^([A-Za-zÀ-ÖØ-öø-ÿ]{2,})\s+([A-Za-zÀ-ÖØ-öø-ÿ]{2,})/.test(name)) {
      nameError.textContent = "Please enter your full name (first and last).";
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = "Please enter a valid email.";
      valid = false;
    }

    if (!/^\+358\d{7,9}$/.test(phone)) {
      phoneError.textContent = "Phone must start with +358 and contain 9–12 digits.";
      valid = false;
    }

    const birthDate = new Date(birth);
    if (!birth || birthDate > new Date()) {
      birthError.textContent = "Birth date cannot be in the future.";
      valid = false;
    }

    if (!terms) {
      termsError.textContent = "You must accept the terms.";
      valid = false;
    }

    if (!valid) return;

    const row = document.createElement("tr");
    [timestampInput.value, name, email, phone, birth].forEach(val => {
      const td = document.createElement("td");
      td.className = "p-2 border-b border-slate-300";
      td.textContent = val;
      row.appendChild(td);
    });

    tableBody.appendChild(row);

    form.reset();
    timestampInput.value = new Date().toLocaleString();
  });
});
