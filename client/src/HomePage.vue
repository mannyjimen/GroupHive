<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const homePage = ref('home')
const username = ref('')

// === FAQ DATA ===
const faqList = ref([
  {
    question: "What is GroupHive?",
    answer: "GroupHive is a social platform designed to bring people together based on shared hobbies and passions. Unlike traditional media, we focus on real-world connections and community building.",
    image: "/hoopers.webp", 
    isOpen: false
  },
  {
    question: "How do I use GroupHive?",
    answer: "It's simple! Browse the categories to find a topic you love, or use the search bar. You can join existing hives or create your own to start hosting events.",
    image: "/bookclub.jpg", 
    isOpen: false
  },
  {
    question: "Do I need an account to use GroupHive?",
    answer: "Yes, to ensure the safety and quality of our communities, you need an account to join Hives and post content. However, you can browse public categories as a guest.",
    image: "/park.jpg", 
    isOpen: false
  }
])

// === CATEGORIES DATA ===
const categoriesList = ref([
    { 
      name: 'Basketball', 
      type: 'Sports', 
      image: '/basketball2.jpg', 
      color: '#E91E63' 
    },
    { 
      name: 'Art', 
      type: 'Arts & Culture', 
      image: '/artclub.jpg', 
      color: '#9C27B0' 
    },
    { 
      name: 'Coding', 
      type: 'Tech', 
      image: '/coders.jpg', 
      color: '#2196F3' 
    },
    { 
      name: 'Videogames', 
      type: 'Gaming', 
      image: '/Gamers.jpg', 
      color: '#4CAF50' 
    },
    { 
      name: 'Meditation', 
      type: 'Spirituality', 
      image: '/spiritual.jpg', 
      color: '#00BCD4' 
    },
    { 
      name: 'Open-minded', 
      type: 'Community', 
      image: '/openminded.jpg', 
      color: '#FF9800' 
    }
])


// Reference for the FAQ section HTML element to track scrolling
const faqSectionRef = ref<HTMLElement | null>(null)

function toggleFaq(index: number) {
  // Toggle the clicked item open/close
  faqList.value[index].isOpen = !faqList.value[index].isOpen
}

// Decode JWT token to extract username
function decodeToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch (err) {
    console.error('Failed to decode token:', err)
    return null
  }
}

// Function to update username from token
function updateUsername() {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = decodeToken(token)
    if (decoded && decoded.user && decoded.user.username) {
      username.value = decoded.user.username
    }
  } else {
    username.value = ''
  }
}

