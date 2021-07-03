const fs = require('fs');

const tareasBd = './db/tareas.json';

const guardarTareas = (tareas) => {
  fs.writeFileSync(tareasBd, JSON.stringify(tareas));
};

const leerTareas = () => {
  if (!fs.existsSync(tareasBd)) {
    return null;
  }
  const data = fs.readFileSync(tareasBd, { encoding: 'utf8' });
  const tareas = JSON.parse(data);
  return tareas;
};

module.exports = {
  guardarTareas,
  leerTareas,
};
