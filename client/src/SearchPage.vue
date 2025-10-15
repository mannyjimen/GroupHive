<script setup lang="ts">
import { ref } from 'vue'

// reactive variable to store the search input
const searchQuery = ref('')
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
