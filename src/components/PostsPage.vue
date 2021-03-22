<template>
  <div>
    <h1>Post Pages</h1>
    <ul>
      <li>
        <router-link to="/posts/1?q=1&name=test1">posts 1</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'single-post', params: { id: 2  } ,query:{q:2 ,name:'test2'}}">
          posts 2
        </router-link>
      </li>
    </ul>
  </div>
</template>