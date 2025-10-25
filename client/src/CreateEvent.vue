<script setup lang="ts">
    import { ref } from 'vue'
    import axios from 'axios'

    // const createEvent = ref('event')
    const name = ref('')
    const category = ref('')
    const description = ref('')
    const location = ref('')
    const date = ref('')
    const time = ref('')
    const people = ref('')
    
    async function onClick() {
        //creating the object
        const eventData = {
            name: name.value,
            category: category.value,
            description: description.value,
            location: location.value,
            date: date.value,
            time: time.value,
            people: people.value
        }

        //axios call attempt
        try {
            //send post req
            const response = await axios.post('http://localhost:5000/api/events', eventData)
            console.log('server response:', response.data);
            alert('event created successfully');
            
            //clearing form fields (for ui experience)
            name.value = '';
            category.value = '';
            description.value = '';
            location.value = '';
            date.value = '';
            time.value = '';
            people.value = '';
        } catch (error) {
            console.error('error creating event:', error);
            alert('FAILED to create event. See console for details.');
        }

    }
</script>

<template>
    <div class="form">
        <div class="event">Create Event</div>
        <input class="fill" v-model="name" placeholder="Name">
        <input class="fill" v-model="category" placeholder="Category">
        <input class="fill" v-model="description" placeholder="Description">
        <input class="fill" v-model="location" placeholder="Location">
        <input class="fill" v-model="date" placeholder="Date">
        <input class="fill" v-model="time" placeholder="Time">
        <input class="fill" v-model="people" placeholder="People">
        <button class="button" @click="onClick">Create Event</button>
    </div>
</template>

<style scoped>
    .event {
        font-family: Cambria;
        font-size: 20px;
        margin: 0px 0px 50px 0px;
    }
    .fill {
        font-family: Cambria;
        font-size: 15px;
        padding: 5px;
        width: 500px;
        margin: 5px 0px 5px 0px; /*top,right,bottom,left*/
        border-radius: 5px;
        border-width: 1px;
    }

    .button {
        font-family: Cambria;
        width: 210px;
        margin: 10px 0px 0px 0px;
    }

    .form {
        display: flex;
        justify-content: center; /* Centers horizontally */
        align-items: center; /* Centers vertically */
        margin: 25px auto;
        padding: 10px;
        flex-direction: column;
        width: 90%;
        height: 400px;
        justify-content: center;
        border-radius: 50px;
        border: 1px solid black;
        outline: none;
    }
</style>