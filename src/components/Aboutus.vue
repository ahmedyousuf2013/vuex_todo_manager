<template>
  <div>
    <h1>About Us Page</h1>

    <button @click="goToHome">Go To Home After 1 sec</button>
  </div>
</template>
<script>
export default {
  methods: {
    goToHome: function () {
      const self = this;
      setTimeout(function () {
        self.$router.push("/");
      }, 1000);

      console.log("clicked");
    },
  },
  beforeRouteEnter(to, from, next){
  console.log('before enter Home Page');
  next();

  },
  beforeRouteLeave(to, from ,next){
      console.log('before Route Leave');
      if(confirm("Sure ?")){
        next();

      }


  }
};
</script>