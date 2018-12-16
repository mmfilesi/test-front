
describe('view login e2e test', () => {
  /* Como esta suite analiza el login, en el beforeEach
  cargamos la página y así no tenemos que hacerlo en todas
  y cada una de las pruebas (it) */ 
  beforeEach(() => {
    cy.visit('/login');
  });

  describe('viewLogin ui elements', () => {

  /* 1. Primero comprobamos que están todos los elementos. 
  Cada it es una "prueba de aceptación" */
    it('Should display the main title.', () => {
      /* Usamos selectores data-qa para separarlos de los selectores css / js
      vd: https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements */
      cy.get('[data-qa="mainHeader"]').should('be.visible');
      cy.get('[data-qa="mainHeader"]').contains('My Awesome Login');
    });

    it('Should display the main title.', () => {
      /* Usamos selectores data-qa para separarlos de los selectores css / js
      vd: https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements */
      cy.get('[data-qa="mainHeader"]').should('be.visible');
      cy.get('[data-qa="mainHeader"]').contains('My Awesome Login');
    });

    it('Should display user name input and label.', () => {
      cy.get('[data-qa="labelUserName"]').should('be.visible');
      cy.get('[data-qa="labelUserName"]').contains('Name');
      cy.get('[data-qa="inputUserName"]').should('be.visible');
    });

    it('Should display user password input and label.', () => {
      cy.get('[data-qa="labelUserPsw"]').should('be.visible');
      cy.get('[data-qa="labelUserPsw"]').contains('Password');
      cy.get('[data-qa="inputUserPsw"]').should('be.visible');
    });

    it('Should display submit button.', () => {
      cy.get('[data-qa="submitButton"]').should('be.visible');
      cy.get('[data-qa="submitButton"]').contains('Login');
    });
  });

  /* 2. Luego la interactividad */
  describe('viewLogin ui actions', () => {

    /* Probamos primero el happy path */
    it('Should go to viewLogin if my user is ok.', () => {
      cy.get('[data-qa="inputUserName"]').type('myName');
      cy.get('[data-qa="inputUserPsw"]').type('myPassword');
      cy.get('[data-qa="submitButton"]').click();
      cy.get('[data-qa="msgError"]').should('not.to.be.visible');
      cy.url().should('contain', 'userLogged');
    });

    /* Luego los errores */
    it('Should show error messagge if inputs are empty.', () => {
      cy.get('[data-qa="submitButton"]').click();
      /* Las aserciones se pueden encadenar */
      cy.get('[data-qa="msgError"]').should('be.visible').and('have.class', 'msg-error');
      cy.get('[data-qa="msgError"]').contains('Required!');
    });

    it('Should show error messagge if inputs are equal.', () => {
      cy.get('[data-qa="inputUserName"]').type('foo');
      cy.get('[data-qa="inputUserPsw"]').type('foo');
      cy.get('[data-qa="submitButton"]').click();
      /* Las aserciones se pueden encadenar */
      cy.get('[data-qa="msgError"]').should('be.visible').and('have.class', 'msg-error');
      cy.get('[data-qa="msgError"]').contains('Different!');
    });


  });

});