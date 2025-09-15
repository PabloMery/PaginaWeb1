const PRODUCTS = [
  { id: 1,  name: "Bicicleta BMX Wtp Arcade Candy Red", price: 594992, category: "BMX", stock: 20,
    images: ["../IMG/BMX/bmx1a.jpg","../IMG/BMX/bmx1b.jpg","../IMG/BMX/bmx1c.jpg"] },
  { id: 2,  name: "Bicicleta BMX Wtp Trust Cs Rsd Matt Black", price: 1149990, category: "BMX", stock: 8,
    images: ["../IMG/BMX/bmx2a.jpg","../IMG/BMX/bmx2b.jpg"] },
  { id: 3,  name: "Bicicleta BMX Wtp Trust Fc Rsd Matt Trans Violet", price: 1149990, category: "BMX", stock: 15,
    images: ["../IMG/BMX/bmx3a.jpg"] },
  { id: 4,  name: "Scooter Monopatín De Pie Plegable Ajustable Jóvenes Adultos", price: 36990, category: "Monopatín", stock: 12,
    images: ["../IMG/Monopatines/mono1a.jpg"] },
  { id: 5,  name: "Scooter Lucky Crew Black Neo", price: 215992, category: "Monopatín", stock: 10,
    images: ["../IMG/Monopatines/mono2a.jpg"] },
  { id: 6,  name: "SCOOTER DC Comics Infantil Reforzado Mujer Maravilla 4 Rueda", price: 37990, category: "Monopatín", stock: 15,
    images: ["../IMG/Monopatines/mono3a.jpg"] },
  { id: 7,  name: "Tabla de Skate Niños 8–12 Años CP100 MID Cosmic Tamaño 7,6", price: 50000, category: "Patinetas", stock: 20,
    images: ["../IMG/Patinetas/skate1a.jpg"] },
  { id: 8,  name: "Skateboard Completo FSC CP100 Talla 8", price: 50000, category: "Patinetas", stock: 25,
    images: ["../IMG/Patinetas/skate2a.jpg"] },
  { id: 9,  name: "Skateboard Niños PLAY100", price: 25000, category: "Patinetas", stock: 30,
    images: ["../IMG/Patinetas/skate3a.jpg"] },
  { id:10, name: "Patines en Línea Niños FIT3", price: 45000, category: "Patines", stock: 18,
    images: ["../IMG/Patines/patines1a.jpg"] },
  { id:11, name: "Patines en Línea Adultos FIT500", price: 80000, category: "Patines", stock: 12,
    images: ["../IMG/Patines/patines2a.jpg"] },
  { id:12, name: "Patines Freeskate Adultos MF900 HB 3x110 mm Verde", price: 120000, category: "Patines", stock: 10,
    images: ["../IMG/Patines/patines3a.jpg"] },
];



const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const money = n => n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

const CART_KEY = "cart_v1";

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

document.addEventListener("DOMContentLoaded", () => {
  if (typeof updateCartBadge === "function") updateCartBadge();
});

function renderProductsGrid(containerSel = "#grid") {
  const el = $(containerSel);
  if (!el) return;

  el.innerHTML = PRODUCTS.map(p => {
    const img = (p.images && p.images[0]) ? p.images[0] : "../IMG/placeholder.jpg";
    return `
      <article class="card col-12 sm-6 lg-3">
        <a class="card__img" href="detallesProductos.html?id=${p.id}" aria-label="${p.name}">
          <img src="${img}" alt="${p.name}" loading="lazy">
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
    `;
  }).join("");

  el.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id), 1));
  });
}


function renderenhome(containerSel1 = "#grid2") {
  const el = $(containerSel1);
  if (!el) return;  
  el.innerHTML = PRODUCTS.map(p => {
    const img = (p.images && p.images[0]) ? p.images[0] : "../IMG/placeholder.jpg";
    return `
            <article class="card col-12 sm-col-6 lg-col-3" role="listitem">
          <img src="${img}" alt="${p.name}" loading="lazy">
          <div class="card__body">
            <div class="muted">${p.category}</div>
            <h3 style="margin:.2rem 0 .3rem">${p.name}</h3>
            <div class="card__row">
              <span class="price">${money(p.price)}</span>
            </div>
          </div>
        </article>
        `}).join("");
}


