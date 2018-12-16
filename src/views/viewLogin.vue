<script>
import axios from 'axios';

const viewLogin = {};

/* ================================================
  settings
================================================ */

viewLogin.name = 'viewLogin';

viewLogin.components = {};

viewLogin.mixins = [];

/* ================================================
  data && props
================================================ */

viewLogin.data = function() {
  return {
    userName: '',
    userPsw: '',
    formInvalid: false,
    msgError: ''

  };
};

viewLogin.computed = {
};

/* ================================================
  hooks
================================================ */

viewLogin.created = function() {
};

viewLogin.mounted = function() {
};

/* ================================================
  methods
================================================ */

viewLogin.methods = { 
  doLogin() {
    if (this.checkIsValidForm()) {
      this.getUser();
    }    
  },

  checkIsValidForm() {
    this.formInvalid = true;

    if (!this.validationsRequired()) {
      this.msgError = 'Required!';      
      return false;
    }
    if (!this.validationsEqual()) {
      this.msgError = 'Different!';
      return false;
    }

    this.formInvalid = false;
    this.msgError = '';
    return true;
  },

  validationsRequired() {
    if (!this.userName || !this.userPsw) {
      return false;
    }
    return true;
  },

  validationsEqual() {
    return this.userName !== this.userPsw;
  },

  resetError() {
    this.formInvalid = false;
    this.msgError = '';
  },

  getUser() {
    axios.get('../mocks/user.json').then((results)=> {
      if (results.data.isValid === true) {
        this.$router.push('userLogged');
      } else {
        this.formInvalid = true;
        this.msgError = 'u shall not pass!';
      }
    });
  }
};

export default viewLogin;

</script>

<template>

  <article class="main-container">

    <header class="subtitle">
      <h3 data-qa="mainHeader">My Awesome Login</h3>
    </header>

    <section class="login-form">
      <div v-if="formInvalid" data-qa="msgError" class="msg-error">{{msgError}}</div>
      <div>
        <label class="login-form__label" for="userName" data-qa="labelUserName">Name</label>
        <input class="login-form__input" type="text" id="userName" data-qa="inputUserName" v-model="userName" @keydown="resetError">
      </div>
      <div>
        <label class="login-form__label" for="userPsw" data-qa="labelUserPsw">Password</label>
        <input class="login-form__input" type="text" id="userPsw" data-qa="inputUserPsw" v-model="userPsw" @keydown="resetError">
      </div>
      <button class="login-form__button" @click="doLogin" data-qa="submitButton">Login</button>
    </section>

  </article>

</template>

<style>
  .msg-error {
    color: red;
    font-weight: 900;
  }

  .login-form {
    border: 1px solid #ccc;
    padding: 1em;
    max-width: 300px;
    box-sizing: border-box;
    text-align: center;
    margin: 0 auto;
  }

  .login-form__input {
    margin: 0.5em;
  }

  .login-form__label {
    cursor: pointer;
  }

  .login-form__button {
    width: 100px;
    margin-top: 1em;
  }
  
</style>