import HomePage from './components/Homepage.vue'
import Aboutus from './components/Aboutus.vue'

import PostPage from './components/PostPage.vue'

import PostsPage from './components/PostsPage.vue'

import UsersPage from './components/UsersPage'
import UsersHomePage from './components/Users/UsersHomePage.vue'
import UsersViewpage from './components/Users/UsersViewpage.vue'
import NotFound from './components/NotFound.vue'

const routes= [{ path: "/", component: HomePage , name:"home"},
  { path: "/about", component: Aboutus },
  { path: "/posts/:id", component: PostPage ,props:true, name:"single-post" },
  { path: "/posts", component: PostsPage},
  { path: "/users", component: UsersPage , children:[
    {path: "" ,component:UsersHomePage },
    {path: ":id" ,component:UsersViewpage , props:true},
  ]},
  { path: "*", component: NotFound},

  ];

  export default routes;