const $id = (x) => document.getElementById(x);

function getProductIdFromURL() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  return Number.isInteger(id) && id > 0 ? id : NaN;
}

function renderProductDetail() {

  if (!$id("p-title")) return;

  const id = getProductIdFromURL();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  if (!p) return;


  $id("p-title").textContent = p.name;
  $id("p-price").textContent = money(p.price);
  $id("p-desc").textContent  = "Descripción breve del producto. Materiales de alta calidad, garantía y soporte. Envío a todo Chile.";

  if ($id("p-main")) {
    const mainImg = (p.images && p.images[0]) ? p.images[0] : "../IMG/placeholder.jpg";
    $id("p-main").innerHTML = `<img src="${mainImg}" alt="${p.name}">`;
  }


  if ($id("p-thumbs")) {
    const imgs = (p.images && p.images.length) ? p.images : ["../IMG/placeholder.jpg"];
    $id("p-thumbs").innerHTML = imgs.map((src, i)=> `
      <button class="thumb ${i===0?"is-active":""}" data-i="${i}">
        <img src="${src}" alt="Miniatura ${i+1}">
      </button>
    `).join("");

    $id("p-thumbs").querySelectorAll(".thumb").forEach(btn => {
      btn.addEventListener("click", () => {
        $id("p-thumbs").querySelectorAll(".thumb").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const i = +btn.dataset.i;
        $id("p-main").innerHTML = `<img src="${imgs[i]}" alt="${p.name}">`;
      });
    });
  }


  const qtyInput = $id("qty");
  if ($id("add-btn") && qtyInput) {
    $id("add-btn").onclick = () => addToCart(p.id, qtyInput.value);
  }


  if ($id("breadcrumb-cat")) $id("breadcrumb-cat").textContent = p.category;
  if (typeof renderRelated === "function") renderRelated(p);

  const commentsLink = document.createElement("a");
  commentsLink.href = `comentarios.html?id=${p.id}`;
  commentsLink.className = "pill";
  commentsLink.textContent = "Ver comentarios";
  document.querySelector(".panel.right")?.appendChild(commentsLink);

}


function renderRelated(product) {
  const box = document.querySelector("#related");
  if (!box || !product) return;


  let rel = PRODUCTS.filter(x => x.category === product.category && x.id !== product.id);


  if (rel.length < 5) {
    const extra = PRODUCTS.filter(x => x.id !== product.id && x.category !== product.category);

    const ids = new Set(rel.map(p => p.id));
    for (const e of extra) {
      if (!ids.has(e.id)) rel.push(e);
      if (rel.length >= 5) break;
    }
  }


  rel = rel.sort(() => Math.random() - 0.5).slice(0, 5);


  box.innerHTML = rel.map(r => {
    const img = (r.images && r.images[0]) ? r.images[0] : "../IMG/placeholder.jpg";
    return `
      <article class="rel__item">
        <a class="rel__link" href="detallesProductos.html?id=${r.id}" aria-label="${r.name}">
          <div class="rel__img"><img src="${img}" alt="${r.name}"></div>
          <div class="rel__t">${r.name}</div>
        </a>
        <div class="rel__row">
          <span class="rel__price">${money(r.price)}</span>
        </div>
      </article>
    `;
  }).join("");



}



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


function removeFromCart(productId){
  const cart = getCart().filter(i=>i.id !== productId);
  setCart(cart);
}


const COUPON_KEY = "cart_coupon_v1";

function getCoupon(){ return localStorage.getItem(COUPON_KEY) || ""; }
function setCoupon(code){
  if(code) localStorage.setItem(COUPON_KEY, code.toUpperCase());
  else localStorage.removeItem(COUPON_KEY);
}

function computeTotals(cart = getCart()){
  const detailed = cart.map(it=>{
    const p = PRODUCTS.find(x=>x.id===it.id);
    return {...it, product: p, line: p.price * it.qty};
  }).filter(x=>x.product); 

  const subtotal = detailed.reduce((a,i)=> a + i.line, 0);

  let discount = 0;
  const code = getCoupon();
  if(code === "DESCUENTO10") discount = Math.round(subtotal * 0.10);
  if(code === "FREESHIP")    discount = 4000;
  if(code === "90PORCIENTO") discount = Math.round(subtotal*0.90);
  if(discount > subtotal) discount = subtotal;

  const total = subtotal - discount;
  return { detailed, subtotal, discount, total, code };
}


