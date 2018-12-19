# https://www.npmjs.com/package/cypress-cucumber-preprocessor

# La feature es el proceso que queremos evaluar
Feature: Login

  As user I want login in the app
  
  # El tag sirve para ejecutar solo este test
  # mediante un flag en el script de npm: cypress run -e TAGS='not @foo and (@bar or @zap)'
  # Si se encuentra el tag focus, solo mirará este  
  # Probamos primero el happy path
  Scenario: Do login 
    Given I open login page
    When type my user name: Foo
    When type my user password: Bar
    When click submit button
    Then I go to user logged page
  
  # Vamos luego con las excepciones (criterios de aceptación)

  # Podemos concatenar Whens con And
  Scenario: Form rules: different
    Given I open login page
    # Ponemos los valores dinámicos entre comillas en este caso, para
    # usar luego {} expresiones cucumber
    # https://docs.cucumber.io/cucumber/cucumber-expressions/
    When type input name value as "Foo" and type input name value as "Foo"
    # El And no machea como tal en el código js, sino que se debe convertir
    # en un When o en un Then (según se ponga después de uno u otro)
    And click submit button
    Then message error should be display with text Different!

  # Ojo, antipattern, solo lo utilizo para mostrar los Scenario Outline y las Datatables.
  # Las pruebas de input name vacío y input contraseña vacío deberían
  # ir en sendos test
  # @focus
  Scenario: Form rules: required
    Given I open login page
    # Podemos iterar un proceso mediante las llamadas DataTables
    When dont type requireds inputs
      | name  | pwd   |
      | ''    | 'bar' |
      | 'foo' | ''    |
      | ''    | ''    |
    And click submit button
    Then message error should be display with text Required!