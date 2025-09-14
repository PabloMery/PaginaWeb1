// Admin UI independiente: usa window.PRODUCTS que trae app.js
(() => {
  const LS_KEY = "admin_products_v1";
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // Estado
  let products = Array.isArray(window.PRODUCTS) ? clone(window.PRODUCTS) : [];

  // Utils
  function clone(x){ return JSON.parse(JSON.stringify(x)); }
  function setStatus(msg, ok=true){
    const el = $("#status"); if (!el) return;
    el.textContent = msg; el.style.color = ok ? "#6b7280" : "#dc2626";
  }
  function nextId(arr){ return arr.length ? Math.max(...arr.map(p=>+p.id||0))+1 : 1; }
  function normalize(p){
    return {
      id: Number(p.id),
      name: String(p.name||"").trim(),
      category: String(p.category||"").trim(),
      price: Number(p.price||0),
      stock: Number(p.stock||0),
      images: Array.isArray(p.images) ? p.images
        : String(p.images||"").split(",").map(s=>s.trim()).filter(Boolean)
    };
  }
  function escapeHtml(s=""){
    return String(s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  }

  // Persistencia local (opcional)
  function saveLocal(){
    try{
      localStorage.setItem(LS_KEY, JSON.stringify(products));
      setStatus("Guardado en LocalStorage ("+products.length+" items)");
    }catch(e){
      console.error(e); setStatus("No se pudo guardar en LocalStorage", false);
    }
  }
  function loadLocal(){
    try{
      const raw = localStorage.getItem(LS_KEY);
      products = raw ? JSON.parse(raw).map(normalize) : [];
      setStatus("Cargado desde LocalStorage ("+products.length+" items)");
      render();
    }catch(e){
      console.error(e); setStatus("No se pudo leer LocalStorage", false);
    }
  }

  // Render tabla
  function render(){
    const tb = $("#tbody"); if (!tb) return;
    tb.innerHTML = products.map(p => `
      <tr data-id="${p.id}">
        <td><input class="id" type="number" min="1" value="${p.id}"></td>
        <td><input type="text" value="${escapeHtml(p.name)}"></td>
        <td><input type="text" value="${escapeHtml(p.category)}"></td>
        <td><input class="num" type="number" min="0" step="1" value="${p.price}"></td>
        <td><input class="num" type="number" min="0" step="1" value="${p.stock}"></td>
        <td><textarea rows="2" class="images">${escapeHtml((p.images||[]).join(", "))}</textarea></td>
        <td class="rowActions">
          <button class="btn secondary btnClone">Duplicar</button>
          <button class="btn btnDanger btnDel">Eliminar</button>
        </td>
      </tr>
    `).join("");

    // Listeners por fila
    $$("#tbody tr").forEach(tr=>{
      const originalId = Number(tr.dataset.id);
      const inputs = tr.querySelectorAll("input,textarea");
      inputs.forEach(inp=>{
        inp.addEventListener("change", ()=>{
          const obj = rowToProduct(tr);
          const idx = products.findIndex(x=>x.id===originalId);
          if (idx>=0) products[idx] = obj;
          tr.dataset.id = obj.id;
          setStatus("Cambios en memoria (usa Guardar en LocalStorage si quieres persistir)");
        });
      });
      tr.querySelector(".btnDel").addEventListener("click", ()=>{
        products = products.filter(x=>x.id !== originalId);
        render();
        setStatus("Eliminado ID "+originalId);
      });
      tr.querySelector(".btnClone").addEventListener("click", ()=>{
        const obj = rowToProduct(tr);
        obj.id = nextId(products);
        products.push(obj);
        render();
        setStatus("Duplicado como ID "+obj.id);
      });
    });
  }
  function rowToProduct(tr){
    const [idI,nameI,catI,priceI,stockI,imagesT] = tr.querySelectorAll("input,textarea");
    return normalize({
      id:idI.value, name:nameI.value, category:catI.value,
      price:priceI.value, stock:stockI.value, images:imagesT.value
    });
  }

  // Botones
  $("#btnAdd").addEventListener("click", ()=>{
    const id = nextId(products);
    products.push({id, name:"Nuevo producto", category:"", price:0, stock:0, images:[]});
    render(); setStatus("Creado ID "+id);
  });
  $("#btnSave").addEventListener("click", saveLocal);
  $("#btnLoad").addEventListener("click", loadLocal);

  $("#btnExport").addEventListener("click", ()=>{
    const blob = new Blob([JSON.stringify(products, null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "products.json";
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus("Exportado JSON");
  });

  $("#fileImp").addEventListener("change", (ev)=>{
    const file = ev.target.files?.[0]; if (!file) return;
    const r = new FileReader();
    r.onload = ()=>{
      try{
        const data = JSON.parse(r.result);
        if (!Array.isArray(data)) throw new Error("El JSON debe ser un array");
        products = data.map(normalize);
        render(); setStatus("Importado "+products.length+" productos");
      }catch(e){ console.error(e); setStatus("JSON inválido: "+e.message, false); }
      ev.target.value = "";
    };
    r.readAsText(file, "utf-8");
  });

  // Boot
  render();

  // 💡 Si quieres “aplicar” los cambios del admin al sitio:
  // copia el JSON exportado a mano dentro de tu app.js (reemplazando la lista)
  // o programa un “publicar” que haga:
  //   window.PRODUCTS = products;
  // y luego lo guardas a LocalStorage/archivo según tu flujo.
})();
