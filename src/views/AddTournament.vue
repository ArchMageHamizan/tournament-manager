<template>
    <div class="add-tournament flex flex-col gap-4 ">
        <h2 class="font-bold text-[20px] h-fit text-left uppercase tracking-wider ">Add Tournament</h2>
        <div class="add-tournament text-left flex justify-start ">
            <form @submit.prevent="" class="w-[40%]">
                <div class="input grid grid-cols-[40px_1fr] gap-2 mt-2">
                    <text class="etxt">Title:</text>
                    <input type="text" class="name border rounded-md p-2 w-full focus:!outline-amber-600" v-model="tournament.name">
                </div>
                <div class="input grid grid-cols-[40px_1fr] gap-2 mt-2">
                    <text class="text">Date:</text>
                    <input type="text" class="date border rounded-md p-2 w-full focus:!outline-amber-600" v-model="tournament.date">
                </div>
                <div class="input grid grid-cols-[40px_1fr] gap-2 mt-2">
                    <text class="text">Type:</text>
                    <!-- <input type="text" class="title border rounded-md p-2 w-full focus:!outline-amber-600" v-model="tournament.type"> -->
                    <Listbox v-model="tournament.type">
                        <ListboxButton>{{ tournament.type || 'Select tournament type' }}</ListboxButton>
                        <ListboxOptions>
                            <ListboxOption v-for="type in optionType"
                                            :key="type"
                                            :value="type"
                                            class="cursor-pointer"
                            >
                                {{type}}
                            </ListboxOption>
                        </ListboxOptions>
                    </Listbox>
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
        await axios.post('http://localhost:3010/tournaments',{
            name:tournament.value.name,
            date:tournament.value.date,
            type:tournament.value.type
        })
        use_Router.push('/');
    }
</script>