export const crearTablaConCheckbox = (data) => {
    const tabla = document.createElement('table');
    tabla.appendChild(crearEncabezado(tabla));
    tabla.appendChild(crearCuerpo(data));
    return tabla;
};

// Encabezado
function crearEncabezado(tabla) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    const columnas = ["ID","Modelo","AnoFab","VelMax","AltMax","Autonomía","CantPue","CantRue"];

    columnas.forEach((col, index) => {
        const th = document.createElement('th');

        if(col !== "ID") {
            const checkbox = crearCheckbox(true);
            const label = crearLabel(col);
            th.appendChild(checkbox);
            th.appendChild(label);

            checkbox.addEventListener("change", () => toggleColumna(tabla, index, checkbox.checked));
        } else {
            th.textContent = col;
        }
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    return thead;
}

// Cuerpo
function crearCuerpo(data) {
    const tbody = document.createElement('tbody');
    const columnas = ["id","modelo","anoFab","velMax","altMax","autonomia","cantPue","cantRue"];

    data.forEach(el => {
        const tr = document.createElement('tr');
        tr.dataset.id = el.id;

        columnas.forEach(col => {
            const td = document.createElement('td');
            td.textContent = el[col] !== undefined ? el[col] : "";
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
    return tbody;
}

// Auxiliares
function crearCheckbox(checked = true) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.style.marginRight = "5px";
    return checkbox;
}

function crearLabel(text) {
    const label = document.createElement("span");
    label.textContent = text;
    return label;
}

function toggleColumna(tabla, index, mostrar) {
    tabla.querySelectorAll("tbody tr").forEach(tr => {
        const td = tr.children[index];
        td.style.display = mostrar ? "" : "none";
    });
}
