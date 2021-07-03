const Tarea = require('./tarea');
require('colors');

class Tareas {
  _listado = {};

  get tareasArr() {
    const listado = [];
    Object.keys(this._listado).forEach((id) => {
      const tarea = this._listado[id];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
    return tarea;
  }

  cargarTareas(tareas) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listarTareas() {
    this.tareasArr.forEach(({ desc, completado }, i) => {
      let idx = `${i + 1}`.green;
      const estado = completado ? 'completada'.green : 'pendiente'.red;
      console.log(idx, `${desc} :: ${estado}`);
    });
  }

  tareasCompletadasPendientes(tareas = true) {
    let idx = 0;
    this.tareasArr.forEach(({ desc, completado }) => {
      const estado = completado ? 'completada'.green : 'pendiente'.red;
      if (tareas) {
        if (completado) {
          idx++;
          console.log(`${(idx + '.').green} ${desc} :: ${completado.green}`);
        }
      } else {
        if (!completado) {
          idx++;
          console.log(`${(idx + '.').green} ${desc} :: ${completado.green}`);
        }
      }
    });
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  completarTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completado) {
        tarea.completado = new Date().toISOString();
      }
    });

    this.tareasArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completado = null;
      }
    });
  }
}

module.exports = Tareas;
