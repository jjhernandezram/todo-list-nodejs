require('colors');

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('=========================='.green);
    console.log('   Aplicación de tareas');
    console.log('==========================\n'.green);
    console.log(`${'1.'.green} Crear tarea.`);
    console.log(`${'2.'.green} Listar tareas.`);
    console.log(`${'3.'.green} Listar tareas completadas.`);
    console.log(`${'4.'.green} Listar tareas pendientes.`);
    console.log(`${'5.'.green} Completar tarea(s).`);
    console.log(`${'6.'.green} Borrar tarea(s).`);
    console.log(`${'0.'.green} Crear tarea.\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Selecciona una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\n Presione ${'ENTER'.green} para continuar.\n`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

module.exports = {
  mostrarMenu,
  pause,
};
