import axios from 'axios';
const state = {

    todos: [{ id: 1, title: 'TOdo One' }, { id: 2, title: 'TOdo Two' }]

};
const getters = { allTodos: (state) => state.todos };
const actions = {

    async fetchTodos({ commit }) {

        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

        commit('setTodos', response.data);
        console.log(response.data);
    },

    async AddTodo({
        commit
    }, title){

        const response=await axios.post('https://jsonplaceholder.typicode.com/todos',{title, completed:false});
        commit('newTodo', response.data)
    }

};
const mutations = {
    setTodos: (state, todos) => (state.todos = todos ),
    newTodo:(state,todo)=>state.todos.unshift(todo)

};

export default {

    state,
    getters,
    actions,
    mutations
}
