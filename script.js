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

function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

// Função para mostrar páginas (Login/Cadastro)
function showPage(pageId) {
  // Esconde todos os sections
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  
  // Mostra a seção selecionada
  document.getElementById(pageId).classList.remove("hidden");
}

// Simulação de login
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  if (email && senha) {
    alert("Login realizado com sucesso!");
    showPage("produtos"); // volta para produtos
  } else {
    alert("Preencha todos os campos!");
  }
}

// Simulação de cadastro
function cadastrarUser(event) {
  event.preventDefault();
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;
  const confirma = document.getElementById("cadastro-confirma").value;

  if (senha !== confirma) {
    alert("As senhas não coincidem!");
    return;
  }

  if (email && senha) {
    alert("Cadastro realizado com sucesso!");
    showPage("login"); // vai para login depois de cadastrar
  } else {
    alert("Preencha todos os campos!");
  }
}
