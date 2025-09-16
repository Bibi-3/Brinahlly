// Alternar páginas
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

// Validação de cadastro
document.addEventListener("DOMContentLoaded", () => {
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const senha = document.getElementById("senha").value;
      const confirma = document.getElementById("confirmaSenha").value;

      if (senha !== confirma) {
        alert("As senhas não coincidem!");
      } else {
        alert("Cadastro realizado com sucesso!");
        showPage('login');
      }
    });
  }

  // Login básico
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login efetuado com sucesso!");
      showPage('home');
    });
  }
});

// Dropdown do perfil
function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("active");
}

