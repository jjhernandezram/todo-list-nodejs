const { v4: uuid } = require('uuid');

class Tarea {
  constructor(desc) {
    this.desc = desc;
    this.id = uuid();
    this.completado = null;
  }
}

module.exports = Tarea;
