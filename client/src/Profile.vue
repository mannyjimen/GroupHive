<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { createApp } from 'vue'
    import axios from 'axios'

    interface Profile {
        email: string;
        username: string;
        realName: string;
        savedEvents: string[];
        bio: string;
        gender: string;
        location: string;
        age: number;
    }
    interface Event {
        name: string;
        category: string;
        description: string;
        location: string;
        date: string;
        numberPeople: number;
    }
    const events = ref<Event[]>([])
    const profile = ref<Profile>
    const isLoading = ref(true)
    const error = ref<string | null>(null)
    const search = ref('')

    onMounted(async () => {
        //Get profile by user logged in
        //Get list of event names
        //Get events by name from list
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
    async function onClickEdit() {
        //Call app.put('/api/events/:name')
        //Add input box to edit
    }
    async function onClickDelete() {
        //Call app.delete('/api/events/:name')
    }
</script>

<template>
    <div class="profile">
        <div class="information">
            Your Information
        </div>
        <div class="savedEvents">
            Events Saved
        </div>
        <div class="postedEvents">
            Events Posted
        </div>
        <div class="eventsPage">
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

                    <div class="button">
                        <button class="edit" @click="onClickEdit">Edit</button>
                        <button class="delete" @click="onClickDelete()">Delete</button>
                    </div>
                </div>
            </div>
            <div v-else>
                No events found.
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile {
        display: flex;
        flex-direction: column;
    }
    .information {
        font-family: Cambria;
        font-size: 15px;
    }
    .savedEvents {
        font-family: Cambria;
        font-size: 15px;
    }
    .postedEvents {
        font-family: Cambria;
        font-size: 15px;
    }
    .eventsDisplay {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; /* Creates three equal-width columns */
        grid-auto-rows: minmax(100px, auto);
    }
    .events {
        font-family: Cambria;
        font-size: 15px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px 10px 10px 10px;
        margin: 5px 5px 5px 5px;
    }
    .edit, .delete {
        font-family: Cambria;
        font-size: 15px;
        padding: 5px;
        margin-right: 10px;
        margin-top: 5px;
        background: none;
        border-radius: 5px;
    }

    .eventImage {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .Music {
        background-image: url('/music.jpg');
    }
    .Sports {
        background-image: url('/sports.jpg');
    }
    .Tech {
        background-image: url('/tech.jpg');
    }
    .Gaming {
        background-image: url('/gaming.jpg');
    }
    .Art {
        background-image: url('/art.jpg');
    }
    .Education {
        background-image: url('/education.jpg');
    }
    .Food {
        background-image: url('/food.jpg');
    }
    .Social {
        background-image: url('/social.jpg');
    }
    .Other {
        background-image: url('/other.jpg')
    }
</style>