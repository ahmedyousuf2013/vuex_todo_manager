import axios from 'axios';

const state = {

    countries: [{ id: 1, Name: 'Country one'  }, { id: 2, Name: 'Country  Name Two' }]

};
const getters = { allCountries: (state) => state.countries };
const actions = {

    async fetchCountries({ commit }) {

        const response = await axios.get('https://localhost:44372/api/countries/get')

        commit('setCountries', response.data);
       // console.log(response.data);
     },

    async AddCountry({
        commit
    }, country) {

        const response = await axios.post('https://localhost:44372/api/countries/create', country);
        commit('newCountry', response.data)
    },

    async DeleteCountry({ commit }, Id) {
         console.log('deleted', Id);
        const response= await axios.post(`https://localhost:44372/api/countries/Delete?Id=${Id}`);
        console.log(response);
        commit('removeCountry', Id)

    },

    // async filterToDods({commit},e) { 

    //     const limit = parseInt(
    //         e.target.options[e.target.options.selectedIndex].innerText
    //     );
      
    //     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
    //     commit('setTodos',response.data)
        

    // },
    async UpdateCountry({commit},Country){
        const response = await axios.post(`https://localhost:44372/api/countries/Update`,Country)
        
        console.log(response.data);
      commit('UpdateCountry', response.data);

    }

};
const mutations = {
    setCountries: (state, countries ) => (state.countries  = countries ),
    newCountry: (state, county) => state.countries.unshift(county),
    removeCountry: (state, Id) => state.countries = state.countries.filter(country =>country.Id !== Id),
    UpdateCountry :(state, Country)=>{

        const index=state.countries.findIndex(countries=>countries.Id===Country.Id);
        if (index !== -1) {
            state.countries.splice(index, 1, Country);
          }
    }

};

export default {

    state,
    getters,
    actions,
    mutations
}
