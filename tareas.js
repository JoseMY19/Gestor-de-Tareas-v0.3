let tareas = [];
let idActual = 1;

function crearTarea() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const estado = document.getElementById('estado').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    if (!nombre || !descripcion || !estado || !fechaEntrega) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    const tarea = { id: idActual++, nombre, descripcion, estado, fechaEntrega };
    tareas.push(tarea);
    volverMenu();
}

function mostrarCrearTarea() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('crear-tarea').style.display = 'block';
    document.getElementById('listar-tareas').style.display = 'none';
}

function mostrarListarTareas() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('crear-tarea').style.display = 'none';
    document.getElementById('listar-tareas').style.display = 'block';
    renderizarTablaTareas();
}

function volverMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('crear-tarea').style.display = 'none';
    document.getElementById('listar-tareas').style.display = 'none';
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('estado').value = 'Por hacer';
    document.getElementById('fechaEntrega').value = '';
}

function renderizarTablaTareas() {
    const tbody = document.querySelector('#tabla-tareas tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < tareas.length; i++) {
        const t = tareas[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.id}</td>
            <td>${t.nombre}</td>
            <td>${t.estado}</td>
            <td>
                <button onclick="eliminarTarea(${t.id})">Eliminar</button>
                <button onclick="mostrarCambioEstado(${t.id})">Cambiar estado</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function eliminarTarea(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas.splice(i, 1);
            break;
        }
    }
    renderizarTablaTareas();
}

function mostrarCambioEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    const nuevoEstado = prompt("Ingrese el nuevo estado:\n1. En progreso\n2. Completada");
    if (nuevoEstado === "1") {
        tarea.estado = "En progreso";
    } else if (nuevoEstado === "2") {
        tarea.estado = "Completada";
    }
    renderizarTablaTareas();
}