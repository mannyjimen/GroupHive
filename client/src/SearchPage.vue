<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { createApp } from 'vue'
    import axios from 'axios'

// reactive variable to store the search input
    const searchQuery = ref('')
    interface Event {
        name: string;
        category: string;
        description: string;
        location: string;
        date: string;
        numberPeople: number;
    }

    const events = ref<Event[]>([])
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    onMounted(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            events.value = response.data;
        } catch (err) {
            console.error('Failed to fetch events', err);
            error.value = 'Failed to load events, Please try again later.';
        } finally {
            isLoading.value = false;
        }
    });
</script>

<template>
  <div class="searchPage">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="searchBar"
    />
    <div class="results">
      <p v-if="!searchQuery">Type something to search...</p>
      <p v-else>Searching for: "{{ searchQuery }}"</p>
    </div>

     <div class="eventsDisplay">
         <div>Events</div>
         <div v-if="isLoading">
             Loading events...
         </div>
         <ul v-else-if="events.length > 0">
             <li v-for="event in events">
                 <div>Name</div> <div>{{event.name}}</div>
                 <div>Category</div> <div>{{event.category}}</div>
                 <div>Description</div> <div>{{event.description}}</div>
                 <div>Location</div> <div>{{event.location}}</div>
                 <div>Date and Time</div> <div>{{event.date}}</div>
                 <div>Number of People</div> <div>{{event.numberPeople}}</div>
             </li>
         </ul>
         <div v-else>
             No events found.
         </div>
     </div>

  </div>
</template>

<style scoped>
.searchPage {
  background-color: #FFFEF2;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  border: 5px solid gray;
  border-radius: 10px;
}

.searchBar {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid gray;
  border-radius: 5px;
  outline: none;
}

.results {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
