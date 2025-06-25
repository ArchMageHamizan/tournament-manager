<template>
    <div class="list-tournament grid grid-cols-1  gap-4 h-full">
        <h2 class="font-bold text-[20px]   text-left uppercase tracking-wider ">Tournament List</h2>
        <div class="add-tournament text-right flex justify-end h-fit">
            <router-link to="/add" class="flex items-center gap-2 !text-amber-50 bg-amber-500 w-fit px-5 py-2 rounded-full hover:outline hover:!outline-offset-4 hover:!outline-amber-700 transition-all duration-300 ease-in-out hover:bg-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
              <text class="text capitalize" > add tournament</text>
            </router-link>
        </div>
        <div class="list-tournament">
            <TournamentCard 
            v-for="tournamentCard in tournaments"
            :key="tournamentCard.id"
            :tournament="tournamentCard"
            @editAction="goToEditPage"
            @deleteAction="deleteThisTournament"

            /> 
            <!-- @editAction is a custom event that will be emitted when the user clicks the "Edit" button in the TournamentCard component.
            @deleteAction is a custom event that will be emitted when the user clicks the "Delete" button in the TournamentCard component. -->
        </div>
        
        

    </div>
</template>
<script setup>
    import TournamentCard from '../components/TournamentCard.vue';
    import {ref,onMounted} from 'vue';
    import axios from 'axios';
    import {useRouter} from 'vue-router';


    const tournaments= ref([]); // expecting an array of multiple tournaments from this API call:
                                //     [
                                //            { id: 1, name: "...", ... },
                                //            { id: 2, name: "...", ... },
                                //            ...
                                //     ]
    const use_router = useRouter();

    const getTournaments = async() =>{ // apply async keyword to the function to indicate that it will perform asynchronous operations.
                                       // This function will fetch the list of tournaments from the server.
                                       // The "async" keyword allows you to use "await" inside this function.
                                       // It means that this function will return a Promise, which can be awaited by other code.
                                       // So, when you call getTournaments(), it will return a Promise that resolves when the data is fetched.
                                       // This is useful for handling asynchronous operations like fetching data from an API.
        const response = await axios.get('http://localhost:3010/tournaments'); // apply get method to get data from the server 
                                                                               // using "await" inside this function.
                                                                               // await can only be used inside an "async" function.
                                                                               // You're waiting for data from the server, which takes time (because it's a network request).
                                                                               // You want to pause the code until the data comes back, then continue.
                                                                               // So:
                                                                               // ✔️ async = "This function is doing something asynchronous (like fetching data)"
                                                                               // ✔️ await = "Wait for that thing to finish before moving on"
                                                                               // It tells JavaScript to pause the execution of the function right here until the Promise on the right side of await settles (resolves or rejects).
        tournaments.value=response.data
    }

    // 1. getTournaments is called.
    // 2. It sends a HTTP GET request to the server at 'http://localhost:3010/tournaments'.
    // 3. The await makes JavaScript wait here without blocking the whole app — other code outside this function can keep running.
    // 4. When the server responds, the response data is stored in the "response" variable.
    // 5. tournaments.value is updated with the data from the server, which will trigger any Vue components that depend on this data to re-render.

    const goToEditPage =(id)=>{
        use_router.push(`/edit/${id}`) // `/edit-tournament/${id}` becomes "/edit-tournament/42" 
                                                  //  '/edit-tournament/${id}' this is a **string literal**, no variable is inserted
                                                  //  result: "/edit-tournament/${id}" — literally, not what you want
                                                  //  get access to the router instance ( e.g: push() , replace() ), which controls navigation in your app.
                                                  //  apply push method to navigate to the new route(edit page) with the tournament 'id'
                                                  //  If you have a route defined like this:
                                                  // { path: '/edit-tournament/:id', component: EditTournament, props: true }
                                                 
    }
    onMounted(getTournaments);

</script>