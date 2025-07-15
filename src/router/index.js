import {createRouter,createWebHistory} from 'vue-router' // createRouter: to create a new router instance.
                                                         // createWebHistory: to enable history mode using the browser's History API (clean URLs without hashes).                                            
import TournamentList from '../views/TournamentList.vue'
import TournamentCard from '../components/TournamentCard.vue'
import TournamentEdit from '../views/EditTournament.vue'
import TournamentAdd from '../views/AddTournament.vue'

const routes =[
    {path:'/',component:TournamentList},
    // {path:'/cards',component:TournamentCard},
    {path:'/edit/:id',component:TournamentEdit,props:true}, // props:true allows route params to be passed as props to the component.
                                                          // The :id part is a dynamic segment, which means any value placed there in the URL (e.g. /edit/123) will be captured as a route parameter named id.
                                                          // Pass {id:'123'} as a prop to EditTournament.vue component when navigating to /edit/123.
    {path:'/add',component:TournamentAdd}

]
export default createRouter({
    history:createWebHistory(), //history: configured with createWebHistory() for clean URL navigation.
    routes                      // routes: the routes array you just defined.  
})