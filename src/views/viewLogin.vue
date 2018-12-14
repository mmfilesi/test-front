<script>
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
      // saltamos
    }    
  },

  checkIsValidForm() {
    this.formInvalid = true;

    if (!this.validationsRequired()) {
      this.msgError = 'Required!';      
      return false;
    }
    if (!this.validationsEqual()) {
      return false;
    }

    this.formInvalid = false;
    this.msgError = '';
  },

  validationsRequired() {
    return this.userName && this.userPsw;
  },

  validationsEqual() {

  }
};

export default viewLogin;

</script>

<template>

  <article class="main-container">

    <header>
      <h3 data-qa="mainHeader">My Awesome Login</h3>
    </header>

    <section>
      <div v-if="formInvalid" data-qa="msgError" class="msg-error">{{msgError}}</div>
      <div>
        <label for="userName" data-qa="labelUserName">Name</label>
        <input type="text" id="userName" data-qa="inputUserName" v-model="userName">
      </div>
      <div>
        <label for="userPsw" data-qa="labelUserPsw">Password</label>
        <input type="text" id="userPsw" data-qa="inputUserPsw" v-model="userPsw">
      </div>
      <button @click="doLogin" data-qa="submitButton">Login</button>
    </section>

  </article>

</template>

<style>
  .main-container {
    margin: 2em;
  }
</style>