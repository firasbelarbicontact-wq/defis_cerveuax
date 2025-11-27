<template>
  <div class="site-wrapper">
    <!-- Header ultra moderne -->
    <header class="header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid px-0">
            <a class="navbar-brand logo" @click="scrollToSection('accueil')">
              <span class="logo-icon">🧠</span>
              <span class="logo-text">Défis Cerveau</span>
            </a>
            <button 
              class="navbar-toggler border-0" 
              type="button" 
              @click="menuOpen = !menuOpen"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" :class="{ 'show': menuOpen }">
              <ul class="navbar-nav ms-auto gap-1 align-items-lg-center">
                <li class="nav-item">
                  <a class="nav-link px-4" @click="scrollToSection('accueil')">Accueil</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-4" @click="scrollToSection('jeux')">Jeux</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-4" @click="scrollToSection('about')">À Propos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-4" @click="scrollToSection('contact')">Contact</a>
                </li>
                <li class="nav-item">
                  <a href="/login" class="btn-auth btn-login">
                    <span>Connexion</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/Register" class="btn-auth btn-register">
                    <span>S'inscrire</span>
                    <span class="btn-icon">→</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Hero Section avec effets modernes -->
    <section id="accueil" class="hero-section">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <div class="hero-badge mb-4 animate-fade-in">
              <span class="badge-icon">✨</span>
              <span>Entraînement Cérébral Nouvelle Génération</span>
            </div>
            <h1 class="hero-title animate-fade-in-delay-1">
              Réveillez Votre
              <span class="hero-gradient-text d-block">Génie Intérieur</span>
            </h1>
            <p class="hero-description animate-fade-in-delay-2">
              Une expérience immersive qui transforme l'entraînement mental en une aventure captivante.
              Stimulez votre mémoire, affûtez vos réflexes et libérez tout votre potentiel cognitif.
            </p>
            <div class="hero-buttons animate-fade-in-delay-3">
              <button @click="scrollToSection('jeux')" class="btn btn-hero btn-primary-glow">
                <span>Commencer l'Aventure</span>
                <i class="arrow">→</i>
              </button>
              <button @click="scrollToSection('about')" class="btn btn-hero btn-secondary-outline">
                <span>En Savoir Plus</span>
              </button>
            </div>
            
            <!-- Stats modernes -->
            <div class="hero-stats animate-fade-in-delay-4">
              <div class="stat-item">
                <div class="stat-value">4+</div>
                <div class="stat-label">Jeux Uniques</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">∞</div>
                <div class="stat-label">Défis Quotidiens</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">100%</div>
                <div class="stat-label">Gratuit & Fun</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating shapes -->
      <div class="floating-shapes">
        <div class="shape shape-1">🃏</div>
        <div class="shape shape-2">➕</div>
        <div class="shape shape-3">⚡</div>
        <div class="shape shape-4">❓</div>
        <div class="shape shape-5">🎯</div>
        <div class="shape shape-6">🌟</div>
      </div>
    </section>

    <!-- Section Jeux ultra moderne -->
    <section id="jeux" class="games-section">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <div class="section-badge mb-3">
              <span>🎮</span>
              <span>Nos Jeux</span>
            </div>
            <h2 class="section-title mb-3">Explorez Nos Univers</h2>
            <p class="section-description">
              Chaque jeu est une porte vers un nouveau défi. Choisissez votre aventure et
              commencez votre transformation cognitive dès maintenant.
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div 
            class="col-12 col-md-6 col-xl-3" 
            v-for="(g, index) in games" 
            :key="g.name"
          >
            <div class="game-card" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="game-card-inner">
                <div class="game-image-wrapper">
                  <img :src="g.image" :alt="g.label" class="game-image" />
                  <div class="game-overlay">
                    <div class="game-icon-large">{{ g.icon }}</div>
                  </div>
                  <div class="game-badge">Nouveau</div>
                </div>
                <div class="game-content">
                  <div class="game-category">
                    <span class="category-dot"></span>
                    <span>Entraînement Mental</span>
                  </div>
                  <h3 class="game-title">{{ g.label }}</h3>
                  <p class="game-description">{{ g.description }}</p>
                  <router-link class="game-button" :to="`/game/${g.name}`">
                    <span>Jouer Maintenant</span>
                    <span class="button-arrow">→</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
          <a href="/game/name " class=" btn-hero btn-secondary-outline" style="padding-left: 45%; margin: 30px ; text-decoration: none; ">Autre Jeux</a>
      </div>

      <!-- Particules d'arrière-plan -->
      <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
    </section>

    <!-- Section À Propos moderne -->
    <section id="about" class="about-section">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="about-content">
              <div class="section-badge mb-4">
                <span>💡</span>
                <span>À Propos</span>
              </div>
              <h2 class="about-title mb-4">
                L'Entraînement Cérébral 
                <span class="gradient-text">Réinventé</span>
              </h2>
              <div class="about-feature">
                <div class="feature-icon">🎯</div>
                <div>
                  <h4>Notre Mission</h4>
                  <p>Créer une plateforme où l'apprentissage devient un jeu passionnant. Nous combinons neurosciences et gamification pour offrir une expérience unique qui transforme l'entraînement mental en moment de plaisir.</p>
                </div>
              </div>
              <div class="about-feature">
                <div class="feature-icon">🚀</div>
                <div>
                  <h4>Pourquoi Nous Choisir ?</h4>
                  <p>Des exercices scientifiquement conçus pour améliorer concentration, mémoire et réflexes. Quelques minutes quotidiennes suffisent pour observer des résultats remarquables et durables.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="stats-grid">
              <div class="stat-card stat-card-1">
                <div class="stat-icon">🎮</div>
                <div class="stat-number">4</div>
                <div class="stat-text">Jeux Innovants</div>
                <div class="stat-bg"></div>
              </div>
              <div class="stat-card stat-card-2">
                <div class="stat-icon">♾️</div>
                <div class="stat-number">∞</div>
                <div class="stat-text">Défis Illimités</div>
                <div class="stat-bg"></div>
              </div>
              <div class="stat-card stat-card-3">
                <div class="stat-icon">⭐</div>
                <div class="stat-number">100%</div>
                <div class="stat-text">Satisfaction</div>
                <div class="stat-bg"></div>
              </div>
              <div class="stat-card stat-card-4">
                <div class="stat-icon">🎁</div>
                <div class="stat-number">0€</div>
                <div class="stat-text">Totalement Gratuit</div>
                <div class="stat-bg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Contact moderne -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <div class="section-badge mb-3">
              <span>📧</span>
              <span>Contact</span>
            </div>
            <h2 class="section-title mb-3">Restons Connectés</h2>
            <p class="section-description">
              Une question, une suggestion ou simplement envie d'échanger ?
              Notre équipe est là pour vous accompagner dans votre aventure.
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="contact-card">
              <div class="contact-icon-wrapper">
                <span class="contact-icon">📧</span>
              </div>
              <h4 class="contact-title">Email</h4>
              <p class="contact-text">contact@defiscerveau.com</p>
              <div class="contact-decoration"></div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="contact-card contact-card-featured">
              <div class="contact-icon-wrapper">
                <span class="contact-icon">💬</span>
              </div>
              <h4 class="contact-title">Support</h4>
              <p class="contact-text">support@defiscerveau.com</p>
              <div class="contact-decoration"></div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="contact-card">
              <div class="contact-icon-wrapper">
                <span class="contact-icon">🌍</span>
              </div>
              <h4 class="contact-title">Localisation</h4>
              <p class="contact-text">Tunis, Tunisie</p>
              <div class="contact-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer ultra moderne -->
    <footer class="footer">
      <div class="container">
        <div class="row g-4 pb-5">
          <div class="col-lg-4">
            <div class="footer-brand">
              <div class="footer-logo">
                <span class="logo-icon">🧠</span>
                <span class="logo-text">Défis Cerveau</span>
              </div>
              <p class="footer-description">
                Transformez votre potentiel en performance. L'entraînement cérébral
                nouvelle génération vous attend.
              </p>
              <div class="social-links">
                <a href="#" class="social-link">
                  <span>📘</span>
                </a>
                <a href="#" class="social-link">
                  <span>🐦</span>
                </a>
                <a href="#" class="social-link">
                  <span>📸</span>
                </a>
                <a href="#" class="social-link">
                  <span>▶️</span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4">
            <div class="footer-section">
              <h4 class="footer-title">Navigation</h4>
              <ul class="footer-links">
                <li><a @click="scrollToSection('accueil')">Accueil</a></li>
                <li><a @click="scrollToSection('jeux')">Jeux</a></li>
                <li><a @click="scrollToSection('about')">À Propos</a></li>
                <li><a @click="scrollToSection('contact')">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-4">
            <div class="footer-section">
              <h4 class="footer-title">Nos Jeux</h4>
              <ul class="footer-links">
                <li><a href="/game/memory">🃏 Memory</a></li>
                <li><a href="/game/quickmath">➕ Calcul Mental</a></li>
                <li><a href="/game/reflexclick">⚡ Réflexe</a></li>
                <li><a href="/game/quiz">❓ Quiz</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-4">
            <div class="footer-section">
              <h4 class="footer-title">Newsletter</h4>
              <p class="footer-newsletter-text">
                Recevez nos nouveaux jeux et astuces directement dans votre boîte mail.
              </p>
              <div class="newsletter-form">
                <input type="email" placeholder="Votre email" class="newsletter-input" />
                <button class="newsletter-button">→</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p class="mb-0"> 2024 Défis Cerveau. Tous droits réservés.</p>
            </div>
            <div class="col-md-6 text-center text-md-end">
              <p class="mb-0 footer-creators">
                Créé avec par <strong>Firas Belarbi</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      isScrolled: false,
      menuOpen: false,
      games: [
        { 
          name: 'memory', 
          label: 'Memory', 
          icon: '🃏',
          image: require('@/assets/memoria.png'),
          description: 'Entraînez votre mémoire visuelle en retrouvant les paires de cartes identiques.'
        },
        { 
          name: 'quickmath', 
          label: 'Calcul Mental', 
          icon: '➕',
          image: require('@/assets/calculo.png'),
          description: 'Boostez votre rapidité de calcul avec des défis mathématiques chronométrés.'
        },
        { 
          name: 'reflexclick', 
          label: 'Réflexe', 
          icon: '⚡',
          image: require('@/assets/reflexe.png'),
          description: 'Testez et améliorez vos temps de réaction avec des exercices stimulants.'
        },
        { 
          name: 'quiz', 
          label: 'Quiz', 
          icon: '❓',
          image: require('@/assets/quiz.png'),
          description: 'Explorez vos connaissances avec des quiz variés et enrichissants.'
        }
      ]
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.menuOpen = false;
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.site-wrapper {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  background: #0a0a0f;
}

