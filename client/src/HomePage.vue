<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const homePage = ref('home')
const username = ref('')
const router = useRouter()

function goToJoin() {
  router.push('/search')
}

// === FAQ DATA ===
const faqList = ref([
  {
    question: "What is GroupHive?",
    answer: "GroupHive is a social platform designed to bring people together based on shared hobbies and passions. Unlike traditional media, we focus on real-world connections and community building.",
    image: "sb7.jpg", 
    isOpen: false
  },
  {
    question: "How do I use GroupHive?",
    answer: "It's simple! Browse the categories to find a topic you love, or use the search bar. You can join existing hives or create your own to start hosting events.",
    image: "sb13.jpg", 
    isOpen: false
  },
  {
    question: "Do I need an account to use GroupHive?",
    answer: "Yes, to ensure the safety and quality of our communities, you need an account to join Hives and post content. However, you can browse public categories as a guest.",
    image: "/park.jpg", 
    isOpen: false
  },
  {
    question: "Do I have to pay for GroupHive?",
    answer: "No, GroupHive is completely free to use. Our mission is to make community building accessible to everyone, so you can join Hives, discover interests, and attend events without any subscription fees or hidden costs.",
    image: "sb10.jpg", 
    isOpen: false
  },
  {
    question: "Are there recurring events?",
    answer: "Yes! GroupHive supports recurring events to promote community and a sense of togetherness. We believe that consistent meetups are the best way to foster the long-term friendships we promote at GroupHive.",
    image: "sb11.jpg", 
    isOpen: false
  },
  {
    question: "How does the profile feature work?",
    answer: "Your profile is the heart of your experience. Every event you join or host is automatically attached to your profile. This helps our platform learn your preferences and connect you with people who share similar interests.",
    image: "/sb9.jpg", 
    isOpen: false
  }
])

// === CATEGORIES DATA ===
const categoriesList = ref([
    { name: 'Basketball', type: 'Sports', image: '/basketball2.jpg', color: '#E91E63' },
    { name: 'Art', type: 'Arts & Culture', image: '/artclub.jpg', color: '#9C27B0' },
    { name: 'Coding', type: 'Tech', image: '/coders.jpg', color: '#2196F3' },
    { name: 'Videogames', type: 'Gaming', image: '/Gamers.jpg', color: '#4CAF50' },
    { name: 'Meditation', type: 'Spirituality', image: '/spiritual.jpg', color: '#00BCD4' },
    { name: 'Open-minded', type: 'Community', image: '/openminded.jpg', color: '#FF9800' },
    { name: 'Band', type: 'Music', image: '/drummer.jpg', color: '#607D8B' }
])

const faqSectionRef = ref<HTMLElement | null>(null)

function toggleFaq(index: number) {
  faqList.value[index].isOpen = !faqList.value[index].isOpen
}

function decodeToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    return JSON.parse(atob(payload))
  } catch (err) {
    console.error('Failed to decode token:', err)
    return null
  }
}

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
      <div class="photo-grid-bg">
        <img src="/bar.jpg" class="grid-img">
        <img src="/sb15.jpg" class="grid-img">
        <img src="/sb2.jpg" class="grid-img">
        <img src="/sb16.jpg" class="grid-img">
        <img src="/hoopers.webp" class="grid-img">
        
        <img src="/sb5.jpg" class="grid-img">
        <img src="/sb6.jpg" class="grid-img">
        <img src="/sb12.jpg" class="grid-img">
        <img src="/sb8.jpg" class="grid-img">
        <img src="/bookclub.jpg" class="grid-img">

        <img src="/sb9.jpg" class="grid-img">
        <img src="/sb14.jpg" class="grid-img">
        <img src="/sb11.jpg" class="grid-img">
        <img src="/sb16.jpg" class="grid-img">
        <img src="/bar.jpg" class="grid-img">
      </div>
        
      <div class="intro">
          <div class="intro-main" v-if="username">
              Welcome Back, {{ username }}! 🐝
          </div>
          <div class="intro-main" v-else>
              Be a Part of the Hive! 🐝
          </div>
          <div class="intro-sub">
              Make Friends, Build Relationships, Join Communities
          </div>
          <input type="text" class="search-bar" placeholder="Search..." @keyup.enter="goToJoin" />
      </div>
    </div>

    <section class="categories-section light-theme-style">
      <div class="section-header">
        <h2 class="section-title">Your Top Categories</h2>
        <button class="show-all-button" @click="goToJoin">Show all</button>
      </div>
      <div class="categories-scroll-container">
        <div class="categories-list">
            <div v-for="(category, index) in categoriesList" 
                 :key="index" 
                 class="category-card"
                 @click="goToJoin">
                <div class="card-image-wrapper">
                    <img :src="category.image" class="card-bg-image">
                    <div class="card-title-strip" :style="{ backgroundColor: category.color }">
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
        <div v-for="(faq, index) in faqList" :key="index" class="faq-item">
          <div class="faq-question" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-icon">{{ faq.isOpen ? '−' : '+' }}</span>
          </div>
          <transition name="slide-fade">
            <div v-show="faq.isOpen" class="faq-content">
              <p class="faq-answer">{{ faq.answer }}</p>
              <img :src="faq.image" class="faq-image" />
            </div>
          </transition>
        </div>
      </div>
    </section>

    <footer class="official-footer">
        <div class="footer-socials">
            <a href="https://discord.gg/cNS7sP35PG" target="_blank" class="social-link"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/></svg></a>
            <a href="#" class="social-link"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="#" class="social-link"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <a href="#" class="social-link"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        </div>
        <div class="footer-copyright">
            <img src="/beehive.png" class="footer-logo">
            <span class="footer-text">© 2024 GroupHive. All rights reserved.</span>
        </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap');

