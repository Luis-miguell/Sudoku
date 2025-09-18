let infoTabla = {
    tabla: getTable() || [
        [0, 0, 8, 0, 7, 5, 0, 0, 0],
        [7, 0, 9, 3, 0, 0, 0, 0, 0],
        [6, 5, 0, 0, 9, 0, 7, 0, 3],
        [5, 0, 7, 8, 0, 0, 0, 3, 0],
        [0, 0, 4, 0, 3, 6, 0, 5, 1],
        [3, 9, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 2, 0],
        [9, 0, 0, 0, 5, 0, 8, 0, 0],
        [2, 0, 0, 9, 8, 3, 0, 7, 0]
    ],
    getSuperCeld(inicioX, inicioY){
        let divX = Math.floor(inicioX / 3);
        let divY = Math.floor(inicioY / 3);
        let x = divX * 3;
        let y = divY * 3;
        let data = [];
        for(let i = x; i < x+3; i++){
            for(let z = y; z < y+3; z++){
                data.push(document.querySelector(`[data-row="${i}"][data-col="${z}"]`));
            }
        }
        return data;
    },
    updateTable(){
        let parseado = JSON.stringify(this.tabla);
        localStorage.setItem("table", parseado);
    }
}

function getTable(){
        let data = localStorage.getItem("table");
        let parseado = JSON.parse(data);
        return parseado;
    }

window.resaltDependients = (info, siono) => {
    let fila = document.querySelectorAll(`[data-row="${info.row}"]`);
    let column = document.querySelectorAll(`[data-col="${info.col}"]`);
    let superCeld = infoTabla.getSuperCeld(info.row, info.col);
    for(let x = 0; x < fila.length; x++){
        fila[x].classList[siono ? "add" : "remove"]("resaltMini");
    };
    for(let x = 0; x < column.length; x++){
        column[x].classList[siono ? "add" : "remove"]("resaltMini");
    };
    superCeld.forEach(ele => {
        ele.classList[siono ? "add" : "remove"]("resaltMini");
    })
}

function editContent(info){
    if(isNaN(info.valor) || !info.valor.trim() || info.valor > 9 || info.valor < 1){ 
        infoTabla.tabla[info.row][info.col] = 0;
        tableRender();
        return alert("Solo puedes ingresar números entre el 1 y el 9, pendejo.")
    }
    document.querySelector(`[data-row="${info.row}"][data-col="${info.col}"]`).innerText = info.valor.trim();
    infoTabla.tabla[info.row][info.col] = info.valor.trim();
    infoTabla.updateTable();
}  

function tableRender(){
    const skContainer = document.querySelector(".sk-container");
    skContainer.innerHTML = "";
    for(let scx = 0; scx < 3; scx++){
        for(let scy = 0; scy < 3; scy++){
            let superCeld = document.createElement("div");
            superCeld.setAttribute("class", "mayor-celd");
            for(let localRow = 0; localRow < 3; localRow++){
                for(let localCol = 0; localCol < 3; localCol++){
                    let globalRow = scx * 3 + localRow;
                    let globalCol = scy * 3 + localCol;
                    let val = infoTabla.tabla[globalRow][globalCol];
                    let minorCeld = document.createElement("div");
                    minorCeld.setAttribute("class", "minor-celd");
                    minorCeld.setAttribute("tabindex", "0");
                    minorCeld.setAttribute("data-row", globalRow);
                    minorCeld.setAttribute("data-col", globalCol);
                    minorCeld.addEventListener("focus", (e) => {
                        minorCeld.contentEditable = true;
                        resaltDependients({elemeto: e.currentTarget, row: e.currentTarget.dataset.row, col: e.currentTarget.dataset.col}, true);
                    });
                    minorCeld.addEventListener("blur", (e) => {
                        minorCeld.contentEditable = false;
                        resaltDependients({elemeto: e.currentTarget, row: e.currentTarget.dataset.row, col: e.currentTarget.dataset.col}, false);
                        editContent({valor: e.currentTarget.innerText.trim() || 0, row: e.currentTarget.dataset.row, col: e.currentTarget.dataset.col});
                    });
                    minorCeld.addEventListener("keydown", (e) => {
                        if(e.key === "Enter"){
                            e.currentTarget.blur();
                            e.preventDefault();
                        }
                    });
                    minorCeld.innerText = val != 0 ? val : "";  
                    superCeld.append(minorCeld);
                };
            }
            skContainer.append(superCeld);
        };
    };
};
tableRender()