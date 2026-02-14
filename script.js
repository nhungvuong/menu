let menuData = null;
let backBtn = null;

document.addEventListener("DOMContentLoaded", () => {
  backBtn = document.getElementById("back-btn");

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

  backBtn.onclick = backToCategories;
});


/* ================= CATEGORY VIEW ================= */

function renderCategories(categories) {
  const el = document.getElementById("category-list");
  el.innerHTML = "";

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";

    card.innerHTML = `
      <img src="${cat.image}" class="category-image"/>
      <h2>
        ${cat.name_vi}
        <br>
        <span class="en-name">(${cat.name_en})</span>
      </h2>
    `;

    card.onclick = () => openCategory(cat);
    el.appendChild(card);
  });
}


/* ================= PRODUCT VIEW ================= */

function openCategory(category) {

  document.getElementById("category-list").classList.add("hidden");

  const productEl = document.getElementById("product-list");
  productEl.classList.remove("hidden");

  backBtn.style.display = "inline-block";

  productEl.innerHTML = `
    <h2 class="category-title">${category.name_vi}</h2>

    <div class="items">
      ${category.items.map(item => `
        <div class="product-card">
          <img src="${item.image}" class="product-image"/>
          <div class="product-name">
            ${item.name_vi}
            <br>
            <span class="product-en-name">${item.name_en ? `(${item.name_en})` : ''}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}


function backToCategories() {
  document.getElementById("product-list").classList.add("hidden");
  document.getElementById("category-list").classList.remove("hidden");
}


/* ================= FOOTER ================= */

function renderFooter(shop) {
  document.getElementById("footer").innerHTML = `
    <div>
      ${shop.name}<br>
      Hotline: ${shop.hotline}
    </div>
  `;
}
