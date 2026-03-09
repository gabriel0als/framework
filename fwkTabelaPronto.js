let tabela = document.getElementsByTagName("tabela");
console.log(tabela);
for(let i=0;i<tabela.length;i++){
    let tab = tabela[i];
    let linhas = tab.getAttribute("linha");
    let colunas = tab.getAttribute("coluna");

    let novaTabela = document.createElement("table");

    let expandAttr = document.getElementsByTagName("expand");
    console.log(expandAttr)
    let matriz=[];
    for(let w=0; w<expandAttr.length;w++){
        matriz.push([
            expandAttr[w].getAttribute("linha"), //[0]
            expandAttr[w].getAttribute("coluna"), //[1]
            expandAttr[w].getAttribute("tamanho"), //[2]
            expandAttr[w].getAttribute("tipo") //[3]
            //Provavelmente vai ter que pegar o atributo tipo aqui
        ]);
    }

    console.log(matriz)

    let bordaAttr =  tab.getAttribute("borda");
    let vetBorda = bordaAttr.split(" ");
    novaTabela.style.setProperty('--cor-borda', vetBorda[2]);
    novaTabela.style.setProperty('--tipo-borda', vetBorda[1]);
    novaTabela.style.setProperty('--tamanho-borda', vetBorda[0]);

    let ocupado = []; //aqui ainda é um array vazio, vai armazenar quais posições da tabela foram ocupadas
    for (let a = 0; a < linhas; a++) {
        ocupado[a] = []; //preciso disso para que o ocupado seja uma matriz, entao coloco arrays dentro dele
    }

    console.log(ocupado);

    for(let x=0;x<linhas;x++){
        let tr=document.createElement("tr");
        for(let y=0;y<colunas;y++){
            if(ocupado[x][y]) continue; //uma verificação para ver se a célula que sera criada ja nao teve seu espaço tomado por um span, continue serve para pular o loop
            let td=document.createElement("td");
            ocupado[x][y] = true; //como a celula foi criada acima, marcamos na matriz ocupado que essa posicao ja esta ocupada
            let span=1; //span começa em 1 pq é uma celula
            let tipo=null //criei para guardar o tipo de span
            for(let k=0; k<matriz.length;k++){
                if(matriz[k][0] == x && matriz[k][1]==y){
                    span=matriz[k][2];
                    tipo=matriz[k][3];
                    break;
                }
            }
            if(span>1){
                if (tipo == "linha") {
                    td.setAttribute("rowspan",span);

                    for(let r = 1; r < span; r++){ //esse loop vai percorrer as proximas celulas e marca-las como preenchidas, r começa em 1 pq ele vai somar com o x, se começasse em 0 estaria verificando a celula atual pq estaria na row atual, mas a celula atual ja foi preenchida no 
                    // ocupado[x][y] = true
                        ocupado[x+r][y] = true; //
                    }
                } if (tipo == "coluna") {
                    td.setAttribute("colspan",span);
                    y+=span-1;
                }
            }
            tr.appendChild(td);
            
        }
        novaTabela.appendChild(tr);
        
    }
    tab.appendChild(novaTabela);
    console.log(ocupado)
}