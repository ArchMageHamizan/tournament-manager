# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

Project Features (Basic Version):
1/ List of Tournaments

2/ Create a Tournament (name, date, type)

3/ Edit/Delete Tournament

4/ View Tournament Details (optional expansion)

5/ (Optional) Add Participants/Teams

=================================================

You now have:

1/ A full Vue project

2/ REST API integration

    VUE FILE             | HTTP   |  METHOD PURPOSE             |   REST API ENDPOINT
    ----------------------------------------------------------------------------------------------------------
    TournamentList.vue	 | GET	  |  Get all tournaments	    |   GET http://localhost:3000/tournaments
    AddTournament.vue	 | POST	  |  Add new tournament	        |   POST http://localhost:3000/tournaments
    EditTournament.vue	 | PUT	  |  Update existing tournament |	PUT http://localhost:3000/tournaments/1
    TournamentList.vue	 | DELETE |  Delete a tournament	    |   DELETE http://localhost:3000/tournaments/1


3/ CRUD features

4/ Usage of ES6+ syntax (async/await, const/let, arrow functions)