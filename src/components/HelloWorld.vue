<script setup>
import { ref,onMounted} from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const tournaments = ref([]) // store fetched tournaments
                            // use vue ref to create a reactive variable
                            // that will be updated when the data is fetched
                            // Later, when you fetch data from the server, you will replace this with the fetched tournaments


onMounted(()=>{  // onMounted() is a Vue lifecycle hook.
                 // It runs after the component is mounted (i.e., fully loaded in the browser).
                 // That’s the perfect time to fetch data from the server.
  fetch('http://localhost:3000/tournaments')
      .then(res => res.json()) // convert raw text format (JSON string) into javascript array
      .then(
        data=>{ // JavaScript object or array from the JSON body
          tournaments.value = data // access or update actual data inside ref([])
          console.log(data)
        }
      ).catch(error=>{
        console.error('Error fetchinng tournaments:',error)
      })
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div>
    <h2>Fetched Tournaments:</h2>
    <ul>
      <li v-for="(tournament,index) in tournaments" :key="tournament.id" style="text-align: left;">
        {{ index + 1 }} - {{ tournament.name }} - {{ tournament.date }}
      </li>
    </ul>
  </div>


  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
