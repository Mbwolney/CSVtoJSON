const reader = new FileReader();
var dados = "";

function read(input) {
    const csv = input.files[0];
    reader.readAsText(csv);
}

reader.onload = function(e) {
    dados = e.target.result;

    document.getElementById("info").innerText = dados;
    document.getElementById("btnDown").disabled = false;
}

function download() {
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

    //-> Criar arquivo para baixar
    var elem = document.createElement('a');
    elem.href = 'data:text/json;charset=utf-8,' + encodeURI(JSON.stringify(pessoas));
    elem.target = '_blank';
    elem.download = 'pessoas.json';
    elem.click();
}