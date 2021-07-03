const inquirer = require('inquirer');
require('colors');

const opts = [
  {
    type: 'list',
    name: 'menu',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear nueva tarea.`,
      },
      {
        value: '2',
        name: `${'2.'.green} Enlistar tareas.`,
      },
      {
        value: '3',
        name: `${'3.'.green} Enlistar tareas completadas.`,
      },
      {
        value: '4',
        name: `${'4.'.green} Enlistar tareas pendientes.`,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea.`,
      },
      {
        value: '6',
        name: `${'6.'.green} Eliminar tarea.`,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir.`,
      },
    ],
  },
];

const mostarMenu = async () => {
  console.clear();
  console.log('=========================='.green);
  console.log('   Aplicación de TODO"s');
  console.log('==========================\n'.green);
  const { menu } = await inquirer.prompt(opts);
  return menu;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'opcion',
      message: `Presione ${'ENTER'.green} para continuar.`,
    },
  ];
  console.log(' ');
  console.log(' ');
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const tarea = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return `Debe de escribir una tarea.`;
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(tarea);
  return desc;
};

const borrarTarea = async (tareas = []) => {
  const opciones = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar tarea',
      choices: opciones,
    },
  ];

  opciones.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`,
  });

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const ListarTareaCompletadas = async (tareas = []) => {
  const opciones = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completado ? true : false,
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices: opciones,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  mostarMenu,
  pause,
  leerInput,
  borrarTarea,
  confirmar,
  ListarTareaCompletadas,
};
