/* ========= Datos (ejemplo) ========= */
const PRODUCTS = [
  { id: 1,  name: "Bicicleta BMX Wtp Arcade Candy Red",   price: 594992,  category: "BMX",       stock: 20, images: ["img1a.jpg","img1b.jpg","img1c.jpg"] },
  { id: 2,  name: "Bicicleta BMX Wtp Trust Cs Rsd Matt Black",  price: 1149990, category: "BMX",  stock: 8,  images: ["img2a.jpg","img2b.jpg"] },
  { id: 3,  name: "Bicicleta BMX Wtp Trust Fc Rsd Matt Trans Violet",           price: 1149990,  category: "BMX",   stock: 15, images: ["img3a.jpg"] },
  { id: 4,  name: "Scooter Monopatín De Pie Plegable Ajustable Jovenes Adultos",    price: 36990,  category: "Monopatin",       stock: 12, images: ["img4a.jpg"] },
  { id: 5,  name: "Scooter Lucky Crew Black Neo",price: 215992,  category: "Monopatin", stock: 10, images: ["img5a.jpg"] },
  { id: 6,  name: "Mochila Daypack 20L", price: 32990,  category: "Bolsos",      stock: 18, images: ["img6a.jpg"] },
  { id: 7,  name: "Botella Térmica 750ml",price:14990,  category: "Outdoor",     stock: 25, images: ["img7a.jpg"] },
  { id: 8,  name: "Polera Essential",    price: 9990,   category: "Ropa",        stock: 30, images: ["img8a.jpg"] },
  { id: 9,  name: "Mouse Inalámbrico Lx",price: 15990,  category: "Periféricos", stock: 40, images: ["img9a.jpg"] },
  { id:10,  name: "Webcam FHD",          price: 21990,  category: "Periféricos", stock: 22, images: ["img10a.jpg"] },
  { id:11,  name: "Cargador 30W USB-C",  price: 12990,  category: "Accesorios",  stock: 50, images: ["img11a.jpg"] },
  { id:12,  name: "SSD 1TB NVMe",        price: 89990,  category: "Almacenamiento", stock: 9, images: ["img12a.jpg"] },
];

/* ========= Utilidades ========= */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const money = n => n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

/* ========= Carrito (localStorage) ========= */
const CART_KEY = "cart_v1";

/** Lee carrito. Estructura: [{id, qty}] */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) ?? []; }
  catch { return []; }
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function cartCount(cart = getCart()) {
  return cart.reduce((acc, it) => acc + it.qty, 0);
}
function updateCartBadge() {
  const badge = $("#cart-count");
  if (badge) badge.textContent = String(cartCount());
}

/*Reglas de negocio para añadir al carrito*/

function addToCart(productId, qty = 1) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return alert("Producto no encontrado.");

  qty = Number(qty);
  if (!Number.isInteger(qty) || qty < 1) return alert("Cantidad inválida.");
  if (qty > 10) return alert("Máximo 10 por compra.");

  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  const currentQty = item ? item.qty : 0;
  if (currentQty + qty > prod.stock) {
    return alert(`Stock insuficiente. Disponible: ${prod.stock - currentQty}`);
  }

  if (item) item.qty += qty;
  else cart.push({ id: productId, qty });

  setCart(cart);
  alert("Producto añadido al carrito.");
}

/* ========= Render Productos (grilla) ========= */
function renderProductsGrid(containerSel = "#grid") {
  const el = $(containerSel);
  if (!el) return;
  el.innerHTML = PRODUCTS.map(p => `
    <article class="card col-12 sm-6 lg-3">
      <a class="card__img" href="detallesProductos.html?id=${p.id}" aria-label="${p.name}">
        <div class="ph">Imagen</div>
      </a>
      <div class="card__body">
        <div class="muted">${p.category}</div>
        <h3 class="t">${p.name}</h3>
        <div class="row">
          <span class="price">${money(p.price)}</span>
          <button type="button" data-id="${p.id}">Añadir</button>
        </div>
      </div>
    </article>
  `).join("");

  // botones añadir
  el.querySelectorAll("button[data-id]").forEach(btn=>{
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id), 1));
  });
}

/* ========= Render Detalle ========= */
function getProductIdFromURL() {
  const params = new URLSearchParams(location.search);
  return Number(params.get("id"));
}

function renderProductDetail() {
  const id = getProductIdFromURL();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  if (!p) return;

  // título, precio y texto
  $("#p-title").textContent = p.name;
  $("#p-price").textContent = money(p.price);
  $("#p-desc").textContent =
    "Descripción breve del producto. Materiales de alta calidad, garantía y soporte. Envío a todo Chile.";

  // imagen principal
  const main = $("#p-main");
  main.innerHTML = `<div class="main-ph">Imagen principal</div>`;

  // miniaturas
  const thumbs = $("#p-thumbs");
  thumbs.innerHTML = p.images.map((_, i)=> `
    <button class="thumb ${i===0?"is-active":""}" data-i="${i}" aria-label="Imagen ${i+1}">
      <span>Img</span>
    </button>
  `).join("");

  thumbs.querySelectorAll(".thumb").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      thumbs.querySelectorAll(".thumb").forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      // aquí podrías cambiar realmente la imagen; por ahora es placeholder
    });
  });

  // cantidad + añadir
  const qtyInput = $("#qty");
  $("#add-btn").onclick = () => addToCart(p.id, qtyInput.value);

  // migas y relacionados
  $("#breadcrumb-cat").textContent = p.category;
  renderRelated(p);
}

