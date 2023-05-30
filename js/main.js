
// ------------------------- TESTA SE O JS ESTA OK --------------------
document.addEventListener('DOMContentLoaded', function(){
    console.log("Check?, Checked!");
    document.getElementById("buttonSave").onclick = createTask;
    showLembrete();
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
// --------------------------------------------------------------------
//------------------- FUCTION PARA EXIBIR OS LEMBRETES --------------------
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