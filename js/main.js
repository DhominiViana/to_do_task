// ------------------------- TESTA SE O JS ESTA OK --------------------
    // ESPERA ATÉ QUE O DOCUMENTO HTML SEJA COMPLETAMENTE CARREGADO ANTES DE EXECUTAR O CÓDIGO
document.addEventListener('DOMContentLoaded', function(){
console.log("Check?, Checked!");

    // DEFINE A FUNÇÃO CREATETASK PARA SER EXECUTADA QUANDO O BOTÃO "BUTTONSAVE" FOR CLICADO// Define a função createTask para ser executada quando o botão "buttonSave" for clicado
document.getElementById("buttonSave").onclick = createTask;
    showLembrete(); // CHAMA A FUNÇÃO PARA EXIBIR OS LEMBRETES
    selectLembrete(); // CHAMA A FUNÇÃO PARA SELECIONAR OS LEMBRETES
});
// --------------------------------------------------------------------
// -------------- FUNCTION PARA VERIFICAR SE HÁ TEXTO -----------------
function textvalid(texto){
    if(texto == null || texto == "" || texto.length < 1){
        return false;
    }
    else{
        return true;
    }
}
// --------------------------------------------------------------------
// -------------------- FUNCTION PARA MOSTRAR ERROS -------------------
function showError(){
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor insira alguma coisa';
    html += '</div>';
    document.getElementById('error').innerHTML = html;
}
// --------------------------------------------------------------------
// -------------------- FUNCTION PARA LIMPAR ERROS --------------------
function cleanError(){
    document.getElementById('error').innerHTML = "";
}
// --------------------------------------------------------------------
// ------------------ FUNCTION PARA CRIAR LEMBRETES -------------------
function createTask(){
    var conteudoTextarea = document.getElementById("texto").value;
    if(!textvalid(conteudoTextarea)){
        showError(); // EXIBE UMA MENSAGEM DE ERRO SE O TEXTO NÃO FOR VÁLIDO
        return;
    }
    cleanError(); // LIMPA A MENSAGEM DE ERRO
    //------ CRIAR VARIAVEIS PARA TEMPO --------
    var referencia = new Date();
    var id = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto =  conteudoTextarea;
    // CRIA UM OBJETO LEMBRETE COM AS INFORMAÇÕES
    var lembrete = {"id" : id, "data" : data, "texto" : texto};
    //------ FUCTION PARA VERIFICAR SE EXISTE LEMBRETE --------
    comprovarLembrete(lembrete);
    selectLembrete();
    // VERIFICA SE EXISTEM LEMBRETES SALVOS E SALVA O NOVO LEMBRETE
    document.getElementById("texto").value = ""; // LIMPA O CAMPO DE TEXTO
} 
// --------------------------------------------------------------------
//----------------- FUCTION PARA VERIFICAR LEMBRETES ------------------
        // VERIFICA SE OS LEMBRETES EXISTENTES SÃO VÁLIDOS
function lembreteValido(lembretesExistentes){
    if(lembretesExistentes == null || lembretesExistentes == "" || typeof lembretesExistentes == "undefined" || lembretesExistentes == "undefined"){
        return false;
    }
    else{
        return true;
    }
}
// --------------------------------------------------------------------
//----------- FUCTION PARA VERIFICAR SE EXISTE LEMBRETE ---------------
   // VERIFICA SE EXISTE ALGUM LEMBRETE E SALVA O LEMBRETE ATUAL
function comprovarLembrete(lembrete){
    var lembretesExistentes = localStorage.getItem("lembretes");
    if(!lembreteValido(lembretesExistentes)){
        var lembretes = [];
        lembretes.push(lembrete);
        //SAVE LEMBRETE
        saveLembretes(lembretes); // SALVA OS LEMBRETES
    }
    else{
        var lembretesRecuperados = JSON.parse(lembretesExistentes);
        //SAVE LEMBRETE
        lembretesRecuperados.push(lembrete);
        saveLembretes(lembretesRecuperados); // SALVA OS LEMBRETES
    }
    // GRAVAR TODOS OS DADOS
    showLembrete(); // EXIBE OS LEMBRETES ATUALIZADOS
}
// --------------------------------------------------------------------
//----------------- FUCTION PARA SALVAR OS LEMBRETES ------------------
        // SALVA OS LEMBRETES NO ARMAZENAMENTO LOCAL (LOCALSTORAGE)
function saveLembretes(lembretes){
    var lembretesJSON = JSON.stringify(lembretes);
    localStorage.setItem("lembretes", lembretesJSON,);
}
// --------------------------------------------------------------------
//------------------- FUCTION PARA EXIBIR OS ITENS --------------------
    // EXIBE OS LEMBRETES NA PÁGINA