function renderCart(){
  const box = document.querySelector("#cart-list");
  if(!box) return; 

  const { detailed, subtotal, discount, total, code } = computeTotals();

  if(detailed.length === 0){
    box.innerHTML = `<div class="empty">Tu carrito está vacío. <a href="productos.html">Ir a productos</a></div>`;
  } else {
    box.innerHTML = detailed.map(({product:p, qty}) => {
      const img = (p.images && p.images[0]) ? p.images[0] : "../IMG/placeholder.jpg";
      return `
        <div class="row" data-id="${p.id}">
          <div class="ph">
            <img src="${img}" alt="${p.name}" loading="lazy">
          </div>
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
      `;
    }).join("");

  }


  const sumTotal = document.querySelector("#sum-total");
  const sumDisc  = document.querySelector("#sum-disc");
  const sumPay   = document.querySelector("#sum-pay");
  if (sumTotal) sumTotal.textContent = money(subtotal);
  if (sumDisc)  sumDisc.textContent  = discount ? `- ${money(discount)}` : "-$0";
  if (sumPay)   sumPay.textContent   = money(total);

  const couponInput = document.querySelector("#coupon");
  if(couponInput) couponInput.value = code || "";

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


  if (document.querySelector("#grid")) {
    renderProductsGrid("#grid");
  }

  if (document.querySelector("#grid2")) {
    renderenhome("#grid2");
  }


  if (document.querySelector("#p-title")) {
    renderProductDetail();
  }

  if (document.querySelector("#cart-list")) {
    renderCart();
    document.querySelector("#apply-coupon")?.addEventListener("click", handleCoupon);
    document.querySelector("#pay")?.addEventListener("click", () => {
      alert("Pago Completado. Gracias por su compra.");

    });
  }
});

window.PRODUCTS = window.PRODUCTS || PRODUCTS;

const PROD_LS_KEY = "catalog_products_v1";

function loadProductsFromLocalStorage() {
  try {
    const raw = localStorage.getItem(PROD_LS_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      window.PRODUCTS = arr;

    }
  } catch(e){ console.warn("No se pudo leer catálogo LS:", e); }
}

function saveProductsToLocalStorage() {
  try {
    localStorage.setItem(PROD_LS_KEY, JSON.stringify(window.PRODUCTS));
    alert("Catálogo guardado en LocalStorage.");
  } catch(e){ alert("No se pudo guardar catálogo."); }
}