.homepage-container { padding: 0 30px; position: relative; }

.hero-section {
    position: relative;
    width: 100vw;
    height: 65vh; 
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 0; 
    box-shadow: 0 10px 20px rgba(0,0,0,0.1); 
    z-index: 5; 
}

.photo-grid-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    grid-template-rows: repeat(3, 1fr);
    gap: 0; 
}

.grid-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none !important;
}

.intro {
    position: relative;
    z-index: 10; 
    text-align: center;
    background: rgba(255, 255, 255, 0.95); 
    padding: 40px;
    border-radius: 30px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    max-width: 50vw;
}

/* FONT SIZE ADJUSTED TO FIT WHITE BOX */
.intro-main { 
    font-family: 'Inter', sans-serif; 
    font-size: 2.8vw; /* Adjusted size to stay balanced in the box */
    font-weight: 800;
    letter-spacing: -0.04em;
    margin-bottom: 10px; 
    color: #1a1a1a; 
}

.intro-sub { 
    font-family: 'Inter', sans-serif; 
    font-size: 1.2vw; 
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #333; 
}

.search-bar {
    width: 100%;
    max-width: 350px;
    height: 45px;
    padding: 10px 25px;
    border-radius: 25px;
    border: 2px solid #808080;
    margin-top: 20px;
    font-size: 1.1vw;
    outline: none;
    box-sizing: border-box;
}

/* === CATEGORIES SECTION WITH TOP MARGIN (THE SLIVER) === */
.categories-section.light-theme-style { 
    background: #FFFFFF; 
    padding: 40px 30px; 
    /* Increased margin-top to 30px to create the background sliver gap */
    margin: 25px -30px 40px -30px; 
    border-top: 1px solid #e0e0e0; 
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    z-index: 1;
}

.section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
.section-title { font-size: 24px; font-weight: bold; }
.show-all-button { background: none; border: none; color: #555; cursor: pointer; font-size: 14px; font-weight: bold; }
.categories-scroll-container { overflow-x: auto; white-space: nowrap; padding-bottom: 15px; }
.categories-list { display: flex; gap: 24px; }
.category-card { flex-basis: 160px; flex-shrink: 0; transition: transform 0.2s; cursor: pointer; }
.category-card:hover { transform: translateY(-5px); }
.card-image-wrapper { position: relative; width: 100%; padding-bottom: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
.card-bg-image { position: absolute; width: 100%; height: 100%; object-fit: cover; }
.card-title-strip { position: absolute; bottom: 12px; left: 0; color: #fff; font-weight: bold; padding: 6px 12px; border-radius: 0 4px 4px 0; max-width: 90%; }
.category-type-subtext { margin-top: 12px; font-size: 14px; color: #555; font-weight: 600; }

.faq-section { margin: 60px 0; }
.faq-title { text-align: center; font-size: 28px; margin-bottom: 30px; }
.faq-container { max-width: 800px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid #ddd; margin-bottom: 10px; }
.faq-question { display: flex; justify-content: space-between; padding: 15px; background: #f9f9f9; cursor: pointer; border-radius: 8px; font-weight: bold; }
.faq-content { display: flex; align-items: center; gap: 20px; padding: 15px; }
.faq-answer { flex: 1; font-style: italic; font-weight: bold; }
.faq-image { width: 150px; height: 150px; object-fit: cover; border-radius: 8px; }
.faq-item:nth-child(even) .faq-content { flex-direction: row-reverse; text-align: right; }

.official-footer { display: flex; flex-direction: column; align-items: center; padding: 20px 0; border-top: 1px solid #eee; }
.footer-socials { display: flex; gap: 20px; margin-bottom: 15px; }
.social-link { color: #000; transition: color 0.2s; }
.social-link:hover { color: #D4AF37; }
.social-link svg { width: 24px; }
.footer-copyright { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #777; }
.footer-logo { width: 20px; opacity: 0.7; }

.fade-in-section { opacity: 0; transform: translateY(50px); transition: all 1s; }
.fade-in-section.is-visible { opacity: 1; transform: translateY(0); }
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s; max-height: 500px; opacity: 1; overflow: hidden; }
.slide-fade-enter-from, .slide-fade-leave-to { max-height: 0; opacity: 0; }
</style>