/* ============= HEADER ============= */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 15, 1);
  backdrop-filter: blur(20px) saturate(180%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header.scrolled {
  background: rgba(10, 10, 15, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.navbar-brand.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.navbar-brand.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0 20px rgba(138, 43, 226, 0.6));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  position: relative;
}

.nav-link:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.05);
}

/* Boutons d'authentification */
.btn-auth {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  margin-left: 0.5rem;
}

.btn-login {
  color: white;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-login:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  color: white;
}

.btn-register {
  color: white;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  color: white;
}

.btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-register:hover .btn-icon {
  transform: translateX(3px);
}

/* Responsive pour les boutons auth */
@media (max-width: 991px) {
  .btn-auth {
    width: 100%;
    justify-content: center;
    margin: 0.5rem 0;
  }
}

.nav-link-contact {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white !important;
  margin-left: 0.5rem;
}

.nav-link-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

/* ============= HERO SECTION ============= */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 10rem 2rem 6rem;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #667eea, transparent);
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #764ba2, transparent);
  bottom: -150px;
  left: -150px;
  animation-delay: 7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f093fb, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 14s;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.badge-icon {
  font-size: 1.2rem;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.hero-gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
  background-size: 200% 200%;
}

.hero-description {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-hero {
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-primary-glow {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
}

.btn-primary-glow:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.6);
}

