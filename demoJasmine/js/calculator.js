const calculator = {

  add(a, b) {
    return a + b;
  },
  
  subtract(a, b) {
    return a - b;
  },
  
  showResults(result) {
    console.log(result);
  },
  
  doOperation(operation, param1, param2) {
    let result = operation === 'add' ? this.add(param1, param2) : this.subtract(param1, param2);
    this.showResults(result);
  }
  
};

// calculator.doOperation('add', 1, 3);
module.exports = calculator;