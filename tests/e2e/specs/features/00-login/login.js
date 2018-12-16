import { Given, When, Then  } from "cypress-cucumber-preprocessor/steps";

/* ====================================================
 Feature: Login
==================================================== */

/* ====================================================
  Do login 
==================================================== */

(function() {

  Given('I open login page', ()=> {
    cy.visit('/login')
  }); 

  /* Convertimos la sentencia en una expresión regular
  para poder recibir parámetros */
  When(/type my user name: (.*)/, (name)=> {
    cy.get('[data-qa="inputUserName"]').type(name);
  });

  /* Convertimos la sentencia en una expresión regular
  para poder recibir parámetros. Cada expresión, se recibe
  en la función callback */
  When(/type my user password: (.*)/, (pwd)=> {
    cy.get('[data-qa="inputUserPsw"]').type(pwd);
  });

  When('click submit button', ()=> {
    cy.get('[data-qa="submitButton"]').click();
  });

  Then('I go to user logged page', ()=> {
    cy.url().should('contain', 'userLogged');
  });

})();

/* ====================================================
  Form rules: different
==================================================== */

(function() {

  Given('I open login page', ()=> {
    cy.visit('/login')
  });

  When(`type input name value as {string} and type input name value as {string}`, (name, pwd)=> {
    cy.get('[data-qa="inputUserName"]').type(name);
    cy.get('[data-qa="inputUserPsw"]').type(pwd);
    cy.get('[data-qa="submitButton"]').click();
  });

  Then('message error should be display with text Different!', ()=> {
    cy.get('[data-qa="msgError"]').should('be.visible').and('have.class', 'msg-error');
    cy.get('[data-qa="msgError"]').contains('Different!');
  });

})();


/* ====================================================
  Form rules: required
==================================================== */

(function() {

  Given('I open login page', ()=> {
    cy.visit('/login')
  });

  /* Las tablas de las sentencias Gerkhin se encuentran en el parámetro
  rarTable del objeto que recibe por parámetro y ahí tenemos un array donde
  cada ítem es un array con tantos subítems como hayamos definido.
  En nuestro ejemplo:
  [
    ["name", "pwd"] <-- como no queremos la cabecera, haremos un slice(1)
    ["''", "'bar'"]
    ["'foo'", "''"]
    ["''", "''"]
  ]
  OJO: sta prueba es un antipattern, sería más sencilla de hacer siguiendo el ejemplo anterior, sin las
  features, es solo para mostrar las datatables)
  */
  /* Compartimos un valor */
  let allwaysCrash = 'ok';
  When('dont type requireds inputs', (dataTable)=> {
    let tableParsed = dataTable.rawTable.slice(1);
    let len = tableParsed.length;

    function resetInputs() {
      /* Cypress permite usar selectores jQuery */
      Cypress.$('[data-qa="inputUserName"]').value = '';
      Cypress.$('[data-qa="inputUserPsw"]').value = '';
    }

    while (len--) {
      resetInputs();
      Cypress.$('[data-qa="inputUserName"]').value = tableParsed[len][0];
      Cypress.$('[data-qa="inputUserPsw"]').value = tableParsed[len][1];
      cy.get('[data-qa="submitButton"]').click();
      if ( !cy.get('[data-qa="msgError"]').should('be.visible')) {
        allwaysCrash = 'ko';
      }  
    }
  });

  Then('message error should be display with text Required!', ()=> {
    expect(allwaysCrash).to.equal('ok');
  });

})();

