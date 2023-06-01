// ------------------------- TESTA SE O JS ESTA OK --------------------
document.addEventListener('DOMContentLoaded', function(){
    console.log("Check?, Checked!");
    document.getElementById("buttonSave").onclick = createTask;
    showLembrete();
    selectLembrete();
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
        showError();
        return;
    }
    cleanError();
    //------ CRIAR VARIAVEIS PARA TEMPO --------
    var referencia = new Date();
    var id = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto =  conteudoTextarea;
    //JSON
    var lembrete = {"id" : id, "data" : data, "texto" : texto};
    //------ FUCTION PARA VERIFICAR SE EXISTE LEMBRETE --------
    comprovarLembrete(lembrete);
    document.getElementById("texto").value = "";
}
// --------------------------------------------------------------------
//----------------- FUCTION PARA VERIFICAR LEMBRETES ------------------
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
function comprovarLembrete(lembrete){
    var lembretesExistentes = localStorage.getItem("lembretes");

    if(!lembreteValido(lembretesExistentes)){
        var lembretes = [];
        lembretes.push(lembrete);
        //SAVE LEMBRETE
        saveLembretes(lembretes);
    }
    else{
        var lembretesRecuperados = JSON.parse(lembretesExistentes);
        //SAVE LEMBRETE
        lembretesRecuperados.push(lembrete);
        saveLembretes(lembretesRecuperados);
    }
    // GRAVAR TODOS OS DADOS
    showLembrete();
}
// --------------------------------------------------------------------
//----------------- FUCTION PARA SALVAR OS LEMBRETES ------------------
function saveLembretes(lembretes){
    var lembretesJSON = JSON.stringify(lembretes);
    localStorage.setItem("lembretes", lembretesJSON,);
}
// --------------------------------------------------------------------
//------------------- FUCTION PARA EXIBIR OS ITENS --------------------
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
function formatarlembrete(lembrete){
    var html = "";
    html += '<div class="lembrete" id="' + lembrete.id + '">';
    html += '<div class"row">';
    html += '<div class="info">';
    html += '<i class="fa fa-calendar-alt" aria-hidden="true">' + lembrete.data +'</i><i class="fa fa-window-close" aria-hidden="true"></i>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row">';
    html += '<div class="texto">'
    html += lembrete.texto;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}
// ---------------------------------------------------------------------
//---------------- FUCTION PARA SELECIONAR OS LEMBRETES ----------------
var lembretesSelecionados = [];
function selectLembrete(){
    var lembretes = document.getElementsByClassName("lembrete");
    for(var i = 0; i < lembretes.length; i++){
        document.getElementById(lembretes[i].id).onclick = function(e){
            e.stopPropagation();
            if(lembretesSelecionados.indexOf(this.id) == -1){
                this.style.backgroundColor = "red";
                lembretesSelecionados.push(this.id);
            }
            else{
                this.style.backgroundColor = "#cccccc";
                for(var b = 0; b < lembretesSelecionados.length; b++){
                    if(lembretesSelecionados[b] == this.id){
                        lembretesSelecionados[b] = 0;
                    }
                }
            }
            var lembreteTemporario = [];
            for(var j = 0; j < lembretesSelecionados.length; j++){
                if(lembretesSelecionados[j] != 0){
                    lembreteTemporario.push(lembretesSelecionados[j]);
                }
            }
            lembretesSelecionados = lembreteTemporario;
        };
    }
    // Adicionar um botão de exclusão para excluir os itens selecionados
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