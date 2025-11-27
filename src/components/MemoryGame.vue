<template>
  <div class="game-wrapper">
    <!-- Header avec navigation -->
    <header class="game-header">
      <div class="header-content">
        <router-link to="/" class="back-button">← Retour</router-link>
        <h1 class="game-title">🃏 Jeu de Mémoire</h1>
        <div class="spacer"></div>
      </div>
      <div class="scoreboard">
        <div class="score-item">
          <span class="score-icon">⏱</span>
          <span class="score-value">{{ timer }}s</span>
        </div>
        <div class="score-item">
          <span class="score-icon">🎯</span>
          <span class="score-value">{{ moves }} coups</span>
        </div>
      </div>
    </header>

    <!-- Formes flottantes d'arrière-plan -->
    <div class="floating-shapes">
      <div class="shape shape-1">🃏</div>
      <div class="shape shape-2">🎴</div>
      <div class="shape shape-3">🎯</div>
      <div class="shape shape-4">⭐</div>
    </div>

    <!-- Plateau de jeu -->
    <main class="game-container">
      <div class="game-board">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card"
          :class="{ 
            flipped: card.flipped || card.matched,
            matched: card.matched,
            shake: card.shake
          }"
          @click="flipCard(index)"
        >
          <div class="card-inner">
            <div class="card-front">
              <span class="card-question">?</span>
            </div>
            <div class="card-back">
              <span class="card-symbol">{{ card.symbol }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Message de victoire -->
      <transition name="victory">
        <div v-if="gameWon" class="victory-modal">
          <div class="victory-content">
            <h2 class="victory-title">🎉 Bravo !</h2>
            <p class="victory-text">Tu as gagné en</p>
            <div class="victory-stats">
              <div class="victory-stat">
                <span class="stat-number">{{ moves }}</span>
                <span class="stat-label">coups</span>
              </div>
              <div class="victory-stat">
                <span class="stat-number">{{ timer }}</span>
                <span class="stat-label">secondes</span>
              </div>
            </div>
            <button class="btn-play-again" @click="startGame">
              🔁 Rejouer
            </button>
          </div>
        </div>
      </transition>

      <!-- Bouton rejouer -->
      <button v-if="!gameWon" class="btn-restart" @click="startGame">
        🔁 Nouvelle Partie
      </button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MemoryGame',
  data() {
    return {
      symbols: [ '🍌', '🍇', '🍓', '🍍', '🥝', '🍒'],
      cards: [],
      flippedIndexes: [],
      moves: 0,
      timer: 0,
      interval: null
    };
  },
  computed: {
    gameWon() {
      return this.cards.length > 0 && this.cards.every(c => c.matched);
    }
  },
  methods: {

    startGame()  { // Démarre une nouvelle partie
      const duplicated = [...this.symbols, ...this.symbols];//  Duplique les cartes
      this.cards = duplicated
        .map(symbol => ({ symbol, flipped: false, matched: false, shake: false }))
        .sort(() => Math.random() - 0.5);
      this.moves = 0;
      this.timer = 0;
      this.flippedIndexes = [];
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => this.timer++, 1000);
    },
    // Gère le clic sur une carte
    flipCard(index) {
      const card = this.cards[index];
      if (!card || card.flipped || card.matched || this.flippedIndexes.length === 2) return;
      //else
      card.flipped = true;
      this.flippedIndexes.push(index);
      //comparison des cartes
      if (this.flippedIndexes.length === 2) {
        this.moves++;
        const [a, b] = this.flippedIndexes;
        // si paire trouvée
        if (this.cards[a].symbol === this.cards[b].symbol) {
          // Match trouvé
          setTimeout(() => {
            this.cards[a].matched = true;
            this.cards[b].matched = true;
            this.flippedIndexes = [];
            //Si toutes les paires sont trouvées, arrête le chronomètre
            if (this.gameWon) {
              clearInterval(this.interval);
              this.interval = null;
            }
          }, 500);
        } else {
          // Pas de match
          setTimeout(() => {
            this.cards[a].shake = true;
            this.cards[b].shake = true;
            
            setTimeout(() => {
              this.cards[a].flipped = false;
              this.cards[b].flipped = false;
              this.cards[a].shake = false;
              this.cards[b].shake = false;
              this.flippedIndexes = [];
            }, 400);
          }, 600);
        }
      }
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Plateau de jeu */
.game-board {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.6rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.8s ease-out;
}

/* Carte */
.card {
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 200px;
  height: 300px;
}

.card:hover {
  transform: scale(1.05);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.card-question {
  font-size: 3rem;
  color: white;
  font-weight: 900;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.card-back {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: 3px solid rgba(255, 255, 255, 0.5);
  transform: rotateY(180deg);
}

.card-symbol {
  font-size: 4rem;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}

.card.matched .card-back {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  animation: matchPulse 0.6s ease-out;
}

.card.shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes matchPulse {
  0%, 100% { transform: rotateY(180deg) scale(1); }
  50% { transform: rotateY(180deg) scale(1.1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Modal de victoire */
.victory-modal {
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

.victory-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem;
  border-radius: 30px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.victory-title {
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  animation: bounce 1s ease-in-out infinite;
}

.victory-text {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.victory-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.victory-stat {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 900;
  color: #ffd700;
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 1.1rem;
  color: white;
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

/* Bouton restart */
.btn-restart {
  display: block;
  margin: 0 auto;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid white;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-restart:hover {
  background: white;
  color: #667eea;
  transform: scale(1.05);
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
.victory-enter-active {
  animation: victoryIn 0.5s ease-out;
}

@keyframes victoryIn {
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
@media (max-width: 1024px) {
  .game-board {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .shape {
    font-size: 4rem;
  }
}

@media (max-width: 768px) {
  .game-wrapper {
    padding: 1rem;
  }

  .game-title {
    font-size: 1.8rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .spacer {
    display: none;
  }

  .back-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .scoreboard {
    gap: 1rem;
  }

  .score-item {
    padding: 0.6rem 1.5rem;
  }

  .score-icon {
    font-size: 1.2rem;
  }

  .score-value {
    font-size: 1rem;
  }

  .game-board {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }

  .card-question {
    font-size: 2.5rem;
  }

  .card-symbol {
    font-size: 3rem;
  }

  .victory-content {
    padding: 2rem;
  }

  .victory-title {
    font-size: 2.5rem;
  }

  .victory-text {
    font-size: 1.1rem;
  }

  .victory-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .btn-play-again {
    padding: 0.9rem 2.5rem;
    font-size: 1.1rem;
  }

  .shape {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .game-wrapper {
    padding: 0.8rem;
  }

  .game-title {
    font-size: 1.5rem;
  }

  .back-button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .scoreboard {
    gap: 0.5rem;
    flex-direction: column;
    align-items: stretch;
  }

  .score-item {
    padding: 0.5rem 1rem;
    justify-content: center;
  }

  .game-board {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  .card-question {
    font-size: 2rem;
  }

  .card-symbol {
    font-size: 2.5rem;
  }

  .card-front,
  .card-back {
    border-radius: 15px;
  }

  .victory-content {
    padding: 1.5rem;
    border-radius: 20px;
  }

  .victory-title {
    font-size: 2rem;
  }

  .victory-text {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }

  .btn-play-again {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }

  .btn-restart {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }

  .shape {
    font-size: 2rem;
    opacity: 0.05;
  }
}

@media (max-width: 360px) {
  .game-title {
    font-size: 1.3rem;
  }

  .game-board {
    gap: 0.4rem;
  }

  .card-question {
    font-size: 1.5rem;
  }

  .card-symbol {
    font-size: 2rem;
  }

  .victory-title {
    font-size: 1.8rem;
  }

  .stat-number {
    font-size: 1.8rem;
  }
}
</style>