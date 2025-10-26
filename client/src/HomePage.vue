<script setup lang="ts">
import { ref } from 'vue'

const homePage = ref('home')
</script>

<template>
  <div class="homepage-container">
    <div class="intro">
        <div>
            Welcome to Group Hive!
        </div>
        <div>
            A platform where you can find, join, and create events!
        </div>
    </div>
    <div class="home">
        <input type="text" class="search-bar" placeholder="Search..." />
    </div>

    
    <!-- === START: UPDATED CATEGORIES SECTION (Light Theme) === -->
    <section class="categories-section light-theme-style">
      <div class="section-header">
        <h2 class="section-title">Categories</h2>
        <button class="show-all-button">Show all</button>
      </div>
      
      <div class="categories-scroll-container">
        <div class="categories-list">
          
          <!-- Category Item 1: Basketball -->
          <div class="category-item">
            <div class="category-icon-wrapper">
              <!-- Basketball SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
            </div>
            <p class="category-label">Basketball</p>
            <p class="category-type">Sports</p> 
          </div>
          
          <!-- Category Item 2: Music -->
          <div class="category-item">
            <div class="category-icon-wrapper">
              <!-- Music SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
            </div>
            <p class="category-label">Music</p>
            <p class="category-type">Arts</p> 
          </div>
          
          <!-- Category Item 3: Coding -->
          <div class="category-item">
            <div class="category-icon-wrapper">
              <!-- Coding SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="10" y1="20" x2="14" y2="4"></line></svg>
            </div>
            <p class="category-label">Coding</p>
            <p class="category-type">Tech</p> 
          </div>
          
          <!-- Category Item 4: Videogames -->
          <div class="category-item">
            <div class="category-icon-wrapper">
              <!-- Videogames SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l-4 4v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-4-4H6z"></path><path d="M12 18v-6"></path><path d="M15 15l-3-3-3 3"></path></svg>
            </div>
            <p class="category-label">Videogames</p>
            <p class="category-type">Gaming</p> 
          </div>

          <!-- Category Item 5: More -->
          <div class="category-item">
            <div class="category-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <p class="category-label">More</p>
            <p class="category-type">Explore</p> 
          </div>

        </div>
      </div>
    </section>
    <!-- === END: UPDATED CATEGORIES SECTION === -->

  </div>
</template>

<style scoped>
    /* Removed the 'Shadows Into Light Two' font import, as it's no longer needed here */
    /* @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap'); */

    .homepage-container {
      padding: 0 30px 20px 30px; 
    }

    .home {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .join, .create {
        font-family: Cambria;
        font-size: 30px;
        margin-top: 30px;
    }
    .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: Cambria;
        font-size: 30px;
        margin-top: 30px;
        color: #000000; /* Set intro text to black */
    }
    .search-bar {
        flex: none;
        width: 400px;
        height: 30px;
        padding: 2px 12px;
        border-radius: 999px;
        border: 2px solid #808080;
        outline: none;
        font-size: 14px;
        box-sizing: border-box;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    /* === START: UPDATED CATEGORY STYLES (Light Theme Style) === */
    .categories-section.light-theme-style {
      background-color: #FFFFFF; /* Light background */
      padding: 20px 30px;
      margin-top: 40px; 
      margin-left: -30px;
      margin-right: -30px;
      border-radius: 0;
      color: #000000; /* Default text color for this section */
      font-family: Cambria, sans-serif;
      border-top: 1px solid #ddd; /* Added border for separation */
      border-bottom: 1px solid #ddd;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 24px; /* Simple font size */
      font-weight: bold; /* Simple bold weight */
      color: #000000; /* Black color */
      margin: 0;
      font-family: Cambria, sans-serif; /* Simple, non-handwritten font */
      /* Removed all cursive/glow styles */
    }

    .show-all-button {
      background: none;
      border: none;
      color: #555555; /* Dark grey for button text */
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      transition: color 0.2s ease;
    }

    .show-all-button:hover {
      color: #000000; /* Black on hover */
    }

    .categories-scroll-container {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      
      scrollbar-width: thin;
      scrollbar-color: #ccc #f0f0f0; /* Light scrollbar */
    }

    /* Webkit (Chrome, Safari) scrollbar styling for light mode */
    .categories-scroll-container::-webkit-scrollbar {
      height: 8px;
    }
    .categories-scroll-container::-webkit-scrollbar-track {
      background: #f0f0f0; /* Light track */
      border-radius: 4px;
    }
    .categories-scroll-container::-webkit-scrollbar-thumb {
      background-color: #ccc; /* Light thumb */
      border-radius: 4px;
    }
    .categories-scroll-container::-webkit-scrollbar-thumb:hover {
      background-color: #aaa;
    }

    .categories-list {
      display: flex;
      flex-wrap: nowrap;
      gap: 24px;
      padding-bottom: 10px;
    }

    .category-item {
      flex-basis: 150px;
      flex-shrink: 0;
      
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      
      background-color: #f9f9f9; /* Very light grey item background */
      border: 1px solid #eee; /* Light border */
      border-radius: 8px;
      padding: 16px;
      
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease; /* Updated hover effect */
      text-align: center;
      min-height: 180px;
    }

    .category-item:hover {
      transform: translateY(-5px); /* Add lift effect */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Add shadow */
    }

    .category-icon-wrapper {
      width: 100px;
      height: 100px;
      background-color: #f0f0f0; /* Light placeholder circle */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      color: #333333; /* Darker icon color */
    }

    .category-icon-wrapper svg {
      width: 60px;
      height: 60px;
    }

    .category-label {
      font-size: 16px;
      font-weight: bold;
      color: #333333; /* Dark text */
      margin: 0;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .category-type {
      font-size: 13px;
      color: #777777; /* Medium grey for secondary text */
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
    /* === END: UPDATED CATEGORY STYLES === */
</style>
