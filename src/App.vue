<script setup>
  // import Tournaments from './components/TournamentCard.vue'
</script>

<template>
   <router-view/>  
   <!-- 1/ No need to directly import component here, because routing will handle what to show based on the current URL path. -->   
   <!-- 2/ <router-view /> is a placeholder where the current route's component (like TournamentList.vue, AddTournament.vue, or EditTournament.vue) gets rendered. -->
   <!-- 3/ When you navigate to a different route, Vue Router will automatically replace the content inside <router-view> with the component associated with that route. -->
   <!-- 4/ This allows you to have a single-page application where the content changes dynamically without reloading the entire page. -->
   <!-- 5/ The navigation links allow you to go between the home list and the add form. -->
   <!-- ========================== The flow =======================-->
   <!-- 1/ main.js mounts <App /> into the page’s #app element. -->
   <!-- 2/ <App /> shows header + <router-view />. -->
   <!-- 3/ <router-view /> loads whatever component matches the URL route. -->
</template>


