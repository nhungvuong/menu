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
      <div class="category-title">${category.name_vi} <br> (${category.name_en})</div>
      <ul class="items">
        ${category.items.map(item =>
          `<li class="item">${item.name_vi} <br> <span class="item-name-en">(${item.name_en})</span></li>`
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