window.admin = {
  getProducts: () => window.PRODUCTS,
  setProducts: (arr) => { if (Array.isArray(arr)) window.PRODUCTS = arr; },
  saveLocal: saveProductsToLocalStorage,
  loadLocal: loadProductsFromLocalStorage,
  exportJSON: () => {
    const blob = new Blob([JSON.stringify(window.PRODUCTS, null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "products.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
};

loadProductsFromLocalStorage();

const CMT_KEY = "comments_v1";

const escapeHtml = (s="") => String(s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const fmtDate = (d) => new Date(d).toLocaleString("es-CL", { dateStyle:"medium", timeStyle:"short" });

function getProducts() {
  if (Array.isArray(window.PRODUCTS) && window.PRODUCTS.length) return window.PRODUCTS;
  return [{id:0, name:"(Sin catálogo)"}];
}
function getProductIdFromURL() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  return Number.isInteger(id) && id>0 ? id : null;
}

function readAllComments() {
  try { return JSON.parse(localStorage.getItem(CMT_KEY)) ?? []; }
  catch { return []; }
}
function writeAllComments(arr) {
  try { localStorage.setItem(CMT_KEY, JSON.stringify(arr)); }
  catch (e) { alert("No se pudieron guardar los comentarios."); console.error(e); }
}
function readCommentsFor(productId) {
  return readAllComments().filter(c => c.productId === productId);
}
function addComment(obj) {
  const all = readAllComments();
  const id = all.length ? Math.max(...all.map(c=>c.id||0)) + 1 : 1;
  all.push({ id, ...obj, createdAt: Date.now() });
  writeAllComments(all);
}
function clearCommentsFor(productId){
  writeAllComments(readAllComments().filter(c => c.productId !== productId));
}

// ===== UI =====
function populateProductSelect() {
  const sel = $("#prodSel");
  const prods = getProducts();

  if (!sel) return;

  if (!Array.isArray(prods) || !prods.length) {
    console.warn("[Comentarios] No hay PRODUCTS. ¿app.js cargó primero?");
    sel.innerHTML = `<option value="">(Sin catálogo)</option>`;
    return;
  }

  sel.innerHTML = prods.map(p =>
    `<option value="${p.id}">${escapeHtml(p.name)}</option>`
  ).join("");

  const fromURL = getProductIdFromURL();
  if (fromURL && prods.some(p => p.id === fromURL)) {
    sel.value = String(fromURL);
  } else {
    sel.value = String(prods[0].id);
  }
}



function renderStarsContainer(container, current=0) {
  container.innerHTML = "";
  for (let i=1; i<=5; i++){
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "starBtn" + (i<=current ? " active" : "");
    btn.dataset.value = i;
    btn.innerHTML = i<=current ? "★" : "☆";
    btn.addEventListener("click", ()=>{
      renderStarsContainer(container, i);
      container.dataset.value = i;
    });
    container.appendChild(btn);
  }
  container.dataset.value = current;
}

function renderList(productId) {
  const list = $("#list");
  const empty = $("#empty");

  const data = readCommentsFor(productId)
    .sort((a,b)=> b.createdAt - a.createdAt);

  if (!data.length) {
    list.innerHTML = "";
    empty.hidden = false;
  } else {
    empty.hidden = true;
    list.innerHTML = data.map(c => `
      <article class="item">
        <div class="avatar">${escapeHtml((c.name||"?")[0]?.toUpperCase() || "?")}</div>
        <div>
          <div class="meta">
            <span class="name">${escapeHtml(c.name || "Anónimo")}</span>
            <span class="badge">★ ${Number(c.rating||0).toFixed(1)}</span>
            <span class="date">${fmtDate(c.createdAt)}</span>
          </div>
          <p class="text">${escapeHtml(c.text||"")}</p>
        </div>
      </article>
    `).join("");
  }

  const count = data.length;
  const avg = count ? (data.reduce((a,c)=>a+Number(c.rating||0),0)/count) : 0;
  $("#count").textContent = `${count} comentario${count===1?"":"s"}`;
  $("#avgStars").textContent = `★ ${avg.toFixed(1)}`;
}

function currentProductId() {
  return Number($("#prodSel").value);
}

// ===== Boot =====
document.addEventListener("DOMContentLoaded", ()=>{
  populateProductSelect();
  renderStarsContainer($("#stars"), 5);

  const prods = getProducts();
  const fromURL = getProductIdFromURL();
  let initialId = null;

  if (fromURL && prods.some(p => p.id === fromURL)) {
    initialId = fromURL;
  } else if ($("#prodSel")?.value) {
    initialId = Number($("#prodSel").value);
  }

  if (!initialId) {
    $("#empty").hidden = false;
  } else {
    $("#prodSel").value = String(initialId);
    renderList(initialId);
  }

  $("#prodSel").addEventListener("change", ()=>{
    const pid = Number($("#prodSel").value);
    renderList(pid);
  });

  $("#form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const productId = Number($("#prodSel").value);
    const name = $("#name").value.trim() || "Anónimo";
    const rating = Number($("#stars").dataset.value || 5);
    const text = $("#text").value.trim();
    if (!text) { alert("Escribe un comentario."); return; }
    addComment({ productId, name, rating, text });
    $("#text").value = "";
    renderStarsContainer($("#stars"), 5);
    renderList(productId);
  });

  $("#clearAll").addEventListener("click", ()=>{
    const productId = Number($("#prodSel").value);
    if (productId && confirm("¿Eliminar todos los comentarios de este producto?")) {
      clearCommentsFor(productId);
      renderList(productId);
    }
  });
});

