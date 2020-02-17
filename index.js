const reader = new FileReader();
var dados = "";

function read(input) {
    const csv = input.files[0];
    reader.readAsText(csv);
}

reader.onload = function(e) {
    dados = e.target.result;

    //-> Converter CSV em Json
    var dadosplit = dados.split("\r\n");
    var pessoas = [];

    for (var i = 0; i < dadosplit.length; i++) {

        var p = dadosplit[i].split(";");

        var pessoa = {
            nome: p[0],
            dataNascimento: p[1],
            cpf: p[2]
        };

        pessoas.push(pessoa);
    }

    var table = document.getElementById("table");
    var str = "<tr><th>N</th><th>Nome</th><th>Data Nascimento</th><th>CPF</th></tr>";

    pessoas.forEach(function(pessoa, index) {
        str += `<tr>
        <td>${index + 1}</td>
        <td>${pessoa.nome}</td>
        <td>${pessoa.dataNascimento}</td>
        <td>${pessoa.cpf}</td>
        </tr>`;
    });

    table.innerHTML = str;

    // Habilitar Botão
    // document.getElementById("btnDown").disabled = false;
}

function download() {
    var elem = document.createElement('a');
    elem.href = 'data:text/json;charset=utf-8,' + encodeURI(JSON.stringify(pessoas));
    elem.target = '_blank';
    elem.download = 'pessoas.json';
    elem.click();
}

function selecionarArquivo() {
    document.getElementById("iptFile").click();
}

function onDrop(evt) {
    debugger
    const data = event.dataTransfer.getData("text/csv");
    event.target.textContent = data;
    event.preventDefault();
}