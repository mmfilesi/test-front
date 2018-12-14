/*
Un test en jasmine está formado por distintas suites, cada una de las cuales analizan un fragmento del código. Cada suite se define en una función denominada describe, que recibe como primer parámetro una cadena con el título o nombre que le pongamos a la suite.

El segundo parámetro es una función en la que indicamos en una o más funciones lo que debe suceder. Estas funciones se llaman it y tienen como primer parámetro una cadena que luego se muestra en el informe final. Conviene escribirla en inglés y lo más concreta y precisa posible.

Por último, dentro de cada it hay un match, lo que se está buscando y que traducido vendía a ser algo así como "espero que (esto).sea(estoOtro)". 
*/

/* Suite */
describe("Calculator", function() {
  const calculator = require('../js/calculator');
  let myParam = 0;
  let mySecondParam = 0;

  /* Antes o después de que se ejecuten las pruebas podemos hacer cosas. */
  beforeEach(function() {
    myParam = 1;
    mySecondParam = 3;
  });

  it("should add", function() {
    let result = calculator.add(myParam, mySecondParam);
    expect(result).toEqual(4);
  });

  it("should subtract", function() {
    let result = calculator.subtract(myParam, mySecondParam);
    expect(result).toEqual(-2);
  });

  /* Cuando el método no devuelve un valor, no lo podemos
  testar sin incluir el DOM o hackearlo con jsdom o una herramienta
  similar */
  it("should show results", function() {    
  });

});