.btn-primary-glow .arrow {
  transition: transform 0.3s ease;
}

.btn-primary-glow:hover .arrow {
  transform: translateX(5px);
}

.btn-secondary-outline {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.btn-secondary-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-3px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.5rem;
}

.stat-divider {
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  font-size: 4rem;
  opacity: 0.1;
  filter: drop-shadow(0 10px 30px rgba(255, 255, 255, 0.2));
}

.shape-1 { top: 10%; right: 10%; animation: float 8s infinite ease-in-out; }
.shape-2 { top: 60%; left: 5%; animation: float 10s infinite ease-in-out 2s; }
.shape-3 { top: 30%; left: 15%; animation: float 7s infinite ease-in-out 4s; }
.shape-4 { bottom: 20%; right: 20%; animation: float 9s infinite ease-in-out 1s; }
.shape-5 { top: 50%; right: 5%; animation: float 11s infinite ease-in-out 3s; }
.shape-6 { bottom: 10%; left: 20%; animation: float 6s infinite ease-in-out 5s; }

/* ============= GAMES SECTION ============= */
.games-section {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1030 100%);
  position: relative;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.02em;
}

.section-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
}

.game-card {
  animation: slideUp 0.6s ease-out backwards;
  height: 100%;
}

.game-card-inner {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-card-inner:hover {
  transform: translateY(-10px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.game-image-wrapper {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.game-card-inner:hover .game-image {
  transform: scale(1.1);
}

.game-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.game-card-inner:hover .game-overlay {
  opacity: 1;
}

.game-icon-large {
  font-size: 4rem;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.8));
  animation: bounce 2s infinite;
}

.game-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.game-content {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.game-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.category-dot {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.game-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.game-description {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.game-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.game-button:hover {
  transform: translateX(5px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  color: white;
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.game-button:hover .button-arrow {
  transform: translateX(5px);
}

.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0.3;
  animation: particleFloat 15s infinite ease-in-out;
}

.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 30%; animation-delay: 2s; }
.particle:nth-child(3) { left: 50%; animation-delay: 4s; }
.particle:nth-child(4) { left: 70%; animation-delay: 6s; }
.particle:nth-child(5) { left: 90%; animation-delay: 8s; }

/* ============= ABOUT SECTION ============= */
.about-section {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #1a1030 0%, #0f1423 100%);
}

.about-title {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-feature {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.about-feature:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(10px);
  border-color: rgba(255, 255, 255, 0.1);
}

.feature-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.about-feature h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
}

.about-feature p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-card {
  position: relative;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.stat-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.stat-card .stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 5px 15px rgba(255, 255, 255, 0.3));
}

.stat-card .stat-number {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-card .stat-text {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.stat-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card:hover .stat-bg {
  opacity: 1;
}

.stat-card-1:hover .stat-bg { background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), transparent); }
.stat-card-2:hover .stat-bg { background: linear-gradient(135deg, rgba(118, 75, 162, 0.2), transparent); }
.stat-card-3:hover .stat-bg { background: linear-gradient(135deg, rgba(240, 147, 251, 0.2), transparent); }
.stat-card-4:hover .stat-bg { background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), transparent); }

/* ============= CONTACT SECTION ============= */
.contact-section {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #0f1423 0%, #0a0a0f 100%);
}

.contact-card {
  position: relative;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.contact-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.contact-card-featured {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.05);
}

.contact-card-featured:hover {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(102, 126, 234, 0.1);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
}

.contact-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
}

.contact-card:hover .contact-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.1);
}

