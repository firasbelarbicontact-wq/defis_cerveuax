<template>
  <div class="game-wrapper">
    <!-- Header avec navigation -->
    <header class="game-header">
      <div class="header-content">
        <router-link to="/" class="back-button">← Retour</router-link>
        <h1 class="game-title">❓ Quiz Cerveau</h1>
        <div class="spacer"></div>
      </div>
      <div class="progress-info" v-if="!quizFinished && !loading && !error">
        <div class="question-counter">
          Question {{ currentIndex + 1 }} / {{ questions.length }}
        </div>
        <div class="score-display">
          🎯 Score : {{ score }}
        </div>
      </div>
    </header>

    <!-- Formes flottantes d'arrière-plan -->
    <div class="floating-shapes">
      <div class="shape shape-1">❓</div>
      <div class="shape shape-2">💡</div>
      <div class="shape shape-3">🧠</div>
      <div class="shape shape-4">⭐</div>
    </div>

    <!-- Contenu du jeu -->
    <main class="game-container">
      <!-- Écran de chargement -->
      <div v-if="loading" class="loading-screen">
        <div class="spinner"></div>
        <p class="loading-text">⏳ Chargement des questions...</p>
      </div>

      <!-- Écran d'erreur -->
      <div v-else-if="error" class="error-screen">
        <div class="error-content">
          <h2>❌ Erreur</h2>
          <p>{{ error }}</p>
          <button class="btn-retry" @click="retryLoad">
            🔄 Réessayer
          </button>
        </div>
      </div>

      <!-- Contenu normal du jeu -->
      <transition v-else name="slide" mode="out-in">
        <!-- Questions -->
        <div v-if="!quizFinished" :key="currentIndex" class="quiz-content">
          <!-- Barre de progression -->
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${((currentIndex + 1) / questions.length) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Carte de question -->
          <div class="question-card">
            <div class="question-number">Question {{ currentIndex + 1 }}</div>
            <h2 class="question-text">{{ currentQuestion.question }}</h2>
          </div>

          <!-- Options de réponse -->
          <div class="options-container">
            <button
              v-for="(option, i) in currentQuestion.options"
              :key="i"
              class="option-button"
              :class="{ 
                'selected': selectedOption === option,
                'correct': showResult && option === currentQuestion.answer,
                'incorrect': showResult && selectedOption === option && option !== currentQuestion.answer
              }"
              @click="selectAnswer(option)"
              :disabled="showResult"
            >
              <span class="option-letter">{{ String.fromCharCode(65 + i) }}</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Écran de fin -->
        <div v-else class="result-screen">
          <div class="result-content">
            <h2 class="result-title">🎉 Quiz Terminé !</h2>
            <div class="final-score-card">
              <div class="score-circle">
                <svg class="score-ring" width="200" height="200">
                  <circle
                    class="score-ring-bg"
                    cx="100"
                    cy="100"
                    r="90"
                  />
                  <circle
                    class="score-ring-fill"
                    cx="100"
                    cy="100"
                    r="90"
                    :style="{ 
                      strokeDasharray: `${(score / questions.length) * 565.48} 565.48`
                    }"
                  />
                </svg>
                <div class="score-text">
                  <div class="score-number">{{ score }}</div>
                  <div class="score-total">/ {{ questions.length }}</div>
                </div>
              </div>
              <div class="score-percentage">
                {{ Math.round((score / questions.length) * 100) }}%
              </div>
            </div>
            
            <div class="performance-message">
              {{ getPerformanceMessage() }}
            </div>

            <div class="result-details">
              <div class="detail-item">
                <span class="detail-icon">✓</span>
                <span class="detail-text">{{ score }} bonnes réponses</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">✗</span>
                <span class="detail-text">{{ questions.length - score }} erreurs</span>
              </div>
            </div>

            <button class="btn-play-again" @click="restartQuiz">
              🔁 Rejouer
            </button>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "QuizGame",
  props: {
    delay: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      allQuestions: [],
      questions: [],
      currentIndex: 0,
      score: 0,
      quizFinished: false,
      selectedOption: null,
      showResult: false,
      loading: true,
      error: null,
      questionsToShow: 10
    };
  },
  created() {
    this.loadQuestions();
  },
  computed: {
    currentQuestion() {
      if (this.questions && this.questions.length > 0) {
        return this.questions[this.currentIndex];
      }
      return null;
    }
  },
  methods: {
    loadQuestions() {
      this.loading = true;
      this.error = null;
      
      axios.get('https://my-json-server.typicode.com/firasbelarbicontact-wq/defis_cerveuax/questions')
        .then((response) => {
          console.log("Toutes les questions :", response.data);
          this.allQuestions = response.data;
          this.selectRandomQuestions();
          this.loading = false;
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des questions:", error);
          this.error = "Impossible de charger les questions. Vérifiez votre connexion.";
          this.loading = false;
        });
    },
    selectRandomQuestions() {
      const questionsCopy = [...this.allQuestions];

      const selectedQuestions = [];
      for (let i = 0; i < this.questionsToShow; i++) {
        const randomIndex = Math.floor(Math.random() * questionsCopy.length);
        selectedQuestions.push(questionsCopy[randomIndex]);
        questionsCopy.splice(randomIndex, 1);
      }
      
      this.questions = selectedQuestions;
    },
    retryLoad() {
      this.loadQuestions();
    },
    selectAnswer(option) {
      if (this.showResult) return;
      
      this.selectedOption = option;
      this.showResult = true;
      
      if (option === this.currentQuestion.answer) {
        this.score++;
      }
      
      setTimeout(() => {
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
          this.selectedOption = null;
          this.showResult = false;
        } else {
          this.quizFinished = true;
        }
      }, this.delay);
    },
    getPerformanceMessage() {
      const percentage = (this.score / this.questions.length) * 100;
      if (percentage === 100) return '🏆 Parfait ! Tu es un champion !';
      if (percentage >= 80) return '🌟 Excellent ! Très bien joué !';
      if (percentage >= 60) return '👍 Bien ! Continue comme ça !';
      if (percentage >= 40) return '💪 Pas mal ! Tu peux faire mieux !';
      return '📚 Continue à apprendre !';
    },
    restartQuiz() {
      this.currentIndex = 0;
      this.score = 0;
      this.quizFinished = false;
      this.selectedOption = null;
      this.showResult = false;
      this.selectRandomQuestions();
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

.game-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #9c27b0 100%);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Header */
.game-header {
  max-width: 900px;
  margin: 0 auto 2rem;
  animation: slideDown 0.6s ease-out;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

.progress-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.question-counter,
.score-display {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 2rem;
  border-radius: 50px;
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
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Écran de chargement */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  animation: fadeIn 0.5s ease-out;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.3rem;
  color: white;
  margin-top: 1.5rem;
  font-weight: 600;
}

/* Écran d'erreur */
.error-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  animation: fadeIn 0.5s ease-out;
}

.error-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 500px;
}

