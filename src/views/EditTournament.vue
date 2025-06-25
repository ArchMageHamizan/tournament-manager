<template>
    <div class="edit-tournament flex flex-col gap-4 ">
        <h2 class="font-bold text-[20px] h-fit text-left uppercase tracking-wider ">Edit Tournament</h2>
        <div class="edit-tournament text-left flex justify-start  h-fit">
            <form action="" @submit="updateTournament" class="w-[40%]">
                <div class="grid grid-cols-[40px_1fr] items-center gap-2 mt-2">
                    <text class="text">Title:</text>
                    <input type="text" required v-model="tournament.name" class="border rounded-md p-2 w-full  focus:!outline-amber-600"/>
                </div>
                <div class="grid grid-cols-[40px_1fr] items-center gap-2 mt-2">
                    <text class="text">Date:</text>
                    <input type="text" required v-model="tournament.date" class="border rounded-md p-2 w-full  focus:!outline-amber-600"/>
                </div>
                <div class="grid grid-cols-[40px_1fr] items-center gap-2 mt-4">
                    <text class="text">Type:</text>
                    <Listbox v-model="tournament.type">
                        <div class="relative">
                            <ListboxButton class="border w-full uppercase rounded-md !bg-white !border-black hover:text-white focus:text-white hover:!bg-amber-500 focus:!bg-amber-600 outline-transparent hover:!border-transparent focus:border-transparent hover:outline-1 focus:!outline-1 hover:!outline-amber-500 hover:!outline-offset-3 focus:!outline-amber-600 focus:!outline-offset-3 transition-all duration-200 ease-in-out">{{tournament.type || 'Select tournament type'}}</ListboxButton>
                            <ListboxOptions class="absolute z-10 mt-1 w-full !bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                                 <ListboxOption
                                    v-for="type in optionType"
                                    :key="type"
                                    :value="type"
                                    class="cursor-pointer px-4 py-2 hover:bg-amber-500 hover:text-white uppercase ">
                                    {{type}}                                    
                                 </ListboxOption>
                            </ListboxOptions>
                        </div>
                    </Listbox>
                </div>
                <div class="button text-left mt-5">
                    <button type="submit" class="!bg-amber-500 text-amber-50 border-transparent focus:!bg-amber-600 focus:!border-transparent focus:outline focus:outline-offset-3 focus:outline-amber-600 hover:!bg-amber-600 hover:!border-transparent hover:outline hover:outline-offset-3 hover:outline-amber-600 !transition-all duration-200 ease-in-out !px-5 !py-2 rounded-md">Update</button>
                </div>                
            </form>
        </div> 
    </div>
</template>
<script setup>
    import {ref,onMounted} from 'vue';
    import axios from 'axios';
    import {useRoute,useRouter} from 'vue-router';
    import {Listbox,ListboxButton,ListboxOption,ListboxOptions} from '@headlessui/vue'; // Importing Listbox from Headless UI for dropdown functionality, if needed.
    
    const use_route=useRoute(); // is  Vue Router Composition API function
                                // gives you access to the current active route inside your component.
                                // You get the current route object that your component is rendering for.
                                // This route object contains information about the current route, such as its path, parameters, query strings, and more.
                                // Use route properties like .params, .query, .path, etc.
                                // if you have a route like '/tournaments/:id', you can access the 'id' parameter using use_route.params.id.
                                // Example: if the current route is '/tournaments/42', then `use_route.params.id` will be '42'.

    const use_router=useRouter(); // gives you access to the router instance itself
                                  // allows you to programmatically navigate to different routes, replace the current route, or access route information.
                                  // Use router methods like .push(), .replace(), .go(), etc.

    const tournament = ref({}) // it shoul initialize with ref({}) to reflect that it will eventually hold a single object, not an array.
                               // but ref([]) its okay and works too, as long as you handle it correctly in the template.
                               // Because API call returns an array (even for a single item).
                               //ref([]) is ref object wrapping a value

    // const tournament = ref([]); // an empty array
    // const response = await axios.get(`http://localhost:3010/tournaments?id=${use_route.params.id}`);
    // tournament.value = response.data; // response.data is: [{ id: 1, name: '...' }]
    // You're assigning an array of one object, like this:

    // tournament.value = [
    //     { id: 1, name: 'Official Tournament Store Season 2 2025', ... }
    // ];
    // 🔍 Now what happens in the template?

    //          {{ tournament.name }}
    //      Since tournament.value is an array, you’re essentially doing:
    //          [].name  // undefined
    //      So you’ll see nothing appear in the template — because tournament.name is undefined.
    //      BUT if you instead did:
    //          {{ tournament[0].name }}
    //      Then it would work, because you are referencing the first object in the array — which exists.

    const optionType =['individual','group']; // This is a simple array of strings representing the types of tournaments.
    // ==================================== ni pun boleh guna ======================================================
    // const fetchTournamentData = async () =>{
    //     const response = await axios.get(`http://localhost:3010/tournaments/${use_route.params.id}`);             
    //     tournament.value = response.data;
    //     console.log(response);
    // }
    // =======================================================================================================
    const fetchTournamentData = async () =>{
            const response = await axios.get(`https://tournament-manager-json-server-production.up.railway.app/tournaments?id=${use_route.params.id}`);  // GET request with a filter query parameter
                                                                                                              // This will return an array of tournaments that match the filter.
                                                                                                              // Does not identify a single resuorce to update,- just a filter.
            tournament.value = response.data[0]; // Assuming the API returns an array, we take the first element
            console.log(use_route.params.id,"type:",typeof use_route.params.id);
    }
    const updateTournament = async () => {
        try{
            await axios.put(`https://tournament-manager-json-server-production.up.railway.app/tournaments/${use_route.params.id}`,{ // PUT request to update the tournament
                                                                                         // RESTful endpoint for a single resource
                                                                                         // The URL should point to the specific tournament you want to update.
                                                                                         // Access(update/delete) the tournament with id=use_route.params.id

                name: tournament.value.name, // tournament is ref that wrapp the object
                date: tournament.value.date, // tournament.value is the object
                type: tournament.value.type  // tournament.value.type is the value of the type property in the object
            });
            use_router.push('/'); // Redirect to the home page after updating
        }
        catch(error){
            console.error("Failed to update tournament:", error);
        }
            
    }
    // use RESTful path (tournaments/value) to modifying data (PUT/PATCH/DELETE) (e.g: /tournaments/1)
    // use query path (tournaments?id=value) when filtering data (GET) (e.g: /tournaments?id=1) -> this is a filter query parameter not RESTful api cause it using the query (?id=1)  to find a single item.
    onMounted(fetchTournamentData)
</script>