.contact-icon {
  font-size: 2.5rem;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
}

.contact-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin: 0;
}

.contact-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.contact-card:hover .contact-decoration {
  transform: scaleX(1);
}

/* ============= FOOTER ============= */
.footer {
  background: #0a0a0f;
  color: white;
  padding: 5rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-brand {
  margin-bottom: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 800;
}

.footer-logo .logo-text {
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 1rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-links a:hover {
  color: white;
  transform: translateX(5px);
}

.footer-newsletter-text {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.newsletter-input:focus {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.newsletter-button {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-button:hover {
  transform: translateX(5px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.footer-bottom {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
}

.footer-creators strong {
  color: white;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ============= ANIMATIONS ============= */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes particleFloat {
  0% { transform: translateY(100vh) scale(0); opacity: 0; }
  10% { opacity: 0.3; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-100vh) scale(1); opacity: 0; }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 1s ease-out 0.2s backwards;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.4s backwards;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 1s ease-out 0.6s backwards;
}

.animate-fade-in-delay-4 {
  animation: fadeIn 1s ease-out 0.8s backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============= RESPONSIVE ============= */
@media (max-width: 1200px) {
  .hero-title { font-size: 4rem; }
  .section-title { font-size: 3rem; }
}

@media (max-width: 992px) {
  .hero-title { font-size: 3rem; }
  .section-title { font-size: 2.5rem; }
  .stats-grid { grid-template-columns: 1fr; }
  .hero-stats { flex-direction: column; gap: 1.5rem; }
  .stat-divider { display: none; }
}

@media (max-width: 768px) {
  .hero-section { padding: 8rem 1rem 4rem; }
  .hero-title { font-size: 2.5rem; }
  .hero-description { font-size: 1.1rem; }
  .hero-buttons { flex-direction: column; }
  .btn-hero { width: 100%; justify-content: center; }
  .section-title { font-size: 2rem; }
  .about-title { font-size: 2rem; }
  .game-image-wrapper { height: 200px; }
  .contact-section, .games-section, .about-section { padding: 4rem 1rem; }
}

@media (max-width: 576px) {
  .hero-title { font-size: 2rem; }
  .section-title { font-size: 1.75rem; }
  .hero-stats { padding: 1.5rem; }
  .stat-value { font-size: 2rem; }
  .game-title { font-size: 1.5rem; }
  .newsletter-form { flex-direction: column; }
  .newsletter-button { width: 100%; }
}
</style>