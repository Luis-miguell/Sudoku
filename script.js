let infoTabla = {
    tabla: [
        [0, 0, 8, 0, 7, 5, 0, 0, 0],
        [7, 0, 9, 3, 0, 0, 0, 0, 0],
        [6, 5, 0, 0, 9, 0, 7, 0, 3],
        [5, 0, 7, 8, 0, 0, 0, 3, 0],
        [0, 0, 4, 0, 3, 6, 0, 5, 1],
        [3, 0, 9, 5, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 2, 0],
        [9, 0, 0, 0, 5, 0, 8, 0, 0],
        [2, 0, 0, 9, 8, 3, 0, 7, 0]
    ],

    getSuperCeld(inicioX, inicioY){
        let x = inicioX * 3;
        let y = inicioY * 3;
        let data = [];
        for(let i = x; i < x+3; i++){
            for(let z = y; z < y+3; z++){
                data.push(this.tabla[i][z]);
            }
        }
        return data;
    },

    getRow(row){
        return this.tabla[row];
    },

    getColumn(column){
        let values = [];
        this.tabla.forEach(row => {
            values.push(row[column]);
        });
        return values;
    }
}

function tableRender(){
    const skContainer = document.querySelector(".sk-container");
    skContainer.innerHTML = "";
    for(let scx = 0; scx < 3; scx++){
        for(let scy = 0; scy < 3; scy++){
            let data = infoTabla.getSuperCeld(scx, scy);
            let superCeld = document.createElement("div");
            superCeld.setAttribute("class", "mayor-celd");
            data.forEach(val => {
                let miniCeld = document.createElement("div");
                miniCeld.setAttribute("class", "minor-celd");
                miniCeld.innerText = val ? val : "";
                superCeld.append(miniCeld);
            });
            skContainer.append(superCeld);
        }

    }
}

tableRender()