fetch("./products.json")
  .then(res => res.json())
  .then(products => {
    window.products = products;
    const grid = document.getElementById("product-grid");

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${p.img}">
        <h3>${p.title}</h3>
        <div class="price">${p.price} Ft</div>
        <button class="add-btn" onclick="addToCart(${p.id}, event)">Kosárba</button>
      `;

      grid.appendChild(card);
    });
  });

// ----------------------
// 2. Kosár tömb
// ----------------------
let cart = [];

// ----------------------
// 3. Kosárhoz adás
// ----------------------
function addToCart(id, event) {
  const product = window.products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCartUI();

    // Gomb animáció
    if (event && event.target) {
      const button = event.target;
      button.classList.add('added');
      setTimeout(() => button.classList.remove('added'), 300);
    }
  }
}

// ----------------------
// 4. Kosár UI frissítése
// ----------------------
function updateCartUI() {
  const itemsDiv = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const total = document.getElementById("cart-total");

  itemsDiv.innerHTML = "";
  let sum = 0;

  cart.forEach(i => {
    sum += i.price;
    itemsDiv.innerHTML += `
      <div class="cart-item">
        <span>${i.title}</span>
        <span>${i.price} Ft</span>
      </div>`;
  });

  count.innerText = cart.length;
  total.innerText = sum + " Ft";
}

// ----------------------
// 5. Kosár panel nyitás/zárás
// ----------------------
function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

// ----------------------
// 6. DOMContentLoaded esemény
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const cartPanel = document.getElementById("cart-panel");
  const checkoutBtn = document.querySelector(".checkout");
  if (!cartPanel || !checkoutBtn) return;

  // --- X gomb létrehozása ---
  if (!document.getElementById("cartCloseBtn")) {
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = "&times;"; // Kilépő X jel
    closeBtn.id = "cartCloseBtn";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "15px";
    closeBtn.style.fontSize = "28px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.userSelect = "none";
    cartPanel.appendChild(closeBtn);

    // X gomb esemény
    closeBtn.addEventListener("click", () => {
      cartPanel.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });

    // Hover animáció (opcionális)
    closeBtn.addEventListener("mouseenter", () => closeBtn.style.color = "#00ffc6");
    closeBtn.addEventListener("mouseleave", () => closeBtn.style.color = "#ffffffff");
  }

  // --- Checkout esemény ---
  if (!checkoutBtn.dataset.listenerAttached) {
    checkoutBtn.dataset.listenerAttached = "true";

    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // 1. Kamu nyugtázó üzenet
      if (!document.getElementById("checkoutMessage")) {
        const message = document.createElement("div");
        message.id = "checkoutMessage";
        message.textContent = "Köszönjük! A rendelésed sikeresen leadásra került.";

        message.style.position = "fixed";
        message.style.top = "20px";
        message.style.left = "50%";
        message.style.transform = "translateX(-50%)";
        message.style.backgroundColor = "#00ffc6";
        message.style.color = "#000";
        message.style.padding = "15px 25px";
        message.style.borderRadius = "8px";
        message.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        message.style.fontSize = "16px";
        message.style.fontWeight = "bold";
        message.style.zIndex = "9999";
        message.style.opacity = "0";
        message.style.transition = "opacity 0.5s ease";

        document.body.appendChild(message);

        setTimeout(() => message.style.opacity = "1", 50);
        setTimeout(() => {
          message.style.opacity = "0";
          setTimeout(() => message.remove(), 500);
        }, 3000);
      }

      // 2. Kosár DOM törlés
      cartPanel.querySelectorAll(".cart-item").forEach(item => item.remove());

      // 3. JS tömb ürítése
      cart = [];

      // 4. LocalStorage törlés (ha használod)
      localStorage.removeItem("cartItems");

      // 5. Kosár összeg és darabszám frissítése
      const totalElem = cartPanel.querySelector("#cart-total");
      if (totalElem) totalElem.textContent = "0 Ft";

      const countElem = document.getElementById("cart-count");
      if (countElem) countElem.innerText = "0";
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const contactSection =
        document.querySelector("#kapcsolat") ||
        document.querySelector("#contact") ||
        document.querySelector("section:last-of-type");

    if (!contactSection) return;

    contactSection.style.position = "relative";

    const videoBox = document.createElement("div");
    videoBox.style.position = "absolute";
    videoBox.style.top = "300px";   // magasság a section tetejétől
    videoBox.style.right = "50px";
    videoBox.style.width = "160px"; // szélesség növelve
    videoBox.style.height = "270px"; // magasság a 16:9 arányhoz
    videoBox.style.zIndex = "10";

    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/XlTN-AyPOFk"; // YouTube embed URL
    iframe.width = "100%";
    iframe.height = "100%"; // kitölti a videoBox-ot
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 0 20px #00ffc6, 0 0 40px rgba(0,255,198,0.5)";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    videoBox.appendChild(iframe);

    contactSection.appendChild(videoBox);
});


document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo-img");
  if (!logo) return;

  logo.style.cursor = "pointer";

  logo.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.background = "rgba(0,0,0,0)";
    overlay.style.backdropFilter = "blur(0px)";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.5s ease, background 0.5s ease, backdrop-filter 0.5s ease";
    overlay.style.zIndex = "1000";

    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/WI_YJkFzOr4?autoplay=1";
    iframe.style.width = "80%";
    iframe.style.height = "80%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 0 25px #00ffc6, 0 0 40px rgba(0,255,198,0.5)";
    iframe.style.transform = "scale(0.8)";
    iframe.style.opacity = "0";
    iframe.style.transition = "transform 0.5s ease, opacity 0.5s ease";

    const closeBtn = document.createElement("div");
    closeBtn.innerText = "✖";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "30px";
    closeBtn.style.fontSize = "30px";
    closeBtn.style.color = "#fff";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.transition = "all 0.2s ease";

    closeBtn.addEventListener("mouseenter", () => {
      closeBtn.style.transform = "scale(1.3)";
      closeBtn.style.color = "#00ffc6";
    });
    closeBtn.addEventListener("mouseleave", () => {
      closeBtn.style.transform = "scale(1)";
      closeBtn.style.color = "#fff";
    });

    closeBtn.addEventListener("click", () => {
      iframe.src = "";  // leállítjuk a videót
      overlay.style.opacity = "0";
      overlay.style.background = "rgba(0,0,0,0)";
      overlay.style.backdropFilter = "blur(0px)";
      setTimeout(() => document.body.removeChild(overlay), 500);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeBtn.click();
      }
    });

    overlay.appendChild(iframe);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.style.background = "rgba(0,0,0,0.7)";
      overlay.style.backdropFilter = "blur(6px)";
      iframe.style.transform = "scale(1)";
      iframe.style.opacity = "1";
    });
  });
});
