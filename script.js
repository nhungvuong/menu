document.addEventListener("DOMContentLoaded", () => {
  fetch("/menu.json")
    .then(res => {
      if (!res.ok) throw new Error("Không load được menu.json");
      return res.json();
    })
    .then(data => renderMenu(data))
    .catch(err => {
      document.getElementById("menu").innerHTML =
        "<p style='text-align:center;color:red'>Không tải được menu</p>";
      console.error(err);
    });
});

function renderMenu(data) {
  const menuEl = document.getElementById("menu");
  const footerEl = document.getElementById("footer");

  menuEl.innerHTML = "";

  data.categories.forEach(category => {
    const section = document.createElement("section");
    section.className = "category";

    section.innerHTML = `
      <h2>${category.name_vi} (${category.name_en})</h2>
      ${category.note_vi ? `<p class="note">${category.note_vi} (${category.note_vi})</p>` : ""}
      <ul class="items">
        ${category.items.map(item =>
          `<li class="item">${item.name_vi} (${item.name_en})</li>`
        ).join("")}
      </ul>
    `;

    menuEl.appendChild(section);
  });

  footerEl.innerHTML = `
    <p>${data.shop.name}</p>
    <p>Hotline: ${data.shop.hotline}</p>
  `;
}