onMounted(() => {
  updateUsername()
  window.addEventListener('authChanged', updateUsername)

  // === SCROLL ANIMATION LOGIC ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, { threshold: 0.2 }) 

  if (faqSectionRef.value) {
    observer.observe(faqSectionRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('authChanged', updateUsername)
})
</script>

<template>
  <div class="homepage-container">
    <div class="hero-section">
        <img src="/hoopers.webp" alt="People playing basketball" class="side-image image-1">
        <img src="/bookclub.jpg" alt="Book club meeting" class="side-image image-2">
        
        <div class="intro">
            <div class="intro-main" v-if="username">
                Welcome Back!! {{ username }} 🐝
            </div>
            <div class="intro-main" v-else>
                Be a Part of the Hive! 🐝
            </div>
            <div class="intro-sub">
                Make Friends, Build Relationships, Join Communities
            </div>
        </div>

        <img src="/bar.jpg" alt="Friends at a bar" class="side-image image-3">
        <img src="/park.jpg" alt="People in a park" class="side-image image-4">
    </div>
    
    <section class="categories-section light-theme-style">
      <div class="section-header">
        <h2 class="section-title">Your Top Categories</h2>
        <button class="show-all-button">Show all</button>
      </div>
      
      <div class="categories-scroll-container">
        <div class="categories-list">
          
            <div 
                v-for="(category, index) in categoriesList" 
                :key="index"
                class="category-card"
            >
                <div class="card-image-wrapper">
                    <img :src="category.image" :alt="category.name" class="card-bg-image">
                    
                    <div class="card-bee-icon">
                        <img src="/beehive.png" alt="Icon" class="corner-png-icon">
                    </div>

                    <div 
                        class="card-title-strip" 
                        :style="{ backgroundColor: category.color }"
                    >
                        {{ category.name }}
                    </div>
                </div>
                <p class="category-type-subtext">{{ category.type }}</p>
            </div>

        </div>
      </div>
    </section>

    <section ref="faqSectionRef" class="faq-section fade-in-section">
      <h2 class="faq-title">Frequently Asked Questions</h2>
      <div class="faq-container">
        <div 
          v-for="(faq, index) in faqList" 
          :key="index" 
          class="faq-item"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-icon">{{ faq.isOpen ? '−' : '+' }}</span>
          </div>
          
          <transition name="slide-fade">
            <div v-show="faq.isOpen" class="faq-content">
              <p class="faq-answer">{{ faq.answer }}</p>
              <img :src="faq.image" alt="FAQ Visual" class="faq-image" />
            </div>
          </transition>
        </div>
      </div>
    </section>

    <footer class="official-footer">
        
        <div class="footer-socials">
            <a href="https://discord.gg/cNS7sP35PG" target="_blank" class="social-link" title="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/></svg>
            </a>

            <a href="#" class="social-link" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>

            <a href="#" class="social-link" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>

            <a href="#" class="social-link" title="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
        </div>

        <div class="footer-copyright">
            <img src="/beehive.png" alt="GroupHive Logo" class="footer-logo">
            <span class="footer-text">© 2024 GroupHive. All rights reserved.</span>
        </div>
    </footer>

  </div>
</template>

<style scoped>
    .homepage-container {
      padding: 0 30px 20px 30px; 
    }

    .home {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
   .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 60%; 
        text-align: center;
        color: #000000;
        position: relative; 
        z-index: 2; 
    }

    .intro-main {
        font-family: 'Lobster', cursive; 
        font-size: 48px; 
        margin-bottom: 10px;
    }

    .intro-sub {
        font-family: Cambria, sans-serif; 
        font-size: 22px; 
    }
    
    .search-bar {
        flex: none;
        width: 100%; 
        max-width: 400px; 
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

    /* === CATEGORY CSS === */
    .categories-section.light-theme-style {
      background-color: #FFFFFF; 
      padding: 20px 30px;
      margin-top: 40px; 
      margin-left: -30px;
      margin-right: -30px;
      color: #000000; 
      font-family: Cambria, sans-serif;
      border-top: 1px solid #ddd; 
      border-bottom: 1px solid #ddd;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 24px; 
      font-weight: bold; 
      color: #000000; 
      margin: 0;
    }

    .show-all-button {
      background: none;
      border: none;
      color: #555555; 
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      padding: 5px 10px;
    }

    .categories-scroll-container {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      scrollbar-width: thin;
      scrollbar-color: #ccc #f0f0f0; 
      padding-bottom: 15px; 
    }

    .categories-list {
      display: flex;
      flex-wrap: nowrap;
      gap: 24px;
    }

    .category-card {
        flex-basis: 160px; 
        flex-shrink: 0;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .category-card:hover {
        transform: translateY(-5px);
    }

    .card-image-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 100%; 
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .card-bg-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; 
    }

    .card-bee-icon {
        position: absolute;
        top: 8px;
        left: 8px;
        width: 28px; 
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .corner-png-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 2px 3px rgba(0,0,0,0.5)); 
    }

    .card-title-strip {
        position: absolute;
        bottom: 12px; 
        left: 0;
        color: white;
        font-weight: bold;
        font-size: 15px;
        padding: 6px 12px 6px 8px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .category-type-subtext {
        margin-top: 12px;
        font-size: 14px;
        color: #555;
        font-weight: 600;
        white-space: normal; 
        line-height: 1.2;
    }

    /* Hero Section */
    .hero-section {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 65vh; 
        margin-bottom: -20px; 
        overflow: hidden; 
    }

    .side-image {
        position: absolute;
        width: 16vw; 
        max-width: 300px; 
        min-width: 120px; 
        height: auto; 
        border: 3px solid #E6E6FA; 
        border-radius: 12px; 
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12); 
        z-index: 1; 
    }

    .image-1 { top: 10%; left: 5%; }
    .image-2 { top: 55%; left: 5%; }
    .image-3 { top: 10%; right: 5%; }
    .image-4 { top: 55%; right: 5%; }

    /* === FAQ SECTION STYLES === */
    .faq-section {
      margin-top: 60px;
      margin-bottom: 40px;
      padding: 20px;
      font-family: Cambria, sans-serif;
    }

    .faq-title {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
    }

    .faq-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color: #f9f9f9;
      cursor: pointer;
      font-weight: bold;
      font-size: 18px;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .faq-question:hover {
      background-color: #f0f0f0;
    }

    .faq-icon {
      font-size: 24px;
      font-weight: bold;
      color: #555;
    }

    .faq-content {
      display: flex;
      align-items: center; 
      justify-content: space-between;
      gap: 20px; 
      padding: 15px;
      background-color: #fff;
    }

    .faq-answer {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 0;
      color: #333;
      flex: 1; 
      font-style: italic;
      font-weight: bold;
    }

    .faq-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0; 
    }

    .faq-item:nth-child(even) .faq-content {
        flex-direction: row-reverse;
        text-align: right; 
    }


    /* Animation Classes */
    .fade-in-section {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .fade-in-section.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: all 0.3s ease-out;
      overflow: hidden;
      max-height: 500px; 
      opacity: 1;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
      max-height: 0;
      opacity: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    /* === UPDATED FOOTER STYLES === */
    .official-footer {
      display: flex;
      flex-direction: column; /* Stack socials on top of copyright */
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      margin-top: 40px; 
      border-top: 1px solid #eee; 
      font-family: Cambria, sans-serif;
    }

    /* Social Icons Row */
    .footer-socials {
        display: flex;
        gap: 20px;
        margin-bottom: 15px; /* Spacing between icons and copyright text */
    }

    .social-link {
        color: #000; /* Black by default */
        transition: transform 0.2s ease, color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .social-link svg {
        width: 24px;
        height: 24px;
        fill: currentColor; /* Inherits color from parent */
    }

    /* Hover Effect: Turns Gold */
    .social-link:hover {
        color: #D4AF37; /* Metallic Gold */
        transform: translateY(-2px); /* Slight lift */
    }

    /* Copyright Section */
    .footer-copyright {
        display: flex;
        align-items: center;
    }

    .footer-logo {
      width: 20px; 
      height: 20px;
      object-fit: contain;
      margin-right: 8px; 
      opacity: 0.7; 
    }

    .footer-text {
      font-size: 12px; 
      color: #777; 
    }
</style>