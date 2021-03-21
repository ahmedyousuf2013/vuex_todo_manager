<template>
  <div id="app">
    <div class="container">
      <!-- <AddTodo/>
    <FilterTodos/>
   

     <Todos/> -->
      <!-- <RegisterForm /> -->
      <!-- <Resetform/> -->
      <!-- <HomePage />
     <Aboutus /> -->

      <router-link to="/">Home</router-link>
      <router-link to="/about">About Us</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Todos from './components/Todos.vue';
// import AddTodo from './components/AddTodo.vue';
// import FilterTodos  from './components/FilterToDos.vue';

//import  RegisterForm from './components/RegisterForm';

//import Resetform from './components/Resetform.vue'
// import HomePage from './components/Homepage.vue'
// import Aboutus from './components/Aboutus.vue'

export default {
  name: "App",
  components: {
    // Todos,
    // AddTodo,
    // FilterTodos
    //RegisterForm
    //Resetform
    //  HomePage ,
    //  Aboutus
  },
};
</script>
    Resetform

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
