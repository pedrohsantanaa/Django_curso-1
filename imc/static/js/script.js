

function calcular() {
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);
    let resultado = document.getElementById("resultado");

    if (!peso || !altura) {
        resultado.innerHTML = "Preencha todos os campos!";
        return;
    }

    let imc = (peso / (altura * altura)).toFixed(2);
    resultado.innerHTML = "Seu IMC é: " + imc;
}

function limparCampos() {
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("resultado").innerHTML = "";
}

function enviarIMC() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    let imc = (peso / (altura * altura)).toFixed(2);

    document.getElementById("peso_hidden").value = peso;
    document.getElementById("altura_hidden").value = altura;
    document.getElementById("imc_hidden").value = imc;

    document.getElementById("formSalvar").submit();
}
