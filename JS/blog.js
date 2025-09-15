// ===== Listado de posts del blog =====
// Las páginas de detalle están en archivos HTML aparte.

const POSTS = [
  {
    id: 1,
    titulo: "Ganador Red Bull Rodando en Callampark",
    fecha: "2025-09-12",
    resumen:
      "El evento Red Bull Rodando Chile reunió lo mejor del ciclismo urbano en Callampark (La Florida), con competencias en distintas categorías. ¡Conoce al ganador y revive lo mejor de la jornada!",
    enlace: "../HTML/blogDetalle1.html",
    imgAlt: "Podio del ganador en Red Bull Rodando Chile",
    img: "../IMG/Blog/RodandoChileBlog1.avif",
  },
  {
    id: 2,
    titulo: "¡Prepárate para ser ciclista! Descuentos por victoria de Pablo Sánchez",
    fecha: "2025-09-12",
    resumen:
      "Por el triunfo de Pablo Sánchez, pronto liberaremos descuentos en la Botella Térmica 750 ml y en la Bicicleta BMX Wtp Trust Cs Rsd Matt Black. Mantente atento a tienda, web y redes.",
    enlace: "blogDetalle2.html",
    imgAlt: "Promoción de productos para ciclismo",
    img: "../IMG/otro-banner.jpg"  // si luego quieres imagen para este también
  },
];

function renderBlogList() {
  const list = document.getElementById("blog-list");
  if (!list) return;

  const fechaFmt = (iso) =>
    new Date(iso).toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" });

  list.innerHTML = POSTS.map((p) => `
    <article class="post-card">
      <div class="post-body">
        <h2 class="post-title">${p.titulo}</h2>
        <div class="post-meta">${fechaFmt(p.fecha)}</div>
        <p class="post-desc">${p.resumen}</p>
        <div class="post-actions">
          <a class="btn-outline" href="${p.enlace}" aria-label="Ver caso: ${p.titulo}">Ver más</a>
        </div>
      </div>

      ${
        p.img
          ? `<figure class="post-img"><img src="${p.img}" alt="${p.imgAlt || ""}" loading="lazy"></figure>`
          : `<div class="post-img" aria-hidden="true">Imagen</div>`
      }
    </article>
  `).join("");

  // Fallback: si alguna imagen falla al cargar, mostramos el placeholder "Imagen"
  document.querySelectorAll(".post-img img").forEach((img) => {
    img.addEventListener("error", () => {
      const fig = img.parentElement;
      fig.innerHTML = "Imagen";
      fig.setAttribute("aria-hidden", "true");
    });
  });

  // Mantener el badge del carrito coherente con el resto del sitio, si existe esa función
  if (typeof updateCartBadge === "function") updateCartBadge();
}

document.addEventListener("DOMContentLoaded", renderBlogList);
