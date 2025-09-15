const EMAIL_RX = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function setError(input, msg, errorBoxId) {
  const box = document.getElementById(errorBoxId);
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  if (box) box.textContent = msg || "";
}

function clearError(input, errorBoxId) {
  const box = document.getElementById(errorBoxId);
  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
  if (box) box.textContent = "";
}

function validateEmail() {
  const el = document.getElementById("email");
  const v = (el.value || "").trim();

  if (!v)  { setError(el, "El correo es requerido.", "email-error"); return false; }
  if (v.length > 100) { setError(el, "Máximo 100 caracteres.", "email-error"); return false; }
  if (!EMAIL_RX.test(v)) {
    setError(el, "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.", "email-error");
    return false;
  }
  clearError(el, "email-error");
  return true;
}

function validatePassword() {
  const el = document.getElementById("password");
  const v = el.value || "";

  if (!v) { setError(el, "La contraseña es requerida.", "pass-error"); return false; }
  if (v.length < 4 || v.length > 10) {
    setError(el, "Debe tener entre 4 y 10 caracteres.", "pass-error");
    return false;
  }
  clearError(el, "pass-error");
  return true;
}

function refreshSubmitState() {
  const ok = validateEmail() & validatePassword();
  document.getElementById("login-submit").disabled = !ok;
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof updateCartBadge === "function") updateCartBadge();

  const form = document.getElementById("login-form");
  const email = document.getElementById("email");
  const pass  = document.getElementById("password");

  email.addEventListener("input", refreshSubmitState);
  pass.addEventListener("input", refreshSubmitState);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!(validateEmail() && validatePassword())) return;

    alert("Inicio de sesión exitoso (simulado).");
  });

  form.addEventListener("reset", () => {
    clearError(email, "email-error");
    clearError(pass,  "pass-error");
    refreshSubmitState();
  });

  refreshSubmitState();
});