function renderRelated(product) {
  const rel = PRODUCTS.filter(x => x.category === product.category && x.id !== product.id).slice(0,5);
  const box = $("#related");
  box.innerHTML = rel.map(r=> `
    <a class="rel__item" href="detallesProductos.html?id=${r.id}">
      <div class="rel__img">Img</div>
      <div class="rel__t">${r.name}</div>
    </a>
  `).join("");
}

/* ========= Utilidades carrito extra ========= */
// Cambiar cantidad de un item
function setQty(productId, qty){
  qty = Number(qty);
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  if(!Number.isInteger(qty) || qty < 1) qty = 1;
  if(qty > 10) qty = 10;
  if(qty > p.stock) qty = p.stock;

  const cart = getCart();
  const item = cart.find(i=>i.id===productId);
  if(item){
    item.qty = qty;
    setCart(cart);
  }
}

// Quitar item del carrito
function removeFromCart(productId){
  const cart = getCart().filter(i=>i.id !== productId);
  setCart(cart);
}

/* ========= Totales y cupones ========= */
const COUPON_KEY = "cart_coupon_v1"; // opcional

function getCoupon(){ return localStorage.getItem(COUPON_KEY) || ""; }
function setCoupon(code){
  if(code) localStorage.setItem(COUPON_KEY, code.toUpperCase());
  else localStorage.removeItem(COUPON_KEY);
}

function computeTotals(cart = getCart()){
  const detailed = cart.map(it=>{
    const p = PRODUCTS.find(x=>x.id===it.id);
    return {...it, product: p, line: p.price * it.qty};
  }).filter(x=>x.product); // por si hay IDs inválidos

  const subtotal = detailed.reduce((a,i)=> a + i.line, 0);

  let discount = 0;
  const code = getCoupon();
  if(code === "DESCUENTO10") discount = Math.round(subtotal * 0.10);
  if(code === "FREESHIP")    discount = 4000;
  if(code === "TOTALGRATIS") discount = subtotal*0.99; // sólo para pruebas
  if(discount > subtotal) discount = subtotal;

  const total = subtotal - discount;
  return { detailed, subtotal, discount, total, code };
}

/* ========= Render del carrito ========= */
function renderCart(){
  const box = document.querySelector("#cart-list");
  if(!box) return; // no estamos en carrito.html

  const { detailed, subtotal, discount, total, code } = computeTotals();

  if(detailed.length === 0){
    box.innerHTML = `<div class="empty">Tu carrito está vacío. <a href="productos.html">Ir a productos</a></div>`;
  } else {
    box.innerHTML = detailed.map(({product:p, qty}) => `
      <div class="row" data-id="${p.id}">
        <div class="ph">Img</div>
        <div>
          <div class="name">${p.name}</div>
          <div class="muted">${p.category}</div>
        </div>
        <div class="price">${money(p.price)}</div>
        <div class="qtyBox">
          <button class="iconBtn minus" title="Disminuir">−</button>
          <input class="qty" type="number" min="1" max="10" value="${qty}">
          <button class="iconBtn plus" title="Aumentar">+</button>
          <button class="iconBtn remove" title="Eliminar">🗑</button>
        </div>
      </div>
    `).join("");
  }

  // Totales
  const sumTotal = document.querySelector("#sum-total");
  const sumDisc  = document.querySelector("#sum-disc");
  const sumPay   = document.querySelector("#sum-pay");
  if (sumTotal) sumTotal.textContent = money(subtotal);
  if (sumDisc)  sumDisc.textContent  = discount ? `- ${money(discount)}` : "-$0";
  if (sumPay)   sumPay.textContent   = money(total);

  // Cupón
  const couponInput = document.querySelector("#coupon");
  if(couponInput) couponInput.value = code || "";

  // Listeners de cada fila
  document.querySelectorAll(".row").forEach(r=>{
    const id = Number(r.dataset.id);
    const input = r.querySelector(".qty");
    r.querySelector(".minus").onclick  = ()=> { setQty(id, Number(input.value) - 1); renderCart(); };
    r.querySelector(".plus").onclick   = ()=> { setQty(id, Number(input.value) + 1); renderCart(); };
    r.querySelector(".remove").onclick = ()=> { removeFromCart(id); renderCart(); };
    input.onchange = (e)=> { setQty(id, e.target.value); renderCart(); };
  });

  updateCartBadge();
}

// Aplicar cupón (botón ✓)
function handleCoupon(){
  const input = document.querySelector("#coupon");
  if(!input) return;
  const code = (input.value || "").trim().toUpperCase();
  if(!code){ setCoupon(""); renderCart(); return; }
  const valid = ["DESCUENTO10","FREESHIP"];
  if(!valid.includes(code)){ alert("Cupón inválido"); return; }
  setCoupon(code);
  renderCart();
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // Página de productos
  if (document.querySelector("#grid")) {
    renderProductsGrid("#grid");
  }

  // Página de detalle
  if (document.querySelector("#p-title")) {
    renderProductDetail();
  }

  // Página de carrito
  if (document.querySelector("#cart-list")) {
    renderCart();
    document.querySelector("#apply-coupon")?.addEventListener("click", handleCoupon);
    document.querySelector("#pay")?.addEventListener("click", () => {
      alert("Pago simulado");
      // Si quieres limpiar el carrito al pagar:
      // localStorage.removeItem("cart_v1");
      // renderCart();
    });
  }
});
  