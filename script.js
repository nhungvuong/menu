let menuData = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("/menu.json")
    .then(res => res.json())
    .then(data => {
      menuData = data;
      renderCategories(data.categories);
      renderFooter(data.shop);
    })
    .catch(() => {
      document.getElementById("category-list").innerHTML =
        "<p style='text-align:center;color:red'>Không tải được menu</p>";
    });
});

/* ========== CATEGORY VIEW ========== */
function renderCategories(categories) {
  const el = document.getElementById("category-list");
  el.innerHTML = "";

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name_vi}" class="category-image" />
      <h2>${cat.name_vi} <br> <span style="font-size:14px;">(${cat.name_en})</span></h2>
    `;

    card.onclick = () => openCategory(cat);
    el.appendChild(card);
  });
}

/* ========== PRODUCT VIEW ========== */
function openCategory(category) {
  document.getElementById("category-list").classList.add("hidden");
  const productEl = document.getElementById("product-list");
  productEl.classList.remove("hidden");

  productEl.innerHTML = `
    <button class="back-btn" onclick="backToCategories()">← Danh mục</button>
    <h2 class="category-title">${category.name_vi} </h2>
    ${category.note_vi ? `<p class="note">${category.note_vi}</p>` : ""}
    <ul class="items">
      ${category.items.map(item =>
        `<li class="item">${item.name_vi}</li>`
      ).join("")}
    </ul>
  `;
}

function backToCategories() {
  document.getElementById("product-list").classList.add("hidden");
  document.getElementById("category-list").classList.remove("hidden");
}

/* ========== FOOTER ========== */
function renderFooter(shop) {
  document.getElementById("footer").innerHTML = `
    <p>${shop.name}</p>
    <p>Hotline: ${shop.hotline}</p>
  `;
}
