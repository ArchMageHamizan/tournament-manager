<template>
    <div class="add-tournament flex flex-col gap-4 ">
        <h2 class="font-bold text-[20px] h-fit text-left uppercase tracking-wider ">Add Tournament</h2>
        <div class="add-tournament text-left flex justify-start ">
            <form @submit.prevent="addTournament" class="w-[40%]">
                <div class="input grid grid-cols-[40px_1fr] gap-2 mt-2">
                    <text class="etxt">Title:</text>
                    <input type="text" class="name border rounded-md p-2 w-full focus:!outline-amber-600" v-model="tournament.name">
                </div>
                <div class="input grid grid-cols-[40px_1fr] gap-2 mt-2">
                    <text class="text">Date:</text>
                    <input type="text" class="date border rounded-md p-2 w-full focus:!outline-amber-600" v-model="tournament.date">
                </div>
                <div class="input grid grid-cols-[40px_1fr] items-center gap-2 mt-4">
                    <text class="text">Type:</text>
                    <!-- <input type="text" class="title border rounded-md p-2 w-full focus:!outline-amber-600" v-model="tournament.type"> -->
                    <Listbox v-model="tournament.type">
                        <div class="relative">
                            <ListboxButton class="border w-full uppercase rounded-md !bg-white !border-black hover:text-white focus:text-white hover:!bg-amber-500 focus:!bg-amber-600 outline-transparent hover:!border-transparent focus:border-transparent hover:outline-1 focus:!outline-1 hover:!outline-amber-500 hover:!outline-offset-3 focus:!outline-amber-600 focus:!outline-offset-3 transition-all duration-200 ease-in-out">{{ tournament.type || 'Select tournament type' }}</ListboxButton>
                            <ListboxOptions class="absolute z-10 mt-1 w-full !bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                                <ListboxOption v-for="type in optionType"
                                                :key="type"
                                                :value="type"
                                                class="cursor-pointer px-4 py-2 hover:bg-amber-500 hover:text-white uppercase "
                                >
                                    {{type}}
                                </ListboxOption>
                            </ListboxOptions>
                        </div>
                    </Listbox>
                </div>   
                <div class="button text-left mt-5">
                    <button type="submit" class="!bg-amber-500 text-amber-50 border-transparent focus:!bg-amber-600 focus:!border-transparent focus:outline focus:outline-offset-3 focus:outline-amber-600 hover:!bg-amber-600 hover:!border-transparent hover:outline hover:outline-offset-3 hover:outline-amber-600 !transition-all duration-200 ease-in-out !px-5 !py-2 rounded-md">
                        Submit
                    </button>
                </div>       
            </form>
        </div>
    
    </div>
</template>
<script setup>
    import {ref,onMounted} from 'vue';
    import axios from 'axios';
    import {useRouter} from 'vue-router';
    import { Listbox,ListboxButton,ListboxOption,ListboxOptions } from '@headlessui/vue';
    

    const tournament = ref({}); // Initialize tournament as an empty object to hold the new tournament data.
    const use_Router = useRouter();
    const optionType = ['individual', 'team']; // Define the options for the tournament type dropdown.

    const addTournament = async () => {
        await axios.post('https://tournament-manager-json-server-production.up.railway.app/tournaments',{
            name:tournament.value.name,
            date:tournament.value.date,
            type:tournament.value.type
        })
        use_Router.push('/');
    }
</script>