<template>
  <div class="game-page-wrapper">
    <!-- Transition pour l'affichage du jeu -->
    <transition name="fade" mode="out-in">
      <component :is="currentGame" v-if="currentGame" :key="$route.params.name" />
      
      <!-- Message d'erreur si jeu inconnu -->
      <div v-else class="error-container">
        <div class="error-content">
          <span class="error-icon">⚠️</span>
          <h2 class="error-title">Jeu introuvable</h2>
          <p class="error-text">Désolé, ce jeu n'existe pas ou n'est pas encore disponible.</p>
          <router-link to="/" class="btn-back-home">
            ← Retour à l'accueil
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MemoryGame from '../components/MemoryGame.vue';
import QuickMath from '../components/QuickMath.vue';
import ReflexClick from '../components/ReflexClick.vue';
import QuizGame from '../components/QuizGame.vue';

export default {
  name: 'GamePage',
  components: { MemoryGame, QuickMath, ReflexClick, QuizGame },
  computed: {
    currentGame() {
      // Map des noms de route -> composant (objets)
      const map = {
        memory: MemoryGame,
        quickmath: QuickMath,
        reflexclick: ReflexClick,
        quiz: QuizGame
      };
      const name = this.$route.params.name; // correspond à '/game/:name'
      return map[name] || null;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0;
  box-sizing: border-box;
}

.game-page-wrapper {
  min-height: 100vh;
  width: 100%;
  position: relative;
}
/* Container d'erreur */
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  padding: 2rem;
}

.error-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  padding: 4rem 3rem;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
}

.error-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1.5rem;
  animation: shake 0.5s ease-in-out;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.error-text {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-back-home {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  background: linear-gradient(90deg, #ff6f61, #00c6ff);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn-back-home:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

/* Transitions pour les composants */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .error-content {
    padding: 3rem 2rem;
  }

  .error-icon {
    font-size: 4rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-text {
    font-size: 1rem;
  }
}
</style>