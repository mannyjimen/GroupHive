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
    const search = ref('')

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

    async function saveEvent(eventName: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in to save an event.');
            return;
        }

        try {
            const response = await axios.patch('http://localhost:5000/api/profiles/save-event',
                { eventName: eventName },
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );

            alert(`"${eventName}" successfully saved to your profile!`);
            console.log('Save response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    alert('Session expired, log in to save events!');
                } else if (error.response.status === 404) {
                    alert('Profile could not be found to save the event.');
                } else if (error.response.status === 500 && error.response.data.details.includes('E11000')) {
                    alert('You have already saved this event.');
                }
            } else {
                alert('Network error occured.');
            }

            console.error('save event failutre:', error);
        }
    }

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
        <div v-if="searchQuery">
            <div v-for="event in events">
            <div v-if="event.name.toLowerCase().includes(searchQuery.toLowerCase())">
                <div className="events">
                    <div>Name: {{event.name}}</div>
                    <div>Description: {{event.description}}</div>
                    <div>Location: {{event.location}}</div>
                    <div>Date and Time: {{event.date}}</div>
                    <div>Number of People: {{event.numberPeople}}</div>
                </div>
            </div>
            </div>
        </div>
        <div v-else-if="!searchQuery && hasSearched">
            <p>Please enter an event.</p>
        </div>
        <div v-else>
        </div>
      
    </div>

     <div class="eventsPage">
         <div>Events</div>
         <div v-if="isLoading">
             Loading events...
         </div>
         <div className="eventsDisplay" v-else-if="events.length > 0">
             <div className="events" v-for="event in events">

                 <div :class="['eventImage', event.category]"></div>

                 <div>Name: {{event.name}}</div>
                 <div>Description: {{event.description}}</div>
                 <div>Location: {{event.location}}</div>
                 <div>Date and Time: {{event.date}}</div>
                 <div>Number of People: {{event.numberPeople}}</div>

                 <button class="saveButton" @click="saveEvent(event.name)">Save</button>
             </div>
         </div>
         <div v-else>
             No events found.
         </div>
     </div>

  </div>
</template>

<style scoped>
.searchPage {
  min-height: 100vh;
  padding: 20px;
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
.eventsDisplay{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Creates three equal-width columns */
    grid-auto-rows: minmax(100px, auto);;
}
.events {
    font-family: Cambria;
    font-size: 15px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    margin: 5px 5px 5px 5px;
}

.eventImage{
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background-size: cover;
    background-position: center; 
    background-repeat: no-repeat;
}

.saveButton {
    font-family: Cambria;
    font-size: 15px;
    padding: 5px;
    margin-right: 10px;
    margin-top: 5px;
    background: none;
    border-radius: 5px;
}

.Music {
    background-image: url('/music.jpg');

}
.Sports {
    background-image: url('/sports.jpg');
}

.Tech{
    background-image: url('/tech.jpg');
}

.Gaming{
    background-image: url('/gaming.jpg');
}

.Art{
    background-image: url('/art.jpg');
}

.Education{
    background-image: url('/education.jpg');
}

.Food{
    background-image: url('/food.jpg');
}

.Social{
    background-image: url('/social.jpg');
}

.Other{
    background-image: url('/other.jpg')
}

</style>