function showLembrete(){
    var html = "";
    var lembretesExistentes = localStorage.getItem("lembretes");

    if(!lembreteValido(lembretesExistentes)){
        html = "Não existe nenhum lembrete.";
        document.getElementById("lembretes").innerHTML = html;
    }
    else{
        var lembretesRecuperados = JSON.parse(lembretesExistentes);
        for(var i = 0; i < lembretesRecuperados.length; i++){
            html += formatarlembrete(lembretesRecuperados[i]);
        }
        document.getElementById("lembretes").innerHTML = html;
    }
}
// ---------------------------------------------------------------------
//------------------- FUCTION PARA EXIBIR OS LEMBRETES -----------------
   // FORMATA UM LEMBRETE PARA EXIBIÇÃO NA PÁGINA
function formatarlembrete(lembrete){
    var html = "";
    html += '<div class="lembrete" id="' + lembrete.id + '">';
    html += '<div class"row">';
    html += '<div class="info">';
    html += '<i class="fa fa-calendar-alt" aria-hidden="true">' + lembrete.data +'</i><i class="fa fa-window-close" aria-hidden="true"></i>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row">';
    html += '<p class="texto">'
    html += lembrete.texto;
    html += '</p>';
    html += '</div>';
    html += '</div>';
    return html;
}
// ---------------------------------------------------------------------
//---------------- FUCTION PARA SELECIONAR OS LEMBRETES ----------------
   // SELECIONA UM LEMBRETE QUANDO CLICADO
var lembretesSelecionados = [];
function selectLembrete(){
    var lembretes = document.getElementsByClassName("lembrete");
    for(var i = 0; i < lembretes.length; i++){
        document.getElementById(lembretes[i].id).onclick = function(e){
            e.stopPropagation();
            if(lembretesSelecionados.indexOf(this.id) == -1){
                this.style.borderColor = "red"; // MUDA A COR DE FUNDO DO LEMBRETE PARA INDICAR QUE FOI SELECIONADO
                lembretesSelecionados.push(this.id); // ADICIONA O ID DO LEMBRETE AOS LEMBRETES SELECIONADOS
            }
            else{
                this.style.borderColor = "#35812e"; // RESTAURA A COR DE FUNDO ORIGINAL DO LEMBRETE
                for(var b = 0; b < lembretesSelecionados.length; b++){
                    if(lembretesSelecionados[b] == this.id){
                        lembretesSelecionados[b] = 0; // REMOVE O ID DO LEMBRETE DOS LEMBRETES SELECIONADOS
                    }
                }
            }
            // REMOVE O ID DO LEMBRETE DOS LEMBRETES SELECIONADOS
            var lembreteTemporario = [];
            for(var j = 0; j < lembretesSelecionados.length; j++){
                if(lembretesSelecionados[j] != 0){
                    lembreteTemporario.push(lembretesSelecionados[j]);
                }
            }
            lembretesSelecionados = lembreteTemporario;
        };
    }
    // ADICIONA UM BOTÃO DE EXCLUSÃO PARA EXCLUIR OS ITENS SELECIONADOS
    var botaoExcluir = document.getElementById("buttonDelete")
    botaoExcluir.addEventListener('click', excluirLembreteSelecionado);
}
// ---------------------------------------------------------------------
//------------ FUCTION PARA EXCLUIR OS ITENS SELECIONADOS --------------
function excluirLembreteSelecionado() {
  for (var i = 0; i < lembretesSelecionados.length; i++) {
    var lembrete = document.getElementById(lembretesSelecionados[i]);
    if (lembrete) {
      lembrete.parentNode.removeChild(lembrete);
    }
  }
  // ATUALIZAR O ARMAZENAMENTO LOCAL (localStorage) REMOVENDO OS LEMBRETES EXCLUÍDOS
  var lembretesExistentes = localStorage.getItem("lembretes");
  if (lembreteValido(lembretesExistentes)) {
    var lembretesRecuperados = JSON.parse(lembretesExistentes);
    lembretesRecuperados = lembretesRecuperados.filter(function(lembrete) {
      return lembretesSelecionados.indexOf(lembrete.id.toString()) === -1;
    });
    saveLembretes(lembretesRecuperados);
  }
  // LIMPA O ARRAY DE LEMBRETES SELECIONADOS APÓS A EXCLUSÃO
  lembretesSelecionados = []; 
}
// ---------------------------------------------------------------------
// //------------ FUCTION PARA EXIBIR AS IMAGENS DE AJUDA --------------
function exibirImagensPopup() {
    var imagens = [
    "../assets/imagens/help_1.png",
    "../assets/imagens/help_2.png",
    "../assets/imagens/help_3.png",
    "../assets/imagens/help_4.png",
    "../assets/imagens/help_5.png",
    "../assets/imagens/help_6.png"
    ];
    var indiceAtual = 0;

    function exibir() {
      var popup = document.getElementById("popup");
      var imagemAtual = document.getElementById("imagem");
      imagemAtual.src = imagens[indiceAtual];
      popup.style.display = "block";
    }

    function proximo() {
      indiceAtual++;
      if (indiceAtual >= imagens.length) {
        ocultar();
      } else {
        exibir();
      }
    }

    function ocultar() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    }

    var botaoProximo = document.getElementById("botao-proximo");
    botaoProximo.addEventListener("click", proximo);

    exibir();
  }
  