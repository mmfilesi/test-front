/*
Este patrón de diseño (reveal) es mejor que el anterior, ya que aplica la ley de Deméter:
(Cada unidad debe tener un limitado conocimiento sobre otras unidades y solo conocer aquellas unidades estrechamente relacionadas a la unidad actual).
Sin embargo, no pueden testarse sus métodos privados
*/

const calculator = (function() {
  let module  = {};
  let self = module;

  module.add = (a, b)=> {
    return a + b;
  },
  
  module.subtract = (a, b)=> {
    return a - b;
  },
  
  module.showResults = (result)=> {
    console.log(result);
  },
  
  module.doOperation = (operation, param1, param2)=> {
    let result = operation === 'add' ? self.add(param1, param2) : self.subtract(param1, param2);
    self.showResults(result);
  }
  
  return {
    doOperation: module.doOperation
  };

})();

// calculator.doOperation('add', 1, 3);
module.exports = calculator;