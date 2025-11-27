<template>
  <div class="game-wrapper">
    <!-- Header avec navigation -->
    <header class="game-header">
      <div class="header-content">
        <router-link to="/" class="back-button">← Retour</router-link>
        <h1 class="game-title">➕ Calcul Mental</h1>
        <div class="spacer"></div>
      </div>
      <p class="subtitle">Résous autant d'opérations que possible en 60 secondes !</p>
      <div class="scoreboard">
        <div class="score-item">
          <span class="score-icon">⏱</span>
          <span class="score-value">{{ timeLeft }}s</span>
        </div>
        <div class="score-item">
          <span class="score-icon">🎯</span>
          <span class="score-value">{{ score }} points</span>
        </div>
      </div>
    </header>

    <!-- Formes flottantes d'arrière-plan -->
    <div class="floating-shapes">
      <div class="shape shape-1">➕</div>
      <div class="shape shape-2">➖</div>
      <div class="shape shape-3">✖️</div>
      <div class="shape shape-4">➗</div>
    </div>

    <!-- Contenu du jeu -->
    <main class="game-container">
      <div v-if="!gameOver" class="question-container">
        <div class="question-card">
          <h2 class="question">{{ currentQuestion }}</h2>
          <form @submit.prevent="checkAnswer" class="answer-form">
            <input
              ref="answerInput"
              v-model.number="userAnswer"
              type="number"
              class="answer-input"
              placeholder="Ta réponse"
              required
              autofocus
            />
            <button class="btn-submit" type="submit">
              Valider ✓
            </button>
          </form>
          
          <!-- Feedback visuel -->
          <transition name="feedback">
            <div v-if="showFeedback" class="feedback" :class="feedbackType">
              {{ feedbackMessage }}
            </div>
          </transition>
        </div>

        <!-- Barre de progression du temps -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${(timeLeft / 60) * 100}%` }"></div>
        </div>
      </div>

      <!-- Écran de fin de partie -->
      <transition name="gameover">
        <div v-if="gameOver" class="gameover-modal">
          <div class="gameover-content">
            <h2 class="gameover-title">⏰ Temps écoulé !</h2>
            <p class="gameover-text">Tu as réussi</p>
            <div class="final-score">
              <span class="score-number">{{ score }}</span>
              <span class="score-label">{{ score > 1 ? 'opérations' : 'opération' }}</span>
            </div>
            <div class="performance-message">
              {{ getPerformanceMessage() }}
            </div>
            <button class="btn-play-again" @click="startGame">
              🔁 Rejouer
            </button>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: "QuickMath",
  data() {
    return {
      num1: 0,
      num2: 0,
      operator: '+',
      userAnswer: '',
      score: 0,
      timeLeft: 60,
      interval: null,
      gameOver: false,
      showFeedback: false,
      feedbackType: '',
      feedbackMessage: ''
    };
  },
  computed: {
    currentQuestion() {
      return `${this.num1} ${this.operator} ${this.num2} = ?`;
    },
    correctAnswer() {
      switch (this.operator) {
        case '+': return this.num1 + this.num2;
        case '-': return this.num1 - this.num2;
        case '×': return this.num1 * this.num2;
        case '÷': return Math.floor(this.num1 / this.num2);
        default: return null;
      }
    }
  },
  methods: {
    generateQuestion() {
      const operators = ['+', '-', '×', '÷'];
      this.operator = operators[Math.floor(Math.random() * operators.length)];
      this.num1 = Math.floor(Math.random() * 20) + 1;
      this.num2 = Math.floor(Math.random() * 20) + 1;
      if (this.operator === '÷') {
        this.num1 = this.num2 * (Math.floor(Math.random() * 5) + 1);
      }
    },
    checkAnswer() {
      if (this.userAnswer === this.correctAnswer) {
        this.score++;
        this.showFeedbackMessage('correct', '✓ Correct !');
      } else {
        this.showFeedbackMessage('incorrect', `✗ Faux ! C'était ${this.correctAnswer}`);
      }
      this.userAnswer = '';
      this.generateQuestion();
      
      // Refocus sur l'input
      this.$nextTick(() => {
        if (this.$refs.answerInput) {
          this.$refs.answerInput.focus();
        }
      });
    },
    showFeedbackMessage(type, message) {
      this.feedbackType = type;
      this.feedbackMessage = message;
      this.showFeedback = true;
      
      setTimeout(() => {
        this.showFeedback = false;
      }, 1000);
    },
    getPerformanceMessage() {
      if (this.score >= 40) return '🏆 Incroyable ! Tu es un génie du calcul !';
      if (this.score >= 30) return '🌟 Excellent ! Tu es très rapide !';
      if (this.score >= 20) return '👍 Bien joué ! Continue comme ça !';
      if (this.score >= 10) return '💪 Pas mal ! Tu peux faire mieux !';
      return '📚 Continue à t\'entraîner !';
    },
    startGame() {
      this.score = 0;
      this.timeLeft = 60;
      this.gameOver = false;
      this.showFeedback = false;
      this.generateQuestion();
      clearInterval(this.interval);
      
      this.interval = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          clearInterval(this.interval);
          this.gameOver = true;
        }
      }, 1000);
      
      // Focus sur l'input après démarrage
      this.$nextTick(() => {
        if (this.$refs.answerInput) {
          this.$refs.answerInput.focus();
        }
      });
    }
  },
  mounted() {
    this.startGame();
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
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
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
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

.scoreboard {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.score-item {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.score-icon {
  font-size: 1.5rem;
}

.score-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
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
  opacity: 0.1;
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

.question-container {
  animation: fadeIn 0.8s ease-out;
}

/* Carte de question */
.question-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  position: relative;
}

.question {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Formulaire de réponse */
.answer-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.answer-input {
  width: 100%;
  max-width: 300px;
  padding: 1.2rem 2rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e3c72;
  outline: none;
  transition: all 0.3s ease;
}

.answer-input:focus {
  border-color: #00c6ff;
  box-shadow: 0 0 20px rgba(0, 198, 255, 0.5);
  transform: scale(1.05);
}

.answer-input::placeholder {
  color: rgba(30, 60, 114, 0.5);
}

.btn-submit {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #ff6f61, #00c6ff);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.btn-submit:active {
  transform: translateY(0);
}

/* Feedback */
.feedback {
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.feedback.correct {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
}

.feedback.incorrect {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  color: white;
}

.feedback-enter-active {
  animation: feedbackIn 0.3s ease-out;
}

.feedback-leave-active {
  animation: feedbackOut 0.3s ease-out;
}

@keyframes feedbackIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes feedbackOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}

/* Barre de progression */
.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6f61, #00c6ff);
  transition: width 1s linear;
  border-radius: 10px;
}

/* Modal de fin de partie */
.gameover-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.gameover-content {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 3rem;
  border-radius: 30px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.gameover-title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  animation: bounce 1s ease-in-out infinite;
}

.gameover-text {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
}

.final-score {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.score-number {
  display: block;
  font-size: 4rem;
  font-weight: 900;
  color: #ffd700;
  margin-bottom: 0.5rem;
}

.score-label {
  display: block;
  font-size: 1.2rem;
  color: white;
}

.performance-message {
  font-size: 1.3rem;
  color: #ffd700;
  margin-bottom: 2rem;
  font-weight: 600;
}

.btn-play-again {
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

.btn-play-again:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
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
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Transition de la modal */
.gameover-enter-active {
  animation: gameoverIn 0.5s ease-out;
}

@keyframes gameoverIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
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

  .question {
    font-size: 2.5rem;
  }

  .answer-input {
    font-size: 1.5rem;
    max-width: 250px;
  }

  .question-card {
    padding: 3rem 2rem;
  }

  .gameover-content {
    padding: 2rem;
  }

  .gameover-title {
    font-size: 2rem;
  }

  .score-number {
    font-size: 3rem;
  }

  .feedback {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
}
</style>