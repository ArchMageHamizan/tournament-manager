<template class="tournamentCard"> <!--<template> tag doesn’t render into the DOM and cannot have a class. So your "tournamentCard" class is never applied to any real HTML element.-->
   <div v-if="tournament" class="tournament-card">
         <div class="tournament border p-4 rounded shadow mb-2 ">
            <h2 class="text-xl font-bold">{{ tournament.name}}</h2>
            <p>{{ tournament.date }} - {{ tournament.type.toUpperCase()}}</p>
            <div class="mt-5 flex gap-2 justify-end ">
                <button @click="$emit('editAction',tournament.id)" class="text-blue-500 !bg-gray-200 focus:!border-transparent hover:!border-transparent hover:outline hover:outline-offset-2 hover:!outline-amber-700 focus:!outline focus:!outline-offset-2 focus:!outline-amber-700" >Edit</button>
                <button @click="$emit('deleteAction',tournament.id)" class="text-red-500 !bg-gray-200 focus:!border-transparent hover:!border-transparent hover:outline hover:outline-offset-2 hover:!outline-amber-700 focus:!outline focus:!outline-offset-2 focus:!outline-amber-700">Delete</button>
            </div>
        </div>  
   </div>
   <div v-else>
           <p class="text-red-500">No tournament data provided.</p>
   </div>
</template>
<script setup> // using the Composition API with the <script setup> syntax.
    defineProps(['tournament']) // This component declare a prop named tournament that the parent component will pass in./ accept prop named tournament from parent.
                                // This prop will be an object containing details about the tournament, such as its title, date, and type.
                                // It means the parent component will do something like: 
                                // <TournamentCard :tournament="tournamentData" />
                                // where tournamentData is an object with the tournament details: 
                                //                                 {
                                //                                      id: 1,
                                //                                      name: 'Official Tournament',
                                //                                      date: '21/6/2025',
                                //                                      type: 'individual',
                                //                                  }                      
                                // The parent component will pass this prop to the TournamentCard component.    
                                // You can now use tournament.name, tournament.date, tournament.id, etc., directly in the template.
    defineEmits(['editAction','deleteAction']) // This component declare that  can emit two custom events:
                                               // 1. editAction: This event will be emitted when the user clicks the "Edit" button.
                                               // 2. deleteAction: This event will be emitted when the user clicks the "Delete" button.
                                               // The parent component can listen to these events and perform actions like opening an edit form or deleting the tournament.
                                               // Sending an event up to the parent component (TournamentList) with the tournament ID as a parameter.
                                               // The parent can catch those event like:
                                               //         <TournamentCard
                                               //             :tournament="t"
                                               //             @editAction="editTournament"
                                               //             @deleteAction="deleteTournament"
                                               //         />
</script>