.error-content h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
}

.error-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.btn-retry {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #ff6f61, #00c6ff);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-retry:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.quiz-content {
  animation: fadeIn 0.5s ease-out;
}

/* Barre de progression */
.progress-bar-container {
  margin-bottom: 2rem;
}

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
  transition: width 0.5s ease;
  border-radius: 10px;
}

/* Carte de question */
.question-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.question-number {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.question-text {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  line-height: 1.4;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

/* Options de réponse */
.options-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.option-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.option-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(10px);
  border-color: rgba(255, 255, 255, 0.5);
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-letter {
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
}

.option-button.correct {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  border-color: #22c55e;
  animation: correctPulse 0.5s ease-out;
}

.option-button.incorrect {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  border-color: #ef4444;
  animation: shake 0.5s ease-out;
}

@keyframes correctPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Écran de résultat */
.result-screen {
  animation: fadeIn 0.6s ease-out;
}

.result-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.result-title {
  font-size: 3rem;
  color: white;
  margin-bottom: 2rem;
  animation: bounce 1s ease-in-out infinite;
}

.final-score-card {
  margin-bottom: 2rem;
}

.score-circle {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
}

.score-ring {
  transform: rotate(-90deg);
}

.score-ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 20;
}

.score-ring-fill {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 20;
  stroke-linecap: round;
  transition: stroke-dasharray 1s ease-out;
  background: linear-gradient(90deg, #ff6f61, #00c6ff);
}

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.score-number {
  font-size: 4rem;
  font-weight: 900;
  color: #ffd700;
  line-height: 1;
}

.score-total {
  font-size: 2rem;
  color: white;
  opacity: 0.8;
}

.score-percentage {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
}

.performance-message {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 2rem;
  font-weight: 600;
}

.result-details {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-text {
  font-size: 1.1rem;
  color: white;
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
    transform: scale(0.95);
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

/* Transitions entre questions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
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

  .question-text {
    font-size: 1.5rem;
  }

  .option-button {
    padding: 1.2rem 1.5rem;
    font-size: 1rem;
  }

  .option-letter {
    min-width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .result-content {
    padding: 2rem;
  }

  .result-title {
    font-size: 2rem;
  }

  .score-number {
    font-size: 3rem;
  }

  .score-percentage {
    font-size: 2rem;
  }

  .performance-message {
    font-size: 1.2rem;
  }

  .result-details {
    gap: 1rem;
  }
}
</style>