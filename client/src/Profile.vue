<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { createApp } from 'vue'
    import axios from 'axios'

    interface EventRef {
        _id: string
        eventName: string
    }

    interface Profile {
        email: string;
        username: string;
        realName: string;
        savedEvents: EventRef[];
        postedEvents: EventRef[];
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
    const sevents = ref<Event[]>([])
    const pevents = ref<Event[]>([])
    const events = ref<Event[]>([])
    const profile = ref<Profile| null>(null);
    const isLoading = ref(true)
    const error = ref<string | null>(null)
    const search = ref('')

    const isEditing = ref(false)
    const editForm =  ref<Partial<Profile>>({
        realName: '',
        bio: '',    
        location: '',
        gender: '',
        age: undefined
    })

    // Get user info from token
    function getUserFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            // Decodes the payload section of the JWT
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            return payload.user; // Returns { id: ..., name: 'username' }
        } catch (e) {
            console.error("Invalid token");
            return null;
        }
    }

    function startEditingProfile() {
        error.value = null;

        if (profile.value) {
            editForm.value = {
                ...profile.value,
                // If these are undefined/null in DB, default them to empty string for the input box
                gender: profile.value.gender || '',
                location: profile.value.location || '',
                age: profile.value.age || undefined
            };
            isEditing.value = true;
        }
    }

    function cancelEditingProfile() {
        isEditing.value = false;
        editForm.value = {}; // Clear temp data
    }

    async function saveProfile() {
        if (!editForm.value || !profile.value) return;

        if (editForm.value.age !== undefined && editForm.value.age < 0) {
            error.value = "Invalid Age: Age cannot be a negative number.";
            return; 
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };

            const username = profile.value.username;
            await axios.put(`http://localhost:5000/api/profiles/${username}`, editForm.value, config);

            Object.assign(profile.value, editForm.value);
            
            isEditing.value = false;
            alert('Profile updated successfully!');

        } catch (err) {
            console.error('Failed to update profile', err);
            alert('Failed to save profile changes.');
        }
    }


    onMounted(async () => {
        //Get profile by user logged in
        //Get list of event names
        //Get events by name from list

        const currentUser = getUserFromToken();

        if (currentUser && currentUser.username){
            const token = localStorage.getItem('token'); //retrieving token from local storage

            // adding header object to request
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            
            // pass config to axios call
            const profileRes = await axios.get(
                `http://localhost:5000/api/profiles/${currentUser.username}`,
                config
            );
            profile.value = profileRes.data;
        }
        else{
            console.log("No such username found in profile database");
        }

        try {
            if(!profile.value) return
            const requests = profile.value.savedEvents.map(event =>
                axios.get(`http://localhost:5000/api/events/${event.eventName}`)
            );
            const responses = await Promise.all(requests);
            sevents.value = responses.map(r => r.data);
        } catch (err) {
            console.error('Failed to fetch events', err);
            error.value = 'Failed to load events, Please try again later.';
        } finally {
            isLoading.value = false;
        }

        try {
            if (!profile.value) return
            const requests = profile.value.postedEvents.map(event =>
                axios.get(`http://localhost:5000/api/events/${event.eventName}`)
            );
            const responses = await Promise.all(requests);
            pevents.value = responses.map(r => r.data);
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
            <div class="header-row">
                <h2>Your Information</h2>
                <div v-if="profile">
                    <button v-if="!isEditing" @click="startEditingProfile" class="profile-btn">Edit Profile</button>
                    <div v-else>
                        <p v-if="error" class="error-text">{{ error }}</p>
                        <button @click="saveProfile" class="profile-btn save-btn">Save</button>
                        <button @click="cancelEditingProfile" class="profile-btn cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>

    <div v-if="profile">
        <div class="info-field">
            <strong>Real Name:</strong>
            <span v-if="!isEditing"> {{ profile.realName }}</span>
            <input v-else v-model="editForm.realName" class="edit-input" placeholder="Enter real name" />
        </div>

        <div class="info-field">
            <strong>Username:</strong>
            <span> {{ profile.username }}</span> 
        </div>

        <div class="info-field">
            <strong>Bio:</strong>
            <span v-if="!isEditing"> {{ profile.bio }}</span>
            <textarea v-else v-model="editForm.bio" class="edit-input bio-box" placeholder="Tell us about yourself"></textarea>
        </div>

        <div class="info-field">
            <strong>Location:</strong>
            <span v-if="!isEditing"> {{ profile.location }}</span>
            <input v-else v-model="editForm.location" class="edit-input" placeholder="City, Country" />
        </div>

        <div class="info-field">
            <strong>Gender:</strong>
            <span v-if="!isEditing"> {{ profile.gender }}</span>
            <input v-else v-model="editForm.gender" class="edit-input" placeholder="Gender" />
        </div>

        <div class="info-field">
            <strong>Age:</strong>
            <span v-if="!isEditing"> {{ profile.age }}</span>
            <input v-else v-model.number="editForm.age" type="number" class="edit-input" placeholder="Age" />
        </div>

        <div class="info-field">
            <strong>Email:</strong>
            <span> {{ profile.email }}</span>
        </div>
    </div>

            <div v-else-if="!isLoading">
                <p>Profile not set up yet.</p>
            </div>
        </div>

        <div class="savedEvents">
            Events Saved
        </div>
        <div class="eventsPage">
            <div v-if="isLoading">Loading events...</div>
            <div className="eventsDisplay" v-else-if="sevents.length > 0">
                <div className="events" v-for="event in sevents" :key="event.name">
                    <div :class="['eventImage', event.category]"></div>
                    <div>Name: {{event.name}}</div>
                    <div>Description: {{event.description}}</div>
                    <div>Location: {{event.location}}</div>
                    <div>Date and Time: {{event.date}}</div>
                    <div>Number of People: {{event.numberPeople}}</div>
                </div>
            </div>
            <div v-else>No events found.</div>
        </div>

        <div class="postedEvents">
            Events Posted
        </div>
        <div class="eventsPage">
            <div v-if="isLoading">Loading events...</div>
            <div className="eventsDisplay" v-else-if="pevents.length > 0">
                <div className="events" v-for="event in pevents" :key="event.name">
                    <div :class="['eventImage', event.category]"></div>
                    <div>Name: {{event.name}}</div>
                    <div>Description: {{event.description}}</div>
                    <div>Location: {{event.location}}</div>
                    <div>Date and Time: {{event.date}}</div>
                    <div>Number of People: {{event.numberPeople}}</div>
                    <div class="button">
                        <button class="edit" @click="onClickEditEvent">Edit</button>
                        <button class="delete" @click="onClickDeleteEvent">Delete</button>
                    </div>
                </div>
            </div>
            <div v-else>No events found.</div>
        </div>
    </div>
</template>

<style scoped>
    .profile {
        display: flex;
        flex-direction: column;
        max-width: 900px; 
        margin: 0 auto;   
        width: 100%;
    }

    .information {
        font-family: Cambria, serif;
        font-size: 16px;
        padding: 40px; 
        margin: 30px 10px; 
        background-color: #fdfdfd; 
        border-radius: 12px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
        border: 1px solid #eee;
    }

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 2px solid #f0f0f0; 
    }

    .header-row h2 {
        margin: 0;
        font-size: 24px;
        color: #333;
    }

    .info-field {
        display: grid;
        grid-template-columns: 180px 1fr; 
        gap: 20px; 
        margin-bottom: 25px; 
        align-items: center; 
    }

    .info-field strong {
        color: #555;
        font-weight: 600;
        text-align: right; 
    }

    .edit-input {
        font-family: Cambria, serif;
        font-size: 16px;
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid #ccc;
        width: 100%; 
        max-width: 400px; 
        transition: border-color 0.2s;
    }

    .edit-input:focus {
        border-color: #666;
        outline: none;
    }

    .bio-box {
        width: 100%;
        max-width: 500px;
        height: 100px;
        resize: vertical; 
        line-height: 1.5;
    }

    .profile-btn {
        font-family: Cambria, serif;
        font-size: 14px;
        padding: 8px 20px;
        cursor: pointer;
        border-radius: 6px;
        border: none;
        transition: transform 0.1s ease;
    }
    
    .profile-btn:active {
        transform: scale(0.98);
    }

    .save-btn {
        background-color: #4CAF50;
        color: white;
        margin-right: 10px;
    }

    .cancel-btn {
        background-color: #f44336;
        color: white;
    }
    
    .edit-btn-start {
        background-color: #333;
        color: white;
    }

    .error-text {
        color: #d32f2f;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: right;
    }

    .savedEvents, .postedEvents {
        font-family: Cambria;
        font-size: 20px;
        font-weight: bold;
        margin: 20px 10px;
        color: #333;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    }

    .eventsDisplay {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
        gap: 20px;
        padding: 10px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .events {
        font-family: Cambria;
        font-size: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 15px;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .eventImage {
        width: 100%;
        height: 150px;
        border-radius: 8px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 15px;
    }

    .Music { background-image: url('/music.jpg'); }
    .Sports { background-image: url('/sports.jpg'); }
    .Tech { background-image: url('/tech.jpg'); }
    .Gaming { background-image: url('/gaming.jpg'); }
    .Art { background-image: url('/art.jpg'); }
    .Education { background-image: url('/education.jpg'); }
    .Food { background-image: url('/food.jpg'); }
    .Social { background-image: url('/social.jpg'); }
    .Other { background-image: url('/other.jpg'); }
</style>