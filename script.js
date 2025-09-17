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
        window.location.href = "login.html";
      }
    });
  }

  // Login básico
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login efetuado com sucesso!");
      window.location.href = "index.html";
    });
  }
});
