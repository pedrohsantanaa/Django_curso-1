
function calcular() {
    var nome = document.getElementById("nome").value.trim();
    var peso = Number(document.getElementById("peso").value);
    var altura = Number(document.getElementById("altura").value);
    var resultado = document.getElementById("resultado");

    resultado.classList.remove("mostrar");

    if (!peso || !altura) {
        resultado.innerHTML = "Preencha todos os campos!";
        resultado.style.color = "#222";
        setTimeout(function () {
            resultado.classList.add("mostrar");
        }, 10);
        return;
    }

    if (altura <= 0) {
        resultado.innerHTML = "Altura inválida!";
        resultado.style.color = "red";
        setTimeout(function () {
            resultado.classList.add("mostrar");
        }, 10);
        return;
    }

    var imc = peso / (altura * altura);
    imc = imc.toFixed(2);

    var textoResultado = "";
    var cor = "";

    if (imc < 18.6) {
        textoResultado = "Seu IMC é: " + imc + " - Abaixo do peso";
        cor = "blue";
    }
    else if (imc >= 18.6 && imc < 25) {
        textoResultado = "Seu IMC é: " + imc + " - Peso ideal";
        cor = "green";
    }
    else if (imc >= 25 && imc < 30) {
        textoResultado = "Seu IMC é: " + imc + " - Levemente acima do peso";
        cor = "orange";
    }
    else if (imc >= 30 && imc < 35) {
        textoResultado = "Seu IMC é: " + imc + " - Obesidade grau 1";
        cor = "darkorange";
    }
    else if (imc >= 35 && imc < 40) {
        textoResultado = "Seu IMC é: " + imc + " - Obesidade grau 2 (severa)";
        cor = "red";
    }
    else {
        textoResultado = "Seu IMC é: " + imc + " - Obesidade grau 3 (mórbida)";
        cor = "darkred";
    }

    if (nome) {
        textoResultado = nome + ", " + textoResultado;
    }

    resultado.innerHTML = textoResultado;
    resultado.style.color = cor;

    setTimeout(function () {
        resultado.classList.add("mostrar");
    }, 10);
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.remove("mostrar");
}


function salvarDados() {
    var nome = document.getElementById("nome").value.trim();
    var peso = Number(document.getElementById("peso").value);
    var altura = Number(document.getElementById("altura").value);

    if (!peso || !altura) {
        alert("Preencha pelo menos peso e altura antes de salvar os dados!");
        return;
    }

    if (altura <= 0) {
        alert("Altura inválida!");
        return;
    }

    var imc = peso / (altura * altura);
    imc = imc.toFixed(2);

    var classificacao = "";

    if (imc < 18.6) {
        classificacao = "Abaixo do peso";
    }
    else if (imc >= 18.6 && imc < 25) {
        classificacao = "Peso ideal";
    }
    else if (imc >= 25 && imc < 30) {
        classificacao = "Levemente acima do peso";
    }
    else if (imc >= 30 && imc < 35) {
        classificacao = "Obesidade grau 1";
    }
    else if (imc >= 35 && imc < 40) {
        classificacao = "Obesidade grau 2 (severa)";
    }
    else {
        classificacao = "Obesidade grau 3 (mórbida)";
    }

    var dataHora = new Date().toLocaleString();

    var historico = JSON.parse(localStorage.getItem("imcHistorico")) || [];

    historico.push({
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        classificacao: classificacao,
        dataHora: dataHora
    });

    localStorage.setItem("imcHistorico", JSON.stringify(historico));

    atualizarHistorico();

    alert("Dados salvos com sucesso!");
}

function atualizarHistorico() {
    var lista = document.getElementById("lista-historico");
    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    var historico = JSON.parse(localStorage.getItem("imcHistorico")) || [];

    historico.forEach(function (item) {
        var li = document.createElement("li");
        var linha = "";

        if (item.nome && item.nome !== "") {
            linha += item.nome + " - ";
        }

        linha += "[" + item.dataHora + "] ";
        linha += "Peso: " + item.peso + "kg | ";
        linha += "Altura: " + item.altura + "m | ";
        linha += "IMC: " + item.imc + " - " + item.classificacao;

        li.textContent = linha;
        lista.appendChild(li);
    });
}

function limparHistorico() {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
        localStorage.removeItem("imcHistorico");
        atualizarHistorico();
    }
}

window.onload = atualizarHistorico;