<template>
     <ul class="nav">
        <li class="nav-item">
         
           <router-link :to="{ name:'home'}" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link  class="nav-link" to="/about">About Us</router-link>
        </li>
          <li class="nav-item">
          <router-link  class="nav-link" to="/posts">Posts</router-link>
        </li>
         <li class="nav-item">
          <router-link  class="nav-link" to="/users">Users</router-link>
     
       <li class="nav-item">
          <router-link  class="nav-link" to="/totos">Todos</router-link>
       </li>
       <li class="nav-item">
          <router-link  class="nav-link" to="/totosgrid">Todos Grid</router-link>
       </li>
        <li class="nav-item">
          <router-link  class="nav-link" to="/countries">Countries</router-link>
       </li>
       <li class="nav-item">
          <router-link  class="nav-link" to="/countriesgrid">Countries grid</router-link>
       </li>
      </ul>
        
</template>