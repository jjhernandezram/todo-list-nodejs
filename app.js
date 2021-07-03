const Tareas = require('./models/tareas');
const { mostarMenu, pause, leerInput, borrarTarea, confirmar, ListarTareaCompletadas } = require('./helpers/inquirer');
const { guardarTareas, leerTareas } = require('./db/tareasdb');

const main = async () => {
  const tareas = new Tareas();
  let opt = '';

  let tareasdb = leerTareas();

  if (tareasdb) {
    const tarea = tareas.cargarTareas(tareasdb);
    console.log(tarea);
  }

  do {
    opt = await mostarMenu();

    switch (opt) {
      case '1':
        const tarea = await leerInput('Que desea hacer: ');
        tareas.crearTarea(tarea);
        break;

      case '2':
        tareas.listarTareas();
        break;

      case '3':
        tareas.tareasCompletadasPendientes(true);
        break;

      case '4':
        tareas.tareasCompletadasPendientes(false);
        break;

      case '5':
        const ids = await ListarTareaCompletadas(tareas.tareasArr);
        tareas.completarTareas(ids);
        break;

      case '6':
        const id = await borrarTarea(tareas.tareasArr);
        if (id !== '0') {
          const ok = await confirmar('¿esta seguro de querer borrar esta tarea?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Se elimino la tarea correctamente.');
          }
        }
        break;

      case '0':
        console.log('Saliendo de la aplicación.');
        break;
    }

    guardarTareas(tareas.tareasArr);

    await pause();
  } while (opt !== '0');
};

main();
