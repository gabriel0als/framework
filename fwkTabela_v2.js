let tabela = document.getElementsByTagName("tabela");
for(let i=0;i<tabela.length;i++){
    let tab = tabela[i];
    let linhas = tab.getAttribute("linha");
    let colunas = tab.getAttribute("coluna");

    let novaTabela = document.createElement("table");

    let colspanAttr = document.getElementsByTagName("expand");
    
    let dadosTag = tab.getElementsByTagName("dados")[0];
    let dados=[]; //inserir os dados
    let matriz=[]; //vamos usar para desenhar a tabela
    for(let w=0; w<colspanAttr.length;w++){
        matriz.push([
            colspanAttr[w].getAttribute("linha"),
            colspanAttr[w].getAttribute("coluna"),
            colspanAttr[w].getAttribute("tamanho")
        ]);
    }

    if (dadosTag) {
        let texto = dadosTag.textContent.trim(); //textContent - pega o conteudo de texto de uma tag
        console.log("Texto :"+ texto);
        let linhaDados = texto.split('\n'); //dividir em linhas
        console.log("Texto sem ENTER: "+ linhaDados);
        for(let linha of linhaDados) {
            let colunas = linha.split('|'); //dividir em colunas
            dados.push(colunas.map(c => c.trim())) //tirar espaços desnecessarios e adicionar a lista 
        }
        console.log("Texto final: "+ dados);
    }

    let bordaAttr =  tab.getAttribute("borda");
    let vetBorda = bordaAttr.split(" ");
    novaTabela.style.setProperty('--cor-borda', vetBorda[2]);
    novaTabela.style.setProperty('--tipo-borda', vetBorda[1]);
    novaTabela.style.setProperty('--tamanho-borda', vetBorda[0]);

    for(let x=0;x<linhas;x++){
        let tr=document.createElement("tr");
        for(let y=0;y<colunas;y++){
            let td=document.createElement("td");
            if (dados[x] && dados[x][y]) {
                td.innerText=dados[x][y];
            }

            let span=1;
            for(let k =0; k<matriz.length;k++){
                if(matriz[k][0] == x && matriz[k][1]==y){
                    span=matriz[k][2];
                    break;
                }
            }
            if(span>1){
                td.setAttribute("colspan",span);
            } y         +=span-1;

            tr.appendChild(td);
        }
        novaTabela.appendChild(tr);
    }
    tab.appendChild(novaTabela);

}