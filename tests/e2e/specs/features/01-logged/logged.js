import { Given, Then } from "cypress-cucumber-preprocessor/steps";

/* ====================================================
 Feature: Logged
==================================================== */

/* ====================================================
 Background
==================================================== */

(function() {

  Given('I open user logged page', ()=> {
    cy.visit('/userLogged')
  });

})();

/* ====================================================
 Scenario: Welcome message is correct
==================================================== */

(function() {

  Then('I see Welcome message {string}', (message)=> {
    cy.get('[data-qa="welcomeMessage"]').contains(message);
  });

})();

/* ====================================================
 Scenario: I see Durin Doors image
==================================================== */

(function() {

  Then('I see Durin Doors image', ()=> {
    cy.get('[data-qa="mainImage"]');
  });

  Then('The image is accessible', ()=> {
    cy.get('[data-qa="mainImage"]').should('have.attr', 'alt');
  });

})();



