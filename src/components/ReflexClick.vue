<template>
  <div class="game-wrapper">
    <!-- Header avec navigation -->
    <header class="game-header">
      <div class="header-content">
        <router-link to="/" class="back-button">← Retour</router-link>
        <h1 class="game-title">⚡ Test de Réflexe</h1>
        <div class="spacer"></div>
      </div>
      <p class="subtitle">Clique le plus vite possible quand le cercle devient vert !</p>
      <div class="stats-board" v-if="gameHistory.length > 0">
        <div class="stat-item">
          <span class="stat-label">Meilleur temps</span>
          <span class="stat-value">{{ bestTime }} ms</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Moyenne</span>
          <span class="stat-value">{{ averageTime }} ms</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Essais</span>
          <span class="stat-value">{{ gameHistory.length }}</span>
        </div>
      </div>
    </header>

    <!-- Formes flottantes d'arrière-plan -->
    <div class="floating-shapes">
      <div class="shape shape-1">⚡</div>
      <div class="shape shape-2">⏱️</div>
      <div class="shape shape-3">🎯</div>
      <div class="shape shape-4">💨</div>
    </div>

    <!-- Contenu du jeu -->
    <main class="game-container">
      <transition name="fade" mode="out-in">
        <!-- Zone de jeu -->
        <div v-if="!showResult" key="game" class="game-area">
          <div class="instructions" :class="{ 'pulse': gameState === 'waiting' }">
            {{ instructionText }}
          </div>

          <!-- Cercle de réflexe -->
          <div 
            class="reflex-circle" 
            :class="[
              gameState,
              { 'clickable': gameState === 'ready' }
            ]"
            @click="handleClick"
          >
            <div class="circle-content">
              <div class="circle-icon">{{ circleIcon }}</div>
              <div class="circle-text">{{ circleText }}</div>
            </div>
          </div>

          <!-- Animation d'attente -->
          <div v-if="gameState === 'waiting'" class="waiting-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>

        <!-- Écran de résultat -->
        <div v-else key="result" class="result-area">
          <div class="result-card" :class="resultType">
            <div class="result-icon">{{ resultIcon }}</div>
            <h2 class="result-title">{{ resultTitle }}</h2>
            
            <div v-if="resultType === 'success'" class="time-display">
              <div class="time-number">{{ reactionTime }}</div>
              <div class="time-label">millisecondes</div>
            </div>

            <div class="result-message">{{ resultMessage }}</div>

            <!-- Barre de comparaison -->
            <div v-if="resultType === 'success'" class="comparison-bar">
              <div class="comparison-label">Comparé à la max humaine (250ms)</div>
              <div class="comparison-progress">
                <div 
                  class="comparison-fill" 
                  :class="{ 'better': reactionTime < 250 }"
                  :style="{ width: `${Math.min((reactionTime / 500) * 100, 100)}%` }"
                ></div>
                <div class="comparison-marker"></div>
              </div>
            </div>

            <button class="btn-continue" @click="startGame">
              {{ resultType === 'success' ? '🔄 Réessayer' : '🔁 Recommencer' }}
            </button>
          </div>

          <!-- Historique des temps -->
          <div v-if="gameHistory.length > 1 && resultType === 'success'" class="history-section">
            <h3 class="history-title">📊 Tes derniers temps</h3>
            <div class="history-list">
              <div 
                v-for="(time, index) in gameHistory.slice(-5).reverse()" 
                :key="index"
                class="history-item"
                :class="{ 'best': time === bestTime }"
              >
                <span class="history-number">#{{ gameHistory.length - index }}</span>
                <span class="history-time">{{ time }}ms</span>
                <span v-if="time === bestTime" class="history-badge">🏆</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>
