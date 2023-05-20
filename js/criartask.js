
function criarTextarea() {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
}
var botao = document.getElementById("criarTextarea");
botao.addEventListener("click", criarTextarea);