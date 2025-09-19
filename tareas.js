let tareas = [];
let idActual = 1;
let tareaDragId = null;

function crearTarea() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    if (!nombre || !descripcion || !fechaEntrega) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    const tarea = {
        id: idActual++,
        nombre,
        descripcion,
        estado: "Por hacer",
        fechaEntrega
    };
    tareas.push(tarea);
    limpiarFormulario();
    renderizarKanban();
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('fechaEntrega').value = '';
}

function renderizarKanban() {
    const estados = ["Por hacer", "En progreso", "Completada"];
    estados.forEach(estado => {
        const contenedor = document.getElementById(`tareas-${estado.toLowerCase().replace(' ', '-')}`);
        contenedor.innerHTML = '';
        const tareasEstado = tareas.filter(t => t.estado === estado);
        for (let i = 0; i < tareasEstado.length; i++) {
            const t = tareasEstado[i];
            const div = document.createElement('div');
            div.className = 'tarea';
            div.draggable = true;
            div.id = `tarea-${t.id}`;
            div.ondragstart = (e) => drag(e, t.id);
            div.ondragend = (e) => dragEnd(e);

            let emoji = "📝";
            if (estado === "En progreso") emoji = "🚧";
            if (estado === "Completada") emoji = "✅";

            div.innerHTML = `
                <div class="acciones">
                    <button onclick="eliminarTarea(${t.id})" title="Eliminar">🗑️</button>
                </div>
                <strong>${emoji} ${t.nombre}</strong>
                <div>${t.descripcion}</div>
                <div class="fecha">📅 ${t.fechaEntrega}</div>
            `;
            contenedor.appendChild(div);
        }
    });
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarKanban();
}

// Drag & Drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, id) {
    tareaDragId = id;
    ev.currentTarget.classList.add('dragging');
}

function dragEnd(ev) {
    ev.currentTarget.classList.remove('dragging');
}

function drop(ev, nuevoEstado) {
    ev.preventDefault();
    if (tareaDragId !== null) {
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].id === tareaDragId) {
                tareas[i].estado = nuevoEstado;
                break;
            }
        }
        tareaDragId = null;
        renderizarKanban();
    }
}

// Inicializar tablero al cargar
window.onload = renderizarKanban;