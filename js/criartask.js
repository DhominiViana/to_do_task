
// ------------------------- TESTA SE O JS ESTA OK --------------------
document.addEventListener('DOMContentLoaded', function(){
    console.log("Check?, Checked!");
    mostrarErro();
});

// --------------------------------------------------------------------

// ------------------------- CRIAR UM TEXTAREA ------------------------
function criarTextarea() {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    
}

var botao = document.getElementById("criarTextarea");
botao.addEventListener("click", criarTextarea);

// --------------------------------------------------------------------

// -------------- FUNCTION PARA VERIFICAR SE HÁ TEXTO -----------------
function textoValido(texto){
    if(texto == null || texto == "" || texto.lenght < 1){
        return false;
    }
    else{
        return true;
    }
}

// --------------------------------------------------------------------

// -------------------- FUNCTION PARA MOSTRAR ERROS -------------------
function mostrarErro(){
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Porfavor insira alguma coisa';
    html += '</div>';
    
    document.getElementsById('error').innerHTML = html;
    mostrarErro();

}

// --------------------------------------------------------------------