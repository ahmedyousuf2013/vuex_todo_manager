<template>
  <div>
    <h3>Add todo</h3>
    <div class="add">
      <form @submit="onSbmit">
        <input
          type="text"
          name=""
          id=""
          v-model="title"
          placeholder="Add Todo..."






        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["AddTodo"]),
    onSbmit(e) {
      e.preventDefault();
      this.AddTodo(this.title);
    },
  },
};
</script>
<style  scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>





