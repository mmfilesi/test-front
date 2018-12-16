Feature: user logged view

  As user I want see the logged view  

  # Como tenemos un Given recurrente en estos escenarios,
  # podemos definirlo como "Background"
  # (se podría haber hecho así en el otro caso, claro)
  # El Background se ejecuta antes de cada uno de los Scenarios
  Background:
    Given I open user logged page

  Scenario: Welcome message is correct
    Then I see Welcome message "User is logged ^^"

  Scenario: Welcome image is correct
    Then I see Durin Doors image 
    And The image is accessible