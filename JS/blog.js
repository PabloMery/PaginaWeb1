// ===== Listado de posts del blog =====
// Nota: aquí definimos sólo lo necesario. Las páginas de detalle están en HTML aparte.

const POSTS = [
  {
    id: 1,
    titulo: "Ganador Red Bull Rodando en Callampark",
    fecha: "2025-09-12",
    resumen:
      "El evento Red Bull Rodando Chile reunió lo mejor del ciclismo urbano en Callampark (La Florida), con competencias en distintas categorías. ¡Conoce al ganador y revive lo mejor de la jornada!",
    enlace: "../HTML/blogDetalle1.html",
    imgAlt: "Podio del ganador en Red Bull Rodando Chile",
  },
  {
    id: 2,
    titulo: "¡Prepárate para ser ciclista! Descuentos por victoria de Pablo Sánchez",
    fecha: "2025-09-12",
    resumen:
      "Por el triunfo de Pablo Sánchez, pronto liberaremos descuentos en la Botella Térmica 750 ml y en la Bicicleta BMX Wtp Trust Cs Rsd Matt Black. Mantente atento a tienda, web y redes.",
    enlace: "blogDetalle2.html",
    imgAlt: "Promoción de productos para ciclismo",
  },
];

function renderBlogList() {
  const list = document.getElementById("blog-list");
  if (!list) return;

  list.innerHTML = POSTS.map(p => `
    <article class="post-card">
      <div class="post-body">
        <h2 class="post-title">${p.titulo}</h2>
        <div class="post-meta">${new Date(p.fecha).toLocaleDateString("es-CL")}</div>
        <p class="post-desc">${p.resumen}</p>
        <div class="post-actions">
          <a class="btn-outline" href="${p.enlace}" aria-label="Ver caso: ${p.titulo}">Ver más</a>
        </div>
      </div>
      <div class="post-img" aria-hidden="true">Imagen</div>
    </article>
  `).join("");

  if (typeof updateCartBadge === "function") updateCartBadge();
}

document.addEventListener("DOMContentLoaded", renderBlogList);
