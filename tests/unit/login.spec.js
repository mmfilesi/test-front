/* vue-utils es una librería para trabajar ut con vue. 
https://vue-test-utils.vuejs.org/guides/ 
Entre otros métodos, destacan mount, que "monta" (wrapea) un componente y el dom que conllevaría,
y shallowMount, que lo monta stubeando los compos que pudiera tener
*/
import { shallowMount } from '@vue/test-utils';
/* Importamos chai para definir los matchs. 
Chai cuenta con tres apis: assert, expect y should. Para este ejemplo vamos a usar expect */
import { expect } from 'chai';

/* Importamos el componente a testar */
import viewLogin from '@/views/viewLogin.vue';

describe('test viewLogin component', ()=> {
  let wrapper = null;

  /* Antes de cada prueba, wrapeamos el componente */
  beforeEach(()=> {
    wrapper = shallowMount(viewLogin);
  });
  
  /* Testamos que existan los elementos del interfaz */
  describe('viewLogin ui elements', ()=> {

    it('component has a root element with class main-container', () => {
      /* el api expect de chai permite concatenar operadores */    
      expect(wrapper.is('.main-container')).to.equal(true);
    });

    /* Comprobamos que exista un label y un input para el password */
    it('component display a label for psw input', () => {
      expect(wrapper.contains('[data-qa="labelUserPsw"]')).to.equal(true);
    });

    it('component display a input for psw', () => {
      expect(wrapper.contains('[data-qa="inputUserPsw"]')).to.equal(true);
    });

    /* Comprobamos que exista un label y un input para el nombre */
    it('component display a label for name input', () => {
      expect(wrapper.contains('[data-qa="inputUserPsw"]')).to.equal(true);
    });

    it('component display a input for name', () => {
      expect(wrapper.contains('[data-qa="inputUserName"]')).to.equal(true);
    });

    /* Comprobamos que exista un botón para enviar los datos */
    it('component display a submit button', () => {
      expect(wrapper.contains('[data-qa="submitButton"]')).to.equal(true);
    });

  });

  /* Analizamos ahora que cada método hace lo que debe hacer  */
  describe('viewLogin methods', ()=> {

    /* Validación required */
    describe('validationsRequired method', ()=> {

      it('validationsRequired return true if both inputs are ok', () => {
        let required;

        /* No "tecleamos" en los inputs los valores, sino que los cambiamos
        directamente en data, ya que no queremos comprobar si el data-binding de vue funciona,
        solo nuestros métodos */
        wrapper.vm.userName = 'foo';
        wrapper.vm.userPsw = 'bar';
        required = wrapper.vm.validationsRequired();
        expect(required).to.equal(true);
      });

      it('validationsRequired return false if some input is empty', () => {
        let required;
        let cases = [
          {name: '', pwd: 'bar'},
          {name: 'foo', pwd: ''},
          {name: '', pwd: ''}
        ];
        let len = cases.length;

        while (len--) {
          wrapper.vm.userName = cases[len].name;
          wrapper.vm.userPsw = cases[len].pwd;
          required = wrapper.vm.validationsRequired();
          expect(required).to.equal(false);
        }
      });
    });

    /* Validación diferentes */    
    describe('validationsEqual method', ()=> {

      it('validationsEqual return true if inputs values are different', () => {
        let differents;

        wrapper.vm.userName = 'foo';
        wrapper.vm.userPsw = 'bar';
        differents = wrapper.vm.validationsEqual();
        expect(differents).to.equal(true);
      });

      it('validationsEqual return false if input values are equal', () => {
        let differents;

        wrapper.vm.userName = 'foo';
        wrapper.vm.userPsw = 'foo';
        differents = wrapper.vm.validationsEqual();
        expect(differents).to.equal(false);
      });

    });

     /* Validación general */    
    describe('checkIsValidForm method', ()=> {      
      /* Fijémonos en que de nuevo no comprobamos nada del dom, si el mensaje de error
      aparece o no, sino solo si el método setea las data-propiedades correctamente.
      No testamos vue, sino el método */
      it('checkIsValidForm set formInvalid and msgKo data', () => {
        /* Podemos agrupar toda la casuística para que no sea tan verboso esto */
        let cases = [
          {name: '', pwd: '', result: true, msgKo: 'Required!'},
          {name: '', pwd: 'bar', result: true, msgKo: 'Required!'},
          {name: 'foo', pwd: '', result: true, msgKo: 'Required!'},
          {name: 'foo', pwd: 'foo', result: true, msgKo: 'Different!'},
          {name: 'foo', pwd:' bar', result: false, msgKo: ''}
        ];
        let len = cases.length;

        while (len--) {
          wrapper.vm.userName = cases[len].name;
          wrapper.vm.userPsw = cases[len].pwd;
          wrapper.vm.checkIsValidForm();
          expect(wrapper.vm.formInvalid).to.equal(cases[len].result);
          expect(wrapper.vm.msgError).to.equal(cases[len].msgKo);
        }
      });
    });

  });

});