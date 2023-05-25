
// ------------------------- TESTA SE O JS ESTA OK --------------------
document.addEventListener('DOMContentLoaded', function(){
    console.log("Check?, Checked!");
    document.getElementById("buttonSave").onclick = createTask;
});

// --------------------------------------------------------------------
// -------------- FUNCTION PARA VERIFICAR SE HÁ TEXTO -----------------
function textvalid(texto){

    if(texto == null || texto == "" || texto.lenght < 1){
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
    html += 'Porfavor insira alguma coisa';
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
        return
    }
    cleanError();

    //------ CRIAR VARIAVEIS PARA TEMPO --------
    var referencia = new Date();
    var getElementById = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto =  conteudoTextarea;

    //JSON
    var recordatorio = {"id" : id, "data" : data, "texto" : texto};

    //------ FUCTION PARA VERIFICAR SE EXISTE LEMBRETE --------
    comprovarLembrete(lembrete);
    
}
// --------------------------------------------------------------------
//----------- FUCTION PARA VERIFICAR SE EXISTE LEMBRETE ---------------

function comprovarLembrete(lembrete){
    var lembreteExistente = localStorage.getItem("lembrete");

    if(lembreteExistente == null || lembreteExistente == ""){
        var lembretes = [];
        lembretes.push(lembrete);

        //SAVE LEMBRETE
        saveLembretes(lembretes);
    }
    else{
        var lembretesRecuperados = JSON.parse(lembreteExistente);
        //SAVE LEMBRETE
        lembretesRecuperados.push(lembrete);
        saveLembretes(lembretes);
    }
}
// --------------------------------------------------------------------
//----------------- FUCTION PARA SALVAR OS LEMBRETES ------------------
function saveLembretes(lembretes){
    var lembretesJSON = JSON.stringify(lembretes);
    localStorage.setItem("lemb", lembretesJSON,);
}
// --------------------------------------------------------------------
//------------------- FUCTION PARA EXIBIR OS ITENS --------------------
function showLembrete(){
    var html = "";
    var lembreteExistente = localStorage.getItem("lembretes");

    if(lembreteExistente == null || lembreteExistente == ""){
        html = "Não existe nenhum lembrete.";

        //document.getElementById("lembretes").innerHTML = ;
    }

}
// --------------------------------------------------------------------