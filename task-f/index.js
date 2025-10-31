/*
Author: Kasper Luhtio
Date: 2025-10-06
*/
document.addEventListener("DOMContentLoaded", () => {
  const CHECK = "✅";
  const CROSS = "❌";

  const form = document.getElementById("addCourseForm");
  const nameInput = document.getElementById("courseName");

  const table = document.getElementById("timetable");
  const theadRow = table.querySelector("thead tr");
  const tbody = table.querySelector("tbody");

 
  const dayLabels = Array.from(theadRow.querySelectorAll("th"))
    .slice(1)
    .map((th) => th.textContent.trim());

  const fieldset = form.querySelector(".days-group");
  const legend = fieldset.querySelector("legend") || document.createElement("legend");
  if (!legend.textContent) legend.textContent = "Days (yes = ✅, no = ❌)";
  fieldset.innerHTML = "";
  fieldset.appendChild(legend);

  dayLabels.forEach((day) => {
    const id = `day-${day.toLowerCase()}`;
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "day";
    input.id = id;
    input.value = day;
    label.append(input, " ", day);
    fieldset.appendChild(label);
  });

  // Add row
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const courseName = (nameInput.value || "").trim() || "New course";
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = courseName;
    tr.appendChild(nameTd);

    const selected = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked')).map((cb) => cb.value)
    );

    dayLabels.forEach((day) => {
      const td = document.createElement("td");
      td.textContent = selected.has(day) ? CHECK : CROSS;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);

    
    nameInput.value = "";
    nameInput.focus();
  });
});
