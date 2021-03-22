import HomePage from './components/Homepage.vue'
import Aboutus from './components/Aboutus.vue'

import PostPage from './components/PostPage.vue'

import PostsPage from './components/PostsPage.vue'

const routes= [{ path: "/", component: HomePage },
  { path: "/about", component: Aboutus },
  { path: "/posts/:id", component: PostPage ,props:true },
  { path: "/posts", component: PostsPage}

  ];

  export default routes;