<script>
export default {
  name: "ReflexClick",
  props: {
    minDelay: {
      type: Number,
      default: 2000
    },
    maxDelay: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      gameState: 'waiting',
      startTime: null,
      reactionTime: null,
      showResult: false,
      timeoutId: null,
      gameHistory: [],
      resultType: 'success',
    };
  },

  watch: {
    gameHistory: {
      handler(newValue) {
        localStorage.setItem('reflex-history', JSON.stringify(newValue));
      },
      deep: true
    }
  },

  computed: {
    instructionText() {
      switch(this.gameState) {
        case 'waiting': return 'Attends que le cercle devienne vert...';
        case 'ready': return 'MAINTENANT ! Clique vite !';
        case 'tooEarly': return 'Trop tôt ! Attends le signal vert.';
      }
      return '';
    },
    circleIcon() {
      switch(this.gameState) {
        case 'waiting': return '⏳';
        case 'ready': return '⚡';
        case 'tooEarly': return '❌';
      }
      return '⏳';
    },
    circleText() {
      switch(this.gameState) {
        case 'waiting': return 'Attends...';
        case 'ready': return 'CLIQUE !';
        case 'tooEarly': return 'Trop tôt !';
      }
      return '';
    },
    resultIcon() {
      return this.resultType === 'success' ? '🎯' : '⚠️';
    },
    resultTitle() {
      if (this.resultType === 'error') return 'Trop tôt !';
      if (this.reactionTime < 200) return 'Incroyable !';
      if (this.reactionTime < 250) return 'Excellent !';
      if (this.reactionTime < 300) return 'Très bien !';
      return 'Pas mal !';
    },
    resultMessage() {
      if (this.resultType === 'error')
        return 'Attends que le cercle devienne vert avant de cliquer !';
      if (this.reactionTime < 200) return '🏆 Tu as des réflexes exceptionnels !';
      if (this.reactionTime < 250) return '⭐ Tu es plus rapide que la moyenne !';
      if (this.reactionTime < 300) return '👍 Bons réflexes !';
      if (this.reactionTime < 400) return '💪 Continue à t\'entraîner !';
      return '📚 Entraîne-toi pour t\'améliorer !';
    },
    bestTime() {
      return this.gameHistory.length ? Math.min(...this.gameHistory) : 0;
    },
    averageTime() {
      if (!this.gameHistory.length) return 0;
      return Math.round(
        this.gameHistory.reduce((a, b) => a + b) / this.gameHistory.length
      );
    }
  },

  methods: {
    startGame() {
      this.showResult = false;
      this.reactionTime = null;
      this.gameState = 'waiting';

      const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;

      this.timeoutId = setTimeout(() => {
        this.gameState = 'ready';
        this.startTime = Date.now();
      }, delay);
    },

    handleClick() {
      if (this.gameState === 'waiting') {
        clearTimeout(this.timeoutId);
        this.gameState = 'tooEarly';
        this.resultType = 'error';
        setTimeout(() => this.showResult = true, 800);
        return;
      }
      
      if (this.gameState === 'ready') {
        const endTime = Date.now();
        this.reactionTime = endTime - this.startTime;
        this.gameHistory.push(this.reactionTime);
        this.resultType = 'success';
        this.showResult = true;
      }
    }
  },

  mounted() {
    const savedHistory = localStorage.getItem('reflex-history');
    if (savedHistory) {
      this.gameHistory = JSON.parse(savedHistory);
    }
    this.startGame();
  },

  beforeUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.game-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Header */
.game-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  animation: slideDown 0.6s ease-out;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.back-button {
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-5px);
}

.game-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
}

.spacer {
  width: 130px;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 1.5rem;
}

.stats-board {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 20px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
}

/* Formes flottantes */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  font-size: 6rem;
  opacity: 0.08;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
}

.shape-1 {
  top: 10%;
  right: 10%;
  animation: float 8s infinite ease-in-out;
}

.shape-2 {
  bottom: 15%;
  left: 5%;
  animation: float 6s infinite ease-in-out reverse;
}

.shape-3 {
  top: 50%;
  left: 8%;
  animation: float 10s infinite ease-in-out;
}

.shape-4 {
  top: 30%;
  right: 15%;
  animation: float 7s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

/* Container du jeu */
.game-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Zone de jeu */
.game-area {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.instructions {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 3rem;
  font-weight: 600;
  min-height: 40px;
}

.instructions.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Cercle de réflexe */
.reflex-circle {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.reflex-circle.waiting {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border: 5px solid #fcd34d;
  animation: breathe 2s ease-in-out infinite;
}

.reflex-circle.ready {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  border: 5px solid #86efac;
  cursor: pointer;
  animation: readyPulse 0.8s ease-in-out infinite;
}

.reflex-circle.ready:hover {
  transform: scale(1.05);
}

.reflex-circle.tooEarly {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  border: 5px solid #fca5a5;
  animation: shake 0.5s ease-out;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes readyPulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 0 rgba(74, 222, 128, 0.7);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 30px rgba(74, 222, 128, 0);
  }
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.circle-content {
  text-align: center;
}

.circle-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
}

.circle-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

/* Indicateur d'attente */
.waiting-indicator {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.dot {
  width: 15px;
  height: 15px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.5); opacity: 1; }
}

/* Zone de résultat */
.result-area {
  animation: fadeIn 0.6s ease-out;
}

.result-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
}

.result-card.success {
  border-color: rgba(74, 222, 128, 0.5);
}

.result-card.error {
  border-color: rgba(248, 113, 113, 0.5);
}

.result-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.result-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2rem;
}

.time-display {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.time-number {
  font-size: 4rem;
  font-weight: 900;
  color: #ffd700;
  line-height: 1;
}

.time-label {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
}

.result-message {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 2rem;
  font-weight: 600;
}

/* Barre de comparaison */
.comparison-bar {
  margin-bottom: 2rem;
}

.comparison-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.comparison-progress {
  position: relative;
  width: 100%;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
}

.comparison-fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  transition: width 1s ease-out;
  border-radius: 15px;
}

.comparison-fill.better {
  background: linear-gradient(90deg, #4ade80, #22c55e);
}

.comparison-marker {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.btn-continue {
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #ff6f61, #00c6ff);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn-continue:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

/* Historique */
.history-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 2rem;
}

.history-title {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.history-item.best {
  background: rgba(255, 215, 0, 0.2);
  border-color: #ffd700;
}

.history-number {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.history-time {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.history-badge {
  font-size: 1.5rem;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .game-title {
    font-size: 2rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .spacer {
    display: none;
  }

  .reflex-circle {
    width: 250px;
    height: 250px;
  }

  .circle-icon {
    font-size: 4rem;
  }

  .circle-text {
    font-size: 1.5rem;
  }

  .instructions {
    font-size: 1.2rem;
  }

  .result-card {
    padding: 2rem;
  }

  .result-title {
    font-size: 2rem;
  }

  .time-number {
    font-size: 3rem;
  }

  .stats-board {
    gap: 1rem;
  }

  .stat-item {
    padding: 0.8rem 1.5rem;
  }
}
</style>