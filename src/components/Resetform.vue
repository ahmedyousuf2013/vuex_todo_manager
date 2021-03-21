<template>


<form id="form" @submit.prevent="formSubmit">




<input v-validate="'required'" name="password" type="password" :class="{'is-danger': errors.has('password')}" placeholder="Password" ref="password">
<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

<input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" :class="{'is-danger': errors.has('password_confirmation')}" placeholder="Password, Again" data-vv-as="password">
<span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>






  <div class="form__line"><input v-model="name" name="name" type="text" /></div>
  <div class="form__line"><input v-model="email" name="email" type="email" /></div>
  <div class="form__line"><button>Submit</button></div>
  
  <p>
    <i>{{ submitted.name }}</i>
    <b>{{ submitted.email }}</b>
  </p>
  
  <output>
    <i>{{ submitted.name }}</i>
    <b>{{ submitted.email }}</b>
  </output>
</form>
</template>
<script>
export default {
data() {
    return {
     email: '',
    name: '',
    password:'',
    password_confirmation:''
    ,
    submitted: {
      name: '',
      email: ''
    }
    };
  },
  methods: {
    formSubmit: function (event) {
      this.submitted.name = this.name;
      this.submitted.email = this.email;

      this.name = this.email = "";

      event.target.reset();
    },
  }
};
</script>
<style>
</style>