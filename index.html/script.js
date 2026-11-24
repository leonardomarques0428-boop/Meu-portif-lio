// Portfólio de Leonardo Marques Caetano
console.log("script ok");

// ---------- Ano no rodapé ----------
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

// ---------- Interação principal: tema claro/escuro ----------
const temaBotao = document.getElementById("tema-botao");

function aplicarTema(escuro) {
  document.body.classList.toggle("dark", escuro);
  temaBotao.setAttribute("aria-pressed", String(escuro));
  temaBotao.textContent = escuro ? "Tema claro" : "Tema escuro";
}

// lembra a escolha da pessoa (se o navegador permitir)
let escuroSalvo = false;
try { escuroSalvo = localStorage.getItem("tema") === "escuro"; } catch (e) {}
aplicarTema(escuroSalvo);

temaBotao.addEventListener("click", function () {
  const escuro = !document.body.classList.contains("dark");
  aplicarTema(escuro);
  try { localStorage.setItem("tema", escuro ? "escuro" : "claro"); } catch (e) {}
});

// ---------- Menu que abre e fecha no celular ----------
const menuBotao = document.getElementById("menu-botao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
});

menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  });
});

// ---------- Formulário: validação e mensagem de confirmação ----------
const formulario = document.getElementById("formulario");
const status = document.getElementById("formulario-status");

function mostrarErro(campo, mensagem) {
  const erro = document.getElementById("erro-" + campo.id);
  erro.textContent = mensagem;
  campo.classList.toggle("invalido", mensagem !== "");
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  status.textContent = "";

  const nome = formulario.elements["nome"];
  const email = formulario.elements["email"];
  const mensagem = formulario.elements["mensagem"];
  let valido = true;

  if (nome.value.trim() === "") {
    mostrarErro(nome, "Digite seu nome.");
    valido = false;
  } else mostrarErro(nome, "");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!emailOk) {
    mostrarErro(email, "Digite um e-mail válido, como nome@exemplo.com.");
    valido = false;
  } else mostrarErro(email, "");

  if (mensagem.value.trim().length < 10) {
    mostrarErro(mensagem, "Escreva uma mensagem com pelo menos 10 caracteres.");
    valido = false;
  } else mostrarErro(mensagem, "");

  if (valido) {
    status.textContent = "Mensagem enviada! Obrigado pelo contato, " + nome.value.trim() + ".";
    formulario.reset();
  